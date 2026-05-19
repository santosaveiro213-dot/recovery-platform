'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import { submitCaseAction, type SubmissionResult } from './actions';
import { Icon } from '@/components/ui/Icon';
import { amountRanges, countries, lossTypes } from '@/lib/case-schema';
import { cn } from '@/lib/cn';

const initial: SubmissionResult = { ok: false };

export function SubmitForm() {
  const locale = useLocale();
  const t = useTranslations('submit');
  const tCommon = useTranslations('common');
  const [state, formAction] = useFormState(submitCaseAction, initial);

  function fieldError(name: string) {
    return state.fieldErrors?.[name];
  }

  function errorText(name: string) {
    const code = fieldError(name);
    if (!code) return undefined;
    if (name === 'contact_email') return t('errors.email');
    if (name === 'phone') return t('errors.phone');
    if (name === 'description') return t('errors.description');
    if (name === 'acknowledge_privacy') return t('errors.acknowledge');
    if (name === 'consent') return t('errors.consent');
    return t('errors.required');
  }

  if (state.ok) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-secondary/30 bg-secondary-50 p-6 text-secondary-900"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-secondary text-primary-900">
            <Icon name="lock" className="h-5 w-5" />
          </span>
          <p className="text-base">{t('success')}</p>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8" noValidate>
      <input type="hidden" name="locale" value={locale} />

      <PrivacyNotice
        title={t('privacy.title')}
        body={t('privacy.body')}
        acknowledge={t('privacy.acknowledge')}
        error={errorText('acknowledge_privacy')}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="loss_type" className="form-label">
            {t('form.lossType.label')}
          </label>
          <select
            id="loss_type"
            name="loss_type"
            required
            defaultValue=""
            className={cn('form-input', fieldError('loss_type') && 'border-red-400')}
          >
            <option value="" disabled>
              {t('form.lossType.placeholder')}
            </option>
            {lossTypes.map((value) => (
              <option key={value} value={value}>
                {t(`form.lossType.options.${value}`)}
              </option>
            ))}
          </select>
          <p className="form-help">{t('form.lossType.help')}</p>
          {errorText('loss_type') && <p className="form-error">{errorText('loss_type')}</p>}
        </div>

        <div className="sm:col-span-2">
          <span className="form-label">{t('form.amount.label')}</span>
          <p className="form-help mb-3">{t('form.amount.help')}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {amountRanges.map((value) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-primary/15 bg-canvas-raised px-4 py-3 text-sm transition has-[:checked]:border-accent has-[:checked]:bg-accent-50 has-[:checked]:text-accent-800"
              >
                <input
                  type="radio"
                  name="amount_range"
                  value={value}
                  required
                  className="h-4 w-4 accent-accent"
                />
                <span>{t(`form.amount.options.${value}`)}</span>
              </label>
            ))}
          </div>
          {errorText('amount_range') && <p className="form-error">{errorText('amount_range')}</p>}
        </div>

        <div>
          <label htmlFor="country" className="form-label">
            {t('form.country.label')}
          </label>
          <select
            id="country"
            name="country"
            required
            defaultValue=""
            className={cn('form-input', fieldError('country') && 'border-red-400')}
          >
            <option value="" disabled>
              {tCommon('selectCountry')}
            </option>
            {countries.map((code) => (
              <option key={code} value={code}>
                {tCommon(`countries.${code}`)}
              </option>
            ))}
          </select>
          <p className="form-help">{t('form.country.help')}</p>
          {errorText('country') && <p className="form-error">{errorText('country')}</p>}
        </div>

        <div>
          <label htmlFor="contact_email" className="form-label">
            {t('form.email.label')}
          </label>
          <input
            id="contact_email"
            name="contact_email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder={t('form.email.placeholder')}
            className={cn('form-input', fieldError('contact_email') && 'border-red-400')}
          />
          <p className="form-help">{t('form.email.help')}</p>
          {errorText('contact_email') && <p className="form-error">{errorText('contact_email')}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="phone" className="form-label">
            {t('form.phone.label')}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder={t('form.phone.placeholder')}
            className={cn('form-input', fieldError('phone') && 'border-red-400')}
          />
          <p className="form-help">{t('form.phone.help')}</p>
          {errorText('phone') && <p className="form-error">{errorText('phone')}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="form-label">
            {t('form.description.label')}
          </label>
          <textarea
            id="description"
            name="description"
            required
            minLength={30}
            rows={6}
            placeholder={t('form.description.placeholder')}
            className={cn('form-input resize-y', fieldError('description') && 'border-red-400')}
          />
          <p className="form-help">{t('form.description.help')}</p>
          {errorText('description') && <p className="form-error">{errorText('description')}</p>}
        </div>
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-canvas-raised p-4">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 accent-accent"
        />
        <span className="text-sm text-ink-soft">{t('form.consent.label')}</span>
      </label>
      {errorText('consent') && <p className="form-error">{errorText('consent')}</p>}

      {state.formError && (
        <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {t('errors.generic')}
        </div>
      )}

      <SubmitButton labelIdle={t('form.submit')} labelBusy={t('form.submitting')} />
    </form>
  );
}

function SubmitButton({ labelIdle, labelBusy }: { labelIdle: string; labelBusy: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary w-full sm:w-auto" disabled={pending}>
      {pending ? labelBusy : labelIdle}
      {!pending && <Icon name="arrow-right" className="h-4 w-4" />}
    </button>
  );
}

interface PrivacyProps {
  title: string;
  body: string;
  acknowledge: string;
  error?: string;
}

function PrivacyNotice({ title, body, acknowledge, error }: PrivacyProps) {
  return (
    <div className="rounded-2xl border border-secondary/30 bg-secondary-50 p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-secondary text-primary-900">
          <Icon name="lock" className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <h2 className="font-serif text-base font-semibold text-secondary-800">{title}</h2>
          <p className="mt-1 text-sm text-secondary-900/80">{body}</p>
          <label className="mt-3 flex items-start gap-2 text-sm text-secondary-900">
            <input
              type="checkbox"
              name="acknowledge_privacy"
              required
              className="mt-1 h-4 w-4 accent-accent"
            />
            <span>{acknowledge}</span>
          </label>
          {error && <p className="form-error">{error}</p>}
        </div>
      </div>
    </div>
  );
}
