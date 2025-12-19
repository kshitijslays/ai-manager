'use client';

import { CardSpotlight } from "@/components/ui/card-spotlight";

export default function TrustStrip() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 max-w-6xl mx-auto">
      {/* Row 1 */}
      <div className="md:col-span-8">
        <CardSpotlight className="h-64 w-full">
          <div className="p-6 h-full flex items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <LightningIcon />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Reduce manual work by up to 60%
                </h3>
                <p className="text-neutral-300">
                  AI-powered automation that streamlines your workflow
                </p>
              </div>
            </div>
          </div>
        </CardSpotlight>
      </div>

      <div className="md:col-span-4">
        <CardSpotlight className="h-64 w-full">
          <div className="p-6 h-full flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <RobotIcon />
              </div>
              <h3 className="text-xl font-bold text-white">AI-powered workflows</h3>
            </div>
            <p className="text-neutral-300">
              Intelligent automation for smarter processes
            </p>
          </div>
        </CardSpotlight>
      </div>

      {/* Row 2 */}
      <div className="md:col-span-4">
        <CardSpotlight className="h-64 w-full">
          <div className="p-6 h-full flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <ShieldIcon />
              </div>
              <h3 className="text-xl font-bold text-white">Secure & scalable systems</h3>
            </div>
            <p className="text-neutral-300">
              Enterprise-grade security with growth in mind
            </p>
          </div>
        </CardSpotlight>
      </div>

      <div className="md:col-span-8">
        <CardSpotlight className="h-64 w-full">
          <div className="p-6 h-full flex items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <PuzzleIcon />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Built with open-source & modern tools
                </h3>
                <p className="text-neutral-300">
                  Leveraging cutting-edge technology for better results
                </p>
              </div>
            </div>
          </div>
        </CardSpotlight>
      </div>
    </div>
  );
}

const LightningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const RobotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
    <rect x="4" y="8" width="16" height="12" rx="2"></rect>
    <path d="M12 8V4H8"></path>
    <path d="M8 14h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M12 18h.01"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const PuzzleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
    <path d="M19.439 7.85c-.236.54-.712.9-1.238.9-.526 0-1.002-.36-1.238-.9a1.315 1.315 0 0 0-1.238-.9c-.526 0-1.002.36-1.238.9-.236.54-.712.9-1.238.9s-1.002-.36-1.238-.9a1.315 1.315 0 0 0-1.238-.9c-.526 0-1.002.36-1.238.9-.236.54-.712.9-1.238.9a1.315 1.315 0 0 1-1.238-.9C7.142 7.49 6.666 7.13 6.14 7.13c-.526 0-1.002.36-1.238.9-.236.54-.712.9-1.238.9v4.54c0 .5.338.92.792 1.04.454.12.92-.09 1.156-.55.236-.46.712-.76 1.238-.76s1.002.3 1.238.76c.236.46.712.76 1.238.76s1.002-.3 1.238-.76c.236.46.712.76 1.238.76s1.002-.3 1.238-.76c.236.46.712.76 1.238.76s1.002-.3 1.238-.76c.236.46.712.76 1.238.76s1.002-.3 1.238-.76c.236.46.712.76 1.238.76s1.002-.3 1.238-.76c.236.46.712-.76 1.238-.76.526 0 1.002.3 1.238.76.236.46.702.67 1.156.55.454-.12.792-.54.792-1.04V8.85c-.526 0-1.002-.36-1.238-.9z"></path>
  </svg>
);