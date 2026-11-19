'use client';
import { useMemo, useState } from 'react';
import JournalNav from './JournalNav';
import WritingList from './WritingList';
import ArchiveList from './ArchiveList';
import { useLang } from '@/lib/lang';
import { byDateDesc, getWritings } from '@/lib/content';

export default function InnerPage({ kind }: { kind: 'perspectives' | 'public-history' | 'archive' }) {
  const { d, lang } = useLang();
  const items = useMemo(() => byDateDesc(getWritings(lang).filter((w) => kind === 'archive' || w.category === kind)), [kind, lang]);
  const [tf, setTf] = useState<'all' | 'review' | 'interview' | 'thesis'>('all');
  const types = (['all', 'review', 'interview', 'thesis'] as const).map((k) => ({ k, n: k === 'all' ? items.length : items.filter((w) => w.type === k).length }));
  const shown = kind === 'perspectives' && tf !== 'all' ? items.filter((w) => w.type === tf) : items;
  const title = kind === 'perspectives' ? d.perspectives.title : kind === 'public-history' ? d.publicHistory.title : d.archive.title;
  const lead = kind === 'perspectives' ? d.perspectives.intro : kind === 'public-history' ? d.publicHistory.desc : '';
  const empty = kind === 'perspectives' ? d.perspectives.empty : d.publicHistory.empty;
  return (
    <div className="wrap">
      <JournalNav />
      <section className="jintro inner">
        <h1 className="jtitle">{title}</h1>
        {lead && lead.split('\n\n').map((para, i) => (
          <p key={i} className={kind === 'public-history' ? 'lead sm' : 'lead'}>
            {para.split('\n').map((ln, j) => <span key={j} className="ln">{j > 0 ? ' ' : ''}{ln}</span>)}
          </p>
        ))}
      </section>
      <section className="jsec">
        {kind === 'public-history' && <h2 className="jlabel">{d.publicHistory.projects}</h2>}
        {kind === 'perspectives' && items.length > 0 && (
          <div className="tf" role="group" aria-label={d.perspectives.title}>
            {types.filter((t) => t.k === 'all' || t.n > 0).map((t) => (
              <button key={t.k} type="button" aria-pressed={tf === t.k} onClick={() => setTf(t.k)}>
                {t.k === 'all' ? d.archive.all : d.type[t.k]} <span className="n">{t.n}</span>
              </button>
            ))}
          </div>
        )}
        {kind === 'archive' ? <ArchiveList /> : shown.length === 0 ? <p className="muted">{empty}</p> : <WritingList items={shown} />}
      </section>
    </div>
  );
}
