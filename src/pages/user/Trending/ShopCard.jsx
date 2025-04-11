import React, { useEffect } from 'react'
import Heart from '../../../assets/svg/product/smallHeart.svg'
import { useWishlist } from '../../../contexts/user/WishListContext'
import FillHeart from '../../../assets/svg/product/heartfill.svg'
import { motion } from 'framer-motion'

const ShopCard = ({id,image, title, brand, price, offerprice}) => {
  const {wishlist, addToWishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const isInWishList= wishlist.some((item) => item.id === id)
  useEffect(() => {
    console.log("Wishlist changed:", wishlist);
  }, [wishlist]);
  
  return (
    <div className='relative flex flex-col items-center gap-4 pb-5 bg-[#FFFFFF] shadow-[10px_4px_10px_rgba(0,0,0,0.1)] rounded-2xl'>
      <div className='w-[172px] h-[172px] overflow-hidden '>
        <img src={image} alt="" className='h-full w-full object-cover'/>
      </div>
      <div className='text-center flex flex-col gap-1'>
        <h1 className='font-medium text-xl text-[#010F17]'>{title} </h1>
        <h3 className='text-base text-[#757C81]'>Brand : <span>{brand}</span></h3>
      </div>
      <div className='flex gap-5 items-center'>
      <h1 className='font-bold text-xl text-[#010F17]'>{price}</h1>
      <h1 className='font-bold text-xl text-[#B0B0B0]'>{offerprice}</h1>
      </div>
      <div className='absolute top-4 right-4'>
      <motion.img  src={isInWishList ? FillHeart : Heart} whileTap={{ scale:0.8}}  alt="wishlist" className='cursor-pointer hover:text-black' onClick={()=>{ isInWishList ? removeFromWishlist(id) : addToWishlist({ id, image, title, brand, price })}} />
      </div>
    </div>
  )
}

export default ShopCard