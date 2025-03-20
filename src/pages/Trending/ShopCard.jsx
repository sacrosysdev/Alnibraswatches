import React from 'react'
import Product from '../../assets/images/home/productimage.png'

const ShopCard = () => {
  return (
    <div className='flex flex-col items-center gap-4 pb-5 bg-[#FFFFFF] shadow-[10px_4px_10px_rgba(0,0,0,0.1)] rounded-2xl'>
      <div className='w-[172px] h-[172px] overflow-hidden'>
        <img src={Product} alt="" className='h-full w-full object-cover'/>
      </div>
      <div className='text-center flex flex-col gap-1'>
        <h1 className='font-medium text-xl text-[#010F17]'>IWA Sport watch </h1>
        <h3 className='text-base text-[#757C81]'>Brand : Titan</h3>
      </div>
      <div className='flex gap-5 items-center'>
      <h1 className='font-bold text-xl text-[#010F17]'>27000</h1>
      <h1 className='font-bold text-xl text-[#B0B0B0]'>26000</h1>
      </div>
    </div>
  )
}

export default ShopCard