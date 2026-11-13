import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LangProvider } from '@/lib/lang';
import { dicts } from '@/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portfolio-yerikim.vercel.app';
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: dicts.ko.meta.title,
  description: dicts.ko.meta.description,
  openGraph: { title: dicts.ko.meta.title, description: dicts.ko.meta.description, siteName: 'Yeri Kim', type: 'website' },
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
};

/* 한국어가 아닌 방문자는 언어가 정해질 때까지 본문을 잠깐 숨겨 깜빡임을 막는다. */
const pre = `(function(){try{var q=new URLSearchParams(location.search).get('lang');var s=localStorage.getItem('yr-portfolio-lang');var l=q||s||(navigator.language||'ko').slice(0,2);if(l==='en'||l==='de'){document.documentElement.setAttribute('data-pending','1');setTimeout(function(){document.documentElement.removeAttribute('data-pending')},1500)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script dangerouslySetInnerHTML={{ __html: pre }} />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
      </head>
      <body>
        <LangProvider>
          <a className="skip" href="#main">Skip to content</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
