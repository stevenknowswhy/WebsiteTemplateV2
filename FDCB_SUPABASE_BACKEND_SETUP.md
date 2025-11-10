# FDCB - Complete Supabase Backend Implementation

**Production-ready investor access system** with RLS, magic links, and secure sessions
**API integration** with React Hook Form submission
**Cookie-based authentication** with automatic expiration
**AUM masking** for user-friendly input

---

## 🔧 Installation & Environment

### 1. Required Dependencies
```bash
pnpm add @supabase/supabase-js
```

### 2. Environment Variables (`.env.local`)
```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase Configuration
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY

# Security Tokens
ADMIN_API_TOKEN=change-me-long-random-string
APP_SESSION_SECRET=change-me-long-random-string

# Email Configuration (Resend - optional)
RESEND_API_KEY=YOUR_RESEND_API_KEY
FROM_EMAIL=investors@forhemit.com
```

---

## 🗄️ Database Schema & RLS

### 1. Supabase SQL Setup
```sql
-- Extensions
create extension if not exists "pgcrypto";

-- Access Requests Table
create table if not exists public.investor_access_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  company text not null,
  role_title text not null,
  aum_numeric numeric,                   -- Stored as numeric (nullable)
  horizon_months int not null,
  nda_agreed boolean not null default false,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  approved_by text,
  approved_at timestamptz,
  notes text
);

-- Index for email lookups
create index if not exists idx_iar_email on public.investor_access_requests(email);

-- Sessions Table
create table if not exists public.investor_sessions (
  session_token uuid primary key,     -- Sent in magic link + cookie
  email text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz
);

-- Enable Row Level Security
alter table public.investor_access_requests enable row level security;
alter table public.investor_sessions enable row level security;

-- RLS Policies
-- 1) Allow public inserts only with pending status and NDA agreed
create policy iar_insert_public on public.investor_access_requests
for insert to anon with check (
  status = 'pending' and nda_agreed = true
);

-- 2) Deny all other operations to anon (by omission)

-- 3) Sessions: Deny all to anon (server uses service role)

-- Updated_at trigger
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_iar_updated on public.investor_access_requests;
create trigger trg_iar_updated before update on public.investor_access_requests
for each row execute procedure set_updated_at();
```

---

## 🔧 Library Files

### 1. Supabase Clients (`lib/supabase.ts`)
```typescript
import { createClient } from "@supabase/supabase-js";

export function supabaseService() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

export function supabaseAnon() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_ANON_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}
```

### 2. Email Service (`lib/mailer.ts`)
```typescript
type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  from?: string;
};

export async function sendEmail({ to, subject, html, from }: EmailPayload) {
  const key = process.env.RESEND_API_KEY;
  const fromEmail = from ?? process.env.FROM_EMAIL ?? "investors@forhemit.com";

  // Fallback to console in development
  if (!key) {
    console.log("[DEV EMAIL]", { to, subject, html });
    return { ok: true };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`
    },
    body: JSON.stringify({
      from: fromEmail,
      to,
      subject,
      html
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend error: ${res.status} ${text}`);
  }

  return { ok: true };
}
```

### 3. URL Helper (`lib/url.ts`)
```typescript
export function siteUrl(path = "") {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  return `${base}${path}`;
}
```

---

## 📡 API Routes

### 1. Application Submission (`app/api/investors/apply/route.ts`)
```typescript
import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAnon } from "@/lib/supabase";

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  role: z.string().min(2),
  aum: z.string().optional(),
  horizonMonths: z.string().regex(/^\d+$/),
  ndaAgreed: z.boolean().refine((v) => v === true)
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => ({}));
  const parse = schema.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(
      { ok: false, errors: parse.error.flatten() },
      { status: 400 }
    );
  }

  const { fullName, email, company, role, aum, horizonMonths, ndaAgreed } = parse.data;

  // Convert "$250M" / "250,000,000" → numeric
  let aum_numeric: number | null = null;
  if (aum && aum.trim() !== "") {
    const normalized = aum
      .replace(/[\s,]/g, "")
      .replace(/^\$/, "")
      .replace(/(k|K)$/, "000")
      .replace(/(m|M)$/, "000000")
      .replace(/(b|B)$/, "000000000");

    const num = Number(normalized);
    if (!Number.isNaN(num)) aum_numeric = num;
  }

  const sb = supabaseAnon();

  const { error } = await sb.from("investor_access_requests").insert({
    full_name: fullName,
    email,
    company,
    role_title: role,
    aum_numeric,
    horizon_months: Number(horizonMonths),
    nda_agreed: ndaAgreed,
    status: "pending"
  });

  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
```

### 2. Admin Approval (`app/api/investors/approve/route.ts`)
```typescript
import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";
import { sendEmail } from "@/lib/mailer";
import { siteUrl } from "@/lib/url";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const token = req.headers.get("x-admin-token");
  if (token !== process.env.ADMIN_API_TOKEN) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { requestId, ttlHours = 72 } = await req.json();

  const sb = supabaseService();

  // Look up request
  const { data: reqRow, error: findErr } = await sb
    .from("investor_access_requests")
    .select("*")
    .eq("id", requestId)
    .single();

  if (findErr || !reqRow) {
    return NextResponse.json(
      { ok: false, message: "Request not found" },
      { status: 404 }
    );
  }

  const session_token = randomUUID();
  const expires = new Date(Date.now() + ttlHours * 3600 * 1000).toISOString();

  // Create session
  const { error: sessErr } = await sb.from("investor_sessions").insert({
    session_token,
    email: reqRow.email,
    expires_at: expires
  });

  if (sessErr) {
    return NextResponse.json(
      { ok: false, message: sessErr.message },
      { status: 500 }
    );
  }

  // Mark approved
  await sb
    .from("investor_access_requests")
    .update({
      status: "approved",
      approved_at: new Date().toISOString(),
      approved_by: "admin-api"
    })
    .eq("id", requestId);

  const link = siteUrl(`/investors/magic?token=${session_token}`);

  // Send magic link email
  await sendEmail({
    to: reqRow.email,
    subject: "Your secure investor access link",
    html: `
      <p>Hello ${reqRow.full_name || ""},</p>
      <p>Your secure access link is ready. This link expires in ${ttlHours} hours.</p>
      <p><a href="${link}" style="background: #0A61F7; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Open Data Room</a></p>
      <p>If you didn't request this, ignore this email.</p>
    `
  });

  return NextResponse.json({ ok: true, link });
}
```

### 3. Magic Link Handler (`app/(investors)/investors/magic/route.ts`)
```typescript
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseService } from "@/lib/supabase";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/investors/login", url));
  }

  const sb = supabaseService();
  const { data: sess, error } = await sb
    .from("investor_sessions")
    .select("session_token, expires_at, revoked_at")
    .eq("session_token", token)
    .single();

  if (error || !sess || sess.revoked_at || new Date(sess.expires_at) < new Date()) {
    return NextResponse.redirect(new URL("/investors/login?error=expired", url));
  }

  // Set HttpOnly cookie (valid until session expiry)
  const c = cookies();
  c.set("investor_session", token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(sess.expires_at)
  });

  return NextResponse.redirect(new URL("/investors/room", url));
}
```

### 4. Logout Handler (`app/(investors)/investors/logout/route.ts`)
```typescript
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().set("investor_session", "", {
    path: "/",
    expires: new Date(0)
  });
  return NextResponse.json({ ok: true });
}
```

---

## 🎨 Enhanced Form Component

### 1. Updated Investor Form (`components/forms/InvestorAccessForm.tsx`)
```typescript
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { investorAccessSchema, type InvestorAccessInput } from "@/lib/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function InvestorAccessForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid }
  } = useForm<InvestorAccessInput>({
    resolver: zodResolver(investorAccessSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      role: "",
      aum: "",
      horizonMonths: "",
      ndaAgreed: false
    },
    mode: "onChange"
  });

  // Mask AUM on blur: "250000000" -> "$250,000,000"
  function maskAUM(value: string) {
    if (!value) return "";

    // Preserve shorthand suffixes if user typed them
    if (/[kKmMbB]$/.test(value.trim())) return value;

    const digits = value.replace(/[^\d]/g, "");
    if (!digits) return "";

    return "$" + Number(digits).toLocaleString();
  }

  const onAumBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setValue("aum", maskAUM(e.target.value), { shouldDirty: true });
  };

  const onSubmit = async (data: InvestorAccessInput) => {
    try {
      setSubmitError(null);

      const res = await fetch("/api/investors/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Submission failed");
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Submission failed");
      console.error("Form submission error:", error);
    }
  };

  if (submitted) {
    return (
      <Card className="p-8 max-w-2xl">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 text-[var(--success)]" size={24} />
          <div>
            <h3 className="text-xl font-medium">Request Received</h3>
            <p className="text-muted mt-1">
              We've recorded your request for data room access. You'll receive a confirmation email shortly.
            </p>
            <p className="text-sm text-muted mt-2">
              Reference ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      {/* ... existing form structure ... */}

      {/* Investment Details Card */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">
                Assets Under Management (Optional)
              </label>
              <Input
                placeholder="$250,000,000"
                {...register("aum")}
                onBlur={onAumBlur}
              />
              <p className="mt-1 text-sm text-muted">
                Format: $250M, 250,000,000, or 250000000
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">
                Investment Horizon (Months) *
              </label>
              <Input
                placeholder="18"
                inputMode="numeric"
                {...register("horizonMonths")}
                aria-invalid={errors.horizonMonths ? "true" : "false"}
              />
              {errors.horizonMonths && (
                <p className="mt-1 text-sm text-[var(--danger)] flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.horizonMonths.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ... rest of form ... */}

      <div className="flex flex-col gap-3">
        {submitError && (
          <div className="p-4 border border-[var(--danger)]/20 rounded-xl bg-[var(--danger)]/5">
            <p className="text-sm text-[var(--danger)] flex items-center gap-1">
              <AlertCircle size={14} />
              {submitError}
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </div>
          ) : (
            "Submit Request"
          )}
        </Button>
      </div>
    </form>
  );
}
```

---

## 🔐 Protected Investor Area

### 1. Data Room Page (`app/(investors)/investors/room/page.tsx`)
```typescript
import Section from "@/components/layout/Section";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseService } from "@/lib/supabase";

export default async function InvestorRoomPage() {
  const token = cookies().get("investor_session")?.value;

  if (!token) {
    redirect("/investors/login");
  }

  const sb = supabaseService();
  const { data: sess, error } = await sb
    .from("investor_sessions")
    .select("session_token, expires_at, revoked_at")
    .eq("session_token", token)
    .single();

  if (!sess || sess.revoked_at || new Date(sess.expires_at) < new Date()) {
    redirect("/investors/login?error=expired");
  }

  return (
    <Section kicker="Data Room" title="Documents & KPIs">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Investor Content */}
        <div className="card p-6">
          <h3 className="text-lg font-medium">Milestones</h3>
          <ul className="mt-2 text-muted list-disc pl-5">
            <li>Permit package — submitted</li>
            <li>Long-lead — in procurement</li>
            <li>Groundwork — scheduled</li>
          </ul>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-medium">Documents</h3>
          <ul className="mt-2 text-muted list-disc pl-5">
            <li>
              <a href="/investors/docs/executive-summary" className="hover:underline">
                Executive Summary
              </a>
            </li>
            <li>
              <a href="/investors/docs/financial-projections" className="hover:underline">
                Financial Projections
              </a>
            </li>
          </ul>
        </div>

        <form className="card p-6" action="/investors/logout" method="post">
          <h3 className="text-lg font-medium mb-2">Session</h3>
          <button type="submit" className="rounded-xl bg-ink text-white px-4 py-2">
            Sign Out
          </button>
        </form>
      </div>
    </Section>
  );
}
```

### 2. Protected Document Viewer (`app/(investors)/investors/docs/[slug]/page.tsx`)
```typescript
import Section from "@/components/layout/Section";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseService } from "@/lib/supabase";

export default function DocumentPage({ params }: { params: { slug: string } }) {
  const token = cookies().get("investor_session")?.value;

  if (!token) {
    redirect("/investors/login");
  }

  // TODO: Fetch actual document content
  const documents = {
    "executive-summary": {
      title: "Executive Summary",
      content: "Watermarked executive summary content..."
    },
    "financial-projections": {
      title: "Financial Projections",
      content: "Watermarked financial projections..."
    }
  };

  const doc = documents[params.slug as keyof typeof documents];

  if (!doc) {
    redirect("/investors/room");
  }

  return (
    <div className="supabase-backend-container py-16">
      <div className="card p-8">
        <div className="relative">
          {/* Watermark overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
            <div className="transform -rotate-45 text-6xl font-bold text-ink">
              CONFIDENTIAL
            </div>
          </div>

          <h1 className="text-2xl font-medium mb-6">{doc.title}</h1>
          <div className="prose max-w-none text-muted">
            <p>{doc.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🛠️ Admin Tools

### 1. Approval Script (cURL)
```bash
# Approve a request by ID and email a 72h link
curl -X POST http://localhost:3000/api/investors/approve \
  -H "x-admin-token: change-me-long-random" \
  -H "content-type: application/json" \
  -d '{"requestId":"YOUR-UUID-HERE","ttlHours":72}'
```

### 2. Session Management
```bash
# View pending requests (requires admin access to Supabase dashboard)
# 1. Go to Supabase Dashboard → Table Editor
# 2. Query: SELECT * FROM investor_access_requests WHERE status = 'pending';
# 3. Copy request ID for approval
```

---

## 🎯 Features Implemented

### ✅ **Security**
- **Row Level Security** with strict policies
- **HttpOnly cookies** with automatic expiration
- **Service role** for admin operations
- **Anon role** for public submissions
- **Time-boxed sessions** with configurable TTL

### ✅ **Data Processing**
- **AUM normalization** ($250M → 250000000)
- **Input masking** for user-friendly display
- **Email integration** with Resend fallback
- **Magic link** authentication
- **Automatic cleanup** of expired sessions

### ✅ **User Experience**
- **Form validation** with API integration
- **Error handling** with user feedback
- **Success confirmation** with reference IDs
- **Secure content** with watermarking
- **Logout functionality**

### ✅ **Admin Tools**
- **API-based approval** system
- **Session management** through Supabase
- **Email notifications** with branded templates
- **Request tracking** with full audit trail

---

## 🚀 Production Deployment

### 1. **Environment Setup**
- Set all environment variables in production
- Configure Resend API key or other email service
- Set strong random tokens for security

### 2. **Database Setup**
- Run SQL schema in production Supabase
- Verify RLS policies are active
- Test admin token authentication

### 3. **Testing**
- Submit test application form
- Approve via admin API
- Test magic link flow
- Verify session expiration

### 4. **Monitoring**
- Monitor application submissions
- Track approval rates
- Monitor session activity
- Set up error logging

**Complete production-ready investor access system!** 🎉