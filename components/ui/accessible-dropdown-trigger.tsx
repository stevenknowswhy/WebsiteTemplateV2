/**
 * Accessible Dropdown Trigger Component
 *
 * A custom dropdown trigger that properly handles accessibility attributes
 * for Radix UI DropdownMenu components.
 *
 * Addresses issue where DropdownMenuTrigger doesn't forward accessibility
 * attributes correctly to the underlying button element.
 */

"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

interface AccessibleDropdownTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  title?: string;
}

export const AccessibleDropdownTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  AccessibleDropdownTriggerProps
>(({ className, children, ariaLabel, title, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Trigger asChild>
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs",
          className
        )}
        aria-label={ariaLabel}
        title={title}
        {...props}
      >
        {children}
      </button>
    </DropdownMenuPrimitive.Trigger>
  );
});

AccessibleDropdownTrigger.displayName = "AccessibleDropdownTrigger";

// Convenience component for the common "more actions" pattern
interface MoreActionsDropdownTriggerProps {
  userFullName: string;
  className?: string;
}

export const MoreActionsDropdownTrigger = ({
  userFullName,
  className
}: MoreActionsDropdownTriggerProps) => {
  return (
    <AccessibleDropdownTrigger
      className={className}
      ariaLabel={`Actions for ${userFullName}`}
      title={`Actions for ${userFullName}`}
    >
      <MoreHorizontal className="h-4 w-4" />
    </AccessibleDropdownTrigger>
  );
};