/**
 * Webhook Signature Generation and Verification Utilities
 * Provides secure signing and verification for webhook payloads
 */

import { createHmac, createHash, timingSafeEqual } from 'crypto';

/**
 * Generate a signature for a webhook payload
 */
export function generateWebhookSignature(
  payload: string,
  secret: string
): string {
  const signature = createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');

  return `sha256=${signature}`;
}

/**
 * Verify a webhook signature
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  try {
    const expectedSignature = generateWebhookSignature(payload, secret);

    // Use timing-safe comparison to prevent timing attacks
    return timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}

/**
 * Generate a secure webhook secret
 */
export function generateWebhookSecret(): string {
  const timestamp = Date.now().toString();
  const random = require('crypto').randomBytes(32).toString('hex');
  return `${timestamp}_${random}`;
}

/**
 * Create a webhook payload with standard structure
 */
export function createWebhookPayload<T = any>(
  eventType: string,
  data: T,
  tenantId: string,
  userId?: string
): {
  event: string;
  timestamp: string;
  tenant_id: string;
  user_id?: string;
  data: T;
} {
  const payload = {
    event: eventType,
    timestamp: new Date().toISOString(),
    tenant_id: tenantId,
    user_id: userId,
    data,
  };

  return payload;
}

/**
 * Prepare webhook for delivery (add headers and sign)
 */
export function prepareWebhookForDelivery<T = any>(
  eventType: string,
  data: T,
  secret: string,
  tenantId: string,
  userId?: string
): {
  payload: any;
  headers: Record<string, string>;
} {
  const payload = createWebhookPayload(eventType, data, tenantId, userId);
  const payloadString = JSON.stringify(payload);
  const signature = generateWebhookSignature(payloadString, secret);

  return {
    payload: { ...payload, signature },
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Forhem-Webhook/1.0',
      'X-Forhem-Event': eventType,
      'X-Forhem-Signature': signature,
      'X-Forhem-Timestamp': payload.timestamp,
      'X-Forhem-Tenant': tenantId,
    },
  };
}

/**
 * Validate webhook event type
 */
export function isValidEventType(eventType: string): boolean {
  const validEventTypes = [
    'node.alert',
    'node.offline',
    'node.online',
    'user.invited',
    'alert.acknowledged',
    'alert.resolved',
    'system.maintenance',
    'webhook.test',
  ];

  return validEventTypes.includes(eventType);
}

/**
 * Extract webhook signature from headers
 */
export function extractSignatureFromHeaders(
  headers: Record<string, string>
): string | null {
  return (
    headers['x-forhem-signature'] ||
    headers['X-Forhem-Signature'] ||
    null
  );
}

/**
 * Extract event type from headers
 */
export function extractEventFromHeaders(
  headers: Record<string, string>
): string | null {
  return (
    headers['x-forhem-event'] ||
    headers['X-Forhem-Event'] ||
    null
  );
}

/**
 * Parse incoming webhook with signature verification
 */
export function parseIncomingWebhook<T = any>(
  body: string,
  headers: Record<string, string>,
  secret: string
): {
  isValid: boolean;
  payload?: T;
  error?: string;
  eventType?: string;
  signature?: string;
} {
  try {
    const signature = extractSignatureFromHeaders(headers);
    const eventType = extractEventFromHeaders(headers);

    if (!signature) {
      return {
        isValid: false,
        error: 'Missing signature header',
        eventType: eventType || undefined,
      };
    }

    if (!eventType) {
      return {
        isValid: false,
        error: 'Missing event type header',
        signature,
      };
    }

    if (!isValidEventType(eventType)) {
      return {
        isValid: false,
        error: `Invalid event type: ${eventType}`,
        signature,
        eventType,
      };
    }

    // Remove signature from payload for verification
    let parsedPayload: any;
    try {
      parsedPayload = JSON.parse(body);
      const { signature: payloadSignature, ...payloadWithoutSignature } = parsedPayload;

      if (!verifyWebhookSignature(
        JSON.stringify(payloadWithoutSignature),
        signature,
        secret
      )) {
        return {
          isValid: false,
          error: 'Invalid signature',
          signature,
          eventType,
        };
      }

      return {
        isValid: true,
        payload: payloadWithoutSignature as T,
        signature,
        eventType,
      };
    } catch (parseError) {
      // If parsing fails, try to verify the raw body
      if (!verifyWebhookSignature(body, signature, secret)) {
        return {
          isValid: false,
          error: 'Invalid signature or malformed payload',
          signature,
          eventType,
        };
      }

      // Parse the body again without signature validation
      parsedPayload = JSON.parse(body);
      const { signature: _, ...payloadWithoutSignature } = parsedPayload;

      return {
        isValid: true,
        payload: payloadWithoutSignature as T,
        signature,
        eventType,
      };
    }
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Webhook delivery status types
 */
export type WebhookDeliveryStatus =
  | 'pending'
  | 'delivered'
  | 'failed'
  | 'retrying'
  | 'expired';

/**
 * Webhook delivery result
 */
export interface WebhookDeliveryResult {
  id: string;
  webhookId: string;
  eventType: string;
  status: WebhookDeliveryStatus;
  attempts: number;
  maxAttempts: number;
  lastAttemptAt?: string;
  nextRetryAt?: string;
  deliveredAt?: string;
  error?: string;
  responseStatus?: number;
  responseTime?: number;
}

/**
 * Create webhook delivery record
 */
export function createWebhookDeliveryRecord(
  webhookId: string,
  eventType: string,
  maxAttempts: number = 3
): WebhookDeliveryResult {
  return {
    id: `delivery_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    webhookId,
    eventType,
    status: 'pending',
    attempts: 0,
    maxAttempts,
    lastAttemptAt: new Date().toISOString(),
  };
}

/**
 * Calculate retry delay with exponential backoff
 */
export function calculateRetryDelay(attempt: number): number {
  // Exponential backoff: 1min, 2min, 4min, 8min, 16min, 32min
  const baseDelay = 60 * 1000; // 1 minute in milliseconds
  const maxDelay = 30 * 60 * 1000; // 30 minutes max
  const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);

  // Add jitter to prevent thundering herd
  const jitter = Math.random() * 0.1 * delay;
  return Math.floor(delay + jitter);
}