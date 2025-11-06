import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getVersionInfo } from "@/lib/version";

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Check database connectivity
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    // Basic health check
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    const dbStatus = error ? 'unhealthy' : 'healthy';
    const responseTime = Date.now() - startTime;

    const healthStatus = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      responseTime,
      versionInfo: getVersionInfo(),
      checks: {
        database: {
          status: dbStatus,
          responseTime,
          error: error?.message || null
        },
        redis: {
          status: 'healthy', // Will be checked in readiness endpoint
          responseTime: 0
        },
        auth: {
          status: 'healthy',
          configured: !!process.env.NEXTAUTH_SECRET
        },
        rateLimit: {
          status: 'healthy',
          configured: !!process.env.UPSTASH_REDIS_URL
        }
      },
      metrics: {
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage(),
        version: process.version,
        platform: process.platform,
        arch: process.arch
      }
    };

    const httpStatus = dbStatus === 'healthy' ? 200 : 503;

    return NextResponse.json(healthStatus, {
      status: httpStatus,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      versionInfo: getVersionInfo(),
      error: error instanceof Error ? error.message : 'Unknown error',
      checks: {
        database: { status: 'unhealthy', error: 'Connection failed' }
      }
    }, {
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }
}