import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import type { Plan } from '@/lib/plans';
import { isFeatureEnabled } from '@/lib/featureFlags';
import { FeatureGuard, UpgradePrompt } from '@/components/FeatureGuard';
import Link from 'next/link';

interface PricingCardProps {
  plan: Plan;
  isYearly?: boolean;
  className?: string;
}

export default function PricingCard({ plan, isYearly = false, className = "" }: PricingCardProps) {
  const price = isYearly ? plan.price.yearly : plan.price.monthly;
  const period = isYearly ? "/year" : "/month";
  const savings = plan.price.monthly > 0 && isYearly ? plan.price.monthly * 12 - plan.price.yearly : 0;

  return (
    <Card className={`relative ${plan.highlighted ? 'border-primary shadow-lg scale-105' : ''} ${className}`}>
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
          Most Popular
        </Badge>
      )}

      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription className="text-base">{plan.description}</CardDescription>

        <div className="mt-4">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold">
              {price === 0 ? 'Free' : `$${price}`}
            </span>
            {price > 0 && (
              <span className="text-muted-foreground ml-1">{period}</span>
            )}
          </div>
          {savings > 0 && isYearly && (
            <div className="mt-1 text-sm text-green-600 font-medium">
              Save ${savings} yearly
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <FeatureGuard
          feature="stripe"
          fallback={
            plan.price.monthly > 0 ? (
              <UpgradePrompt
                feature="stripe"
                title="Payment Integration Required"
                description="Enable Stripe payments to access premium features"
              />
            ) : (
              <Button
                className="w-full"
                variant={plan.buttonVariant}
                size="lg"
                asChild
              >
                <Link href="/auth/login">{plan.buttonText}</Link>
              </Button>
            )
          }
        >
          <Button
            className="w-full"
            variant={plan.buttonVariant}
            size="lg"
          >
            {plan.buttonText}
          </Button>
        </FeatureGuard>

        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}