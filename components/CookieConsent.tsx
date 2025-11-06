'use client';

import React, { useState, useEffect } from 'react';
import { privacyService } from '@/lib/privacy';
import { logger } from '@/lib/logger';
import { useOptimizedEventHandler } from '@/lib/react-optimizations';

interface CookieConsentProps {
  onConsentChange?: (preferences: any) => void;
}

interface ConsentPreferences {
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onConsentChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    analytics: false,
    marketing: false,
    personalization: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check if user has already made a choice
  useEffect(() => {
    const checkConsent = async () => {
      try {
        // Check localStorage for existing consent
        const storedConsent = localStorage.getItem('cookieConsent');

        if (storedConsent) {
          const parsed = JSON.parse(storedConsent);
          if (parsed.timestamp && Date.now() - parsed.timestamp < 365 * 24 * 60 * 60 * 1000) {
            // Consent is still valid (1 year)
            setPreferences(parsed.preferences);
            setIsVisible(false);
            onConsentChange?.(parsed.preferences);
            return;
          }
        }

        // If no valid consent found, show banner
        setIsVisible(true);
      } catch (error) {
        logger.warn('Failed to check cookie consent', error as Record<string, any>);
        setIsVisible(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkConsent();
  }, [onConsentChange]);

  const handleConsentChange = useOptimizedEventHandler((type: keyof ConsentPreferences, value: boolean) => {
    setPreferences(prev => {
      const updated = { ...prev, [type]: value };
      logger.debug('Cookie preference changed', { type, value }, ['privacy']);
      return updated;
    });
  }, 100);

  const saveConsent = useOptimizedEventHandler(async (saveToDatabase = false) => {
    try {
      const consentData = {
        preferences,
        timestamp: Date.now(),
        version: '1.0',
      };

      // Save to localStorage
      localStorage.setItem('cookieConsent', JSON.stringify(consentData));

      // Notify parent component
      onConsentChange?.(preferences);

      // Save to database if user is logged in
      if (saveToDatabase) {
        const userId = await getCurrentUserId();
        if (userId) {
          try {
            await privacyService.recordConsent(userId, 'analytics', preferences.analytics);
            await privacyService.recordConsent(userId, 'marketing', preferences.marketing);
            await privacyService.recordConsent(userId, 'personalization', preferences.personalization);
          } catch (error) {
            logger.error('Failed to save consent preferences to database', error as Record<string, any>);
          }
        }
      }

      setIsVisible(false);
      logger.info('Cookie consent preferences saved', consentData, ['privacy']);
    } catch (error) {
      logger.error('Failed to save cookie consent', error as Record<string, any>);
    }
  }, 200);

  const handleAcceptAll = useOptimizedEventHandler(() => {
    setPreferences({
      analytics: true,
      marketing: true,
      personalization: true,
    });
    setTimeout(() => saveConsent(true), 100);
  }, 100);

  const handleRejectAll = useOptimizedEventHandler(() => {
    setPreferences({
      analytics: false,
      marketing: false,
      personalization: false,
    });
    setTimeout(() => saveConsent(true), 100);
  }, 100);

  const handleCustomSave = useOptimizedEventHandler(() => {
    saveConsent(true);
  }, 100);

  const getCurrentUserId = async (): Promise<string | null> => {
    try {
      // This would typically use your auth service
      // For now, check if there's a user session
      const { data: { session } } = await (await import('@/lib/supabase/client')).createClient().auth.getSession();
      return session?.user?.id || null;
    } catch {
      return null;
    }
  };

  if (isLoading || !isVisible) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
    >
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8 space-y-4 lg:space-y-0">
          {/* Main Content */}
          <div className="flex-1">
            <h3
              id="cookie-consent-title"
              className="text-lg font-semibold text-gray-900 mb-2"
            >
              🍪 Cookie Preferences
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              We use cookies and similar technologies to help personalize content, tailor and measure
              ads, and provide a better experience. By clicking accept, you agree to this, as outlined
              in our{' '}
              <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
              </a>
              .
            </p>

            {/* Detailed Preferences */}
            {showDetails && (
              <div className="space-y-3 mb-4 border-t pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Analytics Cookies</h4>
                    <p className="text-xs text-gray-600">
                      Help us understand how you use our site by collecting anonymous usage data.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => handleConsentChange('analytics', e.target.checked)}
                      className="sr-only peer"
                      aria-label="Toggle analytics cookies"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Marketing Cookies</h4>
                    <p className="text-xs text-gray-600">
                      Allow us to show relevant ads based on your interests and track ad performance.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => handleConsentChange('marketing', e.target.checked)}
                      className="sr-only peer"
                      aria-label="Toggle marketing cookies"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Personalization Cookies</h4>
                    <p className="text-xs text-gray-600">
                      Remember your preferences and provide personalized content and features.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.personalization}
                      onChange={(e) => handleConsentChange('personalization', e.target.checked)}
                      className="sr-only peer"
                      aria-label="Toggle personalization cookies"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col lg:flex-col space-y-2 lg:space-y-2 lg:min-w-[200px]">
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-medium"
              aria-label="Accept all cookies"
            >
              Accept All
            </button>

            <button
              onClick={handleRejectAll}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-medium"
              aria-label="Reject all cookies"
            >
              Reject All
            </button>

            {showDetails ? (
              <button
                onClick={handleCustomSave}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm font-medium"
                aria-label="Save custom cookie preferences"
              >
                Save Preferences
              </button>
            ) : (
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-medium"
                aria-label="Show cookie details and customize preferences"
              >
                Customize
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;