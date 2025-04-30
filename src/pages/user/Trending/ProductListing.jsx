import React, { useRef, useCallback } from 'react';
import ShopCard from './ShopCard';
import { useProductList } from '../../../api/user/hooks';
import { FadeLoader } from 'react-spinners';
import { normalizeProductData } from '../../../api/user/service';
import { useLocation } from 'react-router-dom';
const ProductListing = () => {
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
    isLoading
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
  return (
    <div>
      {isLoading ? (
        <div className='flex justify-center'>
          <FadeLoader color="#005C53" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {data?.pages.map((group, groupIndex) =>
            group.data.map((item, index) => {
              const isLast =
                groupIndex === data.pages.length - 1 &&
                index === group.data.length - 1;
              const cardProps = normalizeProductData(item);
              return isLast ? (
                <div ref={loadMoreRef} key={item.productId}>
                  <ShopCard {...cardProps} />
                </div>
              ) : (
                <ShopCard key={item.productId} {...cardProps} />
              );
            })
          )}
        </div>
      )}
      {isFetchingNextPage && (
        <div className='flex justify-center'>
          <FadeLoader color="#005C53" />
        </div>
      )}
    </div>
  );
};

export default ProductListing;
