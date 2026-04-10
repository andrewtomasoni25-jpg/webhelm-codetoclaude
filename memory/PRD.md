# WebHelm - Product Requirements Document

## Original Problem Statement
Build a full-stack website for "WebHelm" (a web design agency) based on a provided HTML/CSS mockup and uploaded logo assets. The site needs advanced UI animations via custom React components (ShaderAnimation, VapourTextEffect, BeamsBackground, LiquidGlassButton, BackgroundPaths), a functional contact form with email notifications, and basic SEO setup.

## Tech Stack
- **Frontend:** React 19, Tailwind CSS 3, shadcn/ui (New York), Framer Motion, Three.js, Craco
- **Backend:** FastAPI, MongoDB (Motor), Resend API
- **Fonts:** Outfit (headings) + Manrope (body)
- **Color Scheme:** Dark (#0b0b0b), Blue accent (#007bff), Cream (#f5f5dc)

## Architecture
```
backend/server.py → FastAPI with /api prefix, MongoDB, Resend email
frontend/src/pages/WebHelmLanding.jsx → Main page composing all sections
frontend/src/components/landing/* → 12 section components
frontend/src/components/ui/* → 5 custom + shadcn UI components
```

## What's Been Implemented (All Complete)
1. Full React frontend with sections: Hero, About, Services, Pricing, Portfolio, Testimonials, Process, CTA, Contact, FAQ, Footer
2. Custom animated components: ShaderAnimation (Three.js WebGL), VapourTextEffect (canvas particles), BeamsBackground, LiquidGlassButton, BackgroundPaths (SVG)
3. FastAPI backend: contact form submission → MongoDB + Resend email to contact@webhelm.co
4. SEO: sitemap.xml, robots.txt, manifest.json, structured data, Open Graph, Twitter cards
5. Complete code export provided to user for handoff to Claude

## API Endpoints
- `POST /api/contact` — Contact form submission (saves to DB, sends email)
- `GET /api/contact/submissions` — Admin: list all submissions

## DB Schema
- `contact_submissions`: {id, name, email, businessName, projectType, budget, message, timestamp}

## 3rd Party Integrations
- Resend (Email): API key in backend/.env

## Status: COMPLETE
Project fully built, tested, and code exported to user.
