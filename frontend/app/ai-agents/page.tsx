"use client";

import { FileText, Search, Mail, MessageCircle, Activity, Pill } from "lucide-react";

export default function AIAgentsHub() {
  const agents = [
    {
      id: "resume-matcher",
      title: "Resume Matcher",
      description: "AI-powered resume analysis & job compatibility",
      icon: FileText,
      gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      href: "/resume-matcher",
      imageGradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.8), rgba(220, 38, 38, 0.6))",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
    },
    {
      id: "web-scraper",
      title: "Web Scraper",
      description: "Intelligent data extraction from any website",
      icon: Search,
      gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      href: "/web-scraper",
      imageGradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.6))",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
    {
      id: "email-outreach",
      title: "Email Outreach",
      description: "Personalized AI-generated outreach emails",
      icon: Mail,
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      href: "/email-outreach",
      imageGradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(124, 58, 237, 0.6))",
      image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&q=80",
    },
    {
      id: "whatsapp-outreach",
      title: "WhatsApp Outreach",
      description: "Send personalized WhatsApp messages instantly",
      icon: MessageCircle,
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      href: "/whatsapp",
      imageGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(5, 150, 105, 0.6))",
      image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80",
    },
    {
      id: "fitness-report",
      title: "Fitness Report",
      description: "AI-generated personalized fitness analysis & recommendations",
      icon: Activity,
      gradient: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
      href: "/fitness",
      imageGradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.8), rgba(190, 24, 93, 0.6))",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zml0bmVzc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "pharma-ai",
      title: "Pharma AI",
      description: "Drug interaction analysis & pharmaceutical insights",
      icon: Pill,
      gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
      href: "/pharma",
      imageGradient: "linear-gradient(135deg, rgba(6, 182, 212, 0.8), rgba(8, 145, 178, 0.6))",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    },
  ];

  return (
    <div style={containerStyle}>
      {/* Spotlight effect */}
      <div style={spotlightStyle} />
      
      {/* Thin divider line */}
      <div style={dividerStyle} />

      {/* Header Section */}
      <div style={headerContainerStyle}>
        <h2 className="font-geist mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] bg-clip-text text-4xl tracking-tighter text-transparent md:text-6xl">
              Featured{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-200 bg-clip-text text-transparent">
                AI Agents
              </span>
            </h2>
        <p style={subheadingStyle}>
          Choose an AI agent to automate your workflow
        </p>
      </div>

      {/* Agents Row */}
      <div style={agentsRowStyle}>
        {agents.map((agent) => {
          const IconComponent = agent.icon;
          return (
            <a
              key={agent.id}
              href={agent.href}
              style={agentCardStyle}
              onMouseEnter={(e) => {
                const card = e.currentTarget as HTMLElement;
                card.style.transform = "translateY(-8px)";
                card.style.borderColor = "rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget as HTMLElement;
                card.style.transform = "translateY(0)";
                card.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            >
              {/* Background Image Area with Gradient Overlay */}
              <div style={{
                ...imageAreaStyle,
                backgroundImage: `${agent.imageGradient}, url(${agent.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "overlay",
              }}>
                {/* Icon in center */}
                <div style={iconCircleStyle}>
                  <IconComponent size={48} strokeWidth={1.5} style={{ color: "#ffffff" }} />
                </div>
              </div>

              {/* Content Area */}
              <div style={contentAreaStyle}>
                <h3 style={titleStyle}>{agent.title}</h3>
                <p style={descriptionStyle}>{agent.description}</p>
              </div>
            </a>
          );
        })}
      </div>
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
  width: "1000px",
  height: "600px",
  background: "radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(236, 72, 153, 0.1) 70%, rgba(6, 182, 212, 0.1) 90%, transparent 100%)",
  pointerEvents: "none",
  filter: "blur(100px)",
};

const dividerStyle: React.CSSProperties = {
  width: "100%",
  height: "1px",
  background: "linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.5), rgba(236, 72, 153, 0.5), rgba(6, 182, 212, 0.5), transparent)",
  marginBottom: 56,
};

const headerContainerStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: 64,
  maxWidth: "800px",
  margin: "0 auto 64px auto",
};

const subheadingStyle: React.CSSProperties = {
  fontSize: 18,
  color: "#9ca3af",
  lineHeight: 1.7,
  marginTop: "16px",
};

const agentsRowStyle: React.CSSProperties = {
  maxWidth: "1400px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 32,
  padding: "0 20px",
};

const agentCardStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(239, 68, 68, 0.05), rgba(236, 72, 153, 0.05), rgba(6, 182, 212, 0.05), transparent)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 24,
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  height: "400px",
};

const imageAreaStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "280px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
};

const iconCircleStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
};

const contentAreaStyle: React.CSSProperties = {
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  background: "rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(8px)",
  flex: 1,
};

const titleStyle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  margin: 0,
  color: "#ffffff",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.6,
  color: "#9ca3af",
  margin: 0,
};