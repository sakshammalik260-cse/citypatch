import json
import sys

from backend.civic_compiler import analyze_civic_image
from backend.patch_engine import (
    select_candidate_modules,
    build_patch_tiers
)
from backend.bom_engine import (
    build_tier_boms,
    build_tier_summary
)


# ---------------------------------------------------------
# CITYPATCH UNIFIED PIPELINE
# ---------------------------------------------------------

def run_citypatch_pipeline(image_path, user_context=""):
    """
    Run the complete CITYPATCH prototype pipeline.

    Image
    -> Gemini civic diagnosis
    -> deterministic candidate selection
    -> Quick / Smart / Full patches
    -> deterministic BOM and cost summaries
    """

    # 1. Gemini understands the civic scene
    diagnosis = analyze_civic_image(
        image_path=image_path,
        user_context=user_context
    )

    # 2. CITYPATCH deterministically selects allowed modules
    candidates = select_candidate_modules(diagnosis)

    # 3. Build Quick / Smart / Full intervention tiers
    patch_tiers = build_patch_tiers(candidates)

    # 4. Generate deterministic BOMs
    tier_boms = build_tier_boms(patch_tiers)

    # 5. Create compact frontend-ready summaries
    tier_summary = build_tier_summary(tier_boms)

    return {
        "pipeline_version": "0.1",
        "status": "prototype",
        "diagnosis": diagnosis,
        "candidate_modules": candidates,
        "patch_tiers": patch_tiers,
        "tier_summary": tier_summary,
        "requires_human_review": diagnosis.get(
            "requires_human_review",
            True
        ),
        "disclaimer": (
            "CITYPATCH outputs are preliminary prototype recommendations. "
            "Costs are indicative module-level estimates and physical "
            "deployment requires site-specific professional review."
        )
    }


# ---------------------------------------------------------
# COMMAND-LINE TEST
# ---------------------------------------------------------

def main():
    if len(sys.argv) < 2:
        print(
            "Usage: python -m backend.pipeline "
            "<image_path> [optional context]"
        )
        sys.exit(1)

    image_path = sys.argv[1]

    user_context = (
        " ".join(sys.argv[2:])
        if len(sys.argv) > 2
        else ""
    )

    try:
        result = run_citypatch_pipeline(
            image_path=image_path,
            user_context=user_context
        )

        print("\nCITYPATCH UNIFIED PIPELINE RESULT\n")
        print(json.dumps(result, indent=2))

    except Exception as error:
        print("\nCITYPATCH PIPELINE ERROR")
        print(str(error))
        sys.exit(1)


if __name__ == "__main__":
    main()