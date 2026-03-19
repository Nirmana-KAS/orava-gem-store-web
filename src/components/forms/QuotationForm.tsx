"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/components/ui/Button";
import FileUpload from "@/components/ui/FileUpload";
import Input from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { quotationSchema } from "@/lib/validations";

const formSchema = quotationSchema.extend({ terms: z.literal(true) });
type FormValues = z.infer<typeof formSchema>;

export default function QuotationForm() {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const { register, handleSubmit, setValue, formState } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    let attachmentUrl: string | undefined;
    let attachmentName: string | undefined;
    if (file) {
      const fd = new FormData();
      fd.append("file", file);
      const uploadRes = await fetch("/api/upload/file", { method: "POST", body: fd });
      const uploadJson = (await uploadRes.json()) as { success: boolean; data?: { url: string } };
      if (!uploadJson.success || !uploadJson.data?.url) {
        toast("Attachment upload failed");
        return;
      }
      attachmentUrl = uploadJson.data.url;
      attachmentName = file.name;
    }
    const payload = {
      inquiryType: "QUOTATION",
      description: `${values.description}\n\nSpecifications:\n${values.specifications}`,
      guestEmail: session?.user ? undefined : values.guestEmail,
      productIds: values.productIds,
      attachmentUrl,
      attachmentName,
    };
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (!json.success) {
      toast(json.error ?? "Failed to submit quotation");
      return;
    }
    toast("Quotation request submitted");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-white/10 bg-dark-surface p-6">
      {!session?.user ? (
        <label className="block text-sm">
          Contact Email
          <Input type="email" {...register("guestEmail")} />
        </label>
      ) : null}
      <label className="block text-sm">
        Description
        <textarea {...register("description")} className="mt-1 h-28 w-full rounded-md border border-white/20 bg-dark-elevated p-3" />
      </label>
      <label className="block text-sm">
        Specifications
        <textarea {...register("specifications")} className="mt-1 h-28 w-full rounded-md border border-white/20 bg-dark-elevated p-3" />
      </label>
      <label className="block text-sm">
        Product IDs (optional)
        <Input
          onBlur={(e) => {
            const ids = e.target.value
              .split(",")
              .map((value) => value.trim())
              .filter(Boolean);
            setValue("productIds", ids);
          }}
        />
      </label>
      <label className="block text-sm">
        Attachment
        <FileUpload accept=".pdf,.docx,.jpg,.png" onChange={setFile} />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("terms")} />
        I agree to the terms
      </label>
      <Button type="submit" isLoading={formState.isSubmitting}>
        Submit Quotation Request
      </Button>
    </form>
  );
}

