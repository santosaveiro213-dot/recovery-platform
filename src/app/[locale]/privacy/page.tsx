import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'privacy' });
  const sections = t.raw('sections') as Array<{ title: string; body: string }>;

  return (
    <article className="container-prose py-16 sm:py-20">
      <SectionEyebrow tone="primary">{t('eyebrow')}</SectionEyebrow>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-primary sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-2 text-sm text-ink-muted">{t('lastUpdated')}</p>
      <p className="mt-6 max-w-3xl text-lg text-ink-soft">{t('intro')}</p>
      <div className="mt-10 max-w-3xl space-y-8">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-serif text-xl font-semibold text-primary sm:text-2xl">
              {s.title}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
