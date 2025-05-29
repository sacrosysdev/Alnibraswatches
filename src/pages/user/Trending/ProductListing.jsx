import React, { useRef, useCallback } from 'react';
import ShopCard from './ShopCard';
import { useProductList } from '../../../api/user/hooks';
import { FadeLoader } from 'react-spinners';
import { normalizeProductData } from '../../../api/user/service';
import { useLocation } from 'react-router-dom';
const ProductListing = ({ products: filteredProducts = null, isLoading: externalLoading = false }) => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const brand = query.get('brand');
  const category = query.get('category');
  const filters = { brand, category };
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: defaultLoading
  } = useProductList(filters);
  const observer = useRef();

  const loadMoreRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage]
  );
  const loading = filteredProducts ? externalLoading : defaultLoading;
  return (
    <div>
    {!loading&&
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {(filteredProducts || data?.pages.flatMap(page => page.data)).map((item, index, arr) => {
          const isLast = index === arr.length - 1;
          const cardProps = normalizeProductData(item);
          return isLast ? (
            <div ref={loadMoreRef} key={item.productId}>
              <ShopCard {...cardProps} />
            </div>
          ) : (
            <ShopCard key={item.productId} {...cardProps} />
          );
        })}
      </div>
    }
    {!filteredProducts && isFetchingNextPage && (
      <div className='flex justify-center'>
        <FadeLoader color="#005C53" />
      </div>
    )}
  </div>
  );
};

export default ProductListing;
