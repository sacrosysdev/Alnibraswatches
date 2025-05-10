import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import DoubleTick from "../../../assets/svg/product/doubletick.svg";
import ProductInfo from "./ProductInfo";
import Ratings from "./Ratings";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCart } from "../../../contexts/user/CartContext";

const ProductDetails = ({
  details,
  selectedVariant,
  setSelectedVariant,
  images,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { cart, addToCartlist } = useCart();
  
  // Get current stock quantity
  const currentStock = selectedVariant?.stock?.onhand !== undefined 
    ? selectedVariant?.stock?.onhand 
    : details?.stockQty;
  
  // Check if quantity exceeds available stock
  const isMaxQuantity = currentStock !== undefined && quantity >= currentStock;
  
  const increaseQty = () => {
    if (currentStock === undefined || quantity < currentStock) {
      setQuantity((prev) => prev + 1);
    }
  };
  
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const discountPrice =
    selectedVariant?.price?.discountPrice || details?.discountPrice;
  const normalPrice = selectedVariant?.price?.price || details?.price;
  const currency = "AED";
  const hasDiscount =
    discountPrice !== null &&
    discountPrice !== undefined &&
    discountPrice !== 0;
  
  const handleAddToCart = () => {
    if (isOutOfStock) return; 
    const safeQuantity = currentStock !== undefined ? Math.min(quantity, currentStock) : quantity;
    addToCartlist({
      productId: details.productId,
      variantId: selectedVariant?.variantId || -1,
      quantity: safeQuantity,
      ProductName: details?.productName,
      Price: normalPrice,
      DiscountPrice: discountPrice,
      PrimaryImageUrl: images[0]?.imageUrl,
    });
  };
  
  useEffect(() => {
    if (details?.variants?.length > 0) {
      const variantsWithParsedImages = details.variants.map((variant) => ({
        ...variant,
        images:
          typeof variant.images === "string"
            ? JSON.parse(variant.images)
            : variant.images,
      }));
      setSelectedVariant(variantsWithParsedImages[0]);
    } else {
      // If no variants, create a pseudo-variant using main product info
      setSelectedVariant({
        variantId: null,
        images: details?.images || [],
        brandName: details?.brandName,
        price: details?.price,
        discountPrice: details?.discountPrice,
        colorName: "Default",
        hexCode: "#FFFFFF",
        categoryName: details?.categoryName,
      });
    }
  }, [details]);
 
  // Fix: Corrected the isOutOfStock logic to properly check if stock is zero
  const isOutOfStock = (selectedVariant?.stock?.onhand === 0 || selectedVariant?.stock?.onhand === undefined) && 
                      (details?.stockQty === 0 || details?.stockQty === undefined);
  // Button states
  const buttonDisabledClass = isOutOfStock 
    ? "opacity-50 cursor-not-allowed" 
    : "cursor-pointer";
  
  return (
    <section className="flex flex-col gap-4 ">
      <h2 className="font-bold font-bodoni text-4xl text-[#0D1217]">
        {details?.productName}
      </h2>
      <h3 className="text-[#546D7D] text-base font-normal">
        {selectedVariant?.brandName || details?.brandName}
      </h3>
      <h3 className="text-[#A5B2BA] text-base font-normal">
        {selectedVariant?.categoryName || details?.categoryName}
      </h3>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <h1 className="font-bold text-2xl text-[#0D1217]">
            {currency} {hasDiscount ? discountPrice : normalPrice}
          </h1>
          {hasDiscount && (
            <h1 className="font-bold text-2xl text-[#A5B2BA] line-through">
              {currency} {normalPrice}
            </h1>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {details?.variants?.length > 0 && details.variants[0]?.colorName && (
          <div className="flex flex-col gap-2">
            <h1 className="font-gilroy text-base">Available Colors</h1>
            <div className="flex gap-5">
              {details.variants.map((variant, index) => (
                <div key={index} onClick={() => setSelectedVariant(variant)}>
                  <div
                    className={`h-12 w-12 cursor-pointer border ${
                      selectedVariant?.variantId === variant.variantId
                        ? "border-[#ca8904] border-2"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: variant.hexCode }}
                  ></div>
                  <h4 className="text-[#605D5D] text-xs mt-1">
                    {variant.colorName}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Quantity Handling */}
      <div className="flex items-center gap-2">
        <button
          className={`w-10 h-10 border border-gray-300 text-xl 
                     flex items-center justify-center ${isOutOfStock || quantity <= 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={decreaseQty}
          disabled={isOutOfStock || quantity <= 1}
        >
          <AiOutlineMinus />
        </button>
        <div className="w-10 h-10 border border-gray-300 flex items-center justify-center text-lg font-medium">
          {quantity}
        </div>
        <button
          className={`w-10 h-10 border border-gray-300 text-xl flex items-center 
                     justify-center ${isOutOfStock || isMaxQuantity ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={increaseQty}
          disabled={isOutOfStock || isMaxQuantity}
        >
          <AiOutlinePlus />
        </button>
      </div>
      {currentStock !== undefined && currentStock > 0 && (
        <div className="text-sm text-gray-600">
          <span className={currentStock < 5 ? "text-amber-700 font-medium" : ""}>
            {currentStock < 5 ? `Only ${currentStock} left in stock!` : `${currentStock} available`}
          </span>
        </div>
      )}
      {isOutOfStock && (
        <div className="bg-red-100 w-full max-w-md border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm font-medium flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <span className="font-semibold">Out of Stock</span> - This item is currently unavailable
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        <button 
          className={`bg-[#00211E] text-white rounded-lg py-3 px-6 ${buttonDisabledClass}`}
          disabled={isOutOfStock}
        >
          Buy Now
        </button>
        <button
          className={`bg-white text-[#010F17] border 
                     border-[#010F17] rounded-lg py-3 px-6 ${buttonDisabledClass}`}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          Add to Cart
        </button>
      </div>
      <div className="flex flex-col gap-2 pb-3">
        {/* <h1 className='font-gilroy text-base'>Select Size</h1> */}
        <div className="relative w-fit">
          {/* <select className="appearance-none border border-[#005C53] rounded-md py-2 px-8 pr-16  focus:outline-none ">
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select> */}
          <div className="absolute  inset-0  flex items-center left-4 justify-center pointer-events-none">
            <IoIosArrowDown />
          </div>
        </div>
      </div>
      <hr className="text-[#E5E5E5]" />
      <div className="font-gilroy py-2">
        <div className="flex gap-2 items-center">
          <div>
            <img src={DoubleTick} alt="doubletick" />
          </div>
          <h1 className="text-base text-[#757C81]">
            Standard delivery between{" "}
            <span className="font-semibold text-[#010F17]">With In 5 Days</span>
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <img src={DoubleTick} alt="doubletick" />
          </div>
          <h1 className="text-base text-[#757C81]">
            Cash / card delivery option available
          </h1>
        </div>
      </div>
      <hr className="text-[#E5E5E5]" />
      <ProductInfo description={details?.description ?? []} />
      <hr className="text-[#E5E5E5]" />
      <Ratings product={details} />
    </section>
  );
};

export default ProductDetails;