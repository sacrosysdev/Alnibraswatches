import React from 'react'
import Banner from '../../assets/images/aboutus/aboutBanner.png'

const AboutUs = () => {
  return (
    <div className=' px-20'>
        <div className='py-5'>
            <h1 className='font-medium text-xl text-black'>About Us – Hamas Golds and Diamonds</h1>
        </div>
        <div className='w-full '>
            <img src={Banner} alt="banner" className='w-full h-full object-contain'/>
        </div>
        <div className='text-[#333333] text-base'>
            <h1 className='font-bold '>Welcome to Hamas Gold and Diamonds</h1>
            <p></p>
        </div>
    </div>
  )
}

export default AboutUs