import { Condition, InquiryType, MeetingType, Role } from "@prisma/client";
import { z } from "zod";

const emailSchema = z.string().email("Invalid email address");

export const signUpSchema = z
  .object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: emailSchema,
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8),
    terms: z.literal(true, { errorMap: () => ({ message: "Terms must be accepted" }) }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(8),
});

export const productSchema = z.object({
  name: z.string().min(2).max(100),
  origin: z.string().min(2).max(100),
  shape: z.string().min(2).max(50),
  size: z.string().min(1).max(50),
  colorName: z.string().min(2).max(50),
  colorHex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  polishedType: z.string().min(2).max(50),
  clarityType: z.string().min(2).max(50),
  weight: z.number().positive(),
  condition: z.nativeEnum(Condition),
  lotQuantity: z.number().int().nonnegative(),
  price: z.number().positive().nullable().optional(),
  availability: z.boolean().optional().default(true),
  images: z.array(z.string().url()).min(1),
});

export const inquirySchema = z
  .object({
    inquiryType: z.nativeEnum(InquiryType),
    description: z.string().max(3000).optional(),
    guestEmail: emailSchema.optional(),
    productIds: z.array(z.string().uuid()).optional(),
    attachmentUrl: z.string().url().optional(),
    attachmentName: z.string().max(255).optional(),
  })
  .superRefine((val, ctx) => {
    if (val.inquiryType === InquiryType.PRODUCT && (!val.productIds || val.productIds.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["productIds"],
        message: "At least one product is required for product inquiry",
      });
    }
  });

export const meetingSchema = z.object({
  meetingType: z.nativeEnum(MeetingType),
  description: z.string().max(3000).optional(),
  preferredDate: z.coerce.date().optional(),
  guestEmail: emailSchema.optional(),
  attachmentUrl: z.string().url().optional(),
  attachmentName: z.string().max(255).optional(),
});

export const inquiryGuestSchema = inquirySchema.extend({
  guestEmail: emailSchema,
});

export const meetingGuestSchema = meetingSchema.extend({
  guestEmail: emailSchema,
});

export const quotationSchema = z.object({
  description: z.string().min(10).max(4000),
  specifications: z.string().min(3).max(4000),
  guestEmail: emailSchema.optional(),
  productIds: z.array(z.string().uuid()).optional(),
  attachmentUrl: z.string().url().optional(),
  attachmentName: z.string().max(255).optional(),
});

export const userUpdateSchema = z.object({
  firstName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
  mobile: z.string().max(30).optional().nullable(),
  country: z.string().max(100).optional().nullable(),
  companyName: z.string().max(100).optional().nullable(),
  companyAddress: z.string().max(255).optional().nullable(),
  companyTP: z.string().max(50).optional().nullable(),
  image: z.string().url().optional().nullable(),
  role: z.nativeEnum(Role).optional(),
});

export const adminProductSchema = productSchema.extend({
  id: z.string().uuid().optional(),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
});

