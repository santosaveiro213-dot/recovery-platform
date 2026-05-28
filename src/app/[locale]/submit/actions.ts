'use server';

import { caseSchema } from '@/lib/case-schema';
import { getServerSupabase, isSupabaseConfigured } from '@/lib/supabase/server';

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
    phone: formData.get('phone'),
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

  if (!isSupabaseConfigured()) {
    console.error('[submitCaseAction] Supabase env vars are missing — submission was not saved.');
    return { ok: false, formError: 'generic' };
  }

  try {
    const supabase = await getServerSupabase();
    const payload = {
      loss_type: data.loss_type,
      amount_range: data.amount_range,
      country: data.country,
      description: data.description,
      contact_email: data.contact_email,
      phone: data.phone,
      locale: data.locale
    };
    const { error } = await supabase
      .from('case_submissions')
      .insert(payload as never);
    if (error) {
      console.error('[submitCaseAction] Supabase insert failed:', error);
      return { ok: false, formError: 'generic' };
    }
  } catch (err) {
    console.error('[submitCaseAction] Unexpected error while saving submission:', err);
    return { ok: false, formError: 'generic' };
  }

  void fetch('https://avekizuna.com/api/webhook/lead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.WEBHOOK_API_KEY ?? ''
    },
    body: JSON.stringify({
      fullName: data.contact_email,
      email: data.contact_email,
      phone: data.phone,
      source: 'Avenger'
    })
  }).catch(() => {});

  return { ok: true };
}
