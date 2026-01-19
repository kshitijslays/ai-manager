import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustStrip from '@/components/TrustTrip'
import Problems from '@/components/Problems'
import WhyChooseUs from '@/components/WhyUs'
import CTAComponent from '@/components/cta'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Problems />
      <WhyChooseUs />
      <CTAComponent />
    </>
  )
}
