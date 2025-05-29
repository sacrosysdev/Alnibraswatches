import React, { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";
import ImageSection from "./ImageSection";
import RelatedProducts from "./RelatedProducts";
import { useSingleProduct } from "../../../api/user/hooks";
import { useParams } from "react-router-dom";
import ProductPageSkeleton from "../../../components/user/Skelton/ProductDetailSkelton";
// Loading Skeleton for the entire product page


const Product = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSingleProduct(id);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [imagesReady, setImagesReady] = useState(false);
  const hasVariants = data?.variants?.length > 0;

  useEffect(() => {
    if (hasVariants && data?.variants?.length > 0) {
      setSelectedVariant(data.variants[0]);
    }
  }, [data, hasVariants]);
  
  // 🔍 Determine image list based on variant or top-level
  const rawImageData = hasVariants ? selectedVariant?.images : data?.images;

  let images = [];
  try {
    // Parse if stringified JSON
    if (typeof rawImageData === "string") {
      images = JSON.parse(rawImageData);
    } else if (Array.isArray(rawImageData)) {
      images = rawImageData;
    }
  } catch (error) {
    console.error("Image parsing error:", error);
    images = [];
  }

  // Check if all essential data is loaded
  const isDataReady = () => {
    // Basic product data check
    if (!data || !data.productName) return false;
    
    // Images check
    if (!images || images.length === 0) return false;
    
    // Stock information check
    const hasStockInfo = hasVariants 
      ? selectedVariant?.stock?.onhand !== undefined
      : data?.stockQty !== undefined;
    
    if (!hasStockInfo) return false;
    
    // If has variants, ensure selected variant is set
    if (hasVariants && !selectedVariant) return false;
    
    return true;
  };

  // Handle loading states
  if (isLoading || !isDataReady()) {
    return <ProductPageSkeleton />;
  }

  // Handle error state
  if (error) {
    return (
      <div className="p-5 xl:p-16">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
            <svg 
              className="w-12 h-12 text-red-500 mx-auto mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Failed to Load Product
            </h3>
            <p className="text-red-600 mb-4">
              {error?.message || "Something went wrong while loading the product details."}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle case where product is not found
  if (!data) {
    return (
      <div className="p-5 xl:p-16">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Product Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <button 
              onClick={() => window.history.back()} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 xl:p-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ImageSection 
            images={images} 
            isLoading={false} // Data is ready at this point
          />
        </div>
        <div>
          <ProductDetails
            details={data}
            selectedVariant={hasVariants ? selectedVariant : null}
            setSelectedVariant={setSelectedVariant}
            images={images}
            isLoading={false} // Data is ready at this point
          />
        </div>
      </div>
      <RelatedProducts selectedProd={data} />
    </div>
  );
};

export default Product;