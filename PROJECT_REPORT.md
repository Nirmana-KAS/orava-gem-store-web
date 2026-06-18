# ORAVA Gems Store — Full Project Report

**Project:** ORAVA Gems Store — Web Application
**Repository:** `orava-gem-store-web`
**Package name:** `orava-gems` (v1.0.0, private)
**Report date:** 2026-06-18
**Prepared from:** Source code, Prisma schema, configuration, and Git history analysis

---

## 1. Executive Summary

ORAVA Gems Store is a **full-stack, production-oriented web application** built for ORAVA (Pvt) Ltd, a premium precision-cut coloured gemstone exporter based in Sri Lanka (established 2006). The application combines:

- A **public, animation-rich storefront** to showcase gemstones and the company's services.
- A **customer-facing inquiry / quotation / meeting system** usable by both guests and registered users.
- A **complete admin panel (CRM + back office)** for product management, customer relations, audit logging, analytics, email templating, and report generation.

The project is built on **Next.js 15 (App Router) + TypeScript + PostgreSQL (Supabase) + Prisma**, and is configured for deployment on **Vercel**.

**Overall status:** The application is **feature-complete and in an advanced, mature state**. Almost all core business modules (auth, products, inquiries, meetings, admin dashboard, reporting, audit logging) are implemented. Recent development has shifted from building features toward **UI/UX polish** (hero visuals, gem rendering, services layout, mobile responsiveness). The main outstanding gap is the **absence of an automated test suite and CI/CD pipeline**.

---

## 2. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | ^15.5.14 |
| Language | TypeScript | ^5 |
| UI runtime | React / React DOM | ^18 |
| Database | PostgreSQL (via Supabase) | — |
| ORM | Prisma Client | 6.19.2 (CLI ^6.19.3) |
| Authentication | NextAuth.js (Auth.js) v5 | 5.0.0-beta.30 |
| Auth adapter | @auth/prisma-adapter | ^2.4.2 |
| Styling | Tailwind CSS | ^3.4.1 |
| Animations | Framer Motion | ^11.3.8 |
| UI primitives | Radix UI (dialog, dropdown, select, tabs, toast, popover, checkbox, label) | ^1.x–2.x |
| Custom UI | Aceternity-style components (bespoke) | — |
| State management | Zustand | ^5.0.12 |
| Forms / validation | react-hook-form ^7.52 + Zod ^3.23 + @hookform/resolvers | — |
| Tables | @tanstack/react-table | ^8.19 |
| Charts | Recharts | ^2.12 |
| Image uploads | Cloudinary + next-cloudinary | ^2.4 / ^6.10 |
| File storage | Supabase Storage (@supabase/supabase-js) | ^2.101 |
| Email | Resend API | ^3.4 |
| Image processing | sharp | ^0.33 |
| Password hashing | bcryptjs | ^2.4 |
| SEO | next-seo + next-sitemap | ^6.6 / ^4.2 |
| Icons | lucide-react | ^0.400 |
| Utilities | clsx, tailwind-merge, date-fns, uuid | — |

**Dev tooling:** ESLint ^8.57 (`eslint-config-next`), TypeScript types for node/react/bcryptjs/uuid, autoprefixer, postcss.

---

## 3. Codebase Metrics

| Metric | Value |
|--------|-------|
| Total `.ts` / `.tsx` files (in `src/`) | **169** |
| Total lines of code (`src/`) | **~16,168** |
| React components | **85** |
| App Router pages | **22** |
| API route handlers | **24** |
| Prisma models | **13** |
| Prisma enums | **6** |
| Git commits | **91** |
| Contributors | **1** (Shehan Nirmana) |
| Branches | `main` only (clean working tree) |

---

## 4. Architecture & Project Structure

The project uses the **Next.js App Router** with **route groups** to separate concerns:

```
src/
├── app/
│   ├── (auth)/        → signin, signup, forgot-password, reset-password
│   ├── (public)/      → home, products, product detail, quotation, privacy, terms
│   ├── (user)/        → profile (authenticated end-users)
│   ├── admin/         → dashboard, products(implicit), users, inquiries,
│   │                    meetings, reports, audit, settings
│   ├── api/           → 24 route handlers (see §6)
│   ├── layout.tsx     → root layout (fonts, providers, cookie consent)
│   ├── error.tsx      → global error boundary
│   └── not-found.tsx  → 404 page
├── components/
│   ├── admin/         → dashboard shell, tables, kanban, editors, passkey gate
│   ├── forms/         → sign in/up, inquiry, meeting, quotation, forgot-password
│   ├── home/          → hero, featured products, capabilities, process, CTA, etc.
│   ├── layout/        → admin sidebar (+ public header/footer)
│   ├── products/      → grid, image gallery, sort
│   ├── providers/     → SessionProvider, ToastProvider
│   └── ui/            → design system (Button, Card, Input, Modal, Toast…)
│       └── aceternity/→ premium animated components (3D card, spotlight, etc.)
├── lib/               → auth, prisma, supabase, cloudinary, resend, audit,
│                        rateLimit, validations, utils, products/* helpers
├── hooks/             → useDebounce, useGreeting, useLocalStorage
├── store/             → quotationStore (Zustand)
├── types/             → index.ts, next-auth.d.ts
└── middleware.ts      → route protection
```

### Key cross-cutting modules (`src/lib`)
- **`auth.ts`** — NextAuth v5 configuration (Credentials + Google OAuth), JWT session strategy, account linking, and guest→user inquiry/meeting migration on sign-in.
- **`prisma.ts`** — singleton Prisma client.
- **`supabase.ts`** — Supabase client for file storage.
- **`cloudinary.ts` / `cloudinary-url.ts`** — image upload & URL helpers.
- **`resend.ts`** — transactional email delivery.
- **`audit.ts`** — admin action audit logging.
- **`rateLimit.ts`** — in-memory rate limiting (used on auth & sensitive endpoints).
- **`validations.ts`** — centralized Zod schemas.
- **`products/`** — dedicated data, filter, store, and adapter logic for the product catalog.

---

## 5. Data Model (Prisma Schema)

**Datasource:** PostgreSQL with pooled `DATABASE_URL` + `DIRECT_URL` (Supabase). **13 models, 6 enums.**

### Models
1. **User** — id, email (unique), firstName/lastName, optional password, mobile, country, companyName/Address/TP, `role` (USER/ADMIN), emailVerified, image, timestamps. Relations: accounts, sessions, inquiries, meetings.
2. **Account** — NextAuth OAuth account linkage (provider tokens), unique `[provider, providerAccountId]`, cascade delete.
3. **Session** — NextAuth session tokens.
4. **VerificationToken** — email verification / password reset tokens.
5. **Product** — name, origin, shape, size, colorName, colorHex, clarityType, weight (Float), `condition` enum, lotQuantity, optional price, availability flag, `images String[]`, timestamps; relation to inquired products.
6. **Inquiry** — `inquiryType` enum, guestEmail OR userId, request/accept dates, `status` enum, description, attachment (url+name), adminReply, adminNote, repliedAt; relation to inquired products.
7. **InquiredProduct** — join table between Inquiry and Product (cascade delete both sides).
8. **Meeting** — `meetingType` enum, guest/user linkage, request date, `status` enum, description, attachment, adminReply, scheduledAt, preferredDate.
9. **Service** — category, title, description, imageUrl, icon, isActive, sortOrder (CMS-style services content).
10. **FieldValue** — dynamic dropdown values keyed by `fieldType` (unique `[fieldType, value]`, indexed) — powers admin-configurable form options.
11. **AuditLog** — adminId/email, action, target, targetId, details, ipAddress, timestamp.
12. **PageView** — analytics: page, country, userAgent, sessionId, timestamp.
13. **EmailTemplate** — named templates with subject, body, variables (editable in admin).
14. **ReportSchedule** — recipient emails, schedule time, active flag, lastSentAt (scheduled report dispatch).

### Enums
- **Role:** USER, ADMIN
- **Condition:** NATURAL, SEMI_PRESSURE, HEATED, SYNTHETIC
- **InquiryType:** PRODUCT, SERVICE, CUSTOMIZED, QUOTATION
- **InquiryStatus:** PENDING, IN_REVIEW, REPLIED, CLOSED
- **MeetingType:** SERVICE, CUSTOMIZED
- **MeetingStatus:** PENDING, SCHEDULED, COMPLETED, CANCELLED

---

## 6. API Surface (24 Route Handlers)

| Area | Routes |
|------|--------|
| **Auth** | `auth/[...nextauth]`, `auth/forgot-password`, `auth/reset-password` |
| **Users** | `users`, `users/[id]`, `users/register` |
| **Products** | `products`, `products/[id]` |
| **Inquiries** | `inquiries`, `inquiries/[id]`, `inquiries/[id]/reply` |
| **Meetings** | `meetings`, `meetings/[id]`, `meetings/[id]/schedule` |
| **Admin** | `admin/email-templates`, `admin/notification-counts`, `admin/verify-passkey` |
| **Field values** | `field-values`, `field-values/[id]` |
| **Reports** | `reports/generate`, `reports/send` |
| **Uploads** | `upload/image` (Cloudinary), `upload/file` (Supabase) |
| **Analytics** | `analytics/pageview` |

---

## 7. Feature Breakdown

### 7.1 Public Storefront
- **Home page** composed of modular sections: `HeroSection` (interactive/animated gem visuals), `FeaturedProducts`, `GemstoneHighlights`, `OurCapabilities`, `WhyOrava`, `OurProcess`, `CTASection`, `CertificationsLogos`.
- **Products listing** with multi-parameter filtering, sorting, mobile filters, and a 3D gem preview / dimension filters.
- **Product detail** pages with Cloudinary-backed image galleries (`next/image`).
- **Quotation page** with a multi-item quotation cart (Zustand store + dropdown).
- **Legal pages:** privacy policy, terms.

### 7.2 Authentication & Accounts
- **NextAuth v5 (beta)** with **JWT session strategy**.
- **Credentials provider** (email + bcrypt-hashed password) with **Zod validation** and **rate limiting** (5 attempts / 60s per email).
- **Google OAuth** with `allowDangerousEmailAccountLinking` and profile name normalization.
- **Guest → user data migration:** on sign-in, prior guest inquiries/meetings matching the email are re-linked to the authenticated account.
- Password reset flow (`forgot-password` / `reset-password`) via verification tokens + Resend email.

### 7.3 Customer Engagement
- **Inquiry system** supporting four types (PRODUCT, SERVICE, CUSTOMIZED, QUOTATION) with attachments, admin replies/notes, and status workflow.
- **Meeting scheduling** (SERVICE / CUSTOMIZED) with preferred dates and admin scheduling.
- **User profile** dashboard for tracking inquiries and meetings.

### 7.4 Admin Panel
- **Dashboard** (`AdminDashboardShell`, `DashboardCharts` via Recharts) with analytics overview.
- **Product management** (CRUD via `ProductTable`).
- **User management** (`UserTable`).
- **Inquiry CRM** with a **Kanban board** (`InquiryKanban`).
- **Meeting management** (`MeetingTable`).
- **Audit log viewer** (`AuditLogTable`).
- **Email template editor** (`EmailTemplateEditor`).
- **Report generator** (`ReportGenerator`) with generate + send endpoints.
- **Settings**, including dynamic field-value management.
- **Passkey protection** (`PasskeyGate` + `admin/verify-passkey`) as an extra gate over the admin area.
- **Notification counts** endpoint for live admin badges.

### 7.5 Cross-cutting Concerns
- **Audit logging** of admin actions (with IP capture).
- **Page-view analytics** stored in the DB.
- **Cookie consent** banner (GDPR-style).
- **SEO:** rich root metadata, OpenGraph, robots directives, and **next-sitemap** (generated via `postbuild`).
- **Security headers** in `next.config.js`: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and a restrictive `Permissions-Policy`.
- **Route protection** via `middleware.ts` (redirects unauthenticated users away from `/admin` and `/profile`).

---

## 8. Configuration & Deployment

- **Deployment target:** Vercel (`vercel.json` → framework `nextjs`, build `prisma generate && next build`, install `npm install --legacy-peer-deps`).
- **Image domains** allow-listed in `next.config.js`: Cloudinary, Supabase, Google user content.
- **Fonts:** Cormorant Garamond (display) + Inter (body) via `next/font`.
- **NPM scripts:** `dev`, `build` (prisma generate + next build), `start`, `lint`, `db:push`, `db:generate`, `db:studio`, `postbuild` (sitemap).
- **Environment variables required** (`.env.local`): `DATABASE_URL`/`DIRECT_URL`, `NEXTAUTH_SECRET`/`NEXTAUTH_URL`, `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`, Supabase URL/anon/service-role keys, Cloudinary keys, Resend keys.

> **Note:** Both `.env` and `.env.local` files exist in the repository working tree. These should be confirmed to be git-ignored and must **never** be committed (they hold secrets).

---

## 9. Development Progress & Timeline

**Repository span:** 2026-03-19 (Initial commit) → 2026-06-12 (latest commit), **91 commits**, single author.

| Month | Commits | Focus |
|-------|---------|-------|
| 2026-03 | 57 | Project bootstrap + bulk of feature build-out (auth, models, admin, inquiries) |
| 2026-04 | 21 | Feature refinement and CRM/admin completion |
| 2026-05 | 5 | Stabilization / smaller fixes |
| 2026-06 | 8 | UI/UX polish — hero gem visuals, services layout, products UI, sitemap |

**Recent commit themes (most recent first):** services UI / hero gem visuals / sitemap, interactive hero gem components, HeroGem canvas refactor, gem hero polish, gem rendering & mobile styling, Cloudinary image gallery, services components, mobile filters, dynamic hero stats, products listing UI/filters/store, 3D gem preview & dimension filters.

**Interpretation:** Heavy front-loaded feature development (March) tapering into a **polish-and-refinement phase** (May–June). The trajectory indicates the project has passed its core-build milestone and is in **late-stage visual/UX refinement** ahead of (or shortly after) launch.

---

## 10. Current Situation & Status Assessment

### ✅ Completed / Mature
- Full data model with 13 models covering all business domains.
- Authentication (credentials + Google OAuth) with rate limiting and guest-data migration.
- Complete public storefront with animated, brand-aligned UI.
- Product catalog with filtering, sorting, galleries, and 3D preview.
- Inquiry, quotation, and meeting workflows (guest + authenticated).
- Full admin/CRM suite: dashboard, products, users, inquiries (Kanban), meetings, audit log, email templates, reports, settings, passkey gate.
- Media pipeline (Cloudinary images + Supabase files).
- Transactional email (Resend), analytics, audit logging, cookie consent, SEO/sitemap, security headers.
- Deployment configuration for Vercel.
- Clean `main` branch, no uncommitted changes.

### 🟡 In Progress / Recently Active
- UI/UX polish of hero gem visuals and services pages.
- Mobile responsiveness tuning.
- Sitemap/SEO timestamp maintenance.

### 🔴 Gaps / Risks / Recommendations
1. **No automated tests.** There are zero project test files (`*.test.ts` / `*.spec.ts`) outside `node_modules`. Recommend adding unit tests (Zod schemas, lib utilities) and integration/E2E tests (auth, inquiry flow) via Vitest/Jest + Playwright.
2. **No CI/CD pipeline.** No `.github/workflows`. Recommend adding GitHub Actions for lint + typecheck + build (+ tests) on PRs.
3. **Beta auth dependency.** `next-auth@5.0.0-beta.30` is a beta release; monitor for breaking changes before/at GA.
4. **`--legacy-peer-deps` required** for install, indicating peer-dependency conflicts (likely React 18 vs. newer-tagged packages). Worth resolving for cleaner, more reproducible installs.
5. **In-memory rate limiting** (`rateLimit.ts`) does not persist across serverless instances on Vercel; for production hardening consider a shared store (e.g., Upstash Redis).
6. **Secrets hygiene:** confirm `.env` / `.env.local` are git-ignored; rotate any keys that may have been exposed.
7. **No `prisma/migrations` directory** — the project appears to use `prisma db push` rather than versioned migrations. For production schema governance, adopt `prisma migrate` to get a migration history.
8. **Single contributor / no review process** — adding PR review + branch protection would improve maintainability as the project grows.

---

## 11. Conclusion

ORAVA Gems Store is a **substantial, well-structured, and largely complete full-stack application** (~16k LOC, 169 source files, 85 components, 24 API routes, 13 data models). It delivers a polished luxury storefront plus a comprehensive admin/CRM back office, with sensible security defaults (security headers, rate limiting, route protection, audit logging) and a modern, cohesive technology stack.

The project is **functionally mature and deployment-ready** on Vercel, currently in a **UI/UX polish phase**. The most impactful next investments are **automated testing, a CI/CD pipeline, versioned database migrations, and production hardening of rate limiting** — none of which block launch, but all of which materially improve long-term reliability and maintainability.

---

*Report generated from static analysis of the repository (source code, Prisma schema, configuration files, and Git history). No application was run and no external services were contacted.*
