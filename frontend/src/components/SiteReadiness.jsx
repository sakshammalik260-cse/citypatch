import React from 'react';
import { CheckCircle2, Circle, AlertCircle, ShieldAlert } from 'lucide-react';

export default function SiteReadiness({
  diagnosis,
  selectedTier,
  summary
}) {
  if (!diagnosis || !selectedTier) return null;

  const constraints = diagnosis.constraints || [];
  const missingInfo = diagnosis.missing_information || [];

  // Derived completed prerequisites
  const completedPrereqs = [
    { label: 'Civic issue identified & evidence recorded', detail: `${diagnosis.problems?.length || 0} issues classified` },
    { label: 'Candidate modules deterministically matched', detail: `${selectedTier.modules?.length || 0} modules in ${selectedTier.name || 'Selected Tier'}` },
    { label: 'Prototype cost and labor bounds calculated', detail: summary?.estimated_cost_inr ? 'Cost model available' : 'Indicative range compiled' },
  ];

  // Derived pending site verification criteria (ONLY from real fields)
  const pendingCriteria = [];

  // Mandatory engineer review
  if (diagnosis.requires_human_review) {
    pendingCriteria.push({
      label: 'Engineer review required before deployment',
      type: 'engineer_review'
    });
  }

  // Material quantities pending verification
  if (summary?.quantity_status === 'not_calculated' || !summary?.quantity_status) {
    pendingCriteria.push({
      label: 'Site measurements required (physical quantities not calculated)',
      type: 'quantity_status'
    });
  }

  // Site missing information requirements from diagnosis
  if (missingInfo.length > 0) {
    missingInfo.forEach(item => {
      pendingCriteria.push({
        label: `Missing information: ${item}`,
        type: 'missing_info'
      });
    });
  }

  // Site constraints from diagnosis
  if (constraints.length > 0) {
    constraints.forEach(item => {
      pendingCriteria.push({
        label: `Site constraint: ${item}`,
        type: 'constraint'
      });
    });
  }

  return (
    <div className="site-readiness-card" aria-label="Site Readiness Assessment">
      <div className="site-readiness-header">
        <div className="readiness-tag">DECISION SUPPORT GATE</div>
        <h3 className="readiness-title">WHAT IS NEEDED BEFORE THIS PATCH CAN BE BUILT?</h3>
        <p className="readiness-sub">
          CITYPATCH separates automated AI reasoning from physical site authorization. Ground deployment requires resolving all pending site surveys.
        </p>
      </div>

      <div className="readiness-columns-grid">
        {/* Left Column: Completed Computational Prerequisites */}
        <div className="readiness-col col-ready">
          <div className="readiness-col-title text-teal">
            <CheckCircle2 size={16} />
            <span>COMPUTATIONAL PREREQUISITES (READY)</span>
          </div>

          <div className="readiness-items">
            {completedPrereqs.map((item, idx) => (
              <div key={idx} className="readiness-row row-done">
                <CheckCircle2 size={15} className="row-icon text-teal" />
                <div>
                  <div className="row-label">{item.label}</div>
                  <div className="row-detail">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pending Physical Verifications */}
        <div className="readiness-col col-pending">
          <div className="readiness-col-title text-amber">
            <AlertCircle size={16} />
            <span>PHYSICAL VERIFICATIONS REQUIRED (PENDING)</span>
          </div>

          <div className="readiness-items">
            {pendingCriteria.map((item, idx) => (
              <div key={idx} className="readiness-row row-pending">
                <Circle size={14} className="row-icon text-amber" />
                <div>
                  <div className="row-label">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

