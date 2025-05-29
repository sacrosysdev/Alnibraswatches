import React, { useState, useEffect } from 'react'
import ProductCard from '../../../components/user/ProductCard'
import { useWishlist } from '../../../contexts/user/WishListContext'
import NoData from '../../../assets/images/wishlist/Nodata.webp'
import { Link } from 'react-router-dom'
import WishlistCardSkeleton from '../../../components/user/Skelton/WishlistSkelton'

// Wishlist Grid Skeleton
const WishlistGridSkeleton = ({ count = 8 }) => (
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-10 p-5 xl:p-16'>
    {Array.from({ length: count }).map((_, index) => (
      <WishlistCardSkeleton key={index} />
    ))}
  </div>
);

// Complete Page Skeleton for initial load
const WishlistPageSkeleton = () => (
  <div className='bg-[#F1F1F1] min-h-screen'>
    <WishlistGridSkeleton count={8} />
  </div>
);

const Wishlist = () => {
  const { wishlist, isLoading } = useWishlist();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // Simulate initial loading state
  useEffect(() => {
    // If wishlist context doesn't have isLoading, simulate it
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1000); // Adjust timing as needed
    return () => clearTimeout(timer);
  }, []);

  // Use context loading state if available, otherwise use local state
  const loading = isLoading !== undefined ? isLoading : isInitialLoading;
  
  const isEmpty = wishlist.length === 0;

  // Show skeleton during loading
  if (loading) {
    return <WishlistPageSkeleton />;
  }

  return (
    <div className='bg-[#F1F1F1] min-h-screen'>
      {isEmpty ? (
        <div className='h-screen flex flex-col gap-5 justify-center items-center'>
          <div className='h-[300px] w-[300px]'>
            <img src={NoData} alt="NoData" />
          </div>
          <div>
            <h1 className='font-bold font-gilroy text-2xl'>Your WishList is Empty</h1>
          </div>
          <Link to='/trending'>
            <button className='px-6 py-3 bg-[#00211E] font-bold text-base cursor-pointer text-white w-fit rounded-lg hover:bg-gray-800 transition-colors'>
              Explore
            </button>
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-10 p-5 xl:p-16'>
          {wishlist.map((item, index) => (
            <div key={item.ProductId || index}>
              <ProductCard 
                id={item.ProductId} 
                image={item.PrimaryImageUrl} 
                title={item.ProductName} 
                variantId={item.VariantId}
                brand={item.BrandName} 
                price={item.DiscountPrice && item.DiscountPrice > 0 ? item.DiscountPrice : item.Price} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist