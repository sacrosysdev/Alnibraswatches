import React from 'react'
import { IoCloseOutline } from "react-icons/io5";


const ProductCard = ({  image, title, price, quantity, product, increaseFromCart, decreaseFromCart, removeItemFromCart }) => {
    return (
      <div className='relative grid grid-cols-2 xl:grid-cols-6 items-center py-10 gap-5'>
        <div className='col-span-1 h-20 mx-auto'>
          <img src={image} alt="product" className='h-full w-full object-contain' />
        </div>
        <div className='col-span-1 xl:col-span-2 flex flex-col'>
          <p className='font-medium'>{title}</p>
        </div>
        <div className='flex col-span-1 items-center justify-center xl:justify-start gap-3'>
          <div className='cursor-pointer' onClick={decreaseFromCart}>-</div>
          <div className='px-5 py-1 border border-[#D9D9D9] rounded-lg flex justify-center items-center'>
            <h1>{quantity}</h1>
          </div>
          <div className='cursor-pointer' onClick={increaseFromCart}>+</div>
        </div>
        <div className='col-span-1 font-medium text-xl'>AED <span>{price}</span></div>
        <div className='hidden xl:flex col-span-1 cursor-pointer'>
          <IoCloseOutline size={25} onClick={removeItemFromCart} />
        </div>
        <div className='absolute top-2 right-2 flex xl:hidden'>
          <IoCloseOutline size={25} onClick={removeItemFromCart} />
        </div>
      </div>
    );
  };
  

export default ProductCard