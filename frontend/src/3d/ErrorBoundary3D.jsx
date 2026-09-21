import React, { Component } from 'react';

/**
 * 3D Error Boundary & Fallback
 *
 * If WebGL is unavailable or fails, renders a clean, beautiful
 * static architectural digital gradient background.
 * Zero terminal aesthetics, seamless and non-intrusive.
 */
export class ErrorBoundary3D extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('3D canvas inactive, using architectural fallback:', error, errorInfo);
  }

  render() {
    if (this.state.hasError || this.props.disabled) {
      return (
        <div
          className="hero-3d-canvas"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 212, 178, 0.15), transparent 70%), #070B0E',
            backgroundImage: `
              radial-gradient(circle at 50% 30%, rgba(0, 212, 178, 0.08) 0%, transparent 60%),
              linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 48px 48px, 48px 48px'
          }}
          role="img"
          aria-label="Architectural spatial view"
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary3D;
