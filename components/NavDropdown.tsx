"use client"

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropdownItem } from '@/lib/siteConfig'
import { cn } from '@/lib/utils'

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60",
            "text-sm font-medium",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            className
          )}
        >
          {trigger}
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side={side}
        className="w-64"
        sideOffset={8}
      >
        {items.map((item, index) => (
          <div key={item.href}>
            <DropdownMenuItem asChild>
              <Link
                href={item.href}
                className="flex flex-col items-start gap-1 p-2 cursor-pointer"
              >
                <span className="font-medium">{item.label}</span>
                {item.description && (
                  <span className="text-xs text-muted-foreground leading-tight max-w-[200px]">
                    {item.description}
                  </span>
                )}
              </Link>
            </DropdownMenuItem>
            {index < items.length - 1 && (
              <DropdownMenuSeparator />
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}