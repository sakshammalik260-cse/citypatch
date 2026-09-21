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

          <div className="footer-scope-block">
            <div className="scope-col">
              <span className="scope-tag text-teal">CURRENT MVP</span>
              <ul className="scope-list">
                <li>&bull; Real-image Gemini vision diagnosis</li>
                <li>&bull; Strict JSON schema validation</li>
                <li>&bull; Deterministic candidate scoring</li>
                <li>&bull; Bounded 12-module civic library</li>
                <li>&bull; Quick / Smart / Full patch packages</li>
                <li>&bull; Draft Patch Passport &amp; Human gate</li>
              </ul>
            </div>
            <div className="scope-col">
              <span className="scope-tag text-dim">FUTURE ROADMAP</span>
              <ul className="scope-list">
                <li>&bull; Verified physical site measurements</li>
                <li>&bull; Construction-ready engineering CAD</li>
                <li>&bull; Municipal procurement &amp; permitting</li>
                <li>&bull; Dry-assembly contractor deployment</li>
                <li>&bull; Post-installation impact sensors</li>
              </ul>
            </div>
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', textAlign: 'center' }}>
            PROTOTYPE v0.1 &bull; ENGINEERING REVIEW MANDATORY &bull; FOR CIVIC DEMONSTRATION ONLY
          </div>
        </div>
      </div>
    </footer>
  );
}
