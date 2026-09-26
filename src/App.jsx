import React, { useState, useCallback, lazy, Suspense } from 'react';
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

export default function App() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState('general');

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
        <Suspense fallback={null}>
          <SyllabusExplorer onOpenCallModal={() => openCallModal('syllabus')} />
          <FacilitiesSection onOpenCallModal={() => openCallModal('facilities')} />
          <CbtShowcaseSection />
          <MapLocation onOpenCallModal={() => openCallModal('location')} />
          <FAQSection onOpenCallModal={() => openCallModal('faq')} />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer onOpenCallModal={() => openCallModal('footer')} />
      </Suspense>

      {/* Direct Phone Call Popup Modal (Apple Sheet) */}
      <PhoneCallModal isOpen={isCallModalOpen} onClose={closeCallModal} context={modalContext} />

      {/* Floating Glassmorphic Back to Top Action */}
      <ScrollToTop />

      {/* Sticky Bottom Action Bar for Mobile */}
      <MobileActionBar onOpenCallModal={() => openCallModal('mobile_bar')} />
    </div>
  );
}
