import type { Locale } from '@/i18n';
import raw from '@/data/writings.json';

/* 실제 글은 운영자가 제공한 것만 넣는다. 분류는 시선과 공공역사 두 가지뿐이다(글 유형 없음). */
export type Category = 'perspectives' | 'public-history';

export type Writing = {
  id: string;
  title: string;
  category: Category;
  url?: string;       // 외부 링크. 외부 URL 또는 내부 글(slug) 중 하나는 필수
  slug?: string;      // 내부 글이면 /journal/works/:slug
  summary?: string;
  body?: string;      // 관리자가 저장한 본문 (검색 대상)
  image?: string;     // 시선·공공역사 목록과 상세에서만. 홈과 아카이브에서는 쓰지 않는다
  date?: string;      // YYYY-MM-DD, 선택
  language?: Locale;
  performance?: string;
  venue?: string;
  source?: string;
  type?: 'review' | 'interview';
  country?: string;   // ISO 국가 코드 (DE, KR, NL, CH)
};

type Raw = { id: string; category: Category; langs: string[]; titles: Partial<Record<Locale, string>>; performance: string | null; venue: string | null; performanceT?: Partial<Record<Locale, string>>; venueT?: Partial<Record<Locale, string>>; country?: string | null; type?: 'review' | 'interview' };
const PARAM: Record<Locale, string> = { ko: 'kr', en: 'en', de: 'de' };
const BASE = 'https://internationaltheatredatabase.com/article/';

/* 언어별 목록. 해당 언어로 제공되는 글만 포함하고, 제목이 없으면 한국어 제목을 쓴다. 링크 끝 ?lang= 값이 언어를 결정한다. */
export function getWritings(lang: Locale): Writing[] {
  return (raw as Raw[])
    .filter((r) => r.langs.includes(lang))
    .map((r) => ({
      id: r.id,
      title: r.titles[lang] ?? r.titles.ko ?? '',
      category: r.category,
      url: `${BASE}${r.id}?lang=${PARAM[lang]}`,
      language: lang,
      type: r.type,
      country: r.country ?? undefined,
      source: [r.performanceT?.[lang] ?? r.performance, r.venueT?.[lang] ?? r.venue].filter(Boolean).join(' · ') || undefined,
    }));
}
/* Journal 홈 미리보기 3개. 지정한 글을 먼저 쓰고, 해당 언어로 없는 글은 다음 최신 글로 채운다. */
export const FEATURED_IDS = ['415', '395', '383'];
export function getFeatured(lang: Locale): Writing[] {
  const all = byDateDesc(getWritings(lang));
  const pick = FEATURED_IDS.map((id) => all.find((w) => w.id === id)).filter((w): w is Writing => !!w);
  const rest = all.filter((w) => !FEATURED_IDS.includes(w.id));
  return [...pick, ...rest].slice(0, 3);
}
/* 최신순. 날짜는 쓰지 않으므로 ITDb 글 번호가 큰 순서(= 목록 순서)를 유지한다. */
export function byDateDesc(list: Writing[]): Writing[] {
  return [...list].sort((a, b) => Number(b.id) - Number(a.id));
}
