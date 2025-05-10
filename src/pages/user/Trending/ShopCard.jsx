import React, { memo } from 'react';
import Heart from '../../../assets/svg/product/smallHeart.svg';
import FillHeart from '../../../assets/svg/product/heartfill.svg';
import { useWishlist } from '../../../contexts/user/WishListContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ShopCard = ({ 
  id, 
  image, 
  title, 
  brand, 
  price, 
  offerprice, 
  variantId,
  stockQty 
}) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  const isProductInWishlist = isInWishlist(id);
  
  const isOutOfStock = stockQty === 0;
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
  return (
    <div 
      className={`relative flex flex-col items-center gap-4 pb-5 cursor-pointer
                rounded-2xl overflow-hidden
                ${isOutOfStock 
                  ? 'bg-white shadow-md border border-red-200' 
                  : 'bg-white shadow-[10px_4px_10px_rgba(0,0,0,0.1)]'}`}
      onClick={goToProductDetailPage}
    >
      <div className="w-full overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="h-[250px] md:h-[200px] w-full object-cover" 
          loading="lazy"
        />
        {isOutOfStock && (
          <div className="absolute top-0 right-0">
            <div className="bg-red-600 text-white font-bold py-1 px-3 text-xs shadow-md">
              OUT OF STOCK
            </div>
          </div>
        )}
      </div>
      
      <div className="text-center flex flex-col gap-1">
        <h1 className="font-medium text-lg md:text-lg text-gray-900">{title}</h1>
        <h3 className="text-base text-gray-500">
          <span>{brand}</span>
        </h3>
      </div>
      
      <div className="flex gap-5 items-center">
        <h1 className="font-bold text-xl text-gray-900">AED: {price}</h1>
        {offerprice && (
          <h1 className="font-bold text-xl text-gray-400">AED {offerprice}</h1>
        )}
      </div>
      
      {isOutOfStock && (
        <div className="bg-red-100 border border-red-400
                   text-red-700 px-4 py-1 rounded-md text-xs font-medium flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          Temporarily Unavailable
        </div>
      )}
      
      <div className="absolute top-4 right-1 bg-white rounded-full p-2 z-10">
        <motion.img
          src={isProductInWishlist ? FillHeart : Heart}
          whileTap={{ scale: 0.8 }}
          alt={isProductInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className="cursor-pointer hover:text-black w-5 h-5"
          onClick={handleWishlistToggle}
        />
      </div>
      
      {isOutOfStock && (
        <div className="absolute top-1/2 left-0 w-full flex justify-center items-center pointer-events-none">
          <div className="h-px w-full bg-red-200"></div>
        </div>
      )}
    </div>
  );
};

export default memo(ShopCard);