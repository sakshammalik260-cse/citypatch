import React from 'react';
import { AlertCircle, FileQuestion } from 'lucide-react';

export default function SiteReality({ constraints = [], missingInformation = [] }) {
  return (
    <div className="reality-grid">
      {/* Constraints Panel */}
      <div className="reality-card">
        <h4 className="reality-title">
          <AlertCircle size={18} color="#F59E0B" />
          <span>Site Constraints</span>
        </h4>

        {constraints && constraints.length > 0 ? (
          <ul className="reality-list">
            {constraints.map((item, idx) => (
              <li key={idx} className="reality-item">
                <span className="reality-bullet bullet-amber" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            No visual site constraints identified in the current frame.
          </p>
        )}
      </div>

      {/* Missing Information Panel */}
      <div className="reality-card">
        <h4 className="reality-title">
          <FileQuestion size={18} color="#F43F5E" />
          <span>Missing Information</span>
        </h4>

        {missingInformation && missingInformation.length > 0 ? (
          <ul className="reality-list">
            {missingInformation.map((item, idx) => (
              <li key={idx} className="reality-item">
                <span className="reality-bullet bullet-rose" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Standard structural survey recommended prior to physical works.
          </p>
        )}
      </div>
    </div>
  );
}
