import React from 'react'
import ProductCard from '../../components/ProductCard'
import productData from '../../constants'

const RecentSearched = () => {
  return (
    <div className=''>
        <div className='flex flex-col gap-2'>
            <h1 className='font-bodoni  text-[#0D1217] font-bold text-4xl'>Recent Searched</h1>
            <p className='text-[#031C2C] py-1'>234 New items added</p>
        </div>
        <div className='flex gap-x-7 gap-y-10 py-10 overflow-x-auto  scrollbar-hide '>
          {productData.map((item)=>(<div key={item.id}>
            <ProductCard id={item.id} image = {item.image} title = {item.title} brand={item.brand} price ={item.price}/>
          </div>))}
        </div>
    </div>
  )
}

export default RecentSearched