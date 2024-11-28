import { FaShippingFast } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { GoShieldCheck } from "react-icons/go";

const Services = () => {
  return (
    <div className="flex items-center justify-center lg:justify-between flex-wrap gap-10 w-full max-w-[1000px] mx-auto mb-10">
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="w-16 h-16 bg-black border-[7px] border-gray-400 rounded-full flex items-center justify-center">
        <FaShippingFast className="w-7 h-7 text-white" />
      </div>
      <h1 className="text-lg font-semibold text-black">
        FREE AND FAST DELIVERY
      </h1>
      <p className="text-sm text-black">
        Free delivery for all orders over $140
      </p>
    </div>
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="w-16 h-16 bg-black border-[7px] border-gray-400 rounded-full flex items-center justify-center">
        <TfiHeadphoneAlt className="w-7 h-7 text-white" />
      </div>
      <h1 className="text-lg font-semibold text-black">
        24/7 CUSTOMER SERVICE
      </h1>
      <p className="text-sm text-black">Friendly 24/7 customer support</p>
    </div>
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="w-16 h-16 bg-black border-[7px] border-gray-400 rounded-full flex items-center justify-center">
        <GoShieldCheck className="w-7 h-7 text-white" />
      </div>
      <h1 className="text-lg font-semibold text-black">
        MONEY BACK GUARANTEE
      </h1>
      <p className="text-sm text-black">We return money within 30 days</p>
    </div>
  </div>  )
}

export default Services