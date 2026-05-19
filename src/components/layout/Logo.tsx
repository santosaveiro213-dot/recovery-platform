import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  iconClassName?: string;
}

export function Logo({ className, iconClassName }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span
        aria-hidden
        className={cn(
          'relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-secondary shadow-soft',
          iconClassName
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-lg font-semibold text-primary">Avenger</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          Financial Recovery Advisory
        </span>
      </span>
    </span>
  );
}
