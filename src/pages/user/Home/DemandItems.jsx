import React, { useRef } from 'react';
import ProductCard from '../../../components/user/ProductCard';
import { useProductList } from '../../../api/user/hooks';
import { ChevronLeft, ChevronRight } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { normalizeProductData } from '../../../api/user/service';

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

  // Handle case when data is still loading or not available
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
      
      {/* Only show arrows if we have products */}
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
      
      {/* Scrollable Product Cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth no-scrollbar pt-6 md:pt-10 pb-4 gap-2 md:gap-4"
      >
        {loadingTopDemand && (
          <div className="w-full flex justify-center py-8">
            <p>Loading products...</p>
          </div>
        )}
        
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
          ))}
      </div>
    </div>
  );
};

export default DemandItems;