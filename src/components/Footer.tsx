import React from 'react';
import { ArrowUp, EnvelopeSimple } from '@phosphor-icons/react';
import { NAV_ITEMS } from '../data/siteData';
import { BrandLogoMark } from './BrandLogo';

interface FooterProps {
  onNavigate: (target: string) => void;
  onOpenLegal: (doc: 'privacy' | 'terms') => void;
}

const SECONDARY_LINKS = [
  { label: 'القطاعات', href: '#sectors' },
  { label: 'الجودة والسلامة', href: '#safety' },
  { label: 'فريق العمل', href: '#team' },
  { label: 'تحديثات المواقع', href: '#updates' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal }) => {
  return (
    <footer className="bg-[#050B16] text-white border-t border-white/10 py-14 sm:py-16">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-10 flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#0D1B31] border border-[#3B82F6]/30 shrink-0">
                <BrandLogoMark
                  className="w-7 h-7 text-white"
                  accentColor="#3B82F6"
                  ariaLabel="شعار شركة المناهري للمقاولات العمومية"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-[Cairo] text-lg font-bold text-white">
                  المناهري للمقاولات العمومية
                </p>
                <p className="text-sm text-[#94A3B8]">
                  مقاولات عمومية من التخطيط حتى التسليم.
                </p>
              </div>
            </div>

            <a
              href="mailto:info@almnahry.com"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#CBD5E1] hover:text-[#60A5FA] transition-colors w-fit"
            >
              <EnvelopeSimple className="w-4 h-4 text-[#60A5FA]" weight="bold" aria-hidden="true" />
              <span className="font-mono" dir="ltr">
                info@almnahry.com
              </span>
            </a>
          </div>

          <div className="flex flex-col lg:items-end gap-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.href);
                  }}
                  className="px-2.5 py-2 rounded-xl text-sm font-medium text-[#CBD5E1] hover:text-white hover:bg-white/[0.06] transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => onNavigate('#home')}
                aria-label="العودة إلى أعلى الصفحة"
                className="inline-flex items-center justify-center gap-2 min-h-[40px] px-4 py-2 rounded-xl text-sm font-semibold bg-[#0D1B31] text-[#60A5FA] border border-white/12 hover:border-[#3B82F6]/60 hover:text-white active:scale-[0.97] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                <span>أعلى الصفحة</span>
                <ArrowUp className="w-4 h-4" weight="bold" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#94A3B8]">
              {SECONDARY_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(link.href);
                  }}
                  className="hover:text-white transition-colors whitespace-nowrap px-1.5 py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/10" aria-hidden="true" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#94A3B8]">
          <p>© 2026 شركة المناهري للمقاولات العمومية. جميع الحقوق محفوظة.</p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-md px-1"
            >
              سياسة الخصوصية
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:text-white transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-md px-1"
            >
              الشروط والأحكام
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
