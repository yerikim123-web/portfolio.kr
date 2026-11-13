'use client';
import { useEffect, useMemo, useState } from 'react';
import WritingList from './WritingList';
import { useLang } from '@/lib/lang';
import { byDateDesc, getWritings, type Category } from '@/lib/content';

const SIZES = [5, 10, 20];
type F = 'all' | Category;

export default function ArchiveList() {
  const { d, lang } = useLang();
  const items = useMemo(() => byDateDesc(getWritings(lang)), [lang]);
  const [q, setQ] = useState('');
  const [f, setF] = useState<F>('all');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    if (p.get('q')) setQ(p.get('q')!);
    const c = p.get('category');
    if (c === 'perspectives' || c === 'public-history') setF(c);
    if (SIZES.includes(Number(p.get('size')))) setSize(Number(p.get('size')));
    if (Number(p.get('page')) > 1) setPage(Number(p.get('page')));
  }, []);
  useEffect(() => {
    const p = new URLSearchParams();
    if (q) p.set('q', q);
    if (f !== 'all') p.set('category', f);
    if (size !== 10) p.set('size', String(size));
    if (page > 1) p.set('page', String(page));
    const s = p.toString();
    history.replaceState(null, '', location.pathname + (s ? `?${s}` : '') + location.hash);
  }, [q, f, page, size]);
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return items.filter((w) => (f === 'all' || w.category === f) && (!s || `${w.title} ${w.summary ?? ''} ${w.body ?? ''}`.toLowerCase().includes(s)));
  }, [items, q, f]);
  const pages = Math.max(1, Math.ceil(shown.length / size));
  const cur = Math.min(page, pages);
  const slice = shown.slice((cur - 1) * size, cur * size);
  const filters: [F, string][] = [['all', d.archive.all], ['perspectives', d.perspectives.title], ['public-history', d.publicHistory.title]];
  const filtering = q.trim() !== '' || f !== 'all';
  return (
    <>
      <div className="ctl">
        <div className="srch">
          <label className="sr" htmlFor="aq">{d.archive.search}</label>
          <form className="sbox" role="search" onSubmit={(e) => e.preventDefault()}>
            <input id="aq" type="search" placeholder={d.archive.placeholder} value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
            <button type="submit">{d.archive.submit}</button>
          </form>
          {filtering && <button type="button" className="clr" onClick={() => { setQ(''); setF('all'); setPage(1); }}>{d.archive.clear}</button>}
        </div>
        <div className="flt" role="group" aria-label={d.archive.search}>
          {filters.map(([k, label]) => (
            <button key={k} type="button" aria-pressed={f === k} onClick={() => { setF(k); setPage(1); }}>{label}</button>
          ))}
        </div>
      </div>
      {items.length > 0 && (
        <div className="rowc">
          <p className="cnt" aria-live="polite">{lang === 'ko' ? `${shown.length}${d.archive.count}` : `${shown.length} ${d.archive.count}`}</p>
          <label className="psz">
            <span className="sr">{d.archive.perPage.replace('{n}', '')}</span>
            <select value={size} onChange={(e) => { setSize(Number(e.target.value)); setPage(1); }}>
              {SIZES.map((n) => <option key={n} value={n}>{d.archive.perPage.replace('{n}', String(n))}</option>)}
            </select>
          </label>
        </div>
      )}
      {items.length === 0 ? <p className="muted">{d.archive.empty}</p>
        : shown.length === 0 ? <p className="muted" role="status">{d.archive.none}</p>
        : <WritingList items={slice} />}
      {shown.length > size && (
        <nav className="pgn" aria-label="Pagination">
          <button type="button" disabled={cur <= 1} onClick={() => { setPage(cur - 1); window.scrollTo(0, 0); }}>← {d.archive.prev}</button>
          <span>{cur} / {pages}</span>
          <button type="button" disabled={cur >= pages} onClick={() => { setPage(cur + 1); window.scrollTo(0, 0); }}>{d.archive.next} →</button>
        </nav>
      )}
    </>
  );
}
