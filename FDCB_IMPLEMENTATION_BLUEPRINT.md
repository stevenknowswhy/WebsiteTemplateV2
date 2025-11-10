# Forhemit Data Center Builders (FDCB) - Implementation Blueprint

**Technical Implementation**: Complete Next.js + TypeScript skeleton ready for deployment
**Style System**: Light, architectural, high-end institutional design
**Architecture**: Public content + gated investor area with authentication

---

## 🚀 Quick Start Guide

### 1. Project Setup
```bash
# Create fresh Next.js TypeScript project
pnpm create next-app@latest data-center-site --ts --no-eslint --no-src-dir --app --import-alias "@/*"
cd data-center-site

# Install core dependencies
pnpm add -D tailwindcss postcss autoprefixer
pnpm add class-variance-authority clsx tailwind-merge

# Initialize Tailwind configuration
npx tailwindcss init -p
```

### 2. File Replacement
Replace the generated files with the code blocks below (matching file paths exactly).

### 3. Development Start
```bash
pnpm dev
```

---

## 📁 File Structure

```
data-center-site/
├── app/
│   ├── (public)/               # Public pages
│   │   ├── page.tsx           # Home
│   │   ├── mission/page.tsx   # Mission & Principles
│   │   ├── facility/page.tsx  # Facility specs
│   │   ├── security/page.tsx  # Compliance
│   │   ├── updates/page.tsx   # News & updates
│   │   ├── careers/page.tsx   # Team/careers
│   │   └── contact/page.tsx   # Contact forms
│   ├── (investors)/           # Gated investor area
│   │   ├── investors/page.tsx         # Public teaser
│   │   ├── investors/apply/page.tsx   # Access request
│   │   ├── investors/login/page.tsx   # Authentication
│   │   ├── investors/room/page.tsx    # Data room
│   │   └── investors/docs/[slug]/page.tsx  # Document viewer
│   ├── layout.tsx              # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # Site header
│   │   ├── Nav.tsx            # Navigation
│   │   ├── Footer.tsx         # Site footer
│   │   └── Section.tsx        # Reusable section
│   └── cards/
│       └── KPI.tsx            # Metric cards
├── lib/
│   └── constants.ts           # Site constants
└── public/
    └── favicon.ico
```

---

## ⚙️ Configuration Files

### package.json
```json
{
  "name": "data-center-site",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "autoprefixer": "latest",
    "postcss": "latest",
    "tailwindcss": "latest",
    "typescript": "latest"
  }
}
```

### next.config.mjs
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["clsx", "tailwind-merge", "class-variance-authority"]
  }
};

export default nextConfig;
```

### tailwind.config.ts
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        accent: "var(--accent)",
        success: "var(--success)",
        gold: "var(--gold)"
      },
      fontFamily: {
        sans: ["var(--font-inter)"]
      },
      container: {
        center: true,
        padding: "1.5rem"
      },
      boxShadow: {
        soft: "0 8px 24px rgba(15, 23, 42, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;
```

---

## 🎨 Design System Implementation

### Global Styles with Design Tokens (`app/globals.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ---- Design Tokens (light, architectural) ---- */
:root{
  --bg: #F8F9FB;
  --ink: #0F172A;
  --muted: #6B7280;
  --line: #E6E8EC;
  --accent: #0A61F7;
  --success: #0BA37F;
  --gold: #C6A15B;
}

/* ---- Base ---- */
html, body, #__next {
  height: 100%;
  background: var(--bg);
  color: var(--ink);
}

::selection {
  background: color-mix(in oklab, var(--accent) 20%, white);
}

/* Type rhythm */
h1,h2,h3 { letter-spacing: -0.01em; }
p { color: var(--ink); }

/* Keylines */
.keyline {
  border-color: var(--line);
}

/* Focus ring */
.focus-outline:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Subtle card */
.card {
  @apply bg-white border border-line rounded-2xl shadow-soft;
}

/* Container widths */
.container-narrow { @apply max-w-4xl mx-auto px-6; }
.container-wide   { @apply max-w-6xl mx-auto px-6; }
```

### Root Layout (`app/layout.tsx`)
```typescript
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Forhemit Data Center Builders | Sovereign Infrastructure",
  description: "Underground, EMP-hardened data infrastructure built to institutional standards.",
  metadataBase: new URL("https://forhemit.com"),
  openGraph: {
    title: "Forhemit Data Center Builders",
    description: "Defense-grade by design. Built for AI era.",
    type: "website",
    url: "https://forhemit.com"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---

## 📄 Page Implementations

### Home Page (`app/(public)/page.tsx`)
```typescript
import Section from "@/components/layout/Section";
import KPI from "@/components/cards/KPI";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b keyline">
        <div className="implementation-container py-24 md:py-28">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6">
              <p className="uppercase text-sm tracking-widest text-muted">Sovereign Infrastructure</p>
              <h1 className="mt-2 text-4xl md:text-5xl font-medium">
                Underground. EMP-hardened. <br />Built for AI era.
              </h1>
              <p className="mt-6 text-lg text-muted">
                Private-sector speed with government-grade security. Transparent delivery, institutional governance.
              </p>
              <div className="mt-8 flex gap-3">
                <a href="/facility" className="focus-outline inline-flex items-center rounded-xl bg-ink text-white px-5 py-3">See Facility</a>
                <a href="/investors" className="focus-outline inline-flex items-center rounded-xl border keyline px-5 py-3">Investor Access</a>
              </div>
            </div>
            <div className="md:col-span-6">
              {/* Placeholder for sectional render */}
              <div className="card h-64 md:h-80 flex items-center justify-center text-muted">
                Sectional Render Placeholder
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPI label="Power Availability" value="xx MVA" />
            <KPI label="Redundancy" value="N+N" />
            <KPI label="Buyers under NDA" value="3+" />
            <KPI label="Target LCP" value="< 2.5s" />
          </div>
        </div>
      </section>

      {/* Credibility trio */}
      <Section kicker="Credibility" title="Speed, not shortcuts">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="text-xl font-medium">Parallel Permitting</h3>
            <p className="mt-2 text-muted">Expeditor + retired-AHJ review with inspection buffers.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-medium">Defense-Grade by Design</h3>
            <p className="mt-2 text-muted">EMP envelope, SCIF-ready pathways, N+N core systems.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-medium">Transparent Delivery</h3>
            <p className="mt-2 text-muted">Milestone tracker and third-party QA logs.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
```

### Facility Page (`app/(public)/facility/page.tsx`)
```typescript
import Section from "@/components/layout/Section";

export default function FacilityPage() {
  return (
    <>
      <Section kicker="Facility" title="Architecture & Systems">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-7 card h-80 flex items-center justify-center text-muted">
            Sectional Diagram Placeholder
          </div>
          <div className="md:col-span-5 space-y-4">
            <div className="card p-5">
              <h3 className="text-lg font-medium">Power</h3>
              <p className="text-muted">xx MVA, dual feeds, on-site generation.</p>
            </div>
            <div className="card p-5">
              <h3 className="text-lg font-medium">Cooling</h3>
              <p className="text-muted">kW/rack targets, heat-recovery options.</p>
            </div>
            <div className="card p-5">
              <h3 className="text-lg font-medium">Resilience</h3>
              <p className="text-muted">N+N, blast walls, EMP envelope.</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
```

---

## 🔐 Investor Area Implementation

### Investor Teaser Page (`app/(investors)/investors/page.tsx`)
```typescript
import Section from "@/components/layout/Section";

export default function InvestorsTeaserPage(){
  return (
    <Section kicker="Investors" title="Institutional access">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-muted">
            An institutional path to a scarce asset: sovereign-grade, underground compute capacity.
          </p>
          <div className="mt-6 flex gap-3">
            <a className="rounded-xl bg-ink text-white px-5 py-3" href="/investors/apply">Request Access</a>
            <a className="rounded-xl border keyline px-5 py-3" href="/mission">Learn More</a>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-medium">Current KPIs</h3>
          <ul className="mt-2 text-muted list-disc pl-5">
            <li>Buyers under NDA: 3+</li>
            <li>LOIs: in progress</li>
            <li>Long-lead orders: scheduled</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
```

### Investor Application (`app/(investors)/investors/apply/page.tsx`)
```typescript
import Section from "@/components/layout/Section";

export default function InvestorApplyPage(){
  return (
    <Section kicker="Investors" title="Request data room access">
      <form className="card p-6 grid gap-4 max-w-2xl">
        <div className="grid md:grid-cols-2 gap-4">
          <input className="border keyline rounded-xl px-4 py-3 focus-outline" placeholder="Full name" />
          <input className="border keyline rounded-xl px-4 py-3 focus-outline" placeholder="Work email" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input className="border keyline rounded-xl px-4 py-3 focus-outline" placeholder="Company / Fund" />
          <input className="border keyline rounded-xl px-4 py-3 focus-outline" placeholder="Role / Title" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input className="border keyline rounded-xl px-4 py-3 focus-outline" placeholder="AUM (optional)" />
          <input className="border keyline rounded-xl px-4 py-3 focus-outline" placeholder="Horizon (months)" />
        </div>
        <label className="flex items-start gap-3">
          <input type="checkbox" className="mt-1" />
          <span className="text-sm text-muted">
            I agree to NDA terms (preview)
          </span>
        </label>
        <button className="rounded-xl bg-ink text-white px-5 py-3 w-fit">Submit Request</button>
      </form>
    </Section>
  );
}
```

---

## 🧩 Component Library

### Header Component (`components/layout/Header.tsx`)
```typescript
import Nav from "./Nav";

export default function Header(){
  return (
    <header className="border-b keyline bg-white/70 backdrop-blur">
      <div className="implementation-container h-16 flex items-center justify-between">
        <a href="/" className="font-medium tracking-tight">Forhemit Data Center Builders</a>
        <Nav />
      </div>
    </header>
  );
}
```

### Navigation Component (`components/layout/Nav.tsx`)
```typescript
"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/mission", label: "Mission" },
  { href: "/facility", label: "Facility" },
  { href: "/security", label: "Security" },
  { href: "/updates", label: "Updates" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/investors", label: "Investors" }
];

export default function Nav(){
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-4">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className={clsx(
            "px-3 py-2 rounded-lg text-sm transition-colors",
            pathname?.startsWith(l.href)
              ? "bg-ink text-white"
              : "text-ink/80 hover:bg-black/5"
          )}
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}
```

### Reusable Section Component (`components/layout/Section.tsx`)
```typescript
export default function Section({
  title,
  kicker,
  children
}: {
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-16 border-b keyline">
      <div className="implementation-container">
        {kicker && (
          <p className="uppercase tracking-widest text-sm text-muted">
            {kicker}
          </p>
        )}
        <h2 className="mt-2 text-3xl md:text-4xl font-medium">{title}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
```

### KPI Card Component (`components/cards/KPI.tsx`)
```typescript
export default function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-5">
      <div className="text-sm uppercase tracking-widest text-muted">{label}</div>
      <div className="mt-2 text-2xl font-medium">{value}</div>
    </div>
  );
}
```

---

## 🎯 Development Roadmap

### Phase 1: Core Infrastructure (Days 1-2)
- [x] Setup Next.js project with TypeScript
- [x] Configure Tailwind CSS with design tokens
- [x] Implement base layout and navigation
- [x] Create reusable components

### Phase 2: Public Pages (Days 3-4)
- [ ] Implement Home page with hero section
- [ ] Create Mission, Facility, Security pages
- [ ] Build Updates, Careers, Contact pages
- [ ] Add KPI cards and credibility components

### Phase 3: Investor Area (Days 5-6)
- [ ] Implement investor teaser page
- [ ] Create access request form
- [ ] Setup authentication page (magic link)
- [ ] Build data room interface
- [ ] Add document viewer with watermarking

### Phase 4: Polish & Optimization (Days 7-8)
- [ ] Performance optimization (images, fonts)
- [ ] Accessibility audit and fixes
- [ ] Mobile responsiveness fine-tuning
- [ ] SEO meta tags and structured data
- [ ] Analytics and monitoring setup

---

## 📊 Success Metrics

### Technical Metrics
- **Core Web Vitals**: LCP < 2.5s, CLS < 0.1
- **Accessibility**: WCAG 2.2 AA compliant
- **Performance**: 90+ on Lighthouse
- **SEO**: 90+ on SEO audit

### Business Metrics
- **Time to Launch**: 8 days
- **Investor Conversion**: Track access request → approval rate
- **Content Engagement**: Time on page, scroll depth
- **Mobile Usage**: Ensure >60% mobile performance

---

**Next Steps**:
1. Create new project using quick start guide
2. Replace files with implementation code
3. Begin Phase 2 development with content and imagery
4. Plan for Supabase integration for investor authentication