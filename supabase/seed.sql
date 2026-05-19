-- Optional seed data for local development
insert into public.companies (name, description, website_url, specialization, languages, country, is_active) values
  (
    'Meridian Asset Recovery',
    'Independent recovery practice focused on cross-border investment fraud. Works with EU and UK regulators and supports victims through formal complaint and civil-claim procedures.',
    'https://example.com/meridian',
    array['investment_fraud','bank_fraud']::specialization_t[],
    array['en','de','fr'],
    'DE',
    true
  ),
  (
    'Chainwise Forensics',
    'Blockchain forensics and crypto-asset tracing specialists. Prepares tracing reports admissible in EU and US proceedings and coordinates with regulated exchanges to freeze funds.',
    'https://example.com/chainwise',
    array['crypto_loss','investment_fraud']::specialization_t[],
    array['en','de'],
    'CH',
    true
  ),
  (
    'Sentinel Recovery Partners',
    'Boutique advisory representing retail victims of card fraud and unauthorised wire transfers. Strong record with chargebacks and bank ombudsman procedures across the UK and Ireland.',
    'https://example.com/sentinel',
    array['bank_fraud','other']::specialization_t[],
    array['en'],
    'GB',
    true
  ),
  (
    'Haven Victim Advocacy',
    'Sensitive, trauma-informed support for victims of romance scams and long-running grooming fraud. Combines legal coordination with practical financial-safety counselling.',
    'https://example.com/haven',
    array['romance_scam','other']::specialization_t[],
    array['en','de','nl'],
    'NL',
    true
  ),
  (
    'Northstar Legal Group',
    'Full-service law firm with a dedicated financial-crime victims practice. Handles complex international cases involving multiple jurisdictions and recovers funds through civil and criminal channels.',
    'https://example.com/northstar',
    array['investment_fraud','crypto_loss','bank_fraud']::specialization_t[],
    array['en','de','it'],
    'AT',
    true
  );
