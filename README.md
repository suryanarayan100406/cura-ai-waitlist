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

3. Fill all values in [.env.example](.env.example) format inside your local .env.local.

4. Run the dev server:

```bash
npm run dev
```

5. Open http://localhost:3000

## Environment Variables (What Each One Means)

1. NEXT_PUBLIC_SITE_URL
- Your frontend base URL.
- Local value: http://localhost:3000
- Production value: your Netlify site URL or custom domain.

2. NEXT_PUBLIC_SUPABASE_URL
- Supabase project URL.
- Public variable, safe to expose.

3. NEXT_PUBLIC_SUPABASE_ANON_KEY
- Supabase anon public key.
- Public variable, safe to expose.

4. SUPABASE_SERVICE_ROLE_KEY
- Supabase secret service role key.
- Must be kept private.
- Only used server-side by API routes.

5. NEXT_PUBLIC_GA_ID (Optional)
- Google Analytics 4 Measurement ID.
- Example format: G-XXXXXXXXXX

6. NODE_VERSION (Netlify recommended)
- Set to 20 in Netlify for stable builds.

## How To Get All Variables (Step-by-Step)

### A) Get Supabase values

1. Open Supabase dashboard.
2. Open your project.
3. Go to Project Settings -> API.
4. Copy these values:
- Project URL -> NEXT_PUBLIC_SUPABASE_URL
- anon public key -> NEXT_PUBLIC_SUPABASE_ANON_KEY
- service_role secret key -> SUPABASE_SERVICE_ROLE_KEY

Important:
- Never expose SUPABASE_SERVICE_ROLE_KEY in frontend code.
- Store it only in server env settings (Netlify environment variables).

### B) Set site URL

1. For local: NEXT_PUBLIC_SITE_URL=http://localhost:3000
2. For Netlify: NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
3. If you later attach custom domain, update this value to your final domain and redeploy.

### C) (Optional) Get GA4 ID

1. Open Google Analytics.
2. Admin -> Data Streams -> Web.
3. Copy Measurement ID.
4. Add as NEXT_PUBLIC_GA_ID in Netlify.

## Supabase Setup

Run the SQL in [supabase/waitlist.sql](supabase/waitlist.sql).

This creates:

- waitlist table
- RLS enabled
- insert policy
- select policy (for count)

## API

- GET /api/waitlist -> returns live waitlist count payload
- POST /api/waitlist -> validates input, inserts into Supabase, handles duplicate email gracefully, returns updated count

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

- npm run dev -> local development
- npm run build -> production build
- npm run start -> run built app
- npm run lint -> lint checks

## Deploy (Netlify)

1. Push repository to GitHub.
2. In Netlify, create site from Git.
3. Select this repository and branch main.
4. Netlify reads [netlify.toml](netlify.toml) automatically.
5. Go to Site configuration -> Environment variables.
6. Add all variables listed in [.env.example](.env.example).
7. Set NODE_VERSION to 20.
8. Trigger deploy.

## Exact Netlify Variable List

Required:
- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

Optional:
- NEXT_PUBLIC_GA_ID

Recommended:
- NODE_VERSION=20

## Post-Deploy Validation Checklist

1. Open /waitlist and submit a new email.
2. Confirm success message appears.
3. In Supabase table editor, confirm row added in waitlist.
4. Submit same email again and confirm duplicate message.
5. If GA is enabled, verify waitlist_funnel events in GA DebugView.

## Troubleshooting

1. 503 from /api/waitlist
- Cause: missing Supabase env vars.
- Fix: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Netlify, then redeploy.

2. Form works locally but not on Netlify
- Cause: variables set only in local .env.local.
- Fix: add same values in Netlify Site configuration -> Environment variables.

3. Wrong Open Graph or metadata URL
- Cause: NEXT_PUBLIC_SITE_URL still pointing to localhost.
- Fix: update NEXT_PUBLIC_SITE_URL to production URL and redeploy.

The site includes waitlist funnel conversion events and deferred 3D loading for stronger Core Web Vitals.
