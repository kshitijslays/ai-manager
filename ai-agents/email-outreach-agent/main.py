from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin
from groq import Groq
from dotenv import load_dotenv
import requests
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import pandas as pd
from fastapi import UploadFile, File, Form


# Load env
load_dotenv()

app = FastAPI()

# -------------------- CORS (FIXED) --------------------
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

# -------------------- MODELS --------------------

class GenerateEmailRequest(BaseModel):
    company_url: str
    service_offered: str
    sender_name: str
    sender_email: str
    max_pages: int = 1
    groq_api_key: str | None = None


class SendEmailRequest(BaseModel):
    sender_name: str
    sender_email: str
    receiver_email: str
    email: str
    
class BulkSheetRequest(BaseModel):
    sheet_url: str
    company_url: str
    service_offered: str
    sender_name: str
    sender_email: str
    max_pages: int = 1
    groq_api_key: str | None = None


# -------------------- SCRAPER --------------------

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

            collected_text.append(soup.get_text(separator="\n", strip=True))

            for a in soup.find_all("a", href=True):
                full = urljoin(url, a["href"])
                if urlparse(full).netloc == domain:
                    queue.append(full)

        except Exception:
            continue

    return "\n\n".join(collected_text)[:12000]

# -------------------- EMAIL SENDER --------------------

def send_email(
    sender_name,
    sender_email,
    receiver_email,
    email_body,
    niche=None,
    subject=None
):
    smtp_user = os.getenv("SMTP_EMAIL")
    smtp_pass = os.getenv("SMTP_PASS")

    if not smtp_user or not smtp_pass:
        raise Exception("SMTP credentials missing")

    msg = MIMEMultipart()
    msg["From"] = f"{sender_name} <{smtp_user}>"
    msg["To"] = receiver_email

    # ✅ SUBJECT PRIORITY
    if subject:
        msg["Subject"] = subject
    elif niche:
        msg["Subject"] = f"Quick question about {niche}"
    else:
        msg["Subject"] = "Quick question"

    msg["Reply-To"] = sender_email
    msg.attach(MIMEText(email_body, "plain"))

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)


# -------------------- GENERATE EMAIL --------------------

@app.post("/generate-email")
def generate_email(payload: GenerateEmailRequest):
    api_key = payload.groq_api_key or os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(status_code=400, detail="Groq API key missing")

    scraped_text = scrape_site(payload.company_url, payload.max_pages)
    client = Groq(api_key=api_key)

    prompt = f"""
You are a friendly 20-year-old B2B sales rep.

Company info:
{scraped_text}

Service offered:
{payload.service_offered}

Rules:
- Casual but professional
- Short paragraphs
- Soft CTA
- Sign off as {payload.sender_name}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You write natural B2B cold emails."},
            {"role": "user", "content": prompt},
        ],
    )

    return {
        "status": "generated",
        "email": response.choices[0].message.content,
    }

# -------------------- SEND EMAIL --------------------

@app.post("/send-email")
def send_approved_email(payload: SendEmailRequest):
    send_email(
        sender_name=payload.sender_name,
        sender_email=payload.sender_email,
        receiver_email=payload.receiver_email,
        email_body=payload.email,
    )

    return {
        "status": "sent",
        "email_sent_to": payload.receiver_email,
    }

# -------------------- SEND BULK EMAILS --------------------

@app.post("/send-bulk-emails")
async def send_bulk_emails(
    file: UploadFile = File(...),
    company_url: str = Form(...),
    service_offered: str = Form(...),
    sender_name: str = Form(...),
    sender_email: str = Form(...),
    max_pages: int = Form(1),
    groq_api_key: str | None = Form(None),
):
    api_key = groq_api_key or os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(status_code=400, detail="Groq API key missing")

    try:
        df = pd.read_excel(file.file)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid Excel file")

    required_cols = {"name", "email", "niche"}
    if not required_cols.issubset(df.columns):
        raise HTTPException(
            status_code=400,
            detail="Excel must contain columns: name, email, niche"
        )

    scraped_text = scrape_site(company_url, max_pages)
    client = Groq(api_key=api_key)

    sent = []
    failed = []

    for _, row in df.iterrows():
        try:
            prompt = f"""
You are a friendly B2B sales rep.

Company website info:
{scraped_text}

Lead name: {row['name']}
Lead business niche: {row['niche']}

Service offered:
{service_offered}

Rules:
- Personalize for niche
- Casual but professional
- Soft CTA
- Sign off as {sender_name}
"""

            response = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {"role": "system", "content": "You write personalized cold emails."},
                    {"role": "user", "content": prompt},
                ],
            )

            email_body = response.choices[0].message.content

            send_email(
                sender_name=sender_name,
                sender_email=sender_email,
                receiver_email=row["email"],
                email_body=email_body,
            )

            sent.append(row["email"])

        except Exception as e:
            failed.append({
                "email": row["email"],
                "error": str(e)
            })

    return {
        "status": "completed",
        "total": len(df),
        "sent": sent,
        "failed": failed,
    }
@app.post("/generate-bulk-emails-from-google-sheet-preview")
async def generate_bulk_preview(payload: BulkSheetRequest):
    api_key = payload.groq_api_key or os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(status_code=400, detail="Groq API key missing")

    sheet_id = payload.sheet_url.split("/d/")[1].split("/")[0]
    csv_url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv"

    df = pd.read_csv(csv_url)

    required_cols = {"name", "email", "niche"}
    if not required_cols.issubset(df.columns):
        raise HTTPException(400, "Sheet must contain name, email, niche")

    scraped_text = scrape_site(payload.company_url, payload.max_pages)
    client = Groq(api_key=api_key)

    drafts = []

    for _, row in df.iterrows():
        prompt = f"""
You are a friendly B2B sales rep.

Company info:
{scraped_text}

Lead name: {row['name']}
Lead niche: {row['niche']}
Service: {payload.service_offered}

Rules:
- Personalized
- Short
- Soft CTA
- Sign as {payload.sender_name}
"""

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
        )

        drafts.append({
            "name": row["name"],
            "email": row["email"],
            "niche": row["niche"],
            "email_body": response.choices[0].message.content
        })

    return {
        "status": "preview",
        "drafts": drafts
    }

@app.post("/send-bulk-emails-from-google-sheet")
async def send_bulk_from_google_sheet(payload: BulkSheetRequest):
    api_key = payload.groq_api_key or os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(status_code=400, detail="Groq API key missing")

    sheet_url = payload.sheet_url
    company_url = payload.company_url
    service_offered = payload.service_offered
    sender_name = payload.sender_name
    sender_email = payload.sender_email
    max_pages = payload.max_pages

    if "/d/" not in sheet_url:
        raise HTTPException(status_code=400, detail="Invalid Google Sheet URL")

    sheet_id = sheet_url.split("/d/")[1].split("/")[0]
    csv_url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv"

    try:
        df = pd.read_csv(csv_url)
    except Exception:
        raise HTTPException(status_code=400, detail="Unable to read Google Sheet")

    required_cols = {"name", "email", "niche"}
    if not required_cols.issubset(df.columns):
        raise HTTPException(
            status_code=400,
            detail="Sheet must contain columns: name, email, niche",
        )

    scraped_text = scrape_site(company_url, max_pages)
    client = Groq(api_key=api_key)

    sent, failed = [], []

    for _, row in df.iterrows():
        try:
            prompt = f"""
You are a friendly B2B sales rep.

Company website info:
{scraped_text}

Lead name: {row['name']}
Lead business niche: {row['niche']}

Service offered:
{service_offered}

Rules:
- Personalized
- Casual but professional
- Soft CTA
- Sign off as {sender_name}
"""

            response = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {"role": "system", "content": "You write personalized cold emails."},
                    {"role": "user", "content": prompt},
                ],
            )

            email_body = response.choices[0].message.content

            send_email(
                sender_name=sender_name,
                sender_email=sender_email,
                receiver_email=row["email"],
                email_body=email_body,
            )

            sent.append(row["email"])

            import time
            time.sleep(3)

        except Exception as e:
            failed.append({"email": row["email"], "error": str(e)})

    return {
        "status": "completed",
        "total": len(df),
        "sent": sent,
        "failed": failed,
    }

@app.post("/generate-bulk-emails")
async def generate_bulk_emails(
    file: UploadFile = File(...),
    company_url: str = Form(...),
    service_offered: str = Form(...),
    sender_name: str = Form(...),
    max_pages: int = Form(1),
    groq_api_key: str | None = Form(None),
):
    api_key = groq_api_key or os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(status_code=400, detail="Groq API key missing")

    df = pd.read_excel(file.file)

    required_cols = {"name", "email", "niche"}
    if not required_cols.issubset(df.columns):
        raise HTTPException(status_code=400, detail="Invalid columns")

    scraped_text = scrape_site(company_url, max_pages)
    client = Groq(api_key=api_key)

    drafts = []

    for _, row in df.iterrows():
        prompt = f"""
You are a friendly B2B sales rep.

Company info:
{scraped_text}

Lead Name: {row['name']}
Niche: {row['niche']}
Service: {service_offered}

Rules:
- Casual
- Personalized
- Soft CTA
- Sign as {sender_name}
"""

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
        )

        drafts.append({
            "name": row["name"],
            "email": row["email"],
            "draft_email": response.choices[0].message.content
        })

    return {
        "status": "generated",
        "drafts": drafts
    }
class ApproveEmail(BaseModel):
    sender_name: str
    sender_email: str
    receiver_email: str
    subject: str | None = None
    niche: str | None = None
    email_body: str
    
@app.post("/send-approved-email")
def send_approved_email(payload: ApproveEmail):
    send_email(
        sender_name=payload.sender_name,
        sender_email=payload.sender_email,
        receiver_email=payload.receiver_email,
        email_body=payload.email_body,
        niche=payload.niche
    )

    return {
        "status": "sent",
        "sent_to": payload.receiver_email
    }
