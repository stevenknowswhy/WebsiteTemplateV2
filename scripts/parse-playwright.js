// node scripts/parse-playwright.js artifacts/console-a11y-baseline.json
const fs = require('fs');
const path = require('path');

const input = process.argv[2];
if (!input) {
  console.error('Usage: node scripts/parse-playwright.js <baseline-json>');
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(input, 'utf8'));
const outDir = 'artifacts/issue-bodies';
fs.mkdirSync(outDir, { recursive: true });

const rows = [['route', 'type', 'signature', 'source', 'impact', 'action']];

function slug(s) {
  return s.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Helper to extract route from test title
function extractRoute(title) {
  const routeMatch = title.match(/on (.+)$/);
  return routeMatch ? routeMatch[1] : title;
}

// Process each test suite
for (const suite of raw.suites || []) {
  for (const spec of suite.specs || []) {
    for (const t of spec.tests || []) {
      const title = t.title || spec.title || '';
      const route = extractRoute(title);

      // Heuristic: look for our custom attachments if the harness added them.
      const attachments = (t.results?.[0]?.attachments) || [];
      const meta = attachments.find(a => a.name === 'console-axe-json');

      if (!meta) {
        // If no custom attachment, try to extract from test results directly
        const violations = t.results?.[0]?.violations || [];
        if (violations.length > 0) {
          for (const v of violations) {
            const signature = `${v.id} (${v.impact})`;
            const source = `nodes:${(v.nodes || []).map(n => n.target?.[0] || 'unknown').join(',')}`;
            rows.push([route, 'a11y', signature, source, v.impact || 'unknown', 'fix-or-waive']);

            const body = `## A11y violation\n\n**Route:** ${route}\n\n**ID:** ${v.id}\n**Impact:** ${v.impact}\n**Nodes:** ${(v.nodes || []).map(n => n.target?.[0] || 'unknown').join(', ')}\n\n### Proposed fix\n- ...\n\n### WCAG\n- ${v.help || ''}\n\n### Help URL\n- ${v.helpUrl || ''}\n`;
            fs.writeFileSync(path.join(outDir, slug(`${route}-a11y-${v.id}`) + '.md'), body);
          }
        }
        continue;
      }

      // Parse custom attachment data
      const data = JSON.parse(fs.readFileSync(meta.path, 'utf8'));

      // Console entries
      for (const e of data.console || []) {
        const signature = `[${e.type}] ${e.text.slice(0, 140)}`;
        const source = e.url || '';
        rows.push([route, 'console', signature, source, e.impact || '', 'fix-or-allowlist']);

        const body = `## Console issue\n\n**Route:** ${route}\n\n**Type:** ${e.type}\n**Text:** ${e.text}\n**Source:** ${e.url || ''}\n\n### Proposed fix\n- ...\n`;
        fs.writeFileSync(path.join(outDir, slug(`${route}-console-${e.type}-${e.text.slice(0, 40)}`) + '.md'), body);
      }

      // Axe violations
      for (const v of data.axe || []) {
        const signature = `${v.id} (${v.impact})`;
        const source = `selectors:${(v.nodes || []).join(',')}`;
        rows.push([route, 'a11y', signature, source, v.impact || 'unknown', 'fix-or-waive']);

        const body = `## A11y violation\n\n**Route:** ${route}\n\n**ID:** ${v.id}\n**Impact:** ${v.impact}\n**Nodes:** ${(v.nodes || []).join(', ')}\n\n### Proposed fix\n- ...\n\n### WCAG\n- ${v.help || ''}\n\n### Help URL\n- ${v.helpUrl || ''}\n`;
        fs.writeFileSync(path.join(outDir, slug(`${route}-a11y-${v.id}`) + '.md'), body);
      }
    }
  }
}

// Write CSV summary
fs.writeFileSync('artifacts/console-a11y-summary.csv',
  rows.map(r => r.map(x => `"${String(x).replace(/"/g, '""')}"`).join(',')).join('\n')
);

// Generate summary statistics
const totalRows = rows.length - 1; // Exclude header
const consoleIssues = rows.filter(r => r[1] === 'console').length;
const a11yIssues = rows.filter(r => r[1] === 'a11y').length;
const criticalIssues = rows.filter(r => r[4] === 'critical').length;
const seriousIssues = rows.filter(r => r[4] === 'serious').length;
const moderateIssues = rows.filter(r => r[4] === 'moderate').length;

// Generate triage matrix
const triageMatrix = `# Console & Accessibility Violations Triage Matrix

## Executive Summary
- **Total Routes Tested**: ${raw.suites?.[0]?.specs?.length || 0}
- **Total Violations**: ${totalRows}
- **Console Issues**: ${consoleIssues}
- **A11y Issues**: ${a11yIssues}
- **Critical Impact**: ${criticalIssues}
- **Serious Impact**: ${seriousIssues}
- **Moderate Impact**: ${moderateIssues}

## Issue Breakdown

### By Impact Level
- **Critical**: ${criticalIssues} issues - Requires immediate fix
- **Serious**: ${seriousIssues} issues - High priority fix
- **Moderate**: ${moderateIssues} issues - Medium priority fix

### By Type
- **Console**: ${consoleIssues} issues - First-party and third-party
- **Accessibility**: ${a11yIssues} issues - WCAG violations

### By Route
${(() => {
  const routeStats = rows.slice(1).reduce((acc, row) => {
    const route = row[0];
    if (!acc[route]) acc[route] = { console: 0, a11y: 0, critical: 0, serious: 0, moderate: 0 };
    acc[route][row[1]]++;
    if (row[4] === 'critical') acc[route].critical++;
    else if (row[4] === 'serious') acc[route].serious++;
    else if (row[4] === 'moderate') acc[route].moderate++;
    return acc;
  }, {});

  return Object.entries(routeStats).map(([route, stats]) =>
    `- **${route}**: ${stats.a11y} a11y, ${stats.console} console (${stats.critical} critical, ${stats.serious} serious, ${stats.moderate} moderate)`
  ).join('\n');
})()}

## Prioritized Fix Plan

### Phase 1: Critical Issues (P0)
- Fix all ${criticalIssues} critical accessibility violations
- Focus on button names and form controls
- Estimated time: ${criticalIssues * 15} minutes

### Phase 2: Serious Issues (P1)
- Address ${seriousIssues} serious violations
- Focus on color contrast and heading structure
- Estimated time: ${seriousIssues * 10} minutes

### Phase 3: Moderate Issues (P2)
- Resolve ${moderateIssues} moderate violations
- Focus on landmark structure and content organization
- Estimated time: ${moderateIssues * 5} minutes

## Next Steps
1. Review generated issue bodies in ./artifacts/issue-bodies/
2. Apply fixes starting with critical issues
3. Re-run tests to verify fixes
4. Update documentation and create PR

Generated: ${new Date().toISOString()}
`;

fs.writeFileSync('artifacts/triage-matrix.md', triageMatrix);

console.log(`✅ Generated artifacts/console-a11y-summary.csv with ${totalRows} issues`);
console.log(`✅ Generated ${fs.readdirSync(outDir).length} issue bodies in ${outDir}`);
console.log(`✅ Generated artifacts/triage-matrix.md`);
console.log(`📊 Summary: ${consoleIssues} console, ${a11yIssues} a11y issues (${criticalIssues} critical, ${seriousIssues} serious, ${moderateIssues} moderate)`);