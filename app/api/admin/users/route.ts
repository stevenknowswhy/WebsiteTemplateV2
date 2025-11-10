/**
 * API Route for Tenant Users Management
 * GET: List tenant users with pagination and filtering
 * POST: Invite new user to tenant
 */

import { createClient } from '@/lib/supabase/server';
import { getCurrentAdminUser } from '@/lib/auth/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentAdminUser();

    if (!user || !user.tenantContext) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const role = searchParams.get('role') || 'all';
    const status = searchParams.get('status') || 'all';
    const search = searchParams.get('search') || '';

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Build query with filters
    let query = supabase
      .from('tenant_users' as any)
      .select(`
        *,
        users!inner(
          id,
          email,
          raw_user_meta_data,
          created_at,
          last_sign_in_at
        )
      `, { count: 'exact' })
      .eq('tenant_id', tenantId);

    // Apply filters
    if (role !== 'all') {
      query = query.eq('role', role);
    }

    if (status !== 'all') {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(`users.email.ilike.%${search}%`);
    }

    const { data: tenantUsers, error, count } = await query
      .range(from, to)
      .order('created_at', { ascending: false })
      .returns<any>();

    if (error) {
      console.error('Error fetching tenant users:', error);
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: 500 }
      );
    }

    // Transform data for frontend
    const transformedUsers = tenantUsers?.map((tenantUser: any) => {
      const userData = tenantUser.users || {};
      const metaData = userData.raw_user_meta_data || {};

      return {
        id: tenantUser.id,
        userId: tenantUser.user_id,
        email: userData.email,
        firstName: metaData.first_name || '',
        lastName: metaData.last_name || '',
        fullName: metaData.first_name && metaData.last_name
          ? `${metaData.first_name} ${metaData.last_name}`
          : userData.email?.split('@')[0] || 'Unknown',
        avatar: metaData.avatar_url || null,
        role: tenantUser.role,
        status: tenantUser.status,
        invitedBy: tenantUser.invited_by,
        invitedAt: tenantUser.invited_at,
        joinedAt: tenantUser.joined_at,
        lastLoginAt: userData.last_sign_in_at,
        createdAt: userData.created_at,
        updatedAt: tenantUser.updated_at,
      };
    }) || [];

    return NextResponse.json({
      users: transformedUsers,
      total: count || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error in users API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentAdminUser();

    if (!user || !user.tenantContext) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { email, role, firstName, lastName } = body;

    // Validate required fields
    if (!email || !role) {
      return NextResponse.json(
        { error: 'Email and role are required' },
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

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Check if user already exists in tenant
    const { data: existingTenantUser, error: existingError } = await supabase
      .from('tenant_users' as any)
      .select('id')
      .eq('email', email)
      .eq('tenant_id', tenantId)
      .returns<any>()
      .single();

    if (existingError && existingError.code !== 'PGRST116') {
      console.error('Error checking existing user:', existingError);
      return NextResponse.json(
        { error: 'Failed to validate user invitation' },
        { status: 500 }
      );
    }

    if (existingTenantUser) {
      return NextResponse.json(
        { error: 'User already exists in this tenant' },
        { status: 409 }
      );
    }

    // Create tenant user invitation
    const { data: newTenantUser, error: createError } = await supabase
      .from('tenant_users' as any)
      .insert({
        tenant_id: tenantId,
        email,
        role,
        status: 'pending',
        invited_by: user.id,
        invited_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as any)
      .select('id')
      .returns<any>()
      .single();

    if (createError) {
      console.error('Error creating tenant user:', createError);
      return NextResponse.json(
        { error: 'Failed to create user invitation' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User invited successfully',
      data: { id: (newTenantUser as any).id, email, role },
    }, { status: 201 });
  } catch (error) {
    console.error('Error in user invitation API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}