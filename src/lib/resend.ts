import { format } from "date-fns";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const from = process.env.RESEND_FROM_EMAIL ?? "noreply@oravagems.com";

function shell(title: string, body: string): string {
  return `
  <div style="background:#0A0A0A;padding:24px;font-family:Inter,Arial,sans-serif;color:#F5F5F5">
    <div style="max-width:640px;margin:0 auto;background:#111111;border:1px solid #2a2a2a;border-radius:12px;overflow:hidden">
      <div style="padding:20px 24px;border-bottom:1px solid #2a2a2a">
        <h1 style="margin:0;color:#C9A84C;font-size:22px">ORAVA Gems</h1>
        <p style="margin:8px 0 0;color:#A0A0A0">Beauty Crafted To An Exemplary Standard</p>
      </div>
      <div style="padding:24px">
        <h2 style="margin-top:0;color:#E8C97A">${title}</h2>
        ${body}
      </div>
      <div style="padding:16px 24px;border-top:1px solid #2a2a2a;color:#A0A0A0;font-size:12px">
        ORAVA (Pvt) Ltd, Sri Lanka • 24-hour worldwide delivery
      </div>
    </div>
  </div>`;
}

async function sendEmail(to: string | string[], subject: string, html: string): Promise<void> {
  try {
    if (!process.env.RESEND_API_KEY) return;
    await resend.emails.send({ from, to, subject, html });
  } catch (error) {
    console.error("Resend error:", error);
  }
}

export async function sendWelcomeEmail(to: string, firstName: string): Promise<void> {
  await sendEmail(
    to,
    "Welcome to ORAVA Gems — Your Account is Ready",
    shell(
      `Welcome, ${firstName}`,
      `<p>Your account is ready. Explore precision-cut gemstones for luxury watch and jewelry brands.</p>
       <p><a href="${process.env.NEXTAUTH_URL}/signin" style="display:inline-block;background:#C9A84C;color:#0A0A0A;padding:12px 18px;border-radius:8px;text-decoration:none;font-weight:700">Sign In</a></p>`,
    ),
  );
}

export async function sendSignInGreetingEmail(to: string, firstName: string): Promise<void> {
  await sendEmail(
    to,
    "Welcome Back to ORAVA Gems",
    shell(
      "Welcome Back",
      `<p>Good to see you again, ${firstName}.</p>
       <ul><li><a href="${process.env.NEXTAUTH_URL}/products" style="color:#E8C97A">Browse Products</a></li><li><a href="${process.env.NEXTAUTH_URL}/quotation" style="color:#E8C97A">Request Inquiry</a></li></ul>`,
    ),
  );
}

export async function sendPasswordResetEmail(to: string, resetLink: string): Promise<void> {
  await sendEmail(
    to,
    "ORAVA Gems — Password Reset Request",
    shell(
      "Reset Password",
      `<p>We received a request to reset your password. This link expires in 1 hour.</p>
       <p><a href="${resetLink}" style="display:inline-block;background:#C9A84C;color:#0A0A0A;padding:12px 18px;border-radius:8px;text-decoration:none;font-weight:700">Reset Password</a></p>`,
    ),
  );
}

export async function sendInquiryConfirmationEmail(to: string, inquiryDetails: object): Promise<void> {
  const details = JSON.stringify(inquiryDetails, null, 2);
  await sendEmail(
    to,
    `ORAVA Gems — Inquiry Received (#${(inquiryDetails as { id?: string }).id ?? "ID"})`,
    shell("Inquiry Received", `<p>We received your inquiry.</p><pre style="white-space:pre-wrap">${details}</pre><p>Expected response time: 24 hours.</p>`),
  );
}

export async function sendMeetingConfirmationEmail(to: string, meetingDetails: object): Promise<void> {
  const details = JSON.stringify(meetingDetails, null, 2);
  await sendEmail(
    to,
    `ORAVA Gems — Meeting Request Received (#${(meetingDetails as { id?: string }).id ?? "ID"})`,
    shell("Meeting Request Received", `<pre style="white-space:pre-wrap">${details}</pre><p>Our team will schedule promptly.</p>`),
  );
}

export async function sendAdminInquiryReplyEmail(to: string, inquiryId: string, reply: string): Promise<void> {
  await sendEmail(
    to,
    `ORAVA Gems — Response to Your Inquiry (#${inquiryId})`,
    shell("Inquiry Response", `<p>Inquiry #${inquiryId}</p><blockquote style="border-left:3px solid #C9A84C;padding-left:12px">${reply}</blockquote>`),
  );
}

export async function sendMeetingScheduledEmail(
  to: string,
  meetingId: string,
  scheduledAt: Date,
  adminReply: string,
): Promise<void> {
  await sendEmail(
    to,
    "ORAVA Gems — Your Meeting is Scheduled",
    shell(
      "Meeting Scheduled",
      `<p>Meeting #${meetingId} is scheduled on <strong>${format(scheduledAt, "PPP p")}</strong>.</p><p>${adminReply}</p>`,
    ),
  );
}

export async function sendDailySummaryReport(to: string[], reportData: object): Promise<void> {
  await sendEmail(
    to,
    `ORAVA Gems — Daily Summary Report [${format(new Date(), "yyyy-MM-dd")}]`,
    shell("Daily Summary", `<pre style="white-space:pre-wrap">${JSON.stringify(reportData, null, 2)}</pre>`),
  );
}

export async function sendQuotationConfirmationEmail(to: string, quotationDetails: object): Promise<void> {
  await sendEmail(
    to,
    `ORAVA Gems — Quotation Request Received (#${(quotationDetails as { id?: string }).id ?? "ID"})`,
    shell("Quotation Request Received", `<pre style="white-space:pre-wrap">${JSON.stringify(quotationDetails, null, 2)}</pre>`),
  );
}

