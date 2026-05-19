import { setRequestLocale } from 'next-intl/server';
import { ResultsView } from '@/components/results/ResultsView';
import { getActiveCompanies, matchCompanies } from '@/lib/companies';
import { lossTypes, countries, type LossType, type CountryCode } from '@/lib/case-schema';
import type { Locale } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ResultsPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;

  const lossRaw = first(sp.loss);
  const countryRaw = first(sp.country);

  const lossType: LossType = (lossTypes as readonly string[]).includes(lossRaw ?? '')
    ? (lossRaw as LossType)
    : 'other';
  const country: CountryCode = (countries as readonly string[]).includes(countryRaw ?? '')
    ? (countryRaw as CountryCode)
    : 'OTHER';

  const all = await getActiveCompanies();
  const matches = matchCompanies(all, {
    lossType,
    country,
    locale: locale as Locale
  });

  // If no scored match, fall back to top vetted firms so the user still sees something useful.
  const finalMatches = matches.length > 0 ? matches : all.slice(0, 3);

  return <ResultsView companies={finalMatches} />;
}

function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}
