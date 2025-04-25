import React, { useEffect, useState } from 'react';
import ProductDetails from './ProductDetails';
import ImageSection from './ImageSection';
import RelatedProducts from './RelatedProducts';
import { useSingleProduct } from "../../../api/user/hooks";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const { data } = useSingleProduct(id);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const hasVariants = data?.variants?.length > 0;

  useEffect(() => {
    if (hasVariants) {
      setSelectedVariant(data.variants[0]);
    }
  }, [data]);

  // 🔍 Determine image list based on variant or top-level
  const rawImageData = hasVariants
    ? selectedVariant?.images
    : data?.images;

  let images = [];
  try {
    // Parse if stringified JSON
    if (typeof rawImageData === 'string') {
      images = JSON.parse(rawImageData);
    } else if (Array.isArray(rawImageData)) {
      images = rawImageData;
    }
  } catch (error) {
    console.error("Image parsing error:", error);
    images = [];
  }
  

 
  return (
    <div className='p-5 xl:p-16'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <ImageSection images={images} />
        </div>
        <div>
          <ProductDetails
            details={data}
            selectedVariant={hasVariants ? selectedVariant : null}
            setSelectedVariant={setSelectedVariant}
          />
        </div>
      </div>
      <RelatedProducts selectedProd={data}/>
    </div>
  );
};

export default Product;
