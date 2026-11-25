import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { Buildings } from '@phosphor-icons/react';

export const BASE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const ScrollProgressBeam: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 190,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[3px] origin-right z-[70] pointer-events-none bg-gradient-to-l from-[#1D4ED8] via-[#2563EB] to-[#60A5FA]"
      style={{ scaleX }}
    />
  );
};

interface DarkChapterAtmosphereProps {
  variant?: 'navy' | 'charcoal';
}

export const DarkChapterAtmosphere: React.FC<DarkChapterAtmosphereProps> = ({
  variant = 'navy',
}) => {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`animate-navy-aura absolute -top-28 right-[15%] w-[560px] h-[520px] rounded-full blur-[150px] ${
          variant === 'charcoal' ? 'bg-[#2563EB]/14' : 'bg-[#2563EB]/18'
        }`}
      />
      <div className="animate-navy-aura absolute -bottom-36 left-[10%] w-[480px] h-[440px] rounded-full bg-[#38BDF8]/10 blur-[150px]" />
    </div>
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
  y = 32,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.14 }}
        transition={{ duration: 0.35 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.72, delay, ease: BASE_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface CinematicImageRevealProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  direction?: 'up' | 'right' | 'left';
  delay?: number;
  immediate?: boolean;
  className?: string;
  imgClassName?: string;
}

/* Architectural Curtain + Decoupled Entrance Scale so CSS group-hover zoom never collides with Motion inline transform */
export const CinematicImageReveal: React.FC<CinematicImageRevealProps> = ({
  src,
  alt,
  fallbackTitle,
  direction = 'up',
  delay = 0,
  immediate = false,
  className = '',
  imgClassName = '',
}) => {
  const [hasError, setHasError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const initialClip =
    direction === 'right'
      ? 'inset(0% 0% 0% 100%)'
      : direction === 'left'
        ? 'inset(0% 100% 0% 0%)'
        : 'inset(100% 0% 0% 0%)';

  const revealTarget = shouldReduceMotion
    ? { opacity: 1 }
    : { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 };

  const scaleTarget = shouldReduceMotion ? undefined : { scale: 1 };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { clipPath: initialClip, opacity: 0.6 }}
      animate={immediate ? revealTarget : undefined}
      whileInView={immediate ? undefined : revealTarget}
      viewport={immediate ? undefined : { once: true, amount: 0.12 }}
      transition={{ duration: immediate ? 0.65 : 0.88, delay, ease: BASE_EASE }}
      className={`relative overflow-hidden bg-[#0D1B31] ${className}`}
    >
      {hasError ? (
        <div className="w-full h-full min-h-[240px] flex flex-col items-center justify-center gap-3 p-6 text-center bg-[#0D1B31] text-[#CBD5E1]">
          <Buildings className="w-8 h-8 text-[#3B82F6]" weight="regular" aria-hidden="true" />
          <span className="text-sm font-medium">{fallbackTitle}</span>
        </div>
      ) : (
        <motion.div
          initial={shouldReduceMotion ? false : { scale: 1.1 }}
          animate={immediate ? scaleTarget : undefined}
          whileInView={immediate ? undefined : scaleTarget}
          viewport={immediate ? undefined : { once: true, amount: 0.12 }}
          transition={{ duration: immediate ? 0.75 : 1.02, delay, ease: BASE_EASE }}
          className="w-full h-full will-change-transform"
        >
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover will-change-transform ${imgClassName}`}
          />
        </motion.div>
      )}
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
  durationMs = 1150,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
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
    <span ref={ref} className={`font-mono tabular-nums ${className}`}>
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
    <div ref={containerRef} className={`relative overflow-hidden bg-[#071121] ${className}`}>
      {hasError ? (
        <div className="w-full h-full min-h-[240px] flex flex-col items-center justify-center gap-3 p-6 text-center bg-[#071121] text-[#CBD5E1]">
          <Buildings className="w-8 h-8 text-[#3B82F6]" weight="regular" aria-hidden="true" />
          <span className="text-sm font-medium">{fallbackTitle}</span>
        </div>
      ) : (
        <motion.img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setHasError(true)}
          style={{ y, scale: shouldReduceMotion ? 1 : 1.1 }}
          className={`w-full h-full object-cover will-change-transform ${imgClassName}`}
        />
      )}
    </div>
  );
};

interface TaglineRevealQuoteProps {
  lines: string[];
  highlightWords?: string[];
  className?: string;
}

export const TaglineRevealQuote: React.FC<TaglineRevealQuoteProps> = ({
  lines,
  highlightWords = ['بخطة', 'واضحة،', 'نفخر', 'به،', 'التزام', 'لا', 'يتغير.'],
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const totalWords = lines.reduce((acc, line) => acc + line.split(' ').length, 0);
  const [activeCount, setActiveCount] = useState<number>(shouldReduceMotion ? totalWords : 0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setActiveCount(totalWords);
      return;
    }

    let rafId = 0;
    let ticking = false;

    const updateProgress = () => {
      ticking = false;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 800;
      const startLine = viewportHeight * 0.84;
      const endLine = viewportHeight * 0.34;
      const travel = startLine - endLine + rect.height * 0.45;
      const raw = (startLine - rect.top) / Math.max(travel, 1);
      const clamped = Math.max(0, Math.min(1, raw));
      const nextCount = Math.round(clamped * totalWords);
      setActiveCount((prev) => (prev !== nextCount ? nextCount : prev));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [shouldReduceMotion, totalWords]);

  let runningIndex = 0;

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, lineIdx) => {
        const words = line.split(' ');
        return (
          <span key={`line-${lineIdx}`} className="block">
            {words.map((word, wordIdx) => {
              const currentIndex = runningIndex++;
              const isRevealed = shouldReduceMotion || currentIndex < activeCount;
              const isAccent = highlightWords.includes(word);
              return (
                <span
                  key={`${word}-${currentIndex}`}
                  className={`inline-block transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    wordIdx < words.length - 1 ? 'ml-3' : ''
                  } ${
                    isRevealed
                      ? isAccent
                        ? 'opacity-100 text-[#60A5FA]'
                        : 'opacity-100 text-white'
                      : 'opacity-20 text-white'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
};
