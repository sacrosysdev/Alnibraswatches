import React from "react";
import { useCart } from "../../../contexts/user/CartContext";

const PlaceOrder = ({ totalAmount }) => {
  const { cart } = useCart();

  const subtotal =
    totalAmount ||
    cart.reduce((acc, item) => {
      return acc + item.Quantity * (item?.DiscountPrice || item?.Price);
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
            {`(${totalAmount ? "1 item" : `${cart.length} items`})`}
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
