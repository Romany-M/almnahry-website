import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpLeft, FolderOpen, Images } from '@phosphor-icons/react';
import {
  COMPLETED_PROJECTS,
  CURRENT_PROJECTS,
  PROJECT_CATEGORIES,
  type ProjectCategory,
  type ProjectItem,
} from '../data/siteData';
import {
  BASE_EASE,
  CinematicImageReveal,
  DarkChapterAtmosphere,
  RevealBlock,
} from './MotionPrimitives';

interface ProjectsSectionsProps {
  onSelectProject: (project: ProjectItem) => void;
  selectedCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
}

export const ProjectsSections: React.FC<ProjectsSectionsProps> = ({
  onSelectProject,
  selectedCategory,
  onCategoryChange,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const filteredCompleted =
    selectedCategory === 'all'
      ? COMPLETED_PROJECTS
      : COMPLETED_PROJECTS.filter((p) => p.category === selectedCategory);

  const isEditorialShowcase = selectedCategory === 'all' && filteredCompleted.length === 4;

  return (
    <>
      {/* Completed Projects Section — Pure Architectural White Editorial Portfolio */}
      <section
        id="completed"
        className="relative bg-white text-[#071121] py-24 sm:py-32 border-b border-[#071121]/8"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 flex flex-col gap-14 sm:gap-16">
          {/* Editorial Header + Filter Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#071121]/10">
            <RevealBlock className="flex flex-col gap-3 max-w-[680px]">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#2563EB]">
                03 — سجل الإنجازات والتسليم
              </span>
              <h2 className="font-[Cairo] text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-[#071121] leading-[1.15]">
                المشاريع المنفذة
              </h2>
              <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
                أعمال سلمناها بالكامل، بحسب العقد والمواصفات المتفق عليها.
              </p>
            </RevealBlock>

            {/* Architectural Segmented Category Filter */}
            <RevealBlock delay={0.08}>
              <div
                role="tablist"
                aria-label="تصفية المشاريع المنفذة"
                className="inline-flex flex-wrap items-center gap-1 p-1.5 rounded-2xl bg-[#F1F5F9] border border-[#071121]/8"
              >
                {PROJECT_CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => onCategoryChange(category.id)}
                      className={`relative min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                        isActive ? 'text-white' : 'text-[#475569] hover:text-[#071121]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="completedFilterIndicator"
                          transition={{ duration: 0.42, ease: BASE_EASE }}
                          className="absolute inset-0 rounded-xl bg-[#071121] shadow-sm"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10">{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </RevealBlock>
          </div>

          {filteredCompleted.length === 0 ? (
            <div className="rounded-3xl p-12 bg-[#F8FAFC] border border-[#071121]/8 flex flex-col items-center justify-center text-center gap-4">
              <FolderOpen className="w-10 h-10 text-[#2563EB]" weight="regular" aria-hidden="true" />
              <h3 className="font-[Cairo] text-xl font-bold text-[#071121]">
                لا توجد مشاريع في هذا التصنيف حاليًا
              </h3>
              <p className="text-sm text-[#475569] max-w-md">
                يمكنك العودة لعرض جميع المشاريع المنفذة للاطلاع على سجل أعمالنا الكامل.
              </p>
              <button
                type="button"
                onClick={() => onCategoryChange('all')}
                className="btn-cobalt px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              >
                عرض جميع الأعمال
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
              <AnimatePresence mode="popLayout">
                {filteredCompleted.map((project, index) => {
                  /* Asymmetric Editorial Composition when showing full portfolio */
                  const isHeroSpread = isEditorialShowcase && (index === 0 || index === 3);
                  const isReversedSpread = isEditorialShowcase && index === 3;
                  const colSpanClass = isHeroSpread
                    ? 'lg:col-span-12'
                    : isEditorialShowcase && index === 1
                      ? 'lg:col-span-7'
                      : isEditorialShowcase && index === 2
                        ? 'lg:col-span-5'
                        : 'lg:col-span-6';

                  const revealDirection =
                    index % 3 === 0 ? 'up' : index % 3 === 1 ? 'right' : 'left';

                  if (isHeroSpread) {
                    return (
                      <motion.article
                        key={project.id}
                        layout
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.6, delay: index * 0.05, ease: BASE_EASE }}
                        className={`${colSpanClass} group`}
                      >
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className="w-full text-right rounded-3xl overflow-hidden bg-[#F8FAFC] border border-[#071121]/8 hover:border-[#2563EB]/45 hover:shadow-[0_32px_80px_-28px_rgba(7,17,33,0.18)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] grid grid-cols-1 lg:grid-cols-12 items-stretch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                        >
                          {/* Oversized Editorial Photograph */}
                          <div
                            className={`lg:col-span-7 relative min-h-[280px] sm:min-h-[380px] lg:min-h-[460px] overflow-hidden ${
                              isReversedSpread ? 'lg:order-2' : 'lg:order-1'
                            }`}
                          >
                            <CinematicImageReveal
                              src={project.image}
                              alt={project.imageAlt}
                              fallbackTitle={project.title}
                              direction={isReversedSpread ? 'left' : 'right'}
                              immediate={selectedCategory !== 'all'}
                              className="w-full h-full"
                              imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                            />
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 bg-gradient-to-t from-[#071121]/65 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-400"
                            />
                            <div className="absolute bottom-5 right-5 left-5 flex items-center justify-between gap-3">
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                                <Images
                                  className="w-4 h-4 text-[#60A5FA]"
                                  weight="regular"
                                  aria-hidden="true"
                                />
                                <span className="tabular-nums">
                                  {project.gallery.length} صور موثقة
                                </span>
                              </span>
                              <span className="font-mono text-xs text-white/80 tabular-nums">
                                0{index + 1} / 0{filteredCompleted.length}
                              </span>
                            </div>
                          </div>

                          {/* Architectural Specification & Story Column */}
                          <div
                            className={`lg:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col justify-between gap-8 ${
                              isReversedSpread ? 'lg:order-1' : 'lg:order-2'
                            }`}
                          >
                            <div className="flex flex-col gap-5">
                              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#64748B]">
                                <span className="text-[#2563EB]">{project.categoryLabel}</span>
                                <span aria-hidden="true">·</span>
                                <span>{project.location}</span>
                                <span aria-hidden="true">·</span>
                                <span className="font-mono tabular-nums">{project.year}</span>
                              </div>

                              <h3 className="font-[Cairo] text-2xl sm:text-3xl font-extrabold text-[#071121] group-hover:text-[#2563EB] transition-colors duration-300 leading-[1.3]">
                                {project.title}
                              </h3>

                              <p className="text-sm sm:text-base leading-[1.85] text-[#475569]">
                                {project.summary}
                              </p>
                            </div>

                            <div className="flex flex-col gap-6">
                              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#071121]/10">
                                <div className="flex flex-col gap-1">
                                  <span className="text-xs text-[#64748B]">المسطح الإجمالي</span>
                                  <span className="font-mono text-base font-bold text-[#071121] tabular-nums">
                                    {project.area}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <span className="text-xs text-[#64748B]">مدة التنفيذ</span>
                                  <span className="text-sm font-bold text-[#071121]">
                                    {project.duration}
                                  </span>
                                </div>
                              </div>

                              <div className="inline-flex items-center justify-between gap-3 pt-2">
                                <span className="text-sm font-bold text-[#071121] group-hover:text-[#2563EB] transition-colors">
                                  استكشف دراسة المشروع
                                </span>
                                <span className="w-11 h-11 rounded-xl bg-[#071121] text-white flex items-center justify-center group-hover:bg-[#2563EB] transition-colors duration-300 shrink-0">
                                  <ArrowUpLeft
                                    className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                                    weight="bold"
                                    aria-hidden="true"
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      </motion.article>
                    );
                  }

                  /* Asymmetric Secondary Pair (7/5 Split) or Filtered 2-Col Editorial Cards */
                  const isTallCard = isEditorialShowcase && index === 2;

                  return (
                    <motion.article
                      key={project.id}
                      layout
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.55, delay: index * 0.06, ease: BASE_EASE }}
                      className={`${colSpanClass} group flex flex-col`}
                    >
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="text-right flex flex-col h-full rounded-3xl overflow-hidden bg-white border border-[#071121]/10 hover:border-[#2563EB]/50 hover:-translate-y-1 hover:shadow-[0_28px_70px_-28px_rgba(7,17,33,0.18)] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                      >
                        <div
                          className={`relative w-full overflow-hidden bg-[#0D1B31] ${
                            isTallCard ? 'aspect-[4/3] lg:aspect-[5/4.3]' : 'aspect-[16/10]'
                          }`}
                        >
                          <CinematicImageReveal
                            src={project.image}
                            alt={project.imageAlt}
                            fallbackTitle={project.title}
                            direction={revealDirection}
                            immediate={selectedCategory !== 'all'}
                            className="w-full h-full"
                            imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-106"
                          />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-[#071121]/75 via-[#071121]/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-400"
                          />

                          <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between gap-3">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                              <Images
                                className="w-4 h-4 text-[#60A5FA]"
                                weight="regular"
                                aria-hidden="true"
                              />
                              <span className="tabular-nums">{project.gallery.length} صور موثقة</span>
                            </span>

                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#071121]/80 backdrop-blur-md border border-white/15 text-xs font-semibold text-white group-hover:bg-[#2563EB] group-hover:border-[#2563EB] transition-colors duration-300">
                              <span>دراسة المشروع</span>
                              <ArrowUpLeft
                                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                                weight="bold"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                        </div>

                        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#64748B]">
                              <span className="text-[#2563EB]">{project.categoryLabel}</span>
                              <span aria-hidden="true">·</span>
                              <span>{project.location}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums">{project.year}</span>
                            </div>

                            <h3 className="font-[Cairo] text-xl sm:text-2xl font-extrabold text-[#071121] group-hover:text-[#2563EB] transition-colors duration-300 leading-snug">
                              {project.title}
                            </h3>

                            <p className="text-sm leading-[1.85] text-[#475569]">
                              {project.summary}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-[#071121]/10 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                            <span className="text-[#64748B] truncate">
                              المسطح{' '}
                              <strong className="font-mono text-[#071121] tabular-nums">
                                {project.area}
                              </strong>
                            </span>
                            <span className="text-[#475569] font-medium truncate">
                              {project.structuralSpec}
                            </span>
                            <span className="text-[#64748B] shrink-0">
                              {project.duration}
                            </span>
                          </div>
                        </div>
                      </button>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Current Projects Section — Deep Architectural Navy Live Execution Chapter */}
      <section
        id="current"
        className="relative bg-[#071121] text-white py-24 sm:py-32 overflow-hidden"
      >
        <DarkChapterAtmosphere variant="navy" />
        <div aria-hidden="true" className="absolute inset-0 arch-grid-dark pointer-events-none" />

        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8 flex flex-col gap-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <RevealBlock className="flex flex-col gap-3 max-w-[680px]">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#60A5FA]">
                04 — مواقع العمل الجارية الآن
              </span>
              <h2 className="font-[Cairo] text-4xl sm:text-5xl font-extrabold text-white">
                المشاريع الحالية
              </h2>
              <p className="text-base sm:text-lg text-[#CBD5E1]">
                مشاريع يعمل عليها فريقنا في المواقع الآن.
              </p>
            </RevealBlock>
            <RevealBlock delay={0.08} className="text-xs sm:text-sm text-[#94A3B8]">
              تحديثات هندسية مرحلية ومتابعة مباشرة للجداول الزمنية
            </RevealBlock>
          </div>

          <div className="flex flex-col gap-8">
            {CURRENT_PROJECTS.map((project, index) => {
              const progress = project.progress ?? 50;
              return (
                <RevealBlock key={project.id} delay={index * 0.08}>
                  <article className="group rounded-3xl p-3 sm:p-4 bg-[#0D1B31]/92 backdrop-blur-xl border border-white/10 hover:border-[#3B82F6]/50 hover:shadow-[0_32px_80px_-24px_rgba(37,99,235,0.22)] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
                      {/* Site Photograph Frame with Curtain Reveal */}
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        aria-label={`استعراض دراسة ومعرض ${project.title}`}
                        className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[260px] bg-[#071121] text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                      >
                        <CinematicImageReveal
                          src={project.image}
                          alt={project.imageAlt}
                          fallbackTitle={project.title}
                          direction={index % 2 === 0 ? 'right' : 'left'}
                          className="w-full h-full"
                          imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-106"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-[#071121]/80 via-transparent to-transparent"
                        />
                        <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                          <Images
                            className="w-4 h-4 text-[#60A5FA]"
                            weight="regular"
                            aria-hidden="true"
                          />
                          <span className="tabular-nums">{project.gallery.length} صور من الموقع</span>
                        </span>
                      </button>

                      {/* Technical Progress Narrative */}
                      <div className="lg:col-span-7 p-3 sm:p-6 flex flex-col justify-between gap-6">
                        <div className="flex flex-col gap-3.5">
                          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#94A3B8]">
                            <span className="text-[#60A5FA]">قيد التنفيذ بالموقع</span>
                            <span aria-hidden="true">·</span>
                            <span>{project.location}</span>
                            <span aria-hidden="true">·</span>
                            <span>{project.categoryLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums">{project.area}</span>
                          </div>

                          <h3 className="font-[Cairo] text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                            <button
                              type="button"
                              onClick={() => onSelectProject(project)}
                              className="text-right hover:text-[#60A5FA] transition-colors focus-visible:outline-none focus-visible:underline"
                            >
                              {project.title}
                            </button>
                          </h3>

                          <p className="text-sm sm:text-base leading-[1.85] text-[#CBD5E1]">
                            {project.summary}
                          </p>
                        </div>

                        <div className="flex flex-col gap-4 pt-5 border-t border-white/10">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <span className="text-xs sm:text-sm text-[#CBD5E1]">
                              المرحلة الجارية:{' '}
                              <strong className="text-white font-semibold">
                                {project.currentPhase}
                              </strong>
                            </span>
                            <span className="font-mono text-lg font-bold text-[#60A5FA] tabular-nums">
                              {progress}%
                            </span>
                          </div>

                          <div
                            className="h-2 w-full rounded-full bg-white/10 overflow-hidden"
                            role="progressbar"
                            aria-valuenow={progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`نسبة إنجاز ${project.title}`}
                          >
                            <motion.div
                              initial={
                                shouldReduceMotion ? { scaleX: progress / 100 } : { scaleX: 0 }
                              }
                              whileInView={{ scaleX: progress / 100 }}
                              viewport={{ once: true, amount: 0.4 }}
                              transition={{ duration: 0.95, delay: 0.14, ease: BASE_EASE }}
                              className="h-full w-full rounded-full bg-gradient-to-l from-[#2563EB] via-[#3B82F6] to-[#60A5FA] origin-right will-change-transform"
                            />
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                            <span className="text-xs sm:text-sm text-[#94A3B8]">
                              التسليم المتوقع{' '}
                              <strong className="text-white font-semibold">
                                {project.expectedHandover}
                              </strong>
                            </span>

                            <button
                              type="button"
                              onClick={() => onSelectProject(project)}
                              className="btn-cobalt inline-flex items-center gap-2 min-h-[42px] px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                              <span>استعراض تفاصيل ومعرض الموقع</span>
                              <ArrowUpLeft className="w-4 h-4" weight="bold" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
