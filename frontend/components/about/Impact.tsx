'use client';
import { Zap, TrendingUp, Users, Clock, CheckCircle, ArrowRight } from "lucide-react";
import Container from '@/components/shared/Container';
import { useEffect, useState } from 'react';

export default function Impact() {
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Animate metrics
          const targets = [75, 400, 50, 100];
          const duration = 2000;
          const steps = 60;
          const increment = targets.map(target => target / steps);
          
          let current = [0, 0, 0, 0];
          const interval = setInterval(() => {
            current = current.map((val, idx) => {
              const newVal = val + increment[idx];
              return newVal >= targets[idx] ? targets[idx] : newVal;
            });
            
            setAnimatedValues(current.map(val => Math.round(val)));
            
            if (current.every((val, idx) => val >= targets[idx])) {
              clearInterval(interval);
            }
          }, duration / steps);
          
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.2 }
    );
    
    observer.observe(document.getElementById('impact-section')!);
    return () => observer.disconnect();
  }, []);

  const metrics = [
    {
      value: "60–80%",
      label: "Faster response times",
      icon: <Clock className="w-5 h-5" />,
      description: "Average reduction in lead response time",
      gradient: "from-red-400 to-orange-300"
    },
    {
      value: "400%+",
      label: "Higher conversion probability",
      icon: <TrendingUp className="w-5 h-5" />,
      description: "With instant response vs delayed",
      gradient: "from-orange-400 to-red-300"
    },
    {
      value: "50%",
      label: "Reduced manual workload",
      icon: <Users className="w-5 h-5" />,
      description: "Time saved on administrative tasks",
      gradient: "from-red-300 to-orange-200"
    },
    {
      value: "100%",
      label: "Follow-up consistency",
      icon: <CheckCircle className="w-5 h-5" />,
      description: "Automated follow-up completion rate",
      gradient: "from-orange-300 to-red-200"
    }
  ];

  const caseStudies = [
    {
      industry: "Marketing Agency",
      result: "Increased lead conversion by 320%",
      timeline: "Within 3 months"
    },
    {
      industry: "Healthcare Practice",
      result: "Reduced no-show rate by 65%",
      timeline: "First 90 days"
    },
    {
      industry: "Consulting Firm",
      result: "Decreased response time by 85%",
      timeline: "Immediate results"
    }
  ];

  return (
    <div id="impact-section" className="relative w-full bg-neutral-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-950/95"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96">
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

      <section className="relative z-10">
        <Container>
          <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
            {/* Header */}
            <div className="mx-auto max-w-4xl text-center mb-20">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full border border-white/10 backdrop-blur-sm mb-8 animate-fade-in">
                <Zap className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-sm font-medium text-gray-300 tracking-wider">MEASURABLE IMPACT</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6 animate-fade-in-up">
                Results That{" "}
                <span className="font-semibold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                  Matter
                </span>
              </h1>
              
              <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Well-designed automation delivers tangible results that transform business outcomes.
              </p>
            </div>

            {/* Animated Metrics Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {metrics.map((metric, index) => (
                <div 
                  key={index}
                  className="group relative animate-fade-in-up"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  
                  <div className="relative h-full rounded-xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-8 backdrop-blur-sm transition-all duration-500 group-hover:border-white/20 group-hover:scale-[1.02]">
                    {/* Icon */}
                    <div className={`mb-4 p-3 w-fit rounded-lg bg-gradient-to-r ${metric.gradient}/10 border border-white/5 transition-all duration-500 group-hover:scale-110`}>
                      <div className={`bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}>
                        {metric.icon}
                      </div>
                    </div>
                    
                    {/* Animated Value */}
                    <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent mb-2`}>
                      {isVisible ? metric.value : '0%'}
                    </div>
                    
                    {/* Label */}
                    <h3 className="text-lg font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-gray-100">
                      {metric.label}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                      {metric.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Impact Statement */}
            <div className="relative mb-20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/30 via-orange-500/30 to-red-500/30 blur-3xl opacity-50"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-red-400/40 via-orange-400/40 to-red-400/40 blur-xl"></div>
              
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/70 to-neutral-950/70 p-8 md:p-12 backdrop-blur-sm">
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8">
                    Across industries, businesses that implement structured lead automation 
                    report higher lead engagement, better visibility into sales pipelines, 
                    and reduced operational chaos.
                  </p>
                  
                  <div className="flex items-center justify-center gap-6">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-orange-300 animate-pulse"></div>
                    <div className="text-sm text-gray-400">Proven Results</div>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-300 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Studies */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-semibold text-white mb-4 animate-fade-in-up">
                  Real-World Results
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  Actual outcomes from businesses that implemented our automation systems.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {caseStudies.map((study, index) => (
                  <div 
                    key={index}
                    className="group relative animate-fade-in-up"
                    style={{ animationDelay: `${0.9 + index * 0.1}s` }}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                    
                    <div className="relative rounded-xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-6 backdrop-blur-sm transition-all duration-500 group-hover:border-white/20">
                      {/* Industry */}
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-400 mb-2">{study.industry}</div>
                        <div className="w-12 h-0.5 bg-gradient-to-r from-red-500 to-orange-400"></div>
                      </div>
                      
                      {/* Result */}
                      <h3 className="text-lg font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-gray-100">
                        {study.result}
                      </h3>
                      
                      {/* Timeline */}
                      <div className="mt-4 pt-4 border-t border-white/10 transition-colors duration-300 group-hover:border-white/20">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          {study.timeline}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROI Calculator Preview */}
            <div className="relative mb-20 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-8 backdrop-blur-sm">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left - ROI Preview */}
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-6">Potential ROI Impact</h3>
                    <div className="space-y-4">
                      {[
                        { label: "Monthly leads", value: "100 → 320" },
                        { label: "Response time", value: "4h → 5min" },
                        { label: "Conversion rate", value: "5% → 21%" },
                        { label: "Monthly revenue", value: "$5K → $21K" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                          <span className="text-gray-300">{item.label}</span>
                          <div className="text-lg font-semibold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right - CTA */}
                  <div className="lg:border-l lg:border-white/10 lg:pl-8">
                    <div className="h-full flex flex-col justify-center">
                      <p className="text-gray-400 mb-6">
                        Calculate your potential ROI with our automation solutions.
                      </p>
                      <a
                        href="/contact"
                        className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent px-6 py-3.5 text-white transition-all hover:border-white/20 hover:bg-red-500/10 w-fit"
                      >
                        <span>Calculate Your ROI</span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-400 transition-transform duration-300 group-hover:rotate-45">
                          <ArrowRight className="h-4 w-4 text-white" />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                Ready to achieve similar results for your business?
              </p>
              
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent px-8 py-3.5 text-white transition-all hover:border-white/20 hover:bg-red-500/10"
              >
                <span>Start Your Transformation</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-400 transition-transform duration-300 group-hover:rotate-45">
                  <TrendingUp className="h-4 w-4 text-white" />
                </span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}