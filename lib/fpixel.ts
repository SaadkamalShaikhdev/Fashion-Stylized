// lib/fpixel.ts
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

export const fbTrack = (name: string, options: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', name, options);
};