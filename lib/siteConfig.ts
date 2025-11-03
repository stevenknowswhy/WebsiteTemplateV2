/**
 * Site Configuration
 * Centralized site information used throughout the application
 */

export const site = {
  name: "TemplateAppV2",
  domain: "templateappv2.com",
  email: "admin@templateappv2.com",
  address: "55 9th St., San Francisco, CA 94103",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  social: [
    { label: "X", href: "https://x.com/templateappv2" },
    { label: "GitHub", href: "https://github.com/templateappv2" },
    { label: "LinkedIn", href: "https://linkedin.com/company/templateappv2" }
  ]
} as const;

export type Site = typeof site;
export type SocialItem = typeof site.social[number];
export type NavItem = typeof site.nav[number];