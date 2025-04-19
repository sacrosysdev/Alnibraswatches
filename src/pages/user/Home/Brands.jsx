import React, { useRef } from 'react';
import { useBrandList } from '../../../api/user/hooks';
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Brands = () => {
  const { data: brands, isLoading: loadingBrands } = useBrandList();
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='font-bodoni text-[#0D1217] font-bold text-[34px]'>Shop by Brands</h1>
          <p className='text-[#031C2C] py-1'>234 New items added</p>
        </div>
     
      </div>
        <div className="relative px-5 pt-10">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
        >
          <ChevronLeft className='cursor-pointer'/>
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-3 scrollbar-hide scroll-smooth"
        >
          {!loadingBrands && brands?.length > 0 && brands.map((item, index) => (
            <img
              key={index}
              src={item.ImageUrl}
              alt=""
              className="w-[300px] h-[300px] object-cover rounded-md"
            />
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
        >
          <ChevronRight className='cursor-pointer'/>
        </button>
      </div>
    </div>
  );
};

export default Brands;
