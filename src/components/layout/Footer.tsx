import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Logo } from './Logo';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-primary/10 bg-canvas-sunken/60">
      <div className="container-prose grid gap-10 py-12 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-ink-soft">{t('disclaimer')}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            {t('disclaimerTitle')}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li>
              <Link href={`/${locale}#how-it-works`} className="hover:text-primary">
                {t.raw('linkPrivacy')}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}#trust`} className="hover:text-primary">
                {t.raw('linkTerms')}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/submit`} className="hover:text-primary">
                {t.raw('linkContact')}
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:text-right">
          <p className="text-sm text-ink-muted">
            © {year} Avenger Advisory. {t('rightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
