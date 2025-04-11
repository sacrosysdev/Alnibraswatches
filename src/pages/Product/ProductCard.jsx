import React from 'react'
import Product from '../../assets/images/home/productimage.png'
import { FaAngleRight } from "react-icons/fa6";
import Heart from '../../assets/svg/product/smallHeart.svg'
import FillHeart from '../../assets/svg/product/heartfill.svg'
import { useWishlist } from '../../contexts/WishListContext';
import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';

const ProductCard = ({id,image, title, brand, price, quantity}) => {
  const {wishlist, addToWishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const isInWishList= wishlist.some((item) => item.id === id)
  console.log(wishlist)
  const {cart, addToCart, decreaseFromCart, removeFromCart, clearCart } = useCart()
  const isInCart = cart.some((item)=>item.id === id)
  console.log(cart)
  return (
    <div className='relative flex flex-col items-center gap-4 p-6 bg-[#F1F1F1]  rounded-2xl'>

      <div className='w-[311px] h-[280px] overflow-hidden'>
        <img src={image} alt="" className='h-full w-full object-contain' />
      </div>
      <div className=' flex flex-col gap-6'>
        <div className='flex justify-between items-center gap-6'>
          <h1 className='font-medium text-base text-[#003F38]'>{title} </h1>
          <h1 className='font-bold text-xl text-[#003F38]'>AED <span>{price}</span></h1>
        </div>
        <div className='flex flex-col gap-2'>
          <h3 className='flex justify-end text-xs text-[#757C81]'>Brand: <span>{brand}</span></h3>
          <div className='flex justify-end items-center text-[#003F38] gap-1'>
            <h2 className=' text-base font-bold'>See Full Specifications</h2>
            <FaAngleRight />
          </div>
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <button className='col-span-2 bg-[#003F38] px-6 py-3 rounded-lg text-white cursor-pointer' onClick={()=>{!isInCart ? addToCart({id, image, title, brand, price}):''}}>
            {isInCart ? 'Added':'Add To Cart'}
          </button>
          <div className='col-span-1 m-auto border border-[#A3C4C1] px-6 py-3 rounded-lg'>
            <motion.img  src={isInWishList ? FillHeart : Heart} whileTap={{ scale:0.8}}  alt="wishlist" className='cursor-pointer hover:text-black' onClick={()=>{ isInWishList ? removeFromWishlist(id) : addToWishlist({ id, image, title, brand, price })}} />
          </div>
        </div>
      </div>
      <div className='absolute   top-10 right-10 xl:top-5 xl:right-5'>
      <motion.img  src={isInWishList ? FillHeart : Heart} whileTap={{ scale:0.8}}  alt="wishlist" className='cursor-pointer hover:text-black' onClick={()=>{ isInWishList ? removeFromWishlist(id) : addToWishlist({ id, image, title, brand, price })}} />
      </div>
    </div>
  )
}

export default ProductCard