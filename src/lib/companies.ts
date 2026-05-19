import { getServerSupabase, isSupabaseConfigured } from './supabase/server';
import type { Company, CompanySpecialization } from './supabase/types';

const FALLBACK_COMPANIES: Company[] = [
  {
    id: 'seed-meridian',
    name: 'Meridian Asset Recovery',
    description:
      'Independent recovery practice focused on cross-border investment fraud. Works with EU and UK regulators and supports victims through formal complaint and civil-claim procedures.',
    website_url: 'https://example.com/meridian',
    logo_url: null,
    specialization: ['investment_fraud', 'bank_fraud'],
    languages: ['en', 'de', 'fr'],
    country: 'DE',
    is_active: true
  },
  {
    id: 'seed-chainwise',
    name: 'Chainwise Forensics',
    description:
      'Blockchain forensics and crypto-asset tracing specialists. Prepares tracing reports admissible in EU and US proceedings and coordinates with regulated exchanges to freeze funds.',
    website_url: 'https://example.com/chainwise',
    logo_url: null,
    specialization: ['crypto_loss', 'investment_fraud'],
    languages: ['en', 'de'],
    country: 'CH',
    is_active: true
  },
  {
    id: 'seed-sentinel',
    name: 'Sentinel Recovery Partners',
    description:
      'Boutique advisory representing retail victims of card fraud and unauthorised wire transfers. Strong record with chargebacks and bank ombudsman procedures across the UK and Ireland.',
    website_url: 'https://example.com/sentinel',
    logo_url: null,
    specialization: ['bank_fraud', 'other'],
    languages: ['en'],
    country: 'GB',
    is_active: true
  },
  {
    id: 'seed-haven',
    name: 'Haven Victim Advocacy',
    description:
      'Sensitive, trauma-informed support for victims of romance scams and long-running grooming fraud. Combines legal coordination with practical financial-safety counselling.',
    website_url: 'https://example.com/haven',
    logo_url: null,
    specialization: ['romance_scam', 'other'],
    languages: ['en', 'de', 'nl'],
    country: 'NL',
    is_active: true
  },
  {
    id: 'seed-northstar',
    name: 'Northstar Legal Group',
    description:
      'Full-service law firm with a dedicated financial-crime victims practice. Handles complex international cases involving multiple jurisdictions and recovers funds through civil and criminal channels.',
    website_url: 'https://example.com/northstar',
    logo_url: null,
    specialization: ['investment_fraud', 'crypto_loss', 'bank_fraud'],
    languages: ['en', 'de', 'it'],
    country: 'AT',
    is_active: true
  }
];

export interface MatchCriteria {
  lossType: CompanySpecialization;
  country: string;
  locale: 'en' | 'de';
}

export async function getActiveCompanies(): Promise<Company[]> {
  if (!isSupabaseConfigured()) {
    return FALLBACK_COMPANIES;
  }

  try {
    const supabase = await getServerSupabase();
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('is_active', true);

    if (error || !data || data.length === 0) {
      return FALLBACK_COMPANIES;
    }

    return data;
  } catch {
    return FALLBACK_COMPANIES;
  }
}

export function matchCompanies(companies: Company[], criteria: MatchCriteria): Company[] {
  const scored = companies
    .filter((c) => c.is_active)
    .map((company) => {
      let score = 0;
      if (company.specialization.includes(criteria.lossType)) score += 5;
      if (company.specialization.includes('other')) score += 1;
      if (company.country === criteria.country) score += 3;
      if (company.languages.includes(criteria.locale)) score += 2;
      return { company, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 4).map((entry) => entry.company);
}
