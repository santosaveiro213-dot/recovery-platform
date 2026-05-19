import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-30 border-b border-primary/10 bg-canvas/85 backdrop-blur">
      <div className="container-prose flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="focus-visible:outline-none">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link href={`/${locale}#how-it-works`} className="btn-ghost">
            {t('howItWorks')}
          </Link>
          <Link href={`/${locale}#trust`} className="btn-ghost">
            {t('trust')}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link href={`/${locale}/submit`} className="btn-primary hidden sm:inline-flex">
            {t('submitCase')}
          </Link>
        </div>
      </div>
    </header>
  );
}
