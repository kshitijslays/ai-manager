'use client';

export default function ManualWorkSection() {
  return (
    <section className="min-h-screen bg-black py-20 px-4 relative">
      {/* Thin divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="font-geis  t mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] bg-clip-text text-4xl tracking-tighter text-transparent md:text-6xl">
              What we{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-200 bg-clip-text text-transparent">
                Automate?
              </span>
            </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative h-96 rounded-3xl bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent backdrop-blur-sm border border-white/10 p-8 flex flex-col justify-between overflow-hidden">
              
              {/* PNG Image */}
              <div className="relative z-10 flex justify-center items-center flex-1">
                <img 
                  src="/images/leads-icon.png" 
                  alt="Leads" 
                  className="w-20 h-20 object-contain opacity-60"
                  style={{ filter: 'brightness(0) saturate(100%) invert(29%) sepia(89%) saturate(3427%) hue-rotate(346deg) brightness(98%) contrast(97%)' }}
                />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-medium bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mb-3">
                  Leads come in but no one follows up
                </h3>
                <p className="text-gray-400 text-sm">
                  Missing opportunities because manual tracking fails
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative h-80 rounded-3xl bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent backdrop-blur-sm border border-white/10 p-8 flex flex-col justify-between overflow-hidden">
              
              {/* PNG Image */}
              <div className="relative z-10 flex justify-center items-center flex-1">
                <img 
                  src="/images/sheets-icon.png" 
                  alt="Sheets" 
                  className="w-16 h-16 object-contain opacity-60"
                  style={{ filter: 'brightness(0) saturate(100%) invert(29%) sepia(89%) saturate(3427%) hue-rotate(346deg) brightness(98%) contrast(97%)' }}
                />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-medium bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mb-3">
                  Teams waste hours updating sheets & reports
                </h3>
                <p className="text-gray-400 text-sm">
                  Time spent on repetitive tasks instead of growth
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative h-80 rounded-3xl bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent backdrop-blur-sm border border-white/10 p-8 flex flex-col justify-between overflow-hidden">
              
              {/* PNG Image */}
              <div className="relative z-10 flex justify-center items-center flex-1">
                <img 
                  src="/images/support-icon.png" 
                  alt="Support" 
                  className="w-16 h-16 object-contain opacity-60"
                  style={{ filter: 'brightness(0) saturate(100%) invert(29%) sepia(89%) saturate(3427%) hue-rotate(346deg) brightness(98%) contrast(97%)' }}
                />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-medium bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mb-3">
                  Customer queries repeat every day
                </h3>
                <p className="text-gray-400 text-sm">
                  Support team overwhelmed with the same questions
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative h-96 rounded-3xl bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent backdrop-blur-sm border border-white/10 p-8 flex flex-col justify-between overflow-hidden">
              
              {/* PNG Image */}
              <div className="relative z-10 flex justify-center items-center flex-1">
                <img 
                  src="/images/integration-icon.png" 
                  alt="Integration" 
                  className="w-20 h-20 object-contain opacity-60"
                  style={{ filter: 'brightness(0) saturate(100%) invert(29%) sepia(89%) saturate(3427%) hue-rotate(346deg) brightness(98%) contrast(97%)' }}
                />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-medium bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mb-3">
                  Tools don't talk to each other
                </h3>
                <p className="text-gray-400 text-sm">
                  Data scattered across disconnected platforms
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}