import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

const ANALYSIS_STEPS = [
  'READING SCENE',
  'STRUCTURING ISSUES',
  'MATCHING PATCH LIBRARY',
  'BUILDING INTERVENTIONS',
  'PREPARING REVIEW'
];

export default function LoadingState() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev));
    }, 1100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="analysis-overlay" role="dialog" aria-modal="true" aria-label="Analysis in progress">
      <div className="analysis-modal">
        <div className="analysis-modal-laser" />

        <h3 className="analysis-step-title">Compiling Civic Intervention</h3>
        <p className="analysis-step-sub">
          Synthesizing visual diagnosis with deterministic intervention rules
        </p>

        <div className="analysis-steps-list">
          {ANALYSIS_STEPS.map((step, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={idx}
                className={`analysis-step-item ${
                  isCurrent ? 'analysis-step-active' : isDone ? 'analysis-step-completed' : ''
                }`}
              >
                {isDone ? (
                  <CheckCircle2 size={16} color="#00D4B2" style={{ flexShrink: 0 }} />
                ) : isCurrent ? (
                  <Loader2 size={16} className="animate-spin" color="#00D4B2" style={{ flexShrink: 0 }} />
                ) : (
                  <span style={{ width: '16px', height: '16px', borderRadius: '50%', border: '1px solid #334155', display: 'inline-block', flexShrink: 0 }} />
                )}
                <span>{step}</span>
              </div>
            );
          })}
        </div>

        <p style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
          Gemini analyzes scene &bull; CITYPATCH constrains solution
        </p>
      </div>
    </div>
  );
}
