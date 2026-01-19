'use client';
import { Building, Heart, Users, TrendingUp, Star, Shield, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from 'react';

export default function Clients() {
  const [hoveredClient, setHoveredClient] = useState<number | null>(null);
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const clients = [
    {
      icon: <Building className="w-6 h-6" />,
      title: "Service Businesses",
      description: "Agencies, contractors, and professional services",
      metrics: ["85% faster response", "3.2x higher conversion", "40% retention"],
      color: "from-red-400 to-orange-300"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Healthcare",
      description: "Clinics and medical practices",
      metrics: ["92% appointment rate", "65% less no-shows", "4.8/5 satisfaction"],
      color: "from-orange-400 to-red-300"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Consultants",
      description: "Coaches and professional advisors",
      metrics: ["70% faster onboarding", "95% 1h response", "55% revenue growth"],
      color: "from-red-300 to-orange-200"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Growing SMEs",
      description: "Small to medium enterprises",
      metrics: ["60% more efficient", "45% productivity", "75% growth"],
      color: "from-orange-300 to-red-200"
    }
  ];

  const testimonials = [
    {
      text: "Reduced response time from hours to minutes, increasing conversions by 300%.",
      author: "Marketing Agency",
      role: "CEO"
    },
    {
      text: "Patient follow-ups are now 100% automated, allowing focus on care.",
      author: "Medical Practice",
      role: "Director"
    },
    {
      text: "Client onboarding went from 3 days to 3 hours with automation.",
      author: "Business Consultant",
      role: "Principal"
    }
  ];

  const stats = [
    { value: "150+", label: "Businesses Transformed", delay: 0 },
    { value: "98%", label: "Satisfaction Rate", delay: 100 },
    { value: "4.9/5", label: "Average Rating", delay: 200 },
    { value: "90 Days", label: "Time to Value", delay: 300 }
  ];

  return (
    <div className="relative w-full bg-neutral-950 overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
          {/* Header */}
          <div className={`mx-auto max-w-3xl text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full border border-white/10 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-sm font-medium text-gray-300 tracking-wide">CLIENT SUCCESS STORIES</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-white mb-6 leading-tight">
              Trusted By{" "}
              <span className="font-semibold bg-gradient-to-r from-red-400 via-orange-400 to-red-300 bg-clip-text text-transparent animate-gradient">
                Industry Leaders
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Empowering businesses where timely communication creates exceptional customer experiences
            </p>
          </div>

          {/* Client Types Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {clients.map((client, index) => (
              <div 
                key={index}
                className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredClient(index)}
                onMouseLeave={() => setHoveredClient(null)}
              >
                {/* Animated border gradient */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-40 transition-all duration-500 animate-gradient-xy"></div>
                
                {/* Card */}
                <div className="relative h-full rounded-2xl border border-white/5 bg-gradient-to-br from-neutral-900/80 to-neutral-950/90 p-7 backdrop-blur-xl transition-all duration-500 group-hover:border-white/20 group-hover:transform group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-red-500/10">
                  {/* Icon with animated background */}
                  <div className="mb-6">
                    <div className={`relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${client.color}/10 border border-white/5 group-hover:scale-110 transition-all duration-500 overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className={`relative bg-gradient-to-r ${client.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500`}>
                        {client.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-50 transition-colors duration-300">{client.title}</h3>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{client.description}</p>
                  
                  {/* Metrics with staggered animation */}
                  <div className="space-y-3">
                    {client.metrics.map((metric, metricIndex) => (
                      <div 
                        key={metricIndex} 
                        className={`flex items-center gap-3 transition-all duration-500 ${hoveredClient === index ? 'translate-x-2' : ''}`}
                        style={{ transitionDelay: `${metricIndex * 50}ms` }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-red-400 to-orange-300 group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">{metric}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Hover indicator with slide-up animation */}
                  <div className={`mt-6 pt-5 border-t border-white/5 transition-all duration-500 ${hoveredClient === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="flex items-center gap-2 text-xs text-red-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Proven Results</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Client Success Metrics */}
          <div className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/80 p-10 backdrop-blur-xl overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-red-500/5 animate-gradient-xy"></div>
              
              <div className="relative">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
                    <Sparkles className="w-5 h-5 text-red-400" />
                    <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
                  </div>
                  <h3 className="text-3xl font-semibold text-white mb-3">Client Success Metrics</h3>
                  <p className="text-gray-400 text-lg">Consistent, measurable results across all industries</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <div 
                      key={index}
                      className={`text-center p-6 rounded-2xl bg-neutral-900/40 border border-white/5 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 hover:bg-neutral-900/60 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                      style={{ transitionDelay: `${stat.delay}ms` }}
                    >
                      <div className="text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-300 bg-clip-text text-transparent mb-3 animate-gradient">{stat.value}</div>
                      <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
              </div>
              <h3 className="text-3xl font-semibold text-white mb-3">What Our Clients Say</h3>
              <p className="text-gray-400 text-lg">Real impact, real businesses, real results</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${700 + index * 100}ms` }}
                  onMouseEnter={() => setHoveredTestimonial(index)}
                  onMouseLeave={() => setHoveredTestimonial(null)}
                >
                  {/* Animated glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-30 transition-all duration-500 animate-gradient-xy"></div>
                  
                  <div className="relative h-full rounded-2xl border border-white/5 bg-gradient-to-br from-neutral-900/80 to-neutral-950/90 p-8 backdrop-blur-xl transition-all duration-500 group-hover:border-white/20 group-hover:transform group-hover:scale-[1.02]">
                    {/* Quote icon */}
                    <div className="absolute top-6 right-6 text-6xl text-red-500/10 group-hover:text-red-500/20 transition-colors duration-500">"</div>
                    
                    {/* Quote text */}
                    <div className="mb-8 relative z-10">
                      <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">"{testimonial.text}"</p>
                    </div>
                    
                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                          <Users className="w-6 h-6 text-red-400" />
                        </div>
                      </div>
                      <div>
                        <div className="text-base font-semibold text-white mb-1">{testimonial.author}</div>
                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                      </div>
                    </div>
                    
                    {/* Stars */}
                    <div className="mt-6 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 fill-current transition-all duration-300 ${hoveredTestimonial === index ? 'text-yellow-400 scale-110' : 'text-yellow-500/40'}`}
                          style={{ transitionDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1000ms' }}>
            <div className="inline-flex items-center gap-3 mb-8">
              <Shield className="w-5 h-5 text-red-400 animate-pulse" />
              <span className="text-sm text-gray-300 font-medium">Trusted by 150+ businesses worldwide</span>
              <Shield className="w-5 h-5 text-orange-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <a 
              href="/contact" 
              className="group inline-flex items-center gap-4 rounded-full border border-white/20 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 px-10 py-4 text-white transition-all duration-500 hover:border-white/40 hover:bg-gradient-to-r hover:from-red-500/20 hover:via-orange-500/20 hover:to-red-500/20 hover:shadow-xl hover:shadow-red-500/20 hover:scale-105"
            >
              <span className="text-lg font-semibold">Join Our Success Stories</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-400 transition-all duration-300 group-hover:rotate-0 -rotate-45 group-hover:scale-110">
                <ArrowRight className="h-5 w-5 text-white" />
              </div>
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-gradient-xy {
          background-size: 400% 400%;
          animation: gradient-xy 8s ease infinite;
        }
      `}</style>
    </div>
  );
}