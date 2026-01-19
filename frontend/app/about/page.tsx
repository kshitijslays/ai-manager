import AboutHero from '@/components/about/AboutHero';
import MissionVision from '@/components/about/MissionVision';
import WhatWeDo from '@/components/about/WhatWeDo';
import Philosophy from '@/components/about/Philosophy';
import Technology from '@/components/about/Technology';
import Implementation from '@/components/about/Implementation';
import Clients from '@/components/about/Clients';
import Impact from '@/components/about/Impact';
import Roadmap from '@/components/about/Roadmap';
import Footer from '@/components/Footer';


export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <MissionVision />
      <WhatWeDo />
      <Philosophy />
      <Technology />
      <Implementation />
      <Clients />
      <Impact />
      <Roadmap />
    </main>
  );
}