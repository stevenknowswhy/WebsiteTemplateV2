/**
 * Site Configuration
 * Centralized site information used throughout the application
 */

export const site = {
  name: "Forhem",
  domain: "forhem.com",
  email: "support@forhem.com",
  address: "San Francisco, CA, USA",
  description: "A public benefit company based in San Francisco, CA",
  nav: [
    { label: "Home", href: "/" },
    {
      label: "Solutions",
      href: "/solutions",
      dropdown: [
        {
          label: "City Safe Nodes",
          href: "/solutions/city-safe",
          description: "Privacy-first urban infrastructure nodes"
        },
        {
          label: "Hello Smart Nodes",
          href: "/solutions/hello-smart-node",
          description: "Smart city communication hubs"
        },
        {
          label: "Edge Infrastructure",
          href: "/solutions/edge-infrastructure",
          description: "Distributed computing at the network edge"
        },
        {
          label: "Privacy & Transparency",
          href: "/solutions/privacy",
          description: "Privacy-by-design architecture and governance"
        }
      ]
    },
    {
      label: "Cities",
      href: "/for-cities",
      dropdown: [
        {
          label: "For Cities Overview",
          href: "/for-cities",
          description: "Smart city solutions for municipalities"
        },
        {
          label: "Deployment Programs",
          href: "/for-cities/programs",
          description: "Structured deployment and implementation"
        },
        {
          label: "Revenue Share Model",
          href: "/for-cities/revenue",
          description: "Sustainable revenue sharing for cities"
        },
        {
          label: "Case Studies",
          href: "/for-cities/cases",
          description: "Real-world implementations and results"
        }
      ]
    },
    { label: "Investors", href: "/investors" },
    {
      label: "About",
      href: "/about",
      dropdown: [
        {
          label: "Why Forhem",
          href: "/why-forhem",
          description: "Our mission and competitive advantages"
        },
        {
          label: "Our PBC Charter",
          href: "/pbc-charter",
          description: "Public benefit corporation commitments"
        },
        {
          label: "Leadership",
          href: "/about/leadership",
          description: "Meet our executive team"
        },
        {
          label: "We're Hiring!",
          href: "/careers",
          description: "Join our team and build the future"
        },
        {
          label: "Contact",
          href: "/contact",
          description: "Get in touch with our team"
        }
      ]
    },
    { label: "News", href: "/news" }
  ],
  footer: {
    columns: [
      {
        title: "Solutions",
        links: [
          { label: "Hello Smart Node™", href: "/solutions/hello-smart-node" },
          { label: "City Safe Solutions", href: "/solutions/city-safe" },
          { label: "For Cities", href: "/for-cities" },
          { label: "For Building Owners", href: "/for-building-owners" }
        ]
      },
      {
        title: "Company",
        links: [
          { label: "Why Forhem", href: "/why-forhem" },
          { label: "Investors", href: "/investors" },
          { label: "News & Insights", href: "/news" },
          { label: "Tools", href: "/tools" },
          { label: "Careers", href: "/careers" }
        ]
      },
      {
        title: "Legal & Governance",
        links: [
          { label: "Privacy by Design", href: "/privacy" },
          { label: "PBC Charter", href: "/pbc-charter" },
          { label: "Privacy Policy", href: "/privacy-policy" },
          { label: "Terms of Use", href: "/terms" },
          { label: "Transparency Report", href: "/transparency-report" }
        ]
      }
    ]
  },
  social: [
    { label: "X", href: "https://x.com/forhem" },
    { label: "LinkedIn", href: "https://linkedin.com/company/forhem" },
    { label: "GitHub", href: "https://github.com/stevenknowswhy/ForhemPBC" }
  ]
} as const;

export type Site = typeof site;
export type SocialItem = typeof site.social[number];
export type NavItem = typeof site.nav[number];
export type FooterColumn = typeof site.footer.columns[number];
export type FooterLink = FooterColumn['links'][number];
export type DropdownItem = {
  readonly label: string
  readonly href: string
  readonly description?: string
};

// Enhanced navigation types for dropdown support
export type EnhancedNavItem = {
  readonly label: string
  readonly href: string
  readonly dropdown?: readonly DropdownItem[]
};

// Persistent CTA Bar Configuration
export const persistentCTA = {
  // Route-aware CTAs
  routes: {
    "/": {
      primary: { label: "Join the Pilot", href: "/contact?interest=pilot" },
      secondary: { label: "Schedule Demo", href: "/contact?interest=demo" }
    },
    "/investors": {
      primary: { label: "Invest Now", href: "/contact?interest=investment" },
      secondary: { label: "View Deck", href: "/investors#deck" }
    },
    "/solutions": {
      primary: { label: "Apply to Host", href: "/contact?interest=host-node" },
      secondary: { label: "Learn More", href: "/solutions/hello-smart-node" }
    },
    "/solutions/hello-smart-node": {
      primary: { label: "Apply to Host", href: "/contact?interest=host-node" },
      secondary: { label: "Download Fact Sheet", href: "/downloads/hello-smart-node.pdf" }
    },
    "/solutions/city-safe": {
      primary: { label: "Schedule Demo", href: "/contact?interest=city-demo" },
      secondary: { label: "Adopt a Stop", href: "/contact?interest=adopt-stop" }
    },
    "/for-cities": {
      primary: { label: "Schedule City Demo", href: "/contact?interest=city-demo" },
      secondary: { label: "Pilot Program", href: "/contact?interest=pilot" }
    },
    "/for-building-owners": {
      primary: { label: "Apply to Host", href: "/contact?interest=host-node" },
      secondary: { label: "Revenue Calculator", href: "/tools/revenue-calculator" }
    },
    "/tools": {
      primary: { label: "Revenue Calculator", href: "/tools/revenue-calculator" },
      secondary: { label: "Deployment Map", href: "/tools/deployment-map" }
    },
    "/tools/revenue-calculator": {
      primary: { label: "Calculate Revenue", href: "#calculator" },
      secondary: { label: "Contact Sales", href: "/contact?interest=revenue" }
    },
    "/tools/deployment-map": {
      primary: { label: "View Deployments", href: "#map" },
      secondary: { label: "Schedule Tour", href: "/contact?interest=tour" }
    },
    "/tools/3d-viewer": {
      primary: { label: "Explore Products", href: "#viewer" },
      secondary: { label: "Download Specs", href: "/downloads/specs.pdf" }
    },
    "/tools/analytics": {
      primary: { label: "Live Dashboard", href: "#dashboard" },
      secondary: { label: "API Access", href: "#api" }
    },
    "/tools/newsletter": {
      primary: { label: "Subscribe Now", href: "#signup" },
      secondary: { label: "View Archive", href: "/news" }
    },
    "/tools/timeline": {
      primary: { label: "Our Journey", href: "#timeline" },
      secondary: { label: "Join Us", href: "/careers" }
    },
    "/careers": {
      primary: { label: "View Open Roles", href: "#open-roles" },
      secondary: { label: "Internships", href: "/careers#internships" }
    },
    "/contact": {
      primary: { label: "Submit Request", href: "#contact-form" },
      secondary: { label: "Call Us", href: "tel:+1-555-FORHEM" }
    },
    "/privacy": {
      primary: { label: "View Dashboard", href: "#dashboard" },
      secondary: { label: "Download Charter", href: "/downloads/pbc-charter.pdf" }
    }
  },
  // Default CTA for unspecified routes
  default: {
    primary: { label: "Get Started", href: "/contact" },
    secondary: { label: "Learn More", href: "/solutions" }
  }
} as const;

export type PersistentCTA = typeof persistentCTA;
export type CTAConfig = typeof persistentCTA.routes[keyof typeof persistentCTA.routes] | typeof persistentCTA.default;