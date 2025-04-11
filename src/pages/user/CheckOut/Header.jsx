import React from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Header = () => {
  return (
        <div className='flex flex-col gap-3'>
            <h1 className='font-semibold font-playfair text-3xl'>Checkout</h1>
            <div className='flex items-center gap-1'>
                <div className='flex items-center'>
                  <h1 className='text-[#546D7D] text-base'>Home</h1>
                  <span><MdOutlineKeyboardArrowRight color='#546D7D'/></span>
                </div>
                <div className='flex items-center'>
                  <h1 className='text-[#546D7D] text-base'>Cart</h1>
                  <span><MdOutlineKeyboardArrowRight color='#546D7D'/></span>
                </div>
                <h1 className='text-[#005C53] text-base'>Checkout</h1>
            </div>
        </div>
  )
}

export default Header