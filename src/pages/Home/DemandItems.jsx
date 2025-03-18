import React from 'react'
import ProductCard from '../../components/ProductCard'

const DemandItems = () => {
  return (
    <div>
        <div className='flex flex-col gap-2'>
            <h1 className='font-bodoni  text-[#0D1217] font-bold text-4xl'>Top Demanded Items</h1>
            <p className='text-[#031C2C] py-1'>234 New items added</p>
        </div>
        <div className='grid grid-cols-4 gap-x-7 gap-y-10 pt-10'>
        {Array.from({length:8}).map((_, index)=>(<div key={index}>
          <ProductCard/>
        </div>))}
        </div>
    </div>
  )
}

export default DemandItems