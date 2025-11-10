# Forhem PBC Website Architecture Documentation

## Overview

The Forhem PBC website is built with Next.js 14 App Router, TypeScript, and Tailwind CSS, featuring a comprehensive digital presence for a Public Benefit Corporation focused on smart city infrastructure.

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + CSS custom properties
- **UI Components**: Shadcn/ui with custom theming
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Payments**: Stripe integration
- **Analytics**: Comprehensive tracking implementation

## Site Structure

### Navigation Architecture

The site follows a hierarchical navigation structure with 9 primary sections:

```
/                           # Home
├── solutions/              # Solutions overview
│   ├── hello-smart-node/   # Product details
│   └── city-safe/          # Safety platform
├── for-cities/             # Municipal solutions
├── for-building-owners/    # Property partnerships
├── investors/              # Investor relations
├── why-forhem/             # Mission & values
├── news/                   # News & insights
├── tools/                  # Interactive tools
│   ├── revenue-calculator/ # Revenue projection tool
│   ├── deployment-map/     # Interactive deployment map
│   ├── 3d-viewer/          # Product 3D viewer
│   ├── analytics/          # Analytics dashboard
│   ├── newsletter/         # Newsletter signup
│   └── timeline/           # Company timeline
├── careers/                # Careers information
└── contact/                # Contact forms
```

### Route Groups

The site uses Next.js route groups for organization:

- `(public)/` - Public-facing pages
- `(marketing)/` - Marketing landing pages
- `api/` - API routes
- `(auth)/` - Authentication pages (future)

## Component Architecture

### Design System

The design system uses CSS custom properties defined in `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}
```

### Color Palette

The Forhem brand uses a blue/green/purple color scheme:

- **Primary Blue**: `rgb(59 130 246)` - Main CTAs and primary interactions
- **Secondary Green**: `rgb(34 197 94)` - Success states and environmental messaging
- **Accent Purple**: `rgb(147 51 234)` - Premium features and investor relations
- **Neutral Grays**: Various shades for text and backgrounds

### Component Hierarchy

```
components/
├── ui/                     # Shadcn/ui base components
├── layout/                 # Layout and navigation
│   ├── Navbar.tsx         # Main navigation
│   ├── Footer.tsx         # Footer with links
│   └── CTABar.tsx         # Persistent CTA bar
├── sections/              # Page sections
│   ├── Hero.tsx           # Hero sections
│   ├── Features.tsx       # Feature grids
│   ├── Testimonials.tsx   # Customer testimonials
│   └── Pricing.tsx        # Pricing tables
├── tools/                 # Interactive tools
│   ├── RevenueCalculator.tsx
│   ├── DeploymentMap.tsx
│   ├── NewsletterSignup.tsx
│   └── InteractiveTimeline.tsx
└── forms/                 # Form components
    ├── ContactForm.tsx
    └── NewsletterForm.tsx
```

## Content Strategy

### Persistent CTAs

The site implements route-aware persistent CTAs configured in `lib/siteConfig.ts`:

```typescript
export const persistentCTA = {
  routes: {
    "/": {
      primary: { label: "Join the Pilot", href: "/contact?interest=pilot" },
      secondary: { label: "Schedule Demo", href: "/contact?interest=demo" }
    },
    "/solutions": {
      primary: { label: "Apply to Host", href: "/contact?interest=host-node" },
      secondary: { label: "Learn More", href: "/solutions/hello-smart-node" }
    }
    // ... more routes
  }
};
```

### Content Sections

Each page follows a consistent content structure:

1. **Hero Section**: Main value proposition with primary CTA
2. **Features/Benefits**: Key features with icons and descriptions
3. **Social Proof**: Testimonials, case studies, metrics
4. **Call to Action**: Clear next steps with contact information
5. **Additional Resources**: Downloads, FAQs, related content

## Technical Implementation

### TypeScript Configuration

The project uses strict TypeScript with comprehensive type definitions:

```typescript
// lib/siteConfig.ts
export type Site = typeof site;
export type SocialItem = typeof site.social[number];
export type NavItem = typeof site.nav[number];
export type FooterColumn = typeof site.footer.columns[number];
export type FooterLink = FooterColumn['links'][number];
export type CTAConfig = typeof persistentCTA.routes[keyof typeof persistentCTA.routes] | typeof persistentCTA.default;
```

### Data Management

The site uses a configuration-based approach for static content:

- **Site Configuration**: `lib/siteConfig.ts` - Navigation, footer, CTAs
- **Stripe Configuration**: `lib/stripe/server.ts` - Payment processing
- **Tool Data**: Hardcoded in components with future CMS integration plans

### SEO Implementation

Each page includes comprehensive metadata:

```typescript
export const metadata: Metadata = {
  title: "Tools | Forhem PBC",
  description: "Interactive tools and calculators for understanding Hello Smart Node deployment...",
  keywords: ["smart city tools", "revenue calculator", "deployment map"],
  openGraph: {
    title: "Tools | Forhem PBC",
    description: "Interactive tools and calculators...",
    url: "https://forhem.com/tools",
    images: ["/images/og-tools.jpg"]
  }
};
```

## Analytics & Tracking

### Implementation Plan

The site includes comprehensive analytics tracking:

1. **Page Views**: Route-based page tracking
2. **CTA Interactions**: Button clicks, form submissions
3. **Tool Usage**: Calculator interactions, map explorations
4. **User Journey**: Conversion funnel tracking
5. **Performance**: Core Web Vitals monitoring

### Privacy Compliance

All analytics implementations comply with:
- GDPR requirements
- CCPA regulations
- PBC transparency commitments

## Performance Optimization

### Bundle Optimization

The site implements several optimization strategies:

1. **Dynamic Imports**: Lazy loading for heavy components
2. **Image Optimization**: Next.js Image component usage
3. **Code Splitting**: Route-based bundle splitting
4. **Tree Shaking**: Unused code elimination

### Accessibility

WCAG 2.2 AA compliance throughout:

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## Deployment Architecture

### Build Configuration

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

### Environment Variables

```env
# Application
NEXT_PUBLIC_APP_URL=https://forhem.com
NEXT_PUBLIC_APP_NAME=Forhem PBC

# Stripe
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...

# Analytics (Phase 2)
NEXT_PUBLIC_GA_ID=G-...
NEXT_PUBLIC_HOTJAR_ID=...
```

## Future Enhancements (Phase 2)

### Planned Features

1. **CMS Integration**: Contentful or Strapi for dynamic content
2. **Advanced Analytics**: Real-time dashboards and reporting
3. **User Authentication**: Customer portals and account management
4. **API Integration**: Real-time data from deployed nodes
5. **Interactive 3D Models**: Product visualization tools
6. **Multi-language Support**: Spanish and other language support

### Technical Roadmap

1. **Q1 2025**: CMS integration and advanced analytics
2. **Q2 2025**: User authentication and customer portals
3. **Q3 2025**: Real-time data integration and API development
4. **Q4 2025**: Advanced 3D visualization and internationalization

## Development Workflow

### Local Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Type checking
pnpm type-check

# Build for production
pnpm build

# Start production server
pnpm start
```

### Code Quality

The project maintains high code quality standards:

- ESLint configuration for code linting
- Prettier for code formatting
- TypeScript strict mode for type safety
- Husky pre-commit hooks for quality gates

## Security Considerations

### Implementation

1. **HTTPS Only**: All connections use SSL/TLS
2. **Input Validation**: All form inputs are validated and sanitized
3. **CSRF Protection**: Built-in Next.js CSRF protection
4. **Rate Limiting**: API route rate limiting
5. **Dependency Security**: Regular security audits and updates

### PBC Compliance

As a Public Benefit Corporation, the site maintains:

- Transparent data practices
- Privacy-first design principles
- Accessibility commitment
- Environmental impact consideration

## Support & Maintenance

### Monitoring

The site includes comprehensive monitoring:

1. **Performance**: Core Web Vitals and uptime monitoring
2. **Errors**: Automated error tracking and reporting
3. **Usage**: Analytics and user behavior tracking
4. **Security**: Security scanning and vulnerability detection

### Update Process

Regular maintenance schedule:

- **Weekly**: Security updates and dependency monitoring
- **Monthly**: Content updates and performance optimization
- **Quarterly**: Feature updates and platform improvements
- **Annually**: Major platform updates and architecture review

---

*This documentation is maintained as part of the Forhem PBC commitment to transparency and open communication. For technical questions or support, contact the development team.*