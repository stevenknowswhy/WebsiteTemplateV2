# E2E Testing Guide

This guide covers the comprehensive End-to-End (E2E) testing implementation for the Forhem PBC application using Playwright and axe-core for accessibility testing.

## Overview

Our E2E testing suite includes:
- **Smoke Tests**: Core functionality verification
- **Accessibility Tests**: WCAG 2.1 AA compliance checks
- **Admin Panel Tests**: Administrative interface testing
- **Performance Tests**: Core Web Vitals and performance budgets
- **API Tests**: Endpoint functionality and security
- **Responsive Tests**: Mobile and tablet compatibility
- **Cross-Browser Tests**: Firefox and Safari compatibility

## Test Structure

### Test Categories

| Category | Description | Tag | Command |
|----------|-------------|-----|---------|
| Smoke | Basic functionality and navigation | `@smoke` | `npm run test:e2e:smoke` |
| Accessibility | WCAG compliance checks | `@a11y` | `npm run test:e2e:a11y` |
| Admin | Admin panel functionality | `@admin` | `npm run test:e2e:admin` |
| Performance | Performance metrics and budgets | `@performance` | `npm run test:e2e:performance` |
| API | API endpoint testing | `@api` | `npm run test:e2e:api` |
| Responsive | Mobile/tablet compatibility | `@responsive` | `npm run test:responsive` |
| Cross-browser | Firefox/Safari compatibility | N/A | `npm run test:cross-browser` |

### Test Files

- `tests/e2e/smoke.spec.ts` - Core functionality tests
- `tests/e2e/a11y.spec.ts` - Accessibility compliance tests
- `tests/e2e/admin.spec.ts` - Admin panel tests
- `tests/e2e/performance.spec.ts` - Performance budget tests
- `tests/e2e/api.spec.ts` - API endpoint tests
- `tests/e2e/auth.spec.ts` - Authentication flow tests
- `tests/e2e/security-headers.spec.ts` - Security header validation

## Running Tests

### Local Development

```bash
# Run all E2E tests
npm run test:e2e:all

# Run specific test categories
npm run test:e2e:smoke
npm run test:e2e:a11y
npm run test:e2e:admin
npm run test:e2e:performance
npm run test:e2e:api

# Run CI test suite (smoke + a11y + admin + api)
npm run test:e2e:ci

# Run tests with custom runner
node scripts/run-e2e-tests.js [smoke|a11y|admin|performance|api|ci|all]
```

### Individual Test Suites

```bash
# Run smoke tests only
npx playwright test --grep @smoke

# Run accessibility tests only
npx playwright test --grep @a11y

# Run tests on specific browser
npx playwright test --project=firefox --grep @smoke

# Run tests in headed mode (useful for debugging)
npx playwright test --grep @smoke --headed

# Run tests with trace
npx playwright test --grep @smoke --trace on
```

## Test Configuration

### Playwright Configuration

The `playwright.config.ts` file includes:
- Multiple browser support (Chrome, Firefox, Safari)
- Mobile and tablet viewports
- Screenshot and video capture on failure
- Network idle waiting for reliable tests
- Accessibility defaults

### Environment Setup

Tests require:
- Node.js 18+
- Playwright browsers installed
- Development server running on port 3000

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Start development server
npm run dev

# Run tests in another terminal
npm run test:e2e:smoke
```

## Accessibility Testing

### WCAG Compliance

Our accessibility tests check for:
- **Critical violations**: Must be fixed immediately
- **Serious violations**: Should be fixed
- **Moderate violations**: Nice to have fixes
- **Minor violations**: Low priority

### Tested Pages

**Public Pages:**
- Homepage (/)
- Pricing (/pricing)
- Privacy Policy (/privacy)
- Terms of Service (/terms)
- About (/about)
- Contact (/contact)

**Admin Pages:**
- Dashboard (/admin)
- Nodes Management (/admin/nodes)
- Alerts (/admin/alerts)
- Users (/admin/users)
- Settings (/admin/settings)
- Audit Log (/admin/audit)
- Telemetry (/admin/telemetry)

### Dynamic Accessibility Tests

- Mobile navigation accessibility
- Keyboard navigation support
- Form validation error accessibility
- Color contrast requirements
- Responsive design accessibility

## Performance Testing

### Performance Budgets

- **Page Load Time**: < 3 seconds (desktop), < 4 seconds (mobile)
- **First Contentful Paint**: < 2 seconds
- **DOM Content Loaded**: < 1.5 seconds
- **Time to Interactive**: < 3 seconds
- **Core Web Vitals**:
  - LCP: < 2.5s
  - FID: < 100ms
  - CLS: < 0.1

### Performance Tests Include

- Homepage load performance
- Admin dashboard efficiency
- Chart rendering performance
- Mobile performance
- Large data table pagination
- Search functionality responsiveness
- Filter operation efficiency
- Memory usage validation
- Network request optimization

## Admin Panel Testing

### Authentication Tests

- Unauthenticated user redirects
- Login form accessibility
- Form validation
- Loading states
- Error handling
- Keyboard navigation

### Admin Functionality Tests

- Dashboard loading and navigation
- Nodes management (CRUD operations)
- Alerts management (acknowledge/resolve)
- User role management
- Settings configuration
- Audit log search and export
- Telemetry dashboard performance

### Responsive Design Tests

- Mobile navigation (375x667)
- Tablet layout (768x1024)
- Desktop layout (1280x720)

## API Testing

### Endpoint Categories

**Health Check Endpoints:**
- `/api/health` - Service health
- `/api/ready` - Readiness probe
- `/api/live` - Liveness probe

**Public API:**
- `/api/contact` - Contact form submission

**Admin API (protected):**
- `/api/admin/*` - Admin panel endpoints
- `/api/admin/telemetry/*` - Telemetry endpoints

### API Test Coverage

- Response status codes
- JSON response format
- Authentication requirements
- Input validation
- Rate limiting
- CORS headers
- Security headers
- Error handling
- Request size limits
- Response times

## CI/CD Integration

### GitHub Actions Workflow

The `.github/workflows/e2e-tests.yml` includes:

1. **Setup**: Install dependencies and browsers
2. **Lint & Type Check**: Code quality validation
3. **Build**: Application build
4. **Test Suites**: Run various test categories
5. **Report Generation**: Comprehensive test reporting
6. **Performance Regression**: Performance monitoring
7. **Security Tests**: Security validation
8. **Notifications**: Failure notifications

### Test Triggers

- **Push to main/develop**: Full test suite
- **Pull Requests**: CI test suite
- **Daily Schedule**: Full test suite
- **Manual Dispatch**: Selective test execution

## Debugging Tests

### Common Issues

1. **Test Flakiness**:
   - Use `page.waitForLoadState('networkidle')`
   - Add proper waits for dynamic content
   - Use data-testid attributes for reliable selectors

2. **Authentication Issues**:
   - Mock authentication for E2E tests
   - Use consistent auth state across tests
   - Handle redirects properly

3. **Performance Test Variability**:
   - Run tests multiple times
   - Use median values for performance metrics
   - Consider CI environment limitations

### Debugging Tools

```bash
# Run tests with UI
npx playwright test --ui

# Run with tracing
npx playwright test --trace on

# Run with screenshots
npx playwright test --screenshots only-on-failure

# Run in headed mode for debugging
npx playwright test --headed

# Run specific test file
npx playwright test tests/e2e/smoke.spec.ts
```

## Best Practices

### Test Writing

1. **Use Descriptive Names**: Clear test descriptions with tags
2. **Data-testid Attributes**: Reliable element selection
3. **Proper Waits**: Wait for network idle and specific conditions
4. **Accessibility First**: Include a11y checks in functional tests
5. **Mobile-First**: Test on mobile viewports first
6. **Cross-Browser**: Ensure compatibility across browsers

### Test Maintenance

1. **Regular Updates**: Keep tests updated with feature changes
2. **Review Failures**: Investigate and fix test failures promptly
3. **Performance Monitoring**: Track performance over time
4. **Accessibility Audits**: Regular accessibility reviews
5. **Documentation**: Keep test documentation current

### Selectors Strategy

```typescript
// Good: Use data-testid for application-specific elements
await page.locator('[data-testid="submit-button"]').click();

// Good: Use semantic HTML and ARIA for accessibility
await page.locator('button[aria-label="Submit form"]').click();

// Good: Use semantic role locators
await page.locator('button[name="submit"]').click();

// Avoid: Brittle CSS selectors
await page.locator('.btn.btn-primary.btn-lg').click();
```

## Reporting and Analysis

### Test Reports

- **HTML Reports**: Detailed test execution reports
- **JSON Reports**: Machine-readable test results
- **Screenshots**: Failure screenshots
- **Videos**: Test execution videos
- **Traces**: Detailed execution traces

### Performance Monitoring

- **Core Web Vitals**: Track over time
- **Performance Budgets**: Monitor compliance
- **Regression Detection**: Alert on performance issues
- **Trend Analysis**: Long-term performance trends

### Accessibility Monitoring

- **Critical Violations**: Zero-tolerance policy
- **Violation Tracking**: Monitor accessibility debt
- **Remediation Planning**: Prioritize fixes
- **Compliance Reporting**: Regular accessibility reports

## Contributing

When adding new features:

1. **Add E2E Tests**: Cover new functionality
2. **Accessibility Tests**: Ensure a11y compliance
3. **Performance Tests**: Check performance impact
4. **Update Documentation**: Keep guides current
5. **Review Test Coverage**: Ensure comprehensive testing

### Test Review Checklist

- [ ] Tests cover all user flows
- [ ] Accessibility compliance verified
- [ ] Performance budgets respected
- [ ] Cross-browser compatibility tested
- [ ] Mobile responsiveness validated
- [ ] Error scenarios tested
- [ ] Documentation updated

## Troubleshooting

### Common Test Failures

1. **Timeout Issues**: Increase timeout or improve selectors
2. **Element Not Found**: Check page load timing
3. **Authentication Failures**: Verify auth mocking
4. **Performance Regressions**: Check test environment
5. **Accessibility Violations**: Review recent changes

### Getting Help

- Check test logs and artifacts
- Review GitHub Actions workflow runs
- Examine screenshots and videos
- Use Playwright Inspector for debugging
- Consult team documentation

## Future Enhancements

### Planned Improvements

1. **Visual Regression Testing**: Add screenshot comparison
2. **API Contract Testing**: More comprehensive API testing
3. **Load Testing**: Performance under load
4. **Internationalization Testing**: Multi-language support
5. **Component Testing**: Isolated component testing

### Tooling Improvements

1. **Better Reporting**: Enhanced test reporting dashboards
2. **Performance Monitoring**: Real-time performance tracking
3. **Accessibility Scanning**: Automated accessibility monitoring
4. **Test Data Management**: Better test data handling
5. **CI/CD Optimization**: Faster test execution