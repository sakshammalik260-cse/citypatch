import React, { useState, useEffect } from 'react';
import { checkHealth } from '../api/citypatchApi';
import { Eye, EyeOff } from 'lucide-react';

export default function Navbar({ is3DActive, onToggle3D, isJudgeMode, onToggleJudgeMode }) {
  const [health, setHealth] = useState({ status: 'checking', service: '', version: '' });

  useEffect(() => {
    let mounted = true;
    const fetchHealth = async () => {
      try {
        const res = await checkHealth();
        if (mounted) {
          setHealth({ status: 'online', service: res.service, version: res.version });
        }
      } catch (_) {
        if (mounted) {
          setHealth({ status: 'offline', service: 'citypatch-api', version: '' });
        }
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 15000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="navbar-wrapper">
      <nav className="navbar-pill" aria-label="Main Navigation">
        <a href="#" className="nav-brand">
          <span className="nav-brand-dot" />
          <span>CITYPATCH</span>
        </a>

        <div className="nav-actions">
          {/* Real Backend Status */}
          <div className="nav-status">
            {health.status === 'online' && (
              <>
                <span className="status-dot-online" />
                <span>CORE ONLINE</span>
              </>
            )}
            {health.status === 'checking' && (
              <>
                <span className="status-dot-checking" />
                <span>CHECKING CORE</span>
              </>
            )}
            {health.status === 'offline' && (
              <>
                <span className="status-dot-offline" />
                <span>CORE OFFLINE</span>
              </>
            )}
          </div>

          <span className="nav-badge">PROTOTYPE v0.1</span>

          <button
            onClick={onToggleJudgeMode}
            className={`nav-toggle-judge ${isJudgeMode ? 'active' : ''}`}
            title="Toggle guided 60-90s Judge Demo mode"
            aria-label="Toggle Judge Demo Mode"
          >
            <span>JUDGE DEMO</span>
          </button>

          <button
            onClick={onToggle3D}
            className="nav-toggle-3d"
            title={is3DActive ? "Disable 3D spatial canvas" : "Enable 3D spatial canvas"}
            aria-label="Toggle 3D View"
          >
            {is3DActive ? <Eye size={13} /> : <EyeOff size={13} />}
            <span>{is3DActive ? '3D' : '2D'}</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
