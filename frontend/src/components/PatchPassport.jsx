import React, { useMemo } from 'react';
import {
  FileCheck2,
  Printer,
  Download,
  AlertTriangle,
  ShieldAlert,
  Clock,
  Layers,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { formatCostRange, formatHoursRange, humanize } from '../api/citypatchApi';

export default function PatchPassport({
  diagnosis,
  selectedTier,
  summary,
  tierName,
  passportId,
  createdAt,
  onReset
}) {
  if (!selectedTier || !diagnosis) return null;

  const costRange = formatCostRange(summary?.estimated_cost_inr);
  const hoursRange = formatHoursRange(summary?.estimated_installation_hours);
  const modules = selectedTier.modules || [];
  const coveredProblems = selectedTier.covered_problems || [];
  const constraints = diagnosis.constraints || [];
  const missingInfo = diagnosis.missing_information || [];

  // Lifecycle steps: first 3 are completed by CITYPATCH, remaining 4 are strictly pending human/civil action
  const lifecycleSteps = [
    { label: 'DETECTED', completed: true, status: 'Photo Ingested' },
    { label: 'DIAGNOSED', completed: true, status: 'Schema Validated' },
    { label: 'PATCH COMPOSED', completed: true, status: 'Deterministic Tiers' },
    { label: 'ENGINEER REVIEW', completed: false, status: 'REQUIRED / PENDING', current: true },
    { label: 'APPROVED', completed: false, status: 'NOT APPROVED' },
    { label: 'DEPLOYED', completed: false, status: 'NOT STARTED' },
    { label: 'MEASURED', completed: false, status: 'NOT AVAILABLE — PATCH NOT DEPLOYED' },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const passportData = {
      passport_id: passportId,
      passport_type: 'DRAFT_CIVIC_INTERVENTION_PASSPORT',
      status: 'Draft — Human Review Pending',
      created_at: createdAt,
      city_version_status: 'Draft Patch (Pre-Deployment)',
      scene: {
        scene_type: diagnosis.scene_type,
        scene_summary: diagnosis.scene_summary,
      },
      detected_problems: diagnosis.problems,
      selected_intervention: {
        tier_name: tierName,
        description: selectedTier.description,
        indicative_cost_inr: summary?.estimated_cost_inr,
        indicative_hours: summary?.estimated_installation_hours,
        module_count: modules.length,
        covered_problems: coveredProblems,
        quantity_status: summary?.quantity_status || 'not_calculated',
        quantity_note: 'Physical quantities require verified site measurements.'
      },
      constituent_modules: modules.map(m => ({
        module_id: m.module_id,
        name: m.name,
        category: m.category,
        matched_problems: m.matched_problems,
        score: m.score,
        requires_engineer_review: m.requires_engineer_review
      })),
      site_constraints: constraints,
      missing_information: missingInfo,
      engineering_status: 'Human / Engineer Review Required',
      deployment_status: 'Not Started',
      impact_verification: 'Not Available — Patch Not Yet Deployed',
      disclaimer: 'CITYPATCH outputs are preliminary prototype recommendations. Costs are indicative module-level estimates and physical deployment requires site-specific professional review.'
    };

    const blob = new Blob([JSON.stringify(passportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${passportId}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="patch-passport" className="passport-container">
      {/* Passport Paper / Spatial Card */}
      <div className="passport-card">
        {/* Header Bar */}
        <div className="passport-header">
          <div>
            <div className="passport-brand-row">
              <span className="passport-dot" />
              <span className="passport-brand">CITYPATCH DRAFT PATCH PASSPORT</span>
            </div>
            <div className="passport-id-text">
              DRAFT PASSPORT ID: <strong>{passportId}</strong> &bull; FOR PROTOTYPE TRACKING ONLY
            </div>
          </div>

          {/* Action Buttons (Hidden on Print) */}
          <div className="passport-actions no-print">
            <button onClick={handlePrint} className="btn-passport-action" title="Print or save as PDF">
              <Printer size={15} />
              <span>PRINT / PDF</span>
            </button>
            <button onClick={handleDownloadJSON} className="btn-passport-action" title="Download raw passport JSON">
              <Download size={15} />
              <span>EXPORT JSON</span>
            </button>
          </div>
        </div>

        {/* City-As-Software Lifecycle Visualizer */}
        <div className="passport-lifecycle-box">
          <div className="lifecycle-title">CITY-AS-SOFTWARE LIFECYCLE STATUS</div>
          <div className="lifecycle-flow">
            {lifecycleSteps.map((step, idx) => (
              <div key={idx} className={`lifecycle-node ${step.completed ? 'node-done' : step.current ? 'node-current' : 'node-pending'}`}>
                <div className="node-marker">
                  {step.completed ? (
                    <CheckCircle2 size={16} className="text-teal" />
                  ) : (
                    <Circle size={16} className={step.current ? 'text-amber' : 'text-dim'} />
                  )}
                  {idx < lifecycleSteps.length - 1 && <div className="node-connector" />}
                </div>
                <div className="node-label">{step.label}</div>
                <div className="node-sub">{step.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* High-Level Status Meta Grid */}
        <div className="passport-status-grid">
          <div className="status-item">
            <span className="status-item-label">ENGINEER REVIEW STATUS</span>
            <span className="status-item-value text-amber font-mono">REQUIRED / PENDING</span>
          </div>

          <div className="status-item">
            <span className="status-item-label">DEPLOYMENT STATUS</span>
            <span className="status-item-value font-mono">NOT STARTED</span>
          </div>

          <div className="status-item">
            <span className="status-item-label">IMPACT VERIFICATION STATUS</span>
            <span className="status-item-value font-mono">NOT AVAILABLE — PATCH NOT DEPLOYED</span>
          </div>

          <div className="status-item">
            <span className="status-item-label">PHYSICAL QUANTITY STATUS</span>
            <span className="status-item-value font-mono">Pending Verified Site Measurements</span>
          </div>
        </div>

        {/* Scene Identification */}
        <div className="passport-section">
          <div className="passport-section-title">1. SCENE IDENTIFICATION &amp; EVIDENCE</div>
          <div className="passport-data-box">
            <div style={{ marginBottom: '0.6rem' }}>
              <span className="passport-field-name">CLASSIFICATION:</span>{' '}
              <strong style={{ color: 'var(--text-white)' }}>{humanize(diagnosis.scene_type)}</strong>
            </div>
            <div>
              <span className="passport-field-name">OBSERVATION SUMMARY:</span>{' '}
              <span>{diagnosis.scene_summary}</span>
            </div>
          </div>
        </div>

        {/* Detected Civic Problems */}
        <div className="passport-section">
          <div className="passport-section-title">2. DETECTED CIVIC PROBLEMS ({diagnosis.problems?.length || 0})</div>
          <div className="passport-problems-table-wrap">
            <table className="passport-table">
              <thead>
                <tr>
                  <th>Problem Type</th>
                  <th>Severity</th>
                  <th>Model Confidence</th>
                  <th>Visual Evidence</th>
                </tr>
              </thead>
              <tbody>
                {(diagnosis.problems || []).map((prob, i) => (
                  <tr key={i}>
                    <td><strong>{humanize(prob.type)}</strong></td>
                    <td>
                      <span className={`passport-sev-tag sev-${prob.severity?.toLowerCase()}`}>
                        {prob.severity?.toUpperCase()}
                      </span>
                    </td>
                    <td>{Math.round((prob.confidence || 0) * 100)}%</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{prob.evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Proposed Intervention Tier */}
        <div className="passport-section">
          <div className="passport-section-title">3. SELECTED INTERVENTION SPECIFICATIONS</div>
          <div className="passport-intervention-summary">
            <div className="intervention-col">
              <span className="passport-field-name">PROPOSED PACKAGE:</span>
              <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-white)' }}>
                {tierName}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                {selectedTier.description}
              </p>
            </div>

            <div className="intervention-col">
              <span className="passport-field-name">INDICATIVE COST RANGE:</span>
              <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent-teal)' }}>
                {costRange}
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Preliminary prototype estimate</span>
            </div>

            <div className="intervention-col">
              <span className="passport-field-name">INSTALLATION DURATION:</span>
              <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-white)' }}>
                {hoursRange}
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Excludes preliminary civil survey</span>
            </div>
          </div>

          <div style={{ marginTop: '0.85rem', paddingTop: '0.65rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="passport-field-name">COVERED CIVIC PROBLEMS:</span>
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {coveredProblems.map((prob, i) => (
                <span key={i} className="passport-mini-tag">{humanize(prob)}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Constituent Modular Components */}
        <div className="passport-section">
          <div className="passport-section-title">4. BOUNDED MODULE SPECIFICATIONS ({modules.length})</div>
          <div className="passport-problems-table-wrap">
            <table className="passport-table">
              <thead>
                <tr>
                  <th>Module ID</th>
                  <th>Component Name</th>
                  <th>Category</th>
                  <th>Solves Issues</th>
                  <th>Score</th>
                  <th>Engineering Gate</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((m) => (
                  <tr key={m.module_id}>
                    <td className="font-mono text-teal"><strong>{m.module_id}</strong></td>
                    <td><strong>{m.name}</strong></td>
                    <td>{humanize(m.category)}</td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                        {(m.matched_problems || []).map((p, idx) => (
                          <span key={idx} className="passport-mini-tag">{humanize(p)}</span>
                        ))}
                      </div>
                    </td>
                    <td>{m.score}</td>
                    <td>
                      {m.requires_engineer_review ? (
                        <span className="text-amber">Review Required</span>
                      ) : (
                        <span className="text-emerald">Standard Gate</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Site Reality & Required Before Physical Deployment */}
        <div className="passport-section">
          <div className="passport-section-title">5. VERIFICATION REQUIREMENTS BEFORE DEPLOYMENT</div>
          <div className="passport-reality-grid">
            <div className="passport-reality-box">
              <div className="reality-box-header text-amber">
                <AlertTriangle size={15} />
                <span>IDENTIFIED CONSTRAINTS</span>
              </div>
              {constraints.length > 0 ? (
                <ul className="passport-reality-list">
                  {constraints.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              ) : (
                <p className="text-muted" style={{ fontSize: '0.85rem' }}>No specific physical constraints flagged in photo.</p>
              )}
            </div>

            <div className="passport-reality-box">
              <div className="reality-box-header text-rose">
                <ShieldAlert size={15} />
                <span>MISSING INFORMATION (MANDATORY SURVEY)</span>
              </div>
              {missingInfo.length > 0 ? (
                <ul className="passport-reality-list">
                  {missingInfo.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              ) : (
                <p className="text-muted" style={{ fontSize: '0.85rem' }}>Standard site measurements required prior to construction.</p>
              )}
            </div>
          </div>
        </div>

        {/* Physical Material Quantity Notice */}
        <div className="passport-compliance-strip">
          <strong>QUANTITY NOTICE:</strong> Physical quantities require verified site measurements. Material occurrence classifications are prototype pre-screens and do not constitute procurement-ready bills.
        </div>

        {/* Mandatory Engineering Governance Footer */}
        <div className="passport-governance-footer">
          <div className="governance-headline">ENGINEER REVIEW REQUIRED</div>
          <p className="governance-body">
            This document represents a preliminary draft intervention proposal prepared by CITYPATCH. It is not an authorization for physical construction or civil alteration. Physical deployment requires site-specific review, structural dimension verification, and formal sign-off by a qualified civil engineer or municipal authority.
          </p>
          <div className="governance-stamp-row">
            <div>
              <span className="stamp-label">PROTOTYPE ENGINE:</span> CITYPATCH v0.1
            </div>
            <div>
              <span className="stamp-label">GENERATION TIMESTAMP:</span> {createdAt}
            </div>
            <div>
              <span className="stamp-label">STAGE GATE:</span> Gate 4 (Engineer Review Required)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
