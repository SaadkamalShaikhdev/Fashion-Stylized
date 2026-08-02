# Fashion Stylized — Project Architecture

A full-stack Next.js 16 eCommerce application for premium fashion accessories (watches, wallets, glasses) targeted at the Pakistan market. Dark-themed UI with gold accents.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 16.2.3** (App Router) |
| Language | **TypeScript 5** |
| UI | **React 19.2.4**, **Tailwind CSS v4** |
| State | **Zustand 5** (persisted cart, in-memory wishlist) |
| DB | **MongoDB** via **Mongoose 9.4.1** |
| Auth | **NextAuth v4** (Credentials + Google OAuth, JWT) |
| Email | **Resend** + **React Email** templates |
| Rate Limiting | **Upstash Redis** + **@upstash/ratelimit** |
| Validation | **Zod 4** |
| Animation | **Motion 12** (framer-motion successor) |
| Charts | **Recharts** (admin dashboard) |
| Images | **ImageKit** (client upload) / **Cloudinary** fallback |
| Analytics | **Google Analytics** (G-4TEVQNPBXP), **TikTok Pixel** (client + server-side Events API) |

## Directory Structure Overview

```
├── app/                          # Next.js App Router pages & API
│   ├── (auth)/                   #   Auth pages (signIn, signUp, verify-email, etc.)
│   ├── (main)/                   #   Public pages (home, products, cart, checkout, orders, etc.)
│   ├── admin/                    #   Admin dashboard (protected, role: admin)
│   ├── api/                      #   All API route handlers
│   ├── components/               #   Shared React components
│   ├── context/                  #   AuthProvider (SessionProvider + cart rehydration)
│   ├── store/                    #   Zustand stores
│   ├── layout.tsx                #   Root layout
│   ├── globals.css               #   Tailwind v4 + CSS custom properties
│   ├── not-found.tsx             #   404 page
│   ├── robot.ts                  #   robots.txt
│   └── sitemap.ts                #   Dynamic sitemap
├── lib/                          # Utility modules (auth config, DB, Redis, email, API client, etc.)
├── models/                       # Mongoose models
├── proxy.ts                      # Middleware for auth/protected-route redirection
├── next.config.ts                # Next config (Image remote patterns, headers, redirects)
├── types.d.ts                    # Global mongoose connection type
└── next-auth.d.ts                # NextAuth session/JWT type augmentation
```

## Routing & Route Groups

- **`(auth)`** — Layout renders auth pages without the main site chrome (Navbar/Footer). Redirects to `/` if user already authenticated.
- **`(main)`** — Public pages wrapped with TopBanner, Navbar, Footer, WhatsApp button.
- **`admin/`** — Admin layout with sidebar; all pages require `role: "admin"`.

### API Routes (`/api`)

| Route | Purpose |
|-------|---------|
| `auth/[...nextauth]` | NextAuth handler |
| `auth/register` | User registration (credentials) |
| `auth/verify-otp` | Email verification |
| `auth/resend-otp` | Resend verification OTP |
| `auth/forgot-password` | Request password reset |
| `auth/verify-reset-otp` | Verify password-reset OTP |
| `auth/reset-password` | Set new password |
| `products` | GET (list/filter products), POST (admin create) |
| `categories` | GET distinct categories |
| `orders` | GET user orders, POST create order |
| `orders/[id]` | GET single order |
| `admin/orders` | GET all orders (admin) |
| `admin/orders/[id]` | Update order status (admin) |
| `admin/stats` | Dashboard statistics (admin) |
| `admin/setting` | GET/PUT delivery fee (admin) |
| `user/profile` | GET/PUT user profile |
| `user/change-password` | Change password |
| `user/delete` | Delete account |
| `wishlist` | GET/POST (toggle) wishlist |
| `setting` | GET delivery fee |
| `imagekit/auth` | ImageKit auth for client uploads |
| `events/tiktok` | Server-side TikTok Events API |

## Middleware — `proxy.ts`

Exported as `proxy` function. Runs on defined matcher paths:

- **Auth pages** → redirect to home if logged in
- **Protected pages** (`/profile`, `/admin`) → redirect to `/signIn` if not authenticated
- **Admin pages** → redirect to home if role !== "admin"

## State Management (Zustand)

| Store | Persistence | Description |
|-------|------------|-------------|
| `cartStore` | `localStorage` | Cart items, computed total & count, TikTok pixel tracking |
| `buyNowStore` | `localStorage` | Single-item buy-now flow |
| `wishlistStore` | None (in-memory) | Wishlist items, fetched fresh per session |

## Rate Limiting (Upstash Redis)

| Limiter | Limit | Scope |
|---------|-------|-------|
| `otpRateLimit` | 3 req / hour | OTP sending per IP |
| `verifyRateLimit` | 5 req / 15 min | OTP verification per IP |
| `loginRateLimit` | 5 req / 15 min | Login attempts per IP |

## SEO & Metadata

- Dynamic sitemap (`app/sitemap.ts`) — static pages + product pages generated from MongoDB
- `robots.txt` → disallows `/admin`, `/api`, `/checkout`, `/cart`, `/profile`, `/orders`, `/auth`
- JSON-LD structured data (Organization, Product) in root layout
- Open Graph / Twitter cards on every page

---

## Data Models

### User — `models/User.ts`

```typescript
interface IUser {
  name: string;
  email: string;                    // unique
  password?: string | null;         // null for Google OAuth users
  role?: 'user' | 'admin';
  isVerified?: boolean;             // email verification status
  otp?: string | null;              // verification/reset OTP
  otpExpiry?: Date | null;
  passwordResetVerified?: boolean;  // password-reset OTP verified?
  provider?: 'local' | 'google';    // auth provider
  googleId?: string;                // unique, sparse
  wishlist?: ObjectId[];            // ref → Product
  orders?: string[];                // list of order IDs
}
```

Mongoose schema with `timestamps: true`. Password is optional (null for Google users). `googleId` has `sparse: true` to allow multiple `null` values.

**Usage:** Appears in auth callbacks (JWT + session), profile management, wishlist toggle, order history display.

---

### Product — `models/Product.ts`

```typescript
interface IProduct {
  title: string;
  description: string;
  price: number;
  keyFeatures: string[];      // bullet-point features
  images: string[];           // image URLs (ImageKit / Cloudinary)
  stock: number;              // default: 5
  category: string;           // "Watches", "Glasses", "Wallets", etc.
  subcategory?: string;
  isTrending?: boolean;       // default: false
}
```

**Schema fields:**

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `title` | String | yes | — | Product name |
| `description` | String | yes | — | Full description |
| `price` | Number | yes | — | Current selling price |
| `keyFeatures` | [String] | no | [] | Feature bullets |
| `images` | [String] | no | [] | Uploaded image URLs |
| `stock` | Number | no | 5 | Inventory count |
| `category` | String | yes | — | Main category |
| `subcategory` | String | no | — | Optional sub-grouping |
| `isTrending` | Boolean | no | false | Featured/trending flag |

**Usage:** Product listing pages, product detail pages, sitemap generation, admin CRUD via `ProductForm`.

**Dynamic pricing:** The `lib/product-offers.ts` helper computes a "was" price by applying a 12% markup on qualifying items (trending, low stock, or titles containing "limited"/"special") to show a discount badge.

---

### Order — `models/Order.ts`

```typescript
interface IOrderProduct {
  productId: ObjectId | string;   // ref → Product (snapshot reference only)
  title: string;                    // snapshot
  price: number;                    // snapshot — never reads live price
  image: string;                    // snapshot
  category: string;                 // snapshot
  quantity: number;                 // min: 1
}

interface IOrder {
  userId?: ObjectId | string;       // ref → User (optional, guest orders)
  name: string;
  email: string;
  products: IOrderProduct[];        // embedded sub-documents
  address: string;
  city: string;
  postalCode: string;
  mobileNumber: string;
  paymentMethod: "COD" | "online";
  isPaid: boolean;                  // default: false
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  shippingFee: number;              // default: 300
}
```

**Key design decision:** `IOrderProduct` is an **embedded snapshot**. It copies the product's title, price, image, and category at order time. The comment reads: "never reference live product — prices change." This means order history is immutable and accurate even if product data is later updated or deleted.

**Status lifecycle:**

```
pending → processing → shipped → delivered
    ↓
cancelled
```

**Payment methods:** `COD` (Cash on Delivery) and `online`. `isPaid` field tracks whether payment has been settled.

**Usage:** Checkout flow creates an order via `POST /api/orders`. Users view their orders under `/orders`. Admin manages all orders under `/admin/orders` with status updates.

---

### Setting — `models/Setting.ts`

```typescript
interface ISetting {
  deliveryFee: number;    // single global shipping fee
}
```

Singleton-like model for app-wide settings. Currently only stores `deliveryFee` (default applied as 300 in the Order schema). Admin can update it via `/admin/settings`. The public endpoint `GET /api/setting` returns this value to calculate shipping during checkout.

---

## Auth Flow

1. **Registration:** User submits email + password → Zod validation → hashed with bcrypt → saved with `isVerified: false` → OTP email sent.
2. **Email Verification:** User enters OTP → `POST /api/auth/verify-otp` → marks `isVerified: true`.
3. **Sign In (Credentials):** NextAuth authorize callback → validates password → checks `isVerified` → if unverified, sends OTP and throws `UNVERIFIED:<userId>` error.
4. **Sign In (Google):** OAuth → `signIn` callback upserts user with `provider: "google"` and `isVerified: true`.
5. **JWT Callback:** On every request, fetches fresh `role` from DB to ensure role changes take effect immediately.
6. **Password Reset:** Forgot-password → OTP email → verify-reset-otp → reset-password (with `passwordResetVerified` gate).

## Client-Server Interaction

- **`lib/api-client.ts`** — Singleton `APIClient` class with typed methods wrapping all `/api/*` endpoints. Used throughout client components.
- **Server actions** not used; all mutations happen via `fetch` to API routes.
- **Rate limiting** applied server-side via Upstash on OTP/login endpoints.
