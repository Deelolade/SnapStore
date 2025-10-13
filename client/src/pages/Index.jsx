import About from '@/components/landingpage/About'
import Features from '@/components/landingpage/Features'
import HeroSection from '@/components/landingpage/HeroSection'
import Navbar from '@/components/landingpage/Navbar'
import SmoothScroll from '@/components/landingpage/SmoothScroll'

const Index = () => {
  return (
    <div>
      <SmoothScroll>
        <Navbar />
        <HeroSection />
        <Features/>
        <About />
      </SmoothScroll>
    </div>
  )
}

export default Index
