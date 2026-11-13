'use client';
import { useMemo } from 'react';
import JournalNav from './JournalNav';
import WritingList from './WritingList';
import ArchiveList from './ArchiveList';
import { useLang } from '@/lib/lang';
import { byDateDesc, getWritings } from '@/lib/content';

export default function InnerPage({ kind }: { kind: 'perspectives' | 'public-history' | 'archive' }) {
  const { d, lang } = useLang();
  const items = useMemo(() => byDateDesc(getWritings(lang).filter((w) => kind === 'archive' || w.category === kind)), [kind, lang]);
  const title = kind === 'perspectives' ? d.perspectives.title : kind === 'public-history' ? d.publicHistory.title : d.archive.title;
  const lead = kind === 'perspectives' ? d.perspectives.intro : kind === 'public-history' ? d.publicHistory.desc : '';
  const empty = kind === 'perspectives' ? d.perspectives.empty : d.publicHistory.empty;
  return (
    <div className="wrap">
      <JournalNav />
      <section className="jintro inner">
        <h1 className="jtitle">{title}</h1>
        {lead && <p className={kind === 'public-history' ? 'lead sm' : 'lead'}>{lead}</p>}
      </section>
      <section className="jsec">
        {kind === 'public-history' && <h2 className="jlabel">{d.publicHistory.projects}</h2>}
        {kind === 'archive' ? <ArchiveList /> : items.length === 0 ? <p className="muted">{empty}</p> : <WritingList items={items} />}
      </section>
    </div>
  );
}
