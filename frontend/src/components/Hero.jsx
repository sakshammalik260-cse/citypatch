import React, { lazy, Suspense } from 'react';
import { ArrowDown } from 'lucide-react';
import ErrorBoundary3D from '../3d/ErrorBoundary3D';

const CityScene = lazy(() => import('../3d/CityScene'));

export default function Hero({ is3DActive, onScanClick }) {
  return (
    <section className="hero-viewport">
      {/* 3D Digital City Canvas with Architectural Fallback */}
      <div className="hero-3d-canvas">
        <ErrorBoundary3D disabled={!is3DActive}>
          <Suspense fallback={<div className="hero-3d-canvas" />}>
            <CityScene />
          </Suspense>
        </ErrorBoundary3D>
      </div>

      <div className="hero-gradient-overlay" />

      {/* Hero Foreground Content */}
      <div className="hero-content">
        <div className="hero-meta">
          <span className="hero-kicker">CIVIC UPDATE ENGINE</span>
        </div>

        <h1 className="hero-title">
          Cities shouldn’t wait years
          <span className="hero-title-accent">for small fixes.</span>
        </h1>

        <p className="hero-subtitle">
          Upload a civic space. CITYPATCH turns visible civic problems into bounded modular intervention options with indicative cost ranges.
        </p>

        <button onClick={onScanClick} className="hero-cta">
          <span>SCAN A CIVIC SPACE</span>
          <ArrowDown size={18} />
        </button>
      </div>

      {/* Clean Hero Footer */}
      <div className="hero-footer">
        <div className="hero-statement">
          <strong>AI understands.</strong> &bull; <strong>CITYPATCH constrains.</strong> &bull; <strong>Humans approve.</strong>
        </div>
        <div className="hero-scroll-hint">
          <span>SCROLL TO WORKSPACE</span>
          <ArrowDown size={14} />
        </div>
      </div>
    </section>
  );
}
