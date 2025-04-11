import React from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Header = () => {
  return (
    <div className='flex flex-col gap-3'>
            <h1 className='font-semibold font-playfair text-3xl'>Order History</h1>
            <div className='flex items-center gap-1'>
                <div className='flex items-center'>
                  <h1 className='text-[#546D7D] text-base'>Home</h1>
                  <span><MdOutlineKeyboardArrowRight color='#546D7D'/></span>
                </div>
                <h1 className='text-[#95A51B] text-base'>Order History</h1>
            </div>
        </div>
  )
}

export default Header