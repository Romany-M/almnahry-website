import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { NAV_ITEMS } from '../data/siteData';
import { BrandLogoMark } from './BrandLogo';
import { BASE_EASE } from './MotionPrimitives';

export type HeaderMode = 'hero-top' | 'dark-scrolled' | 'light-scrolled';

interface HeaderProps {
  onNavigate: (target: string) => void;
  activeSection: string;
  headerMode: HeaderMode;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  activeSection,
  headerMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isTop = headerMode === 'hero-top';
  const isLight = headerMode === 'light-scrolled';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  /* Transparent over full-bleed hero -> shrinking crisp white glass over light sections or deep navy glass over dark sections */
  const shellClasses = isTop
    ? 'max-w-[1360px] w-full px-5 sm:px-10 py-5 rounded-none bg-transparent border border-transparent shadow-none'
    : isLight
      ? 'max-w-[1180px] w-full lg:w-fit px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-2xl border border-[#0B172A]/10 shadow-[0_18px_45px_-16px_rgba(11,23,42,0.14)]'
      : 'max-w-[1180px] w-full lg:w-fit px-3.5 py-2 rounded-2xl bg-[#071121]/88 backdrop-blur-2xl border border-white/12 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.65)]';

  return (
    <>
      <a
        href="#main"
        onClick={(e) => handleLinkClick(e, '#main')}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[80] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-[#2563EB] focus:text-white focus:font-bold focus:outline-none focus:ring-2 focus:ring-white"
      >
        انتقل إلى المحتوى
      </a>

      <header
        className={`fixed inset-x-0 z-50 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isTop ? 'top-0 px-0' : 'top-3 px-4'
        }`}
      >
        <div
          className={`pointer-events-auto mx-auto flex items-center justify-between gap-6 lg:gap-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${shellClasses}`}
        >
          {/* Zone 1: Single-line Architectural Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className={`flex items-center gap-2.5 px-2 py-1.5 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
              isLight
                ? 'text-[#071121] hover:bg-[#071121]/5'
                : 'text-white hover:bg-white/10'
            } ${isTop ? 'scale-100' : 'scale-[0.95]'}`}
          >
            <BrandLogoMark
              className="w-7 h-7 sm:w-8 sm:h-8 shrink-0"
              accentColor={isLight ? '#2563EB' : '#3B82F6'}
              strokeColor="currentColor"
              ariaLabel="شعار المناهري"
            />
            <span className="font-[Cairo] text-lg sm:text-xl font-bold tracking-tight">
              المناهري
            </span>
          </a>

          {/* Zone 2: 5 Concise Single-Line Nav Links with Shared Cobalt Indicator */}
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden lg:flex items-center gap-1"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    isLight
                      ? isActive
                        ? 'text-[#071121]'
                        : 'text-[#475569] hover:text-[#071121]'
                      : isActive
                        ? 'text-white'
                        : 'text-[#CBD5E1] hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="smartNavActiveBg"
                      transition={{ duration: 0.45, ease: BASE_EASE }}
                      className={`absolute inset-0 rounded-xl ${
                        isLight
                          ? 'bg-[#EFF6FF] border border-[#2563EB]/18'
                          : 'bg-white/[0.11] border border-white/12'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="smartNavActiveLine"
                      transition={{ duration: 0.45, ease: BASE_EASE }}
                      className={`absolute bottom-0.5 right-3.5 left-3.5 h-[2px] rounded-full ${
                        isLight ? 'bg-[#2563EB]' : 'bg-[#60A5FA]'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action + Morphing Mobile Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className={`btn-cobalt hidden sm:inline-flex items-center justify-center rounded-xl text-sm font-bold whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 ${
                isTop ? 'min-h-[44px] px-5 py-2.5' : 'min-h-[40px] px-4 py-2'
              }`}
            >
              تواصل معنا
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              className={`lg:hidden relative inline-flex items-center justify-center w-11 h-11 rounded-xl border active:scale-[0.96] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                isLight && !mobileMenuOpen
                  ? 'bg-[#F8FAFC] border-[#0B172A]/12 text-[#071121] hover:border-[#2563EB]'
                  : 'bg-white/[0.08] border-white/16 text-white hover:border-[#3B82F6]'
              }`}
            >
              <span className="relative w-5 h-3.5 block" aria-hidden="true">
                <span
                  className={`absolute right-0 left-0 h-[2px] bg-current rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    mobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute right-0 left-0 h-[2px] bg-current rounded-full transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] top-1/2 -translate-y-1/2 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute right-0 left-0 h-[2px] bg-current rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    mobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Height Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: BASE_EASE }}
            className="fixed inset-0 z-40 lg:hidden bg-[#071121]/96 backdrop-blur-2xl flex flex-col justify-center px-6 py-24"
          >
            <nav aria-label="قائمة الجوال" className="max-w-md mx-auto w-full flex flex-col gap-3">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                const stepDelay = Math.min(idx * 0.06, 0.34);
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    transition={{ duration: 0.48, delay: stepDelay, ease: BASE_EASE }}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl border transition-colors duration-300 ${
                      isActive
                        ? 'bg-[#0D1B31] border-[#3B82F6] text-white'
                        : 'bg-white/[0.04] border-white/10 text-[#CBD5E1] hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-[Cairo] text-xl font-bold">{item.label}</span>
                      {isActive && (
                        <span className="text-xs font-medium text-[#60A5FA]">القسم الحالي</span>
                      )}
                    </div>
                    <span className="font-mono text-xs text-[#60A5FA] tabular-nums">
                      0{idx + 1}
                    </span>
                  </motion.a>
                );
              })}

              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.48, delay: 0.34, ease: BASE_EASE }}
                className="pt-4"
              >
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="btn-cobalt flex items-center justify-center w-full min-h-[50px] rounded-2xl text-base font-bold"
                >
                  تواصل معنا
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
