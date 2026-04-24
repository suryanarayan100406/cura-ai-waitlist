# Cura AI Pre-Launch Website

Conversion-focused startup website for Cura AI, an AI-powered family health management platform built for India.

## Stack

- Next.js 14 (App Router + TypeScript)
- Tailwind CSS + custom CSS variables
- Framer Motion animations
- Three.js + React Three Fiber + Drei (hero and solution scenes)
- React Hook Form + Zod validation
- Supabase waitlist backend

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env.local
```

3. Add Supabase credentials in `.env.local`.

4. Run the dev server:

```bash
npm run dev
```

5. Open http://localhost:3000

## Supabase Setup

Run the SQL in `supabase/waitlist.sql`.

This creates:

- `waitlist` table
- RLS enabled
- insert policy
- select policy (for count)

## API

- `GET /api/waitlist` -> returns live waitlist count payload
- `POST /api/waitlist` -> validates input, inserts into Supabase, handles duplicate email gracefully, returns updated count

Expected POST payload:

```json
{
	"name": "Jane Doe",
	"email": "jane@example.com",
	"phone": "+919876543210",
	"use_case": "Managing my own health",
	"source": "website"
}
```

## Scripts

- `npm run dev` -> local development
- `npm run build` -> production build
- `npm run start` -> run built app
- `npm run lint` -> lint checks

## Deploy (Vercel)

1. Push repository to GitHub.
2. Import the repo in Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.

The site is optimized for mobile-first usage and includes deferred 3D loading for better Core Web Vitals.
