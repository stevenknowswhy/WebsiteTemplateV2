"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavDropdown } from "@/components/NavDropdown";
import { site, type EnhancedNavItem, type DropdownItem } from "@/lib/siteConfig";
import { persistentCTA, type CTAConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface EnhancedHeaderProps {
  className?: string;
}

export default function EnhancedHeader({ className }: EnhancedHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expandedDropdowns, setExpandedDropdowns] = useState<Set<string>>(new Set());
  const pathname = usePathname();
  const { theme, setTheme, systemTheme } = useTheme();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle theme mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the current effective theme
  const getCurrentTheme = () => {
    if (theme === 'system') {
      return systemTheme || 'dark';
    }
    return theme || 'dark';
  };

  // Get the current effective theme
  const effectiveTheme = getCurrentTheme();

  // Debug theme state
  useEffect(() => {
    if (mounted) {
      console.log('Theme state:', { theme, systemTheme, effectiveTheme });
    }
  }, [theme, systemTheme, mounted]);

  // Get context-aware CTA based on current route
  const getContextualCTA = (): CTAConfig => {
    const matchedRoute = Object.keys(persistentCTA.routes).find(route =>
      pathname === route || pathname.startsWith(route + "/")
    );

    if (matchedRoute) {
      return persistentCTA.routes[matchedRoute as keyof typeof persistentCTA.routes];
    }

    return persistentCTA.default;
  };

  const contextualCTA = getContextualCTA();

  // Toggle mobile dropdown expansion
  const toggleMobileDropdown = (label: string) => {
    setExpandedDropdowns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  // Enhanced navigation item renderer
  const renderNavItem = (item: EnhancedNavItem) => {
    if (item.dropdown && item.dropdown.length > 0) {
      return (
        <NavDropdown
          key={item.label}
          trigger={
            <span className="flex items-center gap-1">
              {item.label}
            </span>
          }
          items={item.dropdown}
          align="center"
          side="bottom"
        />
      );
    }

    return (
      <Link
        key={item.label}
        href={item.href}
        className={cn(
          "relative text-base font-medium transition-all duration-200",
          effectiveTheme === "dark"
            ? "hover:text-white"
            : "hover:text-gray-900",
          "after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-green-400 after:to-emerald-500",
          "after:transition-all after:duration-300 hover:after:w-full",
          pathname === item.href
            ? effectiveTheme === "dark"
              ? "text-white after:w-full"
              : "text-gray-900 after:w-full"
            : effectiveTheme === "dark"
              ? "text-gray-300"
              : "text-gray-600"
        )}
      >
        {item.label}
      </Link>
    );
  };

  // Mobile navigation renderer with accordion-style dropdowns
  const renderMobileNavItem = (item: EnhancedNavItem) => {
    const isExpanded = expandedDropdowns.has(item.label);

    if (item.dropdown && item.dropdown.length > 0) {
      return (
        <div key={item.label} className={cn(
          "border-b",
          effectiveTheme === "dark" ? "border-white/5" : "border-gray-200/50"
        )}>
          <button
            onClick={() => toggleMobileDropdown(item.label)}
            className={cn(
              "w-full flex items-center justify-between py-4 text-left transition-colors",
              effectiveTheme === "dark"
                ? "hover:text-white"
                : "hover:text-gray-900"
            )}
          >
            <span className={cn(
              "text-lg font-semibold",
              pathname === item.href
                ? effectiveTheme === "dark" ? "text-white" : "text-gray-900"
                : effectiveTheme === "dark" ? "text-gray-300" : "text-gray-700"
            )}>
              {item.label}
            </span>
            <ChevronRight
              className={cn(
                "w-5 h-5 transition-transform duration-200",
                isExpanded ? "rotate-90" : "",
                effectiveTheme === "dark" ? "text-gray-400" : "text-gray-500"
              )}
            />
          </button>

          {/* Accordion content */}
          <div className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}>
            <div className="pb-4 space-y-3">
              {item.dropdown.map((dropdownItem: DropdownItem) => (
                <Link
                  key={dropdownItem.href}
                  href={dropdownItem.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block transition-colors py-2 px-4 rounded-lg",
                    effectiveTheme === "dark"
                      ? "hover:text-white"
                      : "hover:text-gray-900",
                    pathname === dropdownItem.href
                      ? effectiveTheme === "dark"
                        ? "text-white bg-white/10"
                        : "text-gray-900 bg-gray-100/80"
                      : effectiveTheme === "dark"
                        ? "text-gray-400 hover:bg-white/5"
                        : "text-gray-600 hover:bg-gray-100/50"
                  )}
                >
                  <div className="font-medium">{dropdownItem.label}</div>
                  {dropdownItem.description && (
                    <div className={cn(
                      "text-xs mt-1 leading-relaxed",
                      effectiveTheme === "dark" ? "text-gray-500" : "text-gray-500"
                    )}>
                      {dropdownItem.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={item.label} className={cn(
        "border-b",
        effectiveTheme === "dark" ? "border-white/5" : "border-gray-200/50"
      )}>
        <Link
          href={item.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className={cn(
            "block text-lg font-semibold transition-colors py-4",
            effectiveTheme === "dark"
              ? "hover:text-white"
              : "hover:text-gray-900",
            pathname === item.href
              ? effectiveTheme === "dark" ? "text-white" : "text-gray-900"
              : effectiveTheme === "dark" ? "text-gray-300" : "text-gray-700"
          )}
        >
          {item.label}
        </Link>
      </div>
    );
  };

  if (!mounted) {
    return (
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 bg-black/80 backdrop-blur-sm border-b border-white/5",
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Brand Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center space-x-3 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-green-400/25 transition-all duration-300">
                  <span className="text-white font-bold text-xl">⚡</span>
                </div>
                <span className="text-2xl font-bold tracking-tight transition-colors duration-300 text-white">
                  Forhem
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Placeholder */}
            <nav className="hidden lg:flex items-center space-x-10">
              {/* Navigation items will be rendered after mount */}
            </nav>

            {/* Right Side Actions - Placeholder */}
            <div className="flex items-center space-x-4">
              {/* Theme toggle placeholder */}
              <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
                <div className="w-5 h-5 bg-white/30 rounded-full animate-pulse" />
              </div>

              {/* Mobile menu placeholder */}
              <div className="lg:hidden">
                <div className="w-6 h-6 bg-white/30 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? effectiveTheme === "dark"
            ? "bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg"
            : "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-lg"
          : effectiveTheme === "dark"
            ? "bg-black/80 backdrop-blur-sm border-b border-white/5"
            : "bg-white/80 backdrop-blur-sm border-b border-gray-200/50",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-green-400/25 transition-all duration-300">
                <span className="text-white font-bold text-xl">⚡</span>
              </div>
              <span className={cn(
                "text-2xl font-bold tracking-tight transition-colors duration-300",
                effectiveTheme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Forhem
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {(site.nav as EnhancedNavItem[]).map(renderNavItem)}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle - Desktop */}
            <button
              onClick={() => {
                const currentTheme = getCurrentTheme();
                const newTheme = currentTheme === "dark" ? "light" : "dark";
                setTheme(newTheme);
              }}
              className={cn(
                  "hidden lg:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200",
                  effectiveTheme === "dark"
                    ? "bg-white/10 hover:bg-white/20 text-white"
                    : "bg-gray-200/80 hover:bg-gray-300/80 text-gray-700"
                )}
              aria-label="Toggle theme"
            >
              {mounted ? (
                getCurrentTheme() === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )
              ) : (
                <div className="w-5 h-5 bg-white/30 rounded-full animate-pulse" />
              )}
            </button>

            {/* Context-Aware CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-green-400/25 transition-all duration-300 border-0"
              >
                <Link href={contextualCTA.primary.href}>
                  {contextualCTA.primary.label}
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "p-2",
                    effectiveTheme === "dark"
                      ? "text-white hover:bg-white/10"
                      : "text-gray-900 hover:bg-gray-100"
                  )}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className={cn(
                  "w-full sm:w-96 backdrop-blur-xl p-0 flex flex-col",
                  effectiveTheme === "dark"
                    ? "bg-black/95 border-white/10 text-white"
                    : "bg-white/95 border-gray-200 text-gray-900"
                )}
              >
                <SheetHeader className={cn(
                  "p-6 border-b flex-shrink-0",
                  effectiveTheme === "dark"
                    ? "border-white/10"
                    : "border-gray-200"
                )}>
                  <SheetTitle className={cn(
                    "flex items-center space-x-3",
                    effectiveTheme === "dark"
                      ? "text-white"
                      : "text-gray-900"
                  )}>
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">⚡</span>
                    </div>
                    <span className="text-xl font-bold">Forhem</span>
                  </SheetTitle>
                  <SheetDescription className={cn(
                    effectiveTheme === "dark"
                      ? "text-gray-400"
                      : "text-gray-600"
                  )}>
                    Navigate through our solutions and services
                  </SheetDescription>
                </SheetHeader>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto">
                  {/* Mobile Navigation Items */}
                  <nav className="px-6 py-4">
                    {(site.nav as EnhancedNavItem[]).map(renderMobileNavItem)}
                  </nav>

                  {/* Mobile Theme Toggle */}
                  <div className="px-6 py-4">
                    <div className={cn(
                      "flex items-center justify-between p-4 rounded-lg border",
                      effectiveTheme === "dark"
                        ? "bg-white/5 border-white/10"
                        : "bg-gray-100/50 border-gray-200/50"
                    )}>
                      <span className={cn(
                        "text-sm font-medium",
                        effectiveTheme === "dark"
                          ? "text-white"
                          : "text-gray-900"
                      )}>Theme</span>
                      <button
                        onClick={() => {
                          const currentTheme = getCurrentTheme();
                          const newTheme = currentTheme === "dark" ? "light" : "dark";
                          setTheme(newTheme);
                        }}
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200",
                          effectiveTheme === "dark"
                            ? "bg-white/10 hover:bg-white/20 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        )}
                        aria-label="Toggle theme"
                      >
                        {mounted ? (
                          getCurrentTheme() === "dark" ? (
                            <Sun className="w-4 h-4" />
                          ) : (
                            <Moon className="w-4 h-4" />
                          )
                        ) : (
                          <div className="w-4 h-4 bg-white/30 rounded-full animate-pulse" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Fixed bottom CTA area */}
                <div className={cn(
                  "p-6 border-t flex-shrink-0",
                  effectiveTheme === "dark"
                    ? "border-white/10"
                    : "border-gray-200/50"
                )}>
                  <div className="space-y-3">
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-full shadow-lg"
                    >
                      <Link href={contextualCTA.primary.href} onClick={() => setIsMobileMenuOpen(false)}>
                        {contextualCTA.primary.label}
                      </Link>
                    </Button>

                    {contextualCTA.secondary && (
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className={cn(
                          "w-full font-semibold rounded-full transition-all duration-200",
                          effectiveTheme === "dark"
                            ? "border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                            : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                        )}
                      >
                        <Link href={contextualCTA.secondary.href} onClick={() => setIsMobileMenuOpen(false)}>
                          {contextualCTA.secondary.label}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}