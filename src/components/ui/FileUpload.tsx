"use client";

import Input from "@/components/ui/Input";

interface FileUploadProps {
  accept: string;
  onChange: (file: File | null) => void;
}

export default function FileUpload({ accept, onChange }: FileUploadProps) {
  return (
    <Input
      type="file"
      accept={accept}
      onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      className="file:mr-3 file:rounded file:border-0 file:bg-brand-blue file:px-2 file:py-1 file:text-xs file:font-semibold file:text-white"
    />
  );
}
