"use client";
import { ArrowRight } from "lucide-react";

export default function CTAComponent() {
  return (
    <section
      className="relative py-32 px-4 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FB6466 0%, #F94C4E 50%, #FB6466 100%)",
        clipPath:
          "polygon(10% 0, 30% 0, 35% 10%, 65% 10%, 70% 0, 90% 0, 90% 80%, 10% 80%)",
        boxShadow: "inset 0 0 120px rgba(251, 100, 102, 0.7), inset 0 0 80px rgba(249, 76, 78, 0.5), 0 25px 70px rgba(251, 100, 102, 0.4), 0 15px 50px rgba(249, 76, 78, 0.3)",
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-300/40 rounded-full mix-blend-overlay filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-red-400/30 rounded-full mix-blend-overlay filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-red-500/20 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Abstract Shapes with Roundness */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top-left rounded triangle */}
        <div className="absolute top-12 left-8 w-48 h-48 border-[3px] border-white/10 rotate-12 rounded-2xl"></div>
        
        {/* Right-center rounded hexagon */}
        <div className="absolute top-1/3 right-16 w-40 h-40 border-2 border-white/15 rotate-45 rounded-3xl"></div>
        
        {/* Bottom-left rounded polygon */}
        <div className="absolute bottom-32 left-24 w-32 h-32 border-[2px] border-white/20 rounded-full"></div>
        
        {/* Center rounded diamond */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-[3px] border-white/5 rotate-45 rounded-2xl"></div>
        
        {/* Top-right pill shape */}
        <div className="absolute top-24 right-32 w-24 h-20 border-2 border-white/25 rounded-full"></div>
        
        {/* Bottom-right rounded square */}
        <div className="absolute bottom-40 right-20 w-24 h-24 border-[2px] border-white/15 rotate-12 rounded-xl"></div>
        
        {/* Soft blobs */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 border border-white/30 rounded-[50%_30%_70%_30%] bg-white/5 blur-sm"></div>
        <div className="absolute top-3/4 right-1/3 w-12 h-12 border border-white/20 rotate-12 rounded-[40%_60%_60%_40%] bg-white/5"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 border border-white/25 rounded-[30%_70%_70%_30%] bg-white/5 blur-sm"></div>
        
        {/* Organic rounded shapes */}
        <div className="absolute top-16 right-40 w-28 h-28 border border-white/15 rounded-[60%_40%_30%_70%]"></div>
        <div className="absolute bottom-48 left-40 w-36 h-36 border border-white/10 rounded-[70%_30%_50%_50%] rotate-45"></div>
        <div className="absolute top-2/3 left-1/2 w-24 h-24 border border-white/20 rounded-[45%_55%_65%_35%]"></div>
        
        {/* Soft rounded corners on connecting lines */}
        <div className="absolute top-1/2 left-1/4 w-1/4 h-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-1/4 h-[1px] bg-gradient-to-l from-white/10 via-white/5 to-transparent rounded-full"></div>
        
        {/* Rounded capsule shapes */}
        <div className="absolute top-20 right-1/4 w-32 h-12 border border-white/10 rounded-full rotate-45"></div>
        <div className="absolute bottom-24 left-1/4 w-40 h-16 border border-white/15 rounded-full -rotate-12"></div>
        
        {/* Soft rounded overlays */}
        <div className="absolute top-10 left-1/2 w-64 h-32 border border-white/5 rounded-[100%] blur-sm"></div>
        <div className="absolute bottom-20 right-10 w-48 h-24 border border-white/5 rounded-[100%] blur-sm"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Content container */}
        <div className="relative p-8 md:p-12">
          {/* Inner content container */}
          <div className="text-center max-w-3xl mx-auto">
            {/* Heading */}
            <h2 className="font-geist mx-auto text-center text-3xl md:text-5xl tracking-tighter leading-tight">
              <span className="inline-block bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
                Start with an{" "}
              </span>
              <span className="inline-block ml-2 bg-gradient-to-r from-white via-red-50 to-red-100 bg-clip-text text-transparent">
                Automation Audit
              </span>
            </h2>

            <p className="text-white/95 text-lg max-w-2xl mx-auto mt-3 mb-6 text-center">
              We begin with a focused audit to understand your workflows and
              recommend the right automation approach.
            </p>

            {/* CTA Button */}
            <div className="flex items-center justify-center">
              <a
                href="/ai-agents"
                className="group inline-flex items-center gap-3 rounded-full border border-white/40 bg-gradient-to-tr from-white/20 via-white/10 to-transparent backdrop-blur-md px-8 py-4 text-white font-semibold transition-all hover:border-white/60 hover:bg-white/25 hover:shadow-lg hover:shadow-white/10"
              >
                Enroll Now
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-white/90 to-red-100/90 transition-transform duration-300 group-hover:-rotate-45 shadow-md">
                  <ArrowRight className="h-4 w-4 text-red-600" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 