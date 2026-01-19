'use client';
import React, { useEffect, useState } from 'react';
import { Calendar, Rocket, Eye, Brain, Globe, Target, ArrowRight } from "lucide-react";
import Container from '@/components/shared/Container';


export default function Roadmap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const roadmapItems = [
    {
      title: "Productized automation packages",
      icon: <Rocket className="w-5 h-5" />,
      status: "In Development",
      progress: 75,
      description: "Turnkey automation solutions for immediate deployment"
    },
    {
      title: "Self-serve dashboards for advanced users",
      icon: <Eye className="w-5 h-5" />,
      status: "Q2 2024",
      progress: 30,
      description: "Advanced analytics and control interfaces"
    },
    {
      title: "Industry-specific automation systems",
      icon: <Target className="w-5 h-5" />,
      status: "Q3 2024",
      progress: 10,
      description: "Tailored solutions for healthcare, finance, and e-commerce"
    },
    {
      title: "Deeper AI-driven decision support",
      icon: <Brain className="w-5 h-5" />,
      status: "Q4 2024",
      progress: 5,
      description: "Advanced machine learning and predictive analytics"
    },
    {
      title: "Scalable SaaS platform for broader adoption",
      icon: <Globe className="w-5 h-5" />,
      status: "2025",
      progress: 0,
      description: "Enterprise-ready platform for global market reach"
    }
  ];

  // Render a stable placeholder on both server and initial client render
  if (!isMounted) {
    return (
      <div className="relative w-full bg-neutral-950 overflow-hidden">
        <section className="relative z-10">
          <Container>
            <div className="mx-auto max-w-6xl px-4 py-20 md:px-8">
              <div className="mx-auto max-w-3xl text-center mb-16">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full border border-white/10 backdrop-blur-sm mb-6">
                  <Calendar className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-medium text-gray-300 tracking-wider">STRATEGIC ROADMAP</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
                  Looking{" "}
                  <span className="font-semibold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                    Ahead
                  </span>
                </h1>

                <p className="relative text-lg text-gray-300">Building carefully, with a strong foundation</p>
              </div>

              {/* simple skeleton list to keep server/client markup identical initially */}
              <div className="space-y-6">
                {roadmapItems.map((_, idx) => (
                  <div key={idx} className="h-28 rounded-xl bg-neutral-900/30 border border-white/5 animate-pulse" />
                ))}
              </div>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  // Full interactive UI only after client mount
  return (
    <div className="relative w-full bg-neutral-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-950/95"></div>

        {/* Subtle timeline visualization */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full flex justify-around">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="relative">
                <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-red-500/20 to-transparent"></div>
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-red-400 to-orange-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="relative z-10">
        <Container>
          <div className="mx-auto max-w-6xl px-4 py-20 md:px-8">
            {/* Header Section */}
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full border border-white/10 backdrop-blur-sm mb-6">
                <Calendar className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-gray-300 tracking-wider">STRATEGIC ROADMAP</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
                Looking{" "}
                <span className="font-semibold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                  Ahead
                </span>
              </h1>

              <div className="relative mx-auto max-w-2xl">
                <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 blur-xl opacity-20"></div>
                <p className="relative text-lg text-gray-300">
                  Building carefully, with a strong foundation
                </p>
                <div className="mt-3 flex justify-center">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Roadmap Timeline */}
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500/20 to-transparent"></div>

              <div className="space-y-8">
                {roadmapItems.map((item, index) => (
                  <div
                    key={index}
                    className={`relative group ${index % 2 === 0 ? 'md:pr-1/2 md:pl-0' : 'md:pl-1/2 md:pr-0'}`}
                  >
                    {/* Timeline node */}
                    <div className={`absolute left-0 md:left-1/2 top-6 transform -translate-x-1/2 z-20 
                      ${index === 0 ? 'w-4 h-4' : 'w-3 h-3'} 
                      rounded-full border-2 border-white/10 
                      ${item.progress > 50 ? 'bg-gradient-to-r from-red-500 to-orange-400' : 
                        item.progress > 0 ? 'bg-gradient-to-r from-red-500/50 to-orange-400/50' : 
                        'bg-neutral-800'}
                      transition-all duration-300 group-hover:scale-125`}>
                    </div>

                    {/* Content card */}
                    <div className={`relative ml-8 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      {/* Hover glow effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

                      <div className="relative rounded-xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20">
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-white/5 
                            group-hover:scale-110 transition-transform duration-300`}>
                            <div className="text-red-400 group-hover:text-orange-300 transition-colors duration-300">
                              {item.icon}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                              <h3 className="text-lg font-semibold text-white group-hover:text-gray-100 transition-colors duration-300">
                                {item.title}
                              </h3>
                              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                                ${item.status === 'In Development' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                  item.status.includes('Q') ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                  'bg-purple-500/10 text-purple-400 border border-purple-500/20'}`}>
                                {item.status}
                              </div>
                            </div>

                            <p className="text-sm text-gray-400 mb-4">
                              {item.description}
                            </p>

                            {/* Progress bar */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-500">Development Progress</span>
                                <span className="font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                                  {item.progress}%
                                </span>
                              </div>
                              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full transition-all duration-1000"
                                  style={{ width: `${item.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Focus */}
            <div className="mt-20">
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-8 backdrop-blur-sm">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-red-400 to-orange-300 animate-pulse"></div>
                    <div className="text-sm font-medium text-gray-300">CURRENT FOCUS</div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-300 animate-pulse"></div>
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Quality Over Speed
                  </h3>

                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    We are building carefully, ensuring that growth never compromises reliability.
                    Each milestone is thoroughly tested and validated before proceeding to the next.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                      <div className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent mb-2">
                        100+ Tests
                      </div>
                      <div className="text-sm text-gray-400">Per feature release</div>
                    </div>
                    <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                      <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-300 bg-clip-text text-transparent mb-2">
                        99.9% Uptime
                      </div>
                      <div className="text-sm text-gray-400">Guaranteed reliability</div>
                    </div>
                    <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                      <div className="text-2xl font-bold bg-gradient-to-r from-red-300 to-orange-200 bg-clip-text text-transparent mb-2">
                        24/7 Support
                      </div>
                      <div className="text-sm text-gray-400">Dedicated assistance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent px-8 py-3.5 text-white transition-all hover:border-white/20 hover:bg-red-500/10"
              >
                <span>Discuss Our Roadmap</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-400 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowRight className="h-4 w-4 text-white" />
                </span>
              </a>

              <p className="mt-6 text-sm text-gray-400 max-w-lg mx-auto">
                Interested in specific features or timelines? Get in touch to discuss how our roadmap aligns with your needs.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
