// lib/ttEventsApi.ts
import { headers } from 'next/headers';

const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID!;
const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN!;
const TIKTOK_API_URL = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

interface TikTokEventParams {
  event: string;
  eventId: string; // used for dedup with the client-side pixel
  value?: number;
  currency?: string;
  contents?: Array<{
    content_id: string;
    content_type: 'product' | 'product_group';
    content_name?: string;
  }>;
  email?: string; // will be hashed
  phone?: string; // will be hashed
  userAgent?: string;
  ip?: string;
  pageUrl?: string;
}

async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function sendTikTokEvent(params: TikTokEventParams) {
  const {
    event,
    eventId,
    value,
    currency = 'PKR',
    contents,
    email,
    phone,
    userAgent,
    ip,
    pageUrl,
  } = params;

  const user: Record<string, any> = {};
  if (email) user.email = await sha256(email);
  if (phone) user.phone = await sha256(phone);
  if (ip) user.ip = ip;
  if (userAgent) user.user_agent = userAgent;

  const payload = {
    event_source: 'web',
    event_source_id: TIKTOK_PIXEL_ID,
     test_event_code: 'TEST03920'
    ,

    data: [
      {
        event,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId, // MUST match the client-side ttq.track event_id for dedup
        user,
        properties: {
          ...(value !== undefined && { value }),
          ...(currency && { currency }),
          ...(contents && { contents }),
        },
        page: pageUrl ? { url: pageUrl } : undefined,
      },
    ],
  };

  const res = await fetch(TIKTOK_API_URL, {
    method: 'POST',
    headers: {
      'Access-Token': TIKTOK_ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('TikTok Events API error:', res.status, errText);
  }

  return res.json();
}