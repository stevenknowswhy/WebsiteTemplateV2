/**
 * Feature Flags Configuration
 * Centralized control for optional integrations and features
 *
 * Environment variables control these flags:
 * - NEXT_PUBLIC_ENABLE_STRIPE: Enable Stripe payment integration
 * - NEXT_PUBLIC_ENABLE_AUTH: Enable authentication system
 * - NEXT_PUBLIC_ENABLE_ANALYTICS: Enable analytics tracking
 * - NEXT_PUBLIC_ENABLE_CHAT: Enable live chat widget
 * - NEXT_PUBLIC_ENABLE_NEWSLETTER: Enable newsletter signup
 */

export interface FeatureFlags {
  // Payment & Auth
  stripe: boolean;
  auth: boolean;

  // Third-party integrations
  analytics: boolean;
  chat: boolean;
  newsletter: boolean;

  // UI Features
  darkMode: boolean;
  animations: boolean;

  // Development features
  debugMode: boolean;
  demoMode: boolean;
}

export const featureFlags: FeatureFlags = {
  // Payment & Authentication
  stripe: process.env.NEXT_PUBLIC_ENABLE_STRIPE === 'true',
  auth: process.env.NEXT_PUBLIC_ENABLE_AUTH !== 'false', // Default to true

  // Third-party integrations
  analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  chat: process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true',
  newsletter: process.env.NEXT_PUBLIC_ENABLE_NEWSLETTER !== 'false', // Default to true

  // UI Features (default to enabled)
  darkMode: process.env.NEXT_PUBLIC_DISABLE_DARK_MODE !== 'true',
  animations: process.env.NEXT_PUBLIC_DISABLE_ANIMATIONS !== 'true',

  // Development features
  debugMode: process.env.NODE_ENV === 'development',
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',
} as const;

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled<T extends keyof FeatureFlags>(feature: T): boolean {
  return featureFlags[feature];
}

/**
 * Check if multiple features are enabled
 */
export function areFeaturesEnabled(features: (keyof FeatureFlags)[]): boolean {
  return features.every(feature => featureFlags[feature]);
}

/**
 * Check if any of specified features are enabled
 */
export function isAnyFeatureEnabled(features: (keyof FeatureFlags)[]): boolean {
  return features.some(feature => featureFlags[feature]);
}

/**
 * Get enabled features for a specific category
 */
export function getFeaturesByCategory(category: 'payment' | 'integrations' | 'ui' | 'development'): Partial<FeatureFlags> {
  const categories = {
    payment: ['stripe', 'auth'] as const,
    integrations: ['analytics', 'chat', 'newsletter'] as const,
    ui: ['darkMode', 'animations'] as const,
    development: ['debugMode', 'demoMode'] as const,
  };

  const result: Partial<FeatureFlags> = {};
  categories[category].forEach(feature => {
    result[feature] = featureFlags[feature];
  });

  return result;
}