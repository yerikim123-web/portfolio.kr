'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '@/lib/lang';
import { locales } from '@/i18n';

export default function Header() {
  const { lang, d, setLang } = useLang();
  const path = usePathname() || '/';
  const inJournal = path.startsWith('/journal');
  return (
    <header className="hd">
      <div className="wrap hd-in">
        <Link className="brand" href="/home/">{d.brand}</Link>
        <nav className="toggle" aria-label={d.nav.main}>
          <a href="/portfolio/">{d.nav.portfolio}</a>
          <Link href="/journal/" aria-current={inJournal ? 'page' : undefined}>{d.nav.journal}</Link>
        </nav>
        <div className="lang" role="group" aria-label="Language">
          {locales.map((l) => (
            <button key={l} type="button" lang={l} aria-pressed={l === lang} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>
    </header>
  );
}
