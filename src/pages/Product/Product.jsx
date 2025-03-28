import React from 'react'
import ProductDetails from './ProductDetails'
import ImageSection from './ImageSection'
import RecentSearch from './RecentSearch'

const Product = () => {
  return (
    <div className='p-5 xl:p-16'>
        <div className='grid grid-cols-1  md:grid-cols-2 gap-6'>
            <div>
                <ImageSection/>
            </div>
            <div>
                <ProductDetails/>
            </div>
        </div>
        <RecentSearch/>
    </div>
  )
}

export default Product