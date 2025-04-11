import React from 'react'
import Product from '../../../assets/images/home/productImg.png'

const Brands = () => {
  return (
    <div>
        <div className='flex justify-between items-center'>
        <div>
        <h1 className='font-bodoni  text-[#0D1217] font-bold text-[34px]'>Shop by Brands</h1>
        <p className='text-[#031C2C] py-1'>234 New items added</p>
        </div>
        <div>
          See all
        </div>
        </div>
        <div className='grid grid-cols-3 xl:grid-cols-6 gap-3 px-5 pt-10'>
            {Array.from({length:18}).map((_, index)=>(<div key={index}>
                <img src={Product} alt="" className='h-full w-full object-cover'/>
            </div>))}
        </div>
    </div>
  )
}

export default Brands