# ORAVA Gems — Project Status Report

**Generated:** 2026-05-18
**Branch:** `main` (clean, up to date with `origin/main`)
**Repository:** `orava-gem-store-web`

---

## Section 1 — Project Metadata

| Field | Value |
|---|---|
| **Name** | `orava-gems` |
| **Version** | `1.0.0` |
| **Private** | `true` |
| **Node engine** | _not specified in `package.json`_ |

### npm Scripts

| Script | Command |
|---|---|
| `dev` | `next dev` |
| `build` | `prisma generate && next build` |
| `start` | `next start` |
| `lint` | `next lint` |
| `db:push` | `prisma db push` |
| `db:generate` | `prisma generate` |
| `db:studio` | `prisma studio` |
| `postbuild` | `next-sitemap` |

### Production Dependencies (exact specifier from `package.json`)

| Package | Version |
|---|---|
| `@auth/prisma-adapter` | `^2.4.2` |
| `@hookform/resolvers` | `^3.9.0` |
| `@prisma/client` | `6.19.2` |
| `@radix-ui/react-checkbox` | `^1.1.1` |
| `@radix-ui/react-dialog` | `^1.1.1` |
| `@radix-ui/react-dropdown-menu` | `^2.1.1` |
| `@radix-ui/react-label` | `^2.1.0` |
| `@radix-ui/react-popover` | `^1.1.1` |
| `@radix-ui/react-select` | `^2.1.1` |
| `@radix-ui/react-tabs` | `^1.1.0` |
| `@radix-ui/react-toast` | `^1.2.1` |
| `@supabase/supabase-js` | `^2.101.1` |
| `@tanem/react-nprogress` | `^6.0.3` |
| `@tanstack/react-table` | `^8.19.3` |
| `bcryptjs` | `^2.4.3` |
| `cloudinary` | `^2.4.0` |
| `clsx` | `^2.1.1` |
| `date-fns` | `^3.6.0` |
| `framer-motion` | `^11.3.8` |
| `lucide-react` | `^0.400.0` |
| `next` | `^15.5.14` |
| `next-auth` | `5.0.0-beta.30` |
| `next-cloudinary` | `^6.10.0` |
| `next-seo` | `^6.6.0` |
| `next-sitemap` | `^4.2.3` |
| `postcss` | `^8` |
| `react` | `^18` |
| `react-dom` | `^18` |
| `react-hook-form` | `^7.52.1` |
| `recharts` | `^2.12.7` |
| `resend` | `^3.4.0` |
| `sharp` | `^0.33.4` |
| `tailwind-merge` | `^2.6.1` |
| `tailwindcss` | `^3.4.1` |
| `uuid` | `^10.0.0` |
| `zod` | `^3.23.8` |
| `zustand` | `^5.0.12` |

### Dev Dependencies

| Package | Version |
|---|---|
| `@types/bcryptjs` | `^2.4.6` |
| `@types/node` | `^20.19.39` |
| `@types/react` | `^18` |
| `@types/react-dom` | `^18` |
| `@types/uuid` | `^10.0.0` |
| `autoprefixer` | `^10.0.1` |
| `eslint` | `^8.57.1` |
| `eslint-config-next` | `^15.5.14` |
| `prisma` | `^6.19.3` |
| `typescript` | `^5` |

---

## Section 2 — Tech Stack Actual Versions

| Library | Specifier | Notes |
|---|---|---|
| `next` | `^15.5.14` | App Router, React 18 |
| `react` / `react-dom` | `^18` | |
| `typescript` | `^5` | |
| `tailwindcss` | `^3.4.1` | |
| `framer-motion` | `^11.3.8` | |
| `next-auth` | `5.0.0-beta.30` | Auth.js v5 beta |
| `@auth/prisma-adapter` | `^2.4.2` | |
| `prisma` | `^6.19.3` (devDep) | Generator runs in `build` |
| `@prisma/client` | `6.19.2` | Pinned exact |
| `zustand` | `^5.0.12` | |
| `@tanstack/react-table` | `^8.19.3` | |
| `@tanstack/react-query` | **not installed** | |
| `recharts` | `^2.12.7` | |
| `react-hook-form` | `^7.52.1` | |
| `zod` | `^3.23.8` | |
| `resend` | `^3.4.0` | |
| `cloudinary` | `^2.4.0` | server SDK |
| `next-cloudinary` | `^6.10.0` | URL/component helpers |
| `@supabase/supabase-js` | `^2.101.1` | Used for file uploads |
| `bcryptjs` | `^2.4.3` | |
| `lucide-react` | `^0.400.0` | |

### Radix UI Packages Installed

`react-checkbox`, `react-dialog`, `react-dropdown-menu`, `react-label`, `react-popover`, `react-select`, `react-tabs`, `react-toast`.

---

## Section 3 — Database Schema

**Provider:** `postgresql`
**URLs:** `DATABASE_URL` (pooled), `DIRECT_URL` (direct/migration).
**Generator:** `prisma-client-js`.

### Models

#### `User`
- `id` (uuid, pk), `email` (unique), `firstName`, `lastName`, `password?`, `mobile?`, `country?`, `companyName?`, `companyAddress?`, `companyTP?`
- `role` (`Role`, default `USER`), `emailVerified?`, `image?`
- `createdAt`, `updatedAt`
- Relations: `accounts[]`, `sessions[]`, `inquiries[]`, `meetings[]`

#### `Account` (NextAuth)
- Standard NextAuth/OAuth fields. `userId → User.id` (cascade delete).
- Unique: `(provider, providerAccountId)`

#### `Session`
- `sessionToken` (unique), `userId → User.id` (cascade delete), `expires`.

#### `VerificationToken`
- `identifier`, `token` (unique), `expires`. Unique `(identifier, token)`.

#### `Product`
- `id`, `name`, `origin`, `shape`, `size`, `colorName`, `colorHex`
- `clarityType`, `weight` (Float), `condition` (`Condition`), `lotQuantity` (Int), `price?` (Float)
- `availability` (default `true`), `images[]` (String[])
- `createdAt`, `updatedAt`
- Relations: `inquiredProducts[]`

#### `Inquiry`
- `id`, `inquiryType` (`InquiryType`), `guestEmail?`, `userId?` → User
- `requestDate`, `acceptDate?`, `status` (`InquiryStatus`, default `PENDING`)
- `description?`, `attachmentUrl?`, `attachmentName?`
- `adminReply?`, `adminNote?`, `repliedAt?`
- `inquiredProducts[]`, `createdAt`, `updatedAt`

#### `InquiredProduct` (join)
- `inquiryId → Inquiry` (cascade), `productId → Product` (cascade)

#### `Meeting`
- `id`, `meetingType` (`MeetingType`), `guestEmail?`, `userId?`
- `requestDate`, `status` (`MeetingStatus`, default `PENDING`)
- `description?`, `attachmentUrl?`, `attachmentName?`
- `adminReply?`, `scheduledAt?`, `preferredDate?`
- `createdAt`, `updatedAt`

#### `Service`
- `id`, `category`, `title`, `description`, `imageUrl?`, `icon?`, `isActive` (default true), `sortOrder`, timestamps.

#### `FieldValue`
- `id`, `fieldType`, `value`, `createdAt`
- Unique `(fieldType, value)`, index on `fieldType`.

#### `AuditLog`
- `id`, `adminId`, `adminEmail`, `action`, `target`, `targetId?`, `details?`, `ipAddress?`, `createdAt`.

#### `PageView`
- `id`, `page`, `country?`, `userAgent?`, `sessionId?`, `createdAt`.

#### `EmailTemplate`
- `id`, `name` (unique), `subject`, `body`, `variables[]`, timestamps.

#### `ReportSchedule`
- `id`, `recipientEmails[]`, `scheduleTime`, `isActive`, `lastSentAt?`, timestamps.

### Enums

| Enum | Values |
|---|---|
| `Role` | `USER`, `ADMIN` |
| `Condition` | `NATURAL`, `SEMI_PRESSURE`, `HEATED`, `SYNTHETIC` |
| `InquiryType` | `PRODUCT`, `SERVICE`, `CUSTOMIZED`, `QUOTATION` |
| `InquiryStatus` | `PENDING`, `IN_REVIEW`, `REPLIED`, `CLOSED` |
| `MeetingType` | `SERVICE`, `CUSTOMIZED` |
| `MeetingStatus` | `PENDING`, `SCHEDULED`, `COMPLETED`, `CANCELLED` |

### Indexes / Unique Constraints (notable)

- `User.email` unique
- `Account (provider, providerAccountId)` unique
- `Session.sessionToken` unique
- `VerificationToken.token` unique; composite unique `(identifier, token)`
- `FieldValue (fieldType, value)` unique; `@@index([fieldType])`
- `EmailTemplate.name` unique

---

## Section 4 — Project File Structure

```
src/
├── app/
│   ├── (auth)/          # Sign-in, sign-up, password reset flows
│   │   ├── layout.tsx
│   │   ├── signin/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   ├── (public)/        # Public marketing + storefront pages
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Home
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── services/page.tsx
│   │   ├── quotation/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── products/
│   │       ├── layout.tsx
│   │       ├── page.tsx             # Products listing
│   │       └── [id]/page.tsx        # Product detail
│   ├── (user)/          # Authenticated user area
│   │   ├── layout.tsx
│   │   └── profile/page.tsx
│   ├── admin/           # Admin dashboard pages
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── audit/page.tsx
│   │   ├── inquiries/page.tsx
│   │   ├── meetings/page.tsx
│   │   ├── products/page.tsx
│   │   ├── reports/page.tsx
│   │   ├── settings/page.tsx
│   │   └── users/page.tsx
│   ├── api/             # All REST endpoints (see Section 5)
│   ├── layout.tsx       # Root layout, SessionProvider, metadata
│   ├── error.tsx
│   └── not-found.tsx
├── components/
│   ├── admin/           # Admin tables, charts, forms, kanban
│   ├── forms/           # Sign-in/up, inquiry, meeting, quotation forms
│   ├── home/            # Home page sections
│   ├── layout/          # Navbar, Footer, AdminSidebar
│   ├── products/        # Product listing & detail components
│   ├── providers/       # SessionProvider, ToastProvider
│   └── ui/              # Reusable primitives + Aceternity effects
├── hooks/
│   ├── useDebounce.ts
│   ├── useGreeting.ts
│   └── useLocalStorage.ts
├── lib/
│   ├── api.ts           # Response helpers + requireAdmin
│   ├── audit.ts         # Audit log helper
│   ├── auth.ts          # NextAuth config
│   ├── cloudinary.ts    # Server SDK upload/delete
│   ├── cloudinary-url.ts# Direct URL builder
│   ├── prisma.ts        # Prisma singleton
│   ├── rateLimit.ts     # In-memory rate limiter
│   ├── resend.ts        # Email senders
│   ├── supabase.ts      # File upload to Supabase storage
│   ├── utils.ts
│   └── validations.ts   # Zod schemas
├── store/
│   └── quotationStore.ts  # Zustand quotation cart
├── types/
│   ├── index.ts
│   └── next-auth.d.ts     # NextAuth module augmentation
└── middleware.ts        # /admin & /profile session gate

prisma/
└── schema.prisma

public/
├── images/.gitkeep
├── images/logo.png.png
├── videos/.gitkeep
├── logo-placeholder.svg
├── robots.txt
├── sitemap.xml
└── sitemap-0.xml
```

---

## Section 5 — API Routes Inventory

> Authentication legend: `pub` = public, `auth` = any signed-in user, `admin` = `requireAdmin()` (or equivalent role check).

| Path | Methods | Auth | Description |
|---|---|---|---|
| `/api/auth/[...nextauth]` | `GET`, `POST` | pub | NextAuth handlers (re-exports `handlers`) |
| `/api/auth/forgot-password` | `POST` | pub | Generates reset token + sends Resend email |
| `/api/auth/reset-password` | `POST` | pub | Consumes token, bcrypt-hashes new password |
| `/api/users/register` | `POST` | pub | Creates user, hashes password, sends welcome email |
| `/api/users` | `GET` | admin | Paginated user list with search |
| `/api/users/[id]` | `GET`, `PUT`, `DELETE` | auth (self) / admin | Self-read/update; admin can delete + change role (audited) |
| `/api/products` | `GET`, `POST` | pub GET / admin POST | Filter/sort/paginate; admin creates |
| `/api/products/[id]` | `GET`, `PUT`, `DELETE` | pub GET / admin PUT,DELETE | Admin mutations cleanup Cloudinary on delete (audited) |
| `/api/inquiries` | `GET`, `POST` | admin GET / pub POST (rate-limited) | Customer/guest creates; admin lists |
| `/api/inquiries/[id]` | `GET`, `PUT` | own/admin GET / admin PUT | Status & note updates (audited) |
| `/api/inquiries/[id]/reply` | `POST` | admin | Sends Resend reply email, marks `REPLIED` (audited) |
| `/api/meetings` | `GET`, `POST` | admin GET / pub POST (rate-limited) | Customer/guest creates; admin lists |
| `/api/meetings/[id]` | `GET`, `PUT` | own/admin GET / admin PUT | Update (audited) |
| `/api/meetings/[id]/schedule` | `POST` | admin | Sets `scheduledAt`, sends scheduled email (audited) |
| `/api/upload/image` | `POST` | admin | Cloudinary image upload (≤10 MB, jpeg/png/webp) |
| `/api/upload/file` | `POST` | auth | Supabase storage upload (pdf/docx/jpeg/png ≤10 MB) |
| `/api/field-values` | `GET`, `POST` | pub GET / admin POST | Dropdown values store |
| `/api/field-values/[id]` | `DELETE` | admin | Remove dropdown entry |
| `/api/analytics/pageview` | `POST` | pub | Records `PageView` row |
| `/api/admin/notification-counts` | `GET` | admin | Pending meeting/inquiry counters |
| `/api/admin/email-templates` | `PUT` | admin | Update `EmailTemplate` row |
| `/api/admin/verify-passkey` | `POST` | admin + rate-limit | Validates `ADMIN_PASSKEY` env value |
| `/api/reports/generate` | `POST` | admin | Aggregates stats for a date range |
| `/api/reports/send` | `POST` | admin | Sends daily summary via Resend (audited) |

---

## Section 6 — Public Pages Inventory

| Route | File | Description | Render | Auth |
|---|---|---|---|---|
| `/` | `src/app/(public)/page.tsx` | Home — server component composed of client sections | Server | none |
| `/about` | `src/app/(public)/about/page.tsx` | About ORAVA | Static | none |
| `/services` | `src/app/(public)/services/page.tsx` | Services overview + mosaic banner | Static | none |
| `/contact` | `src/app/(public)/contact/page.tsx` | Revamped contact UI | Static | none |
| `/products` | `src/app/(public)/products/page.tsx` | Filterable/sortable listing | Static (filters client-side) | none |
| `/products/[id]` | `src/app/(public)/products/[id]/page.tsx` | Product detail + gallery + inquiry CTA | Dynamic | none |
| `/quotation` | `src/app/(public)/quotation/page.tsx` | Quotation cart submission | Static | none (guest allowed) |
| `/privacy` | `src/app/(public)/privacy/page.tsx` | Privacy policy | Static | none |
| `/terms` | `src/app/(public)/terms/page.tsx` | Terms of service | Static | none |
| `/signin` | `src/app/(auth)/signin/page.tsx` | Credentials + Google sign-in | Dynamic | none |
| `/signup` | `src/app/(auth)/signup/page.tsx` | Account registration | Static | none |
| `/forgot-password` | `src/app/(auth)/forgot-password/page.tsx` | Request reset link | Static | none |
| `/reset-password` | `src/app/(auth)/reset-password/page.tsx` | Apply token + new password | Static | none |
| `/profile` | `src/app/(user)/profile/page.tsx` | User profile + history | Dynamic | required |

> `/customized` does **NOT** exist (removed in commit `5c8f503`).

---

## Section 7 — Admin Pages Inventory

| Route | File | Description | Filters | Tables | Charts |
|---|---|---|---|---|---|
| `/admin` | `src/app/admin/page.tsx` | Dashboard shell with overview + charts | – | yes | yes (`DashboardCharts`) |
| `/admin/products` | `src/app/admin/products/page.tsx` | Product CRUD (largest admin route — 27.4 kB) | yes | yes (`ProductTable`) | – |
| `/admin/users` | `src/app/admin/users/page.tsx` | User management (15.9 kB) | yes | yes (`UserTable`) | – |
| `/admin/inquiries` | `src/app/admin/inquiries/page.tsx` | Inquiry kanban + reply | yes | yes (`InquiryKanban`) | – |
| `/admin/meetings` | `src/app/admin/meetings/page.tsx` | Meeting management | yes | yes (`MeetingTable`) | – |
| `/admin/reports` | `src/app/admin/reports/page.tsx` | Date-range report generator + send | yes | – | yes |
| `/admin/audit` | `src/app/admin/audit/page.tsx` | Audit log viewer | yes | yes (`AuditLogTable`) | – |
| `/admin/settings` | `src/app/admin/settings/page.tsx` | Email templates + admin emails | – | – | – |

Admin layout: `src/app/admin/layout.tsx` (sidebar + passkey gate via `PasskeyGate`).

---

## Section 8 — Component Inventory

### `components/layout/`
| File | Description | Client |
|---|---|---|
| `Navbar.tsx` | Top navigation with cart dropdown & auth menu | yes |
| `Footer.tsx` | Site footer | – |
| `AdminSidebar.tsx` | Admin nav rail with notification counts | yes |

### `components/ui/`
| File | Description | Client |
|---|---|---|
| `Button.tsx`, `Input.tsx`, `Select.tsx`, `Card.tsx`, `Badge.tsx`, `Modal.tsx`, `Toast.tsx`, `Loader.tsx`, `Logo.tsx` | Base primitives | mixed |
| `AutoImageSlider.tsx` | Carousel | yes |
| `BackToDashboardButton.tsx` | Admin back nav | yes |
| `ColorSwatch.tsx` | Color preview chip | – |
| `CookieConsent.tsx` | Consent banner | yes |
| `FileUpload.tsx` | Multi-format file picker | yes |
| `QuotationCartDropdown.tsx` | Cart dropdown bound to Zustand store | yes |
| `ScrollReveal.tsx` | Framer-motion reveal wrapper | yes |
| `SmartDropdown.tsx` | Field-value dropdown (DB-backed) | yes |
| `aceternity/BackgroundGradientAnimation.tsx`, `BentoGrid.tsx`, `Card3D.tsx`, `InfiniteMovingCards.tsx`, `NumberTicker.tsx`, `SpotlightEffect.tsx`, `TextGenerateEffect.tsx`, `TracingBeam.tsx` | Aceternity-style FX | yes |

### `components/home/`
| File | Description | Client |
|---|---|---|
| `HeroSection.tsx` | 5-slide hero with framer-motion transitions | yes |
| `FeaturedProducts.tsx` / `FeaturedProductsCarousel.tsx` | Featured products row | yes |
| `GemstoneHighlights.tsx` | Highlights mosaic | yes |
| `OurCapabilities.tsx` | Capabilities section | yes |
| `WhyOrava.tsx` | Why-ORAVA value props | yes |
| `OurProcess.tsx` | Process timeline | yes |
| `CTASection.tsx` | Bottom CTA | – |
| `CertificationsLogos.tsx` / `CertificationsStrip.tsx` | Cert badges | – |
| `ServicesOverview.tsx`, `Testimonials.tsx`, `TrustBadges.tsx` | Optional/legacy sections | mixed |

### `components/products/`
| File | Description | Client |
|---|---|---|
| `ProductGrid.tsx` | Grid with pagination | yes |
| `ProductCard.tsx` | Listing card | yes |
| `ProductDetail.tsx` | Detail layout | yes |
| `ProductImageGallery.tsx` | Lightbox-style gallery | yes |
| `ProductSort.tsx` | Sort selector | yes |
| `FilterSortPanel.tsx` | Combined filter panel | yes |

### `components/admin/`
| File | Description | Client |
|---|---|---|
| `AdminDashboardShell.tsx` | Dashboard composition | yes |
| `DashboardCharts.tsx` | Recharts charts | yes |
| `ProductTable.tsx`, `UserTable.tsx`, `MeetingTable.tsx`, `AuditLogTable.tsx` | `@tanstack/react-table` tables | yes |
| `InquiryKanban.tsx` | Kanban view by status | yes |
| `ProductForm.tsx` | Create/edit form | yes |
| `EmailTemplateEditor.tsx` | Template editor | yes |
| `ReportGenerator.tsx` | Range picker + generate/send | yes |
| `PasskeyGate.tsx` | Admin passkey wall | yes |

### `components/forms/`
| File | Description | Client |
|---|---|---|
| `SignInForm.tsx`, `SignUpForm.tsx`, `ForgotPasswordForm.tsx` | Auth forms | yes |
| `InquiryForm.tsx`, `MeetingForm.tsx`, `QuotationForm.tsx` | Submission forms | yes |

### `components/providers/`
| File | Description | Client |
|---|---|---|
| `SessionProvider.tsx` | NextAuth session provider | yes |
| `ToastProvider.tsx` | Radix toast viewport | yes |

---

## Section 9 — Environment Variables Used

| Variable | Used in | Purpose |
|---|---|---|
| `DATABASE_URL` | `prisma/schema.prisma` | Postgres connection (pooled) |
| `DIRECT_URL` | `prisma/schema.prisma` | Postgres direct connection |
| `NEXTAUTH_URL` | `src/middleware.ts`, `src/app/layout.tsx`, `src/lib/resend.ts`, `src/app/api/auth/forgot-password/route.ts`, `next-sitemap.config.js` | Canonical base URL |
| `NEXTAUTH_SECRET` | `src/lib/auth.ts` | NextAuth JWT secret |
| `GOOGLE_CLIENT_ID` | `src/lib/auth.ts` | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | `src/lib/auth.ts` | Google OAuth |
| `ADMIN_EMAILS` | `src/app/api/inquiries/route.ts`, `src/app/api/meetings/route.ts`, `src/app/admin/settings/page.tsx` | Admin notification recipients |
| `ADMIN_PASSKEY` | `src/app/api/admin/verify-passkey/route.ts` | Admin gate |
| `RESEND_API_KEY` | `src/lib/resend.ts` | Resend SDK |
| `RESEND_FROM_EMAIL` | `src/lib/resend.ts` | Email sender address |
| `CLOUDINARY_CLOUD_NAME` | `src/lib/cloudinary.ts` | Cloudinary server SDK |
| `CLOUDINARY_API_KEY` | `src/lib/cloudinary.ts` | Cloudinary server SDK |
| `CLOUDINARY_API_SECRET` | `src/lib/cloudinary.ts` | Cloudinary server SDK |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `src/lib/cloudinary-url.ts` | Client-side URL building |
| `NEXT_PUBLIC_SUPABASE_URL` | `src/lib/supabase.ts` | Supabase storage |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `src/lib/supabase.ts` | Supabase storage (client) |
| `SUPABASE_SERVICE_ROLE_KEY` | `src/lib/supabase.ts` | Supabase storage (server) |
| `NODE_ENV` | `src/lib/prisma.ts` | Dev-only logging + singleton |
| `SITE_URL` | `next-sitemap.config.js` | Sitemap base URL |
| `VERCEL_URL` | `next-sitemap.config.js` | Sitemap base URL fallback |

---

## Section 10 — Email Functions (`src/lib/resend.ts`)

All emails are sent through a single `sendEmail` helper that no-ops when `RESEND_API_KEY` is missing.

| Function | Subject | Recipient(s) | Triggered by |
|---|---|---|---|
| `sendWelcomeEmail` | `Welcome to ORAVA Gems — Beauty Crafted To An Exemplary Standard` | customer | `POST /api/users/register` |
| `sendPasswordResetEmail` | `ORAVA Gems — Password Reset Request` | customer | `POST /api/auth/forgot-password` |
| `sendInquiryConfirmationEmail` | `ORAVA Gems — Inquiry Received (#id)` + admin copy `New Inquiry — #id` | customer **and** `info@oravagems.com` | `POST /api/inquiries` |
| `sendMeetingConfirmationEmail` | `ORAVA Gems — Meeting Request Received (#id)` + admin copy | customer **and** `info@oravagems.com` | `POST /api/meetings` |
| `sendAdminInquiryReplyEmail` | `ORAVA Gems — Response to Your Inquiry (#id)` | customer | `POST /api/inquiries/[id]/reply` |
| `sendMeetingScheduledEmail` | `ORAVA Gems — Your Meeting Has Been Scheduled` | customer | `POST /api/meetings/[id]/schedule` |
| `sendAdminInquiryNotificationEmail` | `ORAVA Gems — New Inquiry Alert (#id)` | admin emails from `ADMIN_EMAILS` | `POST /api/inquiries` |
| `sendAdminMeetingNotificationEmail` | `ORAVA Gems — New Meeting Request (#id)` | admin emails from `ADMIN_EMAILS` | `POST /api/meetings` |
| `sendDailySummaryReport` | `ORAVA Gems — Daily Summary Report` | configured recipients | `POST /api/reports/send` |

All triggers verified — every exported sender has at least one call site in the codebase.

---

## Section 11 — Authentication Setup

### `src/lib/auth.ts`

- **Adapter:** `PrismaAdapter(prisma)` (typed as `Adapter`).
- **Session strategy:** `jwt` (not database sessions).
- **`trustHost: true`** — required for Vercel previews.
- **Providers:**
  - `Credentials` — uses `signInSchema`, `rateLimit(\`auth:<email>\`, 5, 60_000)`, `bcrypt.compare`.
  - `Google` — `allowDangerousEmailAccountLinking: true`; custom `profile()` splits name into first/last; forces `role: "USER"`.
- **Callbacks implemented:** `signIn`, `jwt`, `session`. **No** `redirect` callback.
  - `signIn`: For Google, upserts the user; for Credentials, looks up by email. In both cases, **claims any prior guest inquiries/meetings** (`updateMany guestEmail = email, userId = null`).
  - `jwt`: Stores `id`, `firstName`, `lastName`, `role`; refreshes from DB if any are missing.
  - `session`: Maps token claims onto `session.user.{id,role,firstName,lastName}`.
- **Admin email check:** Not configured by hardcoded email list. Admin status is derived from `User.role === "ADMIN"` (set in DB). `ADMIN_EMAILS` env is only used for **notifications**, not authorization.
- **Custom pages:** only `signIn: "/signin"`. No custom `signUp`/`error` page registered with NextAuth.
- **Secret:** `process.env.NEXTAUTH_SECRET`.

### `src/middleware.ts`

- **Protected routes:** any path starting with `/admin` or `/profile`.
- **Auth check:** presence of cookie `authjs.session-token` **or** `__Secure-authjs.session-token` (no JWT decoding; cookie presence only).
- **On miss:** redirect to `/signin?callbackUrl=<absolute-pathname>`, using `NEXTAUTH_URL` when valid else request origin.
- **Matcher:** `["/((?!_next/static|_next/image|favicon.ico).*)"]` — runs on virtually every request.

---

## Section 12 — Recent Changes (Last 20 Commits)

```
456666f Add services banner mosaic and update sitemap timestamps
d4b7cb4 Revamp contact page UI and update sitemap
a237110 Add contact layout & redesign contact page
6b59382 Update sitemap timestamps and reorder entries
8adbfe4 Update About page content & sitemap timestamps
b1c0a43 Revamp About page UI and update sitemap timestamps
3b9bae6 Remove CraftQualityShowcase and update sitemap
4af752b Add CraftQualityShowcase and update sitemaps
89a27d9 Update sitemap timestamps and team image
a1241ec Adjust exit animation for HeroSection content
cef21e1 Refine hero animations, responsive media, and logo sizes
5c8f503 Remove 'Customized' page and links
ea490e0 Use direct Cloudinary URLs and tweak sitemap config
61d103d Update assets and sitemaps; remove MarqueeTicker
573e487 Merge branch 'main' of https://github.com/Nirmana-KAS/orava-gem-store-web
d4ad9df Bump deps and regenerate lockfile
8268fc8 Add Cloudinary URL helper, refactor images & emails
87aee84 Remove polishedType from products
f69762a Bump Prisma to ^6.19.3 and update sitemap
a5e81ff Remove prompt, update README, add products layout
```

Recent themes: marketing-page revamps (About, Contact, Services), Cloudinary migration to direct URLs, removal of the legacy `Customized` page and `MarqueeTicker`, hero animation polish.

---

## Section 13 — Uncommitted Changes

```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

- **Modified, unstaged:** none
- **Staged, uncommitted:** none
- **Untracked:** none
- **Branch:** `main` — 0 commits ahead / 0 commits behind `origin/main`.

---

## Section 14 — Build Health (`npm run build`)

**Result:** ✅ **Build succeeded.** `next-sitemap` postbuild also completed.

- Prisma Client generated in **144 ms** (v6.19.3).
- Next.js **15.5.14** — compiled in **25.0 s**.
- Static pages: **39 / 39** generated.
- Middleware bundle: **34.3 kB**.
- Shared first-load JS: **102 kB** (`chunks/1255-…` 45.7 kB + `4bd1b696-…` 54.2 kB + 2.05 kB other).

### Page sizes (selected)

| Route | Size | First Load JS |
|---|---|---|
| `/` (static) | 18.7 kB | 181 kB |
| `/about` | 412 B | 148 kB |
| `/contact` | 8.53 kB | 201 kB |
| `/products` | 9.57 kB | 156 kB |
| `/products/[id]` (dyn) | 2.72 kB | 165 kB |
| `/quotation` | 2.82 kB | 158 kB |
| `/services` | 924 B | 161 kB |
| `/signin` (dyn) | 2.23 kB | 161 kB |
| `/signup` | 2.51 kB | 161 kB |
| `/admin` (dyn) | 112 kB | 226 kB |
| `/admin/products` (dyn) | 27.4 kB | 237 kB |
| `/admin/users` (dyn) | 15.9 kB | 159 kB |
| `/admin/inquiries` / `/admin/meetings` (dyn) | 2.69 kB | 146 kB |
| `/admin/reports` (dyn) | 2.31 kB | 116 kB |
| `/admin/settings` (dyn) | 1.54 kB | 116 kB |
| `/admin/audit` (dyn) | 713 B | 115 kB |
| All `/api/*` route handlers | 214 B | 102 kB |

### Counts

- **Pages built:** 39 (mix of static `○` and dynamic `ƒ`).
- **API route handlers:** 24.

### Warnings / Errors

- **No Next/TypeScript errors or compile warnings.**
- **Runtime DB errors during static collection** (non-fatal — build completed): six `prisma:error` lines from `user.count`, `inquiry.count`, `meeting.count`, `product.count`, `emailTemplate.upsert`, `auditLog.findMany`, all with `FATAL: (ENOTFOUND) tenant/user postgres.qxzqddlqfkyqrovwmgmi not found`. **Cause:** the `.env` `DATABASE_URL` points at a Supabase tenant unreachable from the current machine. These calls run inside dynamic admin pages during page-data collection; Next still ships them as dynamic (`ƒ`), so production is unaffected.

---

## Section 15 — TypeScript Health (`npx tsc --noEmit`)

**Result:** ✅ **0 errors.**

(Only output was an `npm notice` about a newer `npm` version — informational.)

---

## Section 16 — Current Feature Status

### Home Page (`src/app/(public)/page.tsx`)

| Section | Status |
|---|---|
| Hero | ✅ `HeroSection` — **5 slides** (Cloudinary-hosted, 5 distinct framer-motion animations) |
| Marquee ticker | ❌ Removed (commit `61d103d`) |
| Featured Products | ✅ `FeaturedProducts` |
| Gemstone Highlights | ✅ `GemstoneHighlights` |
| Our Capabilities | ✅ `OurCapabilities` |
| Why ORAVA | ✅ `WhyOrava` |
| Our Process | ✅ `OurProcess` |
| CTA Section | ✅ `CTASection` |
| Certifications | ✅ `CertificationsLogos` (the older `CertificationsStrip.tsx` still exists in `components/home/` but is not imported by the home page) |

### Public Pages

| Page | Status |
|---|---|
| `/products` with filters | ✅ (`FilterSortPanel`, `ProductGrid`, `ProductSort`) |
| `/products/[id]` detail | ✅ (`ProductDetail`, `ProductImageGallery`) |
| `/services` | ✅ |
| `/about` | ✅ |
| `/contact` | ✅ (recently revamped) |
| `/quotation` | ✅ |
| `/customized` | ❌ Correctly absent (removed in commit `5c8f503`) |
| `/profile` | ✅ (auth-gated) |
| `/signin` | ✅ |
| `/signup` | ✅ |
| `/forgot-password` | ✅ |
| `/reset-password` | ✅ |

### Admin Pages

| Page | Status |
|---|---|
| `/admin` overview | ✅ (dashboard shell + charts) |
| `/admin/products` | ✅ |
| `/admin/users` | ✅ |
| `/admin/inquiries` | ✅ (kanban) |
| `/admin/meetings` | ✅ |
| `/admin/reports` | ✅ |
| `/admin/audit` | ✅ |
| `/admin/settings` | ✅ |

---

## Section 17 — Pending Issues

Repository-wide search for `TODO`, `FIXME`, `HACK`, `@deprecated` under `src/`: **0 matches.**

There are no annotated tech-debt markers in source. The only known operational caveat is the build-time Prisma `ENOTFOUND` (Section 14), driven by the `.env` `DATABASE_URL` value, not by source code.

---

## File Confirmation

- **Path:** `c:\Users\sheha\Documents\GitHub\orava-gem-store-web\PROJECT_STATUS_REPORT.md`
- **Status:** created successfully
- **Size & line count:** see confirmation below.
