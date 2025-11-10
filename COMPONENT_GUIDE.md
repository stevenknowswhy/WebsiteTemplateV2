# Forhem PBC Component Guide

## Overview

This guide documents the custom components and patterns used throughout the Forhem PBC website. All components are built with TypeScript, Tailwind CSS, and the Shadcn/ui component library.

## Design System

### Color Palette

```css
/* Primary Colors */
--blue-500: #3b82f6    /* Primary actions, CTAs */
--green-500: #22c55e   /* Success, environmental */
--purple-500: #9333ea  /* Premium, investors */

/* Neutral Colors */
--gray-50: #f9fafb     /* Backgrounds */
--gray-100: #f3f4f6    /* Light backgrounds */
--gray-200: #e5e7eb    /* Borders */
--gray-500: #6b7280    /* Secondary text */
--gray-900: #111827    /* Primary text */
```

### Typography Scale

```css
/* Font Sizes */
text-xs: 0.75rem    /* 12px - Small labels */
text-sm: 0.875rem   /* 14px - Body text */
text-base: 1rem     /* 16px - Default */
text-lg: 1.125rem   /* 18px - Large body */
text-xl: 1.25rem    /* 20px - Small headings */
text-2xl: 1.5rem    /* 24px - Section headings */
text-3xl: 1.875rem  /* 30px - Page headings */
text-4xl: 2.25rem   /* 36px - Hero headings */
```

### Spacing Scale

```css
/* Margin/Padding */
space-1: 0.25rem    /* 4px */
space-2: 0.5rem     /* 8px */
space-3: 0.75rem    /* 12px */
space-4: 1rem       /* 16px */
space-6: 1.5rem     /* 24px */
space-8: 2rem       /* 32px */
space-12: 3rem      /* 48px */
space-16: 4rem      /* 64px */
```

## Core Components

### Hero Section

Used for page headers with value propositions.

```typescript
// components/sections/Hero.tsx
interface HeroProps {
  kicker?: string;
  title: string;
  description: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  backgroundImage?: string;
}
```

**Usage Example:**
```tsx
<Hero
  kicker="Smart City Infrastructure"
  title="Hello Smart Node™"
  description="Solar-powered connectivity hubs bringing free Wi-Fi and environmental monitoring to communities."
  primaryCTA={{ label: "Apply to Host", href: "/contact" }}
  secondaryCTA={{ label: "Learn More", href: "/solutions" }}
/>
```

### Feature Cards

Reusable card components for displaying features or tools.

```typescript
// components/sections/Features.tsx
interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  status?: "available" | "beta" | "coming-soon";
}
```

**Usage Example:**
```tsx
const features: FeatureCard[] = [
  {
    icon: <Wifi className="h-6 w-6 text-blue-600" />,
    title: "Free Wi-Fi Connectivity",
    description: "High-speed internet access for communities",
    href: "/solutions/wifi"
  },
  {
    icon: <Battery className="h-6 w-6 text-green-600" />,
    title: "Solar Power",
    description: "100% renewable energy powered",
    status: "available"
  }
];
```

### CTA Buttons

Consistent button styling across the site.

```typescript
// Primary Button
<Button className="bg-blue-600 hover:bg-blue-700 text-white">
  Get Started
</Button>

// Secondary Button
<Button variant="outline">
  Learn More
</Button>

// Success Button
<Button className="bg-green-600 hover:bg-green-700 text-white">
  Confirm
</Button>
```

## Layout Components

### Navbar

Main navigation with responsive design and persistent CTA integration.

```typescript
// components/layout/Navbar.tsx
interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "For Cities", href: "/for-cities" },
  { label: "Tools", href: "/tools" },
  // ... more items
];
```

### Footer

Comprehensive footer with multiple columns and social links.

```typescript
// components/layout/Footer.tsx
interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "Solutions",
    links: [
      { label: "Hello Smart Node™", href: "/solutions/hello-smart-node" },
      { label: "City Safe Solutions", href: "/solutions/city-safe" }
    ]
  }
  // ... more columns
];
```

### Persistent CTA Bar

Route-aware call-to-action bar that appears at the bottom of pages.

```typescript
// components/layout/CTABar.tsx
const CTABar = () => {
  const pathname = usePathname();
  const ctaConfig = getCTAConfig(pathname);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Button className="bg-blue-600 hover:bg-blue-700">
            {ctaConfig.primary.label}
          </Button>
          <Button variant="outline">
            {ctaConfig.secondary.label}
          </Button>
        </div>
      </div>
    </div>
  );
};
```

## Interactive Components

### Revenue Calculator

Advanced calculator for estimating Hello Smart Node revenue.

```typescript
// components/tools/RevenueCalculator.tsx
interface CalculatorInputs {
  propertyType: "residential" | "commercial" | "mixed-use";
  location: string;
  electricityRate: number;
  dailyTraffic: number;
  adRevenue: boolean;
}

interface CalculatorOutputs {
  monthlyRevenue: number;
  annualRevenue: number;
  roi: number;
  paybackPeriod: number;
}
```

**Key Features:**
- Real-time calculation updates
- Multiple property type support
- Location-based revenue factors
- ROI and payback period calculations
- Export functionality

### Interactive Timeline

Company milestone timeline with filtering and playback controls.

```typescript
// components/tools/InteractiveTimeline.tsx
interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  category: "founding" | "product" | "partnership" | "impact" | "expansion" | "funding";
  icon: React.ReactNode;
  status: "completed" | "in-progress" | "planned";
  details: {
    achievements: string[];
    metrics?: Record<string, string>;
  };
}
```

**Key Features:**
- Category filtering
- Timeline playback controls
- Detailed milestone information
- Progress statistics
- Responsive design

### Deployment Map

Interactive map showing current and planned deployments.

```typescript
// components/tools/DeploymentMap.tsx
interface Deployment {
  id: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: "active" | "planned" | "under-construction";
  metrics: {
    users: number;
    uptime: string;
    revenue: string;
  };
}
```

**Key Features:**
- Interactive map visualization
- Filter by deployment status
- Location-based metrics
- Search functionality
- Export data capabilities

## Form Components

### Contact Form

Multi-purpose contact form with inquiry type selection.

```typescript
// components/forms/ContactForm.tsx
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  inquiryType: "general" | "pilot" | "investment" | "partnership" | "press";
  message: string;
  subscribeToNewsletter: boolean;
}
```

**Validation Rules:**
- Required fields: name, email, inquiry type, message
- Email format validation
- Message length limits
- Phone number format validation

### Newsletter Signup

Advanced newsletter signup with role-based preferences.

```typescript
// components/tools/NewsletterSignup.tsx
interface NewsletterData {
  email: string;
  firstName: string;
  lastName: string;
  role: "city-official" | "property-owner" | "investor" | "community-member" | "other";
  interests: {
    deployments: boolean;
    impact: boolean;
    investment: boolean;
    partnerships: boolean;
  };
  frequency: "weekly" | "monthly" | "quarterly";
}
```

## Page Patterns

### Standard Page Layout

Consistent layout structure for content pages.

```tsx
// Example page structure
export default function Page() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <Section>
        <Hero
          title="Page Title"
          description="Page description"
        />
      </Section>

      {/* Content Sections */}
      <Section>
        <Content />
      </Section>

      {/* CTA Section */}
      <Section>
        <CTA />
      </Section>

      <Footer />
      <CTABar />
    </div>
  );
}
```

### Tools Page Layout

Specialized layout for interactive tools.

```tsx
// tools/[tool]/page.tsx
export default function ToolPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Tool Header */}
      <Section>
        <ToolHeader />
      </Section>

      {/* Interactive Tool */}
      <Section className="bg-muted/50">
        <ToolComponent />
      </Section>

      {/* Supporting Content */}
      <Section>
        <ToolDocumentation />
      </Section>

      <Footer />
    </div>
  );
}
```

## Responsive Design Patterns

### Mobile-First Approach

All components follow mobile-first responsive design:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid that adapts from 1 to 3 columns */}
</div>

<div className="flex flex-col lg:flex-row gap-8">
  {/* Stacks vertically on mobile, horizontally on desktop */}
</div>
```

### Breakpoints

```css
/* Tailwind CSS Breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices (tablets) */
lg: 1024px  /* Large devices (desktops) */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

## Accessibility Patterns

### Semantic HTML

```tsx
<!-- Proper heading hierarchy -->
<h1>Main page title</h1>
<section>
  <h2>Section title</h2>
  <h3>Subsection title</h3>
</section>

<!-- Accessible buttons -->
<button
  aria-label="Close dialog"
  onClick={handleClose}
>
  <X className="h-4 w-4" />
</button>

<!-- Accessible forms -->
<form role="form" aria-labelledby="contact-heading">
  <h2 id="contact-heading">Contact Us</h2>
  <label htmlFor="name">Name</label>
  <input
    id="name"
    type="text"
    required
    aria-describedby="name-error"
  />
  <div id="name-error" className="sr-only">
    Please enter your name
  </div>
</form>
```

### Keyboard Navigation

All interactive elements are keyboard accessible:

```tsx
// Focus management
<button
  className="focus:outline-none focus:ring-2 focus:ring-blue-500"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Interactive Element
</button>
```

## Animation Patterns

### Page Transitions

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Page Content
</motion.div>
```

### Hover Effects

```tsx
<div className="group">
  <div className="transition-all duration-300 group-hover:scale-105">
    Hover Content
  </div>
</div>
```

## Error Handling

### Error Boundaries

```tsx
// Error boundary for component sections
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="error-boundary">
      {children}
    </div>
  );
};
```

### Loading States

```tsx
// Loading skeleton patterns
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
</div>
```

## Performance Considerations

### Image Optimization

```tsx
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  className="rounded-lg"
  priority={false} // Load important images first
/>
```

### Dynamic Imports

```tsx
// Lazy load heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false // Client-side only
});
```

## Testing Patterns

### Component Testing

```tsx
// Example test structure
describe('RevenueCalculator', () => {
  it('calculates monthly revenue correctly', () => {
    // Test implementation
  });

  it('validates input fields', () => {
    // Test implementation
  });
});
```

## Best Practices

### Code Organization

1. **Component Files**: Keep components focused and single-purpose
2. **Props Interface**: Always define TypeScript interfaces for props
3. **Default Exports**: Use default exports for components
4. **Index Files**: Use index.ts files for clean imports

### Styling Guidelines

1. **Utility-First**: Use Tailwind utility classes
2. **Responsive**: Mobile-first responsive design
3. **Consistent Spacing**: Use the defined spacing scale
4. **Color Usage**: Stick to the defined color palette

### Performance

1. **Lazy Loading**: Use dynamic imports for heavy components
2. **Image Optimization**: Always use Next.js Image component
3. **Bundle Size**: Monitor and optimize bundle size
4. **Core Web Vitals**: Ensure good performance metrics

---

*This guide is maintained as part of the Forhem PBC development documentation. For questions or contributions, contact the development team.*