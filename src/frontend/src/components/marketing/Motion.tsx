import { ReactNode } from 'react';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface PageFadeInProps {
  children: ReactNode;
}

export function PageFadeIn({ children }: PageFadeInProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={prefersReducedMotion ? '' : 'animate-page-fade-in'}>
      {children}
    </div>
  );
}

interface InViewFadeProps {
  children: ReactNode;
  delay?: number;
}

export function InViewFade({ children, delay = 0 }: InViewFadeProps) {
  const { ref, isInView } = useInViewOnce();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className={
        prefersReducedMotion
          ? ''
          : isInView
          ? 'animate-fade-in-up'
          : 'opacity-0'
      }
      style={!prefersReducedMotion && delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
