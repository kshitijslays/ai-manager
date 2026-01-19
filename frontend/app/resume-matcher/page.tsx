"use client";

import { useState } from "react";
import { FileText, Briefcase, Upload, Download, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from "lucide-react";

export default function UploadPage() {
  const [resume, setResume] = useState<File | null>(null);
  const [job, setJob] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function downloadReport(content: string) {
    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resume_match_report.txt";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function uploadResume() {
    if (!resume || !job) {
      alert("Please upload both Resume and Job Description");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("job", job);

      const res = await fetch(
        "http://localhost:5000/api/agents/resume-match",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Server error while analyzing resume");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
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
          <Sparkles size={40} strokeWidth={1.5} style={{ color: "#ef4444" }} />
        </div>
         <h2 className="font-geist mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] bg-clip-text text-4xl tracking-tighter text-transparent md:text-6xl">
              Resume{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-200 bg-clip-text text-transparent">
                Matcher
              </span>
            </h2>
        <p style={subheadingStyle}>
          AI-powered resume analysis. Upload your resume and job description to get instant compatibility insights and improvement suggestions.
        </p>
      </div>

      {/* Upload Section - Glass Card */}
      <div style={glassCardStyle}>
        <div style={uploadGridStyle}>
          {/* Resume Upload */}
          <div style={uploadSectionStyle}>
            <label style={labelStyle}>
              <div style={labelHeaderStyle}>
                <div style={labelIconStyle}>
                  <FileText size={16} />
                </div>
                <span>Resume</span>
              </div>
              <span style={labelSubtextStyle}>PDF OR TXT</span>
            </label>
            
            <div style={fileInputWrapperStyle}>
              <input
                type="file"
                accept=".pdf,.txt"
                onChange={(e) => setResume(e.target.files?.[0] || null)}
                style={hiddenInputStyle}
                id="resume-input"
              />
              <label htmlFor="resume-input" style={customFileInputStyle}>
                <Upload size={20} />
                <div style={fileInputTextStyle}>
                  <span style={fileInputMainTextStyle}>
                    {resume ? resume.name : "Choose resume file"}
                  </span>
                  <span style={fileInputSubTextStyle}>
                    PDF or TXT up to 10MB
                  </span>
                </div>
              </label>
            </div>

            {resume && (
              <div style={fileSelectedStyle}>
                <CheckCircle2 size={16} style={{ color: "#10b981" }} />
                <span>File selected: {resume.name}</span>
              </div>
            )}
          </div>

          {/* Job Description Upload */}
          <div style={uploadSectionStyle}>
            <label style={labelStyle}>
              <div style={labelHeaderStyle}>
                <div style={labelIconStyle}>
                  <Briefcase size={16} />
                </div>
                <span>Job Description</span>
              </div>
              <span style={labelSubtextStyle}>PDF OR TXT</span>
            </label>
            
            <div style={fileInputWrapperStyle}>
              <input
                type="file"
                accept=".pdf,.txt"
                onChange={(e) => setJob(e.target.files?.[0] || null)}
                style={hiddenInputStyle}
                id="job-input"
              />
              <label htmlFor="job-input" style={customFileInputStyle}>
                <Upload size={20} />
                <div style={fileInputTextStyle}>
                  <span style={fileInputMainTextStyle}>
                    {job ? job.name : "Choose job description"}
                  </span>
                  <span style={fileInputSubTextStyle}>
                    PDF or TXT up to 10MB
                  </span>
                </div>
              </label>
            </div>

            {job && (
              <div style={fileSelectedStyle}>
                <CheckCircle2 size={16} style={{ color: "#10b981" }} />
                <span>File selected: {job.name}</span>
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={uploadResume} 
          disabled={loading} 
          style={{
            ...buttonStyle,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <>
              <div style={spinnerStyle} />
              Analyzing...
            </>
          ) : (
            <>
              Upload & Analyze
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>

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

      {/* Results Section */}
      {result && (
        <div style={resultsContainerStyle}>
          <div style={resultsHeaderStyle}>
            <h2 style={resultsHeadingStyle}>Analysis Report</h2>
            <button
              onClick={() => downloadReport(result.analysis)}
              style={downloadButtonStyle}
            >
              <Download size={16} />
              Download Report
            </button>
          </div>

          <div style={analysisCardStyle}>
            <div style={analysisContentStyle}>
              {result.analysis}
            </div>
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
  maxWidth: "800px",
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

const headingStyle: React.CSSProperties = {
  fontSize: 48,
  fontWeight: 700,
  marginBottom: 16,
  letterSpacing: "-0.02em",
  color: "#ffffff",
};

const accentTextStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const subheadingStyle: React.CSSProperties = {
  fontSize: 17,
  color: "#9ca3af",
  lineHeight: 1.7,
  maxWidth: "100%",
  margin: "0 auto",
};

const glassCardStyle: React.CSSProperties = {
  maxWidth: "1200px",
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

const uploadGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 28,
  marginBottom: 28,
};

const uploadSectionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
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

const fileInputWrapperStyle: React.CSSProperties = {
  position: "relative",
};

const hiddenInputStyle: React.CSSProperties = {
  display: "none",
};

const customFileInputStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  padding: "20px",
  borderRadius: 16,
  border: "2px dashed rgba(255, 255, 255, 0.2)",
  background: "rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(8px)",
  color: "#9ca3af",
  cursor: "pointer",
  transition: "all 0.3s ease",
  minHeight: "80px",
};

const fileInputTextStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  flex: 1,
};

const fileInputMainTextStyle: React.CSSProperties = {
  color: "#ffffff",
  fontSize: 15,
  fontWeight: 500,
};

const fileInputSubTextStyle: React.CSSProperties = {
  color: "#6b7280",
  fontSize: 13,
};

const fileSelectedStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 14px",
  borderRadius: 12,
  background: "rgba(16, 185, 129, 0.1)",
  border: "1px solid rgba(16, 185, 129, 0.3)",
  color: "#6ee7b7",
  fontSize: 13,
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 8,
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

const errorBoxStyle: React.CSSProperties = {
  maxWidth: "1200px",
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

const resultsContainerStyle: React.CSSProperties = {
  maxWidth: "1400px",
  margin: "56px auto 0 auto",
};

const resultsHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 28,
  paddingBottom: 20,
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
};

const resultsHeadingStyle: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  margin: 0,
  color: "#ffffff",
};

const downloadButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "12px 20px",
  borderRadius: 16,
  border: "1px solid rgba(255, 255, 255, 0.1)",
  background: "linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(239, 68, 68, 0.2), transparent)",
  backdropFilter: "blur(16px)",
  color: "#fff",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const analysisCardStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(239, 68, 68, 0.05), transparent)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 24,
  padding: 32,
  backdropFilter: "blur(12px)",
};

const analysisContentStyle: React.CSSProperties = {
  whiteSpace: "pre-wrap",
  color: "#d1d5db",
  fontSize: 15,
  lineHeight: 1.8,
  fontFamily: "inherit",
};