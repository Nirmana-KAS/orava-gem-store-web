"use client";

import { MeetingType } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/components/ui/Button";
import FileUpload from "@/components/ui/FileUpload";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { toast } from "@/components/ui/Toast";
import { meetingSchema } from "@/lib/validations";

const formSchema = meetingSchema.extend({ terms: z.literal(true) });
type FormValues = z.infer<typeof formSchema>;

interface MeetingFormProps {
  type?: MeetingType;
  isOpen: boolean;
  onClose: () => void;
}

export default function MeetingForm({ type, isOpen, onClose }: MeetingFormProps) {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const { register, handleSubmit, setValue, formState } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meetingType: type ?? MeetingType.SERVICE,
    },
  });

  useEffect(() => {
    if (type) setValue("meetingType", type);
  }, [type, setValue]);

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
    const res = await fetch("/api/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        preferredDate: values.preferredDate ? new Date(values.preferredDate).toISOString() : undefined,
        attachmentUrl,
        attachmentName,
      }),
    });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (!json.success) {
      toast(json.error ?? "Failed to submit meeting");
      return;
    }
    toast("Meeting request submitted");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request a Meeting">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-sm">
          Type
          <select {...register("meetingType")} className="mt-1 w-full rounded-md border border-white/20 bg-dark-elevated px-3 py-2">
            {Object.values(MeetingType).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        {!session?.user ? (
          <label className="block text-sm">
            Email
            <Input type="email" {...register("guestEmail")} />
          </label>
        ) : null}
        <label className="block text-sm">
          Preferred date/time
          <Input type="datetime-local" {...register("preferredDate")} />
        </label>
        <label className="block text-sm">
          Description
          <textarea {...register("description")} className="mt-1 h-24 w-full rounded-md border border-white/20 bg-dark-elevated p-3" />
        </label>
        <label className="block text-sm">
          Attachment
          <FileUpload accept=".pdf,.docx,.jpg,.png" onChange={setFile} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("terms")} />
          I agree to the terms
        </label>
        <Button type="submit" isLoading={formState.isSubmitting} className="w-full">
          Submit Meeting Request
        </Button>
      </form>
    </Modal>
  );
}

