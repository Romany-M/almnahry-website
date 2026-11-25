import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { Building2 } from 'lucide-react';

export const ARCHITECTURAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const ScrollProgressBeam: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[2px] bg-[#C9974A] origin-right z-[60] pointer-events-none"
      style={{ scaleX }}
    />
  );
};

interface RevealBlockProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export const RevealBlock: React.FC<RevealBlockProps> = ({
  children,
  delay = 0,
  y = 26,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.72, delay, ease: ARCHITECTURAL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedCounterProps {
  target: number;
  startFrom?: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  startFrom,
  suffix = '',
  durationMs = 1100,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const shouldReduceMotion = useReducedMotion();
  const initialStart = startFrom ?? (target > 1900 ? target - 28 : 0);
  const [displayValue, setDisplayValue] = useState<number>(target);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion || !isInView || hasAnimated.current) {
      return;
    }
    hasAnimated.current = true;
    const startTime = performance.now();

    let rafId = 0;
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(initialStart + (target - initialStart) * eased);
      setDisplayValue(current);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    setDisplayValue(initialStart);
    rafId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, initialStart, durationMs, shouldReduceMotion]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {displayValue}
      {suffix}
    </span>
  );
};

interface ParallaxImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
  imgClassName?: string;
  parallaxAmount?: number;
  eager?: boolean;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  fallbackTitle,
  className = '',
  imgClassName = '',
  parallaxAmount = 32,
  eager = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-parallaxAmount, parallaxAmount]
  );

  return (
    <div ref={containerRef} className={`relative overflow-hidden bg-[#1A1D21] ${className}`}>
      {hasError ? (
        <div className="w-full h-full min-h-[240px] flex flex-col items-center justify-center gap-3 p-6 text-center bg-gradient-to-br from-[#1C2026] to-[#111315] text-[#EAE8E1]">
          <Building2 className="w-8 h-8 text-[#C9974A]" aria-hidden="true" />
          <span className="text-sm font-medium">{fallbackTitle}</span>
        </div>
      ) : (
        <motion.img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={eager ? 'eager' : 'lazy'}
          onError={() => setHasError(true)}
          style={{ y, scale: shouldReduceMotion ? 1 : 1.09 }}
          className={`w-full h-full object-cover will-change-transform ${imgClassName}`}
        />
      )}
    </div>
  );
};

interface WordItemProps {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}

const IlluminatedWord: React.FC<WordItemProps> = ({ word, range, progress }) => {
  const opacity = useTransform(progress, range, [0.28, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block ml-[0.28em]">
      {word}
    </motion.span>
  );
};

interface ScrollIlluminatedQuoteProps {
  text: string;
  className?: string;
}

export const ScrollIlluminatedQuote: React.FC<ScrollIlluminatedQuoteProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.88', 'end 0.55'],
  });

  const words = text.split(' ');

  if (shouldReduceMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = Math.min(start + 1.4 / words.length, 1);
        return (
          <IlluminatedWord
            key={`${word}-${index}`}
            word={word}
            range={[start, end]}
            progress={scrollYProgress}
          />
        );
      })}
    </p>
  );
};
