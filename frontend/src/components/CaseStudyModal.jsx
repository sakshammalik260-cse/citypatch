import React from 'react';
import { X, FileText, ExternalLink, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function CaseStudyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="case-study-backdrop" role="dialog" aria-modal="true" aria-labelledby="case-study-title">
      <div className="case-study-dialog">
        <div className="case-study-modal-header">
          <div>
            <span className="section-tag" style={{ color: 'var(--accent-teal)' }}>ARCHIVED PROTOTYPE VALIDATION</span>
            <h3 id="case-study-title" className="case-study-modal-title">
              PREVIOUSLY DOCUMENTED PROTOTYPE CASE: Campus Entrance Walkway
            </h3>
            <p className="case-study-modal-subtitle">
              Verified end-to-end execution of the CITYPATCH pipeline from <code>case-studies/campus_entrance_patch.md</code>.
            </p>
          </div>
          <button onClick={onClose} className="btn-close-modal" aria-label="Close Case Study Dialog">
            <X size={20} />
          </button>
        </div>

        <div className="case-study-body">
          <div className="case-provenance-banner">
            <ShieldAlert size={16} className="text-amber" />
            <span>
              <strong>PROVENANCE NOTICE:</strong> This is an archived demonstration case from an earlier verified execution. It is displayed for judge review when upstream Gemini API capacity limits are active.
            </span>
          </div>

          <div className="case-study-sections">
            {/* 1. Input Scene */}
            <div className="case-section-block">
              <h4>1. INPUT SCENE &amp; PHYSICAL DEFECTS</h4>
              <p>
                Mixed-use pedestrian gateway at campus approach. High footfall, adjoining vehicular roadway, uncurbed edge, and unmanaged stormwater pooling along walking shoulder.
              </p>
            </div>

            {/* 2. Gemini Diagnosis */}
            <div className="case-section-block">
              <h4>2. GEMINI CIVIC DIAGNOSIS (STRUCTURED JSON SCHEMA)</h4>
              <div className="passport-problems-table-wrap">
                <table className="passport-table">
                  <thead>
                    <tr>
                      <th>Detected Issue</th>
                      <th>Severity</th>
                      <th>Model Confidence</th>
                      <th>Visual Evidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>broken_walkway</strong></td>
                      <td><span className="passport-sev-tag sev-medium">MEDIUM</span></td>
                      <td>95%</td>
                      <td>Cracked and eroded concrete paving along the pedestrian surface exposing loose soil</td>
                    </tr>
                    <tr>
                      <td><strong>accessibility_barrier</strong></td>
                      <td><span className="passport-sev-tag sev-medium">MEDIUM</span></td>
                      <td>88%</td>
                      <td>Uneven step-downs, broken paving edges, and exposed flexible pipes create tripping hazards</td>
                    </tr>
                    <tr>
                      <td><strong>poor_drainage</strong></td>
                      <td><span className="passport-sev-tag sev-medium">MEDIUM</span></td>
                      <td>82%</td>
                      <td>Kerbside drain gutter partially filled with accumulated debris and loose wiring</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Deterministic Modules & Tiers */}
            <div className="case-section-block">
              <h4>3. DETERMINISTIC CANDIDATE MODULES &amp; PACKAGES</h4>
              <div className="case-tiers-grid">
                <div className="case-tier-card">
                  <div className="tier-badge">QUICK PATCH</div>
                  <div className="tier-name">Rapid Stabilization</div>
                  <p className="tier-desc">Focused remediation of the primary pedestrian tripping hazard.</p>
                  <div className="tier-modules font-mono">CP006 (Accessible Walkway Module)</div>
                  <div className="tier-meta">6–20 hrs &bull; ₹20,000 – ₹70,000 INR</div>
                </div>

                <div className="case-tier-card tier-recommended">
                  <div className="tier-badge text-teal">SMART PATCH (RECOMMENDED)</div>
                  <div className="tier-name">Balanced Functional Upgrade</div>
                  <p className="tier-desc">Restores walkable surface and improves surface water permeability.</p>
                  <div className="tier-modules font-mono">CP006 (Accessible Walkway) + CP010 (Permeable Paver Module)</div>
                  <div className="tier-meta">12–40 hrs &bull; ₹35,000 – ₹1,30,000 INR</div>
                </div>

                <div className="case-tier-card">
                  <div className="tier-badge">FULL PATCH</div>
                  <div className="tier-name">Complete Micro-Infrastructure</div>
                  <p className="tier-desc">Comprehensive package adding dedicated surface runoff drainage channel.</p>
                  <div className="tier-modules font-mono">CP006 + CP010 + CP012 (Surface Drainage Channel)</div>
                  <div className="tier-meta">16–56 hrs &bull; ₹45,000 – ₹1,80,000 INR</div>
                </div>
              </div>
            </div>

            {/* 4. Missing Information & Human Gate */}
            <div className="case-section-block">
              <h4>4. REQUIRED BEFORE CONSTRUCTION (HUMAN-IN-THE-LOOP GATE)</h4>
              <ul className="passport-reality-list">
                <li>Civil / municipal engineer review and site authorization sign-off.</li>
                <li>Physical site survey and exact measurements to calculate material quantities.</li>
                <li>Verification of existing drainage outlet connectivity before installation.</li>
              </ul>
            </div>
          </div>

          <div className="case-study-footer-disclaimer">
            <em>No physical deployment has occurred. No construction quantities have been calculated. This case demonstrates the CITYPATCH decision pipeline only.</em>
          </div>
        </div>
      </div>
    </div>
  );
}

