# WebHelm — migrating off Emergent

Short version: your site now runs **entirely on Vercel's free tier** (no database,
no Python backend, no monthly bill). The Python FastAPI backend stays in the repo
as an optional fallback — a `render.yaml` is included for that route.

---

## Path A — Vercel only (recommended, £0/month)

### 1. Push this repo to GitHub

Already done — you're on
`github.com/andrewtomasoni25-jpg/webhelm-codetoclaude`.
Just commit these new files and push:

```
git add .
git commit -m "Migrate off Emergent: Lenis + R3F hero + Vercel serverless"
git push
```

### 2. Create a Vercel account

Go to [vercel.com](https://vercel.com) → **Sign up with GitHub** (free).

### 3. Import the repo

Dashboard → **Add New → Project** → pick
`webhelm-codetoclaude`.

Vercel auto-detects `vercel.json` in the repo root and configures everything:

- Build command: `cd frontend && yarn install --frozen-lockfile && yarn build`
- Output directory: `frontend/build`
- API routes: `/api/*` → serverless functions (`api/contact.js`)

Just hit **Deploy**. First build ~3 minutes.

### 4. Set environment variables

Dashboard → **Settings → Environment Variables**, add:

| Key | Value | Where to get it |
|---|---|---|
| `RESEND_API_KEY` | `re_xxx...` | [resend.com](https://resend.com) → free tier, 3k emails/mo |
| `RECIPIENT_EMAIL` | `contact@webhelm.co` | where submissions go |
| `SENDER_EMAIL` | `onboarding@resend.dev` | (default is fine until you verify a custom domain) |

Then **Redeploy** so the vars take effect.

### 5. Point webhelm.co at Vercel

In Vercel: **Settings → Domains → Add `webhelm.co`**.
Vercel shows you DNS records to add at your domain registrar
(A record `76.76.21.21` and a CNAME for `www`).

Propagation is usually <10 minutes.

### 6. Delete the Emergent project

Only after you've confirmed webhelm.co loads from Vercel.
Log into Emergent dashboard → delete the project. Billing stops.

---

## Path B — Keep the Python backend, free Render host (£0/month, sleeps)

If you want to keep the FastAPI `server.py` and MongoDB:

1. Create accounts at [render.com](https://render.com) and
   [MongoDB Atlas](https://www.mongodb.com/atlas) (both free).
2. Create an Atlas cluster, grab the connection string.
3. In Render: **New → Blueprint** → point at this repo.
   Render reads `render.yaml` and creates:
   - `webhelm-api` (Python backend)
   - `webhelm-frontend` (static React build)
4. In the `webhelm-api` service, set the secret env vars:
   `MONGO_URL`, `RESEND_API_KEY`, `RECIPIENT_EMAIL`.
5. Point `webhelm.co` at the `webhelm-frontend` service.

**Downside**: Render free plan sleeps the backend after 15 min idle —
first request after sleep takes ~30s. Fine for a contact form, not great
for anything interactive. Pay £5/mo to remove the sleep, or use Path A.

---

## What changed in the code

| File | Change |
|---|---|
| `frontend/package.json` | Removed `@emergentbase/visual-edits`, added `lenis`, `@react-three/fiber`, `@react-three/drei` |
| `frontend/craco.config.js` | Removed Emergent visual-edits wrapper |
| `frontend/src/App.js` | Wrapped in `<SmoothScroll>` (Lenis) |
| `frontend/src/components/SmoothScroll.jsx` | **new** — global Lenis instance + anchor-click patching |
| `frontend/src/components/MagneticButton.jsx` | **new** — cursor-follow effect (respects `prefers-reduced-motion`) |
| `frontend/src/components/SplitTextReveal.jsx` | **new** — word-by-word headline reveal on scroll |
| `frontend/src/components/HeroScene.jsx` | **new** — R3F distorted torus-knot in hero |
| `frontend/src/components/landing/HeroSection.jsx` | Uses `HeroScene` + magnetic CTAs |
| All landing sections | Headings converted to `<SplitTextReveal>` |
| `frontend/src/components/landing/ContactSection.jsx` | Uses relative `/api/contact` (works on Vercel) + magnetic submit |
| `api/contact.js` | **new** — Vercel serverless replacement for Python endpoint |
| `vercel.json` | **new** — Vercel build + rewrite config |
| `render.yaml` | **new** — optional Render deploy for the Python path |

Nothing destructive: `backend/server.py` is untouched and still works locally
via `uvicorn server:app --reload`.

---

## Local dev

```bash
cd frontend
yarn install
yarn start        # http://localhost:3000
```

The form posts to `/api/contact`. During local dev without a backend, that 404s —
to test the form locally either:

- `vercel dev` (runs serverless functions locally), or
- set `REACT_APP_BACKEND_URL=http://localhost:8000` and run the Python backend.

---

## Costs summary

| Setup | Monthly |
|---|---|
| **Path A — Vercel + Resend free tier** | **£0** |
| Path B — Render free + MongoDB Atlas free | £0 (with sleep) |
| Path B — Render Starter | ~£5 |
| Current Emergent | Whatever they charge, replace it |
