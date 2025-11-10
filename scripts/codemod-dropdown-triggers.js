#!/usr/bin/env node

/**
 * Codemod: Replace Radix UI DropdownMenuTrigger with AccessibleDropdownTrigger
 *
 * This script systematically replaces all DropdownMenuTrigger usages throughout the codebase
 * with our accessible wrapper, ensuring proper accessibility attribute forwarding.
 *
 * Usage: node scripts/codemod-dropdown-triggers.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  // File patterns to include
  include: ['**/*.{ts,tsx,js,jsx}'],
  // File patterns to exclude
  exclude: ['node_modules/**', '.next/**', 'dist/**', 'build/**'],
  // Directories to search
  searchDirs: ['app', 'components', 'lib'],
  // Dry run mode - don't make actual changes
  dryRun: process.argv.includes('--dry-run')
};

/**
 * Find all files matching the patterns
 */
function findFiles(dirs, include, exclude) {
  const files = [];

  function searchDir(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      // Skip excluded patterns
      if (exclude.some(pattern => fullPath.includes(pattern.replace('**/', '')))) {
        continue;
      }

      if (item.isDirectory()) {
        searchDir(fullPath);
      } else if (item.isFile()) {
        // Check if file matches include patterns
        const matches = include.some(pattern => {
          const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*') + '$');
          return regex.test(fullPath);
        });

        if (matches) {
          files.push(fullPath);
        }
      }
    }
  }

  dirs.forEach(searchDir);
  return files;
}

/**
 * Parse and transform file content
 */
function transformFile(filePath, content) {
  let modified = false;
  let newContent = content;

  // Pattern 1: Replace import statements
  const importRegex = /import\s+{\s*([^}]*DropdownMenuTrigger[^}]*)\s*}\s+from\s+['"]@radix-ui\/react-dropdown-menu['"];?/g;

  newContent = newContent.replace(importRegex, (match, imports) => {
    modified = true;
    // Keep other imports, replace DropdownMenuTrigger with AccessibleDropdownTrigger
    const otherImports = imports
      .split(',')
      .map(imp => imp.trim())
      .filter(imp => imp !== 'DropdownMenuTrigger')
      .join(', ');

    const radixImports = otherImports ? `import { ${otherImports} } from "@radix-ui/react-dropdown-menu";` : '';
    const accessibleImport = `import { AccessibleDropdownTrigger } from "@/components/ui/accessible-dropdown-trigger";`;

    return [radixImports, accessibleImport].filter(Boolean).join('\n');
  });

  // Pattern 2: Replace DropdownMenuTrigger component usage
  const componentRegex = /<DropdownMenuTrigger([^>]*?)>/g;

  newContent = newContent.replace(componentRegex, (match, props) => {
    modified = true;

    // Extract existing props
    const propMatches = props.match(/(\w+(?:-[\w-])*)\s*=\s*{[^}]*}|\w+(?:-[\w-])*\s*=\s*["'][^"']*["']/g) || [];

    // Check if asChild prop exists
    const hasAsChild = propMatches.some(prop => prop.includes('asChild'));

    // Build new props
    let newProps = propMatches.join(' ');

    // If asChild is present, we need to handle it specially
    if (hasAsChild) {
      // Remove asChild prop since our component handles this internally
      newProps = newProps.replace(/asChild\s*=\s*{[^}]*}\s*/g, '');
    }

    // Look for accessibility-related props in children (Button component)
    const ariaLabelMatch = props.match(/ariaLabel\s*=\s*{([^}]+)}/);
    const titleMatch = props.match(/title\s*=\s*{([^}]+)}/);

    if (ariaLabelMatch) {
      newProps += ` ariaLabel={${ariaLabelMatch[1]}}`;
    }

    if (titleMatch && !ariaLabelMatch) {
      newProps += ` title={${titleMatch[1]}}`;
    }

    return `<AccessibleDropdownTrigger${newProps ? ' ' + newProps : ''}>`;
  });

  // Pattern 3: Replace closing tags
  newContent = newContent.replace(/<\/DropdownMenuTrigger>/g, '</AccessibleDropdownTrigger>');

  // Pattern 4: Handle self-closing tags
  newContent = newContent.replace(/<DropdownMenuTrigger([^>]*?)\s*\/>/g, (match, props) => {
    modified = true;
    return `<AccessibleDropdownTrigger${props} />`;
  });

  return { content: newContent, modified };
}

/**
 * Extract user context for accessibility labels
 */
function extractUserContext(content) {
  const context = {};

  // Look for user objects in the code
  const userVariableMatch = content.match(/const\s+(\w+)\s*=\s*{[^}]*fullName:\s*['"]([^'"]+)['"][^}]*}/);
  if (userVariableMatch) {
    const variableName = userVariableMatch[1];
    const fullName = userVariableMatch[2];
    context.userVariable = variableName;
    context.fullName = fullName;
  }

  // Look for user mapping patterns
  const userMapMatch = content.match(/(\w+)\.fullName/g);
  if (userMapMatch) {
    context.userReferences = [...new Set(userMapMatch.map(match => match.split('.')[0]))];
  }

  return context;
}

/**
 * Enhanced transform with smart accessibility improvements
 */
function enhancedTransform(filePath, content) {
  const context = extractUserContext(content);
  let { content: newContent, modified } = transformFile(filePath, content);

  // If we made changes and have user context, improve accessibility labels
  if (modified && context.fullName) {
    // Replace generic aria-labels with user-specific ones
    newContent = newContent.replace(
      /ariaLabel=\{['"]Actions for user['"]\}/g,
      `ariaLabel={\`Actions for ${context.fullName}\`}`
    );

    newContent = newContent.replace(
      /title=\{['"]Actions for user['"]\}/g,
      `title={\`Actions for ${context.fullName}\`}`
    );
  }

  return { content: newContent, modified, context };
}

/**
 * Process a single file
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: newContent, modified, context } = enhancedTransform(filePath, content);

    if (modified) {
      if (CONFIG.dryRun) {
        console.log(`🔍 [DRY RUN] Would modify: ${filePath}`);
        if (context.fullName) {
          console.log(`   📝 User context found: ${context.fullName}`);
        }
        return { modified: true, context };
      } else {
        // Create backup
        const backupPath = `${filePath}.backup`;
        fs.writeFileSync(backupPath, content);

        // Write new content
        fs.writeFileSync(filePath, newContent);
        console.log(`✅ Modified: ${filePath}`);
        if (context.fullName) {
          console.log(`   📝 User context: ${context.fullName}`);
        }

        return { modified: true, context, backupPath };
      }
    }

    return { modified: false };
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return { modified: false, error };
  }
}

/**
 * Generate summary report
 */
function generateReport(results) {
  const totalFiles = results.length;
  const modifiedFiles = results.filter(r => r.modified).length;
  const filesWithContext = results.filter(r => r.context).length;

  console.log('\n📊 Codemod Summary');
  console.log('================');
  console.log(`Total files processed: ${totalFiles}`);
  console.log(`Files modified: ${modifiedFiles}`);
  console.log(`Files with user context: ${filesWithContext}`);

  if (CONFIG.dryRun) {
    console.log('\n🔍 DRY RUN MODE - No files were actually modified');
    console.log('Run without --dry-run to apply changes');
  }

  const errorCount = results.filter(r => r.error).length;
  if (errorCount > 0) {
    console.log(`\n⚠️  Errors encountered: ${errorCount}`);
    results.filter(r => r.error).forEach(r => {
      console.log(`   - ${r.error}`);
    });
  }

  return { totalFiles, modifiedFiles, filesWithContext, errorCount };
}

/**
 * Create ESLint rule to prevent direct DropdownMenuTrigger usage
 */
function createESLintRule() {
  const ruleContent = `
/**
 * ESLint Rule: Enforce AccessibleDropdownTrigger usage
 *
 * This rule prevents direct usage of Radix UI DropdownMenuTrigger
 * and enforces the use of our accessible wrapper instead.
 */

module.exports = {
  meta: {
    type: 'error',
    docs: {
      description: 'Enforce AccessibleDropdownTrigger instead of DropdownMenuTrigger',
      category: 'accessibility',
      recommended: true
    },
    fixable: 'code',
    schema: []
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === '@radix-ui/react-dropdown-menu') {
          const dropdownTriggerImport = node.specifiers.find(spec =>
            spec.imported && spec.imported.name === 'DropdownMenuTrigger'
          );

          if (dropdownTriggerImport) {
            context.report({
              node: dropdownTriggerImport,
              message: 'Use AccessibleDropdownTrigger from @/components/ui/accessible-dropdown-trigger instead of DropdownMenuTrigger',
              fix(fixer) {
                // Replace import
                return fixer.replaceText(
                  dropdownTriggerImport,
                  'AccessibleDropdownTrigger'
                );
              }
            });
          }
        }
      },

      JSXIdentifier(node) {
        if (node.name === 'DropdownMenuTrigger') {
          context.report({
            node,
            message: 'Use AccessibleDropdownTrigger instead of DropdownMenuTrigger for better accessibility',
            fix(fixer) {
              return fixer.replaceText(node, 'AccessibleDropdownTrigger');
            }
          });
        }
      }
    };
  }
};
`;

  const rulePath = path.join(__dirname, '../.eslintrules/no-dropdown-trigger.js');
  fs.writeFileSync(rulePath, ruleContent);
  console.log(`📋 ESLint rule created: ${rulePath}`);
}

/**
 * Main execution function
 */
function main() {
  console.log('🔧 Starting DropdownMenuTrigger Accessibility Codemod');
  console.log(`Mode: ${CONFIG.dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log('=====================================\n');

  // Find all relevant files
  const files = [];
  CONFIG.searchDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      files.push(...findFiles([dir], CONFIG.include, CONFIG.exclude));
    }
  });

  console.log(`📁 Found ${files.length} files to process\n`);

  // Process files
  const results = files.map(processFile);

  // Generate report
  const summary = generateReport(results);

  // Create ESLint rule
  if (!CONFIG.dryRun && summary.modifiedFiles > 0) {
    createESLintRule();
  }

  // Git status check
  if (!CONFIG.dryRun && summary.modifiedFiles > 0) {
    console.log('\n🔄 Git Status:');
    try {
      const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
      const modifiedLines = gitStatus.split('\n').filter(line => line.includes('M'));
      console.log(`Modified files: ${modifiedLines.length}`);
      modifiedLines.forEach(line => console.log(`   ${line}`));
    } catch (error) {
      console.log('Could not get git status');
    }
  }

  console.log('\n✅ Codemod completed successfully!');

  if (!CONFIG.dryRun) {
    console.log('\n📝 Next Steps:');
    console.log('1. Review the changes with: git diff');
    console.log('2. Run tests: npm test');
    console.log('3. Run accessibility tests: npm run test:a11y');
    console.log('4. Commit changes: git add . && git commit -m "feat(a11y): replace DropdownMenuTrigger with AccessibleDropdownTrigger"');
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = {
  transformFile,
  enhancedTransform,
  findFiles,
  createESLintRule
};