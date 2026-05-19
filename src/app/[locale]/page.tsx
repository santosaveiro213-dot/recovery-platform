import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { Icon } from '@/components/ui/Icon';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LandingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'landing' });
  const steps = t.raw('howItWorks.steps') as Array<{ title: string; body: string }>;
  const pillars = t.raw('trust.pillars') as Array<{ title: string; body: string }>;

  const stepIcons = ['pencil', 'compass', 'handshake'] as const;
  const pillarIcons = ['shield', 'check', 'lock', 'sparkle'] as const;

  return (
    <>
      <HeroSection
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctaPrimary={t('hero.ctaPrimary')}
        ctaSecondary={t('hero.ctaSecondary')}
        reassurance={t('hero.reassurance')}
        submitHref={`/${locale}/submit`}
        stats={{
          casesReviewed: t('stats.casesReviewed'),
          partnerFirms: t('stats.partnerFirms'),
          countries: t('stats.countries'),
          avgResponse: t('stats.avgResponse')
        }}
      />

      <section id="how-it-works" className="py-20 sm:py-24">
        <div className="container-prose">
          <div className="max-w-3xl">
            <SectionEyebrow tone="accent">{t('howItWorks.eyebrow')}</SectionEyebrow>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-primary sm:text-4xl">
              {t('howItWorks.title')}
            </h2>
            <p className="mt-4 text-lg text-ink-soft">{t('howItWorks.subtitle')}</p>
          </div>

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, idx) => (
              <li
                key={step.title}
                className="card relative flex flex-col gap-4 animate-fade-in"
                style={{ animationDelay: `${idx * 90}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                    <Icon name={stepIcons[idx]} className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary-700">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-primary">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="trust" className="bg-canvas-sunken/50 py-20 sm:py-24">
        <div className="container-prose">
          <div className="max-w-3xl">
            <SectionEyebrow tone="gold">{t('trust.eyebrow')}</SectionEyebrow>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-primary sm:text-4xl">
              {t('trust.title')}
            </h2>
            <p className="mt-4 text-lg text-ink-soft">{t('trust.subtitle')}</p>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {pillars.map((pillar, idx) => (
              <li
                key={pillar.title}
                className="card flex gap-4 animate-fade-in"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-accent-50 text-accent-700">
                  <Icon name={pillarIcons[idx % pillarIcons.length]} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-primary">{pillar.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{pillar.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-prose">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center text-white shadow-lift sm:px-16">
            <div
              aria-hidden
              className="absolute inset-0 opacity-25"
              style={{
                background:
                  'radial-gradient(circle at 20% 20%, rgba(201,168,76,0.45), transparent 45%), radial-gradient(circle at 80% 70%, rgba(42,157,143,0.35), transparent 50%)'
              }}
            />
            <div className="relative">
              <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{t('cta.title')}</h2>
              <p className="mx-auto mt-3 max-w-2xl text-base text-white/85">{t('cta.subtitle')}</p>
              <Link
                href={`/${locale}/submit`}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-secondary px-7 py-3 text-base font-semibold text-primary-900 shadow-soft transition hover:bg-secondary-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/40"
              >
                {t('cta.button')}
                <Icon name="arrow-right" className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

interface HeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  reassurance: string;
  submitHref: string;
  stats: {
    casesReviewed: string;
    partnerFirms: string;
    countries: string;
    avgResponse: string;
  };
}

function HeroSection({
  eyebrow,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  reassurance,
  submitHref,
  stats
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(1000px 500px at 80% -10%, rgba(42,157,143,0.18), transparent 60%), radial-gradient(800px 400px at 5% 30%, rgba(201,168,76,0.18), transparent 60%)'
        }}
      />
      <div className="container-prose relative grid gap-12 py-20 md:grid-cols-[1.15fr_1fr] md:py-28">
        <div>
          <SectionEyebrow tone="primary">{eyebrow}</SectionEyebrow>
          <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-primary sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">{subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={submitHref} className="btn-primary">
              {ctaPrimary}
              <Icon name="arrow-right" className="h-4 w-4" />
            </Link>
            <Link href="#how-it-works" className="btn-secondary">
              {ctaSecondary}
            </Link>
          </div>

          <p className="mt-5 text-sm font-medium text-accent-700">{reassurance}</p>

          <dl className="mt-12 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4">
            <Stat value="3,200+" label={stats.casesReviewed} />
            <Stat value="48" label={stats.partnerFirms} />
            <Stat value="14" label={stats.countries} />
            <Stat value="&lt; 24h" label={stats.avgResponse} />
          </dl>
        </div>

        <HeroIllustration />
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt
        className="font-serif text-2xl font-semibold text-primary"
        dangerouslySetInnerHTML={{ __html: value }}
      />
      <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-muted">{label}</dd>
    </div>
  );
}

function HeroIllustration() {
  return (
    <div className="relative">
      <div className="card relative overflow-hidden p-0">
        <div className="border-b border-primary/10 bg-canvas-sunken/60 px-6 py-3 text-xs uppercase tracking-[0.16em] text-ink-muted">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent" />
          Live advisory queue
        </div>
        <ul className="divide-y divide-primary/10">
          {[
            { city: 'Berlin, DE', type: 'Investment fraud', match: 'Matched in 12 min' },
            { city: 'Zurich, CH', type: 'Crypto recovery', match: 'Matched in 18 min' },
            { city: 'Dublin, IE', type: 'Card fraud', match: 'Matched in 9 min' },
            { city: 'Vienna, AT', type: 'Romance scam', match: 'In review' }
          ].map((row) => (
            <li key={row.city} className="flex items-center justify-between gap-4 px-6 py-4">
              <div>
                <p className="text-sm font-medium text-ink">{row.type}</p>
                <p className="text-xs text-ink-muted">{row.city}</p>
              </div>
              <span className="chip-accent">{row.match}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-primary/10 bg-canvas-sunken/40 px-6 py-3 text-xs text-ink-muted">
          Advisors are reviewing cases right now.
        </div>
      </div>

      <div
        aria-hidden
        className="absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-full bg-secondary/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -top-8 -left-8 -z-10 h-32 w-32 rounded-full bg-accent/30 blur-3xl"
      />
    </div>
  );
}
