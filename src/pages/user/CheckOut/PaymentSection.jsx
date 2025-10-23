import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

// Import payment method icons
import mastercard from "../../../assets/svg/checkout/mastercard.svg";
import cod from "../../../assets/svg/checkout/cod.svg";
import { PaymentElementShimmer } from "../../../components/user/checkout/PaymentElementShimmer";

// Payment methods configuration
const PAYMENT_METHODS = [
  { id: "card", name: "Debit / Credit Card", icon: mastercard },
  { id: "cod", name: "Cash on Delivery", icon: cod, disabled: true },
];

const PaymentSection = ({
  onPaymentMethodChange,
  amount,
  paymentMethod,
  clientSecret,
}) => {
  // hooks - only initialize if payment method exists and is not cod
  const stripe =
    paymentMethod && clientSecret && paymentMethod !== "cod"
      ? useStripe()
      : null;
  const elements =
    paymentMethod && clientSecret && paymentMethod !== "cod"
      ? useElements()
      : null;

  // state for payment method
  const [selectedMethod, setSelectedMethod] = useState(paymentMethod);
  const [paymentElementLoading, setPaymentElementLoading] = useState(false);

  // Update selectedMethod when paymentMethod changes
  useEffect(() => {
    setSelectedMethod(paymentMethod);
  }, [paymentMethod]);

  // Function to change the method
  const handleMethodChange = (methodId) => {
    // Prevent selection of disabled methods
    const method = PAYMENT_METHODS.find((m) => m.id === methodId);
    if (method && method.disabled) {
      return;
    }

    setSelectedMethod(methodId);
    setPaymentElementLoading(true);

    if (onPaymentMethodChange) {
      onPaymentMethodChange(methodId);
    }

    // Update the PaymentElement appearance to match the selected method
    if (elements && methodId === "card") {
      const paymentElement = elements.getElement(PaymentElement);
      if (paymentElement) {
        paymentElement.update({
          defaultValues: {
            billingDetails: {},
          },
          paymentMethodOrder: ["card"],
        });
      }
    }

    // Simulate payment element loading time
    setTimeout(() => {
      setPaymentElementLoading(false);
    }, 1500);
  };

  // Render custom payment method selection UI
  const renderPaymentMethodSelector = () => {
    return (
      <div className="mt-4">
        {PAYMENT_METHODS.map((method) => (
          <label
            key={method.id}
            className={`flex items-center py-3 gap-3 border-t border-[#E8E9EA] ${
              method.disabled
                ? "cursor-not-allowed opacity-50"
                : selectedMethod === method.id
                ? "bg-blue-50 cursor-pointer"
                : "hover:bg-gray-100 cursor-pointer"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => handleMethodChange(method.id)}
              disabled={method.disabled}
              className={`w-4 h-4 text-blue-600 accent-blue-600 ml-2 ${
                method.disabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            />
            <div className="flex gap-2 items-center">
              <img
                src={method.icon}
                alt={method.name}
                className={`w-5 h-5 ${method.disabled ? "opacity-50" : ""}`}
              />
              <span
                className={`text-base font-medium ${
                  method.disabled ? "text-gray-400" : ""
                }`}
              >
                {method.name}
                {method.disabled && (
                  <span className="text-xs text-gray-400 ml-2">
                    (Currently unavailable)
                  </span>
                )}
              </span>
            </div>
          </label>
        ))}
      </div>
    );
  };

  // Render the selected payment form
  const renderPaymentForm = () => {
    if (!selectedMethod) return null;

    if (selectedMethod === "cod") {
      return (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-800">
                Cash on Delivery
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  You will be required to pay the full amount when your order is
                  delivered.
                </p>
                <p className="mt-1">
                  Please keep the exact amount ready for the delivery person.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (!clientSecret) return null;

    if (paymentElementLoading) {
      return <PaymentElementShimmer />;
    }

    return (
      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Card Details
          </label>
          <div className="mt-1 p-2 border border-gray-300 rounded-md">
            <PaymentElement
              options={{
                fields: {
                  billingDetails: "auto",
                },
                layout: {
                  type: "tabs",
                  defaultCollapsed: false,
                  radios: true,
                  spacedAccordionItems: true,
                },
                paymentMethodTypes: ["card"],
                terms: {
                  card: "never",
                },
              }}
              onReady={() => {
                setPaymentElementLoading(false);
              }}
              onChange={() => {
                // Handle any payment element changes here
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-10 bg-white">
      <h1 className="font-semibold text-lg">Payment Method</h1>
      <h2 className="text-base text-[#8C9296]">Choose your payment method</h2>

      {renderPaymentMethodSelector()}

      {selectedMethod && renderPaymentForm()}
    </div>
  );
};

export default PaymentSection;
