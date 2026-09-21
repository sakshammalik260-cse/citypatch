import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Database } from 'lucide-react';
import { humanize } from '../api/citypatchApi';

export default function CandidateRanking({ candidates = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ranking-accordion">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ranking-header-btn"
        aria-expanded={isOpen}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <Database size={20} color="var(--accent-teal)" />
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700 }}>
              Why These Patches?
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Deterministic library candidate scoring audit ({candidates.length} modules evaluated)
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-teal)' }}>
          <span>{isOpen ? 'COLLAPSE' : 'EXPAND AUDIT'}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {isOpen && (
        <div className="ranking-content">
          <div className="ranking-statement">
            <strong>System Principle:</strong> Gemini identifies civic issues. CITYPATCH deterministically ranks permitted interventions from its bounded Civic Patch Library.
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Module</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Matched Problems</th>
                  <th>Score</th>
                  <th>Review</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((cand, idx) => (
                  <tr key={cand.module_id}>
                    <td style={{ color: 'var(--text-muted)' }}>#{idx + 1}</td>
                    <td style={{ fontWeight: 700, color: 'var(--accent-teal)' }}>{cand.module_id}</td>
                    <td style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-white)', fontWeight: 500 }}>{cand.name}</td>
                    <td>{humanize(cand.category)}</td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                        {(cand.matched_problems || []).map((p, pIdx) => (
                          <span key={pIdx} className="tier-issue-chip">
                            {humanize(p)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--text-white)' }}>{cand.score}</td>
                    <td>
                      {cand.requires_engineer_review ? (
                        <span style={{ color: 'var(--accent-amber)' }}>Required</span>
                      ) : (
                        <span style={{ color: 'var(--accent-emerald)' }}>Standard</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
