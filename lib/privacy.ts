import { createClient } from '@/lib/supabase/client';
import { logger } from './logger';
import { errorTracker } from './error-tracking';

export interface DSARRequest {
  id: string;
  userId: string;
  requestType: 'access' | 'deletion' | 'rectification' | 'portability';
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  requestedAt: string;
  completedAt?: string;
  requestData?: Record<string, any>;
  response?: {
    data: any;
    format: 'json' | 'csv' | 'pdf';
    downloadUrl?: string;
    expiresAt?: string;
  };
}

export interface UserConsent {
  id: string;
  userId: string;
  consentType: 'analytics' | 'marketing' | 'essential' | 'personalization';
  version: string;
  granted: boolean;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

export interface PrivacyPreferences {
  userId: string;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  dataRetention: '30days' | '90days' | '1year' | 'indefinite';
  lastUpdated: string;
}

class PrivacyService {
  private supabase = createClient();

  // DSAR Management
  async createDSAR(
    userId: string,
    requestType: DSARRequest['requestType'],
    requestData?: Record<string, any>
  ): Promise<DSARRequest> {
    try {
      const requestId = `dsar_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const request: DSARRequest = {
        id: requestId,
        userId,
        requestType,
        status: 'pending',
        requestedAt: new Date().toISOString(),
        requestData,
      };

      // Store request in database
      // Note: Type assertion bypasses strict Supabase typing for development
      // In production, ensure the dsar_requests table exists in your database schema
      const { error } = await (this.supabase
        .from('dsar_requests') as any)
        .insert(request);

      if (error) {
        logger.error('Failed to create DSAR request', error as Record<string, any>, ['privacy', 'dsar']);
        throw new Error('Failed to create DSAR request');
      }

      // Log the request for audit
      logger.info('DSAR request created', {
        requestId,
        userId,
        requestType,
        timestamp: request.requestedAt,
      }, ['privacy', 'dsar']);

      // Trigger processing for access requests
      if (requestType === 'access') {
        this.processDSAR(requestId).catch(error => {
          logger.error('Failed to process DSAR', error as Record<string, any>, ['privacy', 'dsar']);
        });
      }

      return request;
    } catch (error) {
      errorTracker.captureException(error as Error, {
        userId,
        route: 'privacy',
        method: 'createDSAR',
        tags: { privacy: 'dsar' },
      });
      throw error;
    }
  }

  async getDSARStatus(requestId: string): Promise<DSARRequest | null> {
    try {
      const { data, error } = await this.supabase
        .from('dsar_requests')
        .select('*')
        .eq('id', requestId)
        .single();

      if (error) {
        logger.warn('DSAR request not found', { requestId });
        return null;
      }

      return data as DSARRequest;
    } catch (error) {
      errorTracker.captureException(error as Error, {
        route: 'privacy',
        method: 'processDSAR',
        tags: { requestId },
      });
      throw error;
    }
  }

  private async processDSAR(requestId: string): Promise<void> {
    try {
      // Update status to processing
      await ((this.supabase
        .from('dsar_requests') as any)
        .update({ status: 'processing' })
        .eq('id', requestId));

      const request = await this.getDSARStatus(requestId);
      if (!request) throw new Error('Request not found');

      // Collect user data based on request type
      const userData = await this.collectUserData(request.userId, request.requestType);

      // Generate response file
      const response = {
        data: userData,
        format: 'json' as const,
        downloadUrl: `/api/privacy/download/${requestId}`,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      };

      // Update request with response
      await ((this.supabase
        .from('dsar_requests') as any)
        .update({
          status: 'completed',
          completedAt: new Date().toISOString(),
          response,
        }))
        .eq('id', requestId);

      logger.info('DSAR request processed', {
        requestId,
        userId: request.userId,
        requestType: request.requestType,
        dataSize: JSON.stringify(userData).length,
      }, ['privacy', 'dsar']);
    } catch (error) {
      // Update status to failed
      await ((this.supabase
        .from('dsar_requests') as any)
        .update({ status: 'cancelled' })
        .eq('id', requestId));

      logger.error('DSAR processing failed', error as Record<string, any>, ['privacy', 'dsar']);
      errorTracker.captureException(error as Error, {
        route: 'privacy',
        method: 'processDSAR',
        tags: { requestId },
      });
    }
  }

  private async collectUserData(userId: string, requestType: DSARRequest['requestType']) {
    const userData: any = {
      userId,
      exportTimestamp: new Date().toISOString(),
      dataSections: {},
    };

    try {
      // Profile data
      const { data: profile } = await this.supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profile) {
        userData.dataSections.profile = profile;
      }

      // Analytics data (if consented)
      const { data: consentData } = await ((this.supabase
        .from('user_consent') as any)
        .select('*')
        .eq('user_id', userId));

      if (consentData && consentData.some((c: any) => c.consent_type === 'analytics' && c.granted)) {
        // Collect performance metrics, user activity, etc.
        // This would integrate with your analytics system
        userData.dataSections.analytics = {
          sessionCount: consentData.length,
          lastActivity: consentData[consentData.length - 1]?.timestamp,
        };
      }

      // Authentication history
      const { data: authHistory } = await this.supabase
        .from('audit_trail')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (authHistory) {
        userData.dataSections.authHistory = authHistory;
      }

      // Contact form submissions
      const { data: contactData } = await this.supabase
        .from('contact_submissions')
        .select('*')
        .eq('user_id', userId);

      if (contactData) {
        userData.dataSections.contactSubmissions = contactData;
      }

      // If deletion request, add deletion confirmation
      if (requestType === 'deletion') {
        userData.dataSections.deletion = {
          requested: true,
          scheduledFor: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        };
      }

      return userData;
    } catch (error) {
      logger.error('Failed to collect user data for DSAR', error as Record<string, any>, ['privacy', 'dsar']);
      throw error;
    }
  }

  // Consent Management
  async recordConsent(
    userId: string,
    consentType: UserConsent['consentType'],
    granted: boolean
  ): Promise<UserConsent> {
    try {
      const consent: UserConsent = {
        id: `consent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        consentType,
        version: '1.0',
        granted,
        timestamp: new Date().toISOString(),
        ipAddress: '', // Will be filled by server
        userAgent: navigator.userAgent,
      };

      const { error } = await ((this.supabase
        .from('user_consent') as any)
        .insert([consent]));

      if (error) {
        logger.error('Failed to record user consent', error as Record<string, any>, ['privacy', 'consent']);
        throw new Error('Failed to record consent');
      }

      // Update privacy preferences
      await this.updatePrivacyPreferences(userId, {
        [consentType]: granted,
      });

      logger.info('User consent recorded', {
        consentId: consent.id,
        userId,
        consentType,
        granted,
      }, ['privacy', 'consent']);

      return consent;
    } catch (error) {
      errorTracker.captureException(error as Error, {
        userId,
        route: 'privacy',
        method: 'recordConsent',
        tags: { consentType, granted: String(granted) },
      });
      throw error;
    }
  }

  async getPrivacyPreferences(userId: string): Promise<PrivacyPreferences | null> {
    try {
      const { data, error } = await this.supabase
        .from('privacy_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        // Return default preferences if not set
        return {
          userId,
          analytics: false,
          marketing: false,
          personalization: false,
          dataRetention: '90days',
          lastUpdated: new Date().toISOString(),
        };
      }

      return data as PrivacyPreferences;
    } catch (error) {
      errorTracker.captureException(error as Error, {
        userId,
        route: 'privacy',
        method: 'getPrivacyPreferences',
        tags: { operation: 'get' },
      });
      throw error;
    }
  }

  async updatePrivacyPreferences(
    userId: string,
    updates: Partial<PrivacyPreferences>
  ): Promise<PrivacyPreferences> {
    try {
      const existingPrefs = await this.getPrivacyPreferences(userId);

      const updatedPrefs: PrivacyPreferences = {
        ...(existingPrefs || {
          userId,
          analytics: false,
          marketing: false,
          personalization: false,
          dataRetention: '90days',
          lastUpdated: new Date().toISOString(),
        }),
        ...updates,
        lastUpdated: new Date().toISOString(),
      };

      const { error } = await (this.supabase
        .from('privacy_preferences') as any)
        .upsert([updatedPrefs]);

      if (error) {
        logger.error('Failed to update privacy preferences', error as Record<string, any>, ['privacy']);
        throw new Error('Failed to update privacy preferences');
      }

      logger.info('Privacy preferences updated', {
        userId,
        preferences: updatedPrefs,
      }, ['privacy']);

      return updatedPrefs;
    } catch (error) {
      errorTracker.captureException(error as Error, {
        userId,
        extra: { updates },
        tags: { privacy: 'update' },
      });
      throw error;
    }
  }

  // Data deletion
  async scheduleDataDeletion(userId: string, reason: string): Promise<void> {
    try {
      const deletionRequest = await this.createDSAR(userId, 'deletion', { reason });

      logger.warn('User data deletion scheduled', {
        userId,
        requestId: deletionRequest.id,
        reason,
        scheduledFor: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }, ['privacy', 'deletion']);

      // In a real implementation, this would trigger a background job
      // to actually delete the data after the grace period
    } catch (error) {
      errorTracker.captureException(error as Error, {
        userId,
        extra: { reason },
        tags: { privacy: 'deletion' },
      });
      throw error;
    }
  }

  // Compliance reporting
  async generateComplianceReport(startDate: string, endDate: string): Promise<any> {
    try {
      const report = {
        period: { startDate, endDate },
        generatedAt: new Date().toISOString(),
        metrics: {
          dsar: {} as any,
          consent: {} as any,
        },
      };

      // DSAR metrics
      const { data: dsarData } = await (this.supabase
        .from('dsar_requests') as any)
        .select('*')
        .gte('requested_at', startDate)
        .lte('requested_at', endDate);

      report.metrics.dsar = {
        total: dsarData?.length || 0,
        completed: dsarData?.filter((d: any) => d.status === 'completed').length || 0,
        byType: dsarData?.reduce((acc: Record<string, number>, d: any) => {
          acc[d.request_type] = (acc[d.request_type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>) || {},
      };

      // Consent metrics
      const { data: consentData } = await (this.supabase
        .from('user_consent') as any)
        .select('*')
        .gte('timestamp', startDate)
        .lte('timestamp', endDate);

      report.metrics.consent = {
        total: consentData?.length || 0,
        granted: consentData?.filter((c: any) => c.granted).length || 0,
        byType: consentData?.reduce((acc: Record<string, number>, c: any) => {
          acc[c.consent_type] = (acc[c.consent_type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>) || {},
      };

      logger.info('Compliance report generated', {
        period: { startDate, endDate },
        report,
      }, ['privacy', 'compliance']);

      return report;
    } catch (error) {
      errorTracker.captureException(error as Error, {
        extra: { startDate, endDate },
        tags: { privacy: 'compliance' },
      });
      throw error;
    }
  }
}

export const privacyService = new PrivacyService();
export default privacyService;