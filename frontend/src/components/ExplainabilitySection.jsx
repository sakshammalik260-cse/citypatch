import React from 'react';
import { Eye, Cpu, Database, UserCheck, ArrowDown, ArrowRight } from 'lucide-react';

export default function ExplainabilitySection() {
  return (
    <section className="explainability-card" aria-label="Why CITYPATCH is Not Just an AI Response">
      <div className="explainability-header">
        <span className="section-tag">CORE ARCHITECTURAL PRINCIPLE</span>
        <h3 className="explainability-title">WHY CITYPATCH IS NOT JUST AN AI RESPONSE</h3>
        <p className="explainability-quote">
          &ldquo;Gemini identifies civic conditions. It cannot create arbitrary infrastructure modules. CITYPATCH selects only from a bounded, deterministic Civic Patch Library.&rdquo;
        </p>
      </div>

      <div className="explainability-pipeline-grid">
        {/* Stage 1: Multimodal Perception */}
        <div className="explain-node">
          <div className="node-icon-wrap icon-ai">
            <Eye size={20} />
          </div>
          <div className="node-badge">PERCEPTION</div>
          <h4 className="node-name">GEMINI VISION</h4>
          <p className="node-desc">
            Interprets the civic scene and outputs schema-validated diagnosis.
          </p>
          <div className="node-output-pill">Schema-Validated Diagnosis</div>
        </div>

        <div className="explain-arrow">
          <ArrowRight size={18} className="arrow-h" />
          <ArrowDown size={18} className="arrow-v" />
        </div>

        {/* Stage 2: Deterministic Engine */}
        <div className="explain-node">
          <div className="node-icon-wrap icon-engine">
            <Cpu size={20} />
          </div>
          <div className="node-badge">CONSTRAINTS</div>
          <h4 className="node-name">CITYPATCH ENGINE</h4>
          <p className="node-desc">
            Deterministically maps diagnosed problems to a bounded civic module library.
          </p>
          <div className="node-output-pill">Deterministic Mapping</div>
        </div>

        <div className="explain-arrow">
          <ArrowRight size={18} className="arrow-h" />
          <ArrowDown size={18} className="arrow-v" />
        </div>

        {/* Stage 3: Bounded Catalog */}
        <div className="explain-node">
          <div className="node-icon-wrap icon-library">
            <Database size={20} />
          </div>
          <div className="node-badge">VOCABULARY</div>
          <h4 className="node-name">PATCH LIBRARY</h4>
          <p className="node-desc">
            Bounded catalogue of 12 prototype civic intervention modules with indicative cost and installation ranges.
          </p>
          <div className="node-output-pill">12 Prototype Modules</div>
        </div>

        <div className="explain-arrow">
          <ArrowRight size={18} className="arrow-h" />
          <ArrowDown size={18} className="arrow-v" />
        </div>

        {/* Stage 4: Human Authority */}
        <div className="explain-node">
          <div className="node-icon-wrap icon-human">
            <UserCheck size={20} />
          </div>
          <div className="node-badge">PHYSICAL GATE</div>
          <h4 className="node-name">CIVIL ENGINEER</h4>
          <p className="node-desc">
            Reviews site-specific feasibility and safety before physical deployment.
          </p>
          <div className="node-output-pill">Gate 4 Human Review</div>
        </div>
      </div>
    </section>
  );
}

