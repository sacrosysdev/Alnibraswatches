import React, { useState, useEffect } from 'react'
import Heart from '../../../assets/svg/product/heart.svg'
import ImageMagnifier from '../../../components/user/imagemagnifier/ImageMagnifier'

const ImageSection = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]?.imageUrl);
  useEffect(() => {
    if (images?.length > 0) {
      setMainImage(images[0].imageUrl);
    }
  }, [images]);
  return (
    <div>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
        <div className='col-span-1 flex flex-row md:flex-col gap-3'>
          {images?.map((item, index) => (
            <div key={index}>
              <div className='h-24 w-24 border border-[#E6E6E6] rounded-sm' onClick={() => setMainImage(item.imageUrl)}>
                {item.imageUrl && (
                  <img src={item.imageUrl} alt="product" className='h-full w-full object-contain cursor-pointer' />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className='relative col-span-4 border rounded-sm border-[#E6E6E6] flex justify-center items-center min-h-[50vh] xl:min-h-[550px]'>
          <div>
            <ImageMagnifier ImageUrl={mainImage} />
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