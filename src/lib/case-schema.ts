import { z } from 'zod';

export const lossTypes = [
  'investment_fraud',
  'crypto_loss',
  'bank_fraud',
  'romance_scam',
  'other'
] as const;

export const amountRanges = [
  'under_5k',
  '5k_25k',
  '25k_100k',
  '100k_500k',
  'over_500k',
  'prefer_not'
] as const;

export const countries = [
  'DE',
  'AT',
  'CH',
  'GB',
  'IE',
  'FR',
  'NL',
  'BE',
  'ES',
  'IT',
  'PT',
  'SE',
  'NO',
  'DK',
  'FI',
  'PL',
  'CZ',
  'US',
  'CA',
  'AU',
  'OTHER'
] as const;

export const caseSchema = z.object({
  loss_type: z.enum(lossTypes),
  amount_range: z.enum(amountRanges),
  country: z.enum(countries),
  description: z.string().trim().min(30),
  contact_email: z.string().trim().email(),
  phone: z
    .string()
    .trim()
    .min(6)
    .regex(/^[+\d][\d\s()-]{5,}$/),
  acknowledge_privacy: z.literal('on'),
  consent: z.literal('on'),
  locale: z.enum(['en', 'de']).default('en')
});

export type CaseInput = z.infer<typeof caseSchema>;
export type LossType = (typeof lossTypes)[number];
export type AmountRange = (typeof amountRanges)[number];
export type CountryCode = (typeof countries)[number];
