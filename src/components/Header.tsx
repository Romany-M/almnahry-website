import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { type NavItem } from '../data/siteData';
import { BrandLogoMark } from './BrandLogo';
import { BASE_EASE } from './MotionPrimitives';

export type HeaderMode = 'hero-top' | 'dark-scrolled' | 'light-scrolled';

interface HeaderProps {
  onNavigate: (target: string) => void;
  activeSection: string;
  headerMode: HeaderMode;
  onMobileMenuChange?: (open: boolean) => void;
}

/* Fixed, immutable right-to-left header navigation order */
const HEADER_NAV_ITEMS: readonly NavItem[] = Object.freeze([
  { id: 'about', label: 'من نحن', href: '#about' },
  { id: 'services', label: 'الخدمات', href: '#services' },
  { id: 'completed', label: 'المشاريع المنفذة', href: '#completed' },
  { id: 'current', label: 'المشاريع الحالية', href: '#current' },
  { id: 'partners', label: 'شركاء النجاح', href: '#partners' },
]);

const NAV_ORDER_CLASSES = ['order-1', 'order-2', 'order-3', 'order-4', 'order-5'] as const;

const MOBILE_SECONDARY_LINKS = [
  { label: 'القطاعات', href: '#sectors' },
  { label: 'الجودة والسلامة', href: '#safety' },
  { label: 'فريق العمل', href: '#team' },
  { label: 'تحديثات المواقع', href: '#updates' },
];

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  activeSection,
  headerMode,
  onMobileMenuChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isTop = headerMode === 'hero-top';
  const isLight = headerMode === 'light-scrolled' && !mobileMenuOpen;

  useEffect(() => {
    onMobileMenuChange?.(mobileMenuOpen);
  }, [mobileMenuOpen, onMobileMenuChange]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  /* Visually stable fixed header bar: constant height & horizontal alignment; only surface contrast transitions */
  const barClasses = mobileMenuOpen
    ? 'bg-[#071121] border-b border-white/10 shadow-none'
    : isTop
      ? 'bg-transparent border-b border-white/10 shadow-none'
      : isLight
        ? 'bg-white/94 backdrop-blur-xl border-b border-[#071121]/10 shadow-[0_8px_28px_-14px_rgba(7,17,33,0.12)]'
        : 'bg-[#071121]/92 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_32px_-14px_rgba(0,0,0,0.55)]';

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
        id="site-header"
        dir="rtl"
        className={`fixed top-0 inset-x-0 z-50 h-[72px] sm:h-[76px] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${barClasses}`}
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-10 h-full flex flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Zone 1: Single-line Architectural Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className={`flex items-center gap-2.5 py-1.5 rounded-xl transition-colors duration-300 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
              isLight ? 'text-[#071121]' : 'text-white'
            }`}
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

          {/* Zone 2: 5 Ordered Single-Line Navigation Links — Fixed Right-to-Left Order, Smooth Animated Underline */}
          <nav
            dir="rtl"
            aria-label="التنقل الرئيسي"
            className="hidden lg:flex flex-row items-center gap-1 h-full"
          >
            {HEADER_NAV_ITEMS.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`${NAV_ORDER_CLASSES[idx]} relative h-full inline-flex items-center px-3.5 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-lg ${
                    isLight
                      ? isActive
                        ? 'text-[#2563EB]'
                        : 'text-[#334155] hover:text-[#071121]'
                      : isActive
                        ? 'text-white'
                        : 'text-[#CBD5E1] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="headerActiveUnderline"
                      initial={shouldReduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: BASE_EASE }}
                      className={`absolute bottom-0 right-3 left-3 h-[2.5px] rounded-t-full ${
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
              className="btn-cobalt hidden sm:inline-flex items-center justify-center min-h-[42px] px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
            >
              تواصل معنا
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              className={`lg:hidden relative inline-flex items-center justify-center w-11 h-11 rounded-xl border active:scale-[0.96] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                isLight
                  ? 'bg-[#F8FAFC] border-[#0B172A]/12 text-[#071121] hover:border-[#2563EB]'
                  : 'bg-white/[0.08] border-white/16 text-white hover:border-[#3B82F6]'
              }`}
            >
              <span className="relative w-5 h-3.5 block" aria-hidden="true">
                <span
                  className={`absolute right-0 left-0 h-[2px] bg-current rounded-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    mobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute right-0 left-0 h-[2px] bg-current rounded-full transition-opacity duration-200 top-1/2 -translate-y-1/2 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute right-0 left-0 h-[2px] bg-current rounded-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
            transition={{ duration: 0.3, ease: BASE_EASE }}
            data-lenis-prevent
            className="fixed inset-0 z-40 lg:hidden bg-[#071121]/96 backdrop-blur-2xl overflow-y-auto flex flex-col justify-center px-6 py-24"
          >
            <nav dir="rtl" aria-label="قائمة الجوال" className="max-w-md mx-auto w-full flex flex-col gap-2.5">
              {HEADER_NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                const stepDelay = Math.min(idx * 0.04, 0.2);
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    transition={{ duration: 0.35, delay: stepDelay, ease: BASE_EASE }}
                    className={`flex items-center justify-between px-5 py-3.5 rounded-2xl border transition-colors duration-250 ${
                      isActive
                        ? 'bg-[#0D1B31] border-[#3B82F6] text-white'
                        : 'bg-white/[0.04] border-white/10 text-[#CBD5E1] hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-[Cairo] text-lg font-bold">{item.label}</span>
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

              {/* Secondary Institutional Section Shortcuts for Mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.2 }}
                className="pt-3 mt-1 border-t border-white/10 flex flex-wrap items-center justify-center gap-2"
              >
                {MOBILE_SECONDARY_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="px-3 py-2 rounded-xl text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.06] transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.35, delay: 0.24, ease: BASE_EASE }}
                className="pt-3"
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
