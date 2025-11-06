import { z } from "zod";

// CRITICAL: Enhanced environment validation for production security
const schema = z.object({
  // Environment configuration
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().optional().default("http://localhost:3000"),

  // Supabase Configuration (Required for production)
  SUPABASE_URL: z.string().url("Invalid Supabase URL").optional(),
  SUPABASE_ANON_KEY: z.string().min(10, "Supabase anon key required").optional(),
  SUPABASE_SECRET_KEY: z.string().min(10, "Supabase secret key required").optional(),

  // Database Configuration (Required for production)
  DATABASE_URL: z.string().url("Invalid database URL").optional(),

  // Stripe Configuration (Required for production)
  STRIPE_PUBLISHABLE_KEY: z.string().startsWith("pk_", "Invalid Stripe publishable key").optional(),
  STRIPE_SECRET_KEY: z.string().startsWith("sk_", "Invalid Stripe secret key").optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(5, "Stripe webhook secret required").optional(),

  // Stripe Product Configuration
  STRIPE_PRODUCT_PRO: z.string().startsWith("prod_", "Invalid Stripe product ID").optional(),
  STRIPE_PRODUCT_ENTERPRISE: z.string().startsWith("prod_", "Invalid Stripe product ID").optional(),

  // Rate Limiting (Recommended for production)
  UPSTASH_REDIS_REST_URL: z.string().url("Invalid Redis URL").optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(10, "Redis token required").optional(),

  // S3 Storage (Optional)
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_S3_BUCKET: z.string().optional(),
  AWS_REGION: z.string().default("us-east-1"),

  // Log Drain (Optional)
  LOG_DRAIN_URL: z.string().url().optional(),
  LOG_DRAIN_SAMPLE_RATE: z.string().transform(Number).optional(),
  LOG_DRAIN_HEADERS: z.string().optional(),

  // OpenTelemetry (Optional)
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url().optional(),
  OTEL_SERVICE_NAME: z.string().default("forhem"),

  // Development flags
  NEXT_PUBLIC_DEBUG: z.string().transform(val => val === "true").default("false"),
  NEXT_PUBLIC_DISABLE_SOURCEMAP_WARN: z.string().transform(val => val === "true").default("false")
});

// ENV is exported at the end of the file

function validateEnvironment() {
  try {
    const env = schema.parse(process.env);

    // PRODUCTION VALIDATION - Fail fast for missing required configs
    if (env.NODE_ENV === "production") {
      const required = [
        "SUPABASE_URL",
        "SUPABASE_ANON_KEY",
        "SUPABASE_SECRET_KEY",
        "DATABASE_URL",
        "STRIPE_PUBLISHABLE_KEY",
        "STRIPE_SECRET_KEY",
        "STRIPE_WEBHOOK_SECRET"
      ];

      const missing = required.filter(key => !env[key as keyof typeof env]);
      if (missing.length > 0) {
        throw new Error(`❌ PRODUCTION: Missing required environment variables: ${missing.join(", ")}`);
      }

      // Warn about recommended configs in production
      const recommended = ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"];
      const missingRecommended = recommended.filter(key => !env[key as keyof typeof env]);
      if (missingRecommended.length > 0) {
        console.warn(`⚠️ PRODUCTION: Recommended variables missing: ${missingRecommended.join(", ")}`);
      }
    }

    // DEVELOPMENT VALIDATION - Warn but don't fail
    if (env.NODE_ENV === "development") {
      const devRequired = ["SUPABASE_URL", "SUPABASE_ANON_KEY"];
      const missing = devRequired.filter(key => !env[key as keyof typeof env]);
      if (missing.length > 0) {
        console.warn(`⚠️ DEVELOPMENT: Consider setting: ${missing.join(", ")}`);
      }
    }

    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Environment validation failed:");
      error.errors.forEach(err => {
        console.error(`  ${err.path.join(".")}: ${err.message}`);
      });
      console.error("\n📝 Check your .env.local file and ensure all variables are properly set.");
    } else {
      console.error("❌ Environment validation error:", error instanceof Error ? error.message : error);
    }
    process.exit(1);
  }
}

export const ENV = validateEnvironment();

// For client-side usage (public variables only)
export const CLIENT_ENV = {
  NEXT_PUBLIC_APP_URL: ENV.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_DEBUG: ENV.NEXT_PUBLIC_DEBUG,
  NEXT_PUBLIC_DISABLE_SOURCEMAP_WARN: ENV.NEXT_PUBLIC_DISABLE_SOURCEMAP_WARN
} as const;

// Type exports for better TypeScript support
export type Environment = z.infer<typeof schema>;
export type ClientEnvironment = typeof CLIENT_ENV;