import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function ErrorBanner({ error, onRetry }) {
  if (!error) return null;

  return (
    <div className="app-container">
      <div className="error-card" role="alert">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <AlertTriangle size={24} style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Notice
            </div>
            <div style={{ fontSize: '0.88rem', opacity: 0.9 }}>
              {error.message || 'An error occurred during analysis.'}
            </div>
          </div>
        </div>

        {onRetry && (
          <button onClick={onRetry} className="btn-retry">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <RotateCcw size={14} />
              <span>Retry</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
