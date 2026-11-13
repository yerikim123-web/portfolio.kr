import InnerPage from '@/components/InnerPage';
import type { Metadata } from 'next';
import { dicts } from '@/i18n';
export const metadata: Metadata = { title: `${dicts.ko.publicHistory.title} | Yeri Kim` };
export default function Page() { return <InnerPage kind="public-history" />; }
