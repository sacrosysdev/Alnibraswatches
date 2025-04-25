import React from 'react'
import Heart from '../../assets/svg/product/smallHeart.svg'
import { useWishlist } from '../../contexts/user/WishListContext'
import FillHeart from '../../assets/svg/product/heartfill.svg'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
const ProductCard = ({ id, image, title, brand, price }) => {
  const { wishlist, addToWishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const isInWishList = wishlist.some((item) => item.id === id)
  const navigate = useNavigate()
  const goToProductDetailPage = () => {
    navigate(`/product/${id}`)

  }
  return (
    <div className='relative flex flex-col items-center gap-4 pb-5 
                  bg-[#F1F1F1] border border-[#A3C4C1] shadow-xl 
                    rounded-2xl h-[400px] md:h-[450px] cursor-pointer'
      onClick={goToProductDetailPage}>
      <div className='w-full h-[200px] md:h-[250px] overflow-hidden'>
        <img src={image} alt="" className='h-full w-full object-cover' />
      </div>
      <div className='text-center flex flex-col gap-1'>
        <h1 className='font-medium text-lg md:text-xl text-[#010F17]'>{title} </h1>
        <h3 className='text-sm text-[#757C81]'> <span>{brand}</span></h3>
      </div>
      <h1 className='font-bold text-sm md:text-xl text-[#003F38]'>AED : <span>{price}</span></h1>
      <div className='absolute top-4 right-4 '>
        <motion.img src={isInWishList ? FillHeart : Heart} whileTap={{ scale: 0.8 }} alt="wishlist" className='cursor-pointer hover:text-black' onClick={() => { isInWishList ? removeFromWishlist(id) : addToWishlist({ id, image, title, brand, price }) }} />
      </div>
    </div>
  )
}

export default ProductCard