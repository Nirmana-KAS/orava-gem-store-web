"use client";

import { Condition, Product } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { toast } from "@/components/ui/Toast";
import { adminProductSchema } from "@/lib/validations";

type FormValues = z.infer<typeof adminProductSchema>;

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  onSaved: () => void;
}

export default function ProductForm({ isOpen, onClose, product, onSaved }: ProductFormProps) {
  const { register, handleSubmit, setValue, formState } = useForm<FormValues>({
    resolver: zodResolver(adminProductSchema),
    defaultValues: product
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
        },
  });

  const onSubmit = async (values: FormValues) => {
    const res = await fetch(product ? `/api/products/${product.id}` : "/api/products", {
      method: product ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
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
    <Modal isOpen={isOpen} onClose={onClose} title={product ? "Edit Product" : "Add Product"}>
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
          <Input type="number" step="0.01" placeholder="Weight" {...register("weight", { valueAsNumber: true })} />
          <select {...register("condition")} className="rounded-md border border-white/20 bg-dark-elevated px-3 py-2 text-sm">
            {Object.values(Condition).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <Input type="number" placeholder="Lot Quantity" {...register("lotQuantity", { valueAsNumber: true })} />
          <Input type="number" step="0.01" placeholder="Price" {...register("price", { valueAsNumber: true })} />
        </div>
        <Input
          placeholder="Image URLs comma separated"
          onBlur={(e) =>
            setValue(
              "images",
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            )
          }
        />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("availability")} />
          Available
        </label>
        <Button type="submit" isLoading={formState.isSubmitting} className="w-full">
          Save Product
        </Button>
      </form>
    </Modal>
  );
}

