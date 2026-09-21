import React from 'react';
import { ShieldCheck, ShieldAlert, FileText } from 'lucide-react';
import { formatCostRange, formatHoursRange, humanize } from '../api/citypatchApi';

export default function PatchDetail({ selectedTier, summary, tierName }) {
  if (!selectedTier) return null;

  const modules = selectedTier.modules || [];
  const costRange = formatCostRange(summary?.estimated_cost_inr);
  const hoursRange = formatHoursRange(summary?.estimated_installation_hours);

  return (
    <div className="patch-detail-card">
      <div className="detail-header">
        <div>
          <span className="section-tag">TIER COMPOSITION</span>
          <h3 className="section-heading" style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>
            {tierName} Specifications
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            {selectedTier.description}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>
              TOTAL ESTIMATE
            </span>
            <span style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent-teal)' }}>
              {costRange}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>
              INSTALLATION DURATION
            </span>
            <span style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-white)' }}>
              {hoursRange}
            </span>
          </div>
        </div>
      </div>

      {/* Constituent Modules */}
      <div className="modules-list-grid">
        {modules.map((mod) => (
          <div key={mod.module_id} className="module-card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="module-code">{mod.module_id}</span>
                <span className="module-category">{humanize(mod.category)}</span>
              </div>

              <h4 className="module-title">{mod.name}</h4>

              <div style={{ marginTop: '1rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.4rem' }}>
                  MATCHED CIVIC PROBLEMS
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {(mod.matched_problems || []).map((prob, i) => (
                    <span key={i} className="tier-issue-chip">
                      {humanize(prob)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="module-meta-row">
              <span style={{ color: 'var(--accent-teal)' }}>Score: {mod.score}</span>
              {mod.requires_engineer_review ? (
                <span style={{ color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <ShieldAlert size={14} />
                  <span>Review Required</span>
                </span>
              ) : (
                <span style={{ color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <ShieldCheck size={14} />
                  <span>Standard Review</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Compliance Notice: No Fabricated Materials */}
      <div className="compliance-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
          <FileText size={16} color="var(--accent-teal)" />
          <strong>BILL OF MATERIALS NOTICE</strong>
        </div>
        <p>
          Detailed material quantities require a future verified site/BOM stage.
        </p>
        <p style={{ marginTop: '0.35rem', color: 'var(--text-dim)' }}>
          Summary: {summary?.unique_material_count ?? 0} material classifications prescreened &bull; Status: {summary?.quantity_status === 'not_calculated' ? 'Pending site survey' : (summary?.quantity_status || 'Pending')}
        </p>
      </div>
    </div>
  );
}
