'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

type TypeKey = 'investment_fraud' | 'crypto_recovery' | 'bank_fraud' | 'romance_scam';

interface CaseRow {
  id: string;
  typeKey: TypeKey;
  city: string;
  countryCode: string;
  status: 'review' | 'matched';
  matchedMinutes: number;
  leaving?: boolean;
}

const TYPE_KEYS: readonly TypeKey[] = [
  'investment_fraud',
  'crypto_recovery',
  'bank_fraud',
  'romance_scam'
];

const CITIES: ReadonlyArray<{ city: string; code: string }> = [
  { city: 'Berlin', code: 'DE' },
  { city: 'Munich', code: 'DE' },
  { city: 'Hamburg', code: 'DE' },
  { city: 'Frankfurt', code: 'DE' },
  { city: 'Cologne', code: 'DE' },
  { city: 'Vienna', code: 'AT' },
  { city: 'Salzburg', code: 'AT' },
  { city: 'Graz', code: 'AT' },
  { city: 'Zurich', code: 'CH' },
  { city: 'Geneva', code: 'CH' },
  { city: 'Basel', code: 'CH' },
  { city: 'Paris', code: 'FR' },
  { city: 'Lyon', code: 'FR' },
  { city: 'Marseille', code: 'FR' },
  { city: 'Amsterdam', code: 'NL' },
  { city: 'Rotterdam', code: 'NL' },
  { city: 'Brussels', code: 'BE' },
  { city: 'Antwerp', code: 'BE' },
  { city: 'Madrid', code: 'ES' },
  { city: 'Barcelona', code: 'ES' },
  { city: 'Valencia', code: 'ES' },
  { city: 'Rome', code: 'IT' },
  { city: 'Milan', code: 'IT' },
  { city: 'Naples', code: 'IT' },
  { city: 'Lisbon', code: 'PT' },
  { city: 'Porto', code: 'PT' },
  { city: 'Dublin', code: 'IE' },
  { city: 'London', code: 'GB' },
  { city: 'Manchester', code: 'GB' },
  { city: 'Edinburgh', code: 'GB' },
  { city: 'Stockholm', code: 'SE' },
  { city: 'Gothenburg', code: 'SE' },
  { city: 'Oslo', code: 'NO' },
  { city: 'Copenhagen', code: 'DK' },
  { city: 'Helsinki', code: 'FI' },
  { city: 'Warsaw', code: 'PL' },
  { city: 'Krakow', code: 'PL' },
  { city: 'Prague', code: 'CZ' }
];

const MAX_VISIBLE = 6;
const ADD_INTERVAL_MIN_MS = 8000;
const ADD_INTERVAL_MAX_MS = 12000;
const MATCH_DELAY_MIN_MS = 5000;
const MATCH_DELAY_MAX_MS = 10000;
const LEAVE_ANIMATION_MS = 500;
const MATCH_MIN_MINUTES = 8;
const MATCH_MAX_MINUTES = 25;

// Deterministic seed so SSR and first client render agree.
const INITIAL_QUEUE: CaseRow[] = [
  { id: 'seed-1', typeKey: 'investment_fraud', city: 'Berlin', countryCode: 'DE', status: 'matched', matchedMinutes: 12 },
  { id: 'seed-2', typeKey: 'crypto_recovery', city: 'Zurich', countryCode: 'CH', status: 'matched', matchedMinutes: 18 },
  { id: 'seed-3', typeKey: 'bank_fraud', city: 'Dublin', countryCode: 'IE', status: 'matched', matchedMinutes: 9 },
  { id: 'seed-4', typeKey: 'romance_scam', city: 'Vienna', countryCode: 'AT', status: 'review', matchedMinutes: 0 }
];

function pickRandom<T>(arr: ReadonlyArray<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function makeCase(): CaseRow {
  const place = pickRandom(CITIES);
  return {
    id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    typeKey: pickRandom(TYPE_KEYS),
    city: place.city,
    countryCode: place.code,
    status: 'review',
    matchedMinutes: 0
  };
}

export function LiveAdvisoryQueue() {
  const t = useTranslations('landing.queue');
  const [queue, setQueue] = useState<CaseRow[]>(INITIAL_QUEUE);
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  useEffect(() => {
    let cancelled = false;
    const timers = timersRef.current;

    const track = (cb: () => void, delay: number) => {
      const id = setTimeout(() => {
        timers.delete(id);
        if (!cancelled) cb();
      }, delay);
      timers.add(id);
    };

    const scheduleAdd = () => {
      track(() => {
        const newCase = makeCase();

        setQueue((prev) => {
          const withNew = [newCase, ...prev];
          if (withNew.length > MAX_VISIBLE) {
            return withNew.map((row, idx) =>
              idx === withNew.length - 1 ? { ...row, leaving: true } : row
            );
          }
          return withNew;
        });

        track(() => {
          setQueue((prev) => prev.filter((c) => !c.leaving));
        }, LEAVE_ANIMATION_MS);

        track(() => {
          setQueue((prev) =>
            prev.map((c) =>
              c.id === newCase.id
                ? {
                    ...c,
                    status: 'matched' as const,
                    matchedMinutes: randomInt(MATCH_MIN_MINUTES, MATCH_MAX_MINUTES)
                  }
                : c
            )
          );
        }, randomInt(MATCH_DELAY_MIN_MS, MATCH_DELAY_MAX_MS));

        scheduleAdd();
      }, randomInt(ADD_INTERVAL_MIN_MS, ADD_INTERVAL_MAX_MS));
    };

    scheduleAdd();

    return () => {
      cancelled = true;
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
    };
  }, []);

  return (
    <div className="relative">
      <div className="card relative overflow-hidden p-0">
        <div className="flex items-center border-b border-primary/10 bg-canvas-sunken/60 px-6 py-3 text-xs uppercase tracking-[0.16em] text-ink-muted">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent animate-pulse-soft" />
          {t('header')}
        </div>
        <ul className="divide-y divide-primary/10">
          {queue.map((row) => (
            <li
              key={row.id}
              className={
                row.leaving
                  ? 'pointer-events-none flex -translate-y-1 items-center justify-between gap-4 px-6 py-4 opacity-0 transition-all duration-500 ease-in'
                  : 'flex items-center justify-between gap-4 px-6 py-4 animate-fade-in'
              }
            >
              <div>
                <p className="text-sm font-medium text-ink">{t(`types.${row.typeKey}`)}</p>
                <p className="text-xs text-ink-muted">
                  {row.city}, {row.countryCode}
                </p>
              </div>
              <span className={row.status === 'matched' ? 'chip-accent' : 'chip-gold'}>
                {row.status === 'matched'
                  ? t('status.matched', { min: row.matchedMinutes })
                  : t('status.review')}
              </span>
            </li>
          ))}
        </ul>
        <div className="border-t border-primary/10 bg-canvas-sunken/40 px-6 py-3 text-xs text-ink-muted">
          {t('footer')}
        </div>
      </div>

      <div
        aria-hidden
        className="absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-full bg-secondary/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -top-8 -left-8 -z-10 h-32 w-32 rounded-full bg-accent/30 blur-3xl"
      />
    </div>
  );
}
