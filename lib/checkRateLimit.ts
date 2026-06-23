import { NextRequest, NextResponse } from "next/server"
import { Ratelimit } from "@upstash/ratelimit"

export async function checkRateLimit(
  request: NextRequest,
  limiter: Ratelimit,
  identifier?: string // optional custom identifier e.g. email
) {
  // use IP + optional identifier as key
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ??
              request.headers.get("x-real-ip") ??
              "anonymous"

  const key = identifier ? `${ip}:${identifier}` : ip

  const { success, remaining, reset } = await limiter.limit(key)

  if (!success) {
    const resetDate = new Date(reset)
    const minutesLeft = Math.ceil((resetDate.getTime() - Date.now()) / 1000 / 60)

    return NextResponse.json({
      success: false,
      error: `Too many requests. Try again in ${minutesLeft} minute${minutesLeft !== 1 ? "s" : ""}.`
    }, {
      status: 429,
      headers: {
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": reset.toString(),
        "Retry-After": minutesLeft.toString(),
      }
    })
  }

  return null // null means not rate limited, continue
}