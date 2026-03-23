"use client";

import { Condition, Product } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { DragEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { toast } from "@/components/ui/Toast";
import { adminProductSchema } from "@/lib/validations";
import { ApiResponse } from "@/types";

type FormValues = z.infer<typeof adminProductSchema>;

type UploadStatus = "uploading" | "uploaded" | "error";

interface UploadItem {
  id: string;
  previewUrl: string;
  uploadedUrl?: string;
  progress: number;
  status: UploadStatus;
  error?: string;
  isObjectUrl: boolean;
}

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  onSaved: () => void;
}

export default function ProductForm({
  isOpen,
  onClose,
  product,
  onSaved,
}: ProductFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadItems, setUploadItems] = useState<UploadItem[]>([]);

  const { register, handleSubmit, setValue, formState, reset } =
    useForm<FormValues>({
      resolver: zodResolver(adminProductSchema),
      defaultValues: {
        name: "",
        origin: "",
        shape: "",
        size: "",
        colorName: "",
        colorHex: "#C9A84C",
        polishedType: "",
        clarityType: "",
        weight: 0,
        condition: Condition.NATURAL,
        lotQuantity: 0,
        price: undefined,
        availability: true,
        images: [],
      },
    });

  useEffect(() => {
    if (!isOpen) return;

    const defaults: FormValues = product
      ? { ...product, price: product.price ?? undefined }
      : {
          name: "",
          origin: "",
          shape: "",
          size: "",
          colorName: "",
          colorHex: "#C9A84C",
          polishedType: "",
          clarityType: "",
          weight: 0,
          condition: Condition.NATURAL,
          lotQuantity: 0,
          price: undefined,
          availability: true,
          images: [],
        };

    const existingImages = (product?.images ?? []).map((url, index) => ({
      id: `existing-${index}-${url}`,
      previewUrl: url,
      uploadedUrl: url,
      progress: 100,
      status: "uploaded" as const,
      isObjectUrl: false,
    }));

    reset(defaults);
    setUploadItems(existingImages);
    setValue(
      "images",
      existingImages.map((item) => item.uploadedUrl ?? "").filter(Boolean),
      { shouldValidate: true },
    );
  }, [isOpen, product, reset, setValue]);

  useEffect(() => {
    return () => {
      uploadItems.forEach((item) => {
        if (item.isObjectUrl) URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, [uploadItems]);

  const syncImagesToForm = (items: UploadItem[]) => {
    const urls = items
      .filter((item) => item.status === "uploaded" && Boolean(item.uploadedUrl))
      .map((item) => item.uploadedUrl as string);
    setValue("images", urls, { shouldValidate: true });
  };

  const updateUploadItem = (
    id: string,
    updater: (item: UploadItem) => UploadItem,
  ) => {
    setUploadItems((prev) => {
      const next = prev.map((item) => (item.id === id ? updater(item) : item));
      syncImagesToForm(next);
      return next;
    });
  };

  const uploadFile = (file: File, id: string) => {
    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload/image");

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;
      const percent = Math.round((event.loaded / event.total) * 100);
      updateUploadItem(id, (item) => ({ ...item, progress: percent }));
    };

    xhr.onload = () => {
      try {
        const payload = JSON.parse(xhr.responseText) as ApiResponse<{
          url: string;
        }>;
        if (
          xhr.status >= 200 &&
          xhr.status < 300 &&
          payload.success &&
          payload.data?.url
        ) {
          updateUploadItem(id, (item) => ({
            ...item,
            status: "uploaded",
            uploadedUrl: payload.data?.url,
            progress: 100,
            error: undefined,
          }));
          return;
        }

        updateUploadItem(id, (item) => ({
          ...item,
          status: "error",
          error: payload.error ?? "Image upload failed",
          progress: 0,
        }));
      } catch {
        updateUploadItem(id, (item) => ({
          ...item,
          status: "error",
          error: "Image upload failed",
          progress: 0,
        }));
      }
    };

    xhr.onerror = () => {
      updateUploadItem(id, (item) => ({
        ...item,
        status: "error",
        error: "Network error during upload",
        progress: 0,
      }));
    };

    xhr.send(formData);
  };

  const handleFiles = (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    const allowedSlots = MAX_IMAGES - uploadItems.length;
    if (allowedSlots <= 0) {
      toast(`You can upload up to ${MAX_IMAGES} images.`);
      return;
    }

    const selected = files.slice(0, allowedSlots);
    if (files.length > allowedSlots) {
      toast(`Only ${allowedSlots} more image(s) can be added.`);
    }

    selected.forEach((file) => {
      if (!ALLOWED_TYPES.has(file.type)) {
        toast(`${file.name}: only jpg, jpeg, png, webp are allowed.`);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast(`${file.name}: max size is 5MB.`);
        return;
      }

      const id = `${file.name}-${file.size}-${Date.now()}-${Math.random()}`;
      const objectUrl = URL.createObjectURL(file);
      const newItem: UploadItem = {
        id,
        previewUrl: objectUrl,
        progress: 0,
        status: "uploading",
        isObjectUrl: true,
      };

      setUploadItems((prev) => {
        const next = [...prev, newItem];
        syncImagesToForm(next);
        return next;
      });

      uploadFile(file, id);
    });
  };

  const removeImage = (id: string) => {
    setUploadItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.isObjectUrl) URL.revokeObjectURL(target.previewUrl);
      const next = prev.filter((item) => item.id !== id);
      syncImagesToForm(next);
      return next;
    });
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files?.length) {
      handleFiles(event.dataTransfer.files);
    }
  };

  const hasUploadError = uploadItems.some((item) => item.status === "error");
  const hasUploading = uploadItems.some((item) => item.status === "uploading");

  const onSubmit = async (values: FormValues) => {
    if (values.images.length === 0) {
      toast("Please upload at least one product image.");
      return;
    }

    if (hasUploading) {
      toast("Please wait until all images finish uploading.");
      return;
    }

    if (hasUploadError) {
      toast("Please remove or re-upload images with errors.");
      return;
    }

    const res = await fetch(
      product ? `/api/products/${product.id}` : "/api/products",
      {
        method: product ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      },
    );
    const json = (await res.json()) as { success: boolean; error?: string };
    if (!json.success) {
      toast(json.error ?? "Failed to save product");
      return;
    }
    toast("Product saved");
    onSaved();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? "Edit Product" : "Add Product"}
    >
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input placeholder="Name" {...register("name")} />
          <Input placeholder="Origin" {...register("origin")} />
          <Input placeholder="Shape" {...register("shape")} />
          <Input placeholder="Size" {...register("size")} />
          <Input placeholder="Color Name" {...register("colorName")} />
          <Input type="color" {...register("colorHex")} />
          <Input placeholder="Polish Type" {...register("polishedType")} />
          <Input placeholder="Clarity Type" {...register("clarityType")} />
          <Input
            type="number"
            step="0.01"
            placeholder="Weight"
            {...register("weight", { valueAsNumber: true })}
          />
          <select
            {...register("condition")}
            className="rounded-md border border-white/20 bg-dark-elevated px-3 py-2 text-sm"
          >
            {Object.values(Condition).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <Input
            type="number"
            placeholder="Lot Quantity"
            {...register("lotQuantity", { valueAsNumber: true })}
          />
          <Input
            type="number"
            step="0.01"
            placeholder="Price"
            {...register("price", { valueAsNumber: true })}
          />
        </div>

        <div className="space-y-3 rounded-xl border border-white/10 bg-dark-elevated/50 p-4">
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onDrop={onDrop}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            className={`cursor-pointer rounded-lg border border-dashed p-6 text-center transition ${
              isDragging
                ? "border-gold bg-gold/10"
                : "border-white/20 hover:border-gold/70"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={(event) => {
                if (event.target.files) handleFiles(event.target.files);
                event.currentTarget.value = "";
              }}
            />
            <ImagePlus className="mx-auto mb-2 text-gold" size={24} />
            <p className="text-sm text-zinc-200">
              Drag and drop images here or click to browse
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              Up to {MAX_IMAGES} images • jpg, jpeg, png, webp • max 5MB each
            </p>
          </div>

          {uploadItems.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {uploadItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-white/10 bg-dark-surface p-2"
                >
                  <div className="relative overflow-hidden rounded-md">
                    <Image
                      src={item.previewUrl}
                      alt="Product preview"
                      width={600}
                      height={400}
                      className="h-32 w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(item.id)}
                      className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white hover:bg-black"
                      aria-label="Remove image"
                    >
                      <X size={14} />
                    </button>
                    {item.status === "uploaded" ? (
                      <div className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded bg-emerald-500/90 px-2 py-1 text-xs font-semibold text-white">
                        <CheckCircle2 size={12} /> Uploaded
                      </div>
                    ) : null}
                  </div>

                  {item.status === "uploading" ? (
                    <div className="mt-2 space-y-1">
                      <div className="h-1.5 w-full overflow-hidden rounded bg-white/10">
                        <div
                          className="h-full rounded bg-gold transition-all"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-zinc-400">
                        Uploading... {item.progress}%
                      </p>
                    </div>
                  ) : null}

                  {item.status === "error" ? (
                    <p className="mt-2 text-xs text-red-400">
                      {item.error ?? "Upload failed"}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("availability")} />
          Available
        </label>
        <Button
          type="submit"
          isLoading={formState.isSubmitting}
          className="w-full"
        >
          Save Product
        </Button>
      </form>
    </Modal>
  );
}
