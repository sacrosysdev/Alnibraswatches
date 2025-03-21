import React from 'react'
import Product from '../../assets/images/home/productimage.png'
import { FaAngleRight } from "react-icons/fa6";
import Heart from '../../assets/svg/product/smallHeart.svg'

const ProductCard = () => {
  return (
    <div className='relative flex flex-col items-center gap-4 p-6 bg-[#F1F1F1]  rounded-2xl'>

      <div className='w-[311px] h-[280px] overflow-hidden'>
        <img src={Product} alt="" className='h-full w-full object-contain' />
      </div>
      <div className=' flex flex-col gap-6'>
        <div className='flex justify-between items-center gap-6'>
          <h1 className='font-medium text-base text-[#003F38]'>IWA Vintage </h1>
          <h1 className='font-bold text-xl text-[#003F38]'>AED <span>2700</span></h1>
        </div>
        <div className='flex flex-col gap-2'>
          <h3 className='flex justify-end text-xs text-[#757C81]'>Brand: <span>Titan</span></h3>
          <div className='flex justify-end items-center text-[#003F38] gap-1'>
            <h2 className=' text-base font-bold'>See Full Specifications</h2>
            <FaAngleRight />
          </div>
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <button className='col-span-2 bg-[#003F38] px-6 py-3 rounded-lg text-white'>
            Add To Cart
          </button>
          <div className='col-span-1 m-auto border border-[#A3C4C1] px-6 py-3 rounded-lg'>
            <img src={Heart} alt="wishlist" />
          </div>
        </div>
      </div>
      <div className='absolute top-5 right-5'>
        <img src={Heart} alt="wishlist" />
      </div>
    </div>
  )
}

export default ProductCard