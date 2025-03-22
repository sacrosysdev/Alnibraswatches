import React from 'react'
import BannerImage from '../../assets/images/banner/bannerImg.png'
import Watch from '../../assets/images/banner/watch.png'

import { features } from '../../constants'

const Banner = () => {
  return (
    <div className=''>
      <div className='relative h-[130vh] overflow-hidden'>
        <img src={BannerImage} alt="" className=' h-full w-full object-cover'/>
        <div className='absolute left-16 top-16 w-full'>
            <h1 className='w-1/2 font-unlock text-[60px] leading-16 text-white'>Discover the Future of Watch E-Commerce: Unleash Your Style!</h1>
            <p className='w-1/3 pt-5 font-extralight leading-5 text-white'>Explore the next generation of watch shopping with our cutting-edge e-commerce platform, featuring extraordinary craftsmanship and one-of-a-kind styles.</p>
        </div>
        <div className='absolute bottom-0 py-14 backdrop-blur-md w-full flex gap-10 justify-center items-center'>
        <div className='absolute -bottom-10'>
              <img src={Watch} alt="" />
            </div>
            {features.map((item, index)=>(<div key={index} className='flex flex-col gap-2 items-center'>
            <div className='relative p-8.5 rounded-full  bg-[#005C53]'>
              <div className='absolute  inset-0 flex justify-center items-center'>
                <img src={item.logo} alt="logo" />
              </div>
            </div>
            <h1 className='text-white pt-2  font-extralight tracking-wide'>{item.feature1}</h1>
            <h1 className='text-[#A5B2BA] text-sm font-extralight'>{item.feature2}</h1>
            </div>))}
           
        </div>
      </div>
    </div>
  )
}

export default Banner