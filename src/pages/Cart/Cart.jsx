import React from 'react'
import ProductCard from './ProductCard'
import SummaryBox from './SummaryBox'
import Ratings from '../Product/Ratings'
import RecentSearch from '../Product/RecentSearch'

const Cart = () => {
  return (
    <div className='p-5 xl:p-16'>
        <div>
            <div className='grid grid-cols-1 xl:grid-cols-2'>
                <div>
                <h1 className='font-semibold font-playfair text-3xl'>Shopping Cart</h1>
                {Array.from({length:3}).map((_, index)=>(<div key={index} className={`${index !== 2 ?'border-b border-[#A3A3A3]':''}`}>
                    <ProductCard/>
                </div>))}
                </div>
                <div className='w-full xl:w-2/3 mx-auto'>
                    <SummaryBox/>
                </div>
            </div>
            <hr className='text-[#E5E5E5]'/>
            <div className='py-5'>
                <Ratings/>
            </div>
            <div className='py-5'>
                <RecentSearch/>
            </div>
        </div>
    </div>
  )
}

export default Cart