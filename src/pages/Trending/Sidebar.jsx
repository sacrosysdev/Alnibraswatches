import React from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { SelectOption, StarRating, CheckboxList } from './Filters';


const Sidebar = () => {
  const brands = ['Samsung', 'Realme', 'Vivo', 'Oppo', 'Apple', 'Xiaomi', 'Redmi', 'Sony'];
  const types = ['Analog', 'Digital', 'Analog-Digital', 'iOS', 'Symbian'];
  const department = ['Smart Watches', 'Basic Watches']
  const priceRanges = [
    'Under ₹1000',
    '₹1000 - ₹5000',
    '₹5000 - ₹10000',
    '₹10000 - ₹20000',
    'Over ₹20000'
  ];
  const deals =["Today's Deals"]
  return (
    <div className='px-5 py-3 bg-white flex flex-col gap-5 w-full h-[70vh] md:h-auto overflow-y-auto md:overflow-y-hidden'>
        <div className='text-sm flex flex-col gap-2'>
          <h1 className='font-bold '>Department</h1>
            <div>
              <SelectOption items={department} showMore={true}/>
            </div>
        </div>
       <div>
        <h1 className='font-bold text-sm pb-2'>Customer Review</h1>
          <div className="space-y-1">
            {[4, 3, 2, 1].map((rating) => (
              <StarRating key={rating} rating={rating} />
            ))}
          </div>
        </div>
       <div>
        <h1 className='font-bold text-sm pb-2'>Brand</h1>
        <CheckboxList items={brands} showMore={true} />
       </div>
       <div>
        <h1 className='font-bold text-sm pb-2'>Type</h1>
        <CheckboxList items={types} showMore={false} />
       </div>
       <div className='text-sm flex flex-col gap-2'>
          <h1 className='font-bold '>Price</h1>
            <div>
              <SelectOption items={priceRanges} showMore={false}/>
            </div>
            <div className='flex items-center gap-1'>
              <FaAngleDown color='#555555'/>
            <div className="text-[#007185] text-sm cursor-pointer hover:underline">Label 2</div>
            
      </div>
      <div className="flex items-center space-x-2">
          <input type="text" placeholder="₹Min" className="w-16 border border-[#898C8C] rounded-md p-1 text-xs" />
          <input type="text" placeholder="₹Max" className="w-16 border border-[#898C8C] rounded-md p-1 text-xs" />
          <button type='submit' className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded">Go</button>
        </div>
        </div>
        <div className='text-sm flex flex-col gap-2'>
          <h1 className='font-bold '>Deals</h1>
            <div>
            <CheckboxList items={deals} showMore={false} />
            </div>
        </div>
    </div>
  )
}

export default Sidebar