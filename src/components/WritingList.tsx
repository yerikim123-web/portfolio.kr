'use client';
import Link from 'next/link';
import { useLang } from '@/lib/lang';
import type { Writing } from '@/lib/content';

export default function WritingList({ items }: { items: Writing[] }) {
  const { d } = useLang();
  return (
    <ul className="wl">
      {items.map((w) => {
        const cat = w.category === 'perspectives' ? d.perspectives.title : d.publicHistory.title;
        const tag = [cat.replace(/\(.*\)/, ''), w.type ? d.type[w.type] : ''].filter(Boolean).join(' · ');
        const cn = w.country ? (d.country as Record<string, string>)[w.country] : '';
        const meta = [cn, w.source].filter(Boolean).join(' · ');
        const inner = (
          <>
            <span className="wl-cat">{tag}</span>
            <span className="wl-t">{w.title}</span>
            {meta && <span className="wl-m">{meta}</span>}
            <span className="wl-r" aria-hidden="true">{d.archive.read} ↗</span>
          </>
        );
        return (
          <li key={w.id}>
            {w.url ? <a href={w.url} target="_blank" rel="noopener">{inner}</a> : <Link href={`/journal/works/${w.slug}/`}>{inner}</Link>}
          </li>
        );
      })}
    </ul>
  );
}
