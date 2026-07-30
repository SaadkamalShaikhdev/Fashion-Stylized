import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// 3 requests per hour — for OTP sending
export const otpRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(3, "1 h"),
  analytics: true,
  prefix: "otp",
})

// 5 attempts per 15 minutes — for OTP verification
export const verifyRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "15 m"),
  analytics: true,
  prefix: "verify",
})

// 5 attempts per 15 minutes — for login
export const loginRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "15 m"),
  analytics: true,
  prefix: "login",
})

 export const reviewRateLimit = new Ratelimit({
   redis,
   limiter: Ratelimit.slidingWindow(3, "1 h"), // 3 reviews per hour per IP
   prefix: "ratelimit:review",
 });