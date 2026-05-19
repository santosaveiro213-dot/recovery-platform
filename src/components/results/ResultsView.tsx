'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Company } from '@/lib/supabase/types';
import { ThinkingStage } from './ThinkingStage';
import { CompanyCard } from './CompanyCard';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { Icon } from '@/components/ui/Icon';

interface ResultsViewProps {
  companies: Company[];
}

export function ResultsView({ companies }: ResultsViewProps) {
  const [stage, setStage] = useState<'thinking' | 'matches'>('thinking');
  const t = useTranslations('results.matches');

  if (stage === 'thinking') {
    return <ThinkingStage onComplete={() => setStage('matches')} />;
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="container-prose">
        <div className="max-w-2xl animate-fade-in">
          <SectionEyebrow tone="accent">{t('eyebrow')}</SectionEyebrow>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-primary sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-3 text-lg text-ink-soft">{t('subtitle')}</p>
        </div>

        {companies.length === 0 ? (
          <div className="card mt-10 flex items-start gap-4 animate-fade-in">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-accent-50 text-accent-700">
              <Icon name="info" />
            </span>
            <p className="text-base text-ink-soft">{t('empty')}</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {companies.map((company, idx) => (
              <CompanyCard key={company.id} company={company} index={idx} />
            ))}
          </div>
        )}

        <div className="mt-10 rounded-2xl border border-primary/10 bg-canvas-sunken/40 p-5 text-sm text-ink-soft animate-fade-in">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-primary text-secondary">
              <Icon name="envelope" />
            </span>
            <p>{t('advisorNote')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
