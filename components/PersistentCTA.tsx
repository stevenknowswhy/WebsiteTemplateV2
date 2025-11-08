"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { persistentCTA } from "@/lib/siteConfig";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function PersistentCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Get CTA config for current route
  const getCTAConfig = () => {
    // Check for exact route match first
    if (persistentCTA.routes[pathname as keyof typeof persistentCTA.routes]) {
      return persistentCTA.routes[pathname as keyof typeof persistentCTA.routes];
    }

    // Check for prefix matches (e.g., /solutions/*)
    for (const [route, config] of Object.entries(persistentCTA.routes)) {
      if (pathname.startsWith(route) && route !== "/") {
        return config;
      }
    }

    return persistentCTA.default;
  };

  const ctaConfig = getCTAConfig();

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setHasScrolled(scrolled);
      setIsVisible(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Always show on specific routes
  useEffect(() => {
    const alwaysShowRoutes = ["/investors", "/solutions", "/careers"];
    if (alwaysShowRoutes.some(route => pathname.startsWith(route))) {
      setIsVisible(true);
    }
  }, [pathname]);

  if (!isVisible || !ctaConfig) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50 transform transition-transform duration-300 ease-in-out",
        hasScrolled ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              Ready to transform your infrastructure?
            </p>
            <p className="text-xs text-muted-foreground">
              Join cities and buildings already benefiting from smart nodes
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="w-full sm:w-auto"
              onClick={() => {
                // Track analytics event
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'cta_click', {
                    button_type: 'secondary',
                    page_location: pathname,
                    button_text: ctaConfig.secondary.label
                  });
                }
              }}
            >
              <a href={ctaConfig.secondary.href}>
                {ctaConfig.secondary.label}
              </a>
            </Button>

            <Button
              size="sm"
              asChild
              className="w-full sm:w-auto"
              onClick={() => {
                // Track analytics event
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'cta_click', {
                    button_type: 'primary',
                    page_location: pathname,
                    button_text: ctaConfig.primary.label
                  });
                }
              }}
            >
              <a href={ctaConfig.primary.href}>
                {ctaConfig.primary.label}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Analytics types for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, action: string, options?: Record<string, any>) => void;
  }
}