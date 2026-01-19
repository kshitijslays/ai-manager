'use client';
import { Zap, CheckCircle, ArrowRight, Shield, Cpu, BarChart } from "lucide-react";
import { useState } from 'react';
import Container from '@/components/shared/Container';

type TabType = 'automation' | 'ai' | 'analytics';

export default function WhatWeDo() {
  const [activeTab, setActiveTab] = useState<TabType>('automation');
  
  const offerings = {
    automation: [
      "Multi-source lead capture and normalization",
      "Instant automated acknowledgement via WhatsApp/Email",
      "Intelligent follow-up scheduling based on response patterns",
      "Centralized lead management with real-time status tracking",
      "Automated notifications and visibility dashboards for stakeholders"
    ],
    ai: [
      "AI-powered lead qualification and prioritization",
      "Predictive response optimization using machine learning",
      "Natural language processing for automated customer interactions",
      "Intelligent routing based on context and urgency",
      "Continuous learning from interaction patterns"
    ],
    analytics: [
      "Real-time performance dashboards with KPIs",
      "Conversion funnel analysis and optimization insights",
      "Response time analytics and trend forecasting",
      "ROI tracking and business impact measurement",
      "Custom reporting and automated insights delivery"
    ]
  };

  const stats = [
    { value: "5min", label: "Avg. Response Time", change: "+92%" },
    { value: "78%", label: "Lead Engagement", change: "+45%" },
    { value: "3.2x", label: "Conversion Rate", change: "+220%" },
    { value: "24/7", label: "System Uptime", change: "99.9%" }
  ];

  return (
    <div className="relative w-full bg-neutral-950 overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0 z-0">
        {/* Subtle gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-950/95"></div>
        
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(239,68,68,0.1)_1px,transparent_0)] bg-[size:40px_40px]"></div>
        </div>

        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-10 w-48 h-48">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-20 right-10 w-64 h-64">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-full blur-3xl"></div>
        </div>
      </div>

      <section className="relative z-10">
        <Container>
          <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
            {/* Header */}
            <div className="mx-auto max-w-4xl text-center mb-16">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full border border-white/10 backdrop-blur-sm mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-orange-300 animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-300 tracking-wider">CORE CAPABILITIES</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6">
                Enterprise-Grade{" "}
                <span className="font-semibold bg-gradient-to-r from-red-400 via-orange-300 to-red-400 bg-clip-text text-transparent">
                  Automation Solutions
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                We architect intelligent automation systems that transform business operations, 
                delivering measurable efficiency gains and competitive advantage.
              </p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { id: 'automation' as TabType, label: 'Automation Engine', icon: <Zap className="w-4 h-4" /> },
                { id: 'ai' as TabType, label: 'AI Intelligence', icon: <Cpu className="w-4 h-4" /> },
                { id: 'analytics' as TabType, label: 'Analytics Suite', icon: <BarChart className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group flex items-center gap-3 px-6 py-3.5 rounded-xl border transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-red-500/30 bg-gradient-to-r from-red-500/10 to-orange-500/10 text-white'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div className={`transition-colors duration-300 ${
                    activeTab === tab.id ? 'text-red-400' : 'text-gray-500 group-hover:text-orange-400'
                  }`}>
                    {tab.icon}
                  </div>
                  <span className="font-medium tracking-wide">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="ml-2 w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-orange-300 animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Main Content Section */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Left Column - Offerings */}
              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 blur-2xl opacity-20"></div>
                  <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-8 backdrop-blur-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30">
                        {activeTab === 'automation' && <Zap className="w-6 h-6 text-red-400" />}
                        {activeTab === 'ai' && <Cpu className="w-6 h-6 text-orange-400" />}
                        {activeTab === 'analytics' && <BarChart className="w-6 h-6 text-red-300" />}
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-white mb-1">
                          {activeTab === 'automation' && 'Automation Engine'}
                          {activeTab === 'ai' && 'AI Intelligence Layer'}
                          {activeTab === 'analytics' && 'Analytics & Insights'}
                        </h3>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-red-500 to-orange-400"></div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {offerings[activeTab].map((item, index) => (
                        <div key={index} className="flex items-start gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors duration-200">
                          <div className="flex-shrink-0 mt-1">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10">
                              <CheckCircle className="w-4 h-4 text-red-400" />
                            </div>
                          </div>
                          <p className="text-gray-300 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="relative rounded-xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Ready to Transform?</h4>
                        <p className="text-sm text-gray-400">Schedule a consultation with our experts</p>
                      </div>
                      <a
                        href="/contact"
                        className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                      >
                        <span>Get Started</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Stats & Features */}
              <div className="space-y-8">
                {/* Performance Stats */}
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-5 h-5 text-orange-400" />
                    <h3 className="text-xl font-semibold text-white">Performance Metrics</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors duration-200">
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                        <div className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full w-fit">
                          {stat.change} improvement
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Based on average client results over 12 months</span>
                      <span className="text-xs text-gray-500">*Data anonymized</span>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-8 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-6">Why Our Approach</h3>
                  
                  <div className="space-y-4">
                    {[
                      "Scalable architecture that grows with your business",
                      "Enterprise-grade security and compliance standards",
                      "Seamless integration with existing tech stack",
                      "Dedicated support and continuous optimization",
                      "Proven ROI within first 90 days"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-red-400 to-orange-300"></div>
                        </div>
                        <p className="text-gray-300 text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Bar */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-8 backdrop-blur-sm">
              <div className="text-center">
                <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">Trusted By Industry Leaders</p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
                  {['Enterprise', 'Healthcare', 'Finance', 'E-commerce', 'SaaS'].map((industry) => (
                    <div key={industry} className="text-gray-400 font-medium tracking-wide">
                      {industry}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}