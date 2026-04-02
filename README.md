# ORAVA Gems Store - Web Application

A modern, high-performance, and visually stunning full-stack web application built for ORAVA Gems, a premier gemstone exporter based in Sri Lanka.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (managed via Supabase)
- **ORM:** Prisma Client
- **Authentication:** NextAuth.js v5 (Beta)
- **Styling:** Tailwind CSS v3
- **Animations:** Framer Motion
- **UI Components:** Radix UI, Custom Aceternity UI Components
- **State Management:** Zustand
- **Media Uploads:** Cloudinary (Images), Supabase Storage (Files)
- **Email Delivery:** Resend API

## Features
- **Public Storefront:** Premium animated UI showcasing Gemstones.
- **Dynamic Search & Filtering:** Fast multi-parameter filtering.
- **Inquiries System:** Custom quotations and product inquiries for both guests and authenticated users.
- **User Dashboard:** End-users can register, login (Google OAuth supported), and track inquiries and scheduled meetings.
- **Admin Panel:** Complete overview dashboard, product management (CRUD), customer relations (CRM), audit logging, and report-generation. Includes passkey protection.

## Environment Variables
The application strictly depends on variables defined in `.env.local`:
- `DATABASE_URL` / `DIRECT_URL` (Supabase Postgres)
- `NEXTAUTH_SECRET` / `NEXTAUTH_URL`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY`
- Cloudinary Keys
- Resend Keys

## Setup and Commands
1. Install dependencies:
   ```bash
   npm install
   ```
2. Database operations:
   ```bash
   npx prisma db push
   npx prisma generate
   ```
3. Run development mode:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Design System
- Customized color scheme matching the luxurious brand of ORAVA (Gold, Blue, Obsidian Dark themes).
- High precision component alignments, fully responsive globally.
