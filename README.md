# Yeri Kim (공통 Home / Portfolio / Journal)

Next.js 15 (App Router, 정적 export) · TypeScript · 한/영/독

## 주소 구조
/                          기존 포트폴리오 (예전에 뿌린 링크가 그대로 포트폴리오로 열림. public/index.html)
/home/                     공통 Home (Portfolio 또는 Journal 선택)
/portfolio/                포트폴리오 (/ 와 같은 파일, 새 사이트에서 들어오는 경로. public/portfolio/index.html)
/journal/                  Journal 홈
/journal/perspectives/     시선
/journal/public-history/   공공역사(Public History)
/journal/archive/          전체 글 (검색, 분류 필터, 5/10/20개씩)

포트폴리오를 고치면 public/index.html 과 public/portfolio/index.html 두 파일을 같이 바꿔야 한다
(복사본이므로 cp public/portfolio/index.html public/index.html).
언어는 기존 포트폴리오와 같은 localStorage 키(yr-portfolio-lang)와 ?lang= 를 써서 세 공간에서 이어진다.

## 실행
npm install
npm run dev
npm run build     # out/ 에 정적 사이트 생성

## 배포 (Vercel)
이 폴더 내용을 GitHub 저장소에 올리고, Vercel 프로젝트의 Framework Preset을 Next.js로 설정한다.
내부 링크는 모두 상대 경로이므로 나중에 자체 도메인을 연결해도 그대로 동작한다.
환경변수 NEXT_PUBLIC_SITE_URL 에 최종 주소를 넣으면 sitemap과 OG 주소에 반영된다.

## 글 추가
src/data/writings.json 에 글을 추가한다. 항목: id(ITDb 글 번호), category(perspectives/public-history),
type(review/interview), langs(제공 언어), titles(ko/en/de), performance, venue, country(DE/KR/NL/CH).
링크는 https://internationaltheatredatabase.com/article/{id}?lang=kr|en|de 로 자동 생성된다.
홈 미리보기 3개는 src/lib/content.ts 의 FEATURED_IDS 로 지정한다.

## 미리보기
python3 tools/build_preview.py  ->  preview/index.html (한 장짜리 미리보기)
