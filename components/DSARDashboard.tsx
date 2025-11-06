'use client';

import React, { useState, useEffect } from 'react';
import { privacyService } from '@/lib/privacy';
import { logger } from '@/lib/logger';
import { useOptimizedEventHandler } from '@/lib/react-optimizations';

interface DSARDashboardProps {
  userId: string;
}

const DSARDashboard: React.FC<DSARDashboardProps> = ({ userId }) => {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newRequestType, setNewRequestType] = useState<'access' | 'deletion' | 'rectification'>('access');
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadRequests();
  }, [userId]);

  const loadRequests = async () => {
    try {
      setIsLoading(true);
      // This would typically load from an API endpoint
      // For now, we'll simulate empty state
      setRequests([]);
    } catch (error) {
      logger.error('Failed to load DSAR requests', error as Record<string, any>);
      setError('Failed to load your data requests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitRequest = useOptimizedEventHandler(async () => {
    if (!newRequestType) {
      setError('Please select a request type');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);

      const request = await privacyService.createDSAR(userId, newRequestType, reason ? { reason } : undefined);

      setSuccess(`Your ${newRequestType} request has been submitted successfully. Request ID: ${request.id.substring(0, 8)}`);
      setReason('');
      loadRequests(); // Refresh requests list
    } catch (error) {
      logger.error('Failed to submit DSAR request', error as Record<string, any>);
      setError('Failed to submit your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, 200);

  const downloadData = useOptimizedEventHandler((requestId: string) => {
    // This would typically download the actual data
    logger.info('Data download requested', { requestId }, ['privacy', 'dsar']);
    alert('Data download would start here in a real implementation');
  }, 100);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case 'access': return 'Data Access';
      case 'deletion': return 'Data Deletion';
      case 'rectification': return 'Data Correction';
      case 'portability': return 'Data Portability';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Data Subject Access Requests
        </h2>
        <p className="text-gray-700">
          Exercise your rights under GDPR and CCPA to access, delete, or correct your personal data.
          All requests will be processed within 30 days as required by law.
        </p>
      </div>

      {/* New Request Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Submit New Request
        </h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 mb-2">
              Request Type *
            </label>
            <select
              id="requestType"
              value={newRequestType}
              onChange={(e) => setNewRequestType(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-required="true"
            >
              <option value="access">Request Access to My Data</option>
              <option value="deletion">Request Deletion of My Data</option>
              <option value="rectification">Request Correction of My Data</option>
            </select>
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
              Reason (Optional)
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Please provide any additional context for your request..."
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              You will receive a confirmation email within 24 hours.
            </div>
            <button
              onClick={handleSubmitRequest}
              disabled={isSubmitting || !newRequestType}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm">{success}</p>
          </div>
        )}
      </div>

      {/* Existing Requests */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Your Data Requests
        </h3>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading your requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-2">📋</div>
            <p className="text-gray-600">
              You haven't submitted any data requests yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                    <span className="font-medium text-gray-900">
                      {getRequestTypeLabel(request.request_type)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(request.requested_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-3">
                  <strong>Request ID:</strong> {request.id}
                  {request.completed_at && (
                    <span className="ml-4">
                      <strong>Completed:</strong> {new Date(request.completed_at).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {request.status === 'completed' && request.response && (
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-sm text-gray-600">
                      Your data is ready for download
                    </span>
                    <button
                      onClick={() => downloadData(request.id)}
                      className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                    >
                      Download Data
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Privacy Rights Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Your Privacy Rights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">GDPR Rights</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Right to be informed about data processing</li>
              <li>• Right to access your personal data</li>
              <li>• Right to rectification of inaccurate data</li>
              <li>• Right to erasure (right to be forgotten)</li>
              <li>• Right to restrict processing</li>
              <li>• Right to data portability</li>
              <li>• Right to object to processing</li>
              <li>• Rights related to automated decision-making</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">CCPA Rights</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Right to know what personal information is collected</li>
              <li>• Right to delete personal information</li>
              <li>• Right to opt-out of sale/sharing of personal information</li>
              <li>• Right to non-discrimination for exercising rights</li>
              <li>• Right to access specific pieces of personal information</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Need Help?
        </h3>
        <p className="text-gray-700 mb-4">
          If you have questions about your privacy rights or need assistance with your request,
          please contact our Data Protection Officer.
        </p>
        <div className="space-y-2 text-sm">
          <p><strong>Email:</strong> privacy@databuilddirect.com</p>
          <p><strong>Response Time:</strong> Within 30 days (as required by law)</p>
          <p><strong>Documentation:</strong> We may request identity verification for data requests</p>
        </div>
      </div>
    </div>
  );
};

export default DSARDashboard;