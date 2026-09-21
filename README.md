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
2. **CITYPATCH Constrains**: Solutions are drawn exclusively from an immutable, bounded library of verified modular infrastructure components (`data/civic_modules.json`). Patch ranking, compatibility checks, and cost calculations are 100% deterministic code.
3. **Humans Approve**: All proposals culminate in a formal **Draft Patch Passport** held at **Gate 4 (Engineer Review)**. No physical work is authorized without professional engineering sign-off.

---

## 60-Second Judge Demo Flow

Experience the complete end-to-end pipeline in under a minute:

1. **Launch**: Start the backend (`uvicorn backend.api:app --port 8000`) and frontend (`npm run dev` on port 5173). Open `http://localhost:5173`.
2. **Inspect & Ingest**: Scroll to the **Civic Ingestion Workspace**. Drag and drop any civic photo, browse your files, or click **Load Demo Photo** to load the bundled portable scene (`frontend/public/demo_civic_scene.jpg`). Optionally enter context: *"Pedestrian gateway with surface pooling and tripping hazard"*.
3. **Compile**: Click **ANALYZE WITH CITYPATCH**. Watch the cinematic compilation radar analyze the scene in real time.
4. **Command Center Review**:
   - **Diagnosis & Scene Reality**: Inspect the AI-detected problems (with severity `'low' | 'medium' | 'high'` and confidence `0–1`), observed constraints, and required engineering site surveys.
   - **Patch Comparison**: Toggle between **Quick Patch** (immediate stabilization), **Smart Patch** (balanced upgrade), and **Full Patch** (complete infrastructure).
   - **Interactive 3D Spatial Canvas**: Rotate and zoom the modular 3D bounding boxes and coordinate grid to inspect spatial footprint.
   - **Deterministic Candidate Ranking**: View transparent scoring metrics and domain rationale.
5. **Generate Draft Patch Passport**: Click **Prepare Patch for Review**.
   - Review the 7-stage municipal lifecycle (`DETECT` ●, `DIAGNOSE` ●, `COMPOSE PATCH` ●, `ENGINEER REVIEW` ○, `APPROVE` ○, `DEPLOY` ○, `MEASURE` ○).
   - Click **Print / Save as PDF** to generate an engineer submittal document, or click **Export JSON** for GIS/municipal database ingestion.

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
- **Zero Hallucination Guardrails**: Gemini has zero authority to design physical hardware. Modules are selected exclusively from a verified catalog of pre-engineered, dry-assembly civic components (`data/civic_modules.json`).
- **Three-Tier Packaging**:
  - **Quick Patch**: Low-cost, minimal disruption, rapid deployment (< 8 hours).
  - **Smart Patch**: Optimal balance of cost, safety, and durability (Recommended).
  - **Full Patch**: Comprehensive upgrade addressing all primary and secondary civic deficiencies.
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
    "quick": { "total_cost_min": 600, "total_cost_max": 1200, "estimated_hours": 8 },
    "smart": { "total_cost_min": 1800, "total_cost_max": 3400, "estimated_hours": 20 },
    "full": { "total_cost_min": 4500, "total_cost_max": 8200, "estimated_hours": 48 }
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
│   └── civic_modules.json   # Bounded catalog of 12 verified physical modules
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