'use client';
import { Search, PenTool, Zap, BarChart, Cpu, ArrowRight } from "lucide-react";
import Container from '@/components/shared/Container';
import { useState } from 'react';

export default function Implementation() {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      title: "Understanding",
      description: "Current workflows and pain points analysis",
      icon: <Search className="w-6 h-6" />,
      details: "We begin with deep discovery sessions to understand your current processes, identify bottlenecks, and map out optimization opportunities.",
      duration: "1-2 weeks"
    },
    {
      title: "Design",
      description: "Tailored system for actual business operations",
      icon: <PenTool className="w-6 h-6" />,
      details: "Based on our findings, we design a custom automation architecture that aligns with your specific workflows and business objectives.",
      duration: "2-3 weeks"
    },
    {
      title: "Deployment",
      description: "Stable MVP with core automation",
      icon: <Zap className="w-6 h-6" />,
      details: "We implement the solution in phases, starting with core features, ensuring stability and providing comprehensive team training.",
      duration: "3-4 weeks"
    },
    {
      title: "Monitoring",
      description: "Performance tracking and logic refinement",
      icon: <BarChart className="w-6 h-6" />,
      details: "Continuous monitoring and optimization ensure your system performs optimally, with real-time analytics and performance tracking.",
      duration: "Ongoing"
    },
    {
      title: "Enhancement",
      description: "Advanced automation and AI features",
      icon: <Cpu className="w-6 h-6" />,
      details: "As your business evolves, we enhance the system with advanced features, AI capabilities, and expanded automation.",
      duration: "Quarterly"
    }
  ];

  return (
    <div className="relative w-full bg-neutral-950">
      <section className="relative">
        <Container>
          <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
            {/* Header */}
            <div className="mx-auto max-w-3xl text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full border border-white/10 mb-6">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-orange-300 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-300 tracking-wide">IMPLEMENTATION PROCESS</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
                How We{" "}
                <span className="font-semibold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                  Implement
                </span>
              </h1>
              
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                A phased approach for reliability and alignment. Each step builds on the last, ensuring success at every stage.
              </p>
            </div>

            {/* Process Steps */}
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 hidden md:block"></div>
              
              <div className="grid md:grid-cols-5 gap-8 relative">
                {steps.map((step, index) => (
                  <div 
                    key={index}
                    className="relative"
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    {/* Step number and connector */}
                    <div className="flex flex-col items-center">
                      {/* Step indicator */}
                      <button
                        onClick={() => setActiveStep(index)}
                        className={`relative flex items-center justify-center w-16 h-16 rounded-full border-2 transition-all duration-300 mb-4
                          ${activeStep === index 
                            ? 'border-red-500 bg-gradient-to-r from-red-500/20 to-orange-500/20 scale-110' 
                            : 'border-white/10 bg-neutral-900/50 hover:border-white/20'}`}
                      >
                        <div className={`transition-colors duration-300 ${activeStep === index ? 'text-red-400' : 'text-gray-400'}`}>
                          {step.icon}
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-orange-400 text-xs font-bold text-white flex items-center justify-center">
                          {index + 1}
                        </div>
                      </button>
                      
                      {/* Step info */}
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                        <div className="text-sm text-gray-400 mb-2">{step.description}</div>
                        <div className="text-xs text-gray-500">{step.duration}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Step Details */}
            <div className="mt-16">
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 overflow-hidden">
                <div className="grid lg:grid-cols-2">
                  {/* Left side - Details */}
                  <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30">
                        {steps[activeStep].icon}
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-white mb-1">{steps[activeStep].title}</h2>
                        <div className="text-sm text-gray-400">{steps[activeStep].duration}</div>
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                      {steps[activeStep].details}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Phase Progress</span>
                        <span className="font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                          Step {activeStep + 1} of {steps.length}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full transition-all duration-500"
                          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side - Key Activities */}
                  <div className="p-8 md:p-12 border-t lg:border-t-0 lg:border-l border-white/10 bg-neutral-900/20">
                    <h3 className="text-lg font-semibold text-white mb-6">Key Activities</h3>
                    <div className="space-y-4">
                      {[
                        "Stakeholder workshops & interviews",
                        "Process mapping & documentation",
                        "Solution architecture design",
                        "Implementation planning",
                        "Testing & quality assurance",
                        "Training & knowledge transfer",
                        "Performance monitoring setup",
                        "Continuous improvement planning"
                      ].slice(activeStep * 2, (activeStep + 1) * 2).map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-orange-300"></div>
                          </div>
                          <span className="text-gray-300">{activity}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-white/10">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg border border-white/5 bg-white/5">
                          <div className="text-2xl font-bold text-white mb-1">
                            {activeStep === 0 ? '90%' : activeStep === 1 ? '85%' : activeStep === 2 ? '95%' : activeStep === 3 ? '99%' : '75%'}
                          </div>
                          <div className="text-xs text-gray-400">Success Rate</div>
                        </div>
                        <div className="p-4 rounded-lg border border-white/5 bg-white/5">
                          <div className="text-2xl font-bold text-white mb-1">
                            {steps[activeStep].duration}
                          </div>
                          <div className="text-xs text-gray-400">Timeline</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Metrics */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-semibold text-white mb-4">Implementation Success Metrics</h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Our structured approach delivers consistent results across all implementations
                </p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { value: "98%", label: "Project Success Rate", trend: "+5%" },
                  { value: "< 90 Days", label: "Time to Value", trend: "-40%" },
                  { value: "4.9/5", label: "Client Satisfaction", trend: "+0.4" },
                  { value: "99.9%", label: "System Uptime", trend: "+0.5%" }
                ].map((metric, index) => (
                  <div 
                    key={index}
                    className="group relative"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                    
                    <div className="relative rounded-xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-6 backdrop-blur-sm">
                      <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                      <div className="text-sm text-gray-300 mb-1">{metric.label}</div>
                      <div className="text-xs text-green-400 font-medium">{metric.trend} improvement</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-20 text-center">
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent px-8 py-3.5 text-white transition-all hover:border-white/20 hover:bg-red-500/10"
              >
                <span>Start Your Implementation</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-400 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowRight className="h-4 w-4 text-white" />
                </span>
              </a>
              
              <p className="mt-6 text-sm text-gray-400 max-w-md mx-auto">
                Ready to transform your operations? Let's discuss your specific needs.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}