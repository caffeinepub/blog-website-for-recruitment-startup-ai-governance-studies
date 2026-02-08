import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'card';
}

/**
 * Reusable section wrapper that enforces the cream background for structural sections
 * while allowing card-like surfaces via the 'card' variant.
 */
export function Section({ children, className, variant = 'default' }: SectionProps) {
  return (
    <section
      className={cn(
        'py-20 md:py-28',
        variant === 'default' ? 'bg-background' : 'bg-card',
        className
      )}
    >
      {children}
    </section>
  );
}
