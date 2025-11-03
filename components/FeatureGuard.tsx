"use client";

import React from 'react';
import { featureFlags, isFeatureEnabled } from '@/lib/featureFlags';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * Component to conditionally render content based on feature flags
 * Usage: <FeatureGuard feature="stripe" fallback={<UpgradePrompt />}>
 *           <StripePaymentForm />
 *         </FeatureGuard>
 */
export interface FeatureGuardProps {
  feature: keyof typeof featureFlags;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function FeatureGuard({ feature, fallback = null, children }: FeatureGuardProps) {
  if (!isFeatureEnabled(feature)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Component to render content only when feature is disabled
 * Usage: <FeatureDisabled feature="auth">
 *           <PublicContent />
 *         </FeatureDisabled>
 */
export interface FeatureDisabledProps {
  feature: keyof typeof featureFlags;
  children: React.ReactNode;
}

export function FeatureDisabled({ feature, children }: FeatureDisabledProps) {
  if (isFeatureEnabled(feature)) {
    return null;
  }

  return <>{children}</>;
}

/**
 * Component to show different content based on feature availability
 */
export interface FeatureSwitchProps {
  feature: keyof typeof featureFlags;
  enabled: React.ReactNode;
  disabled: React.ReactNode;
}

export function FeatureSwitch({ feature, enabled, disabled }: FeatureSwitchProps) {
  return isFeatureEnabled(feature) ? <>{enabled}</> : <>{disabled}</>;
}

/**
 * Component to show upgrade prompts for paid features
 */
export interface UpgradePromptProps {
  feature: keyof typeof featureFlags;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function UpgradePrompt({
  feature,
  title,
  description,
  actionLabel = "Upgrade Plan",
  actionHref = "/pricing"
}: UpgradePromptProps) {
  return (
    <div className="text-center p-8 border-2 border-dashed border-muted rounded-lg">
      <div className="text-4xl mb-4">🔒</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <a
        href={actionHref}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      >
        {actionLabel}
      </a>
    </div>
  );
}

/**
 * Component to show feature badge (Beta, New, Pro, etc.)
 */
export interface FeatureBadgeProps {
  feature: keyof typeof featureFlags;
  variant?: 'beta' | 'new' | 'pro' | 'enterprise';
  className?: string;
}

export function FeatureBadge({ feature, variant = 'pro', className = "" }: FeatureBadgeProps) {
  if (isFeatureEnabled(feature)) {
    return null;
  }

  const variants = {
    beta: { label: 'Beta', className: 'bg-blue-100 text-blue-800' },
    new: { label: 'New', className: 'bg-green-100 text-green-800' },
    pro: { label: 'Pro', className: 'bg-purple-100 text-purple-800' },
    enterprise: { label: 'Enterprise', className: 'bg-orange-100 text-orange-800' },
  };

  const { label, className: variantClassName } = variants[variant];

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${variantClassName} ${className}`}>
      {label}
    </span>
  );
}