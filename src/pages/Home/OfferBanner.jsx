import React from 'react'
import Banner from '../../assets/images/home/offerbannerimg.png'

const OfferBanner = () => {
  return (
    <div className='pt-5 '>
  <div className="relative bg-black h-[503px] overflow-hidden ">
    <div className="h-full w-full">
      <img src={Banner} alt="" className="h-full w-full object-cover transform -translate-40 xl:-translate-x-96" />
    </div>
    <div className="absolute flex flex-col gap-2 justify-center items-end inset-0 left-2 right-5 xl:right-10 ">
      <h1 className="font-bold text-5xl text-[#DDDDDD]  xl:w-1/2">
        Elevate Every Moment with Hamas Watches!
      </h1>
      <p className="text-[#DBF227] font-bold text-2xl  xl:w-1/2 underline">
        30% Off on Your First Order
      </p>
      
    </div>
    
  </div>
</div>
  )
}

export default OfferBanner