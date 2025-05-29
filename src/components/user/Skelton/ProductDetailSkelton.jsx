const ProductPageSkeleton = () => (
  <div className="p-5 xl:p-16">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Image Section Skeleton */}
      <div className="space-y-4">
        <div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-16 h-16 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </div>
      
      {/* Product Details Skeleton */}
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="flex gap-3">
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-32"></div>
          <div className="flex gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 w-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-200 rounded"></div>
          <div className="w-10 h-10 bg-gray-200 rounded"></div>
          <div className="w-10 h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="h-12 bg-gray-200 rounded-lg"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
    
    {/* Related Products Skeleton */}
    <div className="mt-16 space-y-4">
      <div className="h-8 bg-gray-200 rounded w-48"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="aspect-square bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default ProductPageSkeleton