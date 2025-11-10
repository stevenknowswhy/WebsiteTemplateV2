/**
 * Webhook Delivery Service
 * Handles sending webhooks with retries and error handling
 */

import { prepareWebhookForDelivery, createWebhookDeliveryRecord, calculateRetryDelay, WebhookDeliveryResult } from './signer';

/**
 * Webhook delivery configuration
 */
export interface WebhookDeliveryConfig {
  timeout: number;
  maxRetries: number;
  retryDelay: number;
  userAgent: string;
}

/**
 * Default webhook delivery configuration
 */
export const DEFAULT_WEBHOOK_CONFIG: WebhookDeliveryConfig = {
  timeout: 30000, // 30 seconds
  maxRetries: 3,
  retryDelay: 1000, // 1 second base delay
  userAgent: 'Forhem-Webhook/1.0',
};

/**
 * Send webhook with retry logic
 */
export async function sendWebhook(
  url: string,
  eventType: string,
  data: any,
  secret: string,
  tenantId: string,
  webhookId?: string,
  userId?: string,
  config: Partial<WebhookDeliveryConfig> = {}
): Promise<WebhookDeliveryResult> {
  const finalConfig = { ...DEFAULT_WEBHOOK_CONFIG, ...config };
  const deliveryRecord = createWebhookDeliveryRecord(
    webhookId || 'unknown-webhook',
    eventType,
    finalConfig.maxRetries
  );

  let attempt = 0;
  let lastError: Error | null = null;

  while (attempt < finalConfig.maxRetries) {
    attempt++;
    deliveryRecord.attempts = attempt;
    deliveryRecord.lastAttemptAt = new Date().toISOString();

    try {
      const { payload, headers } = prepareWebhookForDelivery(
        eventType,
        data,
        secret,
        tenantId,
        userId
      );

      const startTime = Date.now();

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(finalConfig.timeout),
      });

      const responseTime = Date.now() - startTime;

      if (response.ok) {
        deliveryRecord.status = 'delivered';
        deliveryRecord.deliveredAt = new Date().toISOString();
        deliveryRecord.responseStatus = response.status;
        deliveryRecord.responseTime = responseTime;

        return deliveryRecord;
      } else {
        const errorText = await response.text();
        lastError = new Error(`HTTP ${response.status}: ${errorText}`);
        deliveryRecord.error = lastError.message;
        deliveryRecord.responseStatus = response.status;
        deliveryRecord.responseTime = responseTime;

        if (response.status >= 400 && response.status < 500) {
          // Client errors (4xx) should not be retried
          deliveryRecord.status = 'failed';
          return deliveryRecord;
        }

        // Server errors (5xx) and network errors should be retried
        if (attempt < finalConfig.maxRetries) {
          deliveryRecord.status = 'retrying';
          const retryDelay = calculateRetryDelay(attempt - 1);
          deliveryRecord.nextRetryAt = new Date(
            Date.now() + retryDelay
          ).toISOString();

          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        } else {
          deliveryRecord.status = 'expired';
        }
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      deliveryRecord.error = lastError.message;

      if (attempt < finalConfig.maxRetries) {
        deliveryRecord.status = 'retrying';
        const retryDelay = calculateRetryDelay(attempt - 1);
        deliveryRecord.nextRetryAt = new Date(
          Date.now() + retryDelay
        ).toISOString();

        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      } else {
        deliveryRecord.status = 'expired';
      }
    }
  }

  return deliveryRecord;
}

/**
 * Batch webhook delivery
 */
export async function sendBatchWebhooks(
  webhooks: Array<{
    url: string;
    eventType: string;
    data: any;
    secret: string;
    tenantId: string;
    webhookId?: string;
    userId?: string;
  }>,
  config: Partial<WebhookDeliveryConfig> = {}
): Promise<WebhookDeliveryResult[]> {
  const promises = webhooks.map(webhook =>
    sendWebhook(
      webhook.url,
      webhook.eventType,
      webhook.data,
      webhook.secret,
      webhook.tenantId,
      webhook.webhookId,
      webhook.userId,
      config
    )
  );

  return Promise.allSettled(promises).then(results =>
    results.map(result => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          id: 'batch-error',
          webhookId: 'batch-error',
          eventType: 'batch.error',
          status: 'failed' as const,
          attempts: 1,
          maxAttempts: config.maxRetries || 3,
          lastAttemptAt: new Date().toISOString(),
          error: result.reason?.message || 'Batch delivery failed',
        };
      }
    })
  );
}