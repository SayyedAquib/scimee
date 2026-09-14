import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import siteConfig from '../data/site-config.json';
import PhoneModalHeader from './modal/PhoneModalHeader';
import PhoneModalBody from './modal/PhoneModalBody';

function resolveModalData(context, config) {
  const safeContext = String(context ?? '').toLowerCase();
  const brandName = config?.brand?.name ?? 'SCIMEE';
  const brandFullName =
    config?.brand?.fullName ?? 'Sara Coaching Institute of Medical Entrance Examination';
  const founder = config?.brand?.founder ?? 'Ansari Rehan Ahmed';

  const isCounseling = safeContext.includes('counseling') || safeContext.includes('post-neet');

  if (isCounseling) {
    return {
      title: 'Consult Rehan Sir (Parents & Students)',
      subtitle: `Post-NEET Medical College Choice-Filling & Rank Analysis under ${founder}.`,
      badge: '1-on-1 Admission Counseling',
      showCbtCTA: true
    };
  }

  return {
    title: `Connect with ${brandName}`,
    subtitle: brandFullName,
    badge: 'Direct Admissions Line',
    showCbtCTA: safeContext.includes('cbt') || safeContext.includes('course')
  };
}

export default function PhoneCallModal({ isOpen, onClose, context }) {
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e?.key === 'Escape') {
        onCloseRef.current?.();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
    }

    if (document?.body?.style) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeyDown);
      }
      if (document?.body?.style) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const modalData = resolveModalData(context, siteConfig);

  return (
    <dialog
      open
      className="modal-backdrop"
      aria-modal="true"
      aria-labelledby="call-modal-title"
      style={{
        border: 'none',
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh'
      }}
    >
      {/* Accessible Backdrop Overlay Click-to-Dismiss */}
      <button
        type="button"
        aria-label="Close modal backdrop"
        onClick={() => onClose?.()}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          background: 'transparent',
          cursor: 'default',
          zIndex: 0
        }}
        tabIndex={-1}
      />
      <div className="modal-card" style={{ position: 'relative', zIndex: 1 }}>
        {/* Apple Mobile Bottom Sheet Grab Handle */}
        <div className="modal-grab-handle" />

        {/* Modal Header */}
        <PhoneModalHeader modalData={modalData} onClose={onClose} />

        {/* Modal Body */}
        <PhoneModalBody
          modalData={modalData}
          siteConfig={siteConfig}
          context={context}
          onClose={onClose}
        />

        {/* Modal Footer */}
        <div
          style={{
            padding: '14px 24px 20px',
            borderTop: '1px solid rgba(0, 0, 0, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.76rem',
            color: 'var(--text-muted)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Sparkles size={13} color="#d97706" />
            <span>Admissions open for NEET 2026 Batch</span>
          </div>
          <button
            onClick={() => onClose?.()}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-sub)',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.78rem'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
