
import { VscNewFolder } from "react-icons/vsc";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { RiCustomerService2Fill} from "react-icons/ri";

const HowItWorks = () => {
  return (
    <div>
      <section className="h-auto py-10 lg:py-20 md:px-10" id="why-choose-us">
          <div className="text-center max-w-6xl mx-auto">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold">Why choose Us</h1>
            <p className="mt-4 text-lg md:text-xl">
              These popular destination have a lot to offer.
            </p>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 lg:mt-20 max-w-7xl mx-auto">
            <div className=" text-center p-2">
              <span className="flex justify-center">
                <HiOutlineCheckBadge className=" text-8xl  lg:text-8xl text-blue" />
              </span>
              <h4 className=" text-2xl my-6">Best Price Guarantee</h4>
              <p className="text-lg ">
                Your dream vacation shouldn’t cost more than it should. Book with us and enjoy the assurance that you’re always getting the best value.
              </p>
            </div>
            <div className=" text-center p-2">
              <span className="flex justify-center">
                <VscNewFolder className="text-8xl text-blue" />
              </span>
              <h4 className=" text-2xl my-6">Easy Booking</h4>
              <p className="text-lg ">
                From browsing packages to final confirmation, we’ve made everything seamless so you can book your getaway with ease.
              </p>
            </div>
            <div className=" text-center p-2">
              <span className="flex justify-center">
                <RiCustomerService2Fill className="text-8xl text-blue" />
              </span>
              <h4 className=" text-2xl my-6">Customer support 24/7</h4>
              <p className="text-lg ">
                Travel with confidence knowing our team is here for you anytime, day or night.
              </p>
            </div>
          </div>
        </section>
    </div>
  )
}

export default HowItWorks;