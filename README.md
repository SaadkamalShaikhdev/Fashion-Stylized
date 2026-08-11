# Fashion Stylized

A full-stack e-commerce storefront for premium wallets, watches, and glasses — built for the Pakistani market. The store offers a complete shopping experience from browsing to delivery, backed by a role-based admin panel for day-to-day store operations.

This is a private project and is not open source. No install, setup, or run instructions are provided.

---

## Description

Fashion Stylized is a production-style fashion accessories store covering the entire e-commerce lifecycle:

- **Customer side** — browse and discover products, wishlist, cart, checkout (cash on delivery), order tracking, and product reviews.
- **Auth side** — full account lifecycle with email verification, secure password recovery, and Google sign-in.
- **Admin side** — dashboard with live analytics, product/order/review management, and store settings.

The app is engineered around Next.js App Router server and client components, with MongoDB as the data layer and a set of integrations (ImageKit, Resend, Upstash, TikTok) handled through clean API routes.

---

## Features

### Storefront

- Product catalog for wallets, watches, glasses, and collections
- Detailed product pages with image galleries, key features, pricing, stock, and trending tags
- Client-side cart and wishlist (Zustand), plus a Buy-Now flow
- Checkout with cash-on-delivery, dynamic delivery fee from admin settings, and product stock/price validation before order placement
- Order placement with a snapshot of product data at time of purchase
- Order history and order detail pages for customers
- Product reviews: star rating, optional title, comment, up to 4 photos, guest or signed-in reviewers, pagination, and lightbox viewing
- Landing sections: hero, categories, new arrivals, and brand story
- Static pages: About, Contact, Terms, Privacy, Cookies, Shipping Policy, Return Policy

### Authentication & Accounts

- Registration with email verification (OTP)
- Sign-in with credentials (bcrypt-hashed passwords) and Google OAuth
- Forgot / reset password via OTP
- Change password, update profile, and account deletion
- Role-based access control (user / admin)

### Admin Panel

- Dashboard with analytics: total orders, revenue, products, users, pending orders
- Charts: orders per day (7 days), revenue trend, orders by status, top categories
- Alerts: low-stock products and recent orders
- Product management: create, edit, and delete products with image uploads
- Order management: view details and update order status
- Review moderation: hide or delete reviews
- Store settings: configurable delivery fee

### Integrations

- ImageKit for product and review image uploads (server-signed uploads) and optimized image delivery
- Resend for transactional emails and OTP delivery
- TikTok pixel (client-side) plus server-side Events API with event deduplication for marketing tracking
- Upstash Redis for rate limiting on sensitive endpoints

### Engineering

- SEO: sitemap, robots.txt, per-page metadata and Open Graph tags
- Toast notifications and a shared API client for all data fetching
- Validation with Zod, reusable helpers for reviews and rate limiting
- Animations via Framer Motion across storefront and admin

---

## Tech Stack

- **Framework**: Next.js (App Router) — server & client components
- **UI**: React 19, TypeScript, Tailwind CSS, Lucide icons
- **Data**: MongoDB with Mongoose
- **Authentication**: NextAuth (Credentials + Google OAuth)
- **Email**: Resend with @react-email templates
- **Media**: ImageKit (upload + CDN)
- **Caching / limits**: Upstash Redis
- **State**: Zustand (cart, wishlist, buy-now)
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Validation**: Zod
- **Security**: bcryptjs for password hashing
