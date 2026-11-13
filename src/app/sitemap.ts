import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portfolio-yerikim.vercel.app';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/home/', '/portfolio/', '/journal/', '/journal/perspectives/', '/journal/public-history/', '/journal/archive/'].map((p) => ({ url: BASE + p }));
}
