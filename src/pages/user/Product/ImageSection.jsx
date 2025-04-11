import React, { useState } from 'react'
import Product1 from '../../../assets/images/home/trendImg1.png'
import Product2 from '../../../assets/images/home/product2.png'
import Product3 from '../../../assets/images/home/product3.png'
import Heart from '../../../assets/svg/product/heart.svg'
import ImageMagnifier from '../../../components/user/imagemagnifier/ImageMagnifier'

const ImageSection = () => {
    const products = [{id:1,name:Product1}, {id:2,name:Product2}, {id:3,name:Product3}]
    const [mainImage, setMainImage] = useState(Product1)
    const changeMainImage =(newImage)=>{
        setMainImage(newImage)
    }
  return (
    <div>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
            <div className='col-span-1  flex flex-row md:flex-col gap-3'>
                {products.map((item, index)=>(<div key={index}>
                    <div className='h-24 w-24 border border-[#E6E6E6] rounded-sm' onClick={()=>{changeMainImage(item.name)}}>
                        <img src={item.name} alt="product" className='h-full w-full object-contain' />
                    </div>
                </div>))}
            </div>
            <div className='relative col-span-4 border rounded-sm border-[#E6E6E6] flex justify-center items-center min-h-[50vh] xl:min-h-[550px]'>
                <div className=''>
                    <ImageMagnifier ImageUrl={mainImage}/>
                    {/* <img src={mainImage} alt="product" className='h-full w-full object-contain hover:scale-125 transform transition-all duration-500 ease-in-out cursor-pointer' /> */}
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