import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUp,
  Check,
  Clock,
  Copy,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  YoutubeLogo,
} from '@phosphor-icons/react';
import {
  NAV_ITEMS,
  PROJECT_CATEGORIES,
  SERVICES,
  type ProjectCategory,
} from '../data/siteData';
import { BrandLogoMark } from './BrandLogo';
import { DarkChapterAtmosphere, RevealBlock } from './MotionPrimitives';

interface FooterProps {
  onNavigate: (target: string) => void;
  onOpenLegal: (doc: 'privacy' | 'terms') => void;
  onSelectService: (serviceId: string) => void;
  onSelectCategory: (category: ProjectCategory) => void;
  onRequestQuote: () => void;
}

const OFFICIAL_EMAIL = 'info@almnahry.com';

const EXTRA_NAV_LINKS = [
  { label: 'القطاعات والأنشطة', href: '#sectors' },
  { label: 'الجودة والسلامة المهنية', href: '#safety' },
  { label: 'فريق العمل', href: '#team' },
  { label: 'أخبار وتحديثات المواقع', href: '#updates' },
];

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    label: 'حساب لينكدإن لشركة المناهري',
    href: 'https://www.linkedin.com',
    icon: LinkedinLogo,
  },
  {
    name: 'Facebook',
    label: 'صفحة فيسبوك لشركة المناهري',
    href: 'https://www.facebook.com',
    icon: FacebookLogo,
  },
  {
    name: 'Instagram',
    label: 'حساب إنستغرام لشركة المناهري',
    href: 'https://www.instagram.com',
    icon: InstagramLogo,
  },
  {
    name: 'YouTube',
    label: 'قناة يوتيوب لشركة المناهري',
    href: 'https://www.youtube.com',
    icon: YoutubeLogo,
  },
];

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenLegal,
  onSelectService,
  onSelectCategory,
  onRequestQuote,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OFFICIAL_EMAIL);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(false);
    }
  };

  return (
    <footer className="relative bg-[#050B16] text-white border-t border-white/10 overflow-hidden">
      <DarkChapterAtmosphere variant="charcoal" />
      <div aria-hidden="true" className="absolute inset-0 arch-grid-dark pointer-events-none opacity-70" />

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-10">
        {/* Top Architectural Statement & Conversion Band */}
        <RevealBlock className="py-14 sm:py-20 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#60A5FA]">
                AL MNAHRY CONTRACTING · EST. 1998
              </span>
              <h2 className="font-[Cairo] text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-white leading-[1.2] max-w-[24ch]">
                هل تستعد لإطلاق مشروعك الإنشائي القادم؟
              </h2>
              <p className="text-sm sm:text-base text-[#CBD5E1] max-w-[58ch] leading-relaxed">
                شاركنا المخططات أو تفاصيل النطاق المطلوب، وسيعود إليك فريقنا الفني لترتيب المعاينة ودراسة المقايسة وفق الجدول الزمني لمشروعك.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap items-center lg:justify-end gap-3">
              <button
                type="button"
                onClick={onRequestQuote}
                className="btn-cobalt inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl text-sm font-bold text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050B16]"
              >
                <span>اطلب مقايسة وتسعير</span>
                <ArrowLeft className="w-4 h-4" weight="bold" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('#home')}
                aria-label="العودة إلى أعلى الصفحة"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-3 rounded-xl text-sm font-semibold bg-[#0D1B31] text-[#CBD5E1] border border-white/12 hover:border-[#3B82F6]/60 hover:text-white active:scale-[0.97] transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                <span>أعلى الصفحة</span>
                <ArrowUp className="w-4 h-4 text-[#60A5FA]" weight="bold" aria-hidden="true" />
              </button>
            </div>
          </div>
        </RevealBlock>

        {/* Main 12-Column Editorial Corporate Directory */}
        <div className="py-14 sm:py-18 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1 (4 cols): Company Identity + Social Media */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-8 lg:pl-6">
            <div className="flex flex-col gap-5">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('#home');
                }}
                className="inline-flex items-center gap-3.5 w-fit group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-xl"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#0D1B31] border border-[#3B82F6]/35 group-hover:border-[#60A5FA] transition-colors shrink-0">
                  <BrandLogoMark
                    className="w-7 h-7 text-white"
                    accentColor="#3B82F6"
                    ariaLabel="شعار شركة المناهري للمقاولات العمومية"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-[Cairo] text-lg font-extrabold text-white">
                    المناهري للمقاولات العمومية
                  </span>
                  <span className="font-mono text-xs text-[#60A5FA] tabular-nums">
                    منذ عام 1998 · 28 سنة خبرة
                  </span>
                </div>
              </a>

              <p className="text-sm leading-[1.85] text-[#94A3B8] max-w-[38ch]">
                مقاولات عمومية من التخطيط حتى التسليم. ننفذ أعمال الخرسانات والحدادة والنجارة والتشطيبات بدقة هندسية والتزام كامل بالمواصفات التعاقدية.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-[#CBD5E1]">تابع حضورنا المؤسسي</span>
              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#0D1B31] border border-white/10 text-[#CBD5E1] hover:bg-[#2563EB] hover:border-[#2563EB] hover:text-white hover:-translate-y-0.5 active:scale-[0.96] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                    >
                      <Icon className="w-[18px] h-[18px]" weight="regular" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2 (2 cols): Navigation Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="font-[Cairo] text-sm font-bold text-white pb-2 border-b border-white/10">
              التنقل السريع
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.href);
                    }}
                    className="text-[#94A3B8] hover:text-white transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {EXTRA_NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.href);
                    }}
                    className="text-[#94A3B8] hover:text-white transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 (2 cols): Services */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="font-[Cairo] text-sm font-bold text-white pb-2 border-b border-white/10">
              الخدمات
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(service.id)}
                    className="text-right text-[#94A3B8] hover:text-[#60A5FA] transition-colors leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 (2 cols): Project Categories */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="font-[Cairo] text-sm font-bold text-white pb-2 border-b border-white/10">
              تصنيفات المشاريع
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {PROJECT_CATEGORIES.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(category.id)}
                    className="text-right text-[#94A3B8] hover:text-[#60A5FA] transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
                  >
                    {category.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="#current"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#current');
                  }}
                  className="text-[#94A3B8] hover:text-white transition-colors inline-block py-0.5"
                >
                  المشاريع الجارية الآن
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5 (2 cols): Contact Information */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="font-[Cairo] text-sm font-bold text-white pb-2 border-b border-white/10">
              معلومات التواصل
            </h3>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-[#64748B]">البريد الرسمي</span>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${OFFICIAL_EMAIL}`}
                    dir="ltr"
                    className="font-mono text-xs sm:text-[13px] text-white hover:text-[#60A5FA] transition-colors truncate"
                  >
                    {OFFICIAL_EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="نسخ البريد الإلكتروني الرسمي"
                    className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/[0.06] border border-white/10 text-[#CBD5E1] hover:border-[#3B82F6] hover:text-white transition-colors shrink-0"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-[#60A5FA]" weight="bold" aria-hidden="true" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" weight="bold" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-[#94A3B8] leading-relaxed">
                <MapPin className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" weight="regular" aria-hidden="true" />
                <span>القاهرة الكبرى والمدن العمرانية والصناعية الجديدة</span>
              </div>

              <div className="flex items-start gap-2 text-xs text-[#94A3B8] leading-relaxed">
                <Clock className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" weight="regular" aria-hidden="true" />
                <span>السبت – الخميس · دراسة المخططات والمقايسات</span>
              </div>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('#contact');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#60A5FA] hover:text-white transition-colors pt-1 w-fit"
              >
                <EnvelopeSimple className="w-4 h-4" weight="bold" aria-hidden="true" />
                <span>نموذج التواصل المباشر</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#94A3B8]">
          <p>© 2026 شركة المناهري للمقاولات العمومية. جميع الحقوق محفوظة.</p>

          <div className="flex flex-wrap items-center gap-6">
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
