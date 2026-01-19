from fastapi import FastAPI, UploadFile, File, HTTPException
from groq import Groq
from dotenv import load_dotenv
import os
import fitz

load_dotenv()

app = FastAPI(docs_url=None, redoc_url=None)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def safe_extract_text(file_bytes: bytes) -> str:
    """
    Tries PDF extraction first.
    Falls back to UTF-8 text if PDF parsing fails.
    """
    try:
        text = ""
        with fitz.open(stream=file_bytes, filetype="pdf") as doc:
            for page in doc:
                text += page.get_text()
        if text.strip():
            return text
    except Exception:
        pass  # PDF parsing failed → fallback

    # Fallback: treat as text
    return file_bytes.decode("utf-8", errors="ignore")


@app.post("/match-resume/files")
async def match_resume_files(
    resume: UploadFile = File(...),
    job: UploadFile = File(...)
):
    try:
        resume_bytes = await resume.read()
        job_bytes = await job.read()

        resume_text = safe_extract_text(resume_bytes)
        job_text = safe_extract_text(job_bytes)

        if not resume_text.strip() or not job_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Uploaded files contain no readable text"
            )

        prompt = f"""
You are an AI career assistant.

Resume:
{resume_text}

Job Description:
{job_text}

Return:
1. Fit Score (0–100%)
2. Strengths
3. Improvements
"""

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            timeout=30
        )

        return {
            "status": "success",
            "analysis": response.choices[0].message.content
        }

    except HTTPException:
        raise
    except Exception as e:
        print("🔥 FASTAPI ERROR:", repr(e))
        raise HTTPException(status_code=500, detail="Resume processing failed")
