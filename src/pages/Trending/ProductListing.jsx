import React from 'react'

import ShopCard from './ShopCard'

const ProductListing = () => {
  return (
    <div>
        <div className='grid grid-cols-4 gap-x-7 gap-y-10 pt-10'>
        {Array.from({length:8}).map((_, index)=>(<div key={index}>
          <ShopCard/>
        </div>))}
        </div>
    </div>
  )
}

export default ProductListing