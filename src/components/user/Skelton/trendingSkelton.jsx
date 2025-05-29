const SidebarSkeleton = () => (
  <div className="bg-white rounded-lg p-6 animate-pulse">
    {/* Filter title skeleton */}
    <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
    
    {/* Brand filter section */}
    <div className="mb-6">
      <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded flex-1"></div>
          </div>
        ))}
      </div>
      <div className="h-4 bg-gray-200 rounded w-20 mt-2"></div>
    </div>

    {/* Category filter section */}
    <div className="mb-6">
      <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded flex-1"></div>
          </div>
        ))}
      </div>
    </div>

    {/* Price range section */}
    <div className="mb-6">
      <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded flex-1"></div>
          </div>
        ))}
      </div>
    </div>

    {/* Clear filters button */}
    <div className="h-10 bg-gray-200 rounded w-full"></div>
  </div>
);

// Header Skeleton Component
const HeaderSkeleton = () => (
  <div className="bg-white rounded-lg p-4 mb-6 animate-pulse">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Filter tags area */}
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 bg-gray-200 rounded-full w-20"></div>
        ))}
      </div>
      
      {/* Sort dropdown area */}
      <div className="flex items-center gap-4">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  </div>
);

// Product Card Skeleton Component
const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    {/* Image skeleton */}
    <div className="w-full h-48 bg-gray-200"></div>
    
    {/* Content skeleton */}
    <div className="p-4 space-y-3">
      {/* Title skeleton */}
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      
      {/* Description skeleton */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
      
      {/* Price and button skeleton */}
      <div className="flex items-center justify-between pt-2">
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  </div>
);

// Products Grid Skeleton Component
const ProductsGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
    {Array.from({ length: count }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
);
// Complete Page Skeleton Component
const PageSkeleton = () => (
  <div className="px-4 xl:px-16 py-5 bg-[#F1F1F1]">
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
      {/* Desktop Sidebar Skeleton */}
      <div className="hidden xl:flex xl:col-span-1">
        <SidebarSkeleton />
      </div>

      {/* Product section skeleton */}
      <div className="col-span-1 xl:col-span-3">
        <HeaderSkeleton />
        <ProductsGridSkeleton count={8} />
      </div>
    </div>
  </div>
);
export default PageSkeleton