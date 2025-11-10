/**
 * API Route for API Tokens Management
 * GET: List tenant API tokens
 * POST: Create new API token
 */

import { createClient } from '@/lib/supabase/server';
import { getCurrentAdminUser } from '@/lib/auth/admin-auth';
import { NextRequest, NextResponse } from 'next/server';
import { createHash, randomBytes } from 'crypto';

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
    const status = searchParams.get('status') || 'all';

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Build query with filters
    let query = supabase
      .from('api_tokens' as any)
     .select('*', { count: 'exact' })
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .returns<any>();

    // Apply status filter
    if (status !== 'all') {
      const isActive = status === 'active';
      const { data: tokens, error, count } = await supabase
        .from('api_tokens' as any)
        .select('*', { count: 'exact' })
        .eq('tenant_id', tenantId)
        .eq('is_active', isActive)
        .order('created_at', { ascending: false })
        .range(from, to)
        .returns<any>();

      if (error) {
        console.error('Error fetching API tokens:', error);
        return NextResponse.json(
          { error: 'Failed to fetch API tokens' },
          { status: 500 }
        );
      }

      // Transform data for frontend (mask sensitive fields)
      const transformedTokens = tokens?.map((token: any) => ({
        id: token.id,
        name: token.name,
        description: token.description,
        permissions: token.permissions || {},
        allowedIps: token.allowed_ips || [],
        rateLimit: token.rate_limit,
        lastUsedAt: token.last_used_at,
        expiresAt: token.expires_at,
        isActive: token.is_active,
        createdBy: token.created_by,
        createdAt: token.created_at,
        updatedAt: token.updated_at,
        // Mask the token - show only first 8 and last 4 characters
        tokenPreview: token.token ?
          `${token.token.substring(0, 8)}...${token.token.substring(token.token.length - 4)}` :
          null,
      })) || [];

      return NextResponse.json({
        tokens: transformedTokens,
        total: count || 0,
        page,
        limit,
      });
    }

    const { data: tokens, error, count } = await query.range(from, to);

    if (error) {
      console.error('Error fetching API tokens:', error);
      return NextResponse.json(
        { error: 'Failed to fetch API tokens' },
        { status: 500 }
      );
    }

    // Transform data for frontend (mask sensitive fields)
    const transformedTokens = tokens?.map((token: any) => ({
      id: token.id,
      name: token.name,
      description: token.description,
      permissions: token.permissions || {},
      allowedIps: token.allowed_ips || [],
      rateLimit: token.rate_limit,
      lastUsedAt: token.last_used_at,
      expiresAt: token.expires_at,
      isActive: token.is_active,
      createdBy: token.created_by,
      createdAt: token.created_at,
      updatedAt: token.updated_at,
      // Mask the token - show only first 8 and last 4 characters
      tokenPreview: token.token ?
        `${token.token.substring(0, 8)}...${token.token.substring(token.token.length - 4)}` :
        null,
    })) || [];

    return NextResponse.json({
      tokens: transformedTokens,
      total: count || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error in API tokens management:', error);
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
    const { name, description, permissions, allowedIps, rateLimit, expiresAt } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Token name is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const tenantId = user.tenantContext.tenant_id;

    // Generate secure API token
    const token = `fk_${randomBytes(32).toString('hex')}`;
    const tokenHash = createHash('sha256').update(token).digest('hex');

    // Create API token
    const { data: newToken, error: createError } = await supabase
      .from('api_tokens' as any)
      .insert({
        tenant_id: tenantId,
        name,
        description: description || null,
        token_hash: tokenHash,
        permissions: permissions || {},
        allowed_ips: allowedIps || [],
        rate_limit: rateLimit || 1000,
        expires_at: expiresAt || null,
        is_active: true,
        created_by: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as any)
      .select('id, name, created_at')
      .returns<any>()
      .single();

    if (createError) {
      console.error('Error creating API token:', createError);
      return NextResponse.json(
        { error: 'Failed to create API token' },
        { status: 500 }
      );
    }

    // Return the full token only once during creation
    return NextResponse.json({
      success: true,
      message: 'API token created successfully',
      token: {
        id: (newToken as any).id,
        name: (newToken as any).name,
        token, // Full token only shown once
        createdAt: (newToken as any).created_at,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Error in API token creation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}