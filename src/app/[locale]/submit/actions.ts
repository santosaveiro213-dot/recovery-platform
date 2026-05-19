'use server';

import { redirect } from 'next/navigation';
import { caseSchema } from '@/lib/case-schema';
import { getServerSupabase, isSupabaseConfigured } from '@/lib/supabase/server';
import type { Locale } from '@/i18n/routing';

export interface SubmissionResult {
  ok: boolean;
  fieldErrors?: Partial<Record<string, string>>;
  formError?: string;
}

export async function submitCaseAction(
  _prev: SubmissionResult,
  formData: FormData
): Promise<SubmissionResult> {
  const raw = {
    loss_type: formData.get('loss_type'),
    amount_range: formData.get('amount_range'),
    country: formData.get('country'),
    description: formData.get('description'),
    contact_email: formData.get('contact_email'),
    acknowledge_privacy: formData.get('acknowledge_privacy'),
    consent: formData.get('consent'),
    locale: formData.get('locale') ?? 'en'
  };

  const parsed = caseSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors };
  }

  const data = parsed.data;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await getServerSupabase();
      const payload = {
        loss_type: data.loss_type,
        amount_range: data.amount_range,
        country: data.country,
        description: data.description,
        contact_email: data.contact_email,
        locale: data.locale
      };
      const { error } = await supabase
        .from('case_submissions')
        // Supabase's generated Insert generics depend on the live DB schema; for our
        // hand-authored Database type the value is correctly typed in `payload`.
        .insert(payload as never);
      if (error) {
        return { ok: false, formError: 'generic' };
      }
    } catch {
      // Fall through to redirect — we still want to show the user matches.
    }
  }

  const params = new URLSearchParams({
    loss: data.loss_type,
    country: data.country,
    amount: data.amount_range
  });

  const locale = (data.locale ?? 'en') as Locale;
  redirect(`/${locale}/results?${params.toString()}`);
}
