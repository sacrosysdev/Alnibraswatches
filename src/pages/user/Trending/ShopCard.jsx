import React from 'react'
import Heart from '../../../assets/svg/product/smallHeart.svg'
import { useWishlist } from '../../../contexts/user/WishListContext'
import FillHeart from '../../../assets/svg/product/heartfill.svg'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const ShopCard = ({ id, image, title, brand, price, offerprice, variantId }) => {
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  
  const navigate = useNavigate()
  const goToProductDetailPage = () => {
    navigate(`/product/${id}`)
  }
  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (isInWishlist(id)) {
      removeFromWishlist({
        id,
        variantId
      });
    } else {
      addToWishlist({
        id,
        image,
        title,
        brand,
        price,
        variantId
      });
    }
  };

  return (
    <div className='relative flex flex-col items-center gap-4 pb-5 cursor-pointer
                  bg-[#FFFFFF] shadow-[10px_4px_10px_rgba(0,0,0,0.1)] rounded-2xl'
         onClick={goToProductDetailPage}>
      <div className='w-[172px] h-[172px] overflow-hidden'>
        <img src={image} alt="" className='h-full w-full object-cover' />
      </div>
      <div className='text-center flex flex-col gap-1'>
        <h1 className='font-medium text-lg md:text-lg text-[#010F17]'>{title}</h1>
        <h3 className='text-base text-[#757C81]'><span>{brand}</span></h3>
      </div>
      <div className='flex gap-5 items-center'>
        <h1 className='font-bold text-xl text-[#010F17]'>{price}</h1>
        {offerprice && <h1 className='font-bold text-xl text-[#B0B0B0]'>{offerprice}</h1>}
      </div>
      <div className='absolute top-4 right-1 bg-white rounded-full p-2'>
        <motion.img
          src={isInWishlist(id) ? FillHeart : Heart}
          whileTap={{ scale: 0.8 }}
          alt="wishlist"
          className='cursor-pointer hover:text-black'
          onClick={handleWishlistToggle}
        />
      </div>
    </div>
  )
}

export default ShopCard