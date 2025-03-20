import React from 'react'
import { productDetails } from '../../constants'

const ProductInfo = () => {
  return (
    <div className='flex flex-col gap-4'>
        <h1 className='text-lg font-semibold'>Product details</h1>
        <div className='grid grid-cols-3 '>
            <div className='flex flex-col gap-2 text-base text-[#A5B2BA] font-medium'>
                {productDetails.map((item, index)=>(<div key={index} className='col-span-1'>
                    {item.label}
                </div>))}
            </div>
            <div className='flex flex-col gap-2 text-base text-[#010F17] font-medium'>
                {productDetails.map((item, index)=>(<div key={index} className='col-span-1'>
                    {item.value}
                </div>))}
            </div>
            <div className='col-span-1'></div>
        </div>
    </div>
  )
}

export default ProductInfo