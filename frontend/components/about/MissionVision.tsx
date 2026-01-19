'use client';
import React, { useEffect, useState } from 'react';
import { Sparkles, Target, Zap, Eye, Rocket } from "lucide-react";
import Container from '@/components/shared/Container';

type Dot = {
  left: string;
  top: string;
  width: string;
  height: string;
  animationDelay: string;
};

type Sparkle = {
  left: string;
  top: string;
  animationDelay: string;
};

export default function MissionVision() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Generate particle dots only on the client to avoid SSR hydration mismatch
    const generatedDots: Dot[] = Array.from({ length: 30 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      animationDelay: `${Math.random() * 5}s`,
    }));
    setDots(generatedDots);

    const generatedSparkles: Sparkle[] = Array.from({ length: 10 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
    }));
    setSparkles(generatedSparkles);
  }, []);

  // Don't render animations during SSR
  if (!isMounted) {
    return (
      <div className="relative w-full bg-neutral-950 min-h-[600px]">
        <div className="absolute inset-0 animate-pulse bg-neutral-900/20"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-neutral-950 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 z-[0] overflow-hidden">
        {/* Particle dots */}
        <div className="absolute inset-0">
          {dots.map((dot, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10 animate-float"
              style={{
                left: dot.left,
                top: dot.top,
                width: dot.width,
                height: dot.height,
                animationDelay: dot.animationDelay,
              }}
            />
          ))}
        </div>

        {/* Animated grid */}
        <div className="pointer-events-none absolute h-full w-full overflow-hidden opacity-20 [perspective:300px]">
          <div className="absolute inset-0 [transform:rotateX(25deg)]">
            <div className="animate-grid-slow [inset:0%_0px] [margin-left:-50%] [height:300vh] [width:600vw] [transform-origin:100%_0_0] [background-image:linear-gradient(to_right,rgba(239,68,68,0.15)_1px,transparent_0),linear-gradient(to_bottom,rgba(251,146,60,0.1)_1px,transparent_0)] [background-size:80px_80px] [background-repeat:repeat]"></div>
          </div>
        </div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64">
          <div className="absolute inset-0 animate-pulse-slow">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/5 to-orange-500/5 blur-3xl"></div>
          </div>
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96">
          <div className="absolute inset-0 animate-pulse-slower">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/5 to-red-500/5 blur-3xl"></div>
          </div>
        </div>
      </div>

      <section className="relative z-[1]">
        <Container>
          <div className="relative z-10 mx-auto max-w-screen-xl gap-12 px-4 py-12 md:py-16 md:px-8">
            {/* Animated Header */}
            <div className="mx-auto max-w-3xl text-center mb-12">
              <div className="inline-block mb-6">
                <div className="group relative inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-gradient-to-tr from-zinc-300/5 via-red-400/10 to-transparent px-6 py-3 text-sm text-gray-300 backdrop-blur-sm overflow-hidden">
                  <Sparkles className="h-4 w-4 animate-pulse text-red-400" />
                  <span>Purpose & Direction</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
              
              <h2 className="mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] bg-clip-text text-3xl tracking-tight text-transparent md:text-4xl lg:text-5xl mb-4 animate-fade-in-up">
                Why We Exist
              </h2>
              
              <div className="relative mx-auto max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 blur-2xl opacity-0 animate-glow-pulse"></div>
                <p className="relative text-base md:text-lg text-gray-300 leading-relaxed">
                  The gap between intent and execution is where we work
                </p>
                <div className="mt-3 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              </div>
            </div>

            {/* Animated Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Vision Card */}
              <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
                
                <div className="relative rounded-xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 p-6 backdrop-blur-sm h-full overflow-hidden">
                  {/* Card Content */}
                  <div className="relative z-10">
                    {/* Animated Icon */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 group-hover:scale-110 transition-transform duration-300">
                          <Eye className="w-6 h-6 text-red-400 animate-pulse-slow" />
                        </div>
                        <div className="absolute -inset-2 rounded-full border border-red-500/20 animate-ping-slow"></div>
                      </div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-red-300 to-orange-200 bg-clip-text text-transparent">
                        Our Vision
                      </h3>
                    </div>
                    
                    <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                      To build automation-driven operating systems that help businesses 
                      become predictable, scalable, and resilient. We envision a future 
                      where businesses do not worry about missed messages, forgotten 
                      follow-ups, or operational chaos.
                    </p>
                    
                    {/* Animated Progress Bar */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs md:text-sm text-gray-400">Future Readiness</span>
                        <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">95%</span>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full animate-progress"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mission Card */}
              <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
                
                <div className="relative rounded-xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 p-6 backdrop-blur-sm h-full overflow-hidden">
                  {/* Floating Sparkles */}
                  <div className="absolute inset-0">
                    {sparkles.map((s, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-r from-orange-400/30 to-red-400/30 animate-sparkle"
                        style={{
                          left: s.left,
                          top: s.top,
                          width: '2px',
                          height: '2px',
                          animationDelay: s.animationDelay,
                        }}
                      />
                    ))}
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    {/* Animated Icon */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                          <Rocket className="w-6 h-6 text-orange-400 animate-bounce-slow" />
                        </div>
                        <div className="absolute -inset-2 rounded-full border border-orange-500/20 animate-ping-slower"></div>
                      </div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-orange-300 to-red-200 bg-clip-text text-transparent">
                        Our Mission
                      </h3>
                    </div>
                    
                    <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                      To design and implement automation systems that eliminate manual 
                      inefficiencies, reduce dependency on human memory, and directly 
                      improve business outcomes such as response time, conversion rates, 
                      and operational clarity.
                    </p>
                    
                    {/* Animated Progress Bar */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs md:text-sm text-gray-400">Mission Impact</span>
                        <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-orange-400 to-red-300 bg-clip-text text-transparent">98%</span>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-0 bg-gradient-to-r from-orange-500 to-red-400 rounded-full group-hover:w-full transition-all duration-1000 delay-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Stats Section */}
            <div className="relative mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 blur-3xl opacity-0 animate-glow-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: "5 min", label: "Critical response window", icon: <Zap className="w-4 h-4 md:w-5 md:h-5" /> },
                  { value: "400%+", label: "Higher conversion probability", icon: <Target className="w-4 h-4 md:w-5 md:h-5" /> },
                  { value: "50%+", label: "Businesses miss the window", icon: <Sparkles className="w-4 h-4 md:w-5 md:h-5" /> },
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    className="group relative text-center p-4 md:p-5 rounded-lg border border-white/5 bg-neutral-900/30 backdrop-blur-sm hover:bg-neutral-900/50 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${0.9 + index * 0.1}s` }}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-orange-500/0 to-red-500/0 group-hover:via-orange-500/5 group-hover:to-red-500/0 rounded-lg transition-all duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10 mb-3 group-hover:scale-110 transition-transform duration-300">
                        <div className="text-red-400 group-hover:text-orange-300 transition-colors duration-300">
                          {stat.icon}
                        </div>
                      </div>
                      <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent mb-1 group-hover:scale-105 transition-transform duration-300">
                        {stat.value}
                      </div>
                      <div className="text-xs md:text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative connecting line */}
            <div className="relative mt-10">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
              <div className="relative flex justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-neutral-900/50 backdrop-blur-sm rounded-full border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-xs md:text-sm text-gray-400">Driving measurable impact</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.5;
          }
          33% {
            transform: translateY(-15px) translateX(10px);
            opacity: 0.8;
          }
          66% {
            transform: translateY(8px) translateX(-10px);
            opacity: 0.3;
          }
        }

        @keyframes grid-slow {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(60px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-slower {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes ping-slower {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        .animate-float {
          animation: float 20s linear infinite;
        }

        .animate-grid-slow {
          animation: grid-slow 30s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 4s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2s ease-out infinite;
        }

        .animate-ping-slower {
          animation: ping-slower 3s ease-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        .animate-progress {
          animation: progress 1.5s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}