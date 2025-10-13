import { useRef } from "react";
import gsap from "gsap";
// import imageOne from "../../images/overview-one.webp";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { useGSAP } from "@gsap/react";

const HeroSection = () => {
    const heroText = useRef();
    const heroImage = useRef();

    useGSAP(()=>{
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger: heroImage.current,
                start: ' 110% 50%',
                end: ' 40% 60%',
                scrub: true,
                pin: heroText.current,
                pinSpacing: false,
            }
        })
        let ctx = gsap.context(()=>{
            tl.to(heroImage.current,{
                scale:1,
                ease: 'none'
            })
            .to(heroText.current.querySelectorAll('p')[1],{
                color: 'white',
                duration: 5,
                ease: 'none'
            }).to(heroText.current.querySelectorAll('p')[0],{
                color: 'white',
                duration: 1,
                ease: 'none'
            })
            .to(heroText.current.querySelectorAll('h1')[1],{
                color: 'white',
                duration: 1,
                ease: 'none'
            }).to(heroText.current.querySelectorAll('h1')[0],{
                color: 'white',
                duration: 3,
                ease: 'none'
            })
            
        })
        return ()=> ctx.revert();
    })

    return (
        <>
            <main>
                <section className="min-h-screen flex justify-center items-center ">
                    <div
                        className="max-w-6xl gap-0 h-[316px]  hero-text z-40 "
                        ref={heroText}
                    >
                        <h1 className="text-[100px] font-semibold text-black text-center leading-[110px]">
                            Share your products. 
                        </h1>
                             <h1 className="text-[100px] font-semibold text-black text-center leading-[110px]">Build your dream.</h1>
                        <div className="mt-10">
                            <p className="text-black font-semibold text-lg text-center">
                                You don't need a fancy website to start. Just upload what you sell, 
                            </p>
                             <p className="text-black font-semibold text-lg text-center">
                                and let people discover your brand one post at a time.
                            </p>
                        </div>
                    </div>
                </section>
                <section className=" flex justify-center items-start ">
                    <div className="max-w-fit">
                        <img
                            // src={imageOne}
                            src="https://images.unsplash.com/photo-1556745753-b2904692b3cd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1373"
                            alt="image-one"
                            ref={heroImage}
                            className="image-one w-screen h-[500px] object-cover"
                        />
                    </div>
                </section>
                {/* <Overview/> */}
            </main>
        </>
    );
}

export default HeroSection