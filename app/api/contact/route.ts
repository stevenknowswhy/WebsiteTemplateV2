import { NextResponse } from "next/server";
import { withApiHandler } from "@/lib/withApiHandler";
import { parseJson } from "@/lib/validate";
import { ContactSchema } from "@/lib/schemas";
// Temporarily disabled rate limiting for testing
// import { contactLimiter, getClientIP } from "@/lib/ratelimit";

export const POST = withApiHandler(async (req) => {
  // Temporarily disabled rate limiting for testing
  // const ip = getClientIP(req);
  // const { success, reset, remaining } = await contactLimiter.limit(`contact:${ip}`);

  // if (!success) {
  //   const response = NextResponse.json(
  //     { ok: false, code: "RATE_LIMIT", error: "Too many contact form submissions" },
  //     { status: 429 }
  //   );
  //   response.headers.set("Retry-After", Math.ceil((reset - Date.now()) / 1000).toString());
  //   response.headers.set("X-RateLimit-Limit", "5");
  //   response.headers.set("X-RateLimit-Remaining", remaining.toString());
  //   response.headers.set("X-RateLimit-Reset", reset.toString());
  //   return response;
  // }

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