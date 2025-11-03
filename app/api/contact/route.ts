import { site } from "@/lib/siteConfig";
import { NextRequest, NextResponse } from "next/server";
import { allow } from "@/lib/rateLimit";
import { ContactSchema } from "@/lib/schemas";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (!allow(ip, 30, 60_000)) {
    return NextResponse.json({ ok: false, code: "RATE_LIMIT" }, { status: 429 });
  }

  try {
    const body = await request.json();

    // Validate with Zod schema
    const validated = ContactSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ ok: false, code: "INVALID_INPUT" }, { status: 400 });
    }

    const { name, email, phone, company, subject, message } = validated.data;

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
      New contact form submission from ${site.name}

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
      subject: `Thank you for contacting ${site.name}`,
      text: `
        Hi ${name},

        Thank you for contacting us! We've received your message about "${subject}" and will get back to you within 24 hours.

        Here's a copy of your message:
        ${message}

        Best regards,
        The ${site.name} Team
      `,
    });
    */

    // Return success response
    return NextResponse.json(
      {
        ok: true,
        message: "Message sent successfully",
        submittedAt: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { ok: false, code: "INTERNAL_ERROR", error: "Internal server error" },
      { status: 500 }
    );
  }
}