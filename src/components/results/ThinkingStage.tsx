'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ThinkingNetwork } from './ThinkingNetwork';
import { cn } from '@/lib/cn';

interface ThinkingStageProps {
  durationMs?: number;
  onComplete: () => void;
}

export function ThinkingStage({ durationMs = 5000, onComplete }: ThinkingStageProps) {
  const t = useTranslations('results.thinking');
  const messages = t.raw('messages') as string[];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const perMessage = Math.max(900, Math.floor(durationMs / messages.length));
    const interval = setInterval(() => {
      setIndex((i) => Math.min(i + 1, messages.length - 1));
    }, perMessage);

    const timeout = setTimeout(onComplete, durationMs);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [durationMs, messages.length, onComplete]);

  return (
    <section
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-8 py-16 text-center sm:py-24"
    >
      <ThinkingNetwork />

      <div className="max-w-xl">
        <h1 className="font-serif text-3xl font-semibold text-primary sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-2 text-sm text-ink-muted">{t('subtitle')}</p>

        <div className="relative mt-8 h-7 overflow-hidden">
          {messages.map((msg, idx) => (
            <p
              key={msg}
              className={cn(
                'absolute inset-x-0 text-base font-medium text-accent-700 transition-all duration-500',
                idx === index
                  ? 'translate-y-0 opacity-100'
                  : idx < index
                    ? '-translate-y-full opacity-0'
                    : 'translate-y-full opacity-0'
              )}
            >
              {msg}
            </p>
          ))}
        </div>

        <div className="mx-auto mt-6 h-1 w-48 overflow-hidden rounded-full bg-primary/10">
          <div
            className="h-full bg-gradient-to-r from-primary via-accent to-secondary"
            style={{ animation: `progress ${durationMs}ms linear forwards` }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
