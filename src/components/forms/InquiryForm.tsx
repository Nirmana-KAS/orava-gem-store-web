"use client";

import { InquiryType } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/components/ui/Button";
import FileUpload from "@/components/ui/FileUpload";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { toast } from "@/components/ui/Toast";
import { inquirySchema } from "@/lib/validations";

const formSchema = inquirySchema.extend({
  terms: z.literal(true),
});

type FormValues = z.infer<typeof formSchema>;

interface InquiryFormProps {
  type?: InquiryType;
  prefilledProductId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryForm({ type, prefilledProductId, isOpen, onClose }: InquiryFormProps) {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inquiryType: type ?? InquiryType.PRODUCT,
      description: "",
      productIds: prefilledProductId ? [prefilledProductId] : [],
    },
  });

  useEffect(() => {
    if (type) setValue("inquiryType", type);
  }, [type, setValue]);

  const currentType = watch("inquiryType");

  const onSubmit = async (values: FormValues) => {
    let attachmentUrl: string | undefined;
    let attachmentName: string | undefined;
    if (file) {
      const upload = new FormData();
      upload.append("file", file);
      const uploadRes = await fetch("/api/upload/file", { method: "POST", body: upload });
      const uploadJson = (await uploadRes.json()) as { success: boolean; data?: { url: string } };
      if (!uploadJson.success || !uploadJson.data?.url) {
        toast("Attachment upload failed");
        return;
      }
      attachmentUrl = uploadJson.data.url;
      attachmentName = file.name;
    }

    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, attachmentUrl, attachmentName }),
    });
    const json = (await res.json()) as { success: boolean; error?: string };
    if (!json.success) {
      toast(json.error ?? "Failed to submit inquiry");
      return;
    }
    toast("Inquiry submitted successfully");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ willChange: "transform" }}>
          <Modal isOpen={isOpen} onClose={onClose} title="Make an Inquiry">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <label className="block text-sm">
                Type
                <select {...register("inquiryType")} className="mt-1 w-full rounded-md border border-white/20 bg-dark-elevated px-3 py-2">
                  {Object.values(InquiryType).map((value) => (
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
                  <span className="text-xs text-red-400">{errors.guestEmail?.message}</span>
                </label>
              ) : null}
              <label className="block text-sm">
                Description
                <textarea {...register("description")} className="mt-1 h-28 w-full rounded-md border border-white/20 bg-dark-elevated p-3" />
              </label>
              {currentType === InquiryType.PRODUCT ? (
                <label className="block text-sm">
                  Product IDs (comma separated)
                  <Input
                    defaultValue={prefilledProductId}
                    onBlur={(e) => {
                      const ids = e.target.value
                        .split(",")
                        .map((id) => id.trim())
                        .filter(Boolean);
                      setValue("productIds", ids);
                    }}
                  />
                </label>
              ) : null}
              <label className="block text-sm">
                Attachment
                <FileUpload accept=".pdf,.docx,.jpg,.png" onChange={setFile} />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...register("terms")} />
                I agree to the terms
              </label>
              <Button type="submit" isLoading={isSubmitting} className="w-full">
                Submit Inquiry
              </Button>
            </form>
          </Modal>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

