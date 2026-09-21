import json
import unittest
from pathlib import Path

from backend.patch_engine import (
    select_candidate_modules,
    build_patch_tiers,
    is_potentially_compatible,
    load_compatibility_map
)
from backend.bom_engine import (
    build_bom,
    build_tier_boms,
    build_tier_summary
)

ROOT_DIR = Path(__file__).resolve().parent.parent


class TestCitypatchEngines(unittest.TestCase):
    """
    Deterministic unit tests for CITYPATCH core logic.
    Does NOT call Gemini API.
    """

    def setUp(self):
        fixture_path = ROOT_DIR / "tests" / "campus_diagnosis.json"
        with fixture_path.open("r", encoding="utf-8") as f:
            self.campus_diagnosis = json.load(f)

    # ----------------------------------------------------------------------
    # 1. Known Diagnosis -> Expected Candidate Modules
    # ----------------------------------------------------------------------
    def test_known_diagnosis_generates_candidates(self):
        candidates = select_candidate_modules(self.campus_diagnosis)
        self.assertIsInstance(candidates, list)
        self.assertGreater(len(candidates), 0)

        # Ensure candidates are sorted by score descending
        scores = [c["score"] for c in candidates]
        self.assertEqual(scores, sorted(scores, reverse=True))

        # Check candidate structure
        for c in candidates:
            self.assertIn("module_id", c)
            self.assertIn("name", c)
            self.assertIn("category", c)
            self.assertIn("matched_problems", c)
            self.assertIn("match_count", c)
            self.assertIn("score", c)
            self.assertIn("requires_engineer_review", c)

    # ----------------------------------------------------------------------
    # 2. Severity and Confidence Scoring
    # ----------------------------------------------------------------------
    def test_severity_confidence_scoring(self):
        # High severity (weight 3) with 0.8 confidence = 2.4
        diag_high = {
            "problems": [
                {
                    "type": "unsafe_crossing",
                    "severity": "high",
                    "confidence": 0.8,
                    "evidence": "Observed pedestrian-vehicle conflict"
                }
            ]
        }
        candidates_high = select_candidate_modules(diag_high)
        # Low severity (weight 1) with 0.8 confidence = 0.8
        diag_low = {
            "problems": [
                {
                    "type": "unsafe_crossing",
                    "severity": "low",
                    "confidence": 0.8,
                    "evidence": "Observed pedestrian-vehicle conflict"
                }
            ]
        }
        candidates_low = select_candidate_modules(diag_low)

        self.assertGreater(len(candidates_high), 0)
        self.assertGreater(len(candidates_low), 0)

        # CP001 or CP002 solves unsafe_crossing
        high_score = candidates_high[0]["score"]
        low_score = candidates_low[0]["score"]
        self.assertAlmostEqual(high_score, 2.4, places=2)
        self.assertAlmostEqual(low_score, 0.8, places=2)
        self.assertGreater(high_score, low_score)

    # ----------------------------------------------------------------------
    # 3. Unknown Problem Behavior (Fails safely, does not crash)
    # ----------------------------------------------------------------------
    def test_unknown_problem_behavior_is_ignored(self):
        diag_unknown = {
            "problems": [
                {
                    "type": "nonexistent_civic_issue_xyz",
                    "severity": "high",
                    "confidence": 1.0,
                    "evidence": "Unknown observation"
                }
            ]
        }
        candidates = select_candidate_modules(diag_unknown)
        self.assertEqual(candidates, [])

    def test_empty_problems_list(self):
        candidates = select_candidate_modules({"problems": []})
        self.assertEqual(candidates, [])

    # ----------------------------------------------------------------------
    # 4. Compatibility Filtering
    # ----------------------------------------------------------------------
    def test_compatibility_map_rules(self):
        compat_map = load_compatibility_map()
        self.assertIn("modules", compat_map)

        # With empty selected_ids, any candidate is compatible
        self.assertTrue(is_potentially_compatible("CP001", [], compat_map))

        # Check an unknown module ID in compatibility map
        self.assertFalse(is_potentially_compatible("UNKNOWN_ID", ["CP001"], compat_map))

    # ----------------------------------------------------------------------
    # 5. Quick / Smart / Full Composition
    # ----------------------------------------------------------------------
    def test_patch_tiers_composition(self):
        candidates = select_candidate_modules(self.campus_diagnosis)
        tiers = build_patch_tiers(candidates)

        self.assertIn("quick", tiers)
        self.assertIn("smart", tiers)
        self.assertIn("full", tiers)

        for tier_key in ["quick", "smart", "full"]:
            tier = tiers[tier_key]
            self.assertIn("name", tier)
            self.assertIn("description", tier)
            self.assertIn("modules", tier)
            self.assertIn("module_count", tier)
            self.assertIn("covered_problems", tier)
            self.assertIn("combined_score", tier)
            self.assertEqual(len(tier["modules"]), tier["module_count"])

        # Quick tier has at most max_modules configured (1)
        self.assertLessEqual(tiers["quick"]["module_count"], 1)
        # Smart tier module count <= full tier module count
        self.assertLessEqual(tiers["smart"]["module_count"], tiers["full"]["module_count"])

    # ----------------------------------------------------------------------
    # 6. BOM Cost Aggregation
    # ----------------------------------------------------------------------
    def test_bom_aggregation(self):
        bom = build_bom(["CP006", "CP010"])

        self.assertEqual(bom["bom_status"], "prototype_estimate")
        self.assertEqual(bom["module_count"], 2)
        self.assertEqual(bom["quantity_status"], "not_calculated")
        self.assertIn("min", bom["estimated_total_cost_inr"])
        self.assertIn("max", bom["estimated_total_cost_inr"])
        self.assertGreater(bom["estimated_total_cost_inr"]["max"], bom["estimated_total_cost_inr"]["min"])
        self.assertGreater(bom["estimated_total_installation_hours"]["max"], 0)

        # Check consolidated materials count
        self.assertIsInstance(bom["consolidated_materials"], list)
        self.assertGreater(len(bom["consolidated_materials"]), 0)

    # ----------------------------------------------------------------------
    # 7. Invalid Module ID Fails Cleanly
    # ----------------------------------------------------------------------
    def test_invalid_module_id_raises_value_error(self):
        with self.assertRaises(ValueError) as ctx:
            build_bom(["INVALID_MODULE_999"])
        self.assertIn("Unknown CITYPATCH module", str(ctx.exception))

    # ----------------------------------------------------------------------
    # 8. Tier Summary Generation
    # ----------------------------------------------------------------------
    def test_tier_summary_structure(self):
        candidates = select_candidate_modules(self.campus_diagnosis)
        tiers = build_patch_tiers(candidates)
        tier_boms = build_tier_boms(tiers)
        tier_summary = build_tier_summary(tier_boms)

        for tier_key in ["quick", "smart", "full"]:
            self.assertIn(tier_key, tier_summary)
            summary = tier_summary[tier_key]
            self.assertIn("name", summary)
            self.assertIn("module_ids", summary)
            self.assertIn("module_names", summary)
            self.assertIn("module_count", summary)
            self.assertIn("unique_material_count", summary)
            self.assertIn("estimated_cost_inr", summary)
            self.assertIn("estimated_installation_hours", summary)
            self.assertIn("requires_engineer_review", summary)
            self.assertEqual(summary["quantity_status"], "not_calculated")
            self.assertEqual(summary["estimate_status"], "prototype_estimate")


if __name__ == "__main__":
    unittest.main()
