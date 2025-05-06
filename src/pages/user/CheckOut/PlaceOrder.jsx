import React from "react";
import { useCart } from "../../../contexts/user/CartContext";

const PlaceOrder = ({ paymentMethod, onPlaceOrder, isProcessing }) => {
  const { cart } = useCart();

  const subtotal = cart.reduce((acc, item) => {
    return acc + item.Quantity * (item?.DiscountPrice || item?.Price);
  }, 0);

  return (
    <div className="px-5 py-8 flex flex-col gap-5">
      <h1 className="uppercase text-[#5E666C] text-lg font-semibold">
        Order summary
      </h1>
      <div className="flex justify-between font-gilroy">
        <h1 className="text-[#303A42] text-lg font-semibold">
          Total{" "}
          <span className="text-[#5E666C] font-normal">{`(${cart.length} items)`}</span>
        </h1>
        <h1 className="text-[#0D1217]">{subtotal}</h1>
      </div>
      <hr className="border-t-2 border-dotted border-[#E8E9EA]" />
      <div className="flex justify-between text-xl text-[#303A42] font-gilroy">
        <h1 className="font-semibold">Total Payable</h1>
        <h1 className="font-black">{subtotal + subtotal * (5 / 100)}</h1>
      </div>
      <hr className="text-[#E8E9EA]" />
      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={!paymentMethod || isProcessing}
        className={`px-6 py-3  ${
          !paymentMethod || isProcessing ? "cursor-none" : "cursor-pointer"
        } font-bold text-base text-white w-full rounded-lg ${
          !paymentMethod
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#00211E] hover:bg-[#003d38]"
        }`}
      >
        {isProcessing ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
};

export default PlaceOrder;
