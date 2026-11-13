'use client';
import Link from 'next/link';
import { useLang } from '@/lib/lang';

export default function HomeClient() {
  const { d } = useLang();
  return (
    <div className="wrap">
      <section className="hm">
        <h1 className="hm-title">{d.home.title}</h1>
        <p className="hm-line">{d.home.line}</p>
        <div className="choices">
          <a className="choice c1" href="/portfolio/">
            <span className="clabel">01 / PORTFOLIO</span>
            <h2>{d.nav.portfolio}</h2>
            <p>{d.home.portfolioDesc}</p>
            <span className="arr" aria-hidden="true">↗</span>
          </a>
          <Link className="choice c2" href="/journal/">
            <span className="clabel">02 / JOURNAL</span>
            <h2>{d.nav.journal}</h2>
            <p>{d.home.journalDesc}</p>
            <span className="arr" aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
