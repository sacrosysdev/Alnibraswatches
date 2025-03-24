import React from 'react'
import { aboutUsData } from '../../constants'
import Testimonials from './Testimonials'

const AboutUs = () => {
  return (
    <div className='p-5 xl:px-20'>
        <h1 className='py-5 font-bodoni text-4xl font-bold tracking-wide'>About Us - Al Nibras</h1>
       <div className='flex flex-col gap-10'>
        {aboutUsData.map((item, index)=>(<div key={index} className={`grid grid-cols-1 xl:grid-cols-12 gap-5 `}>
            <div className={`col-span-1 xl:col-span-5 ${item.order1}`}>
                <img src={item.image} alt="" />
            </div>
            <div className={`col-span-1 xl:col-span-7 ${item.order2}`}>
                <h1 className='text-2xl font-bold '>{item.title}</h1>
                <p className='text-xl font-semibold pt-3 text-[#333333]'>{item.desc}</p>
            </div>
        </div>))}
       </div>
       <div>
       <h1 className='py-10 font-bodoni text-4xl font-bold tracking-wide'>What our Customers say</h1>
       </div>
       <div className='overflow-x-auto flex items-center gap-5 scrollbar-hide'>
        {Array.from({length:5}).map((_, index)=>(<div key={index}><Testimonials/></div>))}
       </div>
    </div>
  )
}

export default AboutUs