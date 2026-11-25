import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'motion/react';
import {
  CaretLeft,
  CaretRight,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  X,
} from '@phosphor-icons/react';
import type { ProjectGalleryImage } from '../data/siteData';
import { BASE_EASE } from './MotionPrimitives';

interface ProjectLightboxProps {
  images: ProjectGalleryImage[];
  initialIndex: number | null;
  projectTitle: string;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 65;

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  images,
  initialIndex,
  projectTitle,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex ?? 0);
  const [direction, setDirection] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (initialIndex !== null) {
      setCurrentIndex(initialIndex);
      setDirection(0);
      setIsZoomed(false);
    }
  }, [initialIndex]);

  const isOpen = initialIndex !== null && images.length > 0;

  // Lock background page scroll while Lightbox is active
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const goNext = useCallback(() => {
    setIsZoomed(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setIsZoomed(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const jumpTo = (idx: number) => {
    setIsZoomed(false);
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goPrev();
      } else if (e.key === '+' || e.key === '=' || e.key.toLowerCase() === 'z') {
        e.preventDefault();
        setIsZoomed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, goNext, goPrev, onClose]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isZoomed) return;
    const swipePower = Math.abs(info.offset.x) + Math.abs(info.velocity.x) * 0.2;
    if (swipePower > SWIPE_THRESHOLD) {
      if (info.offset.x > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  };

  const activeImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && activeImage && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`معرض صور ${projectTitle}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: BASE_EASE }}
          className="fixed inset-0 z-[95] bg-[#040A16]/96 backdrop-blur-2xl flex flex-col justify-between select-none"
          data-lenis-prevent
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-4 px-4 sm:px-8 py-4 border-b border-white/10">
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-mono text-xs sm:text-sm text-[#60A5FA] tabular-nums shrink-0">
                {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </span>
              <span aria-hidden="true" className="text-white/25">
                ·
              </span>
              <span className="text-sm font-medium text-white truncate">{activeImage.phase}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsZoomed((prev) => !prev)}
                aria-label={isZoomed ? 'تصغير الصورة' : 'تكبير الصورة'}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/8 border border-white/12 text-white hover:border-[#3B82F6]/60 hover:text-[#60A5FA] active:scale-[0.96] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                {isZoomed ? (
                  <MagnifyingGlassMinus className="w-5 h-5" weight="regular" />
                ) : (
                  <MagnifyingGlassPlus className="w-5 h-5" weight="regular" />
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق المعرض"
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/8 border border-white/12 text-white hover:bg-[#2563EB] hover:border-[#2563EB] active:scale-[0.96] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="w-5 h-5" weight="bold" />
              </button>
            </div>
          </div>

          {/* Main Interactive Image Stage (Supports Swipe when unzoomed & Pan when zoomed) */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden px-4 sm:px-20 py-4">
            {images.length > 1 && (
              <button
                type="button"
                onClick={goPrev}
                aria-label="الصورة السابقة"
                className="hidden sm:flex absolute right-6 z-20 w-12 h-12 rounded-2xl items-center justify-center bg-[#0D1B31]/90 border border-white/15 text-white hover:bg-[#2563EB] hover:border-[#2563EB] active:scale-[0.95] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                <CaretRight className="w-5 h-5" weight="bold" />
              </button>
            )}

            {images.length > 1 && (
              <button
                type="button"
                onClick={goNext}
                aria-label="الصورة التالية"
                className="hidden sm:flex absolute left-6 z-20 w-12 h-12 rounded-2xl items-center justify-center bg-[#0D1B31]/90 border border-white/15 text-white hover:bg-[#2563EB] hover:border-[#2563EB] active:scale-[0.95] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                <CaretLeft className="w-5 h-5" weight="bold" />
              </button>
            )}

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${currentIndex}-${isZoomed ? 'zoom' : 'fit'}`}
                custom={direction}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction >= 0 ? -42 : 42, scale: 0.98 }
                }
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction >= 0 ? 42 : -42, scale: 0.98 }
                }
                transition={{ duration: 0.38, ease: BASE_EASE }}
                drag={isZoomed ? true : images.length > 1 ? 'x' : false}
                dragConstraints={
                  isZoomed ? { left: -240, right: 240, top: -180, bottom: 180 } : { left: 0, right: 0 }
                }
                dragElastic={isZoomed ? 0.12 : 0.22}
                onDragEnd={handleDragEnd}
                className={`relative max-w-6xl max-h-full w-full flex items-center justify-center ${
                  isZoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-grab active:cursor-grabbing'
                }`}
              >
                <motion.img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  onDoubleClick={() => setIsZoomed((prev) => !prev)}
                  onClick={() => {
                    if (!isZoomed) setIsZoomed(true);
                  }}
                  animate={{ scale: isZoomed ? 1.65 : 1 }}
                  transition={{ duration: 0.4, ease: BASE_EASE }}
                  className={`max-h-[66vh] sm:max-h-[70vh] w-auto max-w-full object-contain rounded-2xl border border-white/12 shadow-[0_32px_90px_-15px_rgba(0,0,0,0.9)] ${
                    isZoomed ? 'cursor-move' : 'cursor-zoom-in'
                  }`}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Caption + Thumbnail Filmstrip + Mobile Controls */}
          <div className="px-4 sm:px-8 py-4 border-t border-white/10 bg-[#050B16]/95 flex flex-col gap-4">
            <div className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-sm text-[#CBD5E1] leading-relaxed">{activeImage.caption}</p>

              <span className="hidden sm:inline-block text-xs text-[#94A3B8] whitespace-nowrap shrink-0">
                {isZoomed ? 'اسحب لاستكشاف التفاصيل أو انقر مرتين للتصغير' : 'اضغط للتكبير أو استخدم الأسهم للتنقل'}
              </span>

              {images.length > 1 && (
                <div className="flex sm:hidden items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/8 border border-white/12 text-xs font-semibold text-white active:scale-[0.97]"
                  >
                    <CaretRight className="w-4 h-4" weight="bold" />
                    <span>السابقة</span>
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/8 border border-white/12 text-xs font-semibold text-white active:scale-[0.97]"
                  >
                    <span>التالية</span>
                    <CaretLeft className="w-4 h-4" weight="bold" />
                  </button>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="max-w-5xl mx-auto w-full flex items-center justify-center gap-2.5 overflow-x-auto pb-1">
                {images.map((img, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={`${img.src}-${idx}`}
                      type="button"
                      onClick={() => jumpTo(idx)}
                      aria-label={`عرض الصورة رقم ${idx + 1}: ${img.phase}`}
                      className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                        isActive
                          ? 'border-[#3B82F6] opacity-100 scale-105'
                          : 'border-transparent opacity-45 hover:opacity-85'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
