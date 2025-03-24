import React from 'react'
import Customer from '../../assets/images/aboutus/customer.png'
import Line from '../../assets/svg/aboutus/Line.svg'

const Testimonials = () => {
  return (
    <div className='hover:scale-105 py-5 transition-transform duration-300 ease-in-out'>
        <div className='font-jakartha bg-[#25507E17] w-72 p-6 rounded-2xl flex flex-col gap-3 '>
        <div className='flex items-center gap-3'>
            <div className='h-12 w-12 rounded-full'>
                <img src={Customer} alt="" />
            </div>
            <div>
                <h1 className='font-bold  text-base'>Leon Throne</h1>
                <h1 className='  text-base'>Watch Collector</h1>
            </div>
        </div>
        <div className='flex gap-3'>
            <div className='h-full w-full'>
                <img src={Line} alt="" className=''/>
            </div>
            <div>
                <p className='text-xl text-[#1B2128]'>Al Nibras offers an exceptional collection of watches. Their service is top-notch!</p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Testimonials