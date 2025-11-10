/**
 * API Route for Individual Node Actions
 * POST: Execute node commands (restart, ping, activate, deactivate)
 */

import { createClient } from '@/lib/supabase/server';
import { getCurrentAdminUser } from '@/lib/auth/admin-auth';
import { NextRequest, NextResponse } from 'next/server';
import type { Database } from '@/types/database';

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

    if (!action || !['restart', 'ping', 'activate', 'deactivate'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;
    const { id: nodeId } = await params;

    // Verify node belongs to tenant
    const { data: node, error: nodeError } = await supabase
      .from('nodes')
      .select('id, node_id, name, status')
      .eq('id', nodeId)
      .eq('tenant_id', tenantId)
      .returns<any>()
      .single();

    if (nodeError || !node) {
      return NextResponse.json(
        { error: 'Node not found' },
        { status: 404 }
      );
    }

    // Create node command record
    const { error: commandError } = await supabase
      .from('node_commands')
      .insert({
        node_id: (node as any).id,
        command_type: action,
        status: 'pending',
        executed_by: user.id,
        tenant_id: tenantId,
        created_at: new Date().toISOString(),
      } as any);

    if (commandError) {
      console.error('Error creating node command:', commandError);
      return NextResponse.json(
        { error: 'Failed to create node command' },
        { status: 500 }
      );
    }

    // Update node status for activate/deactivate actions
    if (action === 'activate' || action === 'deactivate') {
      const newStatus = action === 'activate' ? 'active' : 'inactive';
      const { error: updateError } = await (supabase
        .from('nodes') as any)
        .update({
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', nodeId);

      if (updateError) {
        console.error('Error updating node status:', updateError);
        return NextResponse.json(
          { error: 'Failed to update node status' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: `Node ${action} command queued successfully`,
      node_id: (node as any).node_id,
      action
    });
  } catch (error) {
    console.error('Error in node action API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}