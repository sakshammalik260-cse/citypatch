import React from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { humanize } from '../api/citypatchApi';

export default function DiagnosisView({ diagnosis, previewUrl }) {
  if (!diagnosis) return null;

  const { scene_type, scene_summary, problems = [] } = diagnosis;

  const getSeverityClass = (sev) => {
    switch (sev?.toLowerCase()) {
      case 'high': return 'severity-high';
      case 'medium': return 'severity-medium';
      case 'low':
      default: return 'severity-low';
    }
  };

  return (
    <div>
      {/* Top Strip: Uploaded Original Image Beside Scene Summary */}
      <div className="scene-overview-card">
        {previewUrl ? (
          <div className="scene-photo-wrap">
            <img
              src={previewUrl}
              alt="Analyzed Civic Space"
              className="scene-photo"
            />
          </div>
        ) : (
          <div className="scene-photo-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '160px', color: 'var(--text-muted)' }}>
            Photo Not Available
          </div>
        )}

        <div className="scene-meta-wrap">
          <span className="scene-type-badge">
            {humanize(scene_type) || 'Civic Scene'}
          </span>
          <h3 className="scene-title">
            Scene Analysis &amp; Field Diagnosis
          </h3>
          <p className="scene-summary-text">
            {scene_summary || 'No factual summary provided.'}
          </p>
        </div>
      </div>

      {/* Civic Diagnosis Problems Grid */}
      <div style={{ marginBottom: '1.75rem' }}>
        <span className="section-tag">STRUCTURED OBSERVATIONS</span>
        <h3 className="section-heading" style={{ fontSize: '2rem' }}>Civic Diagnosis</h3>
      </div>

      <div className="diagnosis-grid">
        {problems.map((prob, idx) => {
          const confPercent = Math.round((prob.confidence || 0) * 100);

          return (
            <div key={idx} className="problem-card">
              <div>
                <div className="problem-header">
                  <span className={`severity-pill ${getSeverityClass(prob.severity)}`}>
                    {prob.severity || 'LOW'} SEVERITY
                  </span>
                  <span className="confidence-rate">
                    {confPercent}% Match
                  </span>
                </div>

                <h4 className="problem-name">
                  {humanize(prob.type)}
                </h4>

                <p className="problem-evidence">
                  {prob.evidence}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
