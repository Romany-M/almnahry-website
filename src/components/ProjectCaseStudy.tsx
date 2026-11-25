import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowsOut,
  ArrowUpLeft,
  Check,
  Images,
  MapPin,
} from '@phosphor-icons/react';
import { ALL_PROJECTS, type ProjectItem } from '../data/siteData';
import { BrandLogoMark } from './BrandLogo';
import {
  BASE_EASE,
  CinematicImageReveal,
  DarkChapterAtmosphere,
  RevealBlock,
} from './MotionPrimitives';
import { ProjectLightbox } from './ProjectLightbox';

interface ProjectCaseStudyProps {
  project: ProjectItem;
  onBack: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onContactWithProject: (project: ProjectItem) => void;
}

export const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({
  project,
  onBack,
  onSelectProject,
  onContactWithProject,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const relatedProjects = ALL_PROJECTS.filter((p) => p.id !== project.id)
    .sort((a, b) => {
      const aMatch = (a.category === project.category ? 2 : 0) + (a.status === project.status ? 1 : 0);
      const bMatch = (b.category === project.category ? 2 : 0) + (b.status === project.status ? 1 : 0);
      return bMatch - aMatch;
    })
    .slice(0, 3);

  const currentIdx = ALL_PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject =
    ALL_PROJECTS[(currentIdx - 1 + ALL_PROJECTS.length) % ALL_PROJECTS.length];
  const nextProject = ALL_PROJECTS[(currentIdx + 1) % ALL_PROJECTS.length];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setLightboxIndex(null);
  }, [project.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxIndex === null) {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, onBack]);

  const scrollToGallery = () => {
    const el = document.getElementById('case-study-gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      key={project.id}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.55, ease: BASE_EASE }}
      className="min-h-screen bg-[#071121] text-white"
    >
      {/* Sticky Architectural Case Study Bar */}
      <header className="sticky top-0 z-50 bg-[#071121]/90 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/12 text-sm font-semibold text-white hover:bg-[#2563EB] hover:border-[#2563EB] active:scale-[0.97] transition-all duration-300 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
          >
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
              weight="bold"
              aria-hidden="true"
            />
            <span>العودة إلى المشاريع</span>
          </button>

          <div className="hidden md:flex items-center gap-3 min-w-0">
            <BrandLogoMark className="w-6 h-6 shrink-0" accentColor="#3B82F6" />
            <span className="text-sm font-medium text-[#CBD5E1] truncate">{project.title}</span>
            <span className="font-mono text-xs text-[#60A5FA] tabular-nums shrink-0">
              {String(currentIdx + 1).padStart(2, '0')} / {String(ALL_PROJECTS.length).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={scrollToGallery}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/12 text-xs sm:text-sm font-medium text-[#CBD5E1] hover:text-white hover:border-[#3B82F6]/60 transition-all whitespace-nowrap"
            >
              <Images className="w-4 h-4 text-[#60A5FA]" weight="regular" aria-hidden="true" />
              <span>المعرض ({project.gallery.length})</span>
            </button>

            <button
              type="button"
              onClick={() => onContactWithProject(project)}
              className="btn-cobalt inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white whitespace-nowrap"
            >
              طلب مقايسة لمشروع مماثل
            </button>
          </div>
        </div>
      </header>

      {/* Architectural Project Hero */}
      <section className="relative overflow-hidden">
        <DarkChapterAtmosphere variant="navy" />
        <div aria-hidden="true" className="absolute inset-0 arch-grid-dark pointer-events-none" />

        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8 pt-12 sm:pt-16 pb-14">
          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-medium text-[#94A3B8]">
              <span className="text-[#60A5FA] font-semibold">
                {project.status === 'completed' ? 'مشروع منفذ ومسلم بالكامل' : 'مشروع قيد التنفيذ بالموقع'}
              </span>
              <span aria-hidden="true">·</span>
              <span>{project.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#60A5FA]" weight="regular" aria-hidden="true" />
                {project.location}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{project.year}</span>
            </div>

            <motion.h1
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.72, ease: BASE_EASE }}
              className="font-[Cairo] text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.18] text-white"
            >
              {project.title}
            </motion.h1>

            <p className="text-base sm:text-xl leading-[1.8] text-[#CBD5E1] max-w-[66ch]">
              {project.summary}
            </p>
          </div>

          {/* Large Featured Hero Image with Click-to-Lightbox */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: BASE_EASE }}
            className="mt-10 relative group rounded-3xl overflow-hidden border border-white/12 bg-[#0D1B31] shadow-[0_32px_90px_-20px_rgba(0,0,0,0.75)]"
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              aria-label={`فتح صورة ${project.title} بملء الشاشة`}
              className="block w-full text-right relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            >
              <div className="aspect-[16/10] sm:aspect-[16/8.2] w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-104"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#071121]/80 via-transparent to-transparent"
              />
              <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#071121]/85 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold text-white group-hover:bg-[#2563EB] group-hover:border-[#2563EB] transition-colors">
                <ArrowsOut className="w-4 h-4" weight="bold" aria-hidden="true" />
                <span>عرض بملء الشاشة</span>
              </span>
            </button>
          </motion.div>

          {/* Engineering Specifications Bar */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl p-5 bg-[#0D1B31] border border-white/10 flex flex-col gap-1.5">
              <span className="text-xs font-medium text-[#94A3B8]">الجهة أو القطاع</span>
              <span className="text-sm sm:text-base font-semibold text-white">
                {project.clientType}
              </span>
            </div>
            <div className="rounded-2xl p-5 bg-[#0D1B31] border border-white/10 flex flex-col gap-1.5">
              <span className="text-xs font-medium text-[#94A3B8]">المسطح الإجمالي</span>
              <span className="font-mono text-lg font-bold text-[#60A5FA] tabular-nums">
                {project.area}
              </span>
            </div>
            <div className="rounded-2xl p-5 bg-[#0D1B31] border border-white/10 flex flex-col gap-1.5">
              <span className="text-xs font-medium text-[#94A3B8]">
                {project.status === 'completed' ? 'مدة التنفيذ' : 'التسليم المتوقع'}
              </span>
              <span className="text-sm sm:text-base font-semibold text-white">
                {project.status === 'completed'
                  ? `${project.duration} (تم التسليم)`
                  : project.expectedHandover}
              </span>
            </div>
            <div className="rounded-2xl p-5 bg-[#0D1B31] border border-white/10 flex flex-col gap-1.5">
              <span className="text-xs font-medium text-[#94A3B8]">المواصفة البارزة</span>
              <span className="text-sm sm:text-base font-semibold text-white">
                {project.structuralSpec}
              </span>
            </div>
          </div>

          {/* Active Site Progress Bar */}
          {project.status === 'current' && project.progress !== undefined && (
            <div className="mt-6 rounded-2xl p-6 bg-gradient-to-l from-[#122645] to-[#0D1B31] border border-[#3B82F6]/35 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-[#60A5FA]">
                    المرحلة الجارية بالموقع الآن
                  </span>
                  <p className="font-[Cairo] text-lg font-bold text-white">
                    {project.currentPhase}
                  </p>
                </div>
                <span className="font-mono text-2xl font-bold text-[#60A5FA] tabular-nums">
                  {project.progress}%
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={shouldReduceMotion ? { scaleX: project.progress / 100 } : { scaleX: 0 }}
                  animate={{ scaleX: project.progress / 100 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: BASE_EASE }}
                  className="h-full w-full rounded-full bg-gradient-to-l from-[#2563EB] via-[#3B82F6] to-[#60A5FA] origin-right"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Case Study Narrative & Technical Scope — Pure White Editorial Chapter */}
      <section className="bg-white text-[#071121] py-20 sm:py-28">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 flex flex-col gap-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <RevealBlock className="lg:col-span-5 flex flex-col gap-3">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#2563EB]">
                01 — نظرة عامة على المشروع
              </span>
              <h2 className="font-[Cairo] text-3xl sm:text-4xl font-extrabold text-[#071121] leading-snug">
                من المخطط الهندسي إلى التنفيذ الميداني
              </h2>
            </RevealBlock>
            <RevealBlock delay={0.08} className="lg:col-span-7 flex flex-col gap-6">
              <p className="text-base sm:text-lg leading-[1.9] text-[#334155]">
                {project.overview}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="rounded-2xl p-6 bg-[#F8FAFC] border border-[#071121]/10 flex flex-col gap-2.5">
                  <span className="text-xs font-bold text-[#2563EB]">التحدي التنفيذي</span>
                  <p className="text-sm leading-[1.85] text-[#475569]">{project.challenge}</p>
                </div>
                <div className="rounded-2xl p-6 bg-[#071121] text-white border border-[#071121] flex flex-col gap-2.5">
                  <span className="text-xs font-bold text-[#60A5FA]">الحل والضبط الهندسي</span>
                  <p className="text-sm leading-[1.85] text-[#CBD5E1]">{project.solution}</p>
                </div>
              </div>
            </RevealBlock>
          </div>

          <div className="h-px w-full bg-[#071121]/10" aria-hidden="true" />

          {/* Scope & Execution Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <RevealBlock className="lg:col-span-5 flex flex-col gap-3">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#2563EB]">
                02 — نطاق الأعمال والتسليم
              </span>
              <h2 className="font-[Cairo] text-2xl sm:text-3xl font-extrabold text-[#071121]">
                {project.scope}
              </h2>
            </RevealBlock>

            <RevealBlock delay={0.08} className="lg:col-span-7">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.highlights.map((item, idx) => (
                  <li
                    key={item}
                    className="rounded-2xl p-5 bg-[#F8FAFC] border border-[#071121]/10 flex items-start gap-3.5"
                  >
                    <span className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4" weight="bold" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[11px] font-semibold text-[#2563EB] tabular-nums">
                        0{idx + 1}
                      </span>
                      <span className="text-sm leading-[1.75] text-[#111827] font-medium">
                        {item}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* Sophisticated Multi-Image Gallery Section */}
      <section
        id="case-study-gallery"
        className="relative bg-[#071121] text-white py-20 sm:py-28 overflow-hidden"
      >
        <DarkChapterAtmosphere variant="charcoal" />

        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8 flex flex-col gap-10">
          <RevealBlock className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#60A5FA]">
                03 — التوثيق البصري
              </span>
              <h2 className="font-[Cairo] text-3xl sm:text-4xl font-extrabold text-white">
                معرض صور المشروع
              </h2>
            </div>
            <p className="text-sm text-[#94A3B8]">
              اضغط على أي صورة للاستعراض بملء الشاشة والتكبير والتنقل بين اللقطات
            </p>
          </RevealBlock>

          {/* Asymmetric Editorial Masonry Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {project.gallery.map((item, idx) => {
              const spanClass =
                idx === 0
                  ? 'md:col-span-12 aspect-[16/9] sm:aspect-[16/8.5]'
                  : idx === 3
                    ? 'md:col-span-12 aspect-[16/9] sm:aspect-[21/9]'
                    : 'md:col-span-6 aspect-[4/3]';

              return (
                <RevealBlock
                  key={`${item.src}-${idx}`}
                  delay={idx * 0.06}
                  className={idx === 0 || idx === 3 ? 'md:col-span-12' : 'md:col-span-6'}
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    aria-label={`فتح صورة ${item.phase} في المعرض بملء الشاشة`}
                    className="group relative block w-full text-right rounded-3xl overflow-hidden border border-white/12 bg-[#0D1B31] hover:border-[#3B82F6]/60 transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                  >
                    <CinematicImageReveal
                      src={item.src}
                      alt={item.alt}
                      fallbackTitle={item.phase}
                      direction={idx % 2 === 0 ? 'up' : 'right'}
                      className={`${spanClass} w-full`}
                      imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#071121]/90 via-[#071121]/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"
                    />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#071121]/80 backdrop-blur-md border border-white/15 text-white flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:bg-[#2563EB] group-hover:border-[#2563EB] transition-all duration-300">
                      <ArrowsOut className="w-4 h-4" weight="bold" aria-hidden="true" />
                    </div>
                    <div className="absolute bottom-5 right-5 left-5 flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#60A5FA]">
                        <span className="font-mono tabular-nums">0{idx + 1}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.phase}</span>
                      </div>
                      <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
                        {item.caption}
                      </p>
                    </div>
                  </button>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      <section className="bg-white text-[#071121] py-16 sm:py-24 border-t border-[#071121]/8">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#071121]/10">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#2563EB]">
                مشاريع ذات صلة
              </span>
              <h2 className="font-[Cairo] text-2xl sm:text-3xl font-extrabold text-[#071121]">
                أعمال مرتبطة بنفس النطاق الهندسي
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onContactWithProject(project)}
              className="btn-cobalt inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white whitespace-nowrap shrink-0"
            >
              <span>اطلب مقايسة لمشروع مماثل</span>
              <ArrowLeft className="w-4 h-4" weight="bold" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((rel) => (
              <button
                key={rel.id}
                type="button"
                onClick={() => onSelectProject(rel)}
                className="group text-right rounded-3xl overflow-hidden bg-[#F8FAFC] border border-[#071121]/8 hover:bg-white hover:border-[#2563EB]/45 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(7,17,33,0.14)] transition-all duration-300 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#0D1B31]">
                  <img
                    src={rel.image}
                    alt={rel.imageAlt}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-106"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
                      <span className="text-[#2563EB]">{rel.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{rel.location}</span>
                    </div>
                    <h3 className="font-[Cairo] text-lg font-bold text-[#071121] group-hover:text-[#2563EB] transition-colors leading-snug">
                      {rel.title}
                    </h3>
                  </div>
                  <div className="pt-3 border-t border-[#071121]/8 flex items-center justify-between text-xs font-semibold text-[#475569]">
                    <span className="font-mono tabular-nums">{rel.area}</span>
                    <span className="inline-flex items-center gap-1 text-[#071121] group-hover:text-[#2563EB]">
                      <span>عرض المشروع</span>
                      <ArrowUpLeft className="w-3.5 h-3.5" weight="bold" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Next & Previous Project Navigator */}
      <section className="bg-[#050B16] border-t border-white/10 py-16 sm:py-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-[Cairo] text-2xl sm:text-3xl font-bold text-white">
              استكشف مشاريع أخرى للمناهري
            </h2>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#60A5FA] hover:text-white transition-colors whitespace-nowrap"
            >
              <ArrowRight className="w-4 h-4" weight="bold" aria-hidden="true" />
              <span>عرض كافة المشاريع</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              type="button"
              onClick={() => onSelectProject(prevProject)}
              className="group text-right rounded-3xl p-4 bg-[#0D1B31] border border-white/10 hover:border-[#3B82F6]/60 transition-all duration-300 flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-[#111827]">
                <img
                  src={prevProject.image}
                  alt={prevProject.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
              </div>
              <div className="flex flex-col gap-1.5 min-w-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#60A5FA]">
                  <ArrowRight className="w-3.5 h-3.5" weight="bold" aria-hidden="true" />
                  <span>المشروع السابق</span>
                </span>
                <span className="font-[Cairo] text-base sm:text-lg font-bold text-white group-hover:text-[#60A5FA] transition-colors line-clamp-2">
                  {prevProject.title}
                </span>
                <span className="text-xs text-[#94A3B8]">{prevProject.location}</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="group text-right rounded-3xl p-4 bg-[#0D1B31] border border-white/10 hover:border-[#3B82F6]/60 transition-all duration-300 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            >
              <div className="flex flex-col gap-1.5 min-w-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#60A5FA]">
                  <span>المشروع التالي</span>
                  <ArrowLeft className="w-3.5 h-3.5" weight="bold" aria-hidden="true" />
                </span>
                <span className="font-[Cairo] text-base sm:text-lg font-bold text-white group-hover:text-[#60A5FA] transition-colors line-clamp-2">
                  {nextProject.title}
                </span>
                <span className="text-xs text-[#94A3B8]">{nextProject.location}</span>
              </div>
              <div className="w-24 h-24 sm:w-28 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-[#111827]">
                <img
                  src={nextProject.image}
                  alt={nextProject.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Full-Screen Interactive Lightbox */}
      <ProjectLightbox
        images={project.gallery}
        initialIndex={lightboxIndex}
        projectTitle={project.title}
        onClose={() => setLightboxIndex(null)}
      />
    </motion.div>
  );
};
