import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { Icon } from '@/components/ui/Icon';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });
  const email = t('email');

  return (
    <article className="container-prose py-16 sm:py-20">
      <SectionEyebrow tone="primary">{t('eyebrow')}</SectionEyebrow>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-primary sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-6 max-w-3xl text-lg text-ink-soft">{t('intro')}</p>

      <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            {t('emailLabel')}
          </p>
          <a
            href={`mailto:${email}`}
            className="mt-3 inline-flex items-center gap-2 font-serif text-lg font-semibold text-primary hover:text-accent"
          >
            {email}
            <Icon name="arrow-right" className="h-4 w-4" />
          </a>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            {t('responseLabel')}
          </p>
          <p className="mt-3 text-base text-ink-soft">{t('response')}</p>
        </div>
      </div>

      <div className="mt-10 max-w-3xl rounded-2xl border border-secondary/30 bg-secondary-50 p-6">
        <p className="text-sm font-semibold text-secondary-800">{t('caseLinkLabel')}</p>
        <Link
          href={`/${locale}/submit`}
          className="mt-3 inline-flex items-center gap-2 text-base font-medium text-primary hover:text-accent"
        >
          {t('caseLinkText')}
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
