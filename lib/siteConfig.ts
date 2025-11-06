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
    { label: "About", href: "/about" },
    { label: "Solutions", href: "/solutions" },
    { label: "Investors", href: "/investors" },
    { label: "Partners", href: "/partners" },
    { label: "Contact", href: "/contact" }
  ],
  footer: {
    columns: [
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Solutions", href: "/solutions" },
          { label: "Investors", href: "/investors" },
          { label: "Partners", href: "/partners" }
        ]
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" }
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