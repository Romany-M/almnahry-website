import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../data/siteData';
import { BrandLogoMark } from './BrandLogo';
import { ARCHITECTURAL_EASE } from './MotionPrimitives';

interface HeaderProps {
  onNavigate: (target: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  return (
    <>
      <a
        href="#main"
        onClick={(e) => handleLinkClick(e, '#main')}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-4 focus:z-[70] focus:px-4 focus:py-2 focus:bg-[#C9974A] focus:text-[#111315] focus:font-semibold focus:outline-none"
      >
        انتقل إلى المحتوى
      </a>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'bg-[#111315]/94 backdrop-blur-md border-b border-white/10'
            : 'bg-[#111315]/75 backdrop-blur-sm border-b border-white/5'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 h-16 md:h-[74px] flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-3 text-white hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9974A]"
          >
            <BrandLogoMark
              className="w-7 h-7 md:w-8 md:h-8 shrink-0"
              ariaLabel="شعار المناهري"
            />
            <span className="font-[Cairo] text-lg md:text-xl font-bold tracking-tight">
              المناهري
            </span>
          </a>

          {/* Zone 2: 5 Concise Single-Line Nav Links */}
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#D6D3CB]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`relative py-2 transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9974A] ${
                    isActive ? 'text-white' : 'hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 inset-x-0 h-[1.5px] bg-[#C9974A] transition-transform duration-300 origin-right ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action (+ mobile menu toggle below lg) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold bg-[#C9974A] text-[#111315] hover:bg-[#D8A85B] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              تواصل معنا
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-white border border-white/15 hover:border-[#C9974A] transition-colors focus-visible:outline-2 focus-visible:outline-[#C9974A]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: ARCHITECTURAL_EASE }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden bg-[#111315] border-b border-white/10 px-6 py-6 shadow-2xl"
          >
            <nav aria-label="قائمة الجوال" className="flex flex-col divide-y divide-white/10">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`py-3.5 text-base font-medium transition-colors ${
                    activeSection === item.id ? 'text-[#C9974A]' : 'text-white hover:text-[#C9974A]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-5">
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="flex items-center justify-center w-full py-3 text-sm font-semibold bg-[#C9974A] text-[#111315] hover:bg-[#D8A85B] transition-colors"
                >
                  تواصل معنا
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
