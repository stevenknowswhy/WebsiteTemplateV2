/**
 * API Route for Individual Alert Actions
 * POST: Execute alert actions (acknowledge, resolve)
 */

import { createClient } from '@/lib/supabase/server';
import { getCurrentAdminUser } from '@/lib/auth/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    if (!action || !['acknowledge', 'resolve'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;
    const { id: alertId } = await params;

    // Verify alert belongs to tenant
    const { data: alert, error: alertError } = await supabase
      .from('node_alerts' as any)
      .select('id, title, status, tenant_id')
      .eq('id', alertId)
      .eq('tenant_id', tenantId)
      .returns<any>()
      .single();

    if (alertError || !alert) {
      return NextResponse.json(
        { error: 'Alert not found' },
        { status: 404 }
      );
    }

    // Prepare update data based on action
    let updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (action === 'acknowledge') {
      updateData.status = 'acknowledged';
      updateData.acknowledged_by = user.email;
      updateData.acknowledged_at = new Date().toISOString();
    } else if (action === 'resolve') {
      updateData.status = 'resolved';
      updateData.resolved_by = user.email;
      updateData.resolved_at = new Date().toISOString();

      // If resolving an unacknowledged alert, also acknowledge it
      if ((alert as any).status === 'open') {
        updateData.acknowledged_by = user.email;
        updateData.acknowledged_at = new Date().toISOString();
      }
    }

    // Update alert status
    const { error: updateError } = await (supabase
      .from('node_alerts') as any)
      .update(updateData as any)
      .eq('id', alertId);

    if (updateError) {
      console.error('Error updating alert:', updateError);
      return NextResponse.json(
        { error: 'Failed to update alert' },
        { status: 500 }
      );
    }

    // Create audit log entry
    const { error: logError } = await supabase
      .from('audit_logs' as any)
      .insert({
        tenant_id: tenantId,
        user_id: user.id,
        action: `${action}_alert`,
        resource_type: 'alert',
        resource_id: alertId,
        details: {
          alert_title: (alert as any).title || 'Unknown Alert',
          previous_status: (alert as any).status,
          new_status: updateData.status,
        },
        ip_address: 'unknown', // Could extract from request
        user_agent: 'alert-api',
        created_at: new Date().toISOString(),
      } as any);

    if (logError) {
      console.error('Error creating audit log:', logError);
      // Don't fail the request if audit logging fails
    }

    return NextResponse.json({
      success: true,
      message: `Alert ${action} successful`,
      alertId,
      action,
      newStatus: updateData.status,
    });
  } catch (error) {
    console.error('Error in alert action API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}