/**
 * API Route for Individual Webhook Actions
 * POST: Execute webhook actions (disable, enable, update, test)
 */

import { createClient } from '@/lib/supabase/server';
import { getCurrentAdminUser } from '@/lib/auth/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ webhookId: string }> }
) {
  try {
    const user = await getCurrentAdminUser();

    if (!user || !user.tenantContext) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action } = body;

    if (!action || !['disable', 'enable', 'update', 'test'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;
    const { webhookId } = await params;

    // Verify webhook belongs to tenant
    const { data: webhook, error: webhookError } = await supabase
      .from('webhooks' as any)
      .select('id, name, url, is_active, tenant_id')
      .eq('id', webhookId)
      .eq('tenant_id', tenantId)
      .returns<any>()
      .single();

    if (webhookError || !webhook) {
      return NextResponse.json(
        { error: 'Webhook not found' },
        { status: 404 }
      );
    }

    switch (action) {
      case 'disable':
        const { error: disableError } = await (supabase
          .from('webhooks') as any)
          .update({
            is_active: false,
            updated_at: new Date().toISOString(),
          } as any)
          .eq('id', webhookId);

        if (disableError) {
          console.error('Error disabling webhook:', disableError);
          return NextResponse.json(
            { error: 'Failed to disable webhook' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Webhook disabled successfully',
          webhookId,
          action: 'disabled',
        });

      case 'enable':
        const { error: enableError } = await (supabase
          .from('webhooks') as any)
          .update({
            is_active: true,
            updated_at: new Date().toISOString(),
          } as any)
          .eq('id', webhookId);

        if (enableError) {
          console.error('Error enabling webhook:', enableError);
          return NextResponse.json(
            { error: 'Failed to enable webhook' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Webhook enabled successfully',
          webhookId,
          action: 'enabled',
        });

      case 'update':
        const { name, url, secret, eventTypes, retryAttempts, timeoutSeconds } = body;

        // Prepare update data
        const updateData: any = {
          updated_at: new Date().toISOString(),
        };

        if (name !== undefined) updateData.name = name;
        if (url !== undefined) updateData.url = url;
        if (secret !== undefined) {
          // Hash new secret if provided
          const { createHash } = await import('crypto');
          const secretHash = createHash('sha256').update(secret).digest('hex');
          updateData.secret_hash = secretHash;
        }
        if (eventTypes !== undefined) updateData.event_types = eventTypes;
        if (retryAttempts !== undefined) updateData.retry_attempts = retryAttempts;
        if (timeoutSeconds !== undefined) updateData.timeout_seconds = timeoutSeconds;

        const { error: updateError } = await (supabase
          .from('webhooks') as any)
          .update(updateData as any)
          .eq('id', webhookId);

        if (updateError) {
          console.error('Error updating webhook:', updateError);
          return NextResponse.json(
            { error: 'Failed to update webhook' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Webhook updated successfully',
          webhookId,
          action: 'updated',
          updatedFields: Object.keys(updateData).filter(key => key !== 'updated_at'),
        });

      case 'test':
        // Send a test webhook payload
        const testPayload = {
          event: 'webhook.test',
          timestamp: new Date().toISOString(),
          tenant_id: tenantId,
          webhook_id: webhookId,
          data: {
            message: 'This is a test webhook from Forhem Admin Panel',
            triggered_by: user.email,
          },
        };

        try {
          const response = await fetch((webhook as any).url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'Forhem-Webhook/1.0',
              'X-Forhem-Event': 'webhook.test',
              'X-Forhem-Signature': await generateTestSignature(testPayload),
            },
            body: JSON.stringify(testPayload),
            signal: AbortSignal.timeout(10000), // 10 second timeout
          });

          const responseBody = await response.text();

          // Update webhook last triggered timestamp
          await (supabase
            .from('webhooks') as any)
            .update({
              last_triggered_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            } as any)
            .eq('id', webhookId);

          return NextResponse.json({
            success: true,
            message: 'Test webhook sent successfully',
            webhookId,
            action: 'tested',
            result: {
              status: response.status,
              statusText: response.statusText,
              responseHeaders: Object.fromEntries(response.headers.entries()),
              responseBody: responseBody.substring(0, 1000), // Limit response size
            },
          });
        } catch (testError) {
          console.error('Error sending test webhook:', testError);
          return NextResponse.json(
            {
              error: 'Failed to send test webhook',
              details: testError instanceof Error ? testError.message : 'Unknown error',
            },
            { status: 500 }
          );
        }

      default:
        return NextResponse.json(
          { error: 'Unsupported action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in webhook action API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to generate test signature
async function generateTestSignature(payload: any): Promise<string> {
  const { createHmac } = await import('crypto');
  const secret = 'test-signature-key';
  const signature = createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  return `sha256=${signature}`;
}