import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'motion/react';
import { AboutAndServices } from './components/AboutAndServices';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LegalModal, ProjectModal } from './components/Modals';
import { ScrollProgressBeam } from './components/MotionPrimitives';
import { PartnersAndContact } from './components/PartnersAndContact';
import { ProjectsSections } from './components/ProjectsSections';
import { NAV_ITEMS, type ProjectItem } from './data/siteData';

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [legalDoc, setLegalDoc] = useState<'privacy' | 'terms' | null>(null);

  // Initialize buttery Lenis smooth scroll (honoring prefers-reduced-motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
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
  }, []);

  // Pause background smooth scroll when a modal is open
  useEffect(() => {
    const isModalOpen = Boolean(selectedProject || legalDoc);
    if (isModalOpen) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject, legalDoc]);

  // Track active section on scroll for navigation indicator
  useEffect(() => {
    const sectionIds = ['home', ...NAV_ITEMS.map((item) => item.id), 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.3, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback((target: string) => {
    const id = target.replace(/^#/, '');
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = id === 'home' ? 0 : -72;

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

  const handleContactFromModal = useCallback(() => {
    setSelectedProject(null);
    window.setTimeout(() => {
      handleNavigate('#contact');
    }, 180);
  }, [handleNavigate]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F5F4F0] text-[#141619]">
        <ScrollProgressBeam />
        <Header onNavigate={handleNavigate} activeSection={activeSection} />

        <main id="main" className="flex-1">
          <HeroSection onNavigate={handleNavigate} />
          <AboutAndServices onNavigate={handleNavigate} />
          <ProjectsSections onSelectProject={setSelectedProject} />
          <PartnersAndContact />
        </main>

        <Footer onNavigate={handleNavigate} onOpenLegal={setLegalDoc} />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onContactWithProject={handleContactFromModal}
        />

        <LegalModal docKey={legalDoc} onClose={() => setLegalDoc(null)} />
      </div>
    </MotionConfig>
  );
}
