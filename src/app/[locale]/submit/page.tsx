import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { SubmitForm } from './SubmitForm';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SubmitPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'submit.header' });

  return (
    <section className="py-16 sm:py-24">
      <div className="container-prose max-w-3xl">
        <SectionEyebrow tone="accent">{t('eyebrow')}</SectionEyebrow>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-primary sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-3 text-lg text-ink-soft">{t('subtitle')}</p>

        <div className="card mt-10 p-6 sm:p-8">
          <SubmitForm />
        </div>
      </div>
    </section>
  );
}
