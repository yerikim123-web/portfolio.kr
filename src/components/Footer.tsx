'use client';
import { useLang } from '@/lib/lang';
import { CONTACT_EMAIL, LINKEDIN_URL } from '@/i18n';

export default function Footer() {
  const { d } = useLang();
  return (
    <footer className="ft">
      <div className="wrap ft-in">
        <p>© Yeri Kim</p>
        <p>
          <span className="ft-k">{d.footer.contact}</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener">LinkedIn ↗</a>
        </p>
      </div>
    </footer>
  );
}
