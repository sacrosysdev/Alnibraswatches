import React, { useRef } from 'react';
import ProductCard from '../../../components/user/ProductCard';
import { useProductList } from '../../../api/user/hooks';
import { ChevronLeft, ChevronRight } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { normalizeProductData } from '../../../api/user/service';

const ProductCardSkeleton = () => (
  <div className="min-w-[250px] max-w-[250px] h-[350px] bg-white rounded-xl shadow-md p-4 animate-pulse flex flex-col gap-4">
    <div className="bg-gray-200 h-[200px] rounded-lg w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-100 rounded w-1/2"></div>
    <div className="h-6 bg-gray-300 rounded w-full mt-auto"></div>
  </div>
);

const DemandItems = () => {
  const scrollRef = useRef(null);
  const { data: products, isLoading: loadingTopDemand } = useProductList({ pageNo: 1, pageSize: 10 });
  const navigate = useNavigate();
  
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };
  
  const goToProductList = () => {
    navigate('/trending');
  };

  const hasProducts = !loadingTopDemand && 
    products?.pages && 
    products.pages[0]?.data && 
    products.pages[0].data.length > 0;

  return (
    <div className="relative">
      <div className='flex justify-between items-center'>
        <h1 className='font-bodoni text-[#0D1217] font-bold md:text-[34px] text-[25px]'>Top Demanded Items</h1>
        <p className='text-[#005C53] py-1 cursor-pointer' onClick={goToProductList}>See All</p>
      </div>
      
      {hasProducts && (
        <>
          <button 
            onClick={() => scroll('left')} 
            className="absolute top-1/2 -left-4 z-10 bg-white rounded-full shadow p-1"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')} 
            className="absolute top-1/2 -right-4 z-10 bg-white rounded-full shadow p-1"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
      
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth no-scrollbar pt-6 md:pt-10 pb-4 gap-2 md:gap-4"
      >
        {loadingTopDemand &&
          Array.from({ length: 5 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        }

        {!loadingTopDemand && !hasProducts && (
          <div className="w-full flex justify-center py-8">
            <p>No products available at the moment.</p>
          </div>
        )}
        
        {hasProducts &&
          products.pages[0].data.map((item, index) => (
            <div
              key={item.productId}
              className={`min-w-[250px] max-w-[250px] flex-shrink-0 ${
                index !== products.pages[0].data.length - 1 ? 'md:mr-5' : ''
              }`}
            >
              <ProductCard {...normalizeProductData(item)} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default DemandItems;
