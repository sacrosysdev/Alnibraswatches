import React from 'react'
import ProductCard from '../../../components/user/ProductCard'
import productData from '../../../constants'


const DemandItems = () => {
  
  return (
    <div>
        <div className='flex flex-col gap-2'>
            <h1 className='font-bodoni  text-[#0D1217] font-bold text-4xl'>Top Demanded Items</h1>
            <p className='text-[#031C2C] py-1'>234 New items added</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-9 gap-y-10 pt-10'>
        {productData.map((item)=>(<div key={item.id}>
          <ProductCard id = {item.id} image = {item.image} title = {item.title} brand={item.brand} price ={item.price}/>
        </div>))}
        </div>
    </div>
  )
}

export default DemandItems