/**
 * API Route for Individual User Actions
 * POST: Execute user actions (update_role, deactivate, reactivate)
 */

import { createClient } from '@/lib/supabase/server';
import { getCurrentAdminUser } from '@/lib/auth/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
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

    if (!action || !['update_role', 'deactivate', 'reactivate'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;
    const { userId } = await params;

    // Verify user belongs to tenant
    const { data: tenantUser, error: userError } = await supabase
      .from('tenant_users' as any)
      .select('id, role, status, user_id')
      .eq('user_id', userId)
      .eq('tenant_id', tenantId)
      .returns<any>()
      .single();

    if (userError || !tenantUser) {
      return NextResponse.json(
        { error: 'User not found in tenant' },
        { status: 404 }
      );
    }

    switch (action) {
      case 'update_role':
        const { role } = body;
        if (!role) {
          return NextResponse.json(
            { error: 'Role is required for update_role action' },
            { status: 400 }
          );
        }

        // Validate role
        const validRoles = ['superadmin', 'city_admin', 'operator', 'analyst', 'partner_viewer'];
        if (!validRoles.includes(role)) {
          return NextResponse.json(
            { error: 'Invalid role' },
            { status: 400 }
          );
        }

        const { error: roleError } = await (supabase
          .from('tenant_users') as any)
          .update({
            role,
            updated_at: new Date().toISOString(),
          } as any)
          .eq('user_id', userId)
          .eq('tenant_id', tenantId);

        if (roleError) {
          console.error('Error updating user role:', roleError);
          return NextResponse.json(
            { error: 'Failed to update user role' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'User role updated successfully',
          userId,
          newRole: role,
        });

      case 'deactivate':
        // Prevent deactivating self
        if (userId === user.id) {
          return NextResponse.json(
            { error: 'Cannot deactivate your own account' },
            { status: 400 }
          );
        }

        const { error: deactivateError } = await (supabase
          .from('tenant_users') as any)
          .update({
            status: 'inactive',
            updated_at: new Date().toISOString(),
          } as any)
          .eq('user_id', userId)
          .eq('tenant_id', tenantId);

        if (deactivateError) {
          console.error('Error deactivating user:', deactivateError);
          return NextResponse.json(
            { error: 'Failed to deactivate user' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'User deactivated successfully',
          userId,
        });

      case 'reactivate':
        // Update user status back to active
        const { error: reactivateError } = await (supabase
          .from('tenant_users') as any)
          .update({
            status: 'active',
            updated_at: new Date().toISOString(),
          } as any)
          .eq('user_id', userId)
          .eq('tenant_id', tenantId);

        if (reactivateError) {
          console.error('Error reactivating user:', reactivateError);
          return NextResponse.json(
            { error: 'Failed to reactivate user' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'User reactivated successfully',
          userId,
        });

      default:
        return NextResponse.json(
          { error: 'Unsupported action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in user action API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}