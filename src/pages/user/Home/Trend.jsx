import React, { useRef } from 'react';
import Blob1 from '../../../assets/blobs/blobs1.svg';
import { useCategoryList } from '../../../api/user/hooks';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Trend = () => {
  const { data: categories, isLoading: loadingCategories } = useCategoryList();
  const scrollRef = useRef();
  const navigate = useNavigate();
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
  };
  const goToProductList = (filters) => {
    const params = new URLSearchParams(filters).toString();
    navigate(`/trending?${params}`);
  };
  return (
    <div className="relative">
      <div>
        <h1 className="font-bodoni text-[#00211E] font-bold md:text-[34px] text-[25px]">Shop on Trend</h1>
        <p className="text-[#005C53]">We have every style at your affordable budget</p>
      </div>

      {/* Scrollable Container Wrapper */}
      <div className="relative md:mt-10 md:px-10 px-1 mt-5">
        {/* Previous Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md p-1 rounded-full"
        >
          <ChevronLeft size={24} className='cursor-pointer'/>
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap:2 md:gap-6 scroll-smooth scrollbar-hide py-4"
        >
          {!loadingCategories &&
            categories?.length > 0 &&
            categories.map((item, index) => (
              <div
                key={index}
                onClick={()=>goToProductList({category:item.Id})}
                className="relative shadow-2xl rounded-2xl overflow-hidden py-5 min-w-[200px] sm:min-w-[250px] md:min-w-[300px] 
                           lg:min-w-[300px] h-[350px] hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer bg-white"
              >
                {/* Decorative blob */}
                <div className="absolute left-0 top-0 z-0">
                  <img src={Blob1} alt="" className="object-contain w-full h-full" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col gap-2 items-center h-full px-4">
                  <h1 className="font-medium text-lg md:text-xl text-center">{item.Name}</h1>
                  {/* <p className="md:text-sm text-xs text-center">{item.CategoryDescription}</p> */}
                  <div className="mt-auto w-full h-[280px]">
                    <img
                      src={item.ImageUrl}
                      alt=""
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Next Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md p-1 rounded-full"
        >
          <ChevronRight size={24} className='cursor-pointer'/>
        </button>
      </div>
    </div>
  );
};

export default Trend;
