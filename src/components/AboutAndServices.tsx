import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, Buildings, Check } from '@phosphor-icons/react';
import { COMPANY_METRICS, PROCESS_STEPS, SERVICES, SITE_IMAGES } from '../data/siteData';
import {
  AnimatedCounter,
  BASE_EASE,
  CinematicImageReveal,
  RevealBlock,
} from './MotionPrimitives';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="bg-white text-[#071121] py-24 sm:py-32">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-10 flex flex-col gap-20">
        {/* Top Editorial Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <RevealBlock className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-xs font-semibold text-[#2563EB] tracking-wider">
              01 · من نحن
            </span>
            <h2 className="font-[Cairo] text-4xl sm:text-5xl font-extrabold text-[#071121] leading-tight">
              من نحن
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.08} className="lg:col-span-8 flex flex-col gap-8">
            <p className="text-xl sm:text-2xl leading-[1.75] font-medium text-[#1E293B] max-w-[58ch]">
              تأسست المناهري للمقاولات العمومية عام 1998، وتنفذ أعمال الخرسانات والحدادة والنجارة والتشطيبات في مواقع العمل. نعمل مع شركات المقاولات الكبرى والجهات المالكة، ونركز على دقة التنفيذ والالتزام بالمواصفات.
            </p>
          </RevealBlock>
        </div>

        {/* Oversized Editorial Statistics Strip (Generous Whitespace + Crisp Hairline Dividers) */}
        <div className="border-y border-[#071121]/12 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-[#071121]/12">
            {COMPANY_METRICS.map((metric, idx) => (
              <RevealBlock
                key={metric.label}
                delay={idx * 0.08}
                className={`${
                  idx === 0
                    ? 'pb-8 md:pb-0 md:pl-10'
                    : idx === 1
                      ? 'py-8 md:py-0 md:px-10'
                      : 'pt-8 md:pt-0 md:pr-10'
                } flex flex-col justify-between gap-4`}
              >
                <span className="text-sm font-semibold text-[#64748B]">{metric.label}</span>
                <div className="font-[Cairo] text-4xl sm:text-5xl font-extrabold text-[#071121] leading-tight">
                  {metric.numericTarget !== undefined ? (
                    <AnimatedCounter
                      target={metric.numericTarget}
                      suffix={metric.suffix ?? ''}
                      startFrom={metric.numericTarget === 1998 ? 1970 : 0}
                      className="text-[#2563EB]"
                    />
                  ) : (
                    <span className="text-2xl sm:text-3xl leading-snug block text-[#071121]">
                      {metric.value}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-[#475569]">{metric.detail}</p>
              </RevealBlock>
            ))}
          </div>
        </div>

        {/* Asymmetric Visual + Deep Charcoal 3-Step Execution Methodology */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5">
            <CinematicImageReveal
              src={SITE_IMAGES.concrete}
              alt="أعمدة خرسانية مسلحة وتجهيزات تسليح دقيقة في موقع تنفيذ"
              fallbackTitle="تنفيذ ميداني منضبط"
              direction="up"
              className="rounded-2xl h-full min-h-[320px]"
            />
          </div>

          <RevealBlock delay={0.1} className="lg:col-span-7">
            <div className="h-full rounded-2xl p-8 sm:p-10 bg-[#0B172A] text-white flex flex-col justify-between gap-10">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs font-semibold text-[#60A5FA]">
                  منهجية العمل في المواقع
                </span>
                <h3 className="font-[Cairo] text-2xl sm:text-3xl font-bold text-white">
                  كيف ندير المشروع حتى التسليم
                </h3>
              </div>

              <div className="flex flex-col divide-y divide-white/10">
                {PROCESS_STEPS.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="py-5 first:pt-0 last:pb-0 grid grid-cols-1 sm:grid-cols-12 gap-3 items-baseline"
                  >
                    <span className="sm:col-span-2 font-mono text-sm font-semibold text-[#60A5FA] tabular-nums">
                      {step.stepNumber}
                    </span>
                    <div className="sm:col-span-10 flex flex-col gap-1.5">
                      <h4 className="font-[Cairo] text-lg font-bold text-white">{step.title}</h4>
                      <p className="text-sm leading-[1.8] text-[#CBD5E1]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
};

interface ServicesSectionProps {
  onNavigate: (target: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);
  const [imgErrorIds, setImgErrorIds] = useState<Record<string, boolean>>({});
  const shouldReduceMotion = useReducedMotion();

  const activeService = SERVICES.find((s) => s.id === activeServiceId) ?? SERVICES[0];

  return (
    <section
      id="services"
      className="bg-[#F8FAFC] text-[#071121] py-24 sm:py-32 border-y border-[#071121]/8 arch-grid-light"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-10 flex flex-col gap-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <RevealBlock className="flex flex-col gap-3 max-w-2xl">
            <span className="font-mono text-xs font-semibold text-[#2563EB] tracking-wider">
              02 · نطاق الأعمال
            </span>
            <h2 className="font-[Cairo] text-4xl sm:text-5xl font-extrabold text-[#071121]">
              الخدمات
            </h2>
            <p className="text-base sm:text-lg text-[#475569]">الأعمال التي ننفذها لعملائنا.</p>
          </RevealBlock>

          <RevealBlock delay={0.08}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#contact');
              }}
              className="group inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-bold bg-[#071121] text-white hover:bg-[#2563EB] active:scale-[0.98] transition-all duration-300 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            >
              <span>ناقش نطاق مشروعك معنا</span>
              <ArrowLeft
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                weight="bold"
                aria-hidden="true"
              />
            </a>
          </RevealBlock>
        </div>

        {/* Clean Architectural 2-Column Interactive Discipline Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div
            role="tablist"
            aria-label="خدمات شركة المناهري"
            className="lg:col-span-5 flex flex-col gap-3"
          >
            {SERVICES.map((service) => {
              const isSelected = service.id === activeService.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`service-panel-${service.id}`}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`group text-right p-5 sm:p-6 rounded-2xl border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    isSelected
                      ? 'bg-[#071121] border-[#071121] text-white shadow-[0_22px_50px_-20px_rgba(7,17,33,0.45)]'
                      : 'bg-white border-[#071121]/10 text-[#071121] hover:border-[#2563EB]/45 hover:bg-[#EFF6FF]/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <span
                        className={`font-mono text-xs font-semibold tabular-nums ${
                          isSelected ? 'text-[#60A5FA]' : 'text-[#2563EB]'
                        }`}
                      >
                        {service.index}
                      </span>
                      <h3 className="font-[Cairo] text-lg sm:text-xl font-bold leading-snug">
                        {service.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${
                          isSelected ? 'text-[#CBD5E1]' : 'text-[#475569]'
                        }`}
                      >
                        {service.summary}
                      </p>
                    </div>
                    <ArrowLeft
                      className={`w-5 h-5 mt-1 shrink-0 transition-transform duration-300 ${
                        isSelected
                          ? 'text-[#60A5FA] -translate-x-1'
                          : 'text-[#64748B] group-hover:-translate-x-1 group-hover:text-[#2563EB]'
                      }`}
                      weight="bold"
                      aria-hidden="true"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div
            id={`service-panel-${activeService.id}`}
            role="tabpanel"
            className="lg:col-span-7 rounded-2xl p-5 sm:p-7 bg-white border border-[#071121]/10 shadow-[0_24px_60px_-28px_rgba(7,17,33,0.16)] flex flex-col justify-between overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 16 }}
                transition={{ duration: 0.42, ease: BASE_EASE }}
                className="flex flex-col gap-6 h-full justify-between"
              >
                <div className="flex flex-col gap-6">
                  <div className="relative rounded-xl overflow-hidden h-64 sm:h-72 bg-[#071121]">
                    {imgErrorIds[activeService.id] ? (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-6 text-[#CBD5E1]">
                        <Buildings className="w-8 h-8 text-[#3B82F6]" weight="regular" />
                        <span className="text-sm">{activeService.title}</span>
                      </div>
                    ) : (
                      <img
                        src={activeService.image}
                        alt={activeService.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setImgErrorIds((prev) => ({ ...prev, [activeService.id]: true }))
                        }
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#071121]/80 via-[#071121]/15 to-transparent"
                    />
                    <div className="absolute bottom-4 right-5 left-5">
                      <span className="font-mono text-xs text-[#60A5FA] tabular-nums">
                        {activeService.index} · المواصفات الفنية
                      </span>
                      <h3 className="font-[Cairo] text-xl sm:text-2xl font-bold text-white mt-0.5">
                        {activeService.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-base leading-[1.85] text-[#334155]">
                    {activeService.description}
                  </p>

                  <div className="h-px w-full bg-[#071121]/10" aria-hidden="true" />

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {activeService.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#1E293B]">
                        <span className="w-5 h-5 rounded-md bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mt-0.5 shrink-0">
                          <Check className="w-3.5 h-3.5" weight="bold" aria-hidden="true" />
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#071121]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-xs sm:text-sm text-[#64748B]">{activeService.standard}</span>
                  <a
                    href="#completed"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('#completed');
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2563EB] hover:text-[#071121] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>عرض نماذج التنفيذ</span>
                    <ArrowLeft className="w-4 h-4" weight="bold" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
