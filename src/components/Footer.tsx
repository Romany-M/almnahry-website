import React from 'react';
import { ArrowUp } from 'lucide-react';
import { NAV_ITEMS } from '../data/siteData';
import { BrandLogoMark } from './BrandLogo';

interface FooterProps {
  onNavigate: (target: string) => void;
  onOpenLegal: (doc: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal }) => {
  return (
    <footer className="bg-[#111315] text-[#EAE8E1] border-t border-white/10">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-14 md:py-16">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 pb-10 border-b border-white/10">
          {/* Brand Summary */}
          <div className="flex items-start gap-4">
            <BrandLogoMark
              className="w-10 h-10 text-white shrink-0 mt-0.5"
              ariaLabel="شعار شركة المناهري للمقاولات العمومية"
            />
            <div>
              <p className="font-[Cairo] text-lg font-bold text-white">
                المناهري للمقاولات العمومية
              </p>
              <p className="text-sm text-[#A5A299] mt-1">
                مقاولات عمومية من التخطيط حتى التسليم.
              </p>
            </div>
          </div>

          {/* Navigation Mirror & Scroll to Top */}
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-[#C8C5BC]">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.href);
                }}
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => onNavigate('#home')}
              aria-label="العودة إلى أعلى الصفحة"
              className="inline-flex items-center gap-1.5 text-[#D4A459] hover:text-white transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9974A]"
            >
              <span>أعلى الصفحة</span>
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Quiet Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#98958C]">
          <p>© 2026 شركة المناهري للمقاولات العمومية. جميع الحقوق محفوظة.</p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9974A]"
            >
              سياسة الخصوصية
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:text-white transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9974A]"
            >
              الشروط والأحكام
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
