import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { useCart } from '../../../contexts/user/CartContext';

const ProductCard = ({id,image, title, brand, price, quantity}) => {
    const {addToCart, decreaseFromCart, removeItemFromCart} = useCart()
 
  return (
    <div className='relative grid grid-cols-2 xl:grid-cols-6 items-center  py-10 gap-5'>
        <div className='col-span-1 h-20 mx-auto'>
            <img src={image} alt="product" className='h-full w-full object-contain '/>
        </div>
        <div className='col-span-1 xl:col-span-2 flex flex-col '>
            <p className='font-medium'>{title} </p>
            <p className='pt-2 text-sm'>#63632324</p>
        </div>
        <div className='flex col-span-1 items-center justify-center xl:justify-start gap-3'>
            <div className='cursor-pointer' onClick={()=>{decreaseFromCart(id)}}>-</div>
            <div className='px-5 py-1 border border-[#D9D9D9] rounded-lg flex justify-center items-center'>
                <h1>{quantity}</h1>
            </div>
            <div className='cursor-pointer' onClick={()=>{addToCart({ id, image, title, brand, price, quantity:1 })}}>+</div>
        </div>
        <div className='col-span-1 font-medium text-xl'>AED <span>{price}</span></div>
        <div className='hidden xl:flex col-span-1 cursor-pointer'><IoCloseOutline size={25} className='cursor-pointer '
        onClick={()=>{removeItemFromCart(id)}}
         /></div>
        <div className='absolute top-2 right-2 flex xl:hidden  col-span-1 '><IoCloseOutline size={25} className='cursor-pointer '
        onClick={()=>{removeItemFromCart(id)}}
        /></div>
    </div>
  )
}

export default ProductCard