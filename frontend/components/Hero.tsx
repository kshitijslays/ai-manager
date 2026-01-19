import { ArrowRight } from "lucide-react"

export default function Hero1() {
  return (
    <div className="relative w-full bg-neutral-950 overflow-hidden">
      {/* Animated Workflow Background */}
      <div className="absolute inset-0 z-[0]">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Gradient definitions */}
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(239, 68, 68, 0)" />
              <stop offset="50%" stopColor="rgba(239, 68, 68, 0.6)" />
              <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
            </linearGradient>
            
            {/* Filter for glow effect */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
           
          {/* Hidden paths for particles */}
          <defs>
            <path id="path1" d="M 15,20 Q 25,32 25,45 L 50,50 Q 47,65 45,80" />
            <path id="path2" d="M 35,15 Q 40,30 50,50 L 75,48 Q 72,63 70,78" />
            <path id="path3" d="M 65,18 Q 68,33 75,48 Q 72,63 70,78" />
            <path id="path4" d="M 85,22 Q 80,35 75,48 L 50,50 Q 22,60 20,75" />
          </defs>
        </svg>
        
        {/* Radial gradient overlay */}
        <div className="absolute top-0 h-full w-full bg-neutral-900/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>
      
      <section className="relative z-1 mx-auto max-w-full">
        <div className="pointer-events-none absolute h-full w-full overflow-hidden opacity-50 [perspective:200px]">
          <div className="absolute inset-0 [transform:rotateX(35deg)]">
            <div className="animate-grid [inset:0%_0px] [margin-left:-50%] [height:300vh] [width:600vw] [transform-origin:100%_0_0] [background-image:linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)] [background-size:120px_120px] [background-repeat:repeat]"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-90%"></div>
        </div>

        <div className="z-10 mx-auto max-w-screen-xl gap-12 px-4 py-28 text-gray-600 md:px-8">
          <div className="mx-auto max-w-3xl space-y-5 text-center leading-0 lg:leading-5">
            <h1 className="font-geist group mx-auto w-fit rounded-3xl border-[2px] border-white/5 bg-gradient-to-tr from-zinc-300/5 via-gray-400/5 to-transparent px-5 py-2 text-sm text-gray-400">
              Build automations for everyone
              <ArrowRight className="ml-2 inline h-4 w-4 duration-300 group-hover:translate-x-1" />
            </h1>

            <h2 className="font-geist mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] bg-clip-text text-4xl tracking-tighter text-transparent md:text-6xl">
              We Build{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-200 bg-clip-text text-transparent">
                Automation Systems That Run Your Business on Autopilot Mode
              </span>
            </h2>

            <p className="mx-auto max-w-2xl text-gray-300">
              From lead capture to follow-ups, reporting, and AI assistants — we automate repetitive work so your team can focus on growth.
            </p>
            <div className="items-center justify-center space-y-3 gap-x-3 sm:flex sm:space-y-0">
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-gradient-to-tr from-zinc-300/5 via-red-400/20 to-transparent px-8 py-4 text-white transition-all hover:border-white/20 hover:bg-red-500/10"
              >
                Get Started with your work
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 transition-transform duration-300 group-hover:-rotate-45">
                  <ArrowRight className="h-4 w-4 text-white" />
                </span>
              </a>
            </div>
          </div>
          <div className="relative mx-10 mt-32">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/30 via-orange-500/30 to-red-500/30 blur-3xl opacity-75"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-red-400/40 via-orange-400/40 to-red-400/40 blur-xl"></div>
            <img
              src="/Dashboard.png"
              className="relative w-full rounded-lg border shadow-lg"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  )
}