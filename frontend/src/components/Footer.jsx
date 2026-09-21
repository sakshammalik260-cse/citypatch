import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-minimal">
      <div className="app-container">
        <div className="footer-content">
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-white)', marginBottom: '0.35rem' }}>
              CITYPATCH
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Modular civic infrastructure update engine.
            </p>
          </div>

          <div className="footer-principle">
            AI understands &bull; <strong>CITYPATCH constrains</strong> &bull; Humans approve
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
            PROTOTYPE v0.1 &bull; ENGINEERING REVIEW MANDATORY
          </div>
        </div>
      </div>
    </footer>
  );
}
