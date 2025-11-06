'use client';

import React, { useState, useEffect } from 'react';
import DSARDashboard from '@/components/DSARDashboard';
import { privacyService } from '@/lib/privacy';
import { logger } from '@/lib/logger';
import { useOptimizedEventHandler } from '@/lib/react-optimizations';

export default function PrivacyDashboard() {
  const [userId, setUserId] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dsar' | 'preferences' | 'consent'>('dsar');
  const [updateStatus, setUpdateStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    try {
      // Get current user ID from Supabase
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        const prefs = await privacyService.getPrivacyPreferences(user.id);
        setPreferences(prefs);
      }
    } catch (error) {
      logger.error('Failed to initialize user for privacy dashboard', error as Record<string, any>);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferenceChange = useOptimizedEventHandler(async (key: string, value: boolean | string) => {
    if (!userId) return;

    try {
      await privacyService.updatePrivacyPreferences(userId, { [key]: value });

      const updatedPrefs = await privacyService.getPrivacyPreferences(userId);
      setPreferences(updatedPrefs);

      setUpdateStatus({
        type: 'success',
        message: 'Privacy preferences updated successfully'
      });

      setTimeout(() => setUpdateStatus({ type: null, message: '' }), 3000);
    } catch (error) {
      logger.error('Failed to update privacy preferences', error as Record<string, any>);
      setUpdateStatus({
        type: 'error',
        message: 'Failed to update preferences'
      });

      setTimeout(() => setUpdateStatus({ type: null, message: '' }), 3000);
    }
  }, 200);

  const handleConsentChange = useOptimizedEventHandler(async (consentType: string, granted: boolean) => {
    if (!userId) return;

    try {
      await privacyService.recordConsent(userId, consentType as any, granted);

      setUpdateStatus({
        type: 'success',
        message: `${consentType} consent updated successfully`
      });

      setTimeout(() => setUpdateStatus({ type: null, message: '' }), 3000);
    } catch (error) {
      logger.error('Failed to update consent', error as Record<string, any>);
      setUpdateStatus({
        type: 'error',
        message: 'Failed to update consent'
      });

      setTimeout(() => setUpdateStatus({ type: null, message: '' }), 3000);
    }
  }, 200);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading privacy settings...</p>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">
            Please log in to access your privacy dashboard and manage your data rights.
          </p>
          <button
            onClick={() => window.location.href = '/auth/login'}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Privacy Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your privacy settings, exercise your data rights, and control how your information is used.
          </p>
        </div>

        {/* Status Messages */}
        {updateStatus.type && (
          <div className={`mb-6 p-4 rounded-md border ${
            updateStatus.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <p className="text-sm">{updateStatus.message}</p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('dsar')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'dsar'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Data Requests
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'preferences'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Preferences
            </button>
            <button
              onClick={() => setActiveTab('consent')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'consent'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Consent History
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {activeTab === 'dsar' && (
            <div className="p-6">
              <DSARDashboard userId={userId} />
            </div>
          )}

          {activeTab === 'preferences' && preferences && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Privacy Preferences
                </h2>
                <p className="text-gray-600 mb-6">
                  Control how your data is collected and used. These preferences will be respected throughout our platform.
                </p>
              </div>

              {/* Data Collection Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Data Collection</h3>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Analytics & Usage Data</h4>
                    <p className="text-sm text-gray-600">Help us improve by sharing anonymous usage statistics</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Marketing Communications</h4>
                    <p className="text-sm text-gray-600">Receive product updates and marketing emails</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Personalization</h4>
                    <p className="text-sm text-gray-600">Customize your experience based on your preferences</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.personalization}
                      onChange={(e) => handlePreferenceChange('personalization', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              {/* Data Retention */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Data Retention</h3>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <label htmlFor="retention" className="block text-sm font-medium text-gray-700 mb-2">
                    How long should we keep your data?
                  </label>
                  <select
                    id="retention"
                    value={preferences.dataRetention}
                    onChange={(e) => handlePreferenceChange('dataRetention', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="30days">30 days</option>
                    <option value="90days">90 days (recommended)</option>
                    <option value="1year">1 year</option>
                    <option value="indefinite">Keep until deletion request</option>
                  </select>
                  <p className="text-sm text-gray-600 mt-2">
                    Some data may be retained longer for legal compliance purposes.
                  </p>
                </div>
              </div>

              {/* Last Updated */}
              <div className="text-sm text-gray-500 pt-4 border-t border-gray-200">
                <p>Last updated: {new Date(preferences.lastUpdated).toLocaleDateString()}</p>
              </div>
            </div>
          )}

          {activeTab === 'consent' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Consent History
              </h2>
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-2">📜</div>
                <p className="text-gray-600">
                  Your consent history will be displayed here.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  All consent changes are logged and available for audit.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/privacy"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-gray-900 mb-2">Privacy Policy</h3>
            <p className="text-sm text-gray-600">Read our full privacy policy</p>
          </a>
          <a
            href="/terms-of-service"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-gray-900 mb-2">Terms of Service</h3>
            <p className="text-sm text-gray-600">View our terms and conditions</p>
          </a>
          <button
            onClick={() => window.location.href = 'mailto:privacy@databuilddirect.com'}
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-left w-full"
          >
            <h3 className="font-medium text-gray-900 mb-2">Contact DPO</h3>
            <p className="text-sm text-gray-600">Email our Data Protection Officer</p>
          </button>
        </div>
      </div>
    </div>
  );
}