import os
import shutil
from typing import List

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq

# ---------------- LOAD ENV ----------------
load_dotenv()

# ---------------- FASTAPI APP ----------------
app = FastAPI(title="Pharma RAG AI Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- CONSTANTS ----------------
UPLOAD_DIR = "uploads"
DB_DIR = "pharma_db"

os.makedirs(UPLOAD_DIR, exist_ok=True)

# ---------------- EMBEDDINGS ----------------
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-mpnet-base-v2"
)

# ---------------- VECTOR DB ----------------
db = Chroma(
    persist_directory=DB_DIR,
    embedding_function=embeddings
)

# ---------------- MODELS ----------------
class QueryRequest(BaseModel):
    question: str

# ---------------- PDF UPLOAD ----------------
@app.post("/upload-pdf")
async def upload_pdf(files: List[UploadFile] = File(...)):
    try:
        all_docs = []

        for file in files:
            if not file.filename.endswith(".pdf"):
                raise HTTPException(status_code=400, detail="Only PDF files allowed")

            file_path = os.path.join(UPLOAD_DIR, file.filename)

            with open(file_path, "wb") as f:
                shutil.copyfileobj(file.file, f)

            loader = PyPDFLoader(file_path)
            documents = loader.load()
            all_docs.extend(documents)

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )

        chunks = splitter.split_documents(all_docs)
        db.add_documents(chunks)

        return {
            "status": "success",
            "files_uploaded": len(files),
            "chunks_created": len(chunks)
        }

    except Exception as e:
        print("❌ UPLOAD ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))

# ---------------- QUERY RAG ----------------
@app.post("/query")
def query_rag(payload: QueryRequest):
    try:
        retriever = db.as_retriever(
            search_type="similarity",
            search_kwargs={"k": 5}
        )

        # ✅ NEW LANGCHAIN API
        docs = retriever.invoke(payload.question)

        if not docs:
            return {"answer": "No relevant data found in uploaded documents."}

        context = "\n\n".join(doc.page_content for doc in docs)

        prompt = f"""
You are a pharmaceutical domain expert.

Answer ONLY using the context below.
Do not hallucinate or add outside knowledge.

Context:
{context}

Question:
{payload.question}
"""

        llm = ChatGroq(
            api_key=os.getenv("GROQ_API_KEY"),
            model_name="llama-3.1-8b-instant",
            temperature=0.2
        )

        response = llm.invoke(prompt)

        return {
            "answer": response.content
        }

    except Exception as e:
        print("❌ QUERY ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))

# ---------------- HEALTH CHECK ----------------
@app.get("/")
def root():
    return {"status": "Pharma RAG Agent running"}
