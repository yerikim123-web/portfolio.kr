import InnerPage from '@/components/InnerPage';
import type { Metadata } from 'next';
import { dicts } from '@/i18n';
export const metadata: Metadata = { title: `${dicts.ko.archive.title} | Yeri Kim` };
export default function Page() { return <InnerPage kind="archive" />; }
