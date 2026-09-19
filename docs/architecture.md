# CITYPATCH Architecture

## Overview

CITYPATCH is an AI-powered modular civic infrastructure engine that converts real-world civic problems into structured, constrained, and reviewable physical intervention proposals.

The central idea is simple:

**AI understands the problem.  
CITYPATCH constrains the solution.  
Humans approve physical deployment.**

---

## Core Pipeline

Real-World Location  
↓  
Photo + User Context  
↓  
Gemini Civic Compiler  
↓  
Structured Civic Diagnosis  
↓  
CITYPATCH Patch Engine  
↓  
Civic Patch Library  
↓  
Quick / Smart / Full Patch Options  
↓  
Validation & Safety Engine  
↓  
Bill of Materials + Indicative Cost  
↓  
Visual Patch Generation  
↓  
Human / Engineer Review  
↓  
Patch Passport  
↓  
City Version History

---

## 1. Input Layer

The user provides information about a real physical location.

Initial MVP inputs:

- Photograph
- Problem description

Future inputs may include:

- Location
- Video
- Voice description
- Additional site information

---

## 2. Gemini Civic Compiler

Gemini provides multimodal understanding of the location.

Its job is to identify and structure information such as:

- scene type
- civic problems
- severity
- confidence
- visible evidence
- environmental conditions
- accessibility concerns
- possible physical constraints
- missing information

Gemini should return structured data rather than unrestricted prose.

Gemini analyzes the problem but does not have unrestricted authority to design physical infrastructure.

---

## 3. Structured Civic Diagnosis

Gemini observations are normalized into standardized problem identifiers such as:

- unsafe_crossing
- long_crossing_distance
- pedestrian_vehicle_conflict
- poor_visibility
- missing_shade
- broken_walkway
- accessibility_barrier
- waterlogging
- poor_drainage
- missing_seating

These identifiers allow deterministic software to reason about the detected problems.

---

## 4. Civic Patch Library

The Civic Patch Library contains predefined modular civic infrastructure components.

Version 1 contains 12 modules across four categories:

- Pedestrian Safety
- Accessibility
- Heat & Public Space
- Water & Drainage

The library acts as the physical solution vocabulary available to CITYPATCH.

This prevents the AI from freely inventing arbitrary infrastructure.

---

## 5. Patch Engine

The Patch Engine maps detected civic problems to compatible Civic Patch modules.

Conceptually:

Problem  
↓  
Compatible Modules  
↓  
Constraint Filtering  
↓  
Candidate Intervention  
↓  
Patch Options

The Patch Engine should use deterministic rules wherever possible.

---

## 6. Patch Levels

CITYPATCH will generate three intervention levels.

### Quick Patch

A smaller, faster, lower-complexity intervention.

### Smart Patch

A balanced intervention considering impact, cost, complexity, and available information.

### Full Patch

A more comprehensive intervention that may involve additional modules, cost, installation effort, and engineering review.

---

## 7. Validation and Safety Engine

Before presenting a proposal, CITYPATCH checks available constraints and missing information.

Examples include:

- unknown road dimensions
- drainage requirements
- pedestrian clearance
- accessibility requirements
- structural requirements
- module incompatibility
- missing site information

CITYPATCH must clearly flag proposals requiring additional verification.

An AI-generated proposal must never automatically be represented as construction-ready.

---

## 8. Bill of Materials Engine

Normal software calculates quantities and indicative costs using module data.

The BOM may include:

- selected modules
- quantities
- materials
- estimated cost range
- estimated installation time
- constraints
- engineering-review requirements

Important calculations should be deterministic rather than delegated to an LLM.

---

## 9. Visualization Engine

The selected patch is visualized on the original photograph using an image-generation or image-editing model.

The visualization should preserve unrelated parts of the original environment while showing the proposed intervention.

The generated image is a concept visualization.

It is not an engineering drawing or construction approval.

---

## 10. Human / Engineer Review

Physical deployment remains a human decision.

Possible proposal states may include:

- Proposed
- Revision Requested
- Under Review
- Approved
- Rejected
- Deployed

Engineering or other qualified professional review is required where applicable.

---

## 11. Patch Passport

Each proposal can receive a unique Patch Passport.

Example:

`CP-BLR-0001`

A Patch Passport may contain:

- location
- original image
- patched visualization
- detected problems
- selected modules
- bill of materials
- indicative cost
- constraints
- review status
- creation date
- version history

Future versions may provide a QR code linking to the Patch Passport.

---

## 12. City Versioning

CITYPATCH treats physical civic improvements conceptually like software updates.

Example:

Location v1.0  
↓  
Patch deployed  
↓  
Location v1.1

At city scale, multiple patches can contribute to a continuously evolving city version history.

---

## Architecture Principle

Gemini  
↓  
**Understands the problem**

CITYPATCH  
↓  
**Constrains the solution**

Image Model  
↓  
**Visualizes the proposal**

Human / Engineer  
↓  
**Reviews real-world deployment**