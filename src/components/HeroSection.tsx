import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDownLeft } from 'lucide-react';
import { SITE_IMAGES } from '../data/siteData';
import { BrandLogoMark } from './BrandLogo';
import {
  ARCHITECTURAL_EASE,
  ParallaxImage,
  ScrollIlluminatedQuote,
} from './MotionPrimitives';

interface HeroSectionProps {
  onNavigate: (target: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 56]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    shouldReduceMotion ? [1, 1] : [1, 0.35]
  );

  return (
    <section id="home" ref={heroRef} className="relative bg-[#111315] text-[#F5F4F0] overflow-hidden">
      {/* Subtle architectural drafting grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 architectural-grid-dark pointer-events-none"
      />

      {/* Main Hero Composition */}
      <div className="relative max-w-[1360px] mx-auto px-5 sm:px-8 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Editorial Typography Column */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="lg:col-span-6 flex flex-col justify-between gap-10 py-2"
          >
            <div className="space-y-6">
              {/* Quiet unboxed heritage lead-in (zero pills, zero decorative dots) */}
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: ARCHITECTURAL_EASE }}
                className="text-sm font-medium text-[#D4A459] tracking-wide"
              >
                نعمل في المقاولات منذ عام 1998
              </motion.p>

              {/* Monumental Masked Headline */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={shouldReduceMotion ? false : { opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: '0%' }}
                  transition={{ duration: 0.85, delay: 0.08, ease: ARCHITECTURAL_EASE }}
                  className="text-[clamp(2.25rem,4.2vw,3.75rem)] font-extrabold leading-[1.18] text-white"
                >
                  نبني مشاريعكم بانضباط ونسلّمها بثقة
                </motion.h1>
              </div>

              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.2, ease: ARCHITECTURAL_EASE }}
                className="text-base md:text-lg leading-[1.85] text-[#C8C5BC] max-w-[54ch]"
              >
                شركة مقاولات عمومية تدير أعمالها من التخطيط حتى التسليم، وتعرض لك هنا ما أنجزته وما تعمل عليه الآن.
              </motion.p>

              {/* Primary CTA */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.32, ease: ARCHITECTURAL_EASE }}
                className="pt-2 flex flex-wrap items-center gap-6"
              >
                <a
                  href="#completed"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#completed');
                  }}
                  className="group inline-flex items-center gap-3 px-7 py-4 bg-[#C9974A] text-[#111315] text-sm md:text-base font-bold hover:bg-[#D8A85B] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span>شاهد المشاريع المنفذة</span>
                  <ArrowDownLeft
                    className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="#current"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#current');
                  }}
                  className="inline-flex items-center py-2 text-sm font-medium text-[#D6D3CB] hover:text-white border-b border-white/25 hover:border-[#C9974A] transition-colors duration-200 whitespace-nowrap shrink-0"
                >
                  المشاريع الجارية بالمواقع
                </a>
              </motion.div>
            </div>

            {/* Quiet Architectural Footer Line inside Hero */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.45, ease: ARCHITECTURAL_EASE }}
              className="pt-6 border-t border-white/12 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm text-[#A5A299]"
            >
              <span>خرسانات مسلحة</span>
              <span aria-hidden="true">/</span>
              <span>حدادة ونجارة مسلحة</span>
              <span aria-hidden="true">/</span>
              <span>تشطيبات متكاملة</span>
            </motion.div>
          </motion.div>

          {/* Dominant Architectural Media Frame */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.14, ease: ARCHITECTURAL_EASE }}
            className="lg:col-span-6 relative min-h-[320px] sm:min-h-[420px] lg:min-h-[520px] border border-white/12"
          >
            <ParallaxImage
              src={SITE_IMAGES.hero}
              alt="مبنى خرساني ومعماري حديث نفذ بانضباط هندسي تحت إضاءة طبيعية دافئة"
              fallbackTitle="شركة المناهري للمقاولات العمومية"
              className="w-full h-full lg:h-full"
              parallaxAmount={28}
              eager
            />
            {/* Measured contrast scrim at bottom */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#111315]/80 via-[#111315]/15 to-transparent pointer-events-none"
            />
            <div className="absolute bottom-5 right-5 left-5 flex items-end justify-between gap-4 text-xs sm:text-sm text-[#EAE8E1]">
              <div>
                <p className="font-semibold text-white">تنفيذ هندسي منضبط</p>
                <p className="text-[#C8C5BC] text-xs mt-0.5">من التخطيط الإنشائي حتى التسليم النهائي</p>
              </div>
              <span className="font-mono tabular-nums text-xs text-[#D4A459] shrink-0">
                1998 — 2026
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Brand Identity & Scroll-Illuminated Manifesto Band */}
      <div className="relative border-t border-white/10 bg-[#15181C]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4 flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center border border-white/15 bg-[#111315] shrink-0">
                <BrandLogoMark
                  className="w-9 h-9 text-white"
                  ariaLabel="شعار شركة المناهري للمقاولات العمومية"
                />
              </div>
              <div>
                <p className="text-xs text-[#A5A299] mb-1">شعار شركة المناهري للمقاولات العمومية</p>
                <p className="font-[Cairo] text-lg font-bold text-white">
                  شركة المناهري للمقاولات العمومية
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <ScrollIlluminatedQuote
                text="كل مشروع يبدأ بخطة واضحة، وينتهي بتسليم نفخر به، وبين البداية والنهاية التزام لا يتغير."
                className="font-[Cairo] text-2xl sm:text-3xl lg:text-[2.15rem] font-bold leading-[1.55] text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
