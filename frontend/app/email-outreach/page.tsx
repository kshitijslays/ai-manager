"use client";

import { useState } from "react";
import {
  Mail,
  Building2,
  Briefcase,
  User,
  AtSign,
  Link,
  FileText,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Users,
  Send,
  Eye,
  SkipForward,
  MessageSquare
} from "lucide-react";

type Draft = {
  name: string;
  email: string;
  niche: string;
  email_body: string;
};

export default function EmailOutreachPage() {
  const [sheetUrl, setSheetUrl] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [service, setService] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [drafts, setDrafts] = useState<Draft[]>([]);

  // ---------------- PREVIEW (NO SEND) ----------------
  async function generatePreview() {
    if (!sheetUrl || !companyUrl || !service || !senderName || !senderEmail) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError("");
    setDrafts([]);

    try {
      const res = await fetch(
        "http://127.0.0.1:8004/generate-bulk-emails-from-google-sheet-preview",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sheet_url: sheetUrl,
            company_url: companyUrl,
            service_offered: service,
            sender_name: senderName,
            sender_email: senderEmail,
            max_pages: 1,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Preview failed");

      setDrafts(data.drafts);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ---------------- SEND APPROVED ----------------
  async function sendEmail(draft: Draft, index: number) {
    setSending(draft.email);

    try {
      const res = await fetch(
        "http://127.0.0.1:8004/send-approved-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sender_name: senderName,
            sender_email: senderEmail,
            receiver_email: draft.email,
            email_body: draft.email_body,
            niche: draft.niche,
          }),
        }
      );

      if (!res.ok) throw new Error("Send failed");

      // remove sent draft
      setDrafts((prev) => prev.filter((_, i) => i !== index));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSending(null);
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
          <MessageSquare size={40} strokeWidth={1.5} style={{ color: "#ef4444" }} />
        </div>
        <h2 className="font-geist mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] bg-clip-text text-4xl tracking-tighter text-transparent md:text-6xl">
              Email{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-200 bg-clip-text text-transparent">
                Review & Send
              </span>
            </h2>
        <p style={subheadingStyle}>
          Generate AI-powered email drafts from Google Sheets, review each one, and send individually.
        </p>
      </div>

      {/* Form Section - Glass Card */}
      <div style={glassCardStyle}>
        <div style={sectionHeaderStyle}>
          <div style={sectionIconStyle}>
            <Link size={24} style={{ color: "#ef4444" }} />
          </div>
          <div>
            <h3 style={sectionTitleStyle}>Google Sheet & Company Details</h3>
            <p style={sectionSubtitleStyle}>Provide the sheet URL and your company information</p>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              <div style={labelHeaderStyle}>
                <div style={labelIconStyle}>
                  <Link size={16} />
                </div>
                <span>Google Sheet URL</span>
              </div>
              <span style={labelSubtextStyle}>BULK DATA SOURCE</span>
            </label>
            <input
              type="text"
              placeholder="https://docs.google.com/spreadsheets/..."
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              style={inputStyle}
            />
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

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              <div style={labelHeaderStyle}>
                <div style={labelIconStyle}>
                  <User size={16} />
                </div>
                <span>Your Name</span>
              </div>
              <span style={labelSubtextStyle}>SENDER</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              <div style={labelHeaderStyle}>
                <div style={labelIconStyle}>
                  <AtSign size={16} />
                </div>
                <span>Your Email</span>
              </div>
              <span style={labelSubtextStyle}>FROM</span>
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <button
          onClick={generatePreview}
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
              Generating Preview...
            </>
          ) : (
            <>
              <Eye size={18} />
              Generate Preview
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

      {/* Preview List */}
      {drafts.length > 0 && (
        <div style={previewContainerStyle}>
          <div style={previewHeaderStyle}>
            <div style={previewHeaderLeftStyle}>
              <Sparkles size={24} style={{ color: "#ef4444" }} />
              <h2 style={previewTitleStyle}>Review & Send Emails</h2>
            </div>
            <div style={badgeStyle}>
              <Users size={14} />
              {drafts.length} Draft{drafts.length !== 1 ? 's' : ''}
            </div>
          </div>

          <p style={previewSubtitleStyle}>
            Review each AI-generated email, edit if needed, then approve to send or skip.
          </p>

          <div style={draftsContainerStyle}>
            {drafts.map((d, i) => (
              <div key={i} style={draftCardStyle}>
                <div style={draftHeaderStyle}>
                  <div style={draftRecipientStyle}>
                    <div style={draftRecipientIconStyle}>
                      <User size={16} />
                    </div>
                    <div>
                      <div style={draftNameStyle}>{d.name}</div>
                      <div style={draftEmailStyle}>{d.email}</div>
                    </div>
                  </div>
                  <div style={draftNicheStyle}>
                    <span style={draftNicheBadgeStyle}>{d.niche}</span>
                  </div>
                </div>

                <textarea
                  rows={8}
                  value={d.email_body}
                  onChange={(e) => {
                    const copy = [...drafts];
                    copy[i].email_body = e.target.value;
                    setDrafts(copy);
                  }}
                  style={draftTextareaStyle}
                />

                <div style={draftActionsStyle}>
                  <button
                    onClick={() => sendEmail(d, i)}
                    disabled={sending === d.email}
                    style={{
                      ...sendButtonStyle,
                      opacity: sending === d.email ? 0.6 : 1,
                      cursor: sending === d.email ? "not-allowed" : "pointer",
                    }}
                  >
                    {sending === d.email ? (
                      <>
                        <div style={smallSpinnerStyle} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Approve & Send
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setDrafts(drafts.filter((_, idx) => idx !== i))}
                    style={skipButtonStyle}
                  >
                    <SkipForward size={16} />
                    Skip
                  </button>
                </div>
              </div>
            ))}
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

const inputGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 24,
  marginBottom: 28,
};

const inputGroupStyle: React.CSSProperties = {
  marginBottom: 0,
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

const previewContainerStyle: React.CSSProperties = {
  maxWidth: "1400px",
  margin: "56px auto 0 auto",
};

const previewHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 20,
  paddingBottom: 20,
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  flexWrap: "wrap",
  gap: 16,
};

const previewHeaderLeftStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const previewTitleStyle: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  margin: 0,
  color: "#ffffff",
};

const previewSubtitleStyle: React.CSSProperties = {
  fontSize: 15,
  color: "#9ca3af",
  lineHeight: 1.7,
  marginBottom: 32,
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

const draftsContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 24,
};

const draftCardStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(239, 68, 68, 0.05), transparent)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 24,
  padding: 32,
  backdropFilter: "blur(12px)",
};

const draftHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 24,
  flexWrap: "wrap",
  gap: 16,
};

const draftRecipientStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const draftRecipientIconStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  borderRadius: "50%",
  background: "rgba(239, 68, 68, 0.15)",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  color: "#ef4444",
};

const draftNameStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: "#ffffff",
  marginBottom: 2,
};

const draftEmailStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#9ca3af",
};

const draftNicheStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const draftNicheBadgeStyle: React.CSSProperties = {
  padding: "6px 12px",
  borderRadius: 20,
  background: "rgba(59, 130, 246, 0.15)",
  border: "1px solid rgba(59, 130, 246, 0.3)",
  fontSize: 12,
  fontWeight: 600,
  color: "#60a5fa",
  backdropFilter: "blur(8px)",
};

const draftTextareaStyle: React.CSSProperties = {
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
  marginBottom: 24,
  transition: "all 0.3s ease",
};

const draftActionsStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "center",
};

const sendButtonStyle: React.CSSProperties = {
  padding: "12px 24px",
  borderRadius: 16,
  border: "1px solid rgba(16, 185, 129, 0.3)",
  background: "linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.2), transparent)",
  backdropFilter: "blur(16px)",
  color: "#6ee7b7",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  flex: 1,
};

const skipButtonStyle: React.CSSProperties = {
  padding: "12px 24px",
  borderRadius: 16,
  border: "1px solid rgba(255, 255, 255, 0.1)",
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(8px)",
  color: "#9ca3af",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  flex: 1,
};

const smallSpinnerStyle: React.CSSProperties = {
  width: 16,
  height: 16,
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderTop: "2px solid #6ee7b7",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};