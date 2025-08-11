import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import DoubleTick from "../../../assets/svg/product/doubletick.svg";
import ProductInfo from "./ProductInfo";
import Ratings from "./Ratings";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCart } from "../../../contexts/user/CartContext";
import { useAuth } from "../../../contexts/user/AuthContext";
import { useNavigate } from "react-router-dom";

// Skeleton Loader Component
const ProductSkeleton = () => (
  <section className="flex flex-col gap-4 animate-pulse">
    {/* Product Name Skeleton */}
    <div className="h-10 bg-gray-200 rounded w-3/4"></div>

    {/* Brand Name Skeleton */}
    <div className="h-6 bg-gray-200 rounded w-1/2"></div>

    {/* Category Skeleton */}
    <div className="h-6 bg-gray-200 rounded w-1/3"></div>

    {/* Price Skeleton */}
    <div className="flex gap-3">
      <div className="h-8 bg-gray-200 rounded w-24"></div>
      <div className="h-8 bg-gray-200 rounded w-24"></div>
    </div>

    {/* Color Options Skeleton */}
    <div className="flex flex-col gap-2">
      <div className="h-5 bg-gray-200 rounded w-32"></div>
      <div className="flex gap-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 w-12 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>

    {/* Quantity Controls Skeleton */}
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-gray-200 rounded"></div>
      <div className="w-10 h-10 bg-gray-200 rounded"></div>
      <div className="w-10 h-10 bg-gray-200 rounded"></div>
    </div>

    {/* Buttons Skeleton */}
    <div className="grid grid-cols-2 gap-6">
      <div className="h-12 bg-gray-200 rounded-lg"></div>
      <div className="h-12 bg-gray-200 rounded-lg"></div>
    </div>

    {/* Additional Info Skeleton */}
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  </section>
);

const ProductDetails = ({
  details,
  selectedVariant,
  setSelectedVariant,
  images,
  isLoading = false, // New prop to control loading state
}) => {
  const [quantity, setQuantity] = useState(1);
  const { cart, addToCartlist } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Check if product is already in cart
  const cartItem = cart.find(
    (item) =>
      item.ProductId === details?.productId &&
      item.VariantId === (selectedVariant?.variantId || -1)
  );

  const isInCart = !!cartItem;
  const cartQuantity = cartItem?.Quantity || 0;

  // Check if essential data is available
  const hasEssentialData = () => {
    // Check if we have basic product details
    if (!details || !details.productName) return false;

    // Check if we have images
    if (!images || images.length === 0) return false;

    // Check if we have stock information (either from variant or main product)
    const hasStockInfo =
      selectedVariant?.stock?.onhand !== undefined ||
      details?.stockQty !== undefined;

    if (!hasStockInfo) return false;

    return true;
  };

  // Show loading state if explicitly loading or missing essential data
  const shouldShowLoader = isLoading || !hasEssentialData();

  // Get current stock quantity
  const currentStock =
    selectedVariant?.stock?.onhand !== undefined
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
    if (isOutOfStock || isInCart) return;

    // Check if user is authenticated
    if (!isAuthenticated) {
      // Set the current product page as redirect path after login
      const currentPath = window.location.pathname;
      localStorage.setItem("redirectAfterLogin", currentPath);
      navigate("/login");
      return;
    }

    const safeQuantity =
      currentStock !== undefined ? Math.min(quantity, currentStock) : quantity;
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

  const handleBuyNow = () => {
    if (isOutOfStock) return;

    // Check if user is authenticated
    if (!isAuthenticated) {
      // Set the current product page as redirect path after login
      const currentPath = window.location.pathname;
      localStorage.setItem("redirectAfterLogin", currentPath);
      navigate("/login");
      return;
    }

    const buyNowData = {
      productId: details.productId,
      variantId: selectedVariant?.variantId || -1,
      quantity: quantity,
      price: (discountPrice || normalPrice) * quantity,
    };

    navigate("/checkout", { state: { buyNowData } });
  };

  useEffect(() => {
    // Only set variant if we have details
    if (!details) return;

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
  }, [details, setSelectedVariant]);

  // Reset quantity when variant changes
  useEffect(() => {
    setQuantity(1);
  }, [selectedVariant]);

  // Fix: Corrected the isOutOfStock logic to properly check if stock is zero
  const isOutOfStock =
    (selectedVariant?.stock?.onhand === 0 ||
      selectedVariant?.stock?.onhand === undefined) &&
    (details?.stockQty === 0 || details?.stockQty === undefined);

  // Button states
  const buttonDisabledClass = isOutOfStock
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  // Show skeleton loader while loading
  if (shouldShowLoader) {
    return <ProductSkeleton />;
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold  text-4xl text-[#0D1217]">
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
                     flex items-center justify-center ${
                       isOutOfStock || quantity <= 1
                         ? "opacity-50 cursor-not-allowed"
                         : "cursor-pointer"
                     }`}
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
                     justify-center ${
                       isOutOfStock || isMaxQuantity
                         ? "opacity-50 cursor-not-allowed"
                         : "cursor-pointer"
                     }`}
          onClick={increaseQty}
          disabled={isOutOfStock || isMaxQuantity}
        >
          <AiOutlinePlus />
        </button>
      </div>

      {/* Stock Information */}
      {currentStock !== undefined && currentStock > 0 && (
        <div className="text-sm text-gray-600">
          <span
            className={currentStock < 5 ? "text-amber-700 font-medium" : ""}
          >
            {currentStock < 5
              ? `Only ${currentStock} left in stock!`
              : `${currentStock} available`}
          </span>
        </div>
      )}

      {/* Out of Stock Warning */}
      {isOutOfStock && (
        <div className="bg-red-100 w-full max-w-md border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm font-medium flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <span className="font-semibold">Out of Stock</span> - This item is
          currently unavailable
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-6">
        <button
          className={`bg-[#00211E] text-white rounded-lg py-3 px-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#003a35] hover:shadow-lg ${buttonDisabledClass}`}
          disabled={isOutOfStock}
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
        <button
          className={`border rounded-lg py-3 px-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
            isInCart
              ? "bg-green-100 text-green-700 border-green-300 cursor-not-allowed opacity-75"
              : isOutOfStock
              ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed opacity-50"
              : "bg-white text-[#010F17] border-[#010F17] hover:bg-[#010F17] hover:text-white"
          }`}
          onClick={handleAddToCart}
          disabled={isOutOfStock || isInCart}
        >
          {isInCart ? `In Cart (${cartQuantity})` : "Add to Cart"}
        </button>
      </div>

      {/* Size Selection (if needed) */}
      <div className="flex flex-col gap-2 pb-3">
        <div className="relative w-fit">
          <div className="absolute inset-0 flex items-center left-4 justify-center pointer-events-none">
            <IoIosArrowDown />
          </div>
        </div>
      </div>

      <hr className="text-[#E5E5E5]" />

      {/* Delivery Information */}
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
