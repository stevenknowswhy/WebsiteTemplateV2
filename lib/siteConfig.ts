/**
 * Site Configuration
 * Centralized site information used throughout the application
 */

export const site = {
  name: "DataBuildDirect",
  domain: "databuilddirect.com",
  email: "info@databuilddirect.com",
  address: "55 9th St., San Francisco, CA 94103",
  description: "Sovereign infrastructure platform providing resilient data center solutions",
  nav: [
    {
      label: "Solutions",
      href: "/solutions",
      dropdown: [
        { label: "Overview", href: "/solutions", description: "Complete ecosystem overview" },
        { label: "Underground Data Centers", href: "/underground", description: "Unshakable infrastructure for an unpredictable world" },
        { label: "Micro DCaaS", href: "/micro-dcaas", description: "Modular distributed compute nodes" },
        { label: "City Safe Nodes", href: "/city-safe-nodes", description: "Smart street-level infrastructure for safety and mobility" },
        { label: "Hello Safe Nodes", href: "/hello-safe-nodes", description: "Community-scale trust and neighborhood intelligence" }
      ]
    },
    { label: "Company", dropdown: [
      { label: "Our Mission", href: "/mission", description: "Vision and strategic objectives" },
      { label: "Security Framework", href: "/security", description: "Multi-layered security approach" },
      { label: "Partners", href: "/partners", description: "Partnership opportunities and collaborative programs" },
      { label: "Investors", href: "/investors", description: "Investment opportunities and strategic partnerships" },
      { label: "Company Updates", href: "/updates", description: "Latest news and developments" },
      { label: "Careers", href: "/careers", description: "Join our mission and answer your calling" }
    ]},
    { label: "Resources", dropdown: [
      { label: "Documentation", href: "/docs", description: "Technical documentation and guides" },
      { label: "Support", href: "/support", description: "Help and technical assistance" },
      { label: "API Reference", href: "/api", description: "Developer resources" },
      { label: "Downloads", href: "/downloads", description: "Resources and materials" }
    ]},
    { label: "Contact", href: "/contact" }
  ],
  footer: {
    columns: [
      {
        title: "Solutions",
        links: [
          { label: "Underground Data Centers", href: "/underground", description: "The world's most secure and sustainable data centers" },
          { label: "Micro DCaaS", href: "/micro-dcaas" },
          { label: "City Safe Nodes", href: "/city-safe-nodes" },
          { label: "Hello Safe Nodes", href: "/hello-safe-nodes" },
          { label: "Solutions Overview", href: "/solutions" }
        ]
      },
      {
        title: "Company",
        links: [
          { label: "Our Mission", href: "/mission" },
          { label: "Security Framework", href: "/security" },
          { label: "Partners", href: "/partners" },
          { label: "Investors", href: "/investors" },
          { label: "Company Updates", href: "/updates" },
          { label: "Careers", href: "/careers" }
        ]
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "/docs" },
          { label: "Technical Support", href: "/support" },
          { label: "API Reference", href: "/api" },
          { label: "Downloads", href: "/downloads" }
        ]
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Security Compliance", href: "/security" },
          { label: "Data Protection", href: "/data-protection" }
        ]
      }
    ]
  },
  social: [
    { label: "X", href: "https://x.com/databuilddirect" },
    { label: "LinkedIn", href: "https://linkedin.com/company/databuilddirect" },
    { label: "GitHub", href: "https://github.com/databuilddirect" }
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