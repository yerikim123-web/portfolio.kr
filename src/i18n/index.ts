import ko from './ko.json';
import en from './en.json';
import de from './de.json';

export const locales = ['ko', 'en', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ko';
export type Dict = typeof ko;
export const dicts: Record<Locale, Dict> = { ko, en, de };
export const isLocale = (v: string | null | undefined): v is Locale => !!v && (locales as readonly string[]).includes(v);

/* 기존 포트폴리오와 같은 키를 써서 언어 선택이 세 공간에서 이어진다. */
export const LANG_KEY = 'yr-portfolio-lang';
export const CONTACT_EMAIL = 'yeri.kim.125@gmail.com';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/yerikimkultur';
