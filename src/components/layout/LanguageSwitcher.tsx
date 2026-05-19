'use client';

import { useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { locales, localeNames, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('nav');

  function switchTo(next: Locale) {
    if (next === currentLocale) return;
    const segments = pathname.split('/');
    if (segments.length > 1 && (locales as readonly string[]).includes(segments[1])) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    const nextPath = segments.join('/') || `/${next}`;
    startTransition(() => router.replace(nextPath));
  }

  return (
    <div
      role="group"
      aria-label={t('languageLabel')}
      className={cn(
        'inline-flex items-center rounded-full border border-primary/15 bg-canvas-raised p-1 text-xs font-medium',
        isPending && 'opacity-70'
      )}
    >
      {locales.map((loc) => {
        const active = loc === currentLocale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            className={cn(
              'rounded-full px-3 py-1 transition',
              active
                ? 'bg-primary text-white shadow-sm'
                : 'text-ink-muted hover:text-primary'
            )}
            aria-pressed={active}
          >
            {loc.toUpperCase()}
            <span className="sr-only"> – {localeNames[loc]}</span>
          </button>
        );
      })}
    </div>
  );
}
