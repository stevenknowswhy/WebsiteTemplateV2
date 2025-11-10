/**
 * API Route for Tenant Settings Management
 * GET: Get tenant settings and metadata
 * PUT: Update tenant settings and metadata
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

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Get tenant settings
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants' as any)
      .select('*')
      .eq('id', tenantId)
      .returns<any>()
      .single();

    if (tenantError) {
      console.error('Error fetching tenant settings:', tenantError);
      return NextResponse.json(
        { error: 'Failed to fetch tenant settings' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      tenant: {
        id: (tenant as any).id,
        name: (tenant as any).name,
        domain: (tenant as any).domain,
        settings: (tenant as any).settings || {},
        metadata: (tenant as any).metadata || {},
        created_at: (tenant as any).created_at,
        updated_at: (tenant as any).updated_at,
      },
    });
  } catch (error) {
    console.error('Error in tenant settings API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentAdminUser();

    if (!user || !user.tenantContext) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, domain, settings, metadata } = body;

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Prepare update data
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (name !== undefined) updateData.name = name;
    if (domain !== undefined) updateData.domain = domain;
    if (settings !== undefined) updateData.settings = settings;
    if (metadata !== undefined) updateData.metadata = metadata;

    // Update tenant settings
    const { data: updatedTenant, error: updateError } = await supabase.rpc('admin_update_tenant_settings', {
      p_tenant_id: tenantId,
      p_name: updateData.name,
      p_domain: updateData.domain,
      p_settings: updateData.settings,
      p_metadata: updateData.metadata,
    } as any);

    if (updateError) {
      console.error('Error updating tenant settings:', updateError);
      return NextResponse.json(
        { error: 'Failed to update tenant settings' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Tenant settings updated successfully',
      tenant: {
        id: (updatedTenant as any).id,
        name: (updatedTenant as any).name,
        domain: (updatedTenant as any).domain,
        settings: (updatedTenant as any).settings || {},
        metadata: (updatedTenant as any).metadata || {},
        updated_at: (updatedTenant as any).updated_at,
      },
    });
  } catch (error) {
    console.error('Error in tenant settings API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}