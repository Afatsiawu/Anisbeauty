# ANISBEAUTY — Luxury Beauty E-Commerce

A premium luxury beauty and cosmetics e-commerce website built with React, Vite, and Supabase.

## Features

- **Storefront**: Hero, featured products, categories, best sellers, new arrivals, testimonials, before/after slider, Instagram gallery, newsletter
- **Shopping**: Cart drawer, wishlist drawer, quick view modal, search, full checkout flow
- **Admin Panel**: Dashboard with stats, product management (CRUD), order management with status tracking
- **Database**: Supabase with RLS — public storefront reads, admin-only writes
- **Auth**: Supabase email/password for admin access

## Tech Stack

- React 18 + Vite 5
- React Router DOM 7
- Framer Motion (animations)
- Swiper (carousels)
- Tailwind CSS 3
- Supabase (database, auth)
- Lucide React (icons)

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production build outputs to `dist/`.

## Environment Variables

The following are pre-configulated in the hosted environment:

- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anon public key

## Admin Access

- **URL**: `/admin/login`
- **Email**: admin@anisheels.com
- **Password**: anisheels2026

## Deployment (Render)

This project includes a `render.yaml` for easy deployment to Render as a static site.

1. Connect this repository to Render
2. Render will detect `render.yaml` and configure the static site automatically
3. The build command runs `npm install && npm run build`
4. The static site is served from `dist/`
5. SPA redirects are handled via `public/_redirects`

## License

© ANISBEAUTY. All rights reserved.
