/**
 * API Route for Refreshing Tenant Context
 * Updates JWT with current tenant and role information
 */

import { createClient } from '@/lib/supabase/server';
import { enrichJWTWithTenantClaims } from '@/lib/auth/admin-auth';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const success = await enrichJWTWithTenantClaims(user.id);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to refresh tenant context' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error refreshing tenant context:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}