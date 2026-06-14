import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",          // block admin from Google
          "/api/",           // block all API routes
          "/checkout",       // no need to index checkout
          "/cart",           // no need to index cart
          "/profile",        // private user page
          "/orders",         // private user page
          "/verify-email",   // auth pages
          "/reset-password",
          "/verify-reset-otp",
        ],
      },
    ],
    sitemap: "https://fashionstylized.store/sitemap.xml",
  }
}