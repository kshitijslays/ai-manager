import fitz
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()   # 🔥 MUST be before os.getenv

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def extract_pdf_text(file_bytes):
    text = ""
    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text

def analyze_resume(resume_text, job_text):
    prompt = f"""
You are an AI career assistant.

Resume:
{resume_text}

Job Description:
{job_text}

Return:
1. Fit Score (0–100%)
2. Key strengths
3. Resume improvement suggestions
"""

    chat = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
    )

    return chat.choices[0].message.content
