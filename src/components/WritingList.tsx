'use client';
import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import { useLang } from '@/lib/lang';
import type { Writing } from '@/lib/content';

/* 제목을 한 줄에 맞춘다. 넘치면 글자 크기를 18px에서 14px까지 줄이고, 그래도 넘치면 두 줄로 내린다(제목이 잘리지 않게). */
function FitTitle({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = '';
      el.style.whiteSpace = '';
      let size = 18;
      while (el.scrollWidth > el.clientWidth && size > 14) { size -= 0.5; el.style.fontSize = size + 'px'; }
      if (el.scrollWidth > el.clientWidth) el.style.whiteSpace = 'normal';
    };
    fit();
    window.addEventListener('resize', fit);
    document.fonts?.ready.then(fit);
    return () => window.removeEventListener('resize', fit);
  }, [text]);
  return <span ref={ref} className="wl-t">{text}</span>;
}

export default function WritingList({ items }: { items: Writing[] }) {
  const { d } = useLang();
  return (
    <ul className="wl">
      {items.map((w) => {
        const cat = w.category === 'perspectives' ? d.perspectives.title : d.publicHistory.title;
        const catName = cat.replace(/\(.*\)/, '');
        const typeName = w.type ? d.type[w.type] : '';
        const tag = (
          <>
            <span className="t1">{catName}</span>
            {typeName && <><span className="sep"> · </span><span className="t2">{typeName}</span></>}
          </>
        );
        const cn = w.country ? (d.country as Record<string, string>)[w.country] : '';
        const meta = [cn, w.source].filter(Boolean).join(' · ');
        const inner = (
          <>
            <span className="wl-cat">{tag}</span>
            <FitTitle text={w.title} />
            {meta && <span className="wl-m">{meta}</span>}
            <span className="wl-r" aria-hidden="true">{d.archive.read} ↗</span>
          </>
        );
        if (w.abstract) {
          return (
            <li key={w.id}>
              <details className="abs">
                <summary className="wl-sum">
                  <span className="wl-cat">{tag}</span>
                  <FitTitle text={w.title} />
                  {meta && <span className="wl-m">{meta}</span>}
                  <span className="wl-r" aria-hidden="true"><span className="o-c">{d.abs.show}</span><span className="o-o">{d.abs.hide}</span></span>
                </summary>
                <div className="abs-b">
                  {w.abstract.text.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
                  {w.abstract.keywords && <p className="abs-k"><b>{d.abs.keywords}</b> {w.abstract.keywords}</p>}
                </div>
              </details>
            </li>
          );
        }
        return (
          <li key={w.id}>
            {w.url ? <a href={w.url} target="_blank" rel="noopener">{inner}</a> : <Link href={`/journal/works/${w.slug}/`}>{inner}</Link>}
          </li>
        );
      })}
    </ul>
  );
}
