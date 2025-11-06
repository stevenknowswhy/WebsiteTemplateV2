import Link from 'next/link';
import { site, type FooterColumn, type SocialItem } from '@/lib/siteConfig';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{site.name}</h3>
            <p className="text-sm text-muted-foreground">
              {site.description}
            </p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>Email:</strong> {site.email}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Address:</strong> {site.address}
              </p>
            </div>
          </div>

          {/* Footer Columns */}
          {site.footer.columns.map((column, index) => (
            <div key={column.title} className="space-y-4">
              <h4 className="text-sm font-semibold">{column.title}</h4>
              <ul className="space-y-2 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-border/40 pt-8 md:mt-12 md:pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex flex-col items-center space-y-2 md:items-start">
              <p className="text-sm text-muted-foreground">
                © {currentYear} {site.name}. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground">
                Built with ❤️ using Next.js and Tailwind CSS
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {site.social.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={social.label === 'X' ? 'X (Twitter)' : social.label}
                >
                  <span className="capitalize">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}