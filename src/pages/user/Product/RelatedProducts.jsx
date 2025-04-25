import React, { useRef } from 'react'
import ProductCard from '../../../components/user/ProductCard';
import { useProductListWithCategory } from '../../../api/user/hooks'
import { normalizeProductData } from '../../../api/user/service'
import { ChevronLeft, ChevronRight } from 'lucide-react';


const RelatedProducts = ({ selectedProd }) => {
  const scrollRef = useRef(null);

  const { data: relatedproduct = [], isLoading: loadingRelated } = useProductListWithCategory(
    selectedProd?.categoryId
  );

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='py-5 relative'>
      <div className='flex flex-col gap-2'>
        <h1 className='font-bodoni  text-[#0D1217] font-bold text-4xl'>Related Products</h1>
      </div>

      {/* Arrows */}
      <button onClick={() => scroll('left')} className="absolute top-1/2 -left-4 z-10 bg-white rounded-full shadow p-1">
        <ChevronLeft size={24} />
      </button>
      <button onClick={() => scroll('right')} className="absolute top-1/2 -right-4 z-10 bg-white rounded-full shadow p-1">
        <ChevronRight size={24} />
      </button>

      {/* Product Cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth no-scrollbar pt-6 md:pt-10 pb-4 gap-2 md:gap-4"
      >
        {!loadingRelated &&
          relatedproduct.map((item, index) => (
            <div
              key={item.productId}
              className={`min-w-[250px] max-w-[250px] flex-shrink-0 ${
                index !== relatedproduct.length - 1 ? 'md:mr-5' : ''
              }`}
            >
              <ProductCard {...normalizeProductData(item)} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts