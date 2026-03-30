import { format } from "date-fns";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const from = process.env.RESEND_FROM_EMAIL;

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

async function sendEmail(
  to: string | string[],
  subject: string,
  html: string,
): Promise<void> {
  try {
    if (!process.env.RESEND_API_KEY || !from) return;
    await resend.emails.send({ from, to, subject, html });
  } catch (error) {
    console.error("Resend error:", error);
  }
}

export async function sendWelcomeEmail(
  to: string,
  firstName: string,
): Promise<void> {
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

export async function sendSignInGreetingEmail(
  to: string,
  firstName: string,
): Promise<void> {
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

export async function sendPasswordResetEmail(
  to: string,
  resetLink: string,
): Promise<void> {
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

export async function sendInquiryConfirmationEmail(
  to: string,
  inquiryDetails: object,
): Promise<void> {
  const data = inquiryDetails as {
    id?: string;
    inquiryType?: string;
    description?: string;
    products?: string[];
  };
  const products =
    data.products && data.products.length > 0
      ? data.products.join(", ")
      : "N/A";
  await sendEmail(
    to,
    `ORAVA Gems — Inquiry Received (#${data.id ?? "ID"})`,
    shell(
      "Inquiry Received",
      `<p>Thank you for contacting ORAVA Gems.</p>
       <p><strong>Inquiry ID:</strong> ${data.id ?? "N/A"}<br/>
       <strong>Type:</strong> ${data.inquiryType ?? "N/A"}<br/>
       <strong>Description:</strong> ${data.description ?? "N/A"}<br/>
       <strong>Products:</strong> ${products}</p>
       <p>Expected response time: within 24 hours.</p>`,
    ),
  );
}

export async function sendMeetingConfirmationEmail(
  to: string,
  meetingDetails: object,
): Promise<void> {
  const data = meetingDetails as {
    id?: string;
    meetingType?: string;
    description?: string;
  };
  await sendEmail(
    to,
    `ORAVA Gems — Meeting Request Received (#${data.id ?? "ID"})`,
    shell(
      "Meeting Request Received",
      `<p>We received your meeting request.</p>
       <p><strong>Meeting ID:</strong> ${data.id ?? "N/A"}<br/>
       <strong>Type:</strong> ${data.meetingType ?? "N/A"}<br/>
       <strong>Description:</strong> ${data.description ?? "N/A"}</p>
       <p>Our team will review and contact you with scheduling details shortly.</p>`,
    ),
  );
}

export async function sendAdminInquiryReplyEmail(
  to: string,
  inquiryId: string,
  reply: string,
): Promise<void> {
  await sendEmail(
    to,
    `ORAVA Gems — Response to Your Inquiry (#${inquiryId})`,
    shell(
      "Inquiry Response",
      `<p>Inquiry #${inquiryId}</p><blockquote style="border-left:3px solid #C9A84C;padding-left:12px">${reply}</blockquote>`,
    ),
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

export async function sendDailySummaryReport(
  to: string[],
  reportData: object,
): Promise<void> {
  const data = reportData as {
    newInquiries?: number;
    newMeetings?: number;
    newUsers?: number;
    topProducts?: string;
  };
  await sendEmail(
    to,
    `ORAVA Gems — Daily Summary Report [${format(new Date(), "yyyy-MM-dd")}]`,
    shell(
      "Daily Summary",
      `<p><strong>New inquiries:</strong> ${data.newInquiries ?? 0}</p>
       <p><strong>New meetings:</strong> ${data.newMeetings ?? 0}</p>
       <p><strong>New users:</strong> ${data.newUsers ?? 0}</p>
       <p><strong>Top products inquired:</strong> ${data.topProducts ?? "N/A"}</p>`,
    ),
  );
}

export async function sendQuotationConfirmationEmail(
  to: string,
  quotationDetails: object,
): Promise<void> {
  const data = quotationDetails as { id?: string; description?: string };
  await sendEmail(
    to,
    `ORAVA Gems — Quotation Request Received (#${data.id ?? "ID"})`,
    shell(
      "Quotation Request Received",
      `<p>Your quotation request has been received successfully.</p>
       <p><strong>Reference ID:</strong> ${data.id ?? "N/A"}<br/>
       <strong>Description:</strong> ${data.description ?? "N/A"}</p>
       <p>Our team will share a response as soon as possible.</p>`,
    ),
  );
}

export async function sendAdminInquiryNotificationEmail(
  recipients: string[],
  inquiryId: string,
  inquiryType: string,
  requesterEmail: string,
): Promise<void> {
  if (recipients.length === 0) return;
  await sendEmail(
    recipients,
    `ORAVA Gems — New Inquiry Alert (#${inquiryId})`,
    shell(
      "New Inquiry Received",
      `<p>A new inquiry has been submitted.</p>
       <p><strong>ID:</strong> ${inquiryId}<br/>
       <strong>Type:</strong> ${inquiryType}<br/>
       <strong>Requester:</strong> ${requesterEmail}</p>`,
    ),
  );
}

export async function sendAdminMeetingNotificationEmail(
  recipients: string[],
  meetingId: string,
  meetingType: string,
  requesterEmail: string,
): Promise<void> {
  if (recipients.length === 0) return;
  await sendEmail(
    recipients,
    `ORAVA Gems — New Meeting Request (#${meetingId})`,
    shell(
      "New Meeting Request Received",
      `<p>A new meeting request has been submitted.</p>
       <p><strong>ID:</strong> ${meetingId}<br/>
       <strong>Type:</strong> ${meetingType}<br/>
       <strong>Requester:</strong> ${requesterEmail}</p>`,
    ),
  );
}
