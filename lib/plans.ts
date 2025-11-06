export interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  highlighted?: boolean;
  stripePriceId?: string;
  buttonText: string;
  buttonVariant: "default" | "outline";
  popular?: boolean;
}

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for individuals and small projects getting started.",
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Community support",
      "Mobile responsive design",
      "Basic templates",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Best for growing teams and professional projects.",
    price: {
      monthly: 29,
      yearly: 290,
    },
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "Custom domains",
      "Advanced templates",
      "Team collaboration",
      "API access",
      "White-label options",
    ],
    highlighted: true,
    popular: true,
    buttonText: "Start Free Trial",
    buttonVariant: "default",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with custom requirements.",
    price: {
      monthly: 99,
      yearly: 990,
    },
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "Advanced security",
      "Custom development",
      "SSO/SAML",
      "Audit logs",
      "24/7 phone support",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID,
  },
];

export function getPlanById(id: string): Plan | undefined {
  return plans.find((plan) => plan.id === id);
}

export function getPlanByStripePriceId(priceId: string): Plan | undefined {
  return plans.find((plan) => plan.stripePriceId === priceId);
}

export function getFeatureComparison(): Record<string, string[]> {
  return {
    "Projects": ["3", "Unlimited", "Unlimited"],
    "Analytics": ["Basic", "Advanced", "Advanced"],
    "Support": ["Community", "Priority", "Dedicated"],
    "Custom Domains": ["❌", "✅", "✅"],
    "API Access": ["❌", "✅", "✅"],
    "Team Collaboration": ["❌", "✅", "✅"],
    "Custom Integrations": ["❌", "❌", "✅"],
    "SSO/SAML": ["❌", "❌", "✅"],
    "SLA Guarantee": ["❌", "❌", "✅"],
    "24/7 Phone Support": ["❌", "❌", "✅"],
  };
}