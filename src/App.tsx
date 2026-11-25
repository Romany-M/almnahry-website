import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { AboutSection, ServicesSection } from './components/AboutAndServices';
import { CinematicIntro } from './components/CinematicIntro';
import { Footer } from './components/Footer';
import { Header, type HeaderMode } from './components/Header';
import { HeroSection } from './components/HeroSection';
import {
  FieldUpdatesSection,
  SafetyAndTeamSection,
  SectorsAndWhySection,
} from './components/InstitutionalSections';
import { LegalModal, NotFoundView } from './components/Modals';
import { BASE_EASE, ScrollProgressBeam } from './components/MotionPrimitives';
import { PartnersAndContact, type InquiryPreset } from './components/PartnersAndContact';
import { ProjectCaseStudy } from './components/ProjectCaseStudy';
import { ProjectsSections } from './components/ProjectsSections';
import { TaglineRevealSection } from './components/TaglineRevealSection';
import { QUOTATION_SCOPES, type ProjectCategory, type ProjectItem } from './data/siteData';

const DEFAULT_TITLE = 'شركة المناهري للمقاولات العمومية | منذ عام 1998';

const isKnownPath = (pathname: string) => {
  return pathname === '/' || pathname === '/index.html' || pathname === '';
};

const SECTION_META: { id: string; navId: string; theme: 'dark' | 'light' }[] = [
  { id: 'home', navId: 'home', theme: 'dark' },
  { id: 'about', navId: 'about', theme: 'light' },
  { id: 'manifesto', navId: 'about', theme: 'dark' },
  { id: 'services', navId: 'services', theme: 'light' },
  { id: 'completed', navId: 'completed', theme: 'light' },
  { id: 'current', navId: 'current', theme: 'dark' },
  { id: 'sectors', navId: 'services', theme: 'light' },
  { id: 'safety', navId: 'about', theme: 'dark' },
  { id: 'partners', navId: 'partners', theme: 'light' },
  { id: 'updates', navId: 'partners', theme: 'light' },
  { id: 'faq', navId: 'partners', theme: 'light' },
  { id: 'contact', navId: 'contact', theme: 'dark' },
];

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const lastScrollTargetRef = useRef<string | null>(null);

  const [introDone, setIntroDone] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [headerMode, setHeaderMode] = useState<HeaderMode>('hero-top');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [inquiryPreset, setInquiryPreset] = useState<InquiryPreset | null>(null);
  const [legalDoc, setLegalDoc] = useState<'privacy' | 'terms' | null>(null);
  const [isNotFound, setIsNotFound] = useState<boolean>(
    () => !isKnownPath(window.location.pathname)
  );

  // Dynamic page title for SEO and browser tab clarity across Case Study pages
  useEffect(() => {
    if (isNotFound) {
      document.title = 'الصفحة غير موجودة | شركة المناهري للمقاولات العمومية';
    } else if (activeProject) {
      document.title = `${activeProject.title} | شركة المناهري للمقاولات العمومية`;
    } else {
      document.title = DEFAULT_TITLE;
    }
  }, [activeProject, isNotFound]);

  // Sync popstate for 404 recovery
  useEffect(() => {
    const onPopState = () => {
      setIsNotFound(!isKnownPath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (isNotFound) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.35,
    });

    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isNotFound]);

  // Pause scroll while intro or legal modal is active
  useEffect(() => {
    const shouldLock = Boolean(legalDoc || (!introDone && !isNotFound));
    if (shouldLock) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [legalDoc, introDone, isNotFound]);

  // Dynamic Smart Header: IntersectionObserver + rAF-throttled probe for exact section & light/dark surface detection
  useEffect(() => {
    if (isNotFound || activeProject) return;

    const tracked = SECTION_META.map((meta) => ({
      ...meta,
      el: document.getElementById(meta.id),
    })).filter(
      (item): item is { id: string; navId: string; theme: 'dark' | 'light'; el: HTMLElement } =>
        Boolean(item.el)
    );

    if (tracked.length === 0) return;

    let rafId = 0;
    let ticking = false;

    const evaluateHeaderState = () => {
      ticking = false;
      const scrollY = window.scrollY;
      const headerProbeY = 52;
      const navProbeY = Math.min(window.innerHeight * 0.28, 260);

      let behindHeader = tracked[0];
      let activeForNav = tracked[0];

      for (const item of tracked) {
        const rect = item.el.getBoundingClientRect();
        if (rect.top <= headerProbeY && rect.bottom > headerProbeY) {
          behindHeader = item;
        }
        if (rect.top <= navProbeY && rect.bottom > navProbeY) {
          activeForNav = item;
        }
      }

      const nextMode: HeaderMode =
        scrollY < 48
          ? 'hero-top'
          : behindHeader.theme === 'light'
            ? 'light-scrolled'
            : 'dark-scrolled';

      setHeaderMode((prev) => (prev !== nextMode ? nextMode : prev));
      setActiveSection((prev) => (prev !== activeForNav.navId ? activeForNav.navId : prev));
    };

    const scheduleEvaluate = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(evaluateHeaderState);
      }
    };

    const observer = new IntersectionObserver(scheduleEvaluate, {
      rootMargin: '-48px 0px -65% 0px',
      threshold: [0, 0.1, 0.25],
    });

    tracked.forEach((item) => observer.observe(item.el));

    evaluateHeaderState();
    window.addEventListener('scroll', scheduleEvaluate, { passive: true });
    window.addEventListener('resize', scheduleEvaluate, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('scroll', scheduleEvaluate);
      window.removeEventListener('resize', scheduleEvaluate);
    };
  }, [isNotFound, activeProject]);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  const handleNavigate = useCallback((target: string) => {
    const id = target.replace(/^#/, '');
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = id === 'home' ? 0 : -84;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(element, {
        offset: headerOffset,
        duration: 1.1,
      });
    } else {
      const top = element.getBoundingClientRect().top + window.scrollY + headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const handleRequestQuote = useCallback(() => {
    setInquiryPreset({
      mode: 'quotation',
      nonce: Date.now(),
    });
    handleNavigate('#contact');
  }, [handleNavigate]);

  const handleSelectSector = useCallback(
    (category: ProjectCategory, targetSection: '#completed' | '#current') => {
      if (targetSection === '#completed') {
        setSelectedCategory(category);
      }
      handleNavigate(targetSection);
    },
    [handleNavigate]
  );

  const handleOpenProject = useCallback((project: ProjectItem) => {
    lastScrollTargetRef.current = project.status === 'completed' ? '#completed' : '#current';
    setActiveProject(project);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  const handleBackToProjects = useCallback(() => {
    const target = lastScrollTargetRef.current ?? '#completed';
    setActiveProject(null);
    window.setTimeout(() => {
      handleNavigate(target);
    }, 340);
  }, [handleNavigate]);

  const handleContactFromCaseStudy = useCallback(
    (project: ProjectItem) => {
      const mappedScope =
        project.category === 'finishing'
          ? QUOTATION_SCOPES[2]
          : project.category === 'structural'
            ? QUOTATION_SCOPES[0]
            : QUOTATION_SCOPES[3];

      setInquiryPreset({
        mode: 'quotation',
        scope: mappedScope,
        projectTitle: project.title,
        nonce: Date.now(),
      });
      setActiveProject(null);
      window.setTimeout(() => {
        handleNavigate('#contact');
      }, 340);
    },
    [handleNavigate]
  );

  const handleReturnHome = useCallback(() => {
    window.history.pushState({}, '', '/');
    setIsNotFound(false);
  }, []);

  if (isNotFound) {
    return (
      <MotionConfig reducedMotion="user">
        <NotFoundView onReturnHome={handleReturnHome} />
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-[#071121]">
        <CinematicIntro onComplete={handleIntroComplete} />
        <ScrollProgressBeam />

        <AnimatePresence mode="wait">
          {activeProject ? (
            <ProjectCaseStudy
              key={`case-study-${activeProject.id}`}
              project={activeProject}
              onBack={handleBackToProjects}
              onSelectProject={handleOpenProject}
              onContactWithProject={handleContactFromCaseStudy}
            />
          ) : (
            <motion.div
              key="main-experience"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: BASE_EASE }}
              className="flex flex-col min-h-screen"
            >
              <Header
                onNavigate={handleNavigate}
                activeSection={activeSection}
                headerMode={headerMode}
              />

              <main id="main" className="flex-1">
                <HeroSection
                  onNavigate={handleNavigate}
                  onRequestQuote={handleRequestQuote}
                  introDone={introDone}
                />
                <AboutSection />
                <TaglineRevealSection />
                <ServicesSection onNavigate={handleNavigate} />
                <ProjectsSections
                  onSelectProject={handleOpenProject}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
                <SectorsAndWhySection
                  onSelectSector={handleSelectSector}
                  onRequestQuote={handleRequestQuote}
                />
                <SafetyAndTeamSection />
                <FieldUpdatesSection onSelectProject={handleOpenProject} />
                <PartnersAndContact inquiryPreset={inquiryPreset} />
              </main>

              <Footer onNavigate={handleNavigate} onOpenLegal={setLegalDoc} />
            </motion.div>
          )}
        </AnimatePresence>

        <LegalModal docKey={legalDoc} onClose={() => setLegalDoc(null)} />
      </div>
    </MotionConfig>
  );
}
