'use client';
import { useEffect } from 'react';
import { useLang } from '@/lib/lang';

/* 본문을 복사해 다른 곳에 붙여넣으면 끝에 출처를 붙인다. 입력창 안에서 복사하거나 아주 짧게 복사할 때는 건드리지 않는다. */
const LABEL = { ko: '출처', en: 'Source', de: 'Quelle' } as const;
const NAME = { ko: '김예리 Yeri Kim', en: 'Yeri Kim', de: 'Yeri Kim' } as const;
const MIN = 12;

export default function CopySource() {
  const { lang } = useLang();
  useEffect(() => {
    const onCopy = (e: ClipboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !e.clipboardData) return;
      const text = sel.toString();
      if (text.trim().length < MIN) return;
      const url = location.origin + location.pathname;
      const cite = `${LABEL[lang]}: ${NAME[lang]}, ${url}`;
      const box = document.createElement('div');
      for (let i = 0; i < sel.rangeCount; i++) box.appendChild(sel.getRangeAt(i).cloneContents());
      const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
      e.clipboardData.setData('text/plain', `${text}\n\n${cite}`);
      e.clipboardData.setData('text/html', `${box.innerHTML}<br><br>${esc(cite)}`);
      e.preventDefault();
    };
    document.addEventListener('copy', onCopy);
    return () => document.removeEventListener('copy', onCopy);
  }, [lang]);
  return null;
}
