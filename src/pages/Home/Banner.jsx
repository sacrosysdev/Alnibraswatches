import React from 'react'
import BannerImage from '../../assets/images/banner/bannerImg.png'
import Watch from '../../assets/images/banner/watch.png'

import { features } from '../../constants'

const Banner = () => {
  return (
    <div className=''>
      <div className='relative h-[110vh] md:h-[50vh] xl:min-h-[130vh] overflow-hidden'>
        <img src={BannerImage} alt="" className=' h-full w-full object-cover'/>
        <div className='absolute left-2 xl:left-16 top-5 xl:top-16 w-full'>
            <h1 className='md:w-1/2 font-unlock text-3xl xl:text-[60px] xl:leading-16 text-white'>Discover the Future of Watch E-Commerce: Unleash Your Style!</h1>
            <p className='md:w-1/3 pt-5 font-extralight leading-5 text-white'>Explore the next generation of watch shopping with our cutting-edge e-commerce platform, featuring extraordinary craftsmanship and one-of-a-kind styles.</p>
        </div>
        <div className='absolute bottom-0 py-14 backdrop-blur-md w-full flex xl:gap-10 justify-center items-center'>
            <div className='flex absolute -top-40 md:bottom-16 xl:-bottom-10'>
              <img src={Watch} alt="" className='object-cover '/>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
              {features.map((item, index)=>(<div key={index} className='flex flex-col gap-2 items-center '>
              <div className='relative p-8 xl:p-8.5 rounded-full  bg-[#005C53]'>
                <div className='absolute inset-0 flex justify-center items-center'>
                  <img src={item.logo} alt="logo" />
                </div>
              </div>
              <h1 className='text-white pt-2  font-extralight tracking-wide'>{item.feature1}</h1>
              <h1 className='text-[#A5B2BA] text-sm font-extralight'>{item.feature2}</h1>
              </div>))}
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default Banner