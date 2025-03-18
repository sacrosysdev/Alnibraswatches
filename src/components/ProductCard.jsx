import React from 'react'
import Product from '../assets/images/home/productimage.png'

const ProductCard = () => {
  return (
    <div className='flex flex-col items-center gap-4 pb-5 bg-[#F1F1F1] shadow-[10px_4px_10px_rgba(0,0,0,0.1)] rounded-2xl'>
      <div className='w-[272px] h-[272px] overflow-hidden'>
        <img src={Product} alt="" className='h-full w-full object-cover'/>
      </div>
      <div className='text-center flex flex-col gap-1'>
        <h1 className='font-medium text-xl text-[#010F17]'>IWA Sport watch </h1>
        <h3 className='text-xs text-[#757C81]'>Brand : Titan</h3>
      </div>
      <h1 className='font-bold text-xl text-[#003F38]'>AED : 27000</h1>
    </div>
  )
}

export default ProductCard