"use client";

export default function WhyChooseUs() {
  return (
    <section className="min-h-screen bg-[#0B0B0B] py-32 px-4 relative overflow-hidden">
      {/* Spotlight effect */}
      <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-[#242435] opacity-40 blur-[120px] rounded-full"></div>
      {/* Thin divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-24">
          <h2 className="font-geist mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] bg-clip-text text-4xl tracking-tighter text-transparent md:text-6xl">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-200 bg-clip-text text-transparent">
              Us?
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mt-4">
            We're not just another automation agency. Here's what sets us apart.
          </p>
        </div>

        {/* Content Items */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical connecting line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-red-500/20 via-orange-500/30 to-red-500/20"></div>

          <div className="space-y-0">
            {/* Item 1 */}
            <div className="relative pb-20">
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/10 bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent backdrop-blur-md flex items-center justify-center shadow-lg shadow-red-500/30 transition-all hover:border-white/20 hover:bg-red-500/10">
                    <span className="text-2xl md:text-4xl font-bold bg-gradient-to-br from-red-400 to-orange-500 bg-clip-text text-transparent">
                      01
                    </span>
                  </div>
                </div>

                <div className="flex-1 pt-2 flex gap-8 items-start">
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-2xl md:text-4xl font-semibold bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
                        Business-first automation
                      </h3>
                      <p className="text-sm uppercase tracking-widest text-red-400 font-semibold">
                        NOT TOOL-FIRST
                      </p>
                    </div>

                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                      We prioritize your business goals over flashy tools. Our
                      automation solutions are tailored to solve real problems
                      and drive measurable results, ensuring every
                      implementation adds genuine value to your operations.
                    </p>
                  </div>

                  <div className="flex-shrink-0 w-32 h-32 md:w-60 md:h-60 flex items-center justify-center">
                    {/* Replace with your PNG image */}
                    <img
                      src="/Business.png"
                      alt="Business automation"
                      className="w-full h-full object-contain opacity-30
             hue-rotate-[350deg] saturate-180 brightness-85"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="relative pb-20">
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/10 bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent backdrop-blur-md flex items-center justify-center shadow-lg shadow-red-500/30 transition-all hover:border-white/20 hover:bg-red-500/10">
                    <span className="text-2xl md:text-4xl font-bold bg-gradient-to-br from-red-400 to-orange-500 bg-clip-text text-transparent">
                      02
                    </span>
                  </div>
                </div>

                <div className="flex-1 pt-2 flex gap-8 items-start">
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-2xl md:text-4xl font-semibold bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
                        Clean, maintainable systems
                      </h3>
                      <p className="text-sm uppercase tracking-widest text-red-400 font-semibold">
                        BUILT TO LAST
                      </p>
                    </div>

                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                      Our systems are designed with clarity and longevity in
                      mind. No messy workarounds or technical debt—just
                      well-structured, documented solutions that your team can
                      understand and maintain long after implementation.
                    </p>
                  </div>

                  <div className="flex-shrink-0 w-32 h-32 md:w-60 md:h-60 flex items-center justify-center">
                    {/* Replace with your PNG image */}
                    <img
                      src="/clean.png"
                      alt="Maintainable systems"
                      className="w-full h-full object-contain  opacity-50
             hue-rotate-[350deg] saturate-180 brightness-85"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="relative pb-20">
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/10 bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent backdrop-blur-md flex items-center justify-center shadow-lg shadow-red-500/30 transition-all hover:border-white/20 hover:bg-red-500/10">
                    <span className="text-2xl md:text-4xl font-bold bg-gradient-to-br from-red-400 to-orange-500 bg-clip-text text-transparent">
                      03
                    </span>
                  </div>
                </div>

                <div className="flex-1 pt-2 flex gap-8 items-start">
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-2xl md:text-4xl font-semibold bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
                        Secure & privacy-focused
                      </h3>
                      <p className="text-sm uppercase tracking-widest text-red-400 font-semibold">
                        YOUR DATA, PROTECTED
                      </p>
                    </div>

                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                      Security isn't an afterthought—it's built into every layer
                      of our solutions. We implement industry-leading security
                      practices and privacy standards to ensure your data
                      remains protected and compliant with regulations.
                    </p>
                  </div>

                  <div className="flex-shrink-0 w-32 h-32 md:w-60 md:h-60 flex items-center justify-center">
                    {/* Replace with your PNG image */}
                    <img
                      src="/secure.png"
                      alt="Security focused"
                      className="w-full h-full object-contain opacity-50
             hue-rotate-[350deg] saturate-180 brightness-85"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div className="relative pb-20">
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/10 bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent backdrop-blur-md flex items-center justify-center shadow-lg shadow-red-500/30 transition-all hover:border-white/20 hover:bg-red-500/10">
                    <span className="text-2xl md:text-4xl font-bold bg-gradient-to-br from-red-400 to-orange-500 bg-clip-text text-transparent">
                      04
                    </span>
                  </div>
                </div>

                <div className="flex-1 pt-2 flex gap-8 items-start">
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-2xl md:text-4xl font-semibold bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
                        Transparent pricing
                      </h3>
                      <p className="text-sm uppercase tracking-widest text-red-400 font-semibold">
                        NO HIDDEN COSTS
                      </p>
                    </div>

                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                      We believe in honest, upfront pricing. You'll know exactly
                      what you're paying for from day one, with no surprise fees
                      or hidden charges. Our transparent approach builds trust
                      and helps you plan your budget with confidence.
                    </p>
                  </div>

                  <div className="flex-shrink-0 w-32 h-32 md:w-60 md:h-60 flex items-center justify-center">
                    {/* Replace with your PNG image */}
                    <img
                      src="/Dollar.png"
                      height={40}
                      width={40}
                      alt="Transparent pricing"
                      className="w-full h-full object-contain  opacity-50
             hue-rotate-[350deg] saturate-180 brightness-85"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Item 5 */}
            <div className="relative">
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/10 bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent backdrop-blur-md flex items-center justify-center shadow-lg shadow-red-500/30 transition-all hover:border-white/20 hover:bg-red-500/10">
                    <span className="text-2xl md:text-4xl font-bold bg-gradient-to-br from-red-400 to-orange-500 bg-clip-text text-transparent">
                      05
                    </span>
                  </div>
                </div>

                <div className="flex-1 pt-2 flex gap-8 items-start">
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-2xl md:text-4xl font-semibold bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
                        Long-term partnership mindset
                      </h3>
                      <p className="text-sm uppercase tracking-widest text-red-400 font-semibold">
                        GROWING TOGETHER
                      </p>
                    </div>

                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                      We're not just vendors—we're partners invested in your
                      success. Our commitment extends beyond project delivery to
                      ongoing support, optimization, optimization, and strategic
                      guidance as your business evolves and grows.
                    </p>
                  </div>

                  <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                    {/* Replace with your PNG image */}
                    <img
                      src="/Partnership.png"
                      alt="Partnership mindset"
                      height = {40}
                      width={40}
                      className="w-full h-full object-contain  opacity-50
             hue-rotate-[350deg] saturate-180 brightness-85"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
