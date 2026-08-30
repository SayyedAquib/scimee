import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ToppersSection from './components/ToppersSection';
import CourseExplorer from './components/CourseExplorer';
import SyllabusExplorer from './components/SyllabusExplorer';
import FacilitiesSection from './components/FacilitiesSection';
import CbtShowcaseSection from './components/CbtShowcaseSection';
import MapLocation from './components/MapLocation';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import PhoneCallModal from './components/PhoneCallModal';
import MobileActionBar from './components/MobileActionBar';
import NetworkStatus from './components/NetworkStatus';

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
      {/* Offline / Online Network Connectivity Banner */}
      <NetworkStatus />

      {/* Apple Floating Island Top Header */}
      <Header onOpenCallModal={() => openCallModal('header')} />

      {/* Main Sections */}
      <main style={{ flex: '1' }}>
        <Hero onOpenCallModal={() => openCallModal('hero')} />
        <ToppersSection onOpenCallModal={() => openCallModal('toppers')} />
        <CourseExplorer onOpenCallModal={() => openCallModal('courses')} />
        <SyllabusExplorer onOpenCallModal={() => openCallModal('syllabus')} />
        <FacilitiesSection onOpenCallModal={() => openCallModal('facilities')} />
        <CbtShowcaseSection />
        <MapLocation onOpenCallModal={() => openCallModal('location')} />
        <FAQSection onOpenCallModal={() => openCallModal('faq')} />
      </main>

      {/* Footer */}
      <Footer onOpenCallModal={() => openCallModal('footer')} />

      {/* Direct Phone Call Popup Modal (Apple Sheet) */}
      <PhoneCallModal isOpen={isCallModalOpen} onClose={closeCallModal} context={modalContext} />

      {/* Sticky Bottom Action Bar for Mobile */}
      <MobileActionBar onOpenCallModal={() => openCallModal('mobile_bar')} />
    </div>
  );
}
