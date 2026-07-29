// app/api/events/tiktok/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendTikTokEvent } from '@/lib/ttEventApi';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? req.ip ?? '';
    const userAgent = req.headers.get('user-agent') ?? '';

    const result = await sendTikTokEvent({
      ...body,
      ip,
      userAgent,
    });

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}