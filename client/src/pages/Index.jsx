import About from '@/components/landingpage/About'
import Features from '@/components/landingpage/Features'
import HeroSection from '@/components/landingpage/HeroSection'
import HowItWorks from '@/components/landingpage/HowItWorks'
import Navbar from '@/components/landingpage/Navbar'
import Pricings from '@/components/landingpage/Pricings'
import SmoothScroll from '@/components/landingpage/SmoothScroll'

const Index = () => {
  return (
    <div>
      <SmoothScroll>
        <Navbar />
        <HeroSection />
        <Features/>
        {/* <About /> */}
        <HowItWorks/>
        <Pricings/>
      </SmoothScroll>
    </div>
  )
}

export default Index
