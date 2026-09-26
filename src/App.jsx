import React, { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ToppersSection from './components/ToppersSection';
import CourseExplorer from './components/CourseExplorer';
import PhoneCallModal from './components/PhoneCallModal';
import MobileActionBar from './components/MobileActionBar';
import NetworkStatus from './components/NetworkStatus';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';

// Lazy-load below-the-fold sections for faster initial paint
const SyllabusExplorer = lazy(() => import('./components/SyllabusExplorer'));
const FacilitiesSection = lazy(() => import('./components/FacilitiesSection'));
const CbtShowcaseSection = lazy(() => import('./components/CbtShowcaseSection'));
const MapLocation = lazy(() => import('./components/MapLocation'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const Footer = lazy(() => import('./components/Footer'));

const isTestEnv =
  (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') ||
  Boolean(import.meta?.env?.VITEST);

export default function App() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState('general');
  const [loadDeferred, setLoadDeferred] = useState(() => isTestEnv);

  useEffect(() => {
    if (loadDeferred) return;

    const triggerDeferred = () => {
      setLoadDeferred(true);
    };

    window.addEventListener('scroll', triggerDeferred, { passive: true, once: true });
    window.addEventListener('touchstart', triggerDeferred, { passive: true, once: true });
    window.addEventListener('mousemove', triggerDeferred, { passive: true, once: true });
    window.addEventListener('keydown', triggerDeferred, { passive: true, once: true });

    let idleId;
    let timerId;
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(triggerDeferred, { timeout: 2500 });
    } else {
      timerId = setTimeout(triggerDeferred, 2500);
    }

    return () => {
      window.removeEventListener('scroll', triggerDeferred);
      window.removeEventListener('touchstart', triggerDeferred);
      window.removeEventListener('mousemove', triggerDeferred);
      window.removeEventListener('keydown', triggerDeferred);
      if (idleId && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [loadDeferred]);

  useEffect(() => {
    if (loadDeferred && typeof window !== 'undefined' && window.location?.hash) {
      const targetId = window.location.hash.slice(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [loadDeferred]);

  const openCallModal = useCallback((ctx = 'general') => {
    setModalContext(typeof ctx === 'string' ? ctx : 'general');
    setIsCallModalOpen(true);
  }, []);

  const closeCallModal = useCallback(() => {
    setIsCallModalOpen(false);
  }, []);

  return (
    <div
      className="apple-bg-mesh"
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Specular Hairline Reading Scroll Progress */}
      <ScrollProgress />

      {/* Offline / Online Network Connectivity Banner */}
      <NetworkStatus />

      {/* Apple Floating Island Top Header */}
      <Header onOpenCallModal={() => openCallModal('header')} />

      {/* Main Sections */}
      <main style={{ flex: '1' }}>
        <Hero onOpenCallModal={() => openCallModal('hero')} />
        <ToppersSection onOpenCallModal={() => openCallModal('toppers')} />
        <CourseExplorer onOpenCallModal={() => openCallModal('courses')} />
        {loadDeferred ? (
          <Suspense fallback={null}>
            <SyllabusExplorer onOpenCallModal={() => openCallModal('syllabus')} />
            <FacilitiesSection onOpenCallModal={() => openCallModal('facilities')} />
            <CbtShowcaseSection />
            <MapLocation onOpenCallModal={() => openCallModal('location')} />
            <FAQSection onOpenCallModal={() => openCallModal('faq')} />
          </Suspense>
        ) : null}
      </main>

      {/* Footer */}
      {loadDeferred ? (
        <Suspense fallback={null}>
          <Footer onOpenCallModal={() => openCallModal('footer')} />
        </Suspense>
      ) : null}

      {/* Direct Phone Call Popup Modal (Apple Sheet) */}
      <PhoneCallModal isOpen={isCallModalOpen} onClose={closeCallModal} context={modalContext} />

      {/* Floating Glassmorphic Back to Top Action */}
      <ScrollToTop />

      {/* Sticky Bottom Action Bar for Mobile */}
      <MobileActionBar onOpenCallModal={() => openCallModal('mobile_bar')} />
    </div>
  );
}
