# Phase 1: 72-Hour Emergency Fixes

## Overview
This document contains detailed task breakdown and checklists for Phase 1 emergency fixes - the most critical issues that must be addressed within 72 hours to eliminate immediate security, legal, and accessibility blockers.

## Phase 1 Goals
- **Eliminate P0 security vulnerabilities** (data breach risk)
- **Address critical legal compliance gaps** (privacy policy, consent)
- **Fix P0 accessibility barriers** (form accessibility, navigation)
- **Lay testing foundation** for subsequent remediation work

## Total Estimated Effort: 59 hours

---

## 🔴 1. Secrets Hygiene & Rotation (SEC-001) - 2 hours

### Overview
Remove hardcoded API keys and establish proper secrets management to prevent data breaches.

### Task Checklist
- [ ] **Remove hardcoded keys from .env.local** (30 min)
  - [ ] Replace actual keys with placeholder values
  - [ ] Ensure `.env.local` is in `.gitignore`
  - [ ] Verify no secrets committed to git history

- [ ] **Update .env.example** (30 min)
  - [ ] Create template with all required environment variables
  - [ ] Add descriptive comments for each variable
  - [ ] Include security instructions at top of file

- [ ] **Rotate compromised keys** (30 min)
  - [ ] Generate new Supabase API keys
  - [ ] Generate new Stripe API keys
  - [ ] Generate new webhook secrets
  - [ ] Update any external integrations using old keys

- [ ] **Document key rotation** (30 min)
  - [ ] Create `/docs/runbooks/secrets.md`
  - [ ] Record key rotation date and procedure
  - [ ] Document key generation and management process

### Files to Modify
- `.env.local`
- `.env.example`
- `.gitignore`
- `/docs/runbooks/secrets.md` (create)

### Verification Steps
1. Check that `.env.local` contains only placeholder values
2. Verify `.env.local` is in `.gitignore`
3. Test application starts with new keys
4. Confirm no hardcoded secrets in codebase (search for `sk_test_`, `sb_`, etc.)

---

## 🔴 2. Auth Open-Redirect Allowlist (SEC-002) - 4 hours

### Overview
Fix open redirect vulnerability in authentication callback to prevent phishing attacks.

### Task Checklist
- [ ] **Implement allowlist validation** (2 hours)
  - [ ] Create `/lib/auth/allowlist.ts` with allowed paths
  - [ ] Implement `safePath` function in auth callback
  - [ ] Add validation for both `returnTo` and `next` parameters
  - [ ] Handle absolute URLs and query string manipulation attempts

- [ ] **Update auth callback route** (1 hour)
  - [ ] Import safePath function
  - [ ] Replace existing redirect logic with validated redirect
  - [ ] Add comprehensive error handling
  - [ ] Test various redirect scenarios

- [ ] **Add security tests** (1 hour)
  - [ ] Unit tests for allowlist validation
  - [ ] Integration tests for auth callback
  - [ ] Test malicious redirect attempts
  - [ ] Verify legitimate redirects work correctly

### Implementation Code
```typescript
// lib/auth/allowlist.ts
const ALLOWED_PATHS = new Set([
  "/dashboard",
  "/settings",
  "/billing",
  "/profile",
  "/",
]);

export function safePath(path?: string): string {
  try {
    if (!path) return "/dashboard";

    // Block absolute URLs
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return "/dashboard";
    }

    // Extract path portion, remove fragments and query strings
    const cleanPath = path.split("#")[0].split("?")[0];

    return ALLOWED_PATHS.has(cleanPath) ? cleanPath : "/dashboard";
  } catch {
    return "/dashboard";
  }
}
```

### Files to Modify
- `app/auth/callback/route.ts`
- `lib/auth/allowlist.ts` (create)

### Verification Steps
1. Test legitimate redirects (to `/dashboard`, `/settings`)
2. Test malicious redirects (to `https://evil.com`, `javascript:`)
3. Test edge cases (empty, malformed, query strings)
4. Verify security tests pass

---

## 🔴 3. Root Auth Middleware (ARCH-002) - 12 hours

### Overview
Implement root middleware to protect application routes and ensure authentication is working properly.

### Task Checklist
- [ ] **Create root middleware** (4 hours)
  - [ ] Create `middleware.ts` in project root
  - [ ] Import authentication utilities
  - [ ] Define public route allowlist
  - [ ] Implement token/session validation
  - [ ] Add redirect logic for unauthenticated users

- [ ] **Configure middleware matcher** (2 hours)
  - [ ] Set up appropriate route matching
  - [ ] Exclude static assets and API routes
  - [ ] Test route matching behavior
  - [ ] Optimize matcher performance

- [ ] **Integrate with existing auth** (3 hours)
  - [ ] Connect to Supabase session management
  - [ ] Handle different auth states
  - [ ] Implement proper error handling
  - [ ] Add logging for auth events

- [ ] **Test authentication flow** (3 hours)
  - [ ] Test protected route access
  - [ ] Test public route access
  - [ ] Test redirect after login
  - ] Test session expiration handling
  - [ ] Test error scenarios

### Implementation Code
```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/pricing",
  "/api/health",
  "/api/webhooks/stripe",
  "/terms",
  "/privacy",
  "/auth/callback"
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check authentication
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api/health).*)"]
};
```

### Files to Modify
- `middleware.ts` (create)
- `lib/supabase/server.ts` (may need updates)

### Verification Steps
1. Test access to protected routes when unauthenticated
2. Test access to public routes when unauthenticated
3. Test authenticated access to all routes
4. Test redirect logic with returnTo parameter
5. Test session expiration and renewal

---

## 🔴 4. Rate Limiting for All API Routes (SEC-004) - 6 hours

### Overview
Implement basic rate limiting to prevent DoS attacks and API abuse. Start with in-memory LRU, upgrade to Redis in Phase 2.

### Task Checklist
- [ ] **Create in-memory rate limiter** (2 hours)
  - [ ] Create `lib/rateLimit.ts` with LRU cache
  - [ ] Implement rate limiting logic
  - [ ] Add configurable limits per route type
  - [ ] Include proper error responses

- [ ] **Apply to all API routes** (2 hours)
  - [ ] Add rate limiting to contact form endpoint
  - [ ] Add rate limiting to auth endpoints
  - [ ] Add rate limiting to webhook endpoints
  - [ ] Add rate limiting to Stripe checkout

- [ ] **Test rate limiting effectiveness** (2 hours)
  - [ ] Test normal request behavior
  - [ ] Test rate limit enforcement
  - [ ] Test different IP scenarios
  - [ ] Test error handling and responses

### Implementation Code
```typescript
// lib/rateLimit.ts
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const requests = new Map<string, RateLimitRecord>();

export function rateLimit(
  identifier: string,
  limit = 60,
  windowMs = 60_000
): boolean {
  const now = Date.now();
  const record = requests.get(identifier);

  // Clean up expired records
  if (record && now > record.resetTime) {
    requests.delete(identifier);
    return true;
  }

  if (!record) {
    requests.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

// Helper to get client identifier
export function getClientId(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}
```

### Files to Modify
- `lib/rateLimit.ts` (create)
- `app/api/contact/route.ts`
- `app/api/stripe/checkout/route.ts`
- `app/api/webhooks/stripe/route.ts`
- `app/auth/.../route.ts` (all auth routes)

### Verification Steps
1. Test normal API usage below rate limits
2. Test rate limit enforcement
3. Test rate limit reset behavior
4. Test different IP identification scenarios
5. Test error responses when rate limited

---

## 🔴 5. Form Accessibility Basics (ACC-001/002) - 8 hours

### Overview
Implement basic form accessibility to ensure screen reader users can complete forms and navigate the application.

### Task Checklist
- [ ] **Create accessible form components** (3 hours)
  - [ ] Create `components/ui/form-field.tsx` with proper labeling
  - [ ] Add `aria-describedby` for error associations
  - [ ] Implement proper ARIA attributes
  - [ ] Add comprehensive error handling

- [ ] **Update existing forms** (3 hours)
  - [ ] Update login form with accessible patterns
  - [ ] Update contact form with accessible patterns
  - [ ] Update registration form if exists
  - [ ] Test all forms with screen readers

- [ ] **Implement focus management** (2 hours)
  - [ ] Remove negative tabIndex from main content
  - [ ] Add focus trap to mobile navigation sheet
  - [ ] Implement proper keyboard navigation
  - [ ] Test keyboard-only workflows

### Implementation Code
```typescript
// components/ui/form-field.tsx
interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({
  id,
  label,
  error,
  required = false,
  children
}: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p
          id={errorId}
          className="text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

// Usage in forms
<FormField id="email" label="Email" error={errors.email} required>
  <input
    id="email"
    name="email"
    type="email"
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? "email-error" : undefined}
    className="..."
  />
</FormField>
```

### Files to Modify
- `components/ui/form-field.tsx` (create)
- `app/auth/login/page.tsx`
- `components/ContactForm.tsx`
- `components/Header.tsx` (mobile sheet focus)
- `app/layout.tsx` (remove negative tabIndex)

### Verification Steps
1. Test form completion with screen reader (VoiceOver, NVDA)
2. Test keyboard-only navigation through forms
3. Test error announcement to screen readers
4. Test focus trap in mobile navigation
5. Verify all form fields have proper labels

---

## 🔴 6. Testing Framework Skeleton (ARCH-001) - 12 hours

### Overview
Set up comprehensive testing infrastructure including unit tests, component tests, and E2E tests.

### Task Checklist
- [ ] **Install and configure Vitest** (3 hours)
  - [ ] Install Vitest and related packages
  - [ ] Configure `vitest.config.ts`
  - [ ] Set up testing environment
  - [ ] Create basic test utilities

- [ ] **Set up Testing Library** (2 hours)
  - [ ] Install Testing Library packages
  - [ ] Configure React Testing Library
  - [ ] Create test utilities and helpers
  - [ ] Set up DOM testing environment

- [ ] **Configure Playwright** (3 hours)
  - [ ] Install Playwright and browsers
  - [ ] Create `playwright.config.ts`
  - [ ] Set up basic E2E tests
  - [ ] Configure CI integration

- [ ] **Create example tests** (4 hours)
  - [ ] Write unit tests for utilities
  - [ ] Write component tests for core components
  - [ ] Create E2E smoke test for login flow
  - [ ] Set up test coverage reporting

### Implementation Code
```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  coverage: {
    reporter: ["text", "json", "html"],
    exclude: [
      "node_modules/",
      "test/",
    ],
  },
});

// test/setup.ts
import { vi } from "vitest";
import "@testing-library/jest-dom";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock environment variables
vi.mock(process.env, {
  NEXT_PUBLIC_APP_URL: "http://localhost:3000",
});
```

### Files to Create/Modify
- `vitest.config.ts` (create)
- `playwright.config.ts` (create)
- `package.json` (add test scripts)
- `test/setup.ts` (create)
- `test/utils.test.ts` (create)
- `test/components/ContactForm.test.tsx` (create)
- `test/e2e/auth.spec.ts` (create)
- `.github/workflows/test.yml` (create)

### Verification Steps
1. Run `npm test` and verify tests pass
2. Run `npm run test:coverage` and check coverage
3. Run `npm run test:e2e` and verify E2E tests work
4. Check CI pipeline runs tests successfully
5. Verify all test types (unit, component, E2E) work

---

## 🔴 7. Legal Pages + Basic Consent (PRV-001/002) - 12 hours

### Overview
Create basic privacy policy and terms of service pages with simple consent management to establish legal compliance foundation.

### Task Checklist
- [ ] **Create privacy policy page** (3 hours)
  - [ ] Create `app/privacy/page.tsx`
  - [ ] Write basic privacy policy content
  - [ ] Include standard privacy clauses
  - [ ] Add link to footer navigation

- [ ] **Create terms of service page** (3 hours)
  - [ ] Create `app/terms/page.tsx`
  - [ ] Write basic terms and conditions
  - [ ] Include standard terms clauses
  - [ ] Add link to footer navigation

- [ ] **Implement basic consent banner** (4 hours)
  - [ ] Create `components/consent-banner.tsx`
  - [ ] Add local storage for consent preferences
  - [ ] Implement consent management API endpoints
  - [ ] Style banner to match application theme

- [ ] **Update footer navigation** (2 hours)
  - [ ] Fix broken links to legal pages
  - [ ] Ensure all footer links work
  - [ ] Test navigation to legal pages
  - [ ] Add accessibility attributes to links

### Implementation Code
```typescript
// app/privacy/page.tsx
export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
        <p className="text-gray-700 dark:text-gray-300">
          We collect information you provide directly to us, such as when you create an account,
          use our services, or contact us for support.
        </p>
      </section>

      {/* Add more sections as needed */}
    </div>
  );
}

// components/consent-banner.tsx
"use client";

import { useState, useEffect } from "react";

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptConsent = () => {
    localStorage.setItem("consent", "accepted");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm">
          We use cookies to enhance your experience. By continuing to visit this site
          you agree to our use of cookies.
        </p>
        <button
          onClick={acceptConsent}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
```

### Files to Create/Modify
- `app/privacy/page.tsx` (create)
- `app/terms/page.tsx` (create)
- `components/consent-banner.tsx` (create)
- `app/layout.tsx` (add consent banner)
- `components/Footer.tsx` (fix links)

### Verification Steps
1. Navigate to `/privacy` and `/terms` - should return 200
2. Test consent banner appears for new users
3. Test consent banner doesn't appear for returning users
4. Verify all footer links work correctly
5. Test pages are accessible and well-formatted

---

## 🎯 Phase 1 Success Metrics

### Completion Checklist
- [ ] All P0 security issues resolved
- [ ] Basic legal compliance established
- [ ] Critical accessibility barriers removed
- [ ] Testing infrastructure operational
- [ ] All changes deployed to staging
- [ ] Security validation passes

### Quality Gates
- [ ] No hardcoded secrets in codebase
- [ ] All auth flows tested and working
- [ ] Rate limiting active on all API endpoints
- [ ] Forms pass basic accessibility tests
- [ ] Test suite runs without failures
- [ ] Legal pages accessible and linked

### Rollback Plan
- [ ] Database backup created before starting
- [ ] Feature flags ready for quick rollback
- [ ] Monitoring configured for new features
- [ ] Incident response procedures documented

---

## 📊 Phase 1 Timeline (72 Hours)

### Day 1 (24 hours)
- **Morning**: Secrets hygiene (SEC-001) - 2 hours
- **Afternoon**: Open redirect fix (SEC-002) - 4 hours
- **Evening**: Start auth middleware (ARCH-002) - 4 hours

### Day 2 (24 hours)
- **Morning**: Complete auth middleware (ARCH-002) - 8 hours
- **Afternoon**: Rate limiting (SEC-004) - 6 hours
- **Evening**: Start form accessibility (ACC-001/002) - 2 hours

### Day 3 (24 hours)
- **Morning**: Complete form accessibility (ACC-001/002) - 6 hours
- **Afternoon**: Testing framework (ARCH-001) - 12 hours
- **Evening**: Legal pages (PRV-001/002) - 6 hours

## 🚨 Known Risks & Mitigations

### Security Risks
- **Risk**: Breaking auth flow with middleware
- **Mitigation**: Test extensively in staging, have rollback ready
- **Risk**: Rate limiting blocking legitimate users
- **Mitigation**: Set reasonable limits, monitor logs

### Legal Risks
- **Risk**: Basic legal pages insufficient for compliance
- **Mitigation**: Mark as temporary, schedule legal review
- **Risk**: Consent banner not compliant with regulations
- **Mitigation**: Implement as MVP, enhance in Phase 2

### Technical Risks
- **Risk**: Testing setup causes build issues
- **Mitigation**: Implement incrementally, test frequently
- **Risk**: Accessibility changes break existing functionality
- **Mitigation**: Comprehensive testing before deployment