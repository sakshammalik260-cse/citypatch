import json
import os
import sys
import time
from pathlib import Path

from dotenv import load_dotenv
from google import genai
from jsonschema import validate
from PIL import Image


# ---------------------------------------------------------
# PATHS
# ---------------------------------------------------------

ROOT_DIR = Path(__file__).resolve().parent.parent

PROMPT_PATH = ROOT_DIR / "prompts" / "civic_compiler.md"
SCHEMA_PATH = ROOT_DIR / "schemas" / "civic_diagnosis.schema.json"
ENV_PATH = ROOT_DIR / ".env"


# ---------------------------------------------------------
# LOAD CONFIGURATION
# ---------------------------------------------------------

load_dotenv(ENV_PATH)

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise RuntimeError(
        "GEMINI_API_KEY was not found. Add it to the project's .env file."
    )


# ---------------------------------------------------------
# LOAD CITYPATCH PROMPT + SCHEMA
# ---------------------------------------------------------

def load_prompt():
    return PROMPT_PATH.read_text(encoding="utf-8")


def load_schema():
    with SCHEMA_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)


# ---------------------------------------------------------
# CIVIC COMPILER
# ---------------------------------------------------------

def analyze_civic_image(image_path, user_context=""):
    """
    Analyze a civic-space image using Gemini and return
    a schema-validated CITYPATCH civic diagnosis.
    """

    image_path = Path(image_path)

    if not image_path.exists():
        raise FileNotFoundError(
            f"Image not found: {image_path}"
        )

    prompt = load_prompt()
    schema = load_schema()

    image = Image.open(image_path)

    client = genai.Client(api_key=API_KEY)

    context = user_context.strip()

    if not context:
        context = "No additional user context was provided."

    full_prompt = f"""
{prompt}

USER-PROVIDED CONTEXT:

{context}

Analyze the supplied image according to the CITYPATCH Civic Compiler rules.
Return only the structured civic diagnosis.
"""

    models_to_try = [
        "gemini-3.6-flash",
        "gemini-3.5-flash"
    ]

    response = None
    last_error = None

    for model_name in models_to_try:

        for attempt in range(2):

            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=[
                        full_prompt,
                        image
                    ],
                    config={
                        "response_mime_type": "application/json",
                        "response_json_schema": schema
                    }
                )

                break

            except Exception as error:
                last_error = error
                error_text = str(error)

                temporary_failure = (
                    "503" in error_text
                    or "UNAVAILABLE" in error_text
                    or "high demand" in error_text.lower()
                )

                if not temporary_failure:
                    raise

                if attempt == 0:
                    time.sleep(2)

        if response is not None:
            break

    if response is None:
        raise RuntimeError(
            "Gemini is temporarily unavailable after retrying "
            "the available CITYPATCH models."
        ) from last_error

    if not response.text:
        raise RuntimeError(
            "Gemini returned an empty response."
        )

    try:
        diagnosis = json.loads(response.text)

    except json.JSONDecodeError as error:
        raise RuntimeError(
            "Gemini returned invalid JSON."
        ) from error

    # Second validation layer performed locally by CITYPATCH.
    validate(
        instance=diagnosis,
        schema=schema
    )

    return diagnosis