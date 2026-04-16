import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const COMPANY_EMAIL = "info@oravagems.com";
const COMPANY_NAME = "ORAVA Gems";
const SITE_URL =
  process.env.NEXTAUTH_URL || "https://orava-gem-store-web.vercel.app";

function baseTemplate(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      <title>ORAVA Gems</title>
    </head>
    <body style="margin:0;padding:0;background:#f5f7fa;font-family:Inter,Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:#3c74ae;padding:24px 32px;">
          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:2px;">
            ORAVA GEMS
          </h1>
          <p style="margin:4px 0 0;color:#ffffff99;font-size:12px;">
            Beauty Crafted To An Exemplary Standard
          </p>
        </div>
        <div style="padding:32px;">
          ${content}
        </div>
        <div style="background:#f5f7fa;padding:20px 32px;border-top:1px solid #dde2e8;">
          <p style="margin:0;color:#8f8b8f;font-size:12px;line-height:1.6;">
            ORAVA (Pvt) Ltd. | No. 24, Carlwil Place, Colombo 03, Sri Lanka<br>
            Tel: +94 11 257 4062 | Email: ${COMPANY_EMAIL}<br>
            <a href="${SITE_URL}" style="color:#3c74ae;">www.oravagems.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

async function sendEmail(
  to: string | string[],
  subject: string,
  html: string,
): Promise<void> {
  try {
    if (!process.env.RESEND_API_KEY) return;
    await resend.emails.send({ from: FROM_EMAIL, to, subject, html });
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
    `Welcome to ${COMPANY_NAME} — Beauty Crafted To An Exemplary Standard`,
    baseTemplate(`
      <h2 style="color:#1a1a2e;">Welcome, ${firstName}!</h2>
      <p style="color:#4a4a6a;line-height:1.8;">
        Your ORAVA Gems account has been successfully created.
        We are delighted to have you as part of our community.
      </p>
      <p style="color:#4a4a6a;line-height:1.8;">
        ORAVA (Pvt) Ltd. is Sri Lanka's premier precision-cut gemstone exporter since 2006,
        serving the world's most discerning luxury watch and jewellery brands.
      </p>
      <div style="margin:24px 0;">
        <p style="color:#4a4a6a;margin-bottom:8px;">What you can do:</p>
        <ul style="color:#4a4a6a;line-height:2;">
          <li>Browse our gemstone collection</li>
          <li>Submit product inquiries</li>
          <li>Request meetings with our team</li>
          <li>Build your quotation cart</li>
        </ul>
      </div>
      <a href="${SITE_URL}/products" style="display:inline-block;background:#3c74ae;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px;">
        Explore Our Collection
      </a>
    `),
  );
}

export async function sendPasswordResetEmail(
  to: string,
  resetLink: string,
): Promise<void> {
  await sendEmail(
    to,
    `${COMPANY_NAME} — Password Reset Request`,
    baseTemplate(`
      <h2 style="color:#1a1a2e;">Reset Your Password</h2>
      <p style="color:#4a4a6a;line-height:1.8;">
        We received a request to reset your password. Click the button below to create a new password.
        This link will expire in 1 hour.
      </p>
      <a href="${resetLink}" style="display:inline-block;background:#3c74ae;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;margin:20px 0;">
        Reset Password
      </a>
      <p style="color:#8f8b8f;font-size:14px;line-height:1.8;">
        If you didn't request this, please ignore this email or contact us at
        <a href="mailto:${COMPANY_EMAIL}" style="color:#3c74ae;">${COMPANY_EMAIL}</a>.
      </p>
    `),
  );
}

export async function sendInquiryConfirmationEmail(
  to: string,
  data: {
    id?: string;
    inquiryType?: string;
    description?: string | null;
    products?: Array<{ name: string; origin?: string; shape?: string }>;
    reportType?: string | null;
  },
): Promise<void> {
  const inquiryId = data.id ?? "N/A";
  const customerContent = baseTemplate(`
    <h2 style="color:#1a1a2e;">Dear Valued Customer,</h2>
    <p style="color:#4a4a6a;line-height:1.8;">
      Your inquiry has been successfully submitted. Our team will review and respond within 24 hours.
    </p>
    <div style="background:#f5f7fa;border-radius:8px;padding:20px;margin:20px 0;border-left:4px solid #3c74ae;">
      <p style="margin:0 0 8px;font-weight:600;color:#1a1a2e;">Inquiry Details</p>
      <p style="margin:4px 0;color:#4a4a6a;font-size:14px;">ID: #${inquiryId}</p>
      <p style="margin:4px 0;color:#4a4a6a;font-size:14px;">Type: ${data.inquiryType ?? "N/A"}</p>
      ${data.description ? `<p style="margin:4px 0;color:#4a4a6a;font-size:14px;">Message: ${data.description}</p>` : ""}
      ${data.reportType && data.reportType !== "none" ? `<p style="margin:4px 0;color:#3c74ae;font-size:14px;font-weight:600;">Lab Report: ${data.reportType === "stone" ? "Stone-wise Report" : "Lot Report"} (Bellerophon Gemstone Lab)</p>` : ""}
    </div>
    <p style="color:#4a4a6a;line-height:1.8;margin-top:20px;">
      If you have any questions please contact us at
      <a href="mailto:${COMPANY_EMAIL}" style="color:#3c74ae;">${COMPANY_EMAIL}</a>
      or call +94 11 257 4062.
    </p>
    <a href="${SITE_URL}/profile" style="display:inline-block;background:#3c74ae;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px;">
      View Your Inquiries
    </a>
  `);

  const adminContent = baseTemplate(`
    <h2 style="color:#1a1a2e;">New Inquiry Received</h2>
    <p style="color:#4a4a6a;">Customer: ${to}</p>
    <p style="color:#4a4a6a;">Type: ${data.inquiryType ?? "N/A"}</p>
    <p style="color:#4a4a6a;">ID: #${inquiryId}</p>
    ${data.description ? `<p style="color:#4a4a6a;">Message: ${data.description}</p>` : ""}
    ${data.reportType && data.reportType !== "none" ? `<p style="color:#4a4a6a;">Report Type: ${data.reportType}</p>` : ""}
    <a href="${SITE_URL}/admin/inquiries" style="display:inline-block;background:#3c74ae;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:16px;">
      View in Admin Dashboard
    </a>
  `);

  await Promise.all([
    sendEmail(
      to,
      `${COMPANY_NAME} — Inquiry Received (#${inquiryId})`,
      customerContent,
    ),
    sendEmail(COMPANY_EMAIL, `New Inquiry — #${inquiryId}`, adminContent),
  ]);
}

export async function sendMeetingConfirmationEmail(
  to: string,
  data: {
    id?: string;
    meetingType?: string;
    description?: string | null;
    preferredDate?: string | Date | null;
  },
): Promise<void> {
  const meetingId = data.id ?? "N/A";
  const customerContent = baseTemplate(`
    <h2 style="color:#1a1a2e;">Meeting Request Received</h2>
    <p style="color:#4a4a6a;line-height:1.8;">
      We have received your meeting request. Our team will review and contact you with scheduling details shortly.
    </p>
    <div style="background:#f5f7fa;border-radius:8px;padding:20px;margin:20px 0;border-left:4px solid #3c74ae;">
      <p style="margin:0 0 8px;font-weight:600;color:#1a1a2e;">Meeting Details</p>
      <p style="margin:4px 0;color:#4a4a6a;font-size:14px;">ID: #${meetingId}</p>
      <p style="margin:4px 0;color:#4a4a6a;font-size:14px;">Type: ${data.meetingType ?? "N/A"}</p>
      ${data.preferredDate ? `<p style="margin:4px 0;color:#4a4a6a;font-size:14px;">Preferred Date: ${data.preferredDate}</p>` : ""}
      ${data.description ? `<p style="margin:4px 0;color:#4a4a6a;font-size:14px;">Notes: ${data.description}</p>` : ""}
    </div>
    <p style="color:#4a4a6a;line-height:1.8;">Expected response: within 24 hours.</p>
  `);

  const adminContent = baseTemplate(`
    <h2 style="color:#1a1a2e;">New Meeting Request</h2>
    <p style="color:#4a4a6a;">Customer: ${to}</p>
    <p style="color:#4a4a6a;">Type: ${data.meetingType ?? "N/A"}</p>
    <p style="color:#4a4a6a;">ID: #${meetingId}</p>
    ${data.preferredDate ? `<p style="color:#4a4a6a;">Preferred Date: ${data.preferredDate}</p>` : ""}
    ${data.description ? `<p style="color:#4a4a6a;">Notes: ${data.description}</p>` : ""}
    <a href="${SITE_URL}/admin/meetings" style="display:inline-block;background:#3c74ae;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:16px;">
      View in Admin Dashboard
    </a>
  `);

  await Promise.all([
    sendEmail(
      to,
      `${COMPANY_NAME} — Meeting Request Received (#${meetingId})`,
      customerContent,
    ),
    sendEmail(
      COMPANY_EMAIL,
      `New Meeting Request — #${meetingId}`,
      adminContent,
    ),
  ]);
}

export async function sendAdminInquiryReplyEmail(
  to: string,
  inquiryId: string,
  reply: string,
): Promise<void> {
  await sendEmail(
    to,
    `${COMPANY_NAME} — Response to Your Inquiry (#${inquiryId})`,
    baseTemplate(`
      <h2 style="color:#1a1a2e;">Inquiry Response</h2>
      <p style="color:#4a4a6a;line-height:1.8;">
        We have reviewed your inquiry (#${inquiryId}) and here is our response:
      </p>
      <div style="background:#f5f7fa;border-radius:8px;padding:20px;margin:20px 0;border-left:4px solid #3c74ae;">
        <p style="margin:0;color:#4a4a6a;line-height:1.8;">${reply}</p>
      </div>
      <p style="color:#4a4a6a;line-height:1.8;">
        If you have any further questions, please contact us at
        <a href="mailto:${COMPANY_EMAIL}" style="color:#3c74ae;">${COMPANY_EMAIL}</a>
        or call +94 11 257 4062.
      </p>
      <a href="${SITE_URL}/profile" style="display:inline-block;background:#3c74ae;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px;">
        View Your Inquiries
      </a>
    `),
  );
}

export async function sendMeetingScheduledEmail(
  to: string,
  meetingId: string,
  scheduledAt: Date,
  adminReply: string,
): Promise<void> {
  const formattedDate = scheduledAt.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  await sendEmail(
    to,
    `${COMPANY_NAME} — Your Meeting Has Been Scheduled`,
    baseTemplate(`
      <h2 style="color:#1a1a2e;">Meeting Confirmed</h2>
      <p style="color:#4a4a6a;line-height:1.8;">
        Your meeting request (#${meetingId}) has been scheduled.
      </p>
      <div style="background:#f5f7fa;border-radius:8px;padding:20px;margin:20px 0;border-left:4px solid #3c74ae;">
        <p style="margin:0 0 8px;font-weight:600;color:#1a1a2e;">Scheduled Date & Time</p>
        <p style="margin:4px 0;color:#3c74ae;font-size:16px;font-weight:600;">${formattedDate}</p>
        ${adminReply ? `<p style="margin:12px 0 0;color:#4a4a6a;font-size:14px;"><strong>Notes:</strong> ${adminReply}</p>` : ""}
      </div>
      <p style="color:#4a4a6a;line-height:1.8;">
        For any changes or questions, please contact us at
        <a href="mailto:${COMPANY_EMAIL}" style="color:#3c74ae;">${COMPANY_EMAIL}</a>
        or call +94 11 257 4062.
      </p>
    `),
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
    `${COMPANY_NAME} — New Inquiry Alert (#${inquiryId})`,
    baseTemplate(`
      <h2 style="color:#1a1a2e;">New Inquiry Received</h2>
      <p style="color:#4a4a6a;">A new inquiry has been submitted.</p>
      <div style="background:#f5f7fa;border-radius:8px;padding:20px;margin:20px 0;">
        <p style="margin:4px 0;color:#4a4a6a;"><strong>ID:</strong> ${inquiryId}</p>
        <p style="margin:4px 0;color:#4a4a6a;"><strong>Type:</strong> ${inquiryType}</p>
        <p style="margin:4px 0;color:#4a4a6a;"><strong>Requester:</strong> ${requesterEmail}</p>
      </div>
      <a href="${SITE_URL}/admin/inquiries" style="display:inline-block;background:#3c74ae;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">
        View in Admin Dashboard
      </a>
    `),
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
    `${COMPANY_NAME} — New Meeting Request (#${meetingId})`,
    baseTemplate(`
      <h2 style="color:#1a1a2e;">New Meeting Request</h2>
      <p style="color:#4a4a6a;">A new meeting request has been submitted.</p>
      <div style="background:#f5f7fa;border-radius:8px;padding:20px;margin:20px 0;">
        <p style="margin:4px 0;color:#4a4a6a;"><strong>ID:</strong> ${meetingId}</p>
        <p style="margin:4px 0;color:#4a4a6a;"><strong>Type:</strong> ${meetingType}</p>
        <p style="margin:4px 0;color:#4a4a6a;"><strong>Requester:</strong> ${requesterEmail}</p>
      </div>
      <a href="${SITE_URL}/admin/meetings" style="display:inline-block;background:#3c74ae;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">
        View in Admin Dashboard
      </a>
    `),
  );
}

export async function sendDailySummaryReport(
  recipients: string[],
  reportData: Record<string, unknown>,
): Promise<void> {
  if (recipients.length === 0) return;

  const reportContent = Object.entries(reportData)
    .map(
      ([key, value]) =>
        `<p style="margin:4px 0;color:#4a4a6a;"><strong>${key}:</strong> ${JSON.stringify(value)}</p>`,
    )
    .join("");

  await sendEmail(
    recipients,
    `${COMPANY_NAME} — Daily Summary Report`,
    baseTemplate(`
      <h2 style="color:#1a1a2e;">Daily Summary Report</h2>
      <div style="background:#f5f7fa;border-radius:8px;padding:20px;margin:20px 0;">
        ${reportContent}
      </div>
      <p style="color:#8f8b8f;font-size:12px;">Report generated automatically.</p>
    `),
  );
}
