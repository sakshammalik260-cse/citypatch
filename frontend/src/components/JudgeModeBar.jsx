import React from 'react';
import { Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export default function JudgeModeBar({
  currentStep, // 1: Ingest, 2: Diagnose, 3: Compose, 4: Review
  onSelectStep,
  onExitJudgeMode
}) {
  const steps = [
    { num: '01', key: 'ingest', label: 'INGEST', target: 'workspace' },
    { num: '02', key: 'diagnose', label: 'DIAGNOSE', target: 'diagnosis-view' },
    { num: '03', key: 'compose', label: 'COMPOSE', target: 'patch-comparison' },
    { num: '04', key: 'review', label: 'REVIEW', target: 'patch-passport' },
  ];

  const handleStepClick = (stepIndex, targetId) => {
    onSelectStep(stepIndex);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="judge-bar-container" aria-label="Judge Demo Progress Bar">
      <div className="judge-bar-inner">
        <div className="judge-bar-lead">
          <Compass size={14} className="text-teal" />
          <span className="judge-lead-title">JUDGE DEMO MODE</span>
          <span className="judge-lead-badge">60-90s Flow</span>
        </div>

        <nav className="judge-steps-row" aria-label="Judge Steps">
          {steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isDone = currentStep > stepNum;
            const isCurrent = currentStep === stepNum;
            const isPending = currentStep < stepNum;

            return (
              <button
                key={step.key}
                type="button"
                onClick={() => handleStepClick(stepNum, step.target)}
                className={`judge-step-btn ${isCurrent ? 'step-current' : isDone ? 'step-done' : 'step-pending'}`}
                title={`Go to Step ${step.num}: ${step.label}`}
              >
                <span className="step-number">{step.num}</span>
                <span className="step-label">{step.label}</span>
                {isDone && <CheckCircle2 size={12} className="step-done-icon" />}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onExitJudgeMode}
          className="judge-exit-btn"
          title="Exit Judge Demo Mode"
        >
          Normal View
        </button>
      </div>
    </aside>
  );
}

