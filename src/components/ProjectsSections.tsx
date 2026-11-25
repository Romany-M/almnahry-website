import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpLeft, Building2 } from 'lucide-react';
import {
  COMPLETED_PROJECTS,
  CURRENT_PROJECTS,
  PROJECT_CATEGORIES,
  type ProjectCategory,
  type ProjectItem,
} from '../data/siteData';
import { ARCHITECTURAL_EASE, RevealBlock } from './MotionPrimitives';

interface ProjectsSectionsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsSections: React.FC<ProjectsSectionsProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const shouldReduceMotion = useReducedMotion();

  const filteredCompleted =
    selectedCategory === 'all'
      ? COMPLETED_PROJECTS
      : COMPLETED_PROJECTS.filter((p) => p.category === selectedCategory);

  const markBroken = (id: string) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <>
      {/* Completed Projects Section — المشاريع المنفذة */}
      <section
        id="completed"
        className="bg-[#F5F4F0] text-[#141619] py-20 md:py-28 border-t border-[#141619]/10"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <RevealBlock>
              <p className="text-xs font-semibold text-[#8E6322] mb-3">03. سجل التسليمات</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141619]">
                المشاريع المنفذة
              </h2>
              <p className="mt-3 text-base sm:text-lg text-[#4D5159] max-w-[56ch]">
                أعمال سلمناها بالكامل، بحسب العقد والمواصفات المتفق عليها.
              </p>
            </RevealBlock>

            {/* Functional Interactive Category Filter Control */}
            <RevealBlock delay={0.1}>
              <div
                role="tablist"
                aria-label="تصفية المشاريع المنفذة"
                className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EAE8E1] border border-[#141619]/10"
              >
                {PROJECT_CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`relative px-4 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#8E6322] ${
                        isActive ? 'text-white' : 'text-[#3C4047] hover:text-[#141619]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="completedFilterIndicator"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          className="absolute inset-0 bg-[#111315]"
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

          {/* Asymmetric Architectural Project Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredCompleted.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                    ease: ARCHITECTURAL_EASE,
                  }}
                  className="group bg-white border border-[#141619]/10 flex flex-col overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="text-right flex flex-col h-full focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#8E6322]"
                  >
                    {/* Media Container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181B1F]">
                      {brokenImages[project.id] ? (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-6 text-[#EAE8E1]">
                          <Building2 className="w-7 h-7 text-[#C9974A]" aria-hidden="true" />
                          <span className="text-sm">{project.title}</span>
                        </div>
                      ) : (
                        <img
                          src={project.image}
                          alt={project.imageAlt}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          onError={() => markBroken(project.id)}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
                        />
                      )}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#111315]/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                      />
                    </div>

                    {/* Content Container — Zero Pill Metadata */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-5">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#5A5E66]">
                          <span className="text-[#8E6322] font-semibold">
                            {project.categoryLabel}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{project.location}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{project.year}</span>
                        </div>

                        <h3 className="font-[Cairo] text-xl sm:text-2xl font-bold text-[#141619] group-hover:text-[#8E6322] transition-colors leading-snug">
                          {project.title}
                        </h3>

                        <p className="text-sm leading-[1.8] text-[#4D5159]">{project.summary}</p>
                      </div>

                      <div className="pt-4 border-t border-[#141619]/10 flex items-center justify-between gap-4 text-xs sm:text-sm">
                        <span className="text-[#5A5E66] truncate">
                          المسطح: <strong className="text-[#141619] tabular-nums">{project.area}</strong>
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-semibold text-[#141619] group-hover:text-[#8E6322] transition-colors whitespace-nowrap shrink-0">
                          <span>تفاصيل المشروع</span>
                          <ArrowUpLeft
                            className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                  </button>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Current Projects Section — المشاريع الحالية (Deep Basalt Contrast Band) */}
      <section
        id="current"
        className="relative bg-[#111315] text-[#F5F4F0] py-20 md:py-28 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 architectural-grid-dark pointer-events-none"
        />

        <div className="relative max-w-[1360px] mx-auto px-5 sm:px-8">
          <RevealBlock className="mb-14">
            <p className="text-xs font-semibold text-[#D4A459] mb-3">04. التنفيذ الميداني</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">المشاريع الحالية</h2>
            <p className="mt-3 text-base sm:text-lg text-[#C8C5BC] max-w-[56ch]">
              مشاريع يعمل عليها فريقنا في المواقع الآن.
            </p>
          </RevealBlock>

          <div className="space-y-8">
            {CURRENT_PROJECTS.map((project, index) => {
              const progress = project.progress ?? 50;
              return (
                <RevealBlock key={project.id} delay={index * 0.08}>
                  <article className="group bg-[#181B1F] border border-white/10 overflow-hidden transition-colors duration-300 hover:border-[#C9974A]/50">
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                      {/* Site Photo */}
                      <div className="lg:col-span-5 relative min-h-[240px] lg:min-h-[300px] overflow-hidden bg-[#111315]">
                        {brokenImages[project.id] ? (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-6 text-[#EAE8E1]">
                            <Building2 className="w-7 h-7 text-[#C9974A]" aria-hidden="true" />
                            <span className="text-sm">{project.title}</span>
                          </div>
                        ) : (
                          <img
                            src={project.image}
                            alt={project.imageAlt}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            onError={() => markBroken(project.id)}
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
                          />
                        )}
                      </div>

                      {/* Site Progress & Technical Brief */}
                      <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
                        <div className="space-y-4">
                          {/* Clean Unboxed Metadata */}
                          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#A5A299]">
                            <span className="text-[#D4A459] font-semibold">قيد التنفيذ بالموقع</span>
                            <span aria-hidden="true">·</span>
                            <span>{project.location}</span>
                            <span aria-hidden="true">·</span>
                            <span>{project.categoryLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">المسطح: {project.area}</span>
                          </div>

                          <h3 className="font-[Cairo] text-xl sm:text-2xl font-bold text-white leading-snug">
                            {project.title}
                          </h3>

                          <p className="text-sm sm:text-base leading-[1.8] text-[#C8C5BC]">
                            {project.summary}
                          </p>
                        </div>

                        {/* Architectural Progress Track (Compositor scaleX animation) */}
                        <div className="space-y-4 pt-5 border-t border-white/10">
                          <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs sm:text-sm">
                            <span className="text-[#D6D3CB]">
                              المرحلة الجارية:{' '}
                              <strong className="text-white font-semibold">
                                {project.currentPhase}
                              </strong>
                            </span>
                            <span className="font-mono tabular-nums text-[#D4A459] font-medium">
                              نسبة الإنجاز {progress}%
                            </span>
                          </div>

                          <div
                            className="h-1.5 w-full bg-white/10 overflow-hidden"
                            role="progressbar"
                            aria-valuenow={progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`نسبة إنجاز ${project.title}`}
                          >
                            <motion.div
                              initial={shouldReduceMotion ? { scaleX: progress / 100 } : { scaleX: 0 }}
                              whileInView={{ scaleX: progress / 100 }}
                              viewport={{ once: true, amount: 0.4 }}
                              transition={{ duration: 0.95, delay: 0.15, ease: ARCHITECTURAL_EASE }}
                              className="h-full w-full bg-[#C9974A] origin-right will-change-transform"
                            />
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs sm:text-sm">
                            <span className="text-[#A5A299]">
                              التسليم المتوقع:{' '}
                              <span className="text-[#EAE8E1]">{project.expectedHandover}</span>
                            </span>

                            <button
                              type="button"
                              onClick={() => onSelectProject(project)}
                              className="inline-flex items-center gap-1.5 font-semibold text-[#D4A459] hover:text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9974A]"
                            >
                              <span>استعراض تفاصيل الموقع</span>
                              <ArrowUpLeft className="w-4 h-4" aria-hidden="true" />
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
