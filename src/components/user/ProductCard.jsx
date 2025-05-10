import React, { memo } from 'react';
import Heart from '../../assets/svg/product/smallHeart.svg';
import FillHeart from '../../assets/svg/product/heartfill.svg';
import { useWishlist } from '../../contexts/user/WishListContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ 
  id, 
  image, 
  title, 
  brand, 
  price, 
  variantId,
  stockQty 
}) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  
  const isProductInWishlist = isInWishlist(id);
  
  const goToProductDetailPage = () => {
    navigate(`/product/${id}`);
  };
  
  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (isProductInWishlist) {
      removeFromWishlist({
        id,
        variantId
      });
    } else {
      addToWishlist({
        id,
        image,
        title,
        brand,
        price,
        variantId
      });
    }
  };
  
  // Format price for display
  const displayPrice = price !== undefined && price !== null
    ? price
    : 'Price not available';
  
  // Determine if product is out of stock
  const isOutOfStock = stockQty === 0;
  
  return (
    <div 
      className={`relative flex flex-col items-center gap-4 pb-5
                rounded-2xl h-96 md:h-[450px] cursor-pointer overflow-hidden
                ${isOutOfStock ? 'bg-gray-100 shadow-md border border-red-200' : 'bg-gray-100 shadow-xl'}`}
      onClick={goToProductDetailPage}
    >
      <div className="w-full h-[200px] overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover" 
          loading="lazy"
        />
        {isOutOfStock && (
          <div className="absolute top-0 right-0">
            <div className="bg-red-600 text-white font-bold py-1 px-3 text-sm shadow-md">
              OUT OF STOCK
            </div>
          </div>
        )}
      </div>
      
      <div className="text-center flex flex-col gap-1">
        <h1 className="font-medium text-lg md:text-lg text-gray-900">
          {title}
        </h1>
        <h3 className="text-sm text-gray-500">
          <span>{brand}</span>
        </h3>
      </div>
      
      <div className="flex justify-items-end">
        <h1 className="font-bold text-sm md:text-xl text-green-900">
          AED : <span>{displayPrice}</span>
        </h1>
      </div>
      
      {isOutOfStock && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded-md text-sm font-medium flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          Temporarily Unavailable
        </div>
      )}
      
      <motion.div 
        className="absolute top-4 right-4"
        whileTap={{ scale: 0.8 }}
      >
        <img
          src={isProductInWishlist ? FillHeart : Heart}
          alt={isProductInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className="cursor-pointer w-6 h-6"
          onClick={handleWishlistToggle}
        />
      </motion.div>
      
      {isOutOfStock && (
        <div className="absolute top-1/2 left-0 w-full flex justify-center items-center pointer-events-none">
          <div className="h-px w-full bg-red-200"></div>
        </div>
      )}
    </div>
  );
};

export default memo(ProductCard);