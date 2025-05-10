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
  const increaseQty = () => setQuantity((prev) => prev + 1);
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
    addToCartlist({
      productId: details.productId,
      variantId: selectedVariant?.variantId || -1,
      quantity: quantity,
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
          className="w-10 h-10 border border-gray-300 text-xl 
                              flex items-center justify-center cursor-pointer"
          onClick={decreaseQty}
        >
          <AiOutlineMinus />
        </button>
        <div className="w-10 h-10 border border-gray-300 flex items-center justify-center text-lg font-medium">
          {quantity}
        </div>
        <button
          className="w-10 h-10 border border-gray-300 text-xl flex items-center 
                                justify-center cursor-pointer"
          onClick={increaseQty}
        >
          <AiOutlinePlus />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <button className="bg-[#00211E] text-white rounded-lg py-3 px-6">
          Buy Now
        </button>
        <button
          className="bg-white text-[#010F17] border cursor-pointer
                                     border-[#010F17] rounded-lg py-3 px-6"
          onClick={handleAddToCart}
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
