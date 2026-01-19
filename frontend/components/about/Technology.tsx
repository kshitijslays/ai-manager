'use client';
import { Shield, Cpu, Layers, Zap, Code, Database, GitBranch, Server } from "lucide-react";
import Container from '@/components/shared/Container';
import { useState } from 'react';

type TechStack = 'architecture' | 'security' | 'scalability' | 'integration';

export default function Technology() {
  const [activeStack, setActiveStack] = useState<TechStack>('architecture');
  
  const techFeatures = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Event-Driven",
      description: "Fully automated and responsive to business events",
      stat: "99.9%",
      statLabel: "System Uptime"
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Modular Design",
      description: "Reusable components across client implementations",
      stat: "85%",
      statLabel: "Code Reuse"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Privacy-aware and compliant with data protection standards",
      stat: "256-bit",
      statLabel: "Encryption"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Long-term Stability",
      description: "Designed for long-term stability and evolution",
      stat: "10+",
      statLabel: "Years Support"
    }
  ];

  const techStacks = {
    architecture: [
      "Event-driven microservices architecture",
      "Containerized deployment with Kubernetes",
      "Message queues for asynchronous processing",
      "API-first design with comprehensive documentation"
    ],
    security: [
      "End-to-end encryption for all data transmissions",
      "SOC 2 Type II and GDPR compliance",
      "Regular security audits and penetration testing",
      "Zero-trust security model implementation"
    ],
    scalability: [
      "Horizontal scaling with auto-load balancing",
      "Multi-region deployment capabilities",
      "Real-time performance monitoring",
      "Automatic failover and disaster recovery"
    ],
    integration: [
      "RESTful APIs with comprehensive SDKs",
      "Webhook support for real-time notifications",
      "Pre-built connectors for popular platforms",
      "Custom integration development services"
    ]
  };

  const technologies = [
    { name: "Node.js", category: "Backend", color: "from-green-500 to-emerald-400" },
    { name: "TypeScript", category: "Language", color: "from-blue-500 to-cyan-400" },
    { name: "React", category: "Frontend", color: "from-cyan-500 to-blue-400" },
    { name: "PostgreSQL", category: "Database", color: "from-blue-400 to-indigo-400" },
    { name: "Redis", category: "Cache", color: "from-red-500 to-orange-400" },
    { name: "Docker", category: "Container", color: "from-blue-500 to-indigo-500" },
    { name: "AWS", category: "Cloud", color: "from-orange-500 to-yellow-400" },
    { name: "Kafka", category: "Queue", color: "from-purple-500 to-pink-400" },
  ];

  return (
    <div className="relative w-full bg-neutral-950 overflow-hidden">
      {/* Background with subtle patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-950/95"></div>
        
        {/* Circuit board pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full bg-[linear-gradient(90deg,transparent_99%,rgba(239,68,68,0.1)_100%)] bg-[size:40px_40px]"></div>
          <div className="h-full w-full bg-[linear-gradient(transparent_99%,rgba(251,146,60,0.1)_100%)] bg-[size:40px_40px]"></div>
        </div>

        {/* Floating binary code effect */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-xs font-mono text-red-400/20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      </div>

      <section className="relative z-10">
        <Container>
          <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
            {/* Header Section */}
            <div className="mx-auto max-w-4xl text-center mb-16">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full border border-white/10 backdrop-blur-sm mb-6">
                <Code className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-gray-300 tracking-wider">TECHNOLOGY STACK</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6">
                Our{" "}
                <span className="font-semibold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                  Technology Philosophy
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                We build on open, flexible, and scalable foundations—ensuring our systems 
                evolve with technological advancements while maintaining enterprise-grade reliability.
              </p>
            </div>

            {/* Tech Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {techFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="group relative"
                >
                  {/* Hover Glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  
                  {/* Card */}
                  <div className="relative h-full rounded-xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-red-400 group-hover:text-orange-300 transition-colors duration-300">
                        {feature.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{feature.description}</p>
                    
                    {/* Stat */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                        {feature.stat}
                      </div>
                      <div className="text-xs text-gray-500">{feature.statLabel}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { id: 'architecture' as TechStack, label: 'Architecture', icon: <Server className="w-4 h-4" /> },
                { id: 'security' as TechStack, label: 'Security', icon: <Shield className="w-4 h-4" /> },
                { id: 'scalability' as TechStack, label: 'Scalability', icon: <GitBranch className="w-4 h-4" /> },
                { id: 'integration' as TechStack, label: 'Integration', icon: <Layers className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveStack(tab.id)}
                  className={`group flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 ${
                    activeStack === tab.id
                      ? 'border-red-500/30 bg-gradient-to-r from-red-500/10 to-orange-500/10 text-white'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div className={`transition-colors duration-300 ${
                    activeStack === tab.id ? 'text-red-400' : 'text-gray-500 group-hover:text-orange-400'
                  }`}>
                    {tab.icon}
                  </div>
                  <span className="font-medium tracking-wide">{tab.label}</span>
                  {activeStack === tab.id && (
                    <div className="ml-2 w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-orange-300 animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Tech Details */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Left Column - Stack Details */}
              <div className="space-y-8">
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-8 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    {activeStack.charAt(0).toUpperCase() + activeStack.slice(1)} Features
                  </h3>
                  
                  <div className="space-y-4">
                    {techStacks[activeStack].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg transition-colors duration-200">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-orange-300"></div>
                        </div>
                        <p className="text-gray-300 text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Stack */}
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-8 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-6">Technology Stack</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {technologies.map((tech, index) => (
                      <div 
                        key={index}
                        className="group relative p-4 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300`}></div>
                        <div className="relative">
                          <div className={`text-lg font-bold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent mb-1`}>
                            {tech.name}
                          </div>
                          <div className="text-xs text-gray-400">{tech.category}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Core Principles */}
              <div className="space-y-8">
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Cpu className="w-5 h-5 text-orange-400" />
                    <h3 className="text-xl font-semibold text-white">Core Principles</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      {
                        title: "Open Standards",
                        description: "We prioritize open protocols and standards to avoid vendor lock-in",
                        progress: 95
                      },
                      {
                        title: "Developer Experience",
                        description: "Clean APIs, comprehensive documentation, and intuitive tooling",
                        progress: 90
                      },
                      {
                        title: "Performance First",
                        description: "Optimized for speed, efficiency, and minimal latency",
                        progress: 98
                      },
                      {
                        title: "Future-Proof",
                        description: "Designed to adapt to emerging technologies and paradigms",
                        progress: 85
                      }
                    ].map((principle, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-white">{principle.title}</h4>
                          <span className="text-sm font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                            {principle.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full transition-all duration-1000"
                            style={{ width: `${principle.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-400">{principle.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deployment */}
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Database className="w-5 h-5 text-red-400" />
                    <h3 className="text-xl font-semibold text-white">Deployment & Infrastructure</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Deployment Time", value: "< 24h" },
                      { label: "API Response", value: "< 50ms" },
                      { label: "Data Centers", value: "Global" },
                      { label: "Backup Frequency", value: "Real-time" }
                    ].map((metric, index) => (
                      <div key={index} className="p-4 rounded-lg border border-white/5 bg-white/5">
                        <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                        <div className="text-xs text-gray-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}