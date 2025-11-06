'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { site, type NavItem } from '@/lib/siteConfig';
import { isFeatureEnabled } from '@/lib/featureFlags';
import { FeatureGuard } from '@/components/FeatureGuard';
import { ThemeToggle } from '@/components/theme-toggle';
import { NavDropdown } from '@/components/NavDropdown';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">{site.name}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {site.nav.map((item) => {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Desktop CTA */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                  <svg
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <path
                      d="M3 5h11M3 12h11m-11 7h11"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center">
                      <span className="font-bold">{site.name}</span>
                    </Link>
                  </SheetTitle>
                  <SheetDescription>
                    Navigate through our website
                  </SheetDescription>
                </SheetHeader>
                <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                  <div className="flex flex-col space-y-3">
                    {site.nav.map((item) => {
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="text-foreground/60 transition-colors hover:text-foreground"
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Dashboard Button (only shown when auth is enabled) */}
            <FeatureGuard feature="auth">
              <Button asChild size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </FeatureGuard>
          </div>
        </div>
      </div>
    </header>
  );
}