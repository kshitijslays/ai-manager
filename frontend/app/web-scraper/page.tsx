"use client";

import { useState } from "react";
import { Search, Target, Zap, CheckCircle2, AlertCircle, ExternalLink, ArrowRight, FileText, Heading } from "lucide-react";

export default function WebScraperPage() {
  const [url, setUrl] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runScraper() {
    if (!url || !goal) {
      alert("Please enter both URL and goal");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/agents/web-scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, goal }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.error || "Web scraper failed");
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
          <Search size={40} strokeWidth={1.5} style={{ color: "#ef4444" }} />
        </div>
         <h2 className="font-geist mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] bg-clip-text text-4xl tracking-tighter text-transparent md:text-6xl">
              Web Scraper{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-200 bg-clip-text text-transparent">
                AI Agent
              </span>
            </h2>
        <p style={subheadingStyle}>
          Intelligent web scraping powered by AI. Extract structured data from any website with natural language instructions.
        </p>
      </div>

      {/* Input Section - Glass Card */}
      <div style={glassCardStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>
            <div style={labelHeaderStyle}>
              <div style={labelIconStyle}>
                <Target size={16} />
              </div>
              <span>Website URL</span>
            </div>
            <span style={labelSubtextStyle}>TARGET SITE</span>
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://quotes.toscrape.com"
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>
            <div style={labelHeaderStyle}>
              <div style={labelIconStyle}>
                <Zap size={16} />
              </div>
              <span>Scraping Goal</span>
            </div>
            <span style={labelSubtextStyle}>WHAT TO EXTRACT</span>
          </label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Scrape all quotes across multiple pages, including author names and tags"
            style={textareaStyle}
          />
        </div>

        <button 
          onClick={runScraper} 
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
              Scraping in progress...
            </>
          ) : (
            <>
              Run Agent
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
            <h2 style={resultsHeadingStyle}>Extraction Results</h2>
            {result.pages_scraped && (
              <div style={badgeStyle}>
                <CheckCircle2 size={14} />
                {result.pages_scraped} {result.pages_scraped === 1 ? "page" : "pages"} scraped
              </div>
            )}
          </div>

          {Array.isArray(result?.data) ? (
            <div style={cardsContainerStyle}>
              {result.data.map((page: any, index: number) => (
                <div key={index} style={resultCardStyle}>
                  {/* Card number indicator */}
                  <div style={cardNumberStyle}>{String(index + 1).padStart(2, '0')}</div>
                  
                  {/* URL */}
                  <div style={urlContainerStyle}>
                    <span style={urlLabelStyle}>SOURCE</span>
                    <a 
                      href={page.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={urlStyle}
                    >
                      <ExternalLink size={14} style={{ flexShrink: 0 }} />
                      <span style={{ wordBreak: "break-all" }}>{page.url}</span>
                    </a>
                  </div>

                  {/* Content Grid */}
                  <div style={contentGridStyle}>
                    {/* Headings Section */}
                    {page.headings?.length > 0 && (
                      <div style={contentSectionStyle}>
                        <div style={sectionHeaderStyle}>
                          <Heading size={18} style={{ color: "#ef4444" }} />
                          <strong style={sectionTitleStyle}>Headings</strong>
                          <span style={countIndicatorStyle}>{page.headings.length}</span>
                        </div>
                        <div style={contentTextStyle}>
                          {page.headings.map((h: string, i: number) => (
                            <p key={i} style={textItemStyle}>
                              <span style={bulletStyle}>•</span>
                              {h}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Paragraphs Section */}
                    {page.paragraphs?.length > 0 && (
                      <div style={contentSectionStyle}>
                        <div style={sectionHeaderStyle}>
                          <FileText size={18} style={{ color: "#ef4444" }} />
                          <strong style={sectionTitleStyle}>Paragraphs</strong>
                          <span style={countIndicatorStyle}>
                            {page.paragraphs.length > 5 ? `5 of ${page.paragraphs.length}` : page.paragraphs.length}
                          </span>
                        </div>
                        <div style={contentTextStyle}>
                          {page.paragraphs.slice(0, 5).map((p: string, i: number) => (
                            <p key={i} style={paragraphItemStyle}>
                              {p}
                            </p>
                          ))}
                          {page.paragraphs.length > 5 && (
                            <p style={moreIndicatorStyle}>
                              + {page.paragraphs.length - 5} more paragraphs
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={rawDataContainerStyle}>
              <div style={rawDataHeaderStyle}>
                <AlertCircle size={16} style={{ color: "#fbbf24" }} />
                <span style={rawDataLabelStyle}>Unexpected Response Format</span>
              </div>
              <div style={rawDataDescStyle}>
                The response doesn't match the expected format. Here's the raw data:
              </div>
              <pre style={preStyle}>
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
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

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: 16,
  border: "1px solid rgba(255, 255, 255, 0.1)",
  background: "rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(8px)",
  color: "#fff",
  fontSize: 15,
  transition: "all 0.3s ease",
  outline: "none",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  height: 110,
  fontFamily: "inherit",
  resize: "vertical" as const,
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

const cardsContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 24,
};

const resultCardStyle: React.CSSProperties = {
  position: "relative",
  padding: 32,
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(239, 68, 68, 0.05), transparent)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 24,
  backdropFilter: "blur(12px)",
  transition: "all 0.3s ease",
};

const cardNumberStyle: React.CSSProperties = {
  position: "absolute",
  top: 24,
  right: 24,
  fontSize: 42,
  fontWeight: 700,
  color: "rgba(239, 68, 68, 0.15)",
  lineHeight: 1,
};

const urlContainerStyle: React.CSSProperties = {
  marginBottom: 28,
  paddingBottom: 24,
  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
};

const urlLabelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 600,
  color: "#6b7280",
  letterSpacing: "0.05em",
  marginBottom: 10,
};

const urlStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "#ef4444",
  textDecoration: "none",
  fontSize: 14,
  transition: "opacity 0.2s ease",
};

const contentGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 28,
};

const contentSectionStyle: React.CSSProperties = {
  background: "rgba(0, 0, 0, 0.2)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  borderRadius: 16,
  padding: 24,
};

const sectionHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 16,
  paddingBottom: 16,
  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: "#ffffff",
  flex: 1,
};

const countIndicatorStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "#9ca3af",
  background: "rgba(255, 255, 255, 0.05)",
  padding: "4px 10px",
  borderRadius: 12,
  border: "1px solid rgba(255, 255, 255, 0.1)",
};

const contentTextStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const textItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  margin: 0,
  color: "#d1d5db",
  fontSize: 15,
  lineHeight: 1.6,
};

const bulletStyle: React.CSSProperties = {
  color: "#ef4444",
  fontWeight: "bold",
  flexShrink: 0,
};

const paragraphItemStyle: React.CSSProperties = {
  margin: 0,
  color: "#d1d5db",
  fontSize: 15,
  lineHeight: 1.7,
  textAlign: "justify",
};

const moreIndicatorStyle: React.CSSProperties = {
  margin: "8px 0 0 0",
  color: "#9ca3af",
  fontSize: 13,
  fontStyle: "italic",
};

const rawDataContainerStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(239, 68, 68, 0.05), transparent)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 24,
  padding: 28,
  backdropFilter: "blur(12px)",
};

const rawDataHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 12,
};

const rawDataLabelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: "#fbbf24",
  letterSpacing: "0.05em",
};

const rawDataDescStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#9ca3af",
  marginBottom: 16,
  lineHeight: 1.6,
};

const preStyle: React.CSSProperties = {
  color: "#fbbf24",
  fontSize: 13,
  lineHeight: 1.6,
  overflow: "auto",
  margin: 0,
  fontFamily: "monospace",
  background: "rgba(0, 0, 0, 0.3)",
  padding: 16,
  borderRadius: 12,
  border: "1px solid rgba(255, 255, 255, 0.05)",
};