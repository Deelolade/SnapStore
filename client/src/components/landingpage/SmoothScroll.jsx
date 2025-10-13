// import Lenis from '@studio-freight/lenis'
import Lenis from  'lenis'
import React, { useEffect } from 'react'


const SmoothScroll = ({children}) => {
    useEffect(()=>{

        if(typeof window === ' undefined') return;
        const lenis = new Lenis({
            duration:1.5,
            smoothWheel: true
        })
        const raf = ( time)=>{
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return ()=>{
            lenis.destroy()
        } 
    },[])
  return (
    <div>
      {children}
    </div>
  )
}

export default SmoothScroll
