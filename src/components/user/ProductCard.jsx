import React from 'react'
import Heart from '../../assets/svg/product/smallHeart.svg'
import { useWishlist } from '../../contexts/user/WishListContext'
import FillHeart from '../../assets/svg/product/heartfill.svg'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ id, image, title, brand, price, variantId }) => {
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const navigate = useNavigate()

  const goToProductDetailPage = (e) => {
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

  // Format price for display
  const displayPrice = price !== undefined && price !== null
    ? price
    : 'Price not available';

  return (
    <div className='relative flex flex-col items-center gap-4 pb-5 
                  bg-[#F1F1F1] border border-[#A3C4C1] shadow-xl 
                    rounded-2xl h-[400px] md:h-[450px] cursor-pointer'
      onClick={goToProductDetailPage}>
      <div className='w-full h-[200px] overflow-hidden'>
        <img src={image} alt={title} className='h-full w-full object-cover' />
      </div>
      <div className='text-center flex flex-col gap-1'>
        <h1 className='font-medium text-lg md:text-lg text-[#010F17]'>{title}</h1>
        <h3 className='text-sm text-[#757C81]'><span>{brand}</span></h3>
      </div>
      <div className='flex justify-items-end'>
        <h1 className='font-bold text-sm md:text-xl text-[#003F38]'>AED : <span>{displayPrice}</span></h1>
      </div>
      <div className='absolute top-4 right-4'>
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

export default ProductCard