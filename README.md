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

## Deploy (Netlify)

1. Push repository to GitHub.
2. In Netlify, create a site from your GitHub repo.
3. Build command is `npm run build` (already configured in `netlify.toml`).
4. Add environment variables from `.env.example`.
5. Deploy.

### Required environment variables

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Optional analytics variable

- `NEXT_PUBLIC_GA_ID` (Google Analytics 4 Measurement ID)

The site includes waitlist funnel conversion events and deferred 3D loading for stronger Core Web Vitals.
