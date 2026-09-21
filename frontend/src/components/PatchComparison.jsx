import React from 'react';
import { Check, Zap, Scale, BoxSelect, ArrowRight } from 'lucide-react';
import { formatCostRange, formatHoursRange, humanize } from '../api/citypatchApi';

export default function PatchComparison({
  patchTiers = {},
  tierSummaries = {},
  selectedTierKey = 'smart',
  onSelectTier,
  onPreparePassport,
}) {
  const tiers = [
    { key: 'quick', label: 'QUICK PATCH', desc: 'Focused, fast, low-complexity intervention' },
    { key: 'smart', label: 'SMART PATCH', desc: 'Balanced coverage, cost, and installation effort' },
    { key: 'full', label: 'FULL PATCH', desc: 'Comprehensive package with complementary modules' },
  ];

  return (
    <div className="tiers-container">
      <div className="section-header">
        <span className="section-tag">SOLUTION MATRIX</span>
        <h3 className="section-heading" style={{ fontSize: '2.5rem' }}>Intervention Tiers</h3>
        <p className="section-desc">
          Compare proposed intervention tiers composed deterministically from the Civic Patch Library.
        </p>
      </div>

      <div className="tiers-grid">
        {tiers.map((t) => {
          const tierKey = t.key;
          const tierData = patchTiers[tierKey] || {};
          const summaryData = tierSummaries[tierKey] || {};
          const isSelected = selectedTierKey === tierKey;

          const costText = formatCostRange(summaryData.estimated_cost_inr);
          const hoursText = formatHoursRange(summaryData.estimated_installation_hours);
          const moduleCount = summaryData.module_count ?? tierData.module_count ?? 0;
          const coveredProblems = tierData.covered_problems || [];

          return (
            <div
              key={tierKey}
              onClick={() => onSelectTier(tierKey)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectTier(tierKey)}
              className={`spatial-tier-card ${isSelected ? 'spatial-tier-selected' : ''}`}
            >
              <div>
                <span className="tier-badge-label">{tierData.name || t.label}</span>
                <h4 className="tier-name">{t.label}</h4>
                <p className="tier-desc">{t.desc}</p>

                {/* Price Display */}
                <div className="tier-price-box">
                  <div className="tier-price-label">INDICATIVE COST RANGE (INR)</div>
                  <div className="tier-price-value">{costText}</div>
                </div>

                {/* Stats Row */}
                <div className="tier-stats-row">
                  <div>
                    <span className="stat-label">INSTALL TIME</span>
                    <span className="stat-val">{hoursText}</span>
                  </div>
                  <div>
                    <span className="stat-label">UNITS</span>
                    <span className="stat-val">{moduleCount} Module{moduleCount === 1 ? '' : 's'}</span>
                  </div>
                </div>

                {/* Covered Issues Chips */}
                <div>
                  <span className="stat-label">COVERED ISSUES</span>
                  <div className="tier-issues-list">
                    {coveredProblems.map((issue, idx) => (
                      <span key={idx} className="tier-issue-chip">
                        {humanize(issue)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selection Status Footer */}
              <div className="tier-selection-indicator">
                <span>{isSelected ? 'SELECTED INTERVENTION' : 'SELECT TIER'}</span>
                {isSelected && <Check size={18} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Prepare Patch For Review Callout Banner */}
      <div className="prepare-passport-cta-box">
        <div>
          <div className="prepare-cta-title">
            PROPOSAL READY FOR GOVERNANCE REVIEW
          </div>
          <p className="prepare-cta-desc">
            Convert the selected <strong>{patchTiers[selectedTierKey]?.name || selectedTierKey.toUpperCase()}</strong> into an official Draft Patch Passport with complete evidence, module boundaries, and missing site criteria.
          </p>
        </div>

        <button onClick={onPreparePassport} className="btn-prepare-passport">
          <span>PREPARE PATCH FOR REVIEW</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
