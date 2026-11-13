'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import JournalNav from './JournalNav';
import WritingList from './WritingList';
import { useLang } from '@/lib/lang';
import { getFeatured } from '@/lib/content';

export default function JournalHome() {
  const { d, lang } = useLang();
  const recent = useMemo(() => getFeatured(lang), [lang]);
  return (
    <div className="wrap">
      <JournalNav />
      <section className="jintro">
        <p className="eyebrow">{d.journal.eyebrow}</p>
        <h1 className="jtitle">{d.journal.title}</h1>
        <p className="jtag">{d.journal.main}</p>
        <div className="cats">
          <Link className="cat" href="/journal/perspectives/">
            <h2>{d.perspectives.title}</h2>
            <p>{d.perspectives.short}</p>
            <span className="cfoot"><span className="cta">{d.perspectives.cta}</span><span className="carr" aria-hidden="true">↗</span></span>
          </Link>
          <Link className="cat" href="/journal/public-history/">
            <h2>{d.publicHistory.title}</h2>
            <p>{d.publicHistory.short}</p>
            <span className="cfoot"><span className="cta">{d.publicHistory.cta}</span><span className="carr" aria-hidden="true">↗</span></span>
          </Link>
        </div>
      </section>

      <section className="jsec" aria-labelledby="arc">
        <div className="jsec-h">
          <h2 id="arc" className="jlabel">{d.journal.archive}</h2>
          <Link className="lnk" href="/journal/archive/">{d.journal.viewAll} ↗</Link>
        </div>
        {recent.length === 0 ? <p className="muted">{d.journal.emptyHome}</p> : <WritingList items={recent} />}
      </section>

      <section className="jsec" aria-labelledby="ab">
        <h2 id="ab" className="jlabel">{d.journal.about}</h2>
        <div className="about">{d.aboutText.map((t) => <p key={t}>{t}</p>)}</div>
      </section>
    </div>
  );
}
