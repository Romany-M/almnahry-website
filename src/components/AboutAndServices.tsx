import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, Check } from 'lucide-react';
import { COMPANY_METRICS, SERVICES } from '../data/siteData';
import {
  ARCHITECTURAL_EASE,
  AnimatedCounter,
  RevealBlock,
} from './MotionPrimitives';

interface AboutAndServicesProps {
  onNavigate: (target: string) => void;
}

export const AboutAndServices: React.FC<AboutAndServicesProps> = ({ onNavigate }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);
  const [imgErrorIds, setImgErrorIds] = useState<Record<string, boolean>>({});
  const shouldReduceMotion = useReducedMotion();

  const activeService = SERVICES.find((s) => s.id === activeServiceId) ?? SERVICES[0];

  return (
    <div className="bg-[#F5F4F0] text-[#141619]">
      {/* About Section — من نحن */}
      <section id="about" className="relative py-20 md:py-28 border-b border-[#141619]/10">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <RevealBlock className="lg:col-span-4">
              <p className="text-xs font-semibold text-[#8E6322] mb-3">01. التعريف بالشركة</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141619] leading-tight">
                من نحن
              </h2>
            </RevealBlock>

            <RevealBlock delay={0.1} className="lg:col-span-8">
              <p className="text-lg sm:text-xl leading-[1.9] text-[#2B2E33] max-w-[66ch]">
                تأسست المناهري للمقاولات العمومية عام 1998، وتنفذ أعمال الخرسانات والحدادة والنجارة والتشطيبات في مواقع العمل. نعمل مع شركات المقاولات الكبرى والجهات المالكة، ونركز على دقة التنفيذ والالتزام بالمواصفات.
              </p>
            </RevealBlock>
          </div>

          {/* Full-width Architectural Specification Strip (Zero cards-within-cards) */}
          <RevealBlock delay={0.18} className="mt-14 md:mt-16 pt-10 border-t border-[#141619]/12">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-[#141619]/12">
              {COMPANY_METRICS.map((metric, idx) => (
                <div
                  key={metric.label}
                  className={`${
                    idx === 0
                      ? 'pb-8 md:pb-0 md:pl-8'
                      : idx === 1
                        ? 'py-8 md:py-0 md:px-8'
                        : 'pt-8 md:pt-0 md:pr-8'
                  }`}
                >
                  <p className="text-sm font-medium text-[#5A5E66] mb-3">{metric.label}</p>
                  <div className="font-[Cairo] text-2xl sm:text-3xl lg:text-[2.1rem] font-extrabold text-[#141619] leading-snug mb-3">
                    {metric.numericTarget !== undefined ? (
                      <AnimatedCounter
                        target={metric.numericTarget}
                        suffix={metric.suffix ?? ''}
                        startFrom={metric.numericTarget === 1998 ? 1970 : 0}
                      />
                    ) : (
                      <span>{metric.value}</span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-[#5A5E66]">{metric.detail}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Services Section — الخدمات */}
      <section id="services" className="relative py-20 md:py-28 architectural-grid-light">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <RevealBlock>
              <p className="text-xs font-semibold text-[#8E6322] mb-3">02. نطاق التنفيذ</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141619]">الخدمات</h2>
              <p className="mt-3 text-base sm:text-lg text-[#4D5159]">
                الأعمال التي ننفذها لعملائنا.
              </p>
            </RevealBlock>

            <RevealBlock delay={0.1}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('#contact');
                }}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#141619] hover:text-[#8E6322] border-b border-[#141619]/30 hover:border-[#8E6322] pb-1 transition-colors whitespace-nowrap shrink-0"
              >
                <span>ناقش نطاق مشروعك معنا</span>
                <ArrowLeft
                  className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </RevealBlock>
          </div>

          {/* Interactive Asymmetric Architectural Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Discipline List (Interactive Tabs) */}
            <div
              role="tablist"
              aria-label="خدمات شركة المناهري"
              className="lg:col-span-5 flex flex-col divide-y divide-[#141619]/12 border-y border-[#141619]/12 bg-[#F5F4F0]/90"
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
                    className={`group text-right px-5 sm:px-6 py-6 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#8E6322] ${
                      isSelected
                        ? 'bg-[#111315] text-white'
                        : 'bg-transparent text-[#141619] hover:bg-[#EAE8E1]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <span
                          className={`block font-mono text-xs tabular-nums ${
                            isSelected ? 'text-[#D4A459]' : 'text-[#8E6322]'
                          }`}
                        >
                          {service.index}
                        </span>
                        <h3 className="font-[Cairo] text-lg sm:text-xl font-bold leading-snug">
                          {service.title}
                        </h3>
                        <p
                          className={`text-sm leading-relaxed ${
                            isSelected ? 'text-[#C8C5BC]' : 'text-[#52565E]'
                          }`}
                        >
                          {service.summary}
                        </p>
                      </div>
                      <ArrowLeft
                        className={`w-4 h-4 mt-1 shrink-0 transition-transform duration-200 ${
                          isSelected
                            ? 'text-[#D4A459] -translate-x-1'
                            : 'text-[#5A5E66] group-hover:-translate-x-1'
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Service Detailed Specification Panel */}
            <div
              id={`service-panel-${activeService.id}`}
              role="tabpanel"
              className="lg:col-span-7 bg-white border border-[#141619]/12 flex flex-col justify-between overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.32, ease: ARCHITECTURAL_EASE }}
                  className="flex flex-col h-full"
                >
                  {/* Image Header */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-[#181B1F]">
                    {imgErrorIds[activeService.id] ? (
                      <div className="w-full h-full flex items-center justify-center p-6 text-[#EAE8E1] text-sm">
                        {activeService.title}
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
                      className="absolute inset-0 bg-gradient-to-t from-[#111315]/75 via-[#111315]/20 to-transparent"
                    />
                    <div className="absolute bottom-5 right-6 left-6 flex items-end justify-between gap-4">
                      <div>
                        <span className="font-mono text-xs text-[#D4A459] tabular-nums">
                          {activeService.index}
                        </span>
                        <h3 className="font-[Cairo] text-xl sm:text-2xl font-bold text-white mt-0.5">
                          {activeService.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Technical Scope Copy & Deliverables */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                    <div className="space-y-6">
                      <p className="text-base leading-[1.85] text-[#2B2E33]">
                        {activeService.description}
                      </p>

                      <div>
                        <h4 className="text-xs font-semibold text-[#5A5E66] mb-4">
                          البنود التفصيلية للتنفيذ
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {activeService.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm text-[#1F2227] leading-relaxed"
                            >
                              <Check
                                className="w-4 h-4 text-[#8E6322] mt-1 shrink-0"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-5 border-t border-[#141619]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                      <span className="text-[#5A5E66]">{activeService.standard}</span>
                      <a
                        href="#completed"
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate('#completed');
                        }}
                        className="font-semibold text-[#8E6322] hover:text-[#141619] transition-colors whitespace-nowrap shrink-0"
                      >
                        عرض نماذج التنفيذ
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
