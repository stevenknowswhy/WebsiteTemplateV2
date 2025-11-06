import { NextRequest, NextResponse } from 'next/server';
import { getVersionInfo } from "@/lib/version";
import { Redis } from "@upstash/redis";
import { supabaseAdmin } from "@/lib/db";

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const v = getVersionInfo();
  const checks: Record<string, any> = {};

  // Redis ping (ignore if not configured)
  try {
    if (process.env.UPSTASH_REDIS_REST_URL) {
      const redis = Redis.fromEnv();
      const pingStart = Date.now();
      const pong = await redis.ping();
      checks.redis = {
        ok: pong === "PONG",
        responseTime: Date.now() - pingStart,
        detail: pong === "PONG" ? "Connected" : "Failed to connect"
      };
    } else {
      checks.redis = { ok: true, detail: "not-configured" };
    }
  } catch (e: any) {
    checks.redis = { ok: false, detail: String(e?.message || e), responseTime: Date.now() - startTime };
  }

  // Supabase simple query (ignore if not configured)
  try {
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const queryStart = Date.now();
      const { error } = await supabaseAdmin.rpc("now"); // or a trivial select
      checks.supabase = {
        ok: !error,
        detail: error?.message,
        responseTime: Date.now() - queryStart
      };
    } else {
      checks.supabase = { ok: true, detail: "not-configured" };
    }
  } catch (e: any) {
    checks.supabase = { ok: false, detail: String(e?.message || e), responseTime: Date.now() - startTime };
  }

  // External service checks
  checks.external = {
    sentry: {
      status: process.env.SENTRY_DSN ? 'healthy' : 'unhealthy',
      configured: !!process.env.SENTRY_DSN
    },
    stripe: {
      status: process.env.STRIPE_SECRET_KEY ? 'healthy' : 'unhealthy',
      configured: !!process.env.STRIPE_SECRET_KEY
    },
    analytics: {
      status: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? 'healthy' : 'unhealthy',
      configured: !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    }
  };

  const allChecksHealthy = Object.values(checks).every((check: any) =>
    typeof check.ok === 'boolean' ? check.ok :
    typeof check.status === 'string' ? check.status === 'healthy' : true
  );

  const readinessStatus = {
    status: allChecksHealthy ? 'ready' : 'not-ready',
    timestamp: new Date().toISOString(),
    responseTime: Date.now() - startTime,
    versionInfo: v,
    checks,
    dependencies: {
      database: checks.supabase?.ok || false,
      redis: checks.redis?.ok || false,
      monitoring: checks.external?.sentry?.status === 'healthy',
      payments: checks.external?.stripe?.status === 'healthy',
      analytics: checks.external?.analytics?.status === 'healthy'
    },
    recommendations: allChecksHealthy ? [] : generateRecommendations(checks)
  };

  return NextResponse.json(readinessStatus, {
    status: allChecksHealthy ? 200 : 503,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Content-Type': 'application/json'
    }
  });
}

function generateRecommendations(checks: Record<string, any>): string[] {
  const recommendations: string[] = [];

  if (!checks.supabase?.ok) {
    recommendations.push('Check Supabase connection and credentials');
    recommendations.push('Verify Supabase project is accessible');
  }

  if (!checks.redis?.ok && checks.redis?.detail !== 'not-configured') {
    recommendations.push('Check Redis connection and credentials');
    recommendations.push('Verify Redis server is running and accessible');
  }

  if (checks.external?.sentry?.status !== 'healthy') {
    recommendations.push('Configure Sentry DSN for error tracking');
  }

  if (checks.external?.stripe?.status !== 'healthy') {
    recommendations.push('Configure Stripe API keys in environment variables');
  }

  if (checks.external?.analytics?.status !== 'healthy') {
    recommendations.push('Configure Google Analytics ID for user analytics');
  }

  return recommendations;
}