import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDownLeft, ArrowLeft } from '@phosphor-icons/react';
import { SITE_IMAGES } from '../data/siteData';
import { BASE_EASE } from './MotionPrimitives';

interface HeroSectionProps {
  onNavigate: (target: string) => void;
  onRequestQuote: () => void;
  introDone: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onRequestQuote,
  introDone,
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 110]);
  const contentY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -32]);

  const ready = shouldReduceMotion || introDone;

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[94vh] flex flex-col justify-end bg-[#071121] text-white overflow-hidden"
    >
      {/* Full-Width Architectural Background Photograph with Cinematic Entrance & Scroll Parallax */}
      <motion.div
        style={{ y: bgY }}
        initial={shouldReduceMotion ? false : { scale: 1.1, opacity: 0.7 }}
        animate={ready ? { scale: 1.02, opacity: 1 } : { scale: 1.1, opacity: 0.7 }}
        transition={{ duration: 1.35, ease: BASE_EASE }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={SITE_IMAGES.hero}
          alt="مبنى خرساني ومعماري حديث نفذ بانضباط هندسي تحت إضاءة طبيعية دافئة"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Measured Deep-Navy Architectural Scrims for Uncompromising Typography Legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#071121] via-[#071121]/55 to-[#071121]/60 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-l from-[#071121]/78 via-[#071121]/28 to-transparent pointer-events-none"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-white/15 pointer-events-none"
      />

      {/* Oversized Editorial Hero Composition */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-[1360px] w-full mx-auto px-5 sm:px-10 pt-36 pb-12 sm:pb-16 flex flex-col gap-10 sm:gap-14"
      >
        {/* Top Row: Heritage & Architectural Coordinates */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.08, ease: BASE_EASE }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-5"
        >
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-[#E2E8F0]">
            <span className="text-[#60A5FA] font-semibold">نعمل في المقاولات منذ عام 1998</span>
            <span aria-hidden="true" className="text-white/30">
              /
            </span>
            <span>شركة المناهري للمقاولات العمومية</span>
          </div>

          <span className="font-mono text-xs text-[#94A3B8] tabular-nums">
            28 سنة خبرة ميدانية · خرسانات · حدادة · نجارة · تشطيبات
          </span>
        </motion.div>

        {/* Oversized Masked Architectural Display Headline */}
        <div className="max-w-5xl">
          <h1 className="font-[Cairo] text-4xl sm:text-6xl lg:text-[4.5rem] font-extrabold leading-[1.12] tracking-tight text-white">
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={shouldReduceMotion ? false : { y: '108%', opacity: 0, filter: 'blur(6px)' }}
                animate={
                  ready
                    ? { y: '0%', opacity: 1, filter: 'blur(0px)' }
                    : { y: '108%', opacity: 0, filter: 'blur(6px)' }
                }
                transition={{ duration: 0.9, delay: 0.14, ease: BASE_EASE }}
                className="block will-change-transform"
              >
                نبني مشاريعكم بانضباط
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                initial={shouldReduceMotion ? false : { y: '108%', opacity: 0, filter: 'blur(6px)' }}
                animate={
                  ready
                    ? { y: '0%', opacity: 1, filter: 'blur(0px)' }
                    : { y: '108%', opacity: 0, filter: 'blur(6px)' }
                }
                transition={{ duration: 0.9, delay: 0.25, ease: BASE_EASE }}
                className="block text-[#93C5FD] will-change-transform"
              >
                ونسلّمها بثقة
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Bottom Editorial Rail: Subtitle + Primary Portfolio Action + Direct Quotation CTA */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, delay: 0.38, ease: BASE_EASE }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-4 border-t border-white/15"
        >
          <p className="lg:col-span-6 text-base sm:text-lg leading-[1.85] text-[#E2E8F0] max-w-[54ch]">
            شركة مقاولات عمومية تدير أعمالها من التخطيط حتى التسليم، وتعرض لك هنا ما أنجزته وما تعمل عليه الآن.
          </p>

          <div className="lg:col-span-6 flex flex-wrap items-center lg:justify-end gap-4">
            <a
              href="#completed"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#completed');
              }}
              className="btn-cobalt group inline-flex items-center justify-center gap-2.5 min-h-[52px] px-7 py-3 rounded-xl text-sm sm:text-base font-bold whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071121]"
            >
              <span>شاهد المشاريع المنفذة</span>
              <ArrowDownLeft
                className="w-5 h-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-0.5 group-hover:translate-y-0.5"
                weight="bold"
                aria-hidden="true"
              />
            </a>

            <button
              type="button"
              onClick={onRequestQuote}
              className="group inline-flex items-center justify-center gap-2 min-h-[52px] px-5 py-3 rounded-xl text-sm font-semibold text-white bg-white/[0.08] backdrop-blur-md border border-white/16 hover:bg-white/[0.15] hover:border-[#60A5FA] active:scale-[0.97] transition-all duration-300 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]"
            >
              <span>اطلب مقايسة وتسعير</span>
              <ArrowLeft
                className="w-4 h-4 text-[#60A5FA] transition-transform duration-300 group-hover:-translate-x-0.5"
                weight="bold"
                aria-hidden="true"
              />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
