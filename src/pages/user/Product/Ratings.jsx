import React from 'react'
import Star from  '../../../assets/svg/product/star.svg'
import WStar  from '../../../assets/svg/product/whitestar.svg'
import { FaAngleRight } from "react-icons/fa6";

const Ratings = () => {
  return (
    <div>
        <div className='flex justify-between items-center py-3'>
            <h1 className='font-medium text-xl'>Ratings & Reviews</h1>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-2 items-center '>
                    <h1 className='font-bold text-3xl font-bodoni'>4.7</h1>
                    <div>
                        <img src={Star} alt="star" />
                    </div>
                </div>
                <h1>1254 Rating & 234 reviews </h1>
            </div>
        </div>
        <hr className='text-[#E5E5E5]' />
       <div>
       {Array.from({length:3}).map((_, index)=>(<div key={index}>
       <div className='flex gap-3 items-start py-5'>
            <div className='flex gap-1 items-center p-1 text-white bg-[#005C53] w-fit rounded-md'>
                <h1>5</h1>
                <div>
                    <img src={WStar} alt="logo" />
                </div>
            </div>
            <div>
                <h1>Fabulous Product, Really Loved it</h1>
                <h1>Abdul basith, Oct 26</h1>
            </div>
        </div>
        <hr className='text-[#E5E5E5]' />
       </div>))}
       </div>
       <div className='py-5 font-gilroy flex justify-between items-center'>
        <h1 className='text-base font-medium'>See all 243 Reviews</h1>
        <FaAngleRight />
       </div>
    </div>
  )
}

export default Ratings