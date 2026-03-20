import type {
  Inquiry,
  InquiredProduct,
  Meeting,
  Product,
  Role,
  User,
  InquiryType,
  MeetingStatus,
  MeetingType,
  Condition,
} from "@prisma/client";

export interface ProductWithDetails extends Product {
  inquiredProducts?: (InquiredProduct & { inquiry?: Inquiry })[];
}

export interface InquiryWithDetails extends Inquiry {
  user?: User | null;
  inquiredProducts: (InquiredProduct & { product: Product })[];
}

export interface MeetingWithDetails extends Meeting {
  user?: User | null;
}

export interface UserWithDetails extends User {
  inquiries?: Inquiry[];
  meetings?: Meeting[];
}

export interface AdminDashboardStats {
  totalUsers: number;
  pendingInquiries: number;
  pendingMeetings: number;
  totalProducts: number;
  growthUsersPercent: number;
}

export interface FilterOptions {
  search?: string;
  name?: string;
  shape?: string[];
  size?: string | string[];
  colorName?: string | string[];
  origin?: string[];
  clarityType?: string[];
  polishedType?: string[];
  condition?: Condition[];
  availability?: boolean;
}

export interface SortOptions {
  field: "price" | "lotQuantity" | "weight" | "createdAt";
  direction: "asc" | "desc";
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface InquiryInput {
  inquiryType: InquiryType;
  guestEmail?: string;
  description?: string;
  attachmentUrl?: string;
  attachmentName?: string;
  productIds?: string[];
}

export interface MeetingInput {
  meetingType: MeetingType;
  guestEmail?: string;
  description?: string;
  preferredDate?: string;
  attachmentUrl?: string;
  attachmentName?: string;
}

export interface ReportStats {
  inquiriesByType: Record<InquiryType, number>;
  meetingsByStatus: Record<MeetingStatus, number>;
  newUsers: number;
  topProducts: { name: string; count: number }[];
  averageInquiryResponseHours: number;
}

export interface AuthUserBase {
  id: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
}

