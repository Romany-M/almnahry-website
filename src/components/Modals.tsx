import React, { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, X } from 'lucide-react';
import { LEGAL_DOCS, type ProjectItem } from '../data/siteData';
import { ARCHITECTURAL_EASE } from './MotionPrimitives';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onContactWithProject: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onContactWithProject,
}) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
          data-lenis-prevent
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#111315]/80 backdrop-blur-sm"
          />

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: ARCHITECTURAL_EASE }}
            className="relative z-10 w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-[#F5F4F0] text-[#141619] border border-[#141619]/15 shadow-2xl"
          >
            {/* Header Image */}
            <div className="relative h-56 sm:h-72 bg-[#111315]">
              <img
                src={project.image}
                alt={project.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#111315]/85 via-[#111315]/25 to-transparent"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق النافذة"
                className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-[#111315]/85 text-white hover:bg-[#C9974A] hover:text-[#111315] transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-5 right-6 left-6 text-white">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#D4A459] mb-1.5">
                  <span>{project.status === 'completed' ? 'مشروع منفذ ومسلم' : 'قيد التنفيذ بالموقع'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.location}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{project.year}</span>
                </div>
                <h3 id="project-modal-title" className="font-[Cairo] text-xl sm:text-2xl font-bold">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Structured Specs Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-[#141619]/12 text-sm">
                <div>
                  <p className="text-xs text-[#5A5E66] mb-1">الجهة / القطاع</p>
                  <p className="font-semibold text-[#141619]">{project.clientType}</p>
                </div>
                <div>
                  <p className="text-xs text-[#5A5E66] mb-1">المسطح الإجمالي</p>
                  <p className="font-semibold text-[#141619] tabular-nums">{project.area}</p>
                </div>
                <div>
                  <p className="text-xs text-[#5A5E66] mb-1">
                    {project.status === 'completed' ? 'حالة التسليم' : 'التسليم المتوقع'}
                  </p>
                  <p className="font-semibold text-[#141619]">
                    {project.status === 'completed'
                      ? 'تم التسليم بالكامل'
                      : `${project.expectedHandover} (${project.progress}%)`}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-[#8E6322]">نطاق العمل</h4>
                <p className="text-sm sm:text-base font-medium text-[#141619]">{project.scope}</p>
                <p className="text-sm leading-[1.85] text-[#4D5159] pt-1">{project.summary}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-[#8E6322]">أبرز بنود التنفيذ</h4>
                <ul className="space-y-2.5">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#2B2E33]">
                      <Check className="w-4 h-4 text-[#8E6322] mt-1 shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 border-t border-[#141619]/12 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-semibold border border-[#141619]/20 text-[#141619] hover:border-[#141619] transition-colors"
                >
                  إغلاق
                </button>
                <button
                  type="button"
                  onClick={onContactWithProject}
                  className="px-6 py-2.5 text-sm font-bold bg-[#111315] text-white hover:bg-[#8E6322] transition-colors"
                >
                  تواصل معنا لمشروع مماثل
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

interface LegalModalProps {
  docKey: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ docKey, onClose }) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!docKey) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [docKey, onClose]);

  const doc = docKey ? LEGAL_DOCS[docKey] : null;

  return (
    <AnimatePresence>
      {doc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
          data-lenis-prevent
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#111315]/80 backdrop-blur-sm"
          />

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: ARCHITECTURAL_EASE }}
            className="relative z-10 w-full max-w-2xl max-h-[84vh] overflow-y-auto bg-[#F5F4F0] text-[#141619] border border-[#141619]/15 p-6 sm:p-8 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#141619]/12">
              <div>
                <h3 id="legal-modal-title" className="font-[Cairo] text-2xl font-bold text-[#141619]">
                  {doc.title}
                </h3>
                <p className="text-xs text-[#5A5E66] mt-1">{doc.updated}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق"
                className="w-10 h-10 flex items-center justify-center border border-[#141619]/15 text-[#141619] hover:bg-[#111315] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              {doc.sections.map((section) => (
                <div key={section.heading} className="space-y-2">
                  <h4 className="font-[Cairo] text-base font-bold text-[#141619]">
                    {section.heading}
                  </h4>
                  <p className="text-sm leading-[1.85] text-[#4D5159]">{section.body}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#141619]/12 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-semibold bg-[#111315] text-white hover:bg-[#8E6322] transition-colors"
              >
                فهمت
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
