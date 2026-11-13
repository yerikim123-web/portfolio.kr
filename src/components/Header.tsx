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
        <div className="bw">
          <Link className="brand" href="/home/">{d.brand}</Link>
          <Link className="homebtn" href="/home/" aria-label={d.nav.home} title={d.nav.home}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5M5.5 10v10h4.5v-5.5h4V20h4.5V10"/></svg>
          </Link>
        </div>
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
