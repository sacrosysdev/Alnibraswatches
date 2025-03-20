import React from 'react'
import Product1 from '../../assets/images/home/trendImg1.png'
import Product2 from '../../assets/images/home/product2.png'
import Product3 from '../../assets/images/home/product3.png'
import Heart from '../../assets/svg/product/heart.svg'

const ImageSection = () => {
    const products = [Product1, Product2, Product3]
  return (
    <div>
        <div className='grid grid-cols-5 gap-3'>
            <div className='col-span-1  flex flex-col gap-3'>
                {products.map((item, index)=>(<div key={index}>
                    <div className='h-24 w-24 border border-[#E6E6E6] rounded-sm'>
                        <img src={item} alt="product" className='h-full w-full object-contain' />
                    </div>
                </div>))}
            </div>
            <div className='relative col-span-4 border rounded-sm border-[#E6E6E6] flex justify-center items-center  h-[550px]'>
                <div className=''>
                    <img src={Product2} alt="product" className='h-full w-full object-contain' />
                </div>
                <div className='absolute top-5 right-5'>
                    <img src={Heart} alt="wishlist" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ImageSection