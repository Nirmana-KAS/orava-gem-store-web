import { prisma } from "@/lib/prisma";
import EmailTemplateEditor from "@/components/admin/EmailTemplateEditor";

async function seedTemplates() {
  const names = [
    "welcome",
    "signinGreeting",
    "passwordReset",
    "inquiryConfirmation",
    "meetingConfirmation",
    "adminInquiryReply",
    "meetingScheduled",
    "dailySummary",
    "quotationConfirmation",
  ];
  for (const name of names) {
    await prisma.emailTemplate.upsert({
      where: { name },
      update: {},
      create: {
        name,
        subject: `${name} subject`,
        body: `${name} body`,
        variables: ["firstName", "inquiryId", "meetingId"],
      },
    });
  }
}

export default async function AdminSettingsPage() {
  await seedTemplates();
  const templates = await prisma.emailTemplate.findMany({
    orderBy: { name: "asc" },
  });
  const schedules = await prisma.reportSchedule.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-4xl">Settings</h1>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Email Templates</h2>
        <EmailTemplateEditor templates={templates} />
      </section>
      <section className="rounded-xl border border-white/10 bg-dark-surface p-4">
        <h2 className="text-2xl font-semibold">Report Schedule Management</h2>
        <p className="mt-2 text-sm text-zinc-300">
          Existing schedules: {schedules.length}
        </p>
      </section>
      <section className="rounded-xl border border-white/10 bg-dark-surface p-4">
        <h2 className="text-2xl font-semibold">Admin Email Access</h2>
        <p className="mt-2 text-sm text-zinc-300">
          Current ADMIN_EMAILS:{" "}
          {(process.env.ADMIN_EMAILS ?? "").split(",").join(", ")}
        </p>
      </section>
      <section className="rounded-xl border border-white/10 bg-dark-surface p-4">
        <h2 className="text-2xl font-semibold">Low Availability Alerts</h2>
        <p className="mt-2 text-sm text-zinc-300">
          Configure product lot threshold alerts and notification toggles via
          admin reporting policies.
        </p>
      </section>
    </div>
  );
}
