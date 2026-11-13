'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '@/lib/lang';

export default function JournalNav() {
  const { d } = useLang();
  const path = (usePathname() || '').replace(/\/$/, '');
  const items = [
    ['/journal', d.nav.journal],
    ['/journal/perspectives', d.perspectives.title],
    ['/journal/public-history', d.publicHistory.title],
  ] as const;
  return (
    <nav className="jnav" aria-label={d.nav.journalMenu}>
      {items.map(([href, label]) => (
        <Link key={href} href={`${href}/`} aria-current={path === href ? 'page' : undefined}>{label}</Link>
      ))}
    </nav>
  );
}
