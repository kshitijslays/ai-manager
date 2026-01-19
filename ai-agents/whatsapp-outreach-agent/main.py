from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin
from groq import Groq
from dotenv import load_dotenv
from twilio.rest import Client
import requests
import os

# ---------------- LOAD ENV ----------------
load_dotenv()

# ---------------- APP ----------------
app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- MODELS ----------------
class WhatsAppGenerateRequest(BaseModel):
    company_url: str
    service_offered: str
    sender_name: str
    sender_email: str
    max_pages: int = 1
    groq_api_key: str | None = None


class WhatsAppSendRequest(BaseModel):
    receiver_whatsapp: str   # whatsapp:+91xxxxxxxxxx
    message: str


# ---------------- SCRAPER ----------------
def scrape_site(start_url: str, max_pages: int):
    collected_text = []
    visited = set()
    domain = urlparse(start_url).netloc
    queue = [start_url]

    while queue and len(visited) < max_pages:
        url = queue.pop(0)
        if url in visited:
            continue
        visited.add(url)

        try:
            r = requests.get(
                url,
                headers={"User-Agent": "Mozilla/5.0"},
                timeout=15,
            )
            soup = BeautifulSoup(r.text, "html.parser")

            for t in soup(["script", "style", "noscript"]):
                t.decompose()

            collected_text.append(
                soup.get_text(separator="\n", strip=True)
            )

            for a in soup.find_all("a", href=True):
                full = urljoin(url, a["href"])
                if urlparse(full).netloc == domain:
                    queue.append(full)

        except Exception:
            continue

    return "\n\n".join(collected_text)[:12000]


# ---------------- WHATSAPP SENDER ----------------
def send_whatsapp(to_number: str, message: str):
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    from_number = os.getenv("TWILIO_WHATSAPP_NUMBER")

    if not account_sid or not auth_token or not from_number:
        raise Exception("Twilio credentials missing")

    client = Client(account_sid, auth_token)

    client.messages.create(
        body=message,
        from_=from_number,
        to=to_number,
    )


# ---------------- GENERATE MESSAGE ----------------
@app.post("/whatsapp-generate")
def generate_message(payload: WhatsAppGenerateRequest):
    groq_key = payload.groq_api_key or os.getenv("GROQ_API_KEY")
    if not groq_key:
        raise HTTPException(status_code=400, detail="Groq API key missing")

    scraped_text = scrape_site(payload.company_url, payload.max_pages)
    client = Groq(api_key=groq_key)

    prompt = f"""
You are a friendly B2B sales rep writing a WhatsApp outreach message.

Company website content:
{scraped_text}

Service offered:
{payload.service_offered}

Rules:
- WhatsApp friendly
- Short lines
- Casual but professional
- Soft CTA
- Sign off as {payload.sender_name}
- Include sender email: {payload.sender_email}
"""

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You write WhatsApp outreach messages."},
            {"role": "user", "content": prompt},
        ],
    )

    return {
        "status": "generated",
        "message": completion.choices[0].message.content.strip(),
    }


# ---------------- SEND MESSAGE ----------------
@app.post("/whatsapp-send")
def send_message(payload: WhatsAppSendRequest):
    send_whatsapp(
        to_number=payload.receiver_whatsapp,
        message=payload.message,
    )

    return {
        "status": "sent",
        "to": payload.receiver_whatsapp,
    }


# ---------------- HEALTH ----------------
@app.get("/")
def health():
    return {"status": "WhatsApp Outreach Agent running"}
