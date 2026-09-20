import os
import tempfile
from pathlib import Path

from fastapi import FastAPI, File, Form, HTTPException, UploadFile

from backend.pipeline import run_citypatch_pipeline


app = FastAPI(
    title="CITYPATCH API",
    version="0.1.0",
    description="Prototype API for the CITYPATCH civic intervention pipeline."
)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "citypatch-api",
        "version": "0.1.0"
    }


@app.post("/analyze")
async def analyze(
    image: UploadFile = File(...),
    user_context: str = Form("")
):
    allowed_types = {
        "image/jpeg",
        "image/png",
        "image/webp"
    }

    if image.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only JPEG, PNG, and WebP images are supported."
        )

    suffix = Path(image.filename or "upload.jpg").suffix

    if not suffix:
        suffix = ".jpg"

    temp_path = None

    try:
        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=suffix
        ) as temp_file:

            temp_path = temp_file.name

            image_bytes = await image.read()

            temp_file.write(image_bytes)

        result = run_citypatch_pipeline(
            image_path=temp_path,
            user_context=user_context
        )

        return result

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"CITYPATCH analysis failed: {str(error)}"
        )

    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)