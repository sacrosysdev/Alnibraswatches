import React, { useState, useEffect } from 'react'
import Heart from '../../../assets/svg/product/heart.svg'
import ImageMagnifier from '../../../components/user/imagemagnifier/ImageMagnifier'

// Skeleton loader component for thumbnails
const ThumbnailSkeleton = () => (
  <div className="h-24 w-24 border border-[#E6E6E6] rounded-sm bg-gray-200 animate-pulse">
    <div className="h-full w-full flex items-center justify-center">
      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  </div>
);

// Skeleton loader for main image area
const MainImageSkeleton = () => (
  <div className="relative col-span-4 border rounded-sm border-[#E6E6E6] flex justify-center items-center min-h-[50vh] xl:h-[300] bg-gray-200 animate-pulse">
    <div className="flex flex-col items-center justify-center text-gray-400">
      <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="text-sm">Loading image...</p>
    </div>
    <div className='absolute top-5 right-5'>
      <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
    </div>
  </div>
);

const ImageSection = ({ images, isLoading = false }) => {
  const [mainImage, setMainImage] = useState(null);
  const [imageLoadStates, setImageLoadStates] = useState({});
  const [mainImageLoading, setMainImageLoading] = useState(false);

  useEffect(() => {
    if (images?.length > 0) {
      setMainImage(images[0].imageUrl);
    }
  }, [images]);

  // Handle individual image load states
  const handleImageLoad = (index) => {
    setImageLoadStates(prev => ({
      ...prev,
      [index]: { loading: false, error: false }
    }));
  };

  const handleImageError = (index) => {
    setImageLoadStates(prev => ({
      ...prev,
      [index]: { loading: false, error: true }
    }));
  };

  const handleImageLoadStart = (index) => {
    setImageLoadStates(prev => ({
      ...prev,
      [index]: { loading: true, error: false }
    }));
  };

  // Handle main image loading
  const handleMainImageLoad = () => {
    setMainImageLoading(false);
  };

  const handleMainImageError = () => {
    setMainImageLoading(false);
  };

  const handleMainImageLoadStart = () => {
    setMainImageLoading(true);
  };

  // Show loading state if explicitly loading or no images available
  if (isLoading || !images || images.length === 0) {
    return (
      <div>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
          <div className='col-span-1 flex flex-row md:flex-col gap-3'>
            {/* Show 3-4 thumbnail skeletons */}
            {[1, 2, 3, 4].map((item) => (
              <ThumbnailSkeleton key={item} />
            ))}
          </div>
          <MainImageSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
        <div className='col-span-1 flex flex-row md:flex-col gap-3'>
          {images?.map((item, index) => {
            const loadState = imageLoadStates[index] || { loading: false, error: false };
            
            return (
              <div key={index}>
                <div 
                  className={`relative h-24 w-24 border border-[#E6E6E6] rounded-sm overflow-hidden ${
                    mainImage === item.imageUrl ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setMainImage(item.imageUrl)}
                >
                  {/* Loading state for thumbnail */}
                  {loadState.loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                    </div>
                  )}
                  
                  {/* Error state for thumbnail */}
                  {loadState.error ? (
                    <div className="h-full w-full flex items-center justify-center bg-gray-100">
                      <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  ) : (
                    item.imageUrl && (
                      <img 
                        src={item.imageUrl} 
                        alt={`Product thumbnail ${index + 1}`}
                        className='h-full w-full object-contain cursor-pointer hover:opacity-80 transition-opacity' 
                        onLoad={() => handleImageLoad(index)}
                        onError={() => handleImageError(index)}
                        onLoadStart={() => handleImageLoadStart(index)}
                      />
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className='relative col-span-4 border rounded-sm border-[#E6E6E6] flex justify-center items-center min-h-[50vh] xl:h-[300]'>
          {/* Main image loading indicator */}
          {mainImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-2"></div>
                <p className="text-sm text-gray-600">Loading image...</p>
              </div>
            </div>
          )}
          
          <div className="w-full h-full p-4">
            {mainImage ? (
              <ImageMagnifier 
                ImageUrl={mainImage}
                onImageLoad={handleMainImageLoad}
                onImageError={handleMainImageError}
                onImageLoadStart={handleMainImageLoadStart}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>No image available</p>
                </div>
              </div>
            )}
          </div>
          
          <div className='absolute top-5 right-5'>
            <img src={Heart} alt="wishlist" className="cursor-pointer hover:opacity-80 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSection;