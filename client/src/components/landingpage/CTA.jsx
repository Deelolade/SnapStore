import React from 'react'
import { SignUpButton } from '@clerk/clerk-react'
const CTA = () => {

    return (
        <div>
            <section id="pricing" className='' >
                <div className="p-10 2xl:p-20 text-center bg-[url('../../../images/CTA-bg.avif')] bg-cover bg-center h-auto 2xl:h-[50vh] flex justify-center items-center flex-col text-white">
                    <h2 className="text-xl md:text-2xl 2xl:text-4xl mb-4">Ready to grow your business online?</h2>
                    <p className="text-sm md:text-lg mb-5 2xl:mb-10 max-w-3xl mx-auto">Join thousands of small business owners already showcasing and selling their products effortlessly.
                        No coding, no stress — just results.</p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <SignUpButton
                            mode="modal"
                            redirecturl="/dashboard"
                        >
                            <button className="bg-white text-orange text-sm md:text-lg  font-semibold px-5 2xl:px-8 py-2 2xl:py-3 rounded-sm hover:bg-gray-100 transition duration-300">
                                Get Started Free
                            </button>
                        </SignUpButton>
                        <button className="border-2 border-white text-sm md:text-lg text-white font-semibold px-5 2xl:px-8 py-2 2xl:py-3 rounded-sm transition duration-300">
                            See How It Works
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CTA
