import json
import sys
from pathlib import Path


# ---------------------------------------------------------
# PATHS
# ---------------------------------------------------------

ROOT_DIR = Path(__file__).resolve().parent.parent

MODULE_LIBRARY_PATH = ROOT_DIR / "data" / "civic_modules.json"


# ---------------------------------------------------------
# LOAD DATA
# ---------------------------------------------------------

def load_module_library():
    with MODULE_LIBRARY_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)


# ---------------------------------------------------------
# BOM ENGINE
# ---------------------------------------------------------

def build_bom(module_ids):
    """
    Build a deterministic prototype BOM summary from selected
    CITYPATCH Civic Patch Library modules.

    No material quantities are invented because site dimensions
    and engineering measurements are not yet available.
    """

    library = load_module_library()

    modules_by_id = {
        module["module_id"]: module
        for module in library["modules"]
    }

    selected_modules = []

    total_cost_min = 0
    total_cost_max = 0

    total_hours_min = 0
    total_hours_max = 0

    requires_engineer_review = False

    for module_id in module_ids:

        if module_id not in modules_by_id:
            raise ValueError(
                f"Unknown CITYPATCH module: {module_id}"
            )

        module = modules_by_id[module_id]

        cost = module["estimated_cost_inr"]
        hours = module["estimated_installation_hours"]

        selected_modules.append(
            {
                "module_id": module["module_id"],
                "name": module["name"],
                "category": module["category"],
                "materials": module["materials"],
                "estimated_cost_inr": {
                    "min": cost["min"],
                    "max": cost["max"]
                },
                "estimated_installation_hours": {
                    "min": hours["min"],
                    "max": hours["max"]
                },
                "requires_engineer_review": module[
                    "requires_engineer_review"
                ]
            }
        )

        total_cost_min += cost["min"]
        total_cost_max += cost["max"]

        total_hours_min += hours["min"]
        total_hours_max += hours["max"]

        if module["requires_engineer_review"]:
            requires_engineer_review = True

    return {
        "bom_status": "prototype_estimate",
        "module_count": len(selected_modules),
        "modules": selected_modules,
        "estimated_total_cost_inr": {
            "min": total_cost_min,
            "max": total_cost_max
        },
        "estimated_total_installation_hours": {
            "min": total_hours_min,
            "max": total_hours_max
        },
        "requires_engineer_review": requires_engineer_review,
        "quantity_status": "not_calculated",
        "quantity_note": (
            "Material quantities are not generated until "
            "site-specific dimensions and measurements are available."
        ),
        "cost_note": (
            "Totals are sums of prototype module-level estimates "
            "and are not supplier quotations or construction-ready costs."
        )
    }
def build_tier_boms(patch_tiers):
    """
    Build deterministic BOM summaries for each CITYPATCH
    intervention tier.
    """

    tier_boms = {}

    for tier_id, tier in patch_tiers.items():

        module_ids = [
            module["module_id"]
            for module in tier["modules"]
        ]

        tier_boms[tier_id] = {
            "name": tier["name"],
            "bom": build_bom(module_ids)
        }

    return tier_boms

# ---------------------------------------------------------
# COMMAND-LINE TEST
# ---------------------------------------------------------

def main():
    if len(sys.argv) < 2:
        print(
            "Usage: python backend/bom_engine.py "
            "<module_id> [module_id ...]"
        )
        sys.exit(1)

    module_ids = sys.argv[1:]

    try:
        bom = build_bom(module_ids)

        print("\nCITYPATCH PROTOTYPE BOM\n")
        print(json.dumps(bom, indent=2))

    except Exception as error:
        print("\nCITYPATCH BOM ENGINE ERROR")
        print(str(error))
        sys.exit(1)


if __name__ == "__main__":
    main()