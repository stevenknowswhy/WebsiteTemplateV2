/**
 * API Route for Individual API Token Actions
 * POST: Execute token actions (revoke, reactivate, update)
 */

import { createClient } from '@/lib/supabase/server';
import { getCurrentAdminUser } from '@/lib/auth/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ tokenId: string }> }
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

    if (!action || !['revoke', 'reactivate', 'update'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;
    const { tokenId } = await params;

    // Verify token belongs to tenant
    const { data: token, error: tokenError } = await supabase
      .from('api_tokens' as any)
      .select('id, name, is_active, tenant_id')
      .eq('id', tokenId)
      .eq('tenant_id', tenantId)
      .returns<any>()
      .single();

    if (tokenError || !token) {
      return NextResponse.json(
        { error: 'API token not found' },
        { status: 404 }
      );
    }

    let result;

    switch (action) {
      case 'revoke':
        const { error: revokeError } = await (supabase
          .from('api_tokens') as any)
          .update({
            is_active: false,
            updated_at: new Date().toISOString(),
          } as any)
          .eq('id', tokenId);

        if (revokeError) {
          console.error('Error revoking API token:', revokeError);
          return NextResponse.json(
            { error: 'Failed to revoke API token' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'API token revoked successfully',
          tokenId,
          action: 'revoked',
        });

      case 'reactivate':
        const { error: reactivateError } = await (supabase
          .from('api_tokens') as any)
          .update({
            is_active: true,
            updated_at: new Date().toISOString(),
          } as any)
          .eq('id', tokenId);

        if (reactivateError) {
          console.error('Error reactivating API token:', reactivateError);
          return NextResponse.json(
            { error: 'Failed to reactivate API token' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'API token reactivated successfully',
          tokenId,
          action: 'reactivated',
        });

      case 'update':
        const { name, description, permissions, allowedIps, rateLimit } = body;

        // Prepare update data
        const updateData: any = {
          updated_at: new Date().toISOString(),
        };

        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (permissions !== undefined) updateData.permissions = permissions;
        if (allowedIps !== undefined) updateData.allowed_ips = allowedIps;
        if (rateLimit !== undefined) updateData.rate_limit = rateLimit;

        const { error: updateError } = await (supabase
          .from('api_tokens') as any)
          .update(updateData as any)
          .eq('id', tokenId);

        if (updateError) {
          console.error('Error updating API token:', updateError);
          return NextResponse.json(
            { error: 'Failed to update API token' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'API token updated successfully',
          tokenId,
          action: 'updated',
          updatedFields: Object.keys(updateData).filter(key => key !== 'updated_at'),
        });

      default:
        return NextResponse.json(
          { error: 'Unsupported action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in API token action API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}