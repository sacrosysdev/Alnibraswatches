import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import DoubleTick from '../../assets/svg/product/doubletick.svg'
import ProductInfo from './ProductInfo';
import Ratings from './Ratings';

const ProductDetails = () => {
    const colors = [
        {
            color: "Red",
            code: "bg-red-700"
        },
        {
            color: "White",
            code: "bg-white"
        },
        {
            color: "Black",
            code: "bg-black"
        },
        {
            color: "Yellow",
            code: "bg-yellow-700"
        },
    ]
    return (
        <section className='flex flex-col gap-4 '>
            <h2 className='font-bold font-bodoni text-4xl text-[#0D1217]'>Trending</h2>
            <h3 className='text-[#546D7D] text-base font-normal'>Huawei 3pro Smart Watch</h3>
            <h3 className='text-[#A5B2BA] text-base font-normal'>Brand : <span>Huawei</span> </h3>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-3'>
                    <h1 className='font-bold text-2xl text-[#0D1217]'>AED 2700</h1>
                    <h1 className='font-bold text-2xl text-[#A5B2BA] line-through'>AED 2950</h1>
                </div>
                <h3 className='text-[#30933A] text-sm font-gilroy'>Hurray! You have saved AED 2500</h3>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='font-gilroy text-base'>Available Colors</h1>
                <div className='flex gap-5 '>
                    {colors.map((item, index) => (<div key={index} >
                        <div className={`h-12 w-12 rounded-sm ${item.code}`}></div>
                        <h4 className='text-[#605D5D] text-xs'>{item.color}</h4>
                    </div>))}
                </div>
            </div>
            <div className='grid grid-cols-2 gap-6'>
                <button className='bg-[#00211E] text-white rounded-lg py-3 px-6'>Buy Now</button>
                <button className='bg-white text-[#010F17] border border-[#010F17] rounded-lg py-3 px-6'>Add to Cart</button>
            </div>
            <div className='flex flex-col gap-2 pb-3'>
                <h1 className='font-gilroy text-base'>Select Size</h1>
                <div className="relative w-fit">
                    <select className="appearance-none border border-[#005C53] rounded-md py-2 px-8 pr-16  focus:outline-none ">
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        
                    </select>
                    <div className="absolute  inset-0  flex items-center left-4 justify-center pointer-events-none">
                        <IoIosArrowDown />
                    </div>
                    
                </div>
            </div>
            <hr className='text-[#E5E5E5]' />
             <div className='font-gilroy py-2'>
                <div className='flex gap-2 items-center'>
                    <div>
                        <img src={DoubleTick} alt="doubletick" />
                    </div>
                    <h1 className='text-base text-[#757C81]'>Standard delivery between <span className='font-semibold text-[#010F17]'>24 Oct & 28 oct 2022</span></h1>
                </div>
                <div className='flex gap-2 items-center'>
                    <div>
                        <img src={DoubleTick} alt="doubletick" />
                    </div>
                    <h1 className='text-base text-[#757C81]'>Cash / card delivery option available</h1>
                </div>
            </div>   
            <hr className='text-[#E5E5E5]' />
            <ProductInfo/>
            <hr className='text-[#E5E5E5]' />
            <Ratings/>
        </section>
    )
}

export default ProductDetails