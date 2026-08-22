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
    console.error('SCIMEE Uncaught UI Error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: '#f8fafc',
          fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
          <div style={{
            maxWidth: '520px',
            width: '100%',
            background: '#ffffff',
            borderRadius: '28px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.08)',
            padding: '36px 28px',
            textAlign: 'center'
          }}>
            {/* Warning Icon Pill */}
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: '#fffbeb',
              border: '1px solid rgba(217, 119, 6, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <AlertTriangle size={32} color="#d97706" />
            </div>

            <span className="badge-gold" style={{ marginBottom: '8px' }}>
              SCIMEE System Status
            </span>

            <h2 style={{
              fontSize: '1.4rem',
              fontWeight: '900',
              color: '#020617',
              marginTop: '8px',
              marginBottom: '10px',
              letterSpacing: '-0.02em'
            }}>
              Something went slightly off
            </h2>

            <p style={{
              fontSize: '0.9rem',
              color: '#475569',
              lineHeight: '1.6',
              marginBottom: '26px'
            }}>
              We encountered a temporary interface hiccup while rendering. You can quickly reload the page or reach our admissions counselor directly.
            </p>

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
                href={`tel:${siteConfig.contact.primaryPhone}`}
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
                <span>Call Admissions ({siteConfig.contact.primaryPhoneFormatted})</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
