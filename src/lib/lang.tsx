'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { defaultLocale, dicts, isLocale, LANG_KEY, type Dict, type Locale } from '@/i18n';

type Ctx = { lang: Locale; d: Dict; setLang: (l: Locale) => void };
const LangContext = createContext<Ctx>({ lang: defaultLocale, d: dicts[defaultLocale], setLang: () => {} });

function detect(): Locale {
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (isLocale(q)) return q;
    const s = localStorage.getItem(LANG_KEY);
    if (isLocale(s)) return s;
  } catch {}
  const n = (navigator.language || 'ko').slice(0, 2);
  return isLocale(n) ? n : defaultLocale;
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>(defaultLocale);
  useEffect(() => {
    const l = detect();
    setLangState(l);
    document.documentElement.removeAttribute('data-pending');
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = useCallback((l: Locale) => {
    setLangState(l);
    try { localStorage.setItem(LANG_KEY, l); } catch {}
  }, []);
  return <LangContext.Provider value={{ lang, d: dicts[lang], setLang }}>{children}</LangContext.Provider>;
}
export const useLang = () => useContext(LangContext);
