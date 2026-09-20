import json
import sys
from pathlib import Path


# ---------------------------------------------------------
# PATHS
# ---------------------------------------------------------

ROOT_DIR = Path(__file__).resolve().parent.parent

MODULE_LIBRARY_PATH = ROOT_DIR / "data" / "civic_modules.json"
PROBLEM_MAP_PATH = ROOT_DIR / "data" / "problem_module_map.json"
PATCH_TIERS_PATH = ROOT_DIR / "data" / "patch_tiers.json"
COMPATIBILITY_PATH = ROOT_DIR / "data" / "module_compatibility.json"
# ---------------------------------------------------------
# LOAD DATA
# ---------------------------------------------------------

def load_module_library():
    with MODULE_LIBRARY_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)


def load_problem_map():
    with PROBLEM_MAP_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)
def load_patch_tiers():
    with PATCH_TIERS_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)
def load_compatibility_map():
    with COMPATIBILITY_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)
def is_potentially_compatible(candidate_id, selected_ids, compatibility_map):
    """
    Check prototype compatibility between a candidate module
    and all modules already selected.

    This is only a CITYPATCH pre-screen.
    It is not engineering approval.
    """

    if not selected_ids:
        return True

    modules = compatibility_map["modules"]

    if candidate_id not in modules:
        return False

    candidate_links = set(
        modules[candidate_id]["potentially_complementary_with"]
    )

    for selected_id in selected_ids:

        if selected_id not in modules:
            return False

        selected_links = set(
            modules[selected_id]["potentially_complementary_with"]
        )

        # Require compatibility to be declared in both directions.
        if (
            selected_id not in candidate_links
            or candidate_id not in selected_links
        ):
            return False

    return True    
# ---------------------------------------------------------
# PATCH ENGINE
# ---------------------------------------------------------

def select_candidate_modules(diagnosis):
    """
    Convert CITYPATCH civic problems into permitted candidate modules.

    Gemini does NOT select modules here.
    Selection is based only on CITYPATCH's deterministic mapping.
    """

    module_library = load_module_library()
    problem_map = load_problem_map()

    modules_by_id = {
        module["module_id"]: module
        for module in module_library["modules"]
    }

    problem_to_modules = problem_map["problem_to_modules"]

    candidate_matches = {}

    severity_weights = {
        "low": 1,
        "medium": 2,
        "high": 3
    }

    for problem in diagnosis.get("problems", []):
        problem_type = problem.get("type")

        if problem_type not in problem_to_modules:
            continue

        severity = problem.get("severity", "medium")
        confidence = problem.get("confidence", 1.0)

        problem_score = (
            severity_weights.get(severity, 2)
            * confidence
        )

        permitted_module_ids = problem_to_modules[problem_type]

        for module_id in permitted_module_ids:

            if module_id not in modules_by_id:
                raise ValueError(
                    f"Module {module_id} exists in the problem map "
                    f"but not in civic_modules.json"
                )

            if module_id not in candidate_matches:
                candidate_matches[module_id] = {
                    "module": modules_by_id[module_id],
                    "matched_problems": [],
                    "score": 0.0
                }

            candidate_matches[module_id]["matched_problems"].append(
                problem_type
            )

            candidate_matches[module_id]["score"] += problem_score

    candidates = []

    for module_id, data in candidate_matches.items():
        module = data["module"]

        matched_problems = sorted(
            set(data["matched_problems"])
        )

        candidates.append(
            {
                "module_id": module_id,
                "name": module["name"],
                "category": module["category"],
                "matched_problems": matched_problems,
                "match_count": len(matched_problems),
                "score": round(data["score"], 3),
                "requires_engineer_review": module[
                    "requires_engineer_review"
                ]
            }
        )

    candidates.sort(
        key=lambda item: (
            -item["score"],
            -item["match_count"],
            item["module_id"]
        )
    )

    return candidates
def build_patch_tiers(candidates):
    """
    Build Quick, Smart, and Full CITYPATCH options.

    Quick and Smart prioritize new civic-problem coverage.

    Full first achieves useful problem coverage, then may add
    compatible complementary modules up to its configured limit.

    Compatibility is only a prototype pre-screen and does not
    represent engineering approval.
    """

    tier_config = load_patch_tiers()["tiers"]
    compatibility_map = load_compatibility_map()

    result = {}

    for tier_id in ["quick", "smart", "full"]:
        config = tier_config[tier_id]
        max_modules = config["max_modules"]

        selected_modules = []
        covered_problems = set()
        remaining_candidates = candidates.copy()

        # -------------------------------------------------
        # STAGE 1: Prefer modules that add new problem coverage
        # -------------------------------------------------

        while remaining_candidates and len(selected_modules) < max_modules:

            best_candidate = None
            best_new_coverage = -1

            for candidate in remaining_candidates:

                candidate_problems = set(
                    candidate["matched_problems"]
                )

                new_problems = (
                    candidate_problems - covered_problems
                )

                new_coverage = len(new_problems)

                if best_candidate is None:
                    best_candidate = candidate
                    best_new_coverage = new_coverage
                    continue

                if new_coverage > best_new_coverage:
                    best_candidate = candidate
                    best_new_coverage = new_coverage

                elif (
                    new_coverage == best_new_coverage
                    and candidate["score"] > best_candidate["score"]
                ):
                    best_candidate = candidate

            if best_candidate is None:
                break

            # No need to add redundant modules during
            # the coverage stage.
            if best_new_coverage == 0:
                break

            selected_modules.append(best_candidate)

            covered_problems.update(
                best_candidate["matched_problems"]
            )

            remaining_candidates.remove(best_candidate)

        # -------------------------------------------------
        # STAGE 2: Full Patch may add compatible complements
        # -------------------------------------------------

        if tier_id == "full":

            while (
                remaining_candidates
                and len(selected_modules) < max_modules
            ):

                selected_ids = [
                    module["module_id"]
                    for module in selected_modules
                ]

                compatible_candidate = None

                for candidate in remaining_candidates:

                    if is_potentially_compatible(
                        candidate["module_id"],
                        selected_ids,
                        compatibility_map
                    ):
                        compatible_candidate = candidate
                        break

                if compatible_candidate is None:
                    break

                selected_modules.append(
                    compatible_candidate
                )

                covered_problems.update(
                    compatible_candidate["matched_problems"]
                )

                remaining_candidates.remove(
                    compatible_candidate
                )

        result[tier_id] = {
            "name": config["name"],
            "description": config["description"],
            "modules": selected_modules,
            "module_count": len(selected_modules),
            "covered_problems": sorted(covered_problems),
            "combined_score": round(
                sum(
                    module["score"]
                    for module in selected_modules
                ),
                3
            )
        }

    return result
# ---------------------------------------------------------
# COMMAND-LINE TEST
# ---------------------------------------------------------

def main():
    if len(sys.argv) < 2:
        print(
            "Usage: python backend/patch_engine.py "
            "<problem_type> [problem_type ...]"
        )
        sys.exit(1)

    problem_types = sys.argv[1:]

    diagnosis = {
        "problems": [
            {
                "type": problem_type
            }
            for problem_type in problem_types
        ]
    }

    candidates = select_candidate_modules(diagnosis)

    print("\nCITYPATCH PATCH ENGINE CANDIDATES\n")
    print(json.dumps(candidates, indent=2))


if __name__ == "__main__":
    main()