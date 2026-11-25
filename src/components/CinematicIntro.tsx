import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { SITE_IMAGES } from '../data/siteData';
import { BASE_EASE } from './MotionPrimitives';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState<boolean>(() => !shouldReduceMotion);
  const [progress, setProgress] = useState<number>(shouldReduceMotion ? 100 : 0);
  const [assetsReady, setAssetsReady] = useState<boolean>(Boolean(shouldReduceMotion));

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisible(false);
      onComplete();
    }
  }, [shouldReduceMotion, onComplete]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let fontsLoaded = false;
    let heroLoaded = false;
    let cancelled = false;

    const checkReady = () => {
      if (!cancelled && fontsLoaded && heroLoaded) {
        setAssetsReady(true);
      }
    };

    const fontsPromise =
      typeof document !== 'undefined' && 'fonts' in document
        ? document.fonts.ready.catch(() => undefined)
        : Promise.resolve();

    fontsPromise.then(() => {
      fontsLoaded = true;
      checkReady();
    });

    const img = new Image();
    img.referrerPolicy = 'no-referrer';
    img.onload = () => {
      heroLoaded = true;
      checkReady();
    };
    img.onerror = () => {
      heroLoaded = true;
      checkReady();
    };
    img.src = SITE_IMAGES.hero;

    const safetyTimer = window.setTimeout(() => {
      if (!cancelled) {
        setAssetsReady(true);
      }
    }, 2400);

    return () => {
      cancelled = true;
      window.clearTimeout(safetyTimer);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || !visible) return;

    const minDuration = 1650;
    const startTime = performance.now();
    let rafId = 0;
    let exitTimer = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const timeRatio = Math.min(elapsed / minDuration, 1);
      const eased = 1 - Math.pow(1 - timeRatio, 3);
      const maxAllowed = assetsReady ? 100 : 92;
      const nextValue = Math.min(Math.round(eased * 100), maxAllowed);

      setProgress(nextValue);

      if (nextValue < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        exitTimer = window.setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 220);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(exitTimer);
    };
  }, [assetsReady, visible, shouldReduceMotion, onComplete]);

  useEffect(() => {
    if (!visible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setVisible(false);
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [visible, onComplete]);

  const handleSkip = () => {
    setVisible(false);
    onComplete();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="مقدمة شركة المناهري للمقاولات العمومية"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: BASE_EASE },
          }}
          className="fixed inset-0 z-[95] bg-[#071121] text-white overflow-hidden flex flex-col justify-between p-6 sm:p-10"
        >
          {/* Architectural Navy & Vibrant Cobalt Light Field */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.72 }}
              animate={{ opacity: 1, scale: 1.05 }}
              transition={{ duration: 1.8, ease: BASE_EASE }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-[#2563EB]/20 blur-[150px]"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: BASE_EASE }}
              className="absolute top-1/2 inset-x-0 h-px bg-gradient-to-l from-transparent via-white/12 to-transparent origin-center"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, ease: BASE_EASE }}
              className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/12 to-transparent origin-center"
            />
          </div>

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between gap-4">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: BASE_EASE }}
              className="font-mono text-xs tracking-widest text-[#60A5FA] tabular-nums"
            >
              AL MNAHRY · EST. 1998
            </motion.span>

            <motion.button
              type="button"
              onClick={handleSkip}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] bg-white/[0.05] border border-white/12 hover:text-white hover:border-[#3B82F6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            >
              تخطي المقدمة
            </motion.button>
          </div>

          {/* Centerpiece: Animated Stroke-Draw Architectural Emblem + Masked Typography */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center gap-8 my-auto">
            <motion.div
              initial={{ scale: 0.86, opacity: 0, filter: 'blur(8px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, ease: BASE_EASE }}
              className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center"
            >
              <svg
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                aria-hidden="true"
              >
                <motion.rect
                  x="4"
                  y="4"
                  width="56"
                  height="56"
                  rx="8"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.95, ease: BASE_EASE }}
                />
                <motion.path
                  d="M15 48V18L32 33L49 18V48"
                  stroke="#FFFFFF"
                  strokeWidth="3.2"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: BASE_EASE }}
                />
                <motion.path
                  d="M32 33V48"
                  stroke="#3B82F6"
                  strokeWidth="3.2"
                  strokeLinecap="square"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.55, delay: 0.65, ease: BASE_EASE }}
                />
                <motion.path
                  d="M14 12.5H50"
                  stroke="#60A5FA"
                  strokeWidth="2.4"
                  strokeLinecap="square"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.65, delay: 0.45, ease: BASE_EASE }}
                />
              </svg>
            </motion.div>

            <div className="flex flex-col items-center gap-3">
              <div className="overflow-hidden pb-1">
                <motion.h2
                  initial={{ y: '105%', opacity: 0, filter: 'blur(6px)' }}
                  animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.85, delay: 0.5, ease: BASE_EASE }}
                  className="font-[Cairo] text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
                >
                  شركة المناهري للمقاولات العمومية
                </motion.h2>
              </div>

              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.72, delay: 0.78, ease: BASE_EASE }}
                  className="text-sm sm:text-base text-[#94A3B8] font-medium"
                >
                  مقاولات عمومية من التخطيط حتى التسليم · خبرة منذ 1998
                </motion.p>
              </div>
            </div>
          </div>

          {/* Bottom Progress Indicator */}
          <div className="relative z-10 max-w-xl w-full mx-auto flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-[#94A3B8]">
              <span>جاري تجهيز تجربة العرض</span>
              <span className="font-mono text-[#60A5FA] tabular-nums">
                {String(progress).padStart(2, '0')}%
              </span>
            </div>
            <div className="h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
              <motion.div
                className="h-full w-full origin-right bg-gradient-to-l from-[#2563EB] to-[#60A5FA]"
                style={{ scaleX: progress / 100 }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
