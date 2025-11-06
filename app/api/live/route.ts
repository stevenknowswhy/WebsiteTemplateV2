import { NextRequest, NextResponse } from 'next/server';
import { getVersionInfo } from "@/lib/version";

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const v = getVersionInfo();

  try {
    // Basic liveness check - minimal dependencies
    const livenessStatus = {
      status: 'alive',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      responseTime: Date.now() - startTime,
      versionInfo: v,
      checks: {
        process: {
          status: 'healthy',
          pid: process.pid,
          memoryUsage: process.memoryUsage(),
          cpuUsage: process.cpuUsage()
        },
        environment: {
          status: 'healthy',
          nodeVersion: process.version,
          platform: process.platform,
          arch: process.arch
        }
      }
    };

    return NextResponse.json(livenessStatus, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Liveness check failed:', error);

    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      versionInfo: v,
      error: error instanceof Error ? error.message : 'Unknown error',
      checks: {
        process: { status: 'unhealthy', error: 'Process check failed' }
      }
    }, {
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json'
      }
    });
  }
}