import React, { useRef } from 'react';
import ProductCard from '../../../components/user/ProductCard';
import { useProductList } from '../../../api/user/hooks';
import { ChevronLeft, ChevronRight } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { normalizeProductData } from '../../../api/user/service';

const DemandItems = () => {
  const scrollRef = useRef(null);
  const { data: products, isLoading: loadingTopDemand } = useProductList({ pageNo: 1, pageSize: 10 });
  const navigate = useNavigate()
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };
  const goToProductList = () => {
    navigate('/trending')
  } 

  return (
    <div className="relative">
      <div className='flex justify-between items-center'>
        <h1 className='font-bodoni text-[#0D1217] font-bold md:text-[34px] text-[25px]'>Top Demanded Items</h1>
        <p className='text-[#005C53] py-1 cursor-pointer' onClick={goToProductList}>See All</p>
      </div>
      {/* Arrows */}
      <button onClick={() => scroll('left')} className="absolute top-1/2 -left-4 z-10 bg-white rounded-full shadow p-1">
        <ChevronLeft size={24} />
      </button>
      <button onClick={() => scroll('right')} className="absolute top-1/2 -right-4 z-10 bg-white rounded-full shadow p-1">
        <ChevronRight size={24} />
      </button>
      {/* Scrollable Product Cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth no-scrollbar pt-6 md:pt-10 pb-4 gap-2 md:gap-4"
      >
        {!loadingTopDemand &&
          products.pages[0].data?.length > 0 &&
          products.pages[0].data.map((item, index) => (
            <div
              key={item.productId}
              className={`min-w-[250px] max-w-[250px] flex-shrink-0 ${index !== products.length - 1 ? 'md:mr-5' : ''}`}
            >
              <ProductCard {...normalizeProductData(item)} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DemandItems;
