import React from 'react';
import { ArrowLeft, ArrowUpLeft, Check, ShieldCheck } from '@phosphor-icons/react';
import {
  ALL_PROJECTS,
  FIELD_UPDATES,
  INDUSTRY_SECTORS,
  SAFETY_QUALITY_STANDARDS,
  SITE_IMAGES,
  TEAM_DISCIPLINES,
  WHY_CHOOSE_PILLARS,
  type ProjectCategory,
  type ProjectItem,
} from '../data/siteData';
import { CinematicImageReveal, DarkChapterAtmosphere, RevealBlock } from './MotionPrimitives';

interface SectorsAndWhySectionProps {
  onSelectSector: (category: ProjectCategory, targetSection: '#completed' | '#current') => void;
  onRequestQuote: () => void;
}

export const SectorsAndWhySection: React.FC<SectorsAndWhySectionProps> = ({
  onSelectSector,
  onRequestQuote,
}) => {
  return (
    <section
      id="sectors"
      className="bg-white text-[#101C2C] py-24 sm:py-32 border-b border-[#101C2C]/8"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-10 flex flex-col gap-24">
        {/* Part 1: Industries & Sectors */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#101C2C]/10">
            <RevealBlock className="flex flex-col gap-3 max-w-[680px]">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#2878D0]">
                05 — القطاعات والأنشطة
              </span>
              <h2 className="font-[Cairo] text-4xl sm:text-5xl font-extrabold text-[#101C2C]">
                القطاعات التي نخدمها
              </h2>
              <p className="text-base sm:text-lg text-[#4A5B6E] leading-relaxed">
                ننفذ المشاريع الإنشائية والمعمارية عبر قطاعات متنوعة تتطلب دقة في المواصفات وانضباطًا في الجداول الزمنية.
              </p>
            </RevealBlock>
            <RevealBlock delay={0.08} className="text-xs sm:text-sm text-[#4A5B6E]">
              اختر أي قطاع لاستعراض نماذج الأعمال المرتبطة به
            </RevealBlock>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-r border-[#101C2C]/10">
            {INDUSTRY_SECTORS.map((sector, idx) => (
              <RevealBlock key={sector.id} delay={idx * 0.05} className="h-full">
                <button
                  type="button"
                  onClick={() => onSelectSector(sector.targetCategory, sector.targetSection)}
                  className="group h-full w-full text-right p-7 sm:p-8 border-b border-l border-[#101C2C]/10 bg-white hover:bg-[#F5F6F7] transition-colors duration-300 flex flex-col justify-between gap-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2878D0]"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-xs font-semibold text-[#2878D0] tabular-nums">
                        {sector.index}
                      </span>
                      <ArrowUpLeft
                        className="w-4 h-4 text-[#4A5B6E] group-hover:text-[#2878D0] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                        weight="bold"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-[Cairo] text-xl font-extrabold text-[#101C2C] group-hover:text-[#2878D0] transition-colors leading-snug">
                      {sector.title}
                    </h3>
                    <p className="text-sm leading-[1.8] text-[#4A5B6E]">{sector.description}</p>
                  </div>

                  <span className="pt-4 border-t border-[#101C2C]/8 text-xs font-medium text-[#4A5B6E] block">
                    {sector.capabilities}
                  </span>
                </button>
              </RevealBlock>
            ))}
          </div>
        </div>

        {/* Part 2: Why Choose AL MNAHRY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-4">
          <RevealBlock className="lg:col-span-4 flex flex-col gap-5">
            <span className="font-mono text-xs font-semibold tracking-wider text-[#2878D0]">
              لماذا المناهري
            </span>
            <h2 className="font-[Cairo] text-3xl sm:text-4xl font-extrabold text-[#101C2C] leading-snug">
              لماذا يثق الملاك والاستشاريون في تنفيذنا
            </h2>
            <p className="text-sm sm:text-base leading-[1.85] text-[#4A5B6E]">
              بنينا سمعتنا في المواقع على الالتزام العملي بالتعاقدات والوضوح الفني في كل مرحلة من التأسيس حتى التسليم النهائي.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onRequestQuote}
                className="btn-cobalt inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-2.5 rounded-xl text-sm font-bold text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878D0]"
              >
                <span>اطلب دراسة ومقايسة لمشروعك</span>
                <ArrowLeft className="w-4 h-4" weight="bold" aria-hidden="true" />
              </button>
            </div>
          </RevealBlock>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {WHY_CHOOSE_PILLARS.map((pillar, idx) => (
              <RevealBlock key={pillar.index} delay={idx * 0.06} className="h-full">
                <div className="h-full rounded-2xl p-6 sm:p-7 bg-[#F5F6F7] border border-[#101C2C]/8 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs font-semibold text-[#2878D0] tabular-nums">
                      {pillar.index}
                    </span>
                    <span className="w-6 h-6 rounded-lg bg-[#2878D0]/12 text-[#2878D0] flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" weight="bold" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="font-[Cairo] text-lg sm:text-xl font-bold text-[#101C2C]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-[1.85] text-[#4A5B6E]">{pillar.summary}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const SafetyAndTeamSection: React.FC = () => {
  return (
    <section
      id="safety"
      className="relative bg-[#101C2C] text-white py-24 sm:py-32 overflow-hidden"
    >
      <DarkChapterAtmosphere variant="charcoal" />
      <div aria-hidden="true" className="absolute inset-0 arch-grid-dark pointer-events-none" />

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-10 flex flex-col gap-24 sm:gap-28">
        {/* Part 1: Safety & Quality Standards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            <RevealBlock className="flex flex-col gap-4">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#E5A52B]">
                06 — الجودة والسلامة المهنية
              </span>
              <h2 className="font-[Cairo] text-4xl sm:text-5xl font-extrabold text-white leading-[1.18]">
                معايير الجودة والسلامة في كل موقع
              </h2>
              <p className="text-base sm:text-lg leading-[1.85] text-[#B8C5D1]">
                لا ينفصل الإنجاز الإنشائي عن سلامة الأطقم وضبط الجودة في كل تفصيلة. نطبّق منظومة فحص وتنظيم يومية في مواقعنا قبل الصب وأثناء التنفيذ وحتى التسليم.
              </p>
            </RevealBlock>

            <div className="relative">
              <CinematicImageReveal
                src={SITE_IMAGES.safetySurvey}
                alt="أعمال ضبط مساحي وسلامة مهنية بحواجز حماية في موقع مبنى خرساني"
                fallbackTitle="الضبط المساحي ومعايير السلامة"
                direction="right"
                className="rounded-3xl aspect-[16/10] border border-white/10"
              />
              <div className="mt-4 flex items-center justify-between gap-4 text-xs text-[#B8C5D1]">
                <span className="inline-flex items-center gap-2 text-[#F5F6F7] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#E5A52B]" weight="bold" aria-hidden="true" />
                  <span>التزام يومي بالسلامة المهنية وتأمين مسارات ومحيط مواقع الصب</span>
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between divide-y divide-white/10 border-y border-white/10">
            {SAFETY_QUALITY_STANDARDS.map((item, idx) => (
              <RevealBlock key={item.index} delay={idx * 0.06} className="py-6 sm:py-7">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs font-semibold text-[#E5A52B] tabular-nums">
                      {item.index}
                    </span>
                    <span className="text-xs font-medium text-[#B8C5D1]">{item.checkpoint}</span>
                  </div>
                  <h3 className="font-[Cairo] text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-[1.85] text-[#B8C5D1]">{item.description}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>

        {/* Part 2: Human-Centered Corporate Identity — Our People & Field Leadership */}
        <div
          id="team"
          className="pt-16 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch"
        >
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <RevealBlock className="flex flex-col gap-3">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#E5A52B]">
                فريق العمل والهيكل التنفيذي
              </span>
              <h2 className="font-[Cairo] text-3xl sm:text-4xl font-extrabold text-white leading-snug">
                تنظيم هندسي متكامل بين المكتب الفني والموقع
              </h2>
              <p className="text-sm sm:text-base leading-[1.85] text-[#B8C5D1]">
                تعتمد المناهري على تكامل واضح بين مهندسي التخطيط وضبط الجودة وأطقم الخرسانة والحدادة والنجارة والتشطيبات لضمان سرعة القرار ودقة التنفيذ الميداني.
              </p>
            </RevealBlock>

            <CinematicImageReveal
              src={SITE_IMAGES.siteLeadership}
              alt="فريق من مهندسي التنفيذ وإدارة المشاريع يراجعون المخططات الإنشائية في موقع العمل"
              fallbackTitle="فريق العمل الميداني والهندسي"
              direction="up"
              className="rounded-3xl aspect-[16/10] border border-white/10"
            />
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TEAM_DISCIPLINES.map((unit, idx) => (
              <RevealBlock key={unit.index} delay={idx * 0.06} className="h-full">
                <div className="h-full rounded-3xl p-6 sm:p-7 bg-[#1E3A5F]/42 border border-white/10 hover:border-[#2878D0]/60 transition-colors duration-300 flex flex-col justify-between gap-5">
                  <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-xs font-semibold text-[#E5A52B] tabular-nums">
                      {unit.index}
                    </span>
                    <h3 className="font-[Cairo] text-xl font-bold text-white leading-snug">
                      {unit.title}
                    </h3>
                    <span className="text-xs font-semibold text-[#5EA0EA]">{unit.role}</span>
                  </div>
                  <p className="text-sm leading-[1.85] text-[#B8C5D1] pt-4 border-t border-white/10">
                    {unit.focus}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface FieldUpdatesSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const FieldUpdatesSection: React.FC<FieldUpdatesSectionProps> = ({ onSelectProject }) => {
  const handleOpenUpdateProject = (projectId: string) => {
    const found = ALL_PROJECTS.find((p) => p.id === projectId);
    if (found) {
      onSelectProject(found);
    }
  };

  return (
    <section
      id="updates"
      className="bg-[#F5F6F7] text-[#101C2C] py-24 sm:py-28 border-b border-[#101C2C]/8"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-10 flex flex-col gap-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#101C2C]/10">
          <RevealBlock className="flex flex-col gap-3 max-w-[680px]">
            <span className="font-mono text-xs font-semibold tracking-wider text-[#2878D0]">
              07 — أخبار وتحديثات المواقع
            </span>
            <h2 className="font-[Cairo] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101C2C]">
              مستجدات التنفيذ والتسليم
            </h2>
            <p className="text-base text-[#4A5B6E]">
              متابعة دورية لأبرز المراحل المنجزة في مواقعنا الجارية والمشاريع التي تم تسليمها.
            </p>
          </RevealBlock>
          <RevealBlock delay={0.08} className="text-xs sm:text-sm text-[#4A5B6E]">
            اضغط على أي تحديث للاطلاع على دراسة ومعرض المشروع الكامل
          </RevealBlock>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {FIELD_UPDATES.map((item, idx) => (
            <RevealBlock key={item.id} delay={idx * 0.06} className="h-full">
              <article className="group h-full flex flex-col">
                <button
                  type="button"
                  onClick={() => handleOpenUpdateProject(item.projectId)}
                  className="text-right h-full rounded-3xl overflow-hidden bg-white border border-[#101C2C]/8 hover:border-[#2878D0]/50 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(16,28,44,0.14)] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878D0]"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-[#101C2C]">
                    <CinematicImageReveal
                      src={item.image}
                      alt={item.imageAlt}
                      fallbackTitle={item.title}
                      direction="up"
                      className="w-full h-full"
                      imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-106"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#4A5B6E]">
                        <span className="text-[#2878D0]">{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.date}</span>
                      </div>

                      <h3 className="font-[Cairo] text-lg sm:text-xl font-bold text-[#101C2C] group-hover:text-[#2878D0] transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-sm leading-[1.8] text-[#4A5B6E]">{item.excerpt}</p>
                    </div>

                    <div className="pt-4 border-t border-[#101C2C]/8 flex items-center justify-between text-xs font-bold text-[#101C2C] group-hover:text-[#2878D0] transition-colors">
                      <span>عرض ملف المشروع</span>
                      <ArrowUpLeft
                        className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                        weight="bold"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </button>
              </article>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
};
