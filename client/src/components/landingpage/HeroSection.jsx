import { useRef } from "react";
import gsap from "gsap";
// import imageOne from "../../images/overview-one.webp";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { useGSAP } from "@gsap/react";

const HeroSection = () => {
    const heroText = useRef();
    const heroImage = useRef();
    const buttonRef = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroImage.current,
                start: ' 100% 10%',
                end: ' 30% 90%',
                scrub: true,
                pin: heroText.current,
                pinSpacing: false,
            }
        })
        tl.to(heroImage.current, {
            scale: 1,
            ease: 'none'
        }).to(buttonRef.current, {
            borderColor: "white",
            color: 'white',
            duration: 5,
        }).to(heroText.current.querySelectorAll('p')[1], {
            color: 'white',
            duration: 5,
            ease: 'none'
        }).to(heroText.current.querySelectorAll('p')[0], {
            color: 'white',
            duration: 1,
            ease: 'none'
        }).to(heroText.current.querySelectorAll('h1')[1], {
            color: 'white',
            duration: 1,
            ease: 'none'
        }).to(heroText.current.querySelectorAll('h1')[0], {
            color: 'white',
            duration: 3,
            ease: 'none'
        })

        return () => tl.kill();
    })

    return (
        <>
            <main>
                <section className="min-h-screen flex justify-center items-center bg-white">
                    <div
                        className="max-w-6xl h-[316px] text-center hero-text z-40 "
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
                        <button ref={buttonRef} className=" text-lg text-black mt-4  font-semibold py-2 px-4 rounded-sm border-black border-2">Start Sharing Now</button>
                    </div>
                </section>
                <section className="flex justify-center items-center ">
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