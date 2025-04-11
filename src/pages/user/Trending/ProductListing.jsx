import React from 'react'
import productData from '../../../constants'
import ShopCard from './ShopCard'

const ProductListing = () => {
  return (
    <div>
        <div className='grid grid-cols-1 xl:grid-cols-4 gap-3 xl:gap-x-7 gap-y-10 pt-10'>
        {productData.map((item)=>(<div key={item.id}>
          <ShopCard  id={item.id} image = {item.image} title = {item.title} brand={item.brand} price ={item.price} offerprice={item.offerPrice}/>
        </div>))}
        </div>
    </div>
  )
}

export default ProductListing