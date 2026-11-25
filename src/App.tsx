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
import {
  NAV_ITEMS,
  QUOTATION_SCOPES,
  SERVICES,
  type ProjectCategory,
  type ProjectItem,
} from './data/siteData';

const DEFAULT_TITLE = 'شركة المناهري للمقاولات العمومية | منذ عام 1998';

const isKnownPath = (pathname: string) => {
  return pathname === '/' || pathname === '/index.html' || pathname === '';
};

/*
 * Single source of truth for header background contrast only (strictly decoupled from active nav highlighting).
 * Ordered top-to-bottom matching the exact DOM layout.
 */
const SURFACE_BANDS: { id: string; theme: 'dark' | 'light' }[] = [
  { id: 'home', theme: 'dark' },
  { id: 'about', theme: 'light' },
  { id: 'manifesto', theme: 'dark' },
  { id: 'services', theme: 'light' },
  { id: 'completed', theme: 'light' },
  { id: 'current', theme: 'dark' },
  { id: 'sectors', theme: 'light' },
  { id: 'safety', theme: 'dark' },
  { id: 'updates', theme: 'light' },
  { id: 'partners', theme: 'light' },
  { id: 'faq', theme: 'light' },
  { id: 'contact', theme: 'dark' },
];

/*
 * Strictly ordered navigation sections matching NAV_ITEMS 1 -> 5:
 * 1. about (#about) — extends through adjacent #manifesto statement
 * 2. services (#services)
 * 3. completed (#completed)
 * 4. current (#current)
 * 5. partners (#partners)
 */
const NAV_SCROLL_SECTIONS: { id: string; endId?: string }[] = [
  { id: 'about', endId: 'manifesto' },
  { id: 'services' },
  { id: 'completed' },
  { id: 'current' },
  { id: 'partners' },
];

const NAV_ID_SET = new Set(NAV_ITEMS.map((item) => item.id));

interface NavLockState {
  targetId: string;
  navId: string;
  expiresAt: number;
}

const getFixedHeaderHeight = (): number => {
  const headerEl = document.getElementById('site-header');
  if (!headerEl) return 76;
  const h = headerEl.getBoundingClientRect().height;
  return h > 0 ? h : 76;
};

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const lastScrollTargetRef = useRef<string | null>(null);
  const navLockRef = useRef<NavLockState | null>(null);
  const evaluateScrollSpyRef = useRef<() => void>(() => {});

  const [introDone, setIntroDone] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [headerMode, setHeaderMode] = useState<HeaderMode>('hero-top');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [inquiryPreset, setInquiryPreset] = useState<InquiryPreset | null>(null);
  const [legalDoc, setLegalDoc] = useState<'privacy' | 'terms' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
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
      duration: 1.05,
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

  // Pause scroll while intro, mobile menu, or legal modal is active
  useEffect(() => {
    const shouldLock = Boolean(legalDoc || mobileMenuOpen || (!introDone && !isNotFound));
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
  }, [legalDoc, mobileMenuOpen, introDone, isNotFound]);

  /*
   * Deterministic, monotonic, single-source-of-truth Scroll Spy & Header Surface Engine.
   * Uses live viewport geometry (getBoundingClientRect) relative to a consistent activation line
   * directly below the fixed header, eliminating IntersectionObserver out-of-order jumps and
   * preventing click-to-scroll race conditions.
   */
  useEffect(() => {
    if (isNotFound || activeProject) return;

    let rafId = 0;
    let scheduled = false;

    const evaluate = () => {
      scheduled = false;

      const headerHeight = getFixedHeaderHeight();
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight || 800;

      // 1. Evaluate header surface contrast (completely decoupled from active nav item)
      const headerProbeY = Math.round(headerHeight * 0.5);
      let behindTheme: 'dark' | 'light' = 'dark';

      for (const band of SURFACE_BANDS) {
        const el = document.getElementById(band.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerProbeY && rect.bottom > headerProbeY) {
          behindTheme = band.theme;
          break;
        }
      }

      const nextHeaderMode: HeaderMode =
        scrollY < 48 ? 'hero-top' : behindTheme === 'light' ? 'light-scrolled' : 'dark-scrolled';

      setHeaderMode((prev) => (prev !== nextHeaderMode ? nextHeaderMode : prev));

      // 2. Respect active click-navigation lock until target arrival or expiry
      const lock = navLockRef.current;
      if (lock) {
        const targetEl = document.getElementById(lock.targetId);
        const expectedTop = lock.targetId === 'home' ? 0 : headerHeight;
        const targetTop = targetEl ? targetEl.getBoundingClientRect().top : expectedTop;
        const atPageBottom =
          scrollY + viewportHeight >= document.documentElement.scrollHeight - 4;
        const arrived = Math.abs(targetTop - expectedTop) <= 28 || (lock.targetId !== 'home' && atPageBottom);
        const expired = performance.now() >= lock.expiresAt;

        if (!arrived && !expired) {
          setActiveSection((prev) => (prev !== lock.navId ? lock.navId : prev));
          return;
        }
        navLockRef.current = null;
      }

      // 3. Monotonic activation threshold below the fixed header (consistent across all section heights)
      const activationLine = headerHeight + Math.min(Math.max(viewportHeight * 0.2, 48), 160);
      const exitLine = headerHeight + 8;

      let nextActiveNav = '';
      for (const section of NAV_SCROLL_SECTIONS) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const topRect = el.getBoundingClientRect();
        const endEl = section.endId ? document.getElementById(section.endId) : null;
        const bottomY = endEl ? endEl.getBoundingClientRect().bottom : topRect.bottom;

        // Eligible ONLY if section top has crossed activationLine AND section is still within viewport below header
        if (topRect.top <= activationLine && bottomY > exitLine) {
          nextActiveNav = section.id;
        }
      }

      setActiveSection((prev) => (prev !== nextActiveNav ? nextActiveNav : prev));
    };

    evaluateScrollSpyRef.current = evaluate;

    const scheduleEvaluate = () => {
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(evaluate);
      }
    };

    // Any direct user scroll intent cancels click-navigation lock immediately so manual scrolling always wins
    const cancelNavLockOnUserInput = () => {
      if (navLockRef.current) {
        navLockRef.current = null;
        scheduleEvaluate();
      }
    };

    const handleKeyScroll = (e: KeyboardEvent) => {
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'PageDown' ||
        e.key === 'PageUp' ||
        e.key === 'Home' ||
        e.key === 'End' ||
        e.key === ' '
      ) {
        cancelNavLockOnUserInput();
      }
    };

    evaluate();
    window.addEventListener('scroll', scheduleEvaluate, { passive: true });
    window.addEventListener('resize', scheduleEvaluate, { passive: true });
    window.addEventListener('wheel', cancelNavLockOnUserInput, { passive: true });
    window.addEventListener('touchstart', cancelNavLockOnUserInput, { passive: true });
    window.addEventListener('keydown', handleKeyScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleEvaluate);
      window.removeEventListener('resize', scheduleEvaluate);
      window.removeEventListener('wheel', cancelNavLockOnUserInput);
      window.removeEventListener('touchstart', cancelNavLockOnUserInput);
      window.removeEventListener('keydown', handleKeyScroll);
    };
  }, [isNotFound, activeProject]);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  const handleNavigate = useCallback((target: string) => {
    const id = target.replace(/^#/, '');
    const element = document.getElementById(id);
    if (!element) return;

    const headerHeight = getFixedHeaderHeight();
    const scrollOffset = id === 'home' ? 0 : -headerHeight;
    const lockedNavId = NAV_ID_SET.has(id) ? id : '';

    // Immediately sync active state and lock scroll-spy during smooth travel to prevent intermediate flickering
    setActiveSection(lockedNavId);
    navLockRef.current = {
      targetId: id,
      navId: lockedNavId,
      expiresAt: performance.now() + 1400,
    };

    if (lenisRef.current) {
      lenisRef.current.scrollTo(element, {
        offset: scrollOffset,
        duration: 1.0,
        onComplete: () => {
          navLockRef.current = null;
          evaluateScrollSpyRef.current();
        },
      });
    } else {
      const top = Math.max(0, element.getBoundingClientRect().top + window.scrollY + scrollOffset);
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

  const handleRequestQuoteForService = useCallback(
    (serviceId: string) => {
      const scopeByService: Record<string, string> = {
        concrete: QUOTATION_SCOPES[0],
        rebar: QUOTATION_SCOPES[1],
        carpentry: QUOTATION_SCOPES[1],
        finishing: QUOTATION_SCOPES[2],
      };
      setInquiryPreset({
        mode: 'quotation',
        scope: scopeByService[serviceId] ?? QUOTATION_SCOPES[3],
        nonce: Date.now(),
      });
      handleNavigate('#contact');
    },
    [handleNavigate]
  );

  const handleSelectSector = useCallback(
    (category: ProjectCategory, targetSection: '#completed' | '#current') => {
      if (targetSection === '#completed') {
        setSelectedCategory(category);
      }
      handleNavigate(targetSection);
    },
    [handleNavigate]
  );

  const handleSelectServiceFromFooter = useCallback(
    (serviceId: string) => {
      setActiveServiceId(serviceId);
      handleNavigate('#services');
    },
    [handleNavigate]
  );

  const handleSelectCategoryFromFooter = useCallback(
    (category: ProjectCategory) => {
      setSelectedCategory(category);
      handleNavigate('#completed');
    },
    [handleNavigate]
  );

  const handleOpenProject = useCallback((project: ProjectItem) => {
    lastScrollTargetRef.current = project.status === 'completed' ? '#completed' : '#current';
    navLockRef.current = null;
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
                onMobileMenuChange={setMobileMenuOpen}
              />

              <main id="main" className="flex-1">
                <HeroSection
                  onNavigate={handleNavigate}
                  onRequestQuote={handleRequestQuote}
                  introDone={introDone}
                />
                <AboutSection />
                <TaglineRevealSection />
                <ServicesSection
                  onNavigate={handleNavigate}
                  onRequestQuoteForService={handleRequestQuoteForService}
                  activeServiceId={activeServiceId}
                  onSelectService={setActiveServiceId}
                />
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

              <Footer
                onNavigate={handleNavigate}
                onOpenLegal={setLegalDoc}
                onSelectService={handleSelectServiceFromFooter}
                onSelectCategory={handleSelectCategoryFromFooter}
                onRequestQuote={handleRequestQuote}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <LegalModal docKey={legalDoc} onClose={() => setLegalDoc(null)} />
      </div>
    </MotionConfig>
  );
}
