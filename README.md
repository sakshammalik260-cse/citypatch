# CITYPATCH: Physical Urban Patch Engine

> *"What if a city could update itself like software?"*

**CITYPATCH** is an AI-orchestrated, bounded civic infrastructure compilation engine. It transforms raw photographs of urban public spaces into structured, deterministic, and engineer-reviewable physical micro-infrastructure proposals.

---

## The Core Philosophy

Traditional civic maintenance is broken: bureaucratic delays, multi-year procurement cycles, and arbitrary planning lead to decaying public spaces. Conversely, unconstrained generative AI creates physically impossible architectural fantasies with hallucinated materials and unverified physics.

CITYPATCH bridges this divide with a strict architectural axiom:

$$\begin{array}{rcc}
\textbf{AI (Gemini Vision)} & \longrightarrow & \textbf{Understands the Problem} \\
\textbf{CITYPATCH Engine} & \longrightarrow & \textbf{Constrains the Solution} \\
\textbf{Municipal Engineers} & \longrightarrow & \textbf{Approves Physical Deployment}
\end{array}$$

1. **AI Understands**: Google Gemini Vision (`gemini-3.6-flash`) analyzes real-world photographs to detect civic failures, environmental factors, and site constraints, structured and validated against `schemas/civic_diagnosis.schema.json` using `jsonschema.validate()`.
2. **CITYPATCH Constrains**: Solutions are drawn exclusively from a bounded prototype library of 12 civic intervention modules (`data/civic_modules.json`). Patch ranking, compatibility checks, and cost calculations are 100% deterministic code.
3. **Humans Approve**: All proposals culminate in a formal **Draft Patch Passport** held at **Gate 4 (Engineer Review)**. No physical work is authorized without professional engineering sign-off.

## Why CITYPATCH is Different

Most AI systems stop at text suggestions or unconstrained image generation with physically impossible hallucinations.

CITYPATCH fundamentally separates:
1. **PERCEPTION (Gemini Vision Compiler)**: Multimodal scene diagnosis, defect classification, severity/confidence scoring, and site constraint identification.
2. **DECISION CONSTRAINTS (Deterministic Patch Engine)**: Algorithmic mapping exclusively into a bounded catalogue of 12 prototype civic intervention modules (`data/civic_modules.json`), compatibility graphs, and cost/labor ranges. Zero generative hallucinations.
3. **PHYSICAL AUTHORITY (Civil Engineer Gate)**: Formal municipal traceability via the Draft Patch Passport. Deployment is held at Gate 4 requiring professional civil engineering review.

---

## 90-Second Demo

Follow these exact steps for an efficient evaluation:
1. Open `http://localhost:5173` and click **JUDGE DEMO** in the header navigation to activate guided flow.
2. Click **Load Demo Photo** in the scanner dropzone (or upload your own street/pavement photo).
3. Click **ANALYZE WITH CITYPATCH** to compile the real scene through the pipeline.
4. Review the structured diagnosis and observe the **"Why CITYPATCH is Not Just an AI Response"** architectural pipeline.
5. Review the **Bounded Civic Patch Library** showing the 12 prototype civic intervention modules.
6. Toggle between **Quick Patch**, **Smart Patch** (recommended), and **Full Patch**; inspect the deterministic explainability table.
7. Click **Prepare Patch for Review** to generate the **Draft Patch Passport**.
8. Inspect the **Site Readiness** panel (showing computational prerequisites vs. pending physical site surveys) and click **Print / PDF** to view the clean municipal engineering submittal.

---

## Current Scope vs. Future Roadmap

| Capability | Current MVP Status | Future Municipal Phase |
| :--- | :--- | :--- |
| **Scene Perception** | **OPERATIONAL**: Real photo analysis via Gemini Vision | Multi-angle drone / lidar point-cloud scans |
| **Defect Classification** | **OPERATIONAL**: Strict JSON Schema validation (`schemas/civic_diagnosis.schema.json`) | Real-time municipal 311 service integration |
| **Module Selection** | **OPERATIONAL**: Deterministic scoring from bounded 12-module library | Dynamic contractor inventory & regional supply chain |
| **Intervention Packaging**| **OPERATIONAL**: Compatibility-checked Quick / Smart / Full tiers | Automated municipal bid & RFP generation |
| **Cost & Time Estimates** | **OPERATIONAL**: Catalog range aggregates (`data/civic_modules.json`) | Construction-ready dimensional bills of quantities |
| **Site Authorization** | **OPERATIONAL**: Draft Patch Passport at Gate 4 (Engineer Gate) | Digital municipal stamping & permitting workflow |
| **Ground Deployment** | **PENDING**: Prototype demonstration only (No physical works) | Tactical urbanist dry-assembly field installation |
| **Civic Verification** | **PENDING**: Post-deployment sensors & resident feedback loop | Long-term IoT sensor monitoring & drainage metrics |

---

## System Architecture

```
[ Real Civic Photo (JPEG/PNG/WebP) ]
                 │
                 ▼
     [ FastAPI: POST /analyze ]
                 │
                 ▼
┌──────────────────────────────────┐
│      Gemini Civic Compiler       │  Multimodal scene understanding
│     (gemini-3.6-flash)           │  Strict JSON schema validation
│ schemas/civic_diagnosis.schema.json
└──────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────┐
│      CITYPATCH Patch Engine      │  Deterministic problem-to-module mapping
│     data/civic_modules.json      │  Zero hallucinated equipment
│      Compatibility Validation    │
└──────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────┐
│      CITYPATCH BOM Engine        │  Deterministic installation hours calculation
│     Cost Bounds & Labor Hours    │  Indicative catalog cost aggregation
└──────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────┐
│    Draft Patch Passport Stage    │  Formal municipal artifact
│    Gate 4: Mandatory Human OK    │  Traceable ID & lifecycle tracking
└──────────────────────────────────┘
                 │
                 ▼
[ Apple Spatial / Architectural UI ]  React 18 + Three.js + WebGL 3D
                                      + 2D Blueprint Fallback
```

---

## Key Capabilities

- **Strict Schema Enforcement**: Ingested photographs are validated against `schemas/civic_diagnosis.schema.json` into normalized civic problem types (`unsafe_crossing`, `waterlogging`, `broken_walkway`, `poor_visibility`, etc.) with discrete severity levels (`'low' | 'medium' | 'high'`) and numeric confidence (`0–1`).
- **Zero Hallucination Guardrails**: Gemini has zero authority to design physical hardware. Modules are selected exclusively from a bounded prototype library of 12 civic intervention modules (`data/civic_modules.json`).
- **Three-Tier Packaging (from `data/patch_tiers.json`)**:
  - **Quick Patch**: Single module focused on highest-priority civic issue (max 1 module).
  - **Smart Patch**: Balanced intervention addressing multiple related issues (max 2 modules, recommended).
  - **Full Patch**: Broader intervention combining multiple compatible modules (max 3 modules).
- **Draft Patch Passport (`CP-DRAFT-YYYYMMDD-XXXX`)**: A formal municipal audit trail establishing accountability, site constraints, missing information surveys, and life-cycle progress.
- **Spatial 3D & Graceful 2D Fallback**: Real-time WebGL 3D spatial visualizer with an automatic zero-failure 2D blueprint fallback if WebGL is unavailable.
- **Complete Data Integrity**: Zero fabricated GPS coordinates, zero made-up material quantities (rebar tons, concrete volumes). Explicit disclaimers on every engineering surface.

---

## Tech Stack

### Backend
- **Language**: Python 3.10+
- **Framework**: FastAPI + Uvicorn (ASGI)
- **AI / Multimodal**: Google GenAI SDK (`gemini-3.6-flash`)
- **Data Validation**: `jsonschema` (Draft 2020-12)
- **Testing**: Python standard `unittest` (deterministic test suite)

### Frontend
- **Framework**: React 18 + Vite
- **3D Spatial Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Animation**: GSAP (GreenSock Animation Platform)
- **Icons & Visuals**: Lucide React
- **Styling**: Apple Spatial / Architectural bespoke CSS system (`src/styles/index.css`) with print-optimized stylesheet

---

## Quickstart & Local Installation

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm
- Google Gemini API Key ([Google AI Studio](https://aistudio.google.com/))

### 1. Backend Setup

```bash
# Navigate to project root
cd citypatch

# Create and activate virtual environment
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
# Copy template and add your GEMINI_API_KEY
cp .env.example .env
# Edit .env and set: GEMINI_API_KEY=your_actual_key_here

# Run backend test suite (9 deterministic tests)
python -m unittest tests/test_citypatch.py

# Start FastAPI server on port 8000
uvicorn backend.api:app --host 127.0.0.1 --port 8000 --reload
```

Verify backend health at: `http://127.0.0.1:8000/health`

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to frontend/
cd citypatch/frontend

# Install dependencies
npm install

# Start Vite development server (with proxy to port 8000)
npm run dev
```

Open your browser at: `http://localhost:5173`

---

## API Contract

### `GET /health`
Verifies backend service availability and pipeline status.
```json
{
  "status": "ok",
  "timestamp": "2026-09-21T08:55:00Z",
  "version": "0.1.0-civic-compiler"
}
```

### `POST /analyze`
Ingests an urban photograph and outputs structured diagnosis, ranked modules, patch tiers, and BOM summaries.

- **Request**: `multipart/form-data`
  - `image`: Image file (`image/jpeg`, `image/png`, `image/webp` — max 10MB)
  - `user_context`: Optional text string
- **Response**:
```json
{
  "pipeline_version": "0.1.0-civic-compiler",
  "status": "success",
  "diagnosis": {
    "scene_type": "institutional_gateway",
    "scene_summary": "Pedestrian approach with drainage failure and shoulder tripping hazards.",
    "problems": [
      {
        "type": "waterlogging",
        "severity": "high",
        "confidence": 0.92,
        "evidence": "Water pooled along uncurbed asphalt boundary."
      }
    ],
    "constraints": ["Maintain active pedestrian corridor during installation"],
    "missing_information": ["Sub-surface utility survey", "Soil percolation rate"]
  },
  "candidate_modules": [...],
  "patch_tiers": {
    "quick": { "name": "Quick Patch", "modules": [...] },
    "smart": { "name": "Smart Patch", "modules": [...] },
    "full": { "name": "Full Patch", "modules": [...] }
  },
  "tier_summary": {
    "quick": {
      "estimated_cost_inr": { "min": 20000, "max": 70000 },
      "estimated_installation_hours": { "min": 6, "max": 20 }
    },
    "smart": {
      "estimated_cost_inr": { "min": 35000, "max": 130000 },
      "estimated_installation_hours": { "min": 12, "max": 40 }
    },
    "full": {
      "estimated_cost_inr": { "min": 45000, "max": 180000 },
      "estimated_installation_hours": { "min": 16, "max": 56 }
    }
  },
  "requires_human_review": true,
  "disclaimer": "Proposals generated by CITYPATCH are concept designs requiring licensed professional engineer review."
}
```

---

## Project Structure

```
citypatch/
├── backend/                  # Working Python civic engine
│   ├── api.py               # FastAPI router (GET /health, POST /analyze)
│   ├── civic_compiler.py    # Gemini Vision multimodal parser & JSON Schema validation
│   ├── patch_engine.py      # Deterministic problem-to-module mapping & ranking
│   ├── bom_engine.py        # Labor & cost aggregation engine
│   └── pipeline.py          # Unified pipeline orchestration
├── data/
│   └── civic_modules.json   # Bounded catalog of 12 prototype civic intervention modules
├── schemas/
│   └── civic_diagnosis.schema.json # JSON Schema (Draft 2020-12) for Gemini output
├── case-studies/            # Verified prototype demonstration case studies
│   └── campus_entrance_patch.md
├── docs/
│   └── architecture.md      # Comprehensive technical architecture
├── tests/
│   └── test_citypatch.py    # 9 unit tests for scoring, tiers, and BOM
├── frontend/                # Apple Spatial / Architectural React 18 Application
│   ├── public/              # Bundled portable demo assets (demo_civic_scene.jpg)
│   ├── src/
│   │   ├── 3d/              # React Three Fiber spatial visualizer & 2D fallback
│   │   ├── components/      # UI components (Passport, Comparison, Ranking, etc.)
│   │   ├── services/        # API client with Vite proxy integration
│   │   ├── styles/          # Custom CSS design system & print stylesheet
│   │   └── App.jsx          # Main application orchestration
│   ├── index.html
│   └── vite.config.js       # Vite build & proxy configuration
└── README.md
```

---

## Prototype Case Study

A complete end-to-end case study evaluating a campus pedestrian gateway is available in [`case-studies/campus_entrance_patch.md`](case-studies/campus_entrance_patch.md).

It documents the transition from photographic evidence $\to$ Gemini diagnosis $\to$ candidate ranking $\to$ Quick/Smart/Full tier selection $\to$ Draft Patch Passport generation.

---

## License & Ethics

CITYPATCH is built for civic resilience, accessibility, and public safety. All proposals produced by CITYPATCH are concept prototypes designed to assist—not replace—licensed municipal civil and structural engineers.