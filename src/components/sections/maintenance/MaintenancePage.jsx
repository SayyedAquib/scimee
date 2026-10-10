import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  MessageCircle,
  Zap,
  Coffee,
  RefreshCw,
  ShieldAlert
} from 'lucide-react';
import defaultMaintenanceData from '@/data/maintenance.json';

export default function MaintenancePage({ data = defaultMaintenanceData }) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const copyTimerRef = useRef(null);
  const verifyTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      if (verifyTimerRef.current) clearTimeout(verifyTimerRef.current);
    };
  }, []);

  const payment = data?.payment ?? {};
  const upiId = payment?.upiId ?? 'aquibprivate@okhdfcbank';
  const payeeName = payment?.payeeName ?? 'Aquib';
  const note = payment?.note ?? 'SCIMEE Website Development Final Settlement';
  const whatsappNumber = payment?.whatsappNumber ?? '9175013140';

  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&cu=INR&tn=${encodeURIComponent(note)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiUrl)}&margin=8`;

  const whatsappMessage = encodeURIComponent(
    `Hi ${payeeName}, I have completed the pending website payment to ${upiId}. Please find the screenshot attached and restore the website.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleCopyUpi = useCallback(async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(upiId);
      }
    } catch {
      // Fallback if clipboard API fails
    }
    setCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => {
      setCopied(false);
    }, 2500);
  }, [upiId]);

  const handleSimulateVerification = useCallback(() => {
    setIsCheckingPayment(true);
    setVerificationResult(null);

    if (verifyTimerRef.current) clearTimeout(verifyTimerRef.current);
    verifyTimerRef.current = setTimeout(() => {
      setIsCheckingPayment(false);
      setVerificationResult({
        status: 'unverified',
        message:
          'RBI & HDFC server query returned: ₹0.00 detected. Nice try! 😜 If you actually transferred it, tap below to send the screenshot on WhatsApp to get the site unpaused immediately!'
      });
    }, 1800);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        background: 'linear-gradient(135deg, #090d16 0%, #111827 50%, #030712 100%)',
        color: '#f8fafc',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(245, 158, 11, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '28px',
          padding: 'clamp(24px, 5vw, 44px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Ambient Top Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '260px',
            height: '160px',
            background:
              'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.25), transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Status Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#ef4444',
              display: 'inline-block',
              boxShadow: '0 0 10px #ef4444'
            }}
          />
          {data?.badge ?? 'HTTP 402: Payment Required'}
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(26px, 4vw, 36px)',
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            marginBottom: '14px',
            background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {data?.headline ?? 'Website Paused Due To Unfed Developer 🍕💸'}
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: 'clamp(15px, 2.5vw, 17px)',
            color: '#94a3b8',
            lineHeight: 1.6,
            maxWidth: '540px',
            margin: '0 auto 28px auto'
          }}
        >
          {data?.subheadline ??
            "This website is taking an emergency siesta because the developer's bank account has reached critically low fuel levels."}
        </p>

        {/* Diagnostics Bento Box */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '10px',
            marginBottom: '28px',
            textAlign: 'left'
          }}
        >
          {(data?.metrics ?? []).map((m) => {
            const isCompleted = m?.status === 'completed';
            return (
              <div
                key={m?.id ?? m?.label}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: isCompleted
                    ? '1px solid rgba(16, 185, 129, 0.2)'
                    : '1px solid rgba(239, 68, 68, 0.35)',
                  borderRadius: '16px',
                  padding: '14px',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '6px'
                  }}
                >
                  <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>
                    {m?.label}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 size={16} color="#10b981" />
                  ) : (
                    <ShieldAlert size={16} color="#ef4444" />
                  )}
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: isCompleted ? '#34d399' : '#f87171'
                  }}
                >
                  {m?.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Humorous Message Box */}
        <div
          style={{
            background: 'rgba(245, 158, 11, 0.06)',
            border: '1px solid rgba(245, 158, 11, 0.22)',
            borderRadius: '18px',
            padding: '18px 20px',
            marginBottom: '28px',
            textAlign: 'left',
            color: '#fde68a',
            fontSize: '14px',
            lineHeight: 1.65
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 700,
              marginBottom: '6px',
              color: '#f59e0b'
            }}
          >
            <Coffee size={18} />
            {data?.messageTitle ?? 'Dear Valued Client,'}
          </div>
          <p style={{ margin: 0, color: '#fed7aa' }}>
            {data?.messageBody ??
              'Servers require electricity, code requires coffee, and your friendly developer requires money to survive. Once the pending dues land safely in Google Pay, our digital hamsters will immediately spin the wheels and restore this website to full glory!'}
          </p>
        </div>

        {/* UPI Payment Card */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '24px'
          }}
        >
          <div
            style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#94a3b8',
              marginBottom: '8px'
            }}
          >
            Direct Google Pay / UPI Destination
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '12px 18px',
              borderRadius: '14px',
              marginBottom: '14px',
              flexWrap: 'wrap'
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 'clamp(14px, 3.5vw, 17px)',
                fontWeight: 700,
                color: '#38bdf8',
                letterSpacing: '0.02em',
                wordBreak: 'break-all'
              }}
            >
              {upiId}
            </span>

            <button
              type="button"
              onClick={handleCopyUpi}
              aria-label="Copy UPI ID"
              style={{
                background: copied ? '#10b981' : 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              {copied ? (
                <>
                  <Check size={14} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={14} /> Copy UPI
                </>
              )}
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            {/* Primary Google Pay Link */}
            <a
              href={upiUrl}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '14px 24px',
                borderRadius: '14px',
                fontWeight: 700,
                fontSize: '15px',
                boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.4)',
                transition: 'transform 0.15s ease'
              }}
            >
              <Zap size={18} /> Pay via Google Pay / UPI
              <ExternalLink size={16} />
            </a>

            {/* Toggle QR code */}
            <button
              type="button"
              onClick={() => setShowQr((prev) => !prev)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                color: '#cbd5e1',
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <QrCode size={16} /> {showQr ? 'Hide UPI QR Code' : 'Scan via Phone (Show QR Code)'}
            </button>
          </div>

          {/* QR Code Container */}
          {showQr ? (
            <div
              style={{
                marginTop: '16px',
                padding: '16px',
                background: '#ffffff',
                borderRadius: '16px',
                display: 'inline-block',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
              }}
            >
              <img
                src={qrUrl}
                alt={`Scan to pay ${upiId}`}
                width="200"
                height="200"
                style={{ display: 'block', borderRadius: '8px' }}
                loading="lazy"
              />
              <div
                style={{
                  fontSize: '11px',
                  color: '#475569',
                  fontWeight: 600,
                  marginTop: '8px',
                  textAlign: 'center'
                }}
              >
                Scan with Google Pay, PhonePe or Paytm
              </div>
            </div>
          ) : null}
        </div>

        {/* Verification Check & WhatsApp Escalation */}
        <div style={{ marginTop: '16px' }}>
          <button
            type="button"
            onClick={handleSimulateVerification}
            disabled={isCheckingPayment}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#38bdf8',
              fontSize: '13px',
              fontWeight: 600,
              cursor: isCheckingPayment ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'underline'
            }}
          >
            <RefreshCw
              size={14}
              style={{
                animation: isCheckingPayment ? 'spin 1s linear infinite' : 'none'
              }}
            />
            {isCheckingPayment ? 'Querying RBI servers...' : 'I already paid! Check payment status'}
          </button>

          {verificationResult ? (
            <div
              style={{
                marginTop: '14px',
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: '14px',
                padding: '14px 16px',
                fontSize: '13px',
                lineHeight: 1.55,
                color: '#fca5a5'
              }}
            >
              <div style={{ marginBottom: '10px' }}>{verificationResult.message}</div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#25D366',
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '13px'
                }}
              >
                <MessageCircle size={15} /> Send Receipt on WhatsApp
              </a>
            </div>
          ) : null}
        </div>

        {/* Footer Perks */}
        <div
          style={{
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: '12px',
            color: '#64748b'
          }}
        >
          <div>⚡ Automatic site reactivation immediately upon payment confirmation.</div>
          <div style={{ marginTop: '4px', fontSize: '11px', color: '#475569' }}>
            Developer bypass available with <code>?bypass=true</code>
          </div>
        </div>
      </div>
    </div>
  );
}
