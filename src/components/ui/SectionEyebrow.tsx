import { cn } from '@/lib/cn';

interface SectionEyebrowProps {
  children: React.ReactNode;
  tone?: 'accent' | 'gold' | 'primary';
  className?: string;
}

export function SectionEyebrow({ children, tone = 'accent', className }: SectionEyebrowProps) {
  const tones: Record<string, string> = {
    accent: 'bg-accent-50 text-accent-700',
    gold: 'bg-secondary-100 text-secondary-800',
    primary: 'bg-primary-50 text-primary-800'
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]',
        tones[tone],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {children}
    </span>
  );
}
