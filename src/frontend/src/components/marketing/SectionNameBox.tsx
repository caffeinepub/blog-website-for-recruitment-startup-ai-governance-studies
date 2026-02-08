import { useInViewOnce } from '@/hooks/useInViewOnce';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface SectionNameBoxProps {
  name: string;
}

export function SectionNameBox({ name }: SectionNameBoxProps) {
  const { ref, isInView } = useInViewOnce({ threshold: 0.3 });
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className={`section-name-box ${
        prefersReducedMotion ? '' : isInView ? 'animate-fade-in' : 'opacity-0'
      }`}
    >
      {name}
    </div>
  );
}
