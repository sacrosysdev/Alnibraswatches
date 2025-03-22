import React from 'react'
import { FaAngleDown } from "react-icons/fa6";

const OrderCard = () => {
  return (
    <div className=' shadow-md flex flex-col  gap-8 p-6'>
        <div className='flex flex-col lg:flex-row justify-between text-base xl:items-center'>
            <h1 className='font-medium'>Order ID : <span>SWA4R46RF46R356F45</span></h1>
            <h1 className='uppercase font-bold text-[#0D1217] '>total Aed : <span>2300</span></h1>
        </div>
        <div className='flex flex-col gap-1 lg:flex-row justify-between text-sm text-[#939393] xl:items-center'>
            <h1 className=''>Delivered on 28th Dec 2025</h1>
            <h1 className=''>Promo code <span className='text-[#30933A]'> Applied</span></h1>
        </div>
        <div className='flex flex-col gap-1 lg:flex-row justify-between xl:items-center'>
            <div className='flex gap-2'>
                <h1>SHIPPED TO</h1>
                <div className='flex items-center gap-1'>
                    <h1 className='text-sm text-[#006E7F] flex items-center gap-1'>Aftab Illyas</h1>
                    <FaAngleDown  className='text-[#9A9A9A]'/>
                </div>
            </div>
            <button className='px-12 py-3 bg-[#00211E] text-base text-white w-fit rounded-lg'>
            View Order
        </button>
        </div>
    </div>
  )
}

export default OrderCard