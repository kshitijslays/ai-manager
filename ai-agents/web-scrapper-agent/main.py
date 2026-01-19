from fastapi import FastAPI, HTTPException
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import requests
from groq import Groq
import os
import json

load_dotenv()

app = FastAPI()

@app.post("/scrape")
def scrape_website(payload: dict):
    url = payload.get("url")
    goal = payload.get("goal")

    # payload key > env key
    groq_api_key = payload.get("groq_api_key") or os.getenv("GROQ_API_KEY")

    if not url or not goal:
        raise HTTPException(status_code=400, detail="url and goal are required")

    if not groq_api_key:
        raise HTTPException(
            status_code=400,
            detail="Groq API key missing (payload or env)"
        )

    # -------- SCRAPE WEBSITE --------
    try:
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch URL: {e}")

    soup = BeautifulSoup(response.text, "html.parser")

    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    headings = [h.get_text(strip=True) for h in soup.find_all(["h1", "h2", "h3"])]
    paragraphs = [p.get_text(strip=True) for p in soup.find_all("p")]

    raw_data = {
        "url": url,
        "headings": headings,
        "paragraphs": paragraphs
    }

    # -------- AI PROCESSING --------
    try:
        client = Groq(api_key=groq_api_key)

        prompt = f"""
You are a professional web analysis AI agent.

USER GOAL:
{goal}

SCRAPED WEBSITE CONTENT:
{json.dumps(raw_data, indent=2)[:12000]}

INSTRUCTIONS:
- Explain the results in simple human language
- Use bullet points
- Be clear and concise
- Do NOT return JSON
- Do NOT mention JSON or formatting
- Write as if explaining to a normal user
"""


        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            timeout=20
        )

        ai_output = completion.choices[0].message.content

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq AI failed: {e}")

    return {
        "status": "success",
        "pages_scraped": 1,
        "ai_output": ai_output,
        "raw_data": raw_data
    }
