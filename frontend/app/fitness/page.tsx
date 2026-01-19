"use client";

import { useState } from "react";
import { Dumbbell, User, Ruler, Scale, Activity, Utensils, Target, ArrowRight, AlertCircle, Sparkles, Download, ToggleLeft } from "lucide-react";

export default function FitnessPlannerPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);

  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const [form, setForm] = useState({
    age: 21,
    height: 182, // cm
    weight: 50,  // kg
    sex: "Male",
    activity_level: "Lightly Active",
    dietary_preferences: "Vegetarian",
    fitness_goals: "Gain Muscle",
  });

  // ---------- CONVERSIONS ----------
  function convertToMetric() {
    if (unit === "imperial") {
      return {
        ...form,
        height: Math.round(form.height * 30.48), // ft → cm
        weight: Math.round(form.weight * 0.453592), // lb → kg
      };
    }
    return form;
  }

  // ---------- DOWNLOAD ----------
  function downloadReport() {
    if (!result) return;

    const content = `
AI FITNESS PLANNER REPORT

--- DIETARY PLAN ---
${result.dietary_plan}

--- FITNESS PLAN ---
${result.fitness_plan}
`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "fitness_plan_report.txt";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ---------- API CALL ----------
  async function generatePlan() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const payload = convertToMetric();

      const res = await fetch(
        "http://localhost:5000/api/agents/fitness-plan",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");

      setResult(data);
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
          <Dumbbell size={40} strokeWidth={1.5} style={{ color: "#ef4444" }} />
        </div>
        <h2 className="font-geist mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] bg-clip-text text-4xl tracking-tighter text-transparent md:text-6xl">
              Fitness{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-200 bg-clip-text text-transparent">
                Planner 
              </span>
            </h2>
        <p style={subheadingStyle}>
          Get personalized fitness and dietary plans powered by AI. Enter your details to receive a customized workout routine and meal plan.
        </p>
      </div>

      {/* Input Section - Glass Card */}
      <div style={glassCardStyle}>
        {/* Unit Selector */}
        <div style={unitSelectorStyle}>
          <label style={labelStyle}>
            <div style={labelHeaderStyle}>
              <div style={labelIconStyle}>
                <ToggleLeft size={16} />
              </div>
              <span>Measurement Units</span>
            </div>
            <span style={labelSubtextStyle}>SYSTEM</span>
          </label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as any)}
            style={selectStyle}
          >
            <option value="metric">Metric (cm / kg)</option>
            <option value="imperial">Imperial (ft / lbs)</option>
          </select>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              <div style={labelHeaderStyle}>
                <div style={labelIconStyle}>
                  <User size={16} />
                </div>
                <span>Age</span>
              </div>
              <span style={labelSubtextStyle}>YEARS</span>
            </label>
            <input
              type="number"
              placeholder="21"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: +e.target.value })}
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              <div style={labelHeaderStyle}>
                <div style={labelIconStyle}>
                  <Ruler size={16} />
                </div>
                <span>Height</span>
              </div>
              <span style={labelSubtextStyle}>
                {unit === "metric" ? "CM" : "FT"}
              </span>
            </label>
            <input
              type="number"
              placeholder={unit === "metric" ? "182" : "6"}
              value={form.height}
              onChange={(e) => setForm({ ...form, height: +e.target.value })}
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              <div style={labelHeaderStyle}>
                <div style={labelIconStyle}>
                  <Scale size={16} />
                </div>
                <span>Weight</span>
              </div>
              <span style={labelSubtextStyle}>
                {unit === "metric" ? "KG" : "LBS"}
              </span>
            </label>
            <input
              type="number"
              placeholder={unit === "metric" ? "50" : "110"}
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: +e.target.value })}
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              <div style={labelHeaderStyle}>
                <div style={labelIconStyle}>
                  <User size={16} />
                </div>
                <span>Sex</span>
              </div>
              <span style={labelSubtextStyle}>GENDER</span>
            </label>
            <select
              value={form.sex}
              onChange={(e) => setForm({ ...form, sex: e.target.value })}
              style={selectStyle}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              <div style={labelHeaderStyle}>
                <div style={labelIconStyle}>
                  <Activity size={16} />
                </div>
                <span>Activity Level</span>
              </div>
              <span style={labelSubtextStyle}>DAILY</span>
            </label>
            <select
              value={form.activity_level}
              onChange={(e) =>
                setForm({ ...form, activity_level: e.target.value })
              }
              style={selectStyle}
            >
              <option>Sedentary</option>
              <option>Lightly Active</option>
              <option>Moderately Active</option>
              <option>Very Active</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              <div style={labelHeaderStyle}>
                <div style={labelIconStyle}>
                  <Utensils size={16} />
                </div>
                <span>Dietary Preferences</span>
              </div>
              <span style={labelSubtextStyle}>DIET TYPE</span>
            </label>
            <select
              value={form.dietary_preferences}
              onChange={(e) =>
                setForm({ ...form, dietary_preferences: e.target.value })
              }
              style={selectStyle}
            >
              <option>Vegetarian</option>
              <option>Keto</option>
              <option>Low Carb</option>
              <option>Dairy Free</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              <div style={labelHeaderStyle}>
                <div style={labelIconStyle}>
                  <Target size={16} />
                </div>
                <span>Fitness Goals</span>
              </div>
              <span style={labelSubtextStyle}>OBJECTIVE</span>
            </label>
            <select
              value={form.fitness_goals}
              onChange={(e) =>
                setForm({ ...form, fitness_goals: e.target.value })
              }
              style={selectStyle}
            >
              <option>Lose Weight</option>
              <option>Gain Muscle</option>
              <option>Stay Fit</option>
              <option>Endurance</option>
            </select>
          </div>
        </div>

        <button 
          onClick={generatePlan} 
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
              Generating Plan...
            </>
          ) : (
            <>
              Generate Personalized Plan
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
          {/* Download Button at Top */}
          <div style={downloadHeaderStyle}>
            <button onClick={downloadReport} style={downloadButtonStyle}>
              <Download size={16} />
              Download Report
            </button>
          </div>

          {/* Dietary Plan */}
          <div style={planSectionStyle}>
            <div style={planHeaderStyle}>
              <div style={planHeaderLeftStyle}>
                <Utensils size={24} style={{ color: "#ef4444" }} />
                <h2 style={planHeadingStyle}>Dietary Plan</h2>
              </div>
              <div style={badgeStyle}>
                <Sparkles size={14} />
                Personalized
              </div>
            </div>

            <div style={planCardStyle}>
              <div style={planContentStyle}>
                {result.dietary_plan}
              </div>
            </div>
          </div>

          {/* Fitness Plan */}
          <div style={planSectionStyle}>
            <div style={planHeaderStyle}>
              <div style={planHeaderLeftStyle}>
                <Dumbbell size={24} style={{ color: "#ef4444" }} />
                <h2 style={planHeadingStyle}>Fitness Plan</h2>
              </div>
              <div style={badgeStyle}>
                <Sparkles size={14} />
                Personalized
              </div>
            </div>

            <div style={planCardStyle}>
              <div style={planContentStyle}>
                {result.fitness_plan}
              </div>
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

const unitSelectorStyle: React.CSSProperties = {
  marginBottom: 32,
  paddingBottom: 24,
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
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

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none" as const,
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23fff' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 18px center",
  paddingRight: "45px",
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
  display: "flex",
  flexDirection: "column",
  gap: 40,
};

const downloadHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: 24,
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

const planSectionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const planHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 24,
  paddingBottom: 16,
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  flexWrap: "wrap",
  gap: 16,
};

const planHeaderLeftStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const planHeadingStyle: React.CSSProperties = {
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

const planCardStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(239, 68, 68, 0.05), transparent)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 24,
  padding: 32,
  backdropFilter: "blur(12px)",
};

const planContentStyle: React.CSSProperties = {
  whiteSpace: "pre-wrap",
  color: "#d1d5db",
  fontSize: 15,
  lineHeight: 1.8,
  fontFamily: "inherit",
};