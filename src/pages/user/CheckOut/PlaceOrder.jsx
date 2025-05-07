import React from "react";
import { useCart } from "../../../contexts/user/CartContext";

const PlaceOrder = ({ disable, isLoading, message, paymentError }) => {
  const { cart } = useCart();

  const subtotal = cart.reduce((acc, item) => {
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
          <span className="text-[#5E666C] font-normal">{`(${cart.length} items)`}</span>
        </h1>
        <h1 className="text-[#0D1217]">{formatCurrency(subtotal)}</h1>
      </div>
      <hr className="border-t-2 border-dotted border-[#E8E9EA]" />
      <div className="flex justify-between text-xl text-[#303A42] font-gilroy">
        <h1 className="font-semibold">Total Payable</h1>
        <h1 className="font-black">
          {formatCurrency(subtotal + subtotal * (5 / 100))}
        </h1>
      </div>
      <hr className="text-[#E8E9EA]" />
      <button
        disabled={isLoading || disable}
        id="submit"
        className={`px-6 py-3 relative font-bold text-base text-white w-full rounded-lg ${
          isLoading || disable
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#00211E] hover:bg-[#003d38]"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="flex space-x-2">
              <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
              <div className="h-2 w-2 bg-white rounded-full animate-pulse delay-75"></div>
              <div className="h-2 w-2 bg-white rounded-full animate-pulse delay-150"></div>
            </div>
            <span className="ml-3">Processing payment...</span>
          </div>
        ) : (
          "Pay now"
        )}
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div
          id="payment-message"
          className={`mt-2 p-3 rounded-md text-sm font-medium ${
            message.includes("error") || message.includes("fail")
              ? "bg-red-50 text-red-600 border border-red-200"
              : "bg-green-50 text-green-600 border border-green-200"
          }`}
        >
          {message}
        </div>
      )}
      {paymentError && (
        <div className="text-red-500 text-sm px-2 pb-4">{paymentError}</div>
      )}{" "}
    </div>
  );
};

export default PlaceOrder;
