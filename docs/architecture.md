# CITYPATCH System Architecture

## 1. System Overview

**CITYPATCH** is an AI-orchestrated, bounded civic infrastructure compilation engine that conceptualizes the physical city as modular, version-controlled software:

$$\text{Physical Public Space} \equiv \text{Deployable Urban Runtime}$$

$$\text{Civic Maintenance Issue} \equiv \text{Physical Bug}$$

$$\text{Modular Infrastructure} \equiv \text{Deployable Civic Patch}$$

### The Core Architectural Axiom
$$\begin{array}{rcc}
\textbf{AI (Gemini Vision Compiler)} & \longrightarrow & \text{Understands the real-world scene \& problem} \\
\textbf{CITYPATCH Engine} & \longrightarrow & \text{Constrains solutions to verified modular hardware} \\
\textbf{Human Municipal Engineers} & \longrightarrow & \text{Review, approve, and authorize physical ground installation}
\end{array}$$

---

## 2. End-to-End Pipeline

```
[ Real Civic Photo (JPEG/PNG/WebP) + Optional Context ]
                         │
                         ▼
             [ FastAPI: POST /analyze ]
                         │
                         ▼
        ┌───────────────────────────────────┐
        │       Gemini Civic Compiler       │
        │      (gemini-3.6-flash)           │
        │ schemas/civic_diagnosis.schema.json
        │     local jsonschema.validate()   │
        └───────────────────────────────────┘
                         │
                         ▼
              [ Structured Diagnosis ]
        • Scene Classification & Summary
        • Standardized Civic Problems (Severity: low/med/high & Confidence: 0–1)
        • Environmental Conditions & Obstacles
        • Inherent Constraints & Missing Site Information
                         │
                         ▼
        ┌───────────────────────────────────┐
        │       CITYPATCH Patch Engine      │
        │   Deterministic Problem Matching  │
        │       data/civic_modules.json     │
        │   Compatibility & Disruption Check│
        └───────────────────────────────────┘
                         │
                         ▼
              [ Ranked Module Tiers ]
        • Quick Patch: Rapid low-disruption intervention
        • Smart Patch: Balanced high-impact package (Recommended)
        • Full Patch: Comprehensive multi-module upgrade
                         │
                         ▼
        ┌───────────────────────────────────┐
        │       CITYPATCH BOM Engine        │
        │    Deterministic Cost Aggregation │
        │    Estimated Installation Hours   │
        └───────────────────────────────────┘
                         │
                         ▼
        ┌───────────────────────────────────┐
        │    Draft Patch Passport Stage     │
        │     7-Stage Municipal Lifecycle   │
        │    Gate 4: Mandatory Engineer OK  │
        └───────────────────────────────────┘
                         │
                         ▼
      [ Apple Spatial / Architectural Frontend ]
      • Interactive WebGL 3D Spatial Visualizer
      • Zero-Failure 2D Fallback
      • High-Contrast Print / PDF Passport Export
```

---

## 3. Component Deep Dive

### 3.1 Input & Ingestion Layer
- **Transport**: `multipart/form-data` with streaming byte validation.
- **Constraints**: Enforces MIME types (`image/jpeg`, `image/png`, `image/webp`) and size limits (< 10 MB).
- **Location Integrity**: Operates strictly on visual scene reality. Never infers, fabricates, or outputs fake GPS coordinates.

### 3.2 Gemini Civic Compiler (`backend/civic_compiler.py`)
- **Engine**: Google GenAI SDK (`gemini-3.6-flash`).
- **Schema Validation**: Gemini responses are constrained to structured JSON and validated against `schemas/civic_diagnosis.schema.json` using Python's `jsonschema.validate()`:
  - `scene_type` (e.g. `campus_road`, `pedestrian_zone`, `footpath`, `public_space`)
  - `scene_summary` (concise descriptive analysis)
  - `problems` (array of detected problems with normalized `type`, `severity` (`"low"`, `"medium"`, or `"high"`), `confidence` ($0.0 \dots 1.0$), and `evidence`)
  - `constraints` (physical installation obstacles observed)
  - `missing_information` (site surveys required before construction)

### 3.3 Bounded Civic Patch Library (`data/civic_modules.json`)
The library serves as the immutable vocabulary of authorized physical modules. LLMs are prohibited from hallucinating arbitrary physical objects. Each module defines:
- Unique ID (`MOD-xxx`)
- Domain category (`pedestrian_safety`, `drainage`, `lighting`, `accessibility`, etc.)
- Solved problem keys
- Installation complexity and installation hours requirements
- Physical clearance requirements
- Incompatibilities and dependency modules

### 3.4 Deterministic Patch Engine (`backend/patch_engine.py`)
Ranks and selects candidate modules via deterministic heuristics:
$$\text{Module Score} = w_{\text{sev}} \cdot S_{\text{problem}} + w_{\text{conf}} \cdot C_{\text{problem}} + \text{DomainBoost} - \text{Penalty}_{\text{conflict}}$$
Packages candidates into three distinct tiers:
1. **Quick Patch**: Top 1-2 modules with lowest installation time and minimal street disruption.
2. **Smart Patch**: Optimal balance of problem coverage, cost efficiency, and co-benefit synergies.
3. **Full Patch**: Comprehensive remediation including primary modules, accessibility add-ons, and public amenities.

### 3.5 Bill of Materials (BOM) Engine (`backend/bom_engine.py`)
Computes indicative cost bounds and estimated installation hours deterministically from verified catalog ranges.
*Compliance Rule*: Does not fabricate granular physical material bills (rebar tons, concrete volumes) from a single 2D photo; explicitly flags that physical BOM quantities require verified on-site dimensional measurements.

### 3.6 Draft Patch Passport & Municipal Lifecycle
A core architectural feature bridging rapid AI discovery with formal municipal engineering:
1. **`DETECT`** ● Photo ingested & visual evidence isolated.
2. **`DIAGNOSE`** ● Machine analysis structured into normalized civic problem types.
3. **`COMPOSE PATCH`** ● Deterministic module matching & BOM calculations.
4. **`ENGINEER REVIEW`** ○ **Mandatory Human Gate**: Municipal / Structural engineer review (Pending Review).
5. **`APPROVE`** ○ Municipal capital allocation and permitting (Not Approved).
6. **`DEPLOY`** ○ Rapid, dry-assembly field installation (Not Started).
7. **`MEASURE`** ○ Sensor and citizen feedback loop post-deployment (Not Available / Pre-Deployment).

### 3.7 Frontend Presentation Architecture (`frontend/src/`)
- **Visual Design**: Apple Spatial / Nothing OS / Architectural aesthetic using a custom CSS variable design system (`src/styles/index.css`).
- **3D Spatial Visualizer (`src/3d/CityScene.jsx`)**: React Three Fiber + Drei spatial canvas with interactive orbit controls, modular bounding boxes, architectural coordinate grid, and tier-specific lighting.
- **Fail-Safe 2D Fallback (`src/3d/ErrorBoundary3D.jsx`)**: Renders an architectural blueprint schematic if WebGL encounters hardware acceleration limits or is disabled.
- **Export Engine**: In-browser clean JSON serialization and print-optimized CSS (`@media print`) for instant physical/PDF municipal engineering submittals.

---

## 4. API Specification

### `GET /health`
- **Response**: `{"status": "ok", "timestamp": "...", "version": "0.1.0-civic-compiler"}`

### `POST /analyze`
- **Request**: `multipart/form-data`
  - `image`: Image file (required)
  - `user_context`: String (optional)
- **Response**:
```json
{
  "pipeline_version": "0.1.0-civic-compiler",
  "status": "success",
  "diagnosis": {
    "scene_type": "campus_road",
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
    "quick": { "name": "Quick Patch", "modules": [...], "rationale": "..." },
    "smart": { "name": "Smart Patch", "modules": [...], "rationale": "..." },
    "full": { "name": "Full Patch", "modules": [...], "rationale": "..." }
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

## 5. Security, Safety, and Compliance Guarantees

1. **No Data Fabrication**: Never invents fake GPS coordinates, precise metric dimensions, or unverified structural loads.
2. **Deterministic Boundaries**: Generative models are isolated to vision interpretation; module selection and arithmetic remain 100% deterministic code.
3. **Fail-Safe Architectural Decoupling**: Frontend maintains complete usability if 3D WebGL fails or is toggled off.
4. **Mandatory Human Review**: Every patch proposal is explicitly watermarked as a concept draft requiring licensed professional engineer sign-off.