'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/toast-context';

export function ManageSubscriptionButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleManageSubscription = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error creating portal session:', error);
        showToast('Failed to open billing portal. Please try again.', 'error');
        return;
      }

      const { url } = await response.json();

      // Redirect to Stripe billing portal
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      showToast('Failed to open billing portal. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleManageSubscription}
      disabled={isLoading}
      className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Loading...' : 'Manage Subscription'}
    </button>
  );
}
