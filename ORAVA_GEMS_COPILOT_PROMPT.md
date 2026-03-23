# ORAVA GEMS — FULL PROJECT BUILD PROMPT

# For: GitHub Copilot Agent (Claude Opus 4.6)

# Instruction: Read this entire file before writing a single line of code.

# Build everything in the exact order specified. Do not skip any section.

---

## YOUR ROLE

You are a senior full-stack Next.js developer. Your job is to build the complete
ORAVA Gems website — a luxury B2B gemstone export company platform — from scratch,
production-ready, fully functional, zero bugs, zero missing features.

Do NOT ask clarifying questions. Everything you need is in this file.
Build everything completely. Never leave placeholder comments like "// TODO" or
"// implement this later". Every function must be fully implemented.

---

## BUSINESS CONTEXT

ORAVA (Pvt) Ltd is a Sri Lanka-based premium gemstone export company founded in 2006.
They supply precision-cut coloured gemstones (sapphire, ruby, emerald, semi-precious)
to luxury watch and jewelry brands worldwide. Services include CNC cutting, laser cutting,
colour grading, calibration, sourcing, and custom gemstone finishing (0.5mm to 10mm).
They deliver gem parcels within 24 hours worldwide after order completion.
They are registered with SLEDB (Sri Lanka Export Development Board).
Website currency default: USD.
Target clients: Jewelry brands, watch makers, custom product manufacturers worldwide.

---

## TECH STACK — USE EXACTLY THIS, NO SUBSTITUTIONS

- Framework: Next.js 14 (App Router, TypeScript)
- Styling: Tailwind CSS
- Animations: Framer Motion
- Database ORM: Prisma
- Database: PostgreSQL via Supabase
- Authentication: NextAuth.js v5 (beta) with @auth/prisma-adapter
- Image/Video CDN: Cloudinary (next-cloudinary)
- File Storage (attachments): Supabase Storage
- Email: Resend
- Form Validation: React Hook Form + Zod
- UI Primitives: Radix UI
- Icons: Lucide React
- Tables: @tanstack/react-table
- Charts: Recharts
- Utilities: clsx, tailwind-merge, date-fns, uuid
- SEO: next-seo
- Hosting Target: Vercel

---

## ENVIRONMENT VARIABLES

Assume these exist in .env.local. Reference them exactly as written:

```
DATABASE_URL=
DIRECT_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=${process.env.NEXTAUTH_URL}
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@oravagems.com
ADMIN_EMAILS=admin@oravagems.com
NEXT_PUBLIC_GA_ID=
```

---

## EXACT FOLDER STRUCTURE TO CREATE

```
orava-gems/
├── prisma/
│   └── schema.prisma
├── public/
│   ├── images/
│   └── videos/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                        # Home
│   │   │   ├── products/
│   │   │   │   ├── page.tsx                    # Products listing
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx                # Product detail
│   │   │   ├── services/
│   │   │   │   └── page.tsx
│   │   │   ├── customized/
│   │   │   │   └── page.tsx
│   │   │   ├── quotation/
│   │   │   │   └── page.tsx
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   ├── (auth)/
│   │   │   ├── layout.tsx
│   │   │   ├── signin/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       └── page.tsx
│   │   ├── (user)/
│   │   │   ├── layout.tsx
│   │   │   └── profile/
│   │   │       └── page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                        # Dashboard overview
│   │   │   ├── products/
│   │   │   │   └── page.tsx
│   │   │   ├── users/
│   │   │   │   └── page.tsx
│   │   │   ├── inquiries/
│   │   │   │   └── page.tsx
│   │   │   ├── meetings/
│   │   │   │   └── page.tsx
│   │   │   ├── reports/
│   │   │   │   └── page.tsx
│   │   │   ├── audit/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── products/
│   │   │   │   ├── route.ts                    # GET all, POST create
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts                # GET one, PUT update, DELETE
│   │   │   ├── inquiries/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts
│   │   │   │       └── reply/
│   │   │   │           └── route.ts
│   │   │   ├── meetings/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts
│   │   │   │       └── schedule/
│   │   │   │           └── route.ts
│   │   │   ├── users/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── upload/
│   │   │   │   ├── image/
│   │   │   │   │   └── route.ts
│   │   │   │   └── file/
│   │   │   │       └── route.ts
│   │   │   ├── analytics/
│   │   │   │   └── pageview/
│   │   │   │       └── route.ts
│   │   │   └── reports/
│   │   │       ├── generate/
│   │   │       │   └── route.ts
│   │   │       └── send/
│   │   │           └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx                          # Root layout
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── AdminSidebar.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── ColorSwatch.tsx
│   │   │   └── FileUpload.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TrustBadges.tsx
│   │   │   ├── ServicesOverview.tsx
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── WhyOrava.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── CTASection.tsx
│   │   │   └── CertificationsStrip.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   ├── ProductSort.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   └── ProductImageGallery.tsx
│   │   ├── forms/
│   │   │   ├── InquiryForm.tsx
│   │   │   ├── MeetingForm.tsx
│   │   │   ├── QuotationForm.tsx
│   │   │   ├── SignInForm.tsx
│   │   │   ├── SignUpForm.tsx
│   │   │   └── ForgotPasswordForm.tsx
│   │   ├── admin/
│   │   │   ├── DashboardCharts.tsx
│   │   │   ├── ProductTable.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── UserTable.tsx
│   │   │   ├── InquiryKanban.tsx
│   │   │   ├── MeetingTable.tsx
│   │   │   ├── ReportGenerator.tsx
│   │   │   ├── AuditLogTable.tsx
│   │   │   └── EmailTemplateEditor.tsx
│   │   └── providers/
│   │       ├── SessionProvider.tsx
│   │       └── ToastProvider.tsx
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── cloudinary.ts
│   │   ├── supabase.ts
│   │   ├── resend.ts
│   │   ├── utils.ts
│   │   ├── validations.ts
│   │   └── rateLimit.ts
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── useGreeting.ts
│   ├── types/
│   │   ├── index.ts
│   │   └── next-auth.d.ts
│   └── middleware.ts
├── .env.local.example
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## STEP 1 — package.json

Create with all dependencies pre-listed:

```json
{
  "name": "orava-gems",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "^18",
    "react-dom": "^18",
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "@prisma/client": "^5.16.0",
    "prisma": "^5.16.0",
    "next-auth": "5.0.0-beta.20",
    "@auth/prisma-adapter": "^2.4.2",
    "framer-motion": "^11.3.8",
    "resend": "^3.4.0",
    "react-hook-form": "^7.52.1",
    "zod": "^3.23.8",
    "@hookform/resolvers": "^3.9.0",
    "@radix-ui/react-dialog": "^1.1.1",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-toast": "^1.2.1",
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-popover": "^1.1.1",
    "lucide-react": "^0.400.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.4.0",
    "date-fns": "^3.6.0",
    "uuid": "^10.0.0",
    "@types/uuid": "^10.0.0",
    "recharts": "^2.12.7",
    "@tanstack/react-table": "^8.19.3",
    "next-seo": "^6.6.0",
    "next-cloudinary": "^6.10.0",
    "@supabase/supabase-js": "^2.44.4",
    "sharp": "^0.33.4",
    "bcryptjs": "^2.4.3",
    "@types/bcryptjs": "^2.4.6",
    "nodemailer": "^6.9.14",
    "@types/nodemailer": "^6.4.15"
  }
}
```

---

## STEP 2 — PRISMA SCHEMA

File: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id             String    @id @default(uuid())
  email          String    @unique
  firstName      String
  lastName       String
  password       String?
  mobile         String?
  country        String?
  companyName    String?
  companyAddress String?
  companyTP      String?
  role           Role      @default(USER)
  emailVerified  DateTime?
  image          String?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  accounts       Account[]
  sessions       Session[]
  inquiries      Inquiry[]
  meetings       Meeting[]
}

model Account {
  id                String  @id @default(uuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(uuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  @@unique([identifier, token])
}

model Product {
  id               String            @id @default(uuid())
  name             String
  origin           String
  shape            String
  size             String
  colorName        String
  colorHex         String
  polishedType     String
  clarityType      String
  weight           Float
  condition        Condition
  lotQuantity      Int
  price            Float?
  availability     Boolean           @default(true)
  images           String[]
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt
  inquiredProducts InquiredProduct[]
}

model Inquiry {
  id               String            @id @default(uuid())
  inquiryType      InquiryType
  guestEmail       String?
  userId           String?
  user             User?             @relation(fields: [userId], references: [id])
  requestDate      DateTime          @default(now())
  acceptDate       DateTime?
  status           InquiryStatus     @default(PENDING)
  description      String?
  attachmentUrl    String?
  attachmentName   String?
  adminReply       String?
  adminNote        String?
  repliedAt        DateTime?
  inquiredProducts InquiredProduct[]
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt
}

model InquiredProduct {
  id        String  @id @default(uuid())
  inquiryId String
  productId String
  inquiry   Inquiry @relation(fields: [inquiryId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id])
}

model Meeting {
  id            String        @id @default(uuid())
  meetingType   MeetingType
  guestEmail    String?
  userId        String?
  user          User?         @relation(fields: [userId], references: [id])
  requestDate   DateTime      @default(now())
  status        MeetingStatus @default(PENDING)
  description   String?
  attachmentUrl String?
  attachmentName String?
  adminReply    String?
  scheduledAt   DateTime?
  preferredDate DateTime?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

model Service {
  id          String   @id @default(uuid())
  category    String
  title       String
  description String
  imageUrl    String?
  icon        String?
  isActive    Boolean  @default(true)
  sortOrder   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model AuditLog {
  id        String   @id @default(uuid())
  adminId   String
  adminEmail String
  action    String
  target    String
  targetId  String?
  details   String?
  ipAddress String?
  createdAt DateTime @default(now())
}

model PageView {
  id        String   @id @default(uuid())
  page      String
  country   String?
  userAgent String?
  sessionId String?
  createdAt DateTime @default(now())
}

model EmailTemplate {
  id        String   @id @default(uuid())
  name      String   @unique
  subject   String
  body      String
  variables String[]
  updatedAt DateTime @updatedAt
  createdAt DateTime @default(now())
}

model ReportSchedule {
  id           String   @id @default(uuid())
  recipientEmails String[]
  scheduleTime String
  isActive     Boolean  @default(true)
  lastSentAt   DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}

enum Condition {
  NATURAL
  SEMI_PRESSURE
  HEATED
  SYNTHETIC
}

enum InquiryType {
  PRODUCT
  SERVICE
  CUSTOMIZED
  QUOTATION
}

enum InquiryStatus {
  PENDING
  IN_REVIEW
  REPLIED
  CLOSED
}

enum MeetingType {
  SERVICE
  CUSTOMIZED
}

enum MeetingStatus {
  PENDING
  SCHEDULED
  COMPLETED
  CANCELLED
}
```

---

## STEP 3 — CORE LIBRARY FILES

### `src/lib/prisma.ts`

Singleton Prisma client. Handle dev hot-reload correctly with global instance.

### `src/lib/auth.ts`

NextAuth v5 config with:

- PrismaAdapter
- Credentials provider (email + bcryptjs password compare)
- Google provider
- Session strategy: JWT
- Callbacks: add user id, role, firstName, lastName to session and JWT token
- On sign-in: if guest inquiries/meetings exist under user email, link them to user ID

### `src/lib/cloudinary.ts`

- uploadImage(file: File, folder: string): Promise<string>
- deleteImage(publicId: string): Promise<void>
- Use Cloudinary Node SDK server-side only

### `src/lib/supabase.ts`

- Server client using service role key for file operations
- uploadFile(file: File, bucket: string, path: string): Promise<string>
- deleteFile(bucket: string, path: string): Promise<void>
- Bucket name: "orava-attachments"

### `src/lib/resend.ts`

Create these fully implemented email sending functions.
Each returns Promise<void> and handles errors gracefully.
All emails use professional HTML templates with ORAVA branding (dark luxury theme, gold accents #C9A84C):

1. sendWelcomeEmail(to: string, firstName: string): Promise<void>
   Subject: "Welcome to ORAVA Gems — Your Account is Ready"
   Content: Welcome message, company intro, 24hr delivery highlight, login CTA button

2. sendSignInGreetingEmail(to: string, firstName: string): Promise<void>
   Subject: "Welcome Back to ORAVA Gems"
   Content: Greeting, quick links to products and inquiry

3. sendPasswordResetEmail(to: string, resetLink: string): Promise<void>
   Subject: "ORAVA Gems — Password Reset Request"
   Content: Reset instructions, button with link, expiry notice (1 hour)

4. sendInquiryConfirmationEmail(to: string, inquiryDetails: object): Promise<void>
   Subject: "ORAVA Gems — Inquiry Received (#ID)"
   Content: Inquiry details, type, description, products if any, expected response time

5. sendMeetingConfirmationEmail(to: string, meetingDetails: object): Promise<void>
   Subject: "ORAVA Gems — Meeting Request Received (#ID)"
   Content: Meeting type, description, what to expect next

6. sendAdminInquiryReplyEmail(to: string, inquiryId: string, reply: string): Promise<void>
   Subject: "ORAVA Gems — Response to Your Inquiry (#ID)"
   Content: Original inquiry reference, admin reply, contact info

7. sendMeetingScheduledEmail(to: string, meetingId: string, scheduledAt: Date, adminReply: string): Promise<void>
   Subject: "ORAVA Gems — Your Meeting is Scheduled"
   Content: Date and time, meeting details, company contact info

8. sendDailySummaryReport(to: string[], reportData: object): Promise<void>
   Subject: "ORAVA Gems — Daily Summary Report [DATE]"
   Content: New inquiries count, new meetings count, new users count, top products inquired

9. sendQuotationConfirmationEmail(to: string, quotationDetails: object): Promise<void>
   Subject: "ORAVA Gems — Quotation Request Received (#ID)"

### `src/lib/utils.ts`

- cn(...inputs): string — clsx + tailwind-merge
- formatCurrency(amount: number): string — USD format
- formatDate(date: Date): string
- formatDateTime(date: Date): string
- getGreeting(timezone: string): string — returns "Good Morning", "Good Afternoon", "Good Evening"
- generateId(): string — uuid v4
- truncateText(text: string, length: number): string
- isValidEmail(email: string): boolean

### `src/lib/validations.ts`

Complete Zod schemas for:

- signUpSchema (firstName, lastName, email, password min 8 chars, confirmPassword match, terms boolean)
- signInSchema (email, password)
- productSchema (all product fields with correct types and constraints)
- inquirySchema (type, description optional, guestEmail required if not logged in, productIds array optional)
- meetingSchema (type, description optional, preferredDate, guestEmail required if not logged in)
- quotationSchema
- userUpdateSchema
- adminProductSchema

### `src/lib/rateLimit.ts`

Simple in-memory rate limiter for API routes:

- rateLimit(identifier: string, limit: number, window: number): boolean
- Use for inquiry submit, meeting submit, auth endpoints
- limit: 5 requests per window: 60000ms (1 minute) for forms

### `src/types/index.ts`

Export all TypeScript interfaces matching Prisma models:

- ProductWithDetails, InquiryWithDetails, MeetingWithDetails
- UserWithDetails, AdminDashboardStats
- FilterOptions, SortOptions, PaginationOptions
- ApiResponse<T> generic type

### `src/types/next-auth.d.ts`

Extend Session and JWT types to include:

- id, role, firstName, lastName on session.user

---

## STEP 4 — MIDDLEWARE

File: `src/middleware.ts`

Rules:

- /admin/\* → require ADMIN role, redirect to /signin if not authenticated, redirect to / if authenticated but not admin
- /profile/\* → require any authenticated user, redirect to /signin if not
- /api/admin/\* → same admin check, return 401 JSON if not admin
- Track pageview for analytics on every non-API, non-static route (fire and forget POST to /api/analytics/pageview)
- Attach geo country from request headers if available (x-vercel-ip-country)

---

## STEP 5 — API ROUTES

Build all API routes with:

- Full input validation using Zod
- Rate limiting on public-facing endpoints
- Proper HTTP status codes (200, 201, 400, 401, 403, 404, 500)
- Consistent response format: { success: boolean, data?: T, error?: string, message?: string }
- Admin routes: verify ADMIN role before executing
- All routes handle errors with try/catch

### `src/app/api/products/route.ts`

GET: List products with filtering (name, shape, size, colorName, origin, clarityType, polishedType, condition, availability) and sorting (price, lotQuantity, weight, createdAt) and pagination (page, limit default 12)
POST: Admin only — create product

### `src/app/api/products/[id]/route.ts`

GET: Single product with related data
PUT: Admin only — update product
DELETE: Admin only — delete product, also delete images from Cloudinary

### `src/app/api/inquiries/route.ts`

GET: Admin only — list all inquiries with filters
POST: Public — submit inquiry (detect logged-in or guest by session, if guest validate email format, save guestEmail, send confirmation email, send admin notification)

### `src/app/api/inquiries/[id]/route.ts`

GET: Admin only or own inquiry — get single inquiry
PUT: Admin only — update inquiry status

### `src/app/api/inquiries/[id]/reply/route.ts`

POST: Admin only — reply to inquiry, update status to REPLIED, send email to user/guest, log to AuditLog

### `src/app/api/meetings/route.ts`

GET: Admin only — list all meetings
POST: Public — submit meeting request (same guest/auth logic as inquiries)

### `src/app/api/meetings/[id]/route.ts`

GET: Admin or own meeting
PUT: Admin only — update meeting

### `src/app/api/meetings/[id]/schedule/route.ts`

POST: Admin only — schedule meeting with date/time, send email to user/guest

### `src/app/api/users/route.ts`

GET: Admin only — list all users with pagination and search

### `src/app/api/users/[id]/route.ts`

GET: Admin or own profile
PUT: Admin or own profile — update user details
DELETE: Admin only — delete user

### `src/app/api/upload/image/route.ts`

POST: Admin only — upload image to Cloudinary, return secure_url
Accept multipart/form-data, validate file type (jpg, png, webp), max 10MB

### `src/app/api/upload/file/route.ts`

POST: Authenticated or guest — upload attachment to Supabase Storage
Accept multipart/form-data, validate file type (pdf, docx, jpg, png), max 10MB
Return public URL

### `src/app/api/analytics/pageview/route.ts`

POST: Public — save page view to PageView table (page, country from header)
No auth required, fire and forget

### `src/app/api/reports/generate/route.ts`

POST: Admin only — generate report for date range, return stats object

### `src/app/api/reports/send/route.ts`

POST: Admin only — send daily summary email to specified emails

### `src/app/api/auth/[...nextauth]/route.ts`

NextAuth handler. Export GET and POST.

---

## STEP 6 — NEXTAUTH CONFIG DETAILS

In `src/lib/auth.ts` implement:

Credentials provider:

- Find user by email in DB
- Compare password with bcrypt
- Return user object with id, email, firstName, lastName, role
- Throw error if invalid credentials

Google provider:

- On first Google sign in, check if user with that email exists
- If exists (registered by email before), link accounts
- If new, create user with firstName/lastName from Google profile

JWT callback:

- Add id, role, firstName, lastName to token

Session callback:

- Add id, role, firstName, lastName from token to session.user

SignIn callback:

- After successful sign in, find any inquiries/meetings with guestEmail matching user email
- Update them to set userId = user.id and clear guestEmail
- Send sign in greeting email (fire and forget, don't block sign in)

---

## STEP 7 — COMPONENTS

### Navbar (`src/components/layout/Navbar.tsx`)

Full implementation:

- Logo: "ORAVA" in elegant serif-style with gem icon from lucide
- Links: Home, Products, Services, Customized, About, Contact — with active state
- Right side:
  - If NOT logged in: Sign In button (outlined), Sign Up button (gold filled)
  - If logged in: Greeting text using useGreeting hook + user timezone + "Mr./Ms. [FirstName]", Avatar icon button → dropdown (Profile, Sign Out)
- Scroll behavior: transparent with white text on top → dark background on scroll (use useEffect + scroll listener)
- Mobile: hamburger menu with slide-in drawer, all links included
- Admin link in dropdown if role === ADMIN
- Framer Motion: fade-in on mount, smooth dropdown animation
- Use Tailwind for all styling. Dark luxury colors: background #0A0A0A, gold accent #C9A84C

### Footer (`src/components/layout/Footer.tsx`)

Full implementation:

- Logo + tagline: "Beauty Crafted To An Exemplary Standard"
- 24-hour worldwide delivery badge (highlighted)
- Columns: Quick Links, Services, Contact Info
- Contact: Address (Sri Lanka), Email, Phone, Fax
- Social: LinkedIn icon link, SLEDB badge text
- Bottom bar: Copyright, Terms & Conditions link, Privacy Policy link
- Dark theme matching navbar: #0A0A0A background, #C9A84C gold accents

### AdminSidebar (`src/components/layout/AdminSidebar.tsx`)

Full implementation:

- ORAVA Admin logo top
- Navigation items with icons:
  - Dashboard (LayoutDashboard icon)
  - Products (Gem icon)
  - Users (Users icon)
  - Inquiries (MessageSquare icon)
  - Meetings (Calendar icon)
  - Reports (BarChart3 icon)
  - Audit Log (Shield icon)
  - Settings (Settings icon)
- Active link highlighted with gold
- Collapsed/expanded toggle
- Sign out button at bottom

---

## STEP 8 — HOME PAGE (`src/app/(public)/page.tsx`)

Build all these sections with Framer Motion animations. Use viewport-triggered animations (whileInView). All animations must be smooth and performance-optimized.

### Section 1: Hero

- Full-viewport height
- Background: dark with subtle geometric pattern or gradient overlay
- Center content with staggered animation:
  - Small badge: "Sri Lanka's Premier Gemstone Exporter"
  - H1: "Beauty Crafted To An Exemplary Standard" (large, elegant font)
  - Subtext about precision-cut coloured gemstones since 2006
  - Two CTA buttons: "Explore Collection" (gold filled) + "Request Inquiry" (outlined)
- Floating animated gem particles or subtle bokeh effect using CSS

### Section 2: Trust Badges

- Horizontal strip with animated count-up numbers:
  - "18+" Years of Excellence
  - "500+" Satisfied Clients
  - "50+" Countries Served
  - "24 Hours" Worldwide Delivery
- Dark card style with gold icon each

### Section 3: Services Overview

- "Our Services" heading with gold underline accent
- Grid of 4 service cards (animated on scroll):
  - Cutting & Calibration
  - Stone Sourcing
  - Colour Grading & Matching
  - Quality Assurance
- Each card: icon, title, short description, hover lift effect

### Section 4: Featured Products

- "Latest Collection" heading
- Horizontal scrollable carousel of latest 6 products from /api/products?limit=6&sort=createdAt
- Each card: product image, name, origin, shape, availability badge
- "View All Products" button at end

### Section 5: Why ORAVA

- Two column: text left, animated visual right
- Points: 24hr delivery, Computer Vision QA, Precision cutting, Trusted since 2006, SLEDB registered

### Section 6: CTA Banner

- Full-width dark gold gradient banner
- "Ready to Source Premium Gemstones?"
- Two buttons: "Make an Inquiry" + "Request a Meeting"
- Both link to quotation page

### Section 7: Certifications Strip

- Logos/text strip: SLEDB, founded year badge, "Trusted by luxury watch & jewelry brands"

---

## STEP 9 — PRODUCTS PAGE (`src/app/(public)/products/page.tsx`)

Full implementation:

- Page loads latest products first (sort by createdAt desc)
- Left sidebar: Filter panel with all filter options
- Main area: Product grid (3 columns desktop, 2 tablet, 1 mobile)
- Top bar: result count, sort dropdown, grid/list view toggle
- Pagination at bottom (12 per page)
- All filtering/sorting via URL search params (useSearchParams) — shareable filtered URLs
- Loading skeleton while fetching
- Empty state when no results

Filter panel options (each as proper UI control):

- Gemstone Name (text search)
- Shape (checkbox group: Round, Oval, Cushion, Emerald Cut, Pear, Marquise, Cabochon, Baguette, Bead)
- Size (range slider or multi-select)
- Color (color swatch picker)
- Origin (checkbox group: Sri Lanka, Madagascar, Burma, Thailand, Colombia, etc.)
- Clarity (checkbox group)
- Polish Type (checkbox group)
- Condition (checkbox group: Natural, Semi Pressure, Heated, Synthetic)
- Availability (toggle: All / Available Only)

Sort options:

- Newest First (default)
- Price: Low to High
- Price: High to Low
- Weight: Low to High
- Weight: High to Low
- Lot Quantity

ProductCard component:

- Image with hover zoom
- Availability badge (green/red)
- Name, origin, shape
- Color swatch dot
- Weight, size
- Price (show if set, else "Contact for Price")
- "View Details" button → navigate to /products/[id]
- "Quick Inquiry" button → opens InquiryForm modal pre-filled with this product

---

## STEP 10 — PRODUCT DETAIL PAGE (`src/app/(public)/products/[id]/page.tsx`)

Full implementation:

- Image gallery (large main image + thumbnails row, click to switch)
- All specifications in clean grid layout:
  - Origin, Shape, Size, Weight, Color (name + hex swatch)
  - Clarity, Polish Type, Condition badge, Lot Quantity
  - Price (if set) or "Contact for Price"
  - Availability status
- "Make Inquiry" button → InquiryForm modal pre-filled
- "Request Quotation" button → QuotationForm modal
- "Back to Products" link
- Related products section (same origin or shape, limit 4)

---

## STEP 11 — SERVICES PAGE (`src/app/(public)/services/page.tsx`)

Full implementation:

- Hero section: luxury dark background, "Our Services" heading, tagline about precision
- Service cards in alternating layout (image left text right, then right left):
  - CNC Premium Cutting & Finishing
  - Laser Cutting
  - Size Range: 0.5mm to 10mm precision
  - Custom Diagram Cutting
  - Gem Finishing & Polishing
  - Colour Grading & Matching
  - Stone Sourcing & Quality Assurance
  - Calibration & Measurement
- Each service: image/icon, title, description, two buttons:
  - "Make Inquiry" (opens InquiryForm with type=SERVICE pre-filled)
  - "Request Meeting" (opens MeetingForm with type=SERVICE pre-filled)
- Process section: Our workflow step by step (Submit → Review → Confirm → Deliver)
- Bottom CTA section

---

## STEP 12 — CUSTOMIZED PRODUCT PAGE (`src/app/(public)/customized/page.tsx`)

Full implementation:

- Hero: "Bespoke Gemstone Solutions" — luxury dark hero
- Capability showcase:
  - Any custom diagram or shape
  - 0.5mm to 10mm ultra-precision finishing
  - Computer Vision quality check
  - 24hr delivery after completion
- Gallery: grid of custom work examples (placeholder images with Cloudinary)
- Technology section: tools and precision tech we use
- Two large CTA buttons:
  - "Submit Custom Inquiry" → InquiryForm with type=CUSTOMIZED
  - "Schedule a Consultation" → MeetingForm with type=CUSTOMIZED
- Process: How custom orders work (5 steps)

---

## STEP 13 — INQUIRY FORM (`src/components/forms/InquiryForm.tsx`)

Props: { type?: InquiryType, prefilledProductId?: string, isOpen: boolean, onClose: () => void }

Full implementation:

- Detect session: if logged in, use user data; if not logged in, show email field (validated as proper email format)
- Fields:
  - Type selector (Product / Service / Customized / Quotation) — preselect from props
  - Description textarea (optional)
  - Product selector: if type=PRODUCT, show searchable product dropdown (multi-select), preselect from props
  - File attachment: accept .pdf .docx .jpg .png, max 10MB, upload to Supabase on submit
  - Guest email field (only shown if not logged in) — required, validate email format
  - Terms checkbox
- On submit:
  - Validate with Zod
  - Upload attachment if present
  - POST to /api/inquiries
  - Show success toast
  - Close modal
  - Send confirmation email (handled in API)
- Animate in/out with Framer Motion

---

## STEP 14 — MEETING FORM (`src/components/forms/MeetingForm.tsx`)

Props: { type?: MeetingType, isOpen: boolean, onClose: () => void }

Full implementation:

- Same guest/logged-in detection as InquiryForm
- Fields:
  - Meeting type (Service / Customized)
  - Preferred date/time (date picker)
  - Description (optional)
  - File attachment (same as inquiry)
  - Guest email if not logged in
- On submit: POST to /api/meetings, send confirmation email

---

## STEP 15 — QUOTATION PAGE (`src/app/(public)/quotation/page.tsx`)

Full page (not modal) with:

- Hero: "Request a Quotation"
- Guest/auth detection
- Fields: Product selection (optional), description, specifications, file attachment, contact email for guest
- Submit → /api/inquiries with type=QUOTATION
- Confirmation message shown after submit

---

## STEP 16 — ABOUT PAGE (`src/app/(public)/about/page.tsx`)

Full implementation:

- Hero section
- Company story: Founded 2006, growth timeline with animated vertical line
- Mission & Values (animated cards)
- Certifications & Awards section (badges/cards)
- SLEDB membership highlighted
- Mother company details section
- Director & Executive team cards (name, title, photo placeholder)
- Industry experience stats (animated count-up)

---

## STEP 17 — CONTACT PAGE (`src/app/(public)/contact/page.tsx`)

Full implementation:

- Google Maps embed (iframe with Sri Lanka coordinates for Colombo)
- Contact details card:
  - Full address
  - Phone numbers (TP)
  - Fax number
  - Email address
  - LinkedIn profile link (lucide icon)
  - SLEDB badge
- Quick contact form: Name, Email, Message → POST to /api/inquiries with type=QUOTATION
- Office hours information

---

## STEP 18 — AUTH PAGES

### Sign Up (`src/app/(auth)/signup/page.tsx`)

- Fields: First Name, Last Name, Email, Password, Confirm Password, Google Sign Up button, Terms & Conditions checkbox (required)
- Validation: Zod signUpSchema
- On success: redirect to home, send welcome email
- Link to Sign In

### Sign In (`src/app/(auth)/signin/page.tsx`)

- Fields: Email, Password, Google Sign In button, Forgot Password link
- On success: redirect to home or previous page
- Link to Sign Up

### Forgot Password

- Email field → send reset email with Resend
- Store reset token in VerificationToken table

---

## STEP 19 — USER PROFILE PAGE (`src/app/(user)/profile/page.tsx`)

Full implementation (requires auth):

- Avatar with edit option (Cloudinary upload)
- Personal info form (editable): First Name, Last Name, Mobile, Country
- Company info section (editable, optional): Company Name, Address, TP
- Change password section
- Inquiry history:
  - Table with columns: ID, Type, Status, Date, Products
  - Filter by Type, Status, Date range
  - Click row → expand details including admin reply
- Meeting history:
  - Same table structure
  - Filter by Type, Status, Date
  - Click row → expand details with scheduled time and admin reply

---

## STEP 20 — ADMIN LAYOUT (`src/app/admin/layout.tsx`)

- Check ADMIN role, redirect if not authorized
- Sidebar + main content layout
- Sidebar: AdminSidebar component
- Header: admin name, notification bell (count of pending inquiries), sign out
- Responsive: sidebar collapses on mobile

---

## STEP 21 — ADMIN DASHBOARD (`src/app/admin/page.tsx`)

Full dashboard with Recharts:

Chart 1: Daily Website Visitors (last 30 days)

- Line chart
- X-axis: dates, Y-axis: count
- Data from PageView table grouped by day

Chart 2: Country-wise Users

- Bar chart horizontal
- Top 10 countries
- Data from User.country field

Chart 3: Inquiries by Type

- Pie chart / donut chart
- PRODUCT, SERVICE, CUSTOMIZED, QUOTATION segments
- With legend

Chart 4: Meetings by Status

- Bar chart
- PENDING, SCHEDULED, COMPLETED, CANCELLED

Chart 5: Monthly Inquiry Trend

- Area chart (last 6 months)

Summary cards row at top:

- Total Users (with growth % vs last month)
- Pending Inquiries (with urgent badge if >10)
- Pending Meetings
- Total Products

Recent activity feed: last 10 inquiries and meetings

---

## STEP 22 — ADMIN PRODUCTS (`src/app/admin/products/page.tsx`)

Full CRUD table:

- DataTable with @tanstack/react-table
- Columns: Image thumbnail, Name, Origin, Shape, Color (swatch), Condition, Price, Availability toggle, Actions
- Search bar (by name, origin)
- Filter by condition, availability
- Pagination

Add/Edit Product Modal:

- All product fields
- Image upload (multiple, drag-drop, Cloudinary)
- Color picker for hex value
- Number inputs with validation
- Availability toggle
- Save → POST or PUT to API

Delete: confirmation dialog before delete

Bulk actions: select multiple → bulk delete, bulk toggle availability

---

## STEP 23 — ADMIN USERS (`src/app/admin/users/page.tsx`)

Full user management:

- DataTable: Name, Email, Country, Company, Role, Joined Date, Actions
- Search by name or email
- Filter by role, country
- View user details drawer/modal
- Edit user (change role, edit details)
- Delete user (with confirmation)
- View user's inquiries and meetings inline

---

## STEP 24 — ADMIN INQUIRIES (`src/app/admin/inquiries/page.tsx`)

Kanban board view:

- Four columns: Pending | In Review | Replied | Closed
- Each card: Inquiry ID, type badge, guest/user email, date, description preview, product count
- Drag between columns to change status (or dropdown in card)
- Click card → full detail modal:
  - All inquiry details
  - User/guest info
  - Products inquired
  - Attachment download link
  - Internal admin note field
  - Reply form: rich text or textarea → send reply email + update status
- Filter above board: by type, date range
- Table view toggle (DataTable alternative view)

---

## STEP 25 — ADMIN MEETINGS (`src/app/admin/meetings/page.tsx`)

DataTable view:

- Columns: ID, Type, User/Guest email, Preferred Date, Status, Actions
- Filter by status, type, date
- Click row → detail modal:
  - All meeting details
  - Attachment download
  - "Schedule Meeting" button: set date/time → send email to user
  - "Cancel" button with reason field → send cancellation email
  - "Mark Complete" button

---

## STEP 26 — ADMIN REPORTS (`src/app/admin/reports/page.tsx`)

Full implementation:

- Date range picker (from/to)
- "Generate Report" button → calls /api/reports/generate → shows stats
- Report output shows:
  - Total inquiries in period (by type breakdown)
  - Total meetings (by status)
  - New users registered
  - Most inquired products
  - Inquiry response time average
- Export to CSV button
- Email schedule section:
  - Add/remove recipient emails
  - Set daily send time
  - Toggle auto-send on/off
  - "Send Now" button for immediate send

---

## STEP 27 — ADMIN AUDIT LOG (`src/app/admin/audit/page.tsx`)

- DataTable: Admin Email, Action, Target, Details, IP Address, Timestamp
- Filter by admin, action type, date range
- Readonly — no edit/delete of audit logs
- Auto-log these admin actions: product create/edit/delete, user delete/role change, inquiry reply, meeting schedule, report send

---

## STEP 28 — ADMIN SETTINGS (`src/app/admin/settings/page.tsx`)

- Email template editor: list of templates, click to edit subject and body (textarea with variable hints like {{firstName}}, {{inquiryId}})
- Save templates to EmailTemplate table
- Report schedule management
- Admin email access management (add/remove admin emails — update ADMIN_EMAILS env or store in DB)
- Low availability alerts: set threshold for lot quantity, toggle notifications

---

## STEP 29 — useGreeting HOOK (`src/hooks/useGreeting.ts`)

```typescript
// Returns greeting based on user's local time
// "Good Morning! Mr. [firstName]" / "Good Afternoon! Mr. [firstName]" / "Good Evening! Mr. [firstName]"
// 5am-11:59am = Morning, 12pm-4:59pm = Afternoon, 5pm-4:59am = Evening
// Use Intl.DateTimeFormat to detect timezone
```

---

## STEP 30 — SEO SETUP

`next.config.js`:

- Images: allow cloudinary domain, supabase domain
- Headers: security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)

Root layout.tsx metadata:

```typescript
export const metadata = {
  title: { default: "ORAVA Gems — Premium Gemstone Export | Sri Lanka", template: "%s | ORAVA Gems" },
  description: "ORAVA (Pvt) Ltd — Sri Lanka's premier precision-cut coloured gemstone exporter since 2006. Sapphires, rubies, emeralds for luxury watch and jewelry brands worldwide. 24-hour worldwide delivery.",
  keywords: ["gemstones", "sapphire", "ruby", "emerald", "Sri Lanka gems", "precision cut gems", "luxury gemstones"],
  openGraph: { ... },
  robots: { index: true, follow: true }
}
```

Each page: unique title and description in metadata export.

Add `next-sitemap` for auto sitemap generation on build.

---

## STEP 31 — GLOBAL STYLES (`src/app/globals.css`)

```css
/* Custom properties */
:root {
  --gold: #c9a84c;
  --gold-light: #e8c97a;
  --dark: #0a0a0a;
  --dark-surface: #111111;
  --dark-elevated: #1a1a1a;
  --text-primary: #f5f5f5;
  --text-secondary: #a0a0a0;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
/* Font imports: use next/font with Cormorant Garamond (headings) + Inter (body) */

/* Luxury selection color */
::selection {
  background: var(--gold);
  color: var(--dark);
}
```

---

## STEP 32 — TAILWIND CONFIG (`tailwind.config.ts`)

Extend theme with:

- Colors: gold (#C9A84C), gold-light (#E8C97A), dark (#0A0A0A), dark-surface (#111111), dark-elevated (#1A1A1A)
- Font families: heading (Cormorant Garamond), body (Inter)
- Custom animations: shimmer, float, pulse-gold
- Custom keyframes for those animations
- Content paths including src/\*\*

---

## STEP 33 — NEXT.CONFIG.JS

```javascript
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" }, // Google avatars
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
```

---

## STEP 34 — ADDITIONAL PAGES

### Terms & Conditions (`src/app/(public)/terms/page.tsx`)

Full placeholder terms page for ORAVA Gems covering: service usage, inquiry terms, privacy, delivery terms.

### Privacy Policy (`src/app/(public)/privacy/page.tsx`)

Full placeholder privacy policy covering: data collection (email, usage analytics), how it's used, GDPR rights, cookie usage.

### 404 Page (`src/app/not-found.tsx`)

Luxury styled 404 with ORAVA branding, "Page Not Found" message, back to home button, animated gem icon.

---

## STEP 35 — COOKIE CONSENT

Create `src/components/ui/CookieConsent.tsx`:

- Bottom bar appearing on first visit (stored in localStorage)
- "This site uses cookies for analytics. Accept or Decline."
- Accept → set GA cookie consent
- Decline → disable GA
- Link to Privacy Policy

Add to root layout.

---

## CRITICAL IMPLEMENTATION RULES

1. NEVER use `any` TypeScript type — always use proper typed interfaces
2. NEVER leave empty catch blocks — always log errors properly
3. ALL database calls must be inside try/catch
4. ALL API routes must validate input with Zod before processing
5. ALL file uploads must validate file type and size before accepting
6. ALL emails are fire-and-forget (don't await email sends in user-facing flows unless critical)
7. ALL admin actions must be logged to AuditLog table
8. ALL Framer Motion animations must use `will-change: transform` and avoid layout-triggering properties for performance
9. ALL images must use next/image component with proper width/height or fill + sizes
10. NEVER expose sensitive env variables to client (no NEXT*PUBLIC* prefix on secrets)
11. Guest inquiry email merging must happen on EVERY sign-in (credentials + Google), not just sign-up
12. Rate limiting must be applied to: /api/inquiries POST, /api/meetings POST, /api/auth sign-in
13. The admin dashboard route /admin must be completely inaccessible to non-admin users at middleware level
14. All forms must show loading state while submitting (disable button, show spinner)
15. All API responses must be consistent format: { success, data?, error?, message? }
16. Use server components where possible, client components only where interactivity is needed
17. Prisma client must be singleton (global instance in dev to avoid hot-reload connection issues)

---

## BUILD ORDER — EXECUTE IN THIS EXACT SEQUENCE

```
1.  Create package.json and run npm install
2.  Create next.config.js
3.  Create tailwind.config.ts
4.  Create tsconfig.json
5.  Create prisma/schema.prisma
6.  Create .env.local.example
7.  Create src/types/index.ts
8.  Create src/types/next-auth.d.ts
9.  Create src/lib/prisma.ts
10. Create src/lib/auth.ts
11. Create src/lib/cloudinary.ts
12. Create src/lib/supabase.ts
13. Create src/lib/resend.ts (all email functions)
14. Create src/lib/utils.ts
15. Create src/lib/validations.ts
16. Create src/lib/rateLimit.ts
17. Create src/middleware.ts
18. Create src/hooks/useGreeting.ts
19. Create src/hooks/useDebounce.ts
20. Create src/app/globals.css
21. Create src/app/layout.tsx (root layout with fonts, metadata, providers)
22. Create src/app/not-found.tsx
23. Create src/components/providers/SessionProvider.tsx
24. Create src/components/providers/ToastProvider.tsx
25. Create src/components/ui/* (all UI primitives)
26. Create src/components/layout/Navbar.tsx
27. Create src/components/layout/Footer.tsx
28. Create src/components/layout/AdminSidebar.tsx
29. Create all API routes (Step 5 order)
30. Create src/components/forms/InquiryForm.tsx
31. Create src/components/forms/MeetingForm.tsx
32. Create src/components/forms/QuotationForm.tsx
33. Create src/components/forms/SignInForm.tsx
34. Create src/components/forms/SignUpForm.tsx
35. Create src/components/forms/ForgotPasswordForm.tsx
36. Create src/components/home/* (all home sections)
37. Create src/components/products/*
38. Create src/app/(auth)/layout.tsx
39. Create src/app/(auth)/signin/page.tsx
40. Create src/app/(auth)/signup/page.tsx
41. Create src/app/(public)/layout.tsx
42. Create src/app/(public)/page.tsx (home)
43. Create src/app/(public)/products/page.tsx
44. Create src/app/(public)/products/[id]/page.tsx
45. Create src/app/(public)/services/page.tsx
46. Create src/app/(public)/customized/page.tsx
47. Create src/app/(public)/quotation/page.tsx
48. Create src/app/(public)/about/page.tsx
49. Create src/app/(public)/contact/page.tsx
50. Create src/app/(public)/terms/page.tsx
51. Create src/app/(public)/privacy/page.tsx
52. Create src/app/(user)/layout.tsx
53. Create src/app/(user)/profile/page.tsx
54. Create src/components/admin/*
55. Create src/app/admin/layout.tsx
56. Create src/app/admin/page.tsx
57. Create src/app/admin/products/page.tsx
58. Create src/app/admin/users/page.tsx
59. Create src/app/admin/inquiries/page.tsx
60. Create src/app/admin/meetings/page.tsx
61. Create src/app/admin/reports/page.tsx
62. Create src/app/admin/audit/page.tsx
63. Create src/app/admin/settings/page.tsx
64. Create src/components/ui/CookieConsent.tsx and add to root layout
65. Create .gitignore
```

---

## MANUAL SETUP STEPS (Do These Yourself Before Running — Not Code Tasks)

These are external service configurations you must complete manually:

1. SUPABASE: Create project → get DATABASE_URL (pooling mode) and DIRECT_URL (transaction mode) → create storage bucket named "orava-attachments" → set bucket policy to allow authenticated and anon reads, authenticated writes
2. CLOUDINARY: Create account → get Cloud Name, API Key, API Secret from dashboard
3. GOOGLE OAUTH: console.cloud.google.com → Create project → Enable Google+ API → Create OAuth credentials → Add ${process.env.NEXTAUTH_URL}/api/auth/callback/google as authorized redirect URI
4. RESEND: Create account → verify domain (or use sandbox for testing) → get API key
5. VERCEL: Connect GitHub repo after development is complete
6. Run these after filling .env.local:
   - npx prisma db push
   - npx prisma generate

---

## FINAL CHECKLIST BEFORE DELIVERING CODE

Before you finish writing any file, verify:

- [ ] All imports are correct and files being imported actually exist
- [ ] All TypeScript types are properly defined
- [ ] All Prisma relations match the schema
- [ ] All environment variables are referenced correctly
- [ ] No hardcoded credentials or secrets
- [ ] All forms have loading and error states
- [ ] All API routes return consistent response format
- [ ] Admin routes have role checks
- [ ] Guest inquiry logic handles both logged-in and guest scenarios
- [ ] Email functions are called appropriately after each action
- [ ] AuditLog is written for every admin action
- [ ] Rate limiting is applied on public form endpoints
- [ ] All images use next/image
- [ ] All animations use Framer Motion correctly
- [ ] Mobile responsiveness on all pages

---

START BUILDING NOW. Begin with Step 1 (package.json) and proceed in exact order.
Do not summarize or plan. Write complete, working code for every file.

```

```
