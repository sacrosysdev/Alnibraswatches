// Wishlist Product Card Skeleton
const WishlistCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    {/* Image skeleton */}
    <div className="w-full h-48 bg-gray-200"></div>
    
    {/* Content skeleton */}
    <div className="p-4 space-y-3">
      {/* Brand skeleton */}
      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      
      {/* Title skeleton */}
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      
      {/* Price and button skeleton */}
      <div className="flex items-center justify-between pt-2">
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        <div className="h-8 bg-gray-200 rounded-full w-8"></div>
      </div>
      
      {/* Add to cart button skeleton */}
      <div className="h-10 bg-gray-200 rounded w-full mt-3"></div>
    </div>
  </div>
);
export default WishlistCardSkeleton