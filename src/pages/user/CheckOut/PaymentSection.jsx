import React, { useState } from "react";
import gpay from "../../../assets/svg/checkout/gpay.svg";
import phonepe from "../../../assets/svg/checkout/phonepe.svg";
import paytm from "../../../assets/svg/checkout/paytm.svg";
import mastercard from "../../../assets/svg/checkout/mastercard.svg";

const paymentMethods = [
  { id: "gpay", name: "google pay", icon: gpay },
  { id: "phonepe", name: "phonepe", icon: phonepe },
  { id: "paytm", name: "paytm", icon: paytm },
  { id: "mastercard", name: "Debit / Credit card", icon: mastercard },
];

const PaymentSection = () => {
  const [selectedMethod, setSelectedMethod] = useState("gpay");

  return (
    <div className="p-4 bg-white">
      <h1 className="font-semibold text-lg">Payment Method</h1>
      <h2 className="text-base text-[#8C9296]">Choose your payment method</h2>

      <div className="mt-4 ">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className="flex items-center py-3 gap-3 border-t border-[#E8E9EA]  cursor-pointer hover:bg-gray-100"
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => setSelectedMethod(method.id)}
              className="w-4 h-4 text-blue-600 accent-blue-600 cursor-pointer"
            />
            <div className="flex gap-2 items-center">
              <img src={method.icon} alt={method.name} className="w-5 h-5" />
              <span className="text-base font-gilroy">{method.name}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentSection;