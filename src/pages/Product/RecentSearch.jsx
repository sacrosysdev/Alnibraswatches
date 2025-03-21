import React from 'react'
import ProductCard from './ProductCard'

const RecentSearch = () => {
  return (
    <div className='py-5'>
        <div className='flex flex-col gap-2'>
            <h1 className='font-bodoni  text-[#0D1217] font-bold text-4xl'>Recent Search</h1>
            <p className='text-[#031C2C] py-1'>234 New items added</p>
        </div>
        <div className='flex gap-x-7 gap-y-10 pt-10 overflow-x-auto pb-5 scrollbar-hide '>
            {Array.from({length:8}).map((_, index)=>(<div key={index}>
            <ProductCard/>
            </div>))}
        </div>
    </div>
  )
}

export default RecentSearch