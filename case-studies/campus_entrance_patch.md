# CITYPATCH Prototype Demonstration Case: Campus Entrance Walkway Patch

> **CLASSIFICATION**: PROTOTYPE DEMONSTRATION CASE
> **PIPELINE VERSION**: 0.1.0-civic-compiler
> **GATE STATUS**: STAGE 4 / 7 — ENGINEER REVIEW REQUIRED (HUMAN-IN-THE-LOOP GATE)
> **INPUT ASSET**: `tests/campus_diagnosis.json` (evaluated with `test-images/campus_test.jpg`)

---

## 1. Input Scene
- **Visual Environment**: Roadside footpath edge adjacent to an elevated planter wall at an institutional entrance.
- **Physical Deficiencies Observed**:
  - Cracked and eroded concrete paving along the pedestrian surface exposing loose soil and dry leaves.
  - Uneven step-downs, broken paving edges, and exposed flexible pipes lying across ground level creating tripping hazards.
  - Kerbside concrete drain gutter partially filled with accumulated leaf debris, dirt, and loose wiring.
- **Location Status**: `SPATIAL GRID // LOCAL SCENE` — No GPS coordinates are hard-coded or fabricated.

---

## 2. Civic Diagnosis
Ingested by the **Gemini Civic Compiler** (`backend/civic_compiler.py`) utilizing `gemini-3.6-flash`, structured strictly against `schemas/civic_diagnosis.schema.json` and validated locally with `jsonschema.validate()`:

- **Scene Classification**: `footpath`
- **Observation Summary**: A roadside footpath edge adjacent to an elevated planter wall, showing damaged paving, exposed soil, loose utility hoses, and leaf-filled kerbside drainage.
- **Detected Civic Problems**:
  1. `broken_walkway` — Severity: **medium** &bull; Confidence: **0.95** &bull; Evidence: *"Cracked and eroded concrete paving along the pedestrian surface exposing loose soil and dry leaves."*
  2. `accessibility_barrier` — Severity: **medium** &bull; Confidence: **0.88** &bull; Evidence: *"Uneven step-downs, broken paving edges, and exposed flexible pipes lying across the ground level create tripping hazards."*
  3. `poor_drainage` — Severity: **medium** &bull; Confidence: **0.82** &bull; Evidence: *"The concrete kerbside drain gutter is partially filled with accumulated leaf debris, dirt, and loose wiring."*

---

## 3. Deterministic Mapping
Problems are mapped to permitted candidate modules using `data/problem_module_map.json`:
- `broken_walkway` $\to$ `CP006` (Accessible Walkway Module), `CP010` (Permeable Paver Module)
- `accessibility_barrier` $\to$ `CP004` (Modular Accessibility Ramp), `CP005` (Tactile Guidance Path), `CP006` (Accessible Walkway Module)
- `poor_drainage` $\to$ `CP010` (Permeable Paver Module), `CP011` (Modular Rain Garden), `CP012` (Surface Drainage Channel)

$$\text{Module Score} = \sum (\text{Severity Weight} \times \text{Confidence})$$
*(where severity weights: high = 3, medium = 2, low = 1)*

---

## 4. Candidate Modules
The **Patch Engine** scores and ranks candidate components deterministically from `data/civic_modules.json`:
1. **`CP006` (Accessible Walkway Module)** — Score: **3.66** (Matches `broken_walkway` $2 \times 0.95 = 1.90$ + `accessibility_barrier` $2 \times 0.88 = 1.76$).
2. **`CP010` (Permeable Paver Module)** — Score: **3.54** (Matches `broken_walkway` $2 \times 0.95 = 1.90$ + `poor_drainage` $2 \times 0.82 = 1.64$).
3. **`CP004` (Modular Accessibility Ramp)** — Score: **1.76** (Matches `accessibility_barrier` $2 \times 0.88 = 1.76$).
4. **`CP005` (Tactile Guidance Path)** — Score: **1.76** (Matches `accessibility_barrier` $2 \times 0.88 = 1.76$).
5. **`CP011` (Modular Rain Garden)** — Score: **1.64** (Matches `poor_drainage` $2 \times 0.82 = 1.64$).
6. **`CP012` (Surface Drainage Channel)** — Score: **1.64** (Matches `poor_drainage` $2 \times 0.82 = 1.64$).

---

## 5. Quick Patch
- **Package Target**: Rapid stabilization of primary pedestrian surface.
- **Configured Tier Limit**: Maximum 1 module (from `data/patch_tiers.json`).
- **Selected Module**: `CP006` (Accessible Walkway Module).
- **Problems Covered**: `accessibility_barrier`, `broken_walkway`.
- **Estimated Installation Hours**: 6 – 20 hours.
- **Indicative Cost Range**: ₹20,000 – ₹70,000 INR.

---

## 6. Smart Patch (Recommended)
- **Package Target**: Balanced functional upgrade addressing all primary identified issues.
- **Configured Tier Limit**: Maximum 2 modules (from `data/patch_tiers.json`).
- **Selected Modules**: `CP006` (Accessible Walkway Module) + `CP010` (Permeable Paver Module).
- **Problems Covered**: `accessibility_barrier`, `broken_walkway`, `poor_drainage`.
- **Estimated Installation Hours**: 12 – 40 hours.
- **Indicative Cost Range**: ₹35,000 – ₹1,30,000 INR.

---

## 7. Full Patch
- **Package Target**: Comprehensive multi-module remediation including dedicated drainage channel.
- **Configured Tier Limit**: Maximum 3 modules (from `data/patch_tiers.json`).
- **Selected Modules**: `CP006` (Accessible Walkway Module) + `CP010` (Permeable Paver Module) + `CP012` (Surface Drainage Channel).
- **Problems Covered**: `accessibility_barrier`, `broken_walkway`, `poor_drainage`.
- **Estimated Installation Hours**: 16 – 56 hours.
- **Indicative Cost Range**: ₹45,000 – ₹1,80,000 INR.

---

## 8. Selected Example
- **Selected Package**: **Smart Patch (Balanced Upgrade)**
- **Composition**: Accessible Walkway Module (`CP006`) installed alongside Permeable Paver Module (`CP010`).
- **Compatibility Status**: Both modules directly matched to diagnosed problems (`direct_problem_match`).

---

## 9. Prototype Cost / Time
- **Total Indicative Cost**: ₹35,000 – ₹1,30,000 INR (derived from module ranges in `data/civic_modules.json`).
- **Estimated Installation Duration**: 12 – 40 hours (dry-assembly modular components).
- **Quantity Status**: `not_calculated` (Material quantities require physical on-site measurements).

---

## 10. Missing Site Information
Items identified for verification prior to works:
- On-site physical measurement of footpath width, slope, and elevation transition.
- Verification of drainage outlet connectivity and clearance of kerbside debris.
- Inspection of flexible pipes and utility cables traversing the footway surface.

---

## 11. Engineering Gate
The generated proposal is held at **Gate 4 (Engineer Review Required)**:
- **Draft Passport ID**: `CP-DRAFT-20260921-XXXX`
- **Engineer Review Status**: `REQUIRED / PENDING`
- **Deployment Status**: `NOT STARTED`
- **Impact Verification Status**: `NOT AVAILABLE — PATCH NOT DEPLOYED`

---

## 12. What Would Happen Next
1. **Field Engineering Verification**: Municipal or facility engineer reviews the proposal using the [Expert Review Template](../docs/expert_review_template.md).
2. **Site Survey**: Physical tape/laser measurement of dimensions and utility inspection.
3. **Stage 5 Approval**: Municipal review and work authorization.
4. **Stage 6 Deployment**: Dry modular installation during scheduled maintenance window.
5. **Stage 7 Post-Deployment**: Citizen feedback and walkway condition assessment.

---

No physical deployment has occurred.
No construction quantities have been calculated.
This case demonstrates the CITYPATCH prototype decision pipeline only.
