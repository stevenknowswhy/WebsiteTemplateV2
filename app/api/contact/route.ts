import { NextResponse } from "next/server";
import { withApiHandler } from "@/lib/withApiHandler";
import { parseJson } from "@/lib/validate";
import { ContactSchema } from "@/lib/schemas";
import { checkRateLimit } from "@/lib/rateLimitRedis";

export const POST = withApiHandler(async (req) => {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const url = new URL(req.url);
  const rl = await checkRateLimit("POST", url.pathname, ip);
  if (!rl.success) {
    return NextResponse.json({ ok: false, code: "RATE_LIMIT" }, { status: 429 });
  }

  const body = await parseJson(req, ContactSchema);
  const { name, email, phone, company, subject, message } = body;

  // Log the contact form submission (in production, you'd send an email or store in database)
  console.log("Contact form submission:", {
    name,
    email,
    phone,
    company,
    subject,
    message,
    timestamp: new Date().toISOString(),
  });

  // In a real implementation, you would:
  // 1. Send email using a service like Resend, SendGrid, or Nodemailer
  // 2. Store in a database (Supabase, PostgreSQL, etc.)
  // 3. Maybe integrate with a CRM like HubSpot or Salesforce

  // Example email sending logic (commented out - would require email service setup)
  /*
  const emailContent = `
    New contact form submission from TemplateAppV2

    Name: ${name}
    Email: ${email}
    ${phone ? `Phone: ${phone}` : ''}
    ${company ? `Company: ${company}` : ''}
    Subject: ${subject}

    Message:
    ${message}

    Submitted at: ${new Date().toISOString()}
  `;

  // Send email to site admin
  await sendEmail({
    to: site.email,
    from: 'noreply@' + site.domain,
    subject: `New Contact Form: ${subject}`,
    text: emailContent,
    replyTo: email,
  });

  // Send auto-reply to the sender
  await sendEmail({
    to: email,
    from: 'noreply@' + site.domain,
    subject: `Thank you for contacting TemplateAppV2`,
    text: `
      Hi ${name},

      Thank you for contacting us! We've received your message about "${subject}" and will get back to you within 24 hours.

      Here's a copy of your message:
      ${message}

      Best regards,
      The TemplateAppV2 Team
    `,
  });
  */

  // Return success response
  return NextResponse.json({
    ok: true,
    message: "Message sent successfully",
    submittedAt: new Date().toISOString()
  });
});