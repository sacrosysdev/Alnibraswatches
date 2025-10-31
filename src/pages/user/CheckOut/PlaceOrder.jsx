import React from "react";
import { useCart } from "../../../contexts/user/CartContext";

const PlaceOrder = ({ totalAmount, buyNowQuantity }) => {
  const { cart } = useCart();

  // Calculate subtotal with proper field handling
  const subtotal =
    totalAmount ||
    cart.reduce((acc, item) => {
      // Handle both Quantity/quantity and DiscountPrice/discountPrice variations
      const quantity = item.Quantity || item.quantity || 1;
      const discountPrice = item.DiscountPrice || item.discountPrice;
      const price = item.Price || item.price || 0;
      const itemPrice =
        discountPrice && discountPrice > 0 ? discountPrice : price;

      return acc + quantity * itemPrice;
    }, 0);

  // Count total items in cart
  // If buyNowQuantity is provided, use it; otherwise count from cart
  const totalItems =
    buyNowQuantity !== undefined
      ? buyNowQuantity
      : cart.reduce((acc, item) => {
          return acc + (item.Quantity || item.quantity || 1);
        }, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "AED",
    }).format(amount);
  };

  return (
    <div className="px-5 py-8 flex flex-col gap-5">
      <h1 className="uppercase text-[#5E666C] text-lg font-semibold">
        Order summary
      </h1>
      <div className="flex justify-between font-gilroy">
        <h1 className="text-[#303A42] text-lg font-semibold">
          Total{" "}
          <span className="text-[#5E666C] font-normal">
            {`(${totalItems} ${totalItems === 1 ? "item" : "items"})`}
          </span>
        </h1>
        <h1 className="text-[#0D1217]">{formatCurrency(subtotal)}</h1>
      </div>
      <hr className="border-t-2 border-dotted border-[#E8E9EA]" />
      <div className="flex justify-between text-xl text-[#303A42] font-gilroy">
        <h1 className="font-semibold">Total Payable</h1>
        <h1 className="font-black">{formatCurrency(subtotal)}</h1>
      </div>
    </div>
  );
};

export default PlaceOrder;
