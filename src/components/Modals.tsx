import React, { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, X } from '@phosphor-icons/react';
import { LEGAL_DOCS } from '../data/siteData';
import { BrandLogoMark } from './BrandLogo';
import { BASE_EASE } from './MotionPrimitives';

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
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
          data-lenis-prevent
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: BASE_EASE }}
            onClick={onClose}
            className="absolute inset-0 bg-[#040A16]/85 backdrop-blur-md"
          />

          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: BASE_EASE }}
            className="relative z-10 w-full max-w-2xl max-h-[84vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-[#0D1B31] text-white border border-white/14 shadow-2xl flex flex-col gap-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h3 id="legal-modal-title" className="font-[Cairo] text-2xl font-bold text-white">
                  {doc.title}
                </h3>
                <span className="text-xs text-[#94A3B8]">{doc.updated}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق"
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/8 border border-white/12 text-white hover:bg-[#2563EB] hover:border-[#2563EB] active:scale-[0.96] transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                <X className="w-5 h-5" weight="bold" />
              </button>
            </div>

            <div className="h-px w-full bg-white/10" aria-hidden="true" />

            <div className="flex flex-col gap-6">
              {doc.sections.map((section) => (
                <div key={section.heading} className="flex flex-col gap-2">
                  <h4 className="font-[Cairo] text-base font-bold text-[#60A5FA]">
                    {section.heading}
                  </h4>
                  <p className="text-sm leading-[1.85] text-[#CBD5E1]">{section.body}</p>
                </div>
              ))}
            </div>

            <div className="h-px w-full bg-white/10" aria-hidden="true" />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="btn-cobalt px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              >
                إغلاق
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

interface NotFoundViewProps {
  onReturnHome: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onReturnHome }) => {
  return (
    <div className="min-h-screen bg-[#071121] text-white flex items-center justify-center p-6">
      <div className="max-w-lg w-full rounded-3xl p-8 bg-[#0D1B31] border border-white/12 flex flex-col items-start gap-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <BrandLogoMark className="w-8 h-8 text-white" accentColor="#3B82F6" />
          <span className="font-[Cairo] text-base font-bold text-white">
            المناهري للمقاولات العمومية
          </span>
        </div>

        <div className="h-px w-full bg-white/10" aria-hidden="true" />

        <div className="flex flex-col gap-3">
          <span className="font-mono text-5xl font-bold text-[#60A5FA] tabular-nums">404</span>
          <h1 className="font-[Cairo] text-2xl font-bold text-white">الصفحة المطلوبة غير موجودة</h1>
          <p className="text-sm leading-relaxed text-[#CBD5E1]">
            الرابط الذي تحاول الوصول إليه غير متاح حاليًا. يمكنك العودة إلى الصفحة الرئيسية لاستعراض خدمات ومشاريع المناهري.
          </p>
        </div>

        <button
          type="button"
          onClick={onReturnHome}
          className="btn-cobalt inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-bold text-white"
        >
          <ArrowRight className="w-4 h-4" weight="bold" aria-hidden="true" />
          <span>العودة إلى الرئيسية</span>
        </button>
      </div>
    </div>
  );
};
