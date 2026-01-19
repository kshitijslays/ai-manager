"use client";

import { useState } from "react";
import { MessageCircle, Phone, Building2, Briefcase, ArrowRight, CheckCircle2, AlertCircle, Send, Edit3 } from "lucide-react";

export default function WhatsAppPage() {
  const [receiver, setReceiver] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function generateMessage() {
    setLoading(true);
    setStatus("");
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8005/whatsapp-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_url: companyUrl,
          service_offered: service,
          sender_name: "Kshitij",
          sender_email: "rajkshitij876@gmail.com",
          max_pages: 1,
        }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err: any) {
      setError(err.message || "Failed to generate message");
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage() {
    setSending(true);
    setStatus("");
    setError("");

    try {
      await fetch("http://127.0.0.1:8005/whatsapp-send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiver_whatsapp: receiver,
          message,
        }),
      });

      setStatus("Message sent successfully ✅");
    } catch (err: any) {
      setError(err.message || "Failed to send message");
    } finally {
      setSending(false);
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
          <MessageCircle size={40} strokeWidth={1.5} style={{ color: "#ef4444" }} />
        </div>
        <h2 className="font-geist mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] bg-clip-text text-4xl tracking-tighter text-transparent md:text-6xl">
              Whatsapp{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-200 bg-clip-text text-transparent">
                Outreach 
              </span>
            </h2>
        <p style={subheadingStyle}>
          Generate and send personalized WhatsApp messages powered by AI. Research company information and reach out directly via WhatsApp.
        </p>
      </div>

      {/* Input Section - Glass Card */}
      <div style={glassCardStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>
            <div style={labelHeaderStyle}>
              <div style={labelIconStyle}>
                <Phone size={16} />
              </div>
              <span>Receiver WhatsApp Number</span>
            </div>
            <span style={labelSubtextStyle}>WITH COUNTRY CODE</span>
          </label>
          <input
            type="text"
            placeholder="whatsapp:+911234567890"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            style={inputStyle}
          />
          <div style={hintStyle}>
            Format: whatsapp:+[country code][number] (e.g., whatsapp:+911234567890)
          </div>
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>
            <div style={labelHeaderStyle}>
              <div style={labelIconStyle}>
                <Building2 size={16} />
              </div>
              <span>Company Website</span>
            </div>
            <span style={labelSubtextStyle}>TARGET URL</span>
          </label>
          <input
            type="text"
            placeholder="https://example.com"
            value={companyUrl}
            onChange={(e) => setCompanyUrl(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>
            <div style={labelHeaderStyle}>
              <div style={labelIconStyle}>
                <Briefcase size={16} />
              </div>
              <span>Service Offered</span>
            </div>
            <span style={labelSubtextStyle}>YOUR OFFERING</span>
          </label>
          <textarea
            placeholder="Describe the service or product you're offering..."
            value={service}
            onChange={(e) => setService(e.target.value)}
            style={textareaStyle}
          />
        </div>

        <button 
          onClick={generateMessage} 
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
              Generating...
            </>
          ) : (
            <>
              Generate Message
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

      {/* Review & Send Section */}
      {message && (
        <div style={resultsContainerStyle}>
          <div style={resultsHeaderStyle}>
            <div style={resultsHeaderLeftStyle}>
              <Edit3 size={24} style={{ color: "#ef4444" }} />
              <h2 style={resultsHeadingStyle}>Review & Edit Message</h2>
            </div>
            <div style={badgeStyle}>
              <CheckCircle2 size={14} />
              Draft Ready
            </div>
          </div>

          <div style={messageCardStyle}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={messageTextareaStyle}
            />
          </div>

          <button
            onClick={sendMessage}
            disabled={sending}
            style={{
              ...sendButtonStyle,
              opacity: sending ? 0.6 : 1,
              cursor: sending ? "not-allowed" : "pointer",
            }}
          >
            {sending ? (
              <>
                <div style={spinnerStyle} />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Send WhatsApp Message
              </>
            )}
          </button>
        </div>
      )}

      {/* Success State */}
      {status && (
        <div style={successBoxStyle}>
          <CheckCircle2 size={20} style={{ flexShrink: 0, color: "#10b981" }} />
          <div>
            <strong style={{ display: "block", marginBottom: 4 }}>Success</strong>
            {status}
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

const hintStyle: React.CSSProperties = {
  marginTop: 8,
  fontSize: 13,
  color: "#6b7280",
  fontStyle: "italic",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  height: 120,
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

const successBoxStyle: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "32px auto",
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  padding: 20,
  borderRadius: 16,
  background: "rgba(16, 185, 129, 0.1)",
  border: "1px solid rgba(16, 185, 129, 0.3)",
  color: "#6ee7b7",
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
  flexWrap: "wrap",
  gap: 16,
};

const resultsHeaderLeftStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
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

const messageCardStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(239, 68, 68, 0.05), transparent)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 24,
  padding: 32,
  backdropFilter: "blur(12px)",
  marginBottom: 24,
};

const messageTextareaStyle: React.CSSProperties = {
  width: "100%",
  minHeight: "200px",
  padding: 0,
  border: "none",
  background: "transparent",
  color: "#d1d5db",
  fontSize: 15,
  lineHeight: 1.8,
  fontFamily: "inherit",
  resize: "vertical" as const,
  outline: "none",
};

const sendButtonStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "400px",
  margin: "0 auto",
  padding: "16px 24px",
  borderRadius: 16,
  border: "1px solid rgba(239, 68, 68, 0.3)",
  background: "linear-gradient(to right, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.2), transparent)",
  backdropFilter: "blur(16px)",
  color: "#fca5a5",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
};