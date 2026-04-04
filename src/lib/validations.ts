import { Condition, InquiryType, MeetingType, Role } from "@prisma/client";
import { z } from "zod";

const emailSchema = z.string().email("Invalid email address");

export const signUpSchemaBase = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: emailSchema,
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Terms must be accepted" }),
  }),
});

export const signUpSchema = signUpSchemaBase.refine(
  (data) => data.password === data.confirmPassword,
  {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  },
);

export const inquirySchemaBase = z.object({
  inquiryType: z.nativeEnum(InquiryType),
  description: z.string().max(3000).optional(),
  guestEmail: emailSchema.optional(),
  productIds: z.array(z.string().uuid()).optional(),
  attachmentUrl: z.string().url().optional(),
  attachmentName: z.string().max(255).optional(),
});

const productInquiryRule = (
  val: z.infer<typeof inquirySchemaBase>,
  ctx: z.RefinementCtx,
): void => {
  if (
    val.inquiryType === InquiryType.PRODUCT &&
    (!val.productIds || val.productIds.length === 0)
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["productIds"],
      message: "At least one product is required for product inquiry",
    });
  }
};

export const inquirySchema = inquirySchemaBase.superRefine(productInquiryRule);

export const inquiryGuestSchemaBase = inquirySchemaBase.extend({
  guestEmail: emailSchema,
});

export const inquiryGuestSchema =
  inquiryGuestSchemaBase.superRefine(productInquiryRule);

export const meetingSchemaBase = z.object({
  meetingType: z.nativeEnum(MeetingType),
  description: z.string().max(3000).optional(),
  preferredDate: z.coerce.date().optional(),
  guestEmail: emailSchema.optional(),
  attachmentUrl: z.string().url().optional(),
  attachmentName: z.string().max(255).optional(),
});

export const meetingSchema = meetingSchemaBase;

export const meetingGuestSchemaBase = meetingSchemaBase.extend({
  guestEmail: emailSchema,
});

export const meetingGuestSchema = meetingGuestSchemaBase;

export const quotationSchemaBase = z.object({
  description: z.string().min(10).max(4000),
  specifications: z.string().min(3).max(4000),
  guestEmail: emailSchema.optional(),
  productIds: z.array(z.string().uuid()).optional(),
  attachmentUrl: z.string().url().optional(),
  attachmentName: z.string().max(255).optional(),
});

export const quotationSchema = quotationSchemaBase;

export const userUpdateSchemaBase = z.object({
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

export const userUpdateSchema = userUpdateSchemaBase;

export const productSchemaBase = z.object({
  name: z.string().min(2).max(100),
  origin: z.string().min(2).max(100),
  shape: z.string().min(2).max(50),
  size: z.string().min(1).max(50),
  colorName: z.string().min(2).max(50),
  colorHex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  clarityType: z.string().min(2).max(50),
  weight: z.number().positive(),
  condition: z.nativeEnum(Condition),
  lotQuantity: z.number().int().nonnegative(),
  price: z.number().positive().nullable().optional(),
  availability: z.boolean().optional().default(true),
  images: z.array(z.string().url()).min(1),
});

export const productSchema = productSchemaBase;

export const adminProductSchema = productSchemaBase.extend({
  id: z.string().uuid().optional(),
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(8),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
});
