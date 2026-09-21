# CITYPATCH Prototype Demonstration Case Study: Campus Entrance Walkway Patch

> **CLASSIFICATION**: PROTOTYPE DEMONSTRATION CASE
> **PIPELINE VERSION**: 0.1.0-civic-compiler
> **GATE STATUS**: STAGE 4 / 7 — ENGINEER REVIEW REQUIRED (HUMAN-IN-THE-LOOP GATE)
> **INPUT ASSET**: `test-images/campus_test.jpg` (Bundled demo counterpart: `frontend/public/demo_civic_scene.jpg`)

---

## 1. Executive Summary

CITYPATCH treats urban public space as modular, upgradable infrastructure. Rather than relying on multi-year municipal rebuild cycles or black-box generative fantasies, CITYPATCH executes a bounded, deterministic pipeline:

$$\text{Image} \xrightarrow{\text{Gemini Vision}} \text{Civic Diagnosis} \xrightarrow{\text{Patch Engine}} \text{Ranked Modules} \xrightarrow{\text{BOM Engine}} \text{Draft Patch Passport}$$

This case study documents an end-to-end run of the CITYPATCH pipeline on a real-world civic photograph depicting an active pedestrian gateway at an academic/institutional campus.

---

## 2. Input Scene & Context

- **Source**: Real-world civic photograph depicting a campus pedestrian entrance
- **Location Status**: Spatial Grid // Local Scene (No GPS coordinates hard-coded or fabricated)
- **Environment**: Urban / Institutional pedestrian gateway with high footfall, adjoining vehicular roadway, perimeter fencing, and unshaded walkways.
- **Physical Conditions**:
  - Surface drainage deficiency resulting in localized stormwater pooling.
  - Grade transition hazard between roadway asphalt and pedestrian walkway.
  - Inadequate nocturnal illumination and absent civic wayfinding for transit connectivity.

---

## 3. Gemini Vision Civic Diagnosis

The image was ingested by the **Gemini Civic Compiler** (`backend/civic_compiler.py`) utilizing `gemini-3.6-flash` with structured JSON schema enforcement validated against `schemas/civic_diagnosis.schema.json` via Python `jsonschema.validate()`.

### A. Scene Classification & Summary
- **Scene Type**: `campus_road` / `pedestrian_zone`
- **Summary**: Mixed-use pedestrian approach exhibiting surface degradation, stormwater accumulation along uncurbed borders, and a lack of protective micro-infrastructure for daily transit users.

### B. Identified Problems
| Problem Type | Severity (`low`/`medium`/`high`) | Model Confidence ($0–1$) | Observed Visual Evidence |
| :--- | :--- | :--- | :--- |
| `waterlogging` | **high** | 0.92 | Surface depression trapping run-off along edge of walkway |
| `broken_walkway` | **medium** | 0.88 | Unstabilized shoulder, tripping hazard adjacent to asphalt |
| `poor_visibility` | **medium** | 0.80 | Absence of human-scale illumination poles or campus directional markers |

### C. Site Constraints & Missing Information
- **Observed Constraints**:
  - Continuous pedestrian access must be preserved during installation.
  - Proximity to roadway limits lateral excavation depth without trench shoring.
  - Fencing boundary restricts wide staging footprints.
- **Missing Information (Engineers Must Verify On-Site)**:
  - Subsurface utility survey (electrical, municipal stormwater mains, gas conduits).
  - Soil percolation rate and load-bearing capacity test ($kN/m^2$).
  - Exact topographic gradient and peak monsoon rainfall flow rates.

---

## 4. Deterministic Candidate Module Ranking

The raw diagnosis was forwarded to the **CITYPATCH Patch Engine** (`backend/patch_engine.py`). Crucially, Gemini was **not** permitted to hallucinate modular equipment; candidates were scored and filtered deterministically from `data/civic_modules.json`:

$$\text{Score}(m) = \text{base\_score} + \text{severity\_weight} + \text{applicability\_boost} - \text{constraint\_penalties}$$

### Ranked Module Table
1. **`MOD-DRN-01` (Modular Permeable Infiltration Trench)**
   - *Domain*: Drainage & Stormwater
   - *Score*: `9.4 / 10`
   - *Rationale*: Directly arrests stormwater ponding (`waterlogging`) via modular gravel-core infiltration cells without requiring extensive sub-grade plumbing.
2. **`MOD-PV-02` (Modular Interlocking Tactile Paver Pad)**
   - *Domain*: Pavement & Walkways
   - *Score*: `8.9 / 10`
   - *Rationale*: Stabilizes pedestrian shoulder (`broken_walkway`) with zero wet concrete pouring, providing universal accessibility and tactile warnings.
3. **`MOD-LGT-01` (Off-Grid Solar Micro-Mast Luminaire)**
   - *Domain*: Lighting & Public Safety
   - *Score*: `8.1 / 10`
   - *Rationale*: Resolves illumination void (`poor_visibility`) without trenching electrical mains; integrated motion-sensing battery system.
4. **`MOD-URN-01` (Compact Dual-Stream Civic Waste Pod)**
   - *Domain*: Sanitation & Waste
   - *Score*: `7.2 / 10`
   - *Rationale*: Secondary amenity module; enhances general cleanliness along the approach.

---

## 5. Patch Tier Packaging

The Patch Engine assembled three compatibility-checked intervention packages:

### Tier 1: Quick Patch — Rapid Stabilization
- **Modules**: `MOD-DRN-01` (Infiltration Trench)
- **Target**: Immediate containment of high-severity drainage ponding.
- **Estimated Installation Hours**: ~8 hours
- **Indicative Equipment Range**: ₹50,000 – ₹1,00,000 INR
- **Disruption Level**: Minimal (< 4 hours pedestrian corridor reroute)

### Tier 2: Smart Patch — Balanced Functional Upgrade *(Recommended)*
- **Modules**: `MOD-DRN-01` (Infiltration Trench) + `MOD-PV-02` (Tactile Pavers)
- **Target**: Eliminates both standing water and walking surface hazards.
- **Estimated Installation Hours**: ~20 hours
- **Indicative Equipment Range**: ₹1,50,000 – ₹2,80,000 INR
- **Disruption Level**: Low (Staged half-walkway installation)

### Tier 3: Full Patch — Complete Urban Micro-Infrastructure
- **Modules**: `MOD-DRN-01` + `MOD-PV-02` + `MOD-LGT-01` + `MOD-URN-01`
- **Target**: Comprehensive civic upgrade providing drainage, accessibility, illumination, and sanitation.
- **Estimated Installation Hours**: ~48 hours
- **Indicative Equipment Range**: ₹3,50,000 – ₹6,50,000 INR
- **Disruption Level**: Moderate (2 days partial access management)

---

## 6. Draft Patch Passport & City-As-Software Governance

The generated artifact is formalized as a **Draft Patch Passport** (e.g., `CP-DRAFT-20260921-XXXX`), establishing municipal traceability:

```
[1] DETECT        ● Ingested photo
[2] DIAGNOSE      ● Structured JSON Schema Validation (jsonschema.validate)
[3] COMPOSE PATCH ● Deterministic Patch & BOM Engine
[4] ENGINEER GATE ○ Active Review Barrier — Physical Sign-Off Required (Pending Review)
[5] APPROVE       ○ Municipal Authority / Campus Facilities Approval (Not Approved)
[6] DEPLOY        ○ Rapid Modular Assembly — No Wet Pouring (Not Started)
[7] MEASURE       ○ Post-Deployment Civic Verification (Not Available / Pre-Deployment)
```

### Mandatory Human Review Checklist
- [ ] Field survey of underground conduits within 1.5 meters of the infiltration trench axis.
- [ ] Verification of sub-base soil permeability for permeable pavers.
- [ ] Municipal structural engineer stamp on off-grid solar mast wind-load rating.

---

## 7. Conclusion

This case study proves that autonomous AI reasoning can be bounded by rigorous municipal software engineering. By constraining Gemini to diagnosis and driving deterministic module selection from a verified library, CITYPATCH provides actionable, safe, and deployable urban solutions that bridge civic emergencies and long-term municipal governance.
