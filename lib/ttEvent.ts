// lib/ttEvent.ts (client-side, replaces the earlier version)
'use client';

declare global {
  interface Window {
    ttq: any;
  }
}

export function ttEvent(
  event: string,
  params: Record<string, any>,
  eventId: string
) {
  // 1. Client-side pixel fire
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track(event, params, { event_id: eventId });
  }

  // 2. Server-side Events API fire (fire-and-forget)
  fetch('/api/events/tiktok', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, eventId, ...params }),
  }).catch(() => {});
}