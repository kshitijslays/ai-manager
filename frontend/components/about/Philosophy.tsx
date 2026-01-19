'use client';
import { Brain, Target, Layers, Users, Sparkles } from "lucide-react";
import Container from '@/components/shared/Container';

export default function Philosophy() {
  const principles = [
    {
      title: "Systems over tools",
      description: "Tools change, systems last",
      icon: <Layers className="w-6 h-6" />,
      color: "from-red-400 to-orange-300"
    },
    {
      title: "Outcomes over features",
      description: "Speed, clarity, and reliability matter more than complexity",
      icon: <Target className="w-6 h-6" />,
      color: "from-orange-400 to-red-300"
    },
    {
      title: "Simplicity before scale",
      description: "We automate what truly needs automation",
      icon: <Brain className="w-6 h-6" />,
      color: "from-red-300 to-orange-200"
    },
    {
      title: "Human-centered design",
      description: "Automation supports people, it does not replace decision-making",
      icon: <Users className="w-6 h-6" />,
      color: "from-orange-300 to-red-200"
    }
  ];

  return (
    <div className="relative w-full bg-neutral-950 overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-950/95"></div>
        
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full bg-[linear-gradient(45deg,transparent_48%,rgba(239,68,68,0.05)_50%,transparent_52%)] bg-[size:20px_20px]"></div>
        </div>
      </div>

      <section className="relative z-10">
        <Container>
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
            {/* Header Section */}
            <div className="mx-auto max-w-4xl text-center mb-12">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full border border-white/10 backdrop-blur-sm mb-6">
                <Sparkles className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-gray-300 tracking-wider">OUR PHILOSOPHY</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white mb-4">
                How We Think About{" "}
                <span className="font-semibold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                  Automation
                </span>
              </h2>
              
              <div className="relative mx-auto max-w-3xl">
                <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 blur-xl opacity-20"></div>
                <p className="relative text-base md:text-lg text-gray-300 leading-relaxed">
                  Automation is often misunderstood as a one-time setup. 
                  We view it as a strategic approach to business excellence.
                </p>
                <div className="mt-4 flex justify-center">
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Principles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {principles.map((principle, index) => (
                <div 
                  key={index} 
                  className="group relative"
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  
                  {/* Card */}
                  <div className="relative h-full rounded-xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20">
                    {/* Icon Container */}
                    <div className={`mb-4 p-3 w-fit rounded-lg bg-gradient-to-r ${principle.color}/10 border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                      <div className={`text-gradient ${principle.color.replace('from-', '').replace('to-', '')}`}>
                        {principle.icon}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-100 transition-colors duration-300">
                      {principle.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {principle.description}
                    </p>
                    
                    {/* Decorative Line */}
                    <div className="mt-4 pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
                      <div className={`h-0.5 w-8 bg-gradient-to-r ${principle.color} rounded-full transition-all duration-300 group-hover:w-12`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Philosophy Statement */}
            <div className="mt-12 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 blur-2xl opacity-30"></div>
              
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/40 to-neutral-950/60 p-8 backdrop-blur-sm">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-red-400" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-orange-400" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-red-400" />
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Our philosophy is not about chasing the latest tools, but about building 
                    enduring systems that deliver consistent results. We believe automation should 
                    enhance human potential, not replace it—creating more space for creativity, 
                    strategy, and meaningful human connection.
                  </p>
                  
                  <div className="mt-6 flex justify-center">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Strategic</span>
                      <div className="w-1 h-1 rounded-full bg-gradient-to-r from-red-400 to-orange-300"></div>
                      <span>Practical</span>
                      <div className="w-1 h-1 rounded-full bg-gradient-to-r from-orange-400 to-red-300"></div>
                      <span>Human-Centered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting Points */}
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Continuous Evolution",
                  description: "Systems adapt as your business grows",
                  stat: "99%"
                },
                {
                  title: "Measurable Impact",
                  description: "Every automation delivers clear ROI",
                  stat: "4.2x"
                },
                {
                  title: "Client Partnership",
                  description: "We grow and evolve together",
                  stat: "100%"
                }
              ].map((point, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-xl border border-white/5 bg-neutral-900/30 hover:bg-neutral-900/50 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white">{point.title}</h4>
                    <div className="text-lg font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                      {point.stat}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Custom styles for gradient text */}
      <style jsx global>{`
        .text-gradient.from-red-400.to-orange-300 {
          background: linear-gradient(135deg, #f87171, #fdba74);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .text-gradient.from-orange-400.to-red-300 {
          background: linear-gradient(135deg, #fb923c, #fca5a5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .text-gradient.from-red-300.to-orange-200 {
          background: linear-gradient(135deg, #fca5a5, #fed7aa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .text-gradient.from-orange-300.to-red-200 {
          background: linear-gradient(135deg, #fdba74, #fecaca);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
}