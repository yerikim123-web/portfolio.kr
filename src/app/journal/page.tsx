import JournalHome from '@/components/JournalHome';
import type { Metadata } from 'next';
import { dicts } from '@/i18n';
export const metadata: Metadata = { title: dicts.ko.meta.journalTitle, description: dicts.ko.journal.main };
export default function Page() { return <JournalHome />; }
