'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ToppersSection from '../components/ToppersSection';
import CourseExplorer from '../components/CourseExplorer';
import SyllabusExplorer from '../components/SyllabusExplorer';
import FacilitiesSection from '../components/FacilitiesSection';
import MapLocation from '../components/MapLocation';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import PhoneCallModal from '../components/PhoneCallModal';
import MobileActionBar from '../components/MobileActionBar';

export default function HomePage() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const openCallModal = () => setIsCallModalOpen(true);
  const closeCallModal = () => setIsCallModalOpen(false);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Top Header */}
      <Header onOpenCallModal={openCallModal} />

      {/* Main Page Sections */}
      <main style={{ flex: '1' }}>
        <Hero onOpenCallModal={openCallModal} />
        <ToppersSection onOpenCallModal={openCallModal} />
        <CourseExplorer onOpenCallModal={openCallModal} />
        <SyllabusExplorer onOpenCallModal={openCallModal} />
        <FacilitiesSection onOpenCallModal={openCallModal} />
        <MapLocation onOpenCallModal={openCallModal} />
        <FAQSection onOpenCallModal={openCallModal} />
      </main>

      {/* Footer */}
      <Footer onOpenCallModal={openCallModal} />

      {/* Direct Phone Call Popup Modal */}
      <PhoneCallModal isOpen={isCallModalOpen} onClose={closeCallModal} />

      {/* Sticky Bottom Action Bar for Mobile */}
      <MobileActionBar onOpenCallModal={openCallModal} />
    </div>
  );
}
