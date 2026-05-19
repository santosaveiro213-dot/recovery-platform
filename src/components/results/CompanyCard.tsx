'use client';

import { useTranslations } from 'next-intl';
import type { Company } from '@/lib/supabase/types';
import { Icon } from '@/components/ui/Icon';

interface CompanyCardProps {
  company: Company;
  index: number;
}

export function CompanyCard({ company, index }: CompanyCardProps) {
  const t = useTranslations('results.matches');
  const tCommon = useTranslations('common');
  const tForm = useTranslations('submit.form.lossType.options');

  const countryKey = `countries.${company.country}` as const;
  const countryLabel = safeT(tCommon, countryKey, company.country);

  return (
    <article
      className="card flex flex-col gap-5 animate-fade-in"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-primary text-secondary">
            <span className="font-serif text-lg font-semibold">{initials(company.name)}</span>
          </span>
          <div>
            <h3 className="font-serif text-lg font-semibold text-primary">{company.name}</h3>
            <p className="text-xs uppercase tracking-[0.12em] text-ink-muted">
              {t('country')}: {countryLabel}
            </p>
          </div>
        </div>
        <span className="chip-accent">
          <Icon name="check" className="h-3.5 w-3.5" />
          Verified
        </span>
      </header>

      <p className="text-sm leading-relaxed text-ink-soft">{company.description}</p>

      <dl className="grid gap-3 text-xs sm:grid-cols-2">
        <div>
          <dt className="font-semibold uppercase tracking-[0.12em] text-ink-muted">
            {t('specialization')}
          </dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {company.specialization.map((spec) => (
              <span key={spec} className="chip">
                {safeT(tForm, spec, spec.replace(/_/g, ' '))}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-[0.12em] text-ink-muted">
            {t('languages')}
          </dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {company.languages.map((lang) => (
              <span key={lang} className="chip-gold">
                {lang.toUpperCase()}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <footer className="flex flex-wrap items-center gap-3 border-t border-primary/10 pt-4">
        {company.website_url && (
          <a
            href={company.website_url}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-ghost"
          >
            <Icon name="globe" className="h-4 w-4" />
            {t('visit')}
          </a>
        )}
        <button type="button" className="btn-primary text-sm">
          {t('request')}
          <Icon name="arrow-right" className="h-4 w-4" />
        </button>
      </footer>
    </article>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

// Helper to safely resolve a translation key with a fallback, since
// next-intl throws on missing keys when strict mode is on.
function safeT(t: (key: string) => string, key: string, fallback: string): string {
  try {
    return t(key);
  } catch {
    return fallback;
  }
}
