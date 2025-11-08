"use client"

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropdownItem } from '@/lib/siteConfig'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface NavDropdownProps {
  trigger: React.ReactNode
  items: readonly DropdownItem[]
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
}

export function NavDropdown({
  trigger,
  items,
  align = 'center',
  side = 'bottom',
  className
}: NavDropdownProps) {
  const { theme, systemTheme } = useTheme();

  // Get the current effective theme
  const getCurrentTheme = () => {
    if (theme === 'system') {
      return systemTheme || 'dark';
    }
    return theme || 'dark';
  };

  const effectiveTheme = getCurrentTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1 transition-all duration-200 text-base font-medium",
            "focus:outline-none focus:ring-2 focus:ring-green-400/50",
            "relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-green-400 after:to-emerald-500",
            "after:transition-all after:duration-300 hover:after:w-full",
            effectiveTheme === "dark"
              ? "hover:text-white text-gray-300"
              : "hover:text-gray-900 text-gray-700",
            className
          )}
        >
          {trigger}
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform duration-200",
            effectiveTheme === "dark" ? "text-gray-400" : "text-gray-500"
          )} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side={side}
        className={cn(
          "w-80 backdrop-blur-xl shadow-2xl",
          effectiveTheme === "dark"
            ? "bg-black/95 border-white/10"
            : "bg-white/95 border-gray-200"
        )}
        sideOffset={12}
      >
        <div className="p-2">
          {items.map((item, index) => (
            <div key={item.href}>
              <DropdownMenuItem asChild className={cn(
                "rounded-lg transition-colors",
                effectiveTheme === "dark"
                  ? "focus:bg-white/10 focus:text-white"
                  : "focus:bg-gray-100 focus:text-gray-900"
              )}>
                <Link
                  href={item.href}
                  className="flex flex-col items-start gap-2 p-3 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className={cn(
                      "font-medium",
                      effectiveTheme === "dark" ? "text-white" : "text-gray-900"
                    )}>{item.label}</span>
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full ml-auto"></div>
                  </div>
                  {item.description && (
                    <span className={cn(
                      "text-sm leading-relaxed",
                      effectiveTheme === "dark" ? "text-gray-400" : "text-gray-600"
                    )}>
                      {item.description}
                    </span>
                  )}
                </Link>
              </DropdownMenuItem>
              {index < items.length - 1 && (
                <DropdownMenuSeparator className={cn(
                  "my-2",
                  effectiveTheme === "dark" ? "bg-white/10" : "bg-gray-200"
                )} />
              )}
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}