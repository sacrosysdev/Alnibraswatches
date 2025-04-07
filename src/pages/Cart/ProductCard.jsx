import React from 'react'
import Product from '../../assets/images/home/productimage.png'
import { IoCloseOutline } from "react-icons/io5";

const ProductCard = () => {
  return (
    <div className='relative grid grid-cols-2 xl:grid-cols-6 items-center  py-10 gap-5'>
        <div className='col-span-1 h-20 mx-auto'>
            <img src={Product} alt="product" className='h-full w-full object-contain '/>
        </div>
        <div className='col-span-1 xl:col-span-2 flex flex-col '>
            <p className='font-medium'>Apple Watch Series 9 GPS 41mm Starlight Aluminium </p>
            <p className='pt-2 text-sm'>#63632324</p>
        </div>
        <div className='flex col-span-1 items-center justify-center xl:justify-start gap-3'>
            <div className='cursor-pointer'>-</div>
            <div className='px-5 py-1 border border-[#D9D9D9] rounded-lg flex justify-center items-center'>
                <h1>1</h1>
            </div>
            <div className='cursor-pointer'>+</div>
        </div>
        <div className='col-span-1 font-medium text-xl'>AED 100</div>
        <div className='hidden xl:flex col-span-1 cursor-pointer'><IoCloseOutline size={25} /></div>
        <div className='absolute top-2 right-2 flex xl:hidden  col-span-1 cursor-pointer'><IoCloseOutline size={25} /></div>
    </div>
  )
}

export default ProductCard