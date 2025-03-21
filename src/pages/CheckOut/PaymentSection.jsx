import React, { useState } from "react";
import gpay from "../../assets/svg/checkout/gpay.svg";
import phonepe from "../../assets/svg/checkout/phonepe.svg";
import paytm from "../../assets/svg/checkout/paytm.svg";
import mastercard from "../../assets/svg/checkout/mastercard.svg";

const paymentMethods = [
  { id: "gpay", name: "Google Pay", icon: gpay },
  { id: "phonepe", name: "PhonePe", icon: phonepe },
  { id: "paytm", name: "Paytm", icon: paytm },
  { id: "mastercard", name: "Mastercard", icon: mastercard },
];

const PaymentSection = () => {
  const [selectedMethod, setSelectedMethod] = useState("gpay");

  return (
    <div className="p-4 bg-white">
      <h1 className="font-semibold text-lg">Payment Method</h1>
      <h2 className="text-base text-[#8C9296]">Choose your payment method</h2>

      <div className="mt-4 space-y-3">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className="flex items-center gap-3 p-3 border-t  cursor-pointer hover:bg-gray-100"
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => setSelectedMethod(method.id)}
              className="w-5 h-5 text-blue-600 accent-blue-600 cursor-pointer"
            />
            <img src={method.icon} alt={method.name} className="w-5 h-5" />
            <span className="text-lg font-medium">{method.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentSection;