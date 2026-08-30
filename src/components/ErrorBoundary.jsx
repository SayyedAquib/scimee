import React from 'react';
import { PhoneCall, RotateCcw, AlertTriangle } from 'lucide-react';
import siteConfig from '../data/site-config.json';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Early return if not in browser or logging disabled
    if (typeof console === 'undefined') return;

    try {
      console.error(
        'SCIMEE Uncaught UI Error:',
        error?.message ?? error,
        errorInfo?.componentStack
      );
    } catch {
      // Fallback
    }
  }

  handleReload = () => {
    try {
      if (typeof window !== 'undefined' && window?.location?.reload) {
        window.location.reload();
      }
    } catch (err) {
      console.error('Reload failed:', err);
    }
  };

  render() {
    if (!this.state?.hasError) {
      return this.props?.children ?? null;
    }

    const primaryPhone = siteConfig?.contact?.primaryPhone ?? '9175013140';
    const primaryPhoneFormatted = siteConfig?.contact?.primaryPhoneFormatted ?? '+91 9175013140';
    const errorMessage =
      this.state?.error?.message ??
      this.state?.error?.toString?.() ??
      'An unexpected error occurred';

    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: '#f8fafc',
          fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
        }}
      >
        <div
          style={{
            maxWidth: '520px',
            width: '100%',
            background: '#ffffff',
            borderRadius: '28px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.08)',
            padding: '36px 28px',
            textAlign: 'center'
          }}
        >
          {/* Warning Icon Pill */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: '#fffbeb',
              border: '1px solid rgba(217, 119, 6, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}
          >
            <AlertTriangle size={32} color="#d97706" />
          </div>

          <span className="badge-gold" style={{ marginBottom: '8px' }}>
            SCIMEE System Status
          </span>

          <h2
            style={{
              fontSize: '1.4rem',
              fontWeight: '900',
              color: '#020617',
              marginTop: '8px',
              marginBottom: '10px',
              letterSpacing: '-0.02em'
            }}
          >
            Something went slightly off
          </h2>

          <p
            style={{
              fontSize: '0.9rem',
              color: '#475569',
              lineHeight: '1.6',
              marginBottom: '16px'
            }}
          >
            We encountered a temporary interface hiccup while rendering. You can quickly reload the
            page or reach our admissions counselor directly.
          </p>

          {this.state?.error && (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '12px',
                padding: '10px 14px',
                marginBottom: '20px',
                textAlign: 'left',
                fontSize: '0.78rem',
                color: '#b91c1c',
                fontFamily: 'monospace',
                overflowX: 'auto',
                maxHeight: '120px'
              }}
            >
              {errorMessage}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={this.handleReload}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.92rem',
                height: '46px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <RotateCcw size={16} />
              <span>Reload Application</span>
            </button>

            <a
              href={`tel:${primaryPhone}`}
              className="btn-secondary"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.92rem',
                height: '46px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textDecoration: 'none'
              }}
            >
              <PhoneCall size={16} color="#d97706" />
              <span>Call Admissions ({primaryPhoneFormatted})</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
