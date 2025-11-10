import { createClient } from '@/lib/supabase/server';
import { enrichJWTWithTenantClaims } from '@/lib/auth/admin-auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Enrich JWT with tenant context
      await enrichJWTWithTenantClaims(data.user.id);

      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';

      // Check if user should be redirected to admin panel
      const userMetadata = data.user.user_metadata || {};
      const redirectUrl = userMetadata.role ? '/admin' : next;

      if (isLocalEnv) {
        // In local development, redirect directly
        return NextResponse.redirect(`${origin}${redirectUrl}`);
      } else if (forwardedHost) {
        // In production with a forwarded host (like Vercel)
        return NextResponse.redirect(`https://${forwardedHost}${redirectUrl}`);
      } else {
        // Fallback to origin
        return NextResponse.redirect(`${origin}${redirectUrl}`);
      }
    }
  }

  // If there's an error, redirect to the error page
  return NextResponse.redirect(`${origin}/auth/error`);
}
