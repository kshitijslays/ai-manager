"use client";

import { useState } from "react";
import { Upload, FileText, Brain, HelpCircle, Search, CheckCircle2, AlertCircle, Sparkles, BookOpen } from "lucide-react";

export default function PharmaRAGPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------- UPLOAD PDF ----------------
  async function uploadPdf() {
    if (!file) return;

    setUploadStatus("Uploading...");
    setError("");

    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await fetch("http://127.0.0.1:8007/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setUploadStatus(`✅ PDF indexed (${data.chunks_added} chunks)`);
    } catch (err: any) {
      setUploadStatus("");
      setError(err.message);
    }
  }

  // ---------------- ASK QUESTION ----------------
  async function askQuestion() {
    if (!question) return;

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const res = await fetch("http://127.0.0.1:8007/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) throw new Error("Query failed");

      const data = await res.json();
      setAnswer(data.answer);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={containerStyle}>
      {/* Spotlight effect */}
      <div style={spotlightStyle} />
      
      {/* Thin divider line */}
      <div style={dividerStyle} />

      {/* Header Section */}
      <div style={headerContainerStyle}>
        <div style={iconWrapperStyle}>
          <BookOpen size={40} strokeWidth={1.5} style={{ color: "#ef4444" }} />
        </div>
        <h2 className="font-geist mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] bg-clip-text text-4xl tracking-tighter text-transparent md:text-6xl">
              Pharma{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-200 bg-clip-text text-transparent">
                RAG AI Agent
              </span>
            </h2>
        <p style={subheadingStyle}>
          Upload pharmaceutical research PDFs and ask questions using AI-powered document analysis.
        </p>
      </div>

      {/* Upload Section - Glass Card */}
      <div style={glassCardStyle}>
        <div style={sectionHeaderStyle}>
          <div style={sectionIconStyle}>
            <Upload size={24} style={{ color: "#ef4444" }} />
          </div>
          <div>
            <h3 style={sectionTitleStyle}>📄 Upload Research PDF</h3>
            <p style={sectionSubtitleStyle}>Upload pharmaceutical documents for AI analysis</p>
          </div>
        </div>

        <div style={uploadAreaStyle}>
          <div style={uploadContentStyle}>
            <FileText size={48} style={{ color: "#ef4444", opacity: 0.7, marginBottom: 16 }} />
            <p style={{ marginBottom: 8, fontSize: 15, color: "#d1d5db" }}>Drag & drop or click to upload</p>
            <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 20 }}>Supports PDF documents only</p>
            
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={fileInputStyle}
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" style={fileInputLabelStyle}>
              Choose File
            </label>
            
            {file && (
              <div style={fileInfoStyle}>
                <FileText size={16} />
                <span style={{ flex: 1 }}>{file.name}</span>
                <span style={{ fontSize: 13, color: "#9ca3af" }}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={uploadPdf} 
          disabled={!file}
          style={{
            ...uploadButtonStyle,
            opacity: !file ? 0.5 : 1,
            cursor: !file ? "not-allowed" : "pointer",
          }}
        >
          <Upload size={18} />
          Upload PDF
        </button>

        {uploadStatus && (
          <div style={statusStyle}>
            <CheckCircle2 size={18} style={{ color: "#10b981" }} />
            <span style={{ color: "#d1fae5" }}>{uploadStatus}</span>
          </div>
        )}
      </div>

      {/* Query Section - Glass Card */}
      <div style={glassCardStyle}>
        <div style={sectionHeaderStyle}>
          <div style={sectionIconStyle}>
            <Brain size={24} style={{ color: "#ef4444" }} />
          </div>
          <div>
            <h3 style={sectionTitleStyle}>❓ Ask a Question</h3>
            <p style={sectionSubtitleStyle}>Query the AI about the uploaded document</p>
          </div>
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>
            <div style={labelHeaderStyle}>
              <div style={labelIconStyle}>
                <HelpCircle size={16} />
              </div>
              <span>Your Question</span>
            </div>
            <span style={labelSubtextStyle}>AI QUERY</span>
          </label>
          <textarea
            rows={5}
            placeholder="Ask something about the uploaded pharmaceutical document..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={questionTextareaStyle}
          />
        </div>

        <button 
          onClick={askQuestion} 
          disabled={loading || !question}
          style={{
            ...askButtonStyle,
            opacity: (!question || loading) ? 0.5 : 1,
            cursor: (!question || loading) ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <>
              <div style={spinnerStyle} />
              Thinking...
            </>
          ) : (
            <>
              <Search size={18} />
              Ask AI
            </>
          )}
        </button>
      </div>

      {/* Answer Section */}
      {answer && (
        <div style={answerContainerStyle}>
          <div style={answerHeaderStyle}>
            <div style={answerHeaderLeftStyle}>
              <Sparkles size={24} style={{ color: "#ef4444" }} />
              <h3 style={answerTitleStyle}>AI Answer</h3>
            </div>
            <div style={badgeStyle}>
              <Brain size={14} />
              Generated
            </div>
          </div>

          <div style={answerCardStyle}>
            <div style={answerContentStyle}>
              {answer.split('\n').map((line, index) => (
                <p key={index} style={{ marginBottom: line ? 12 : 0 }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={errorBoxStyle}>
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ display: "block", marginBottom: 4 }}>Error</strong>
            {error}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "100%",
  margin: "0 auto",
  padding: "80px 40px",
  color: "#eaeaea",
  background: "#000000",
  minHeight: "100vh",
  position: "relative",
};

const spotlightStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "800px",
  height: "500px",
  background: "radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)",
  pointerEvents: "none",
  filter: "blur(80px)",
};

const dividerStyle: React.CSSProperties = {
  width: "100%",
  height: "1px",
  background: "linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.5), transparent)",
  marginBottom: 56,
};

const headerContainerStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: 56,
  maxWidth: "100%",
  margin: "0 auto 56px auto",
};

const iconWrapperStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 80,
  height: 80,
  borderRadius: "50%",
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(239, 68, 68, 0.1), transparent)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  marginBottom: 24,
};

const subheadingStyle: React.CSSProperties = {
  fontSize: 17,
  color: "#9ca3af",
  lineHeight: 1.7,
  maxWidth: "100%",
  margin: "0 auto",
};

const glassCardStyle: React.CSSProperties = {
  maxWidth: "100%",
  width: "100%",
  margin: "0 auto 32px auto",
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(239, 68, 68, 0.1), transparent)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 32,
  padding: 40,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
};

const sectionHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  marginBottom: 32,
};

const sectionIconStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 56,
  height: 56,
  borderRadius: "50%",
  background: "rgba(239, 68, 68, 0.15)",
  border: "1px solid rgba(239, 68, 68, 0.3)",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  margin: 0,
  color: "#ffffff",
  marginBottom: 4,
};

const sectionSubtitleStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#9ca3af",
  margin: 0,
};

const uploadAreaStyle: React.CSSProperties = {
  border: "2px dashed rgba(239, 68, 68, 0.3)",
  borderRadius: 24,
  padding: 48,
  textAlign: "center",
  marginBottom: 24,
  background: "rgba(0, 0, 0, 0.3)",
  transition: "all 0.3s ease",
};

const uploadContentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const fileInputStyle: React.CSSProperties = {
  display: "none",
};

const fileInputLabelStyle: React.CSSProperties = {
  padding: "12px 24px",
  borderRadius: 12,
  background: "linear-gradient(to right, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.1))",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  color: "#fca5a5",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "inline-block",
};

const fileInfoStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginTop: 20,
  padding: "12px 16px",
  borderRadius: 12,
  background: "rgba(0, 0, 0, 0.4)",
  border: "1px solid rgba(239, 68, 68, 0.2)",
  width: "100%",
  maxWidth: "400px",
};

const uploadButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px 24px",
  borderRadius: 16,
  border: "1px solid rgba(255, 255, 255, 0.1)",
  background: "linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(239, 68, 68, 0.2), transparent)",
  backdropFilter: "blur(16px)",
  color: "#fff",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
};

const statusStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginTop: 20,
  padding: "12px 16px",
  borderRadius: 12,
  background: "rgba(16, 185, 129, 0.1)",
  border: "1px solid rgba(16, 185, 129, 0.3)",
  backdropFilter: "blur(8px)",
};

const inputGroupStyle: React.CSSProperties = {
  marginBottom: 28,
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 12,
  fontSize: 15,
  fontWeight: 600,
  color: "#ffffff",
};

const labelHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const labelIconStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  borderRadius: "50%",
  background: "rgba(239, 68, 68, 0.15)",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  color: "#ef4444",
};

const labelSubtextStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "#6b7280",
  letterSpacing: "0.05em",
};

const questionTextareaStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px 20px",
  borderRadius: 16,
  border: "1px solid rgba(255, 255, 255, 0.1)",
  background: "rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(8px)",
  color: "#fff",
  fontSize: 15,
  lineHeight: 1.6,
  fontFamily: "inherit",
  resize: "vertical" as const,
  outline: "none",
  transition: "all 0.3s ease",
};

const askButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px 24px",
  borderRadius: 16,
  border: "1px solid rgba(255, 255, 255, 0.1)",
  background: "linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(239, 68, 68, 0.2), transparent)",
  backdropFilter: "blur(16px)",
  color: "#fff",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
};

const spinnerStyle: React.CSSProperties = {
  width: 18,
  height: 18,
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderTop: "2px solid #fff",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};

const answerContainerStyle: React.CSSProperties = {
  maxWidth: "100%",
  width: "100%",
  margin: "32px auto 0 auto",
};

const answerHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 28,
  paddingBottom: 20,
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  flexWrap: "wrap",
  gap: 16,
};

const answerHeaderLeftStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const answerTitleStyle: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  margin: 0,
  color: "#ffffff",
};

const badgeStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "8px 16px",
  borderRadius: 20,
  background: "rgba(239, 68, 68, 0.15)",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  fontSize: 13,
  fontWeight: 600,
  color: "#fca5a5",
  backdropFilter: "blur(8px)",
};

const answerCardStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(239, 68, 68, 0.05), transparent)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 24,
  padding: 32,
  backdropFilter: "blur(12px)",
  marginBottom: 24,
};

const answerContentStyle: React.CSSProperties = {
  color: "#d1d5db",
  fontSize: 15,
  lineHeight: 1.8,
};

const errorBoxStyle: React.CSSProperties = {
  maxWidth: "100%",
  width: "100%",
  margin: "0 auto 32px auto",
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  padding: 20,
  borderRadius: 16,
  background: "rgba(239, 68, 68, 0.1)",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  color: "#fca5a5",
  backdropFilter: "blur(8px)",
};