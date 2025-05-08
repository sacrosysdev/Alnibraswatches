import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

// Import payment method icons
import gpay from "../../../assets/svg/checkout/gpay.svg";
import phonepe from "../../../assets/svg/checkout/phonepe.svg";
import paytm from "../../../assets/svg/checkout/paytm.svg";
import mastercard from "../../../assets/svg/checkout/mastercard.svg";
import {
  PaymentElementShimmer,
  PaymentMethodShimmer,
} from "../../../components/user/checkout/PaymentElementShimmer";

// Payment methods configuration
const PAYMENT_METHODS = [
  { id: "card", name: "Debit / Credit Card", icon: mastercard },
  { id: "upi", name: "UPI", icon: phonepe },
  { id: "netbanking", name: "Net Banking", icon: paytm },
  { id: "wallet", name: "Wallet", icon: gpay },
];

const PaymentSection = ({ onPaymentMethodChange, selectedAddress, amount }) => {
  // hooks
  const stripe = useStripe();
  const elements = useElements();

  // state for payment method
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [availableMethods, setAvailableMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentElementLoading, setPaymentElementLoading] = useState(false);

  // Fetch available payment methods based on the user's region
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (!stripe || !elements) return;

      setIsLoading(true);
      try {
        // This gets the payment methods available from Stripe based on the session
        const paymentOptions = await stripe.paymentRequest({
          country: "AE", // This should be dynamic based on user location or selection
          currency: "aed",
          total: {
            label: "Checkout",
            amount: amount,
          },
        });

        // Filter available payment methods based on what Stripe supports in the region
        const methods = [];

        // Check which payment methods are available
        if (paymentOptions.canMakePayment()) {
          // Card is almost always available
          methods.push(PAYMENT_METHODS.find((m) => m.id === "card"));

          // For other methods, you'd need to check Stripe's response
          // This is simplified - in a real app you'd check Stripe's response for specific methods
          const countryCode = selectedAddress?.AddressDetails?.Country || "AE";

          // Add UPI for India
          if (countryCode === "IN") {
            methods.push(PAYMENT_METHODS.find((m) => m.id === "upi"));
          }

          // Add wallets based on device/region
          if (
            paymentOptions.canMakePayment().applePay ||
            paymentOptions.canMakePayment().googlePay
          ) {
            methods.push(PAYMENT_METHODS.find((m) => m.id === "wallet"));
          }

          // Add net banking for India
          if (countryCode === "IN") {
            methods.push(PAYMENT_METHODS.find((m) => m.id === "netbanking"));
          }
        } else {
          // Fallback to card if nothing else is available
          methods.push(PAYMENT_METHODS.find((m) => m.id === "card"));
        }

        setAvailableMethods(methods.filter(Boolean));

        // Set default payment method
        if (methods.length > 0 && !selectedMethod) {
          handleMethodChange(methods[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch payment methods:", error);
        setErrorMessage("Unable to load payment methods. Please try again.");
        // Fallback to all payment methods
        setAvailableMethods(PAYMENT_METHODS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentMethods();
  }, [stripe, elements, selectedAddress]);

  // Function to change the method
  const handleMethodChange = (methodId) => {
    setSelectedMethod(methodId);
    setPaymentElementLoading(true);

    if (onPaymentMethodChange) {
      onPaymentMethodChange(methodId);
    }

    // Update the PaymentElement appearance to match the selected method
    if (elements) {
      const paymentElement = elements.getElement(PaymentElement);
      if (paymentElement) {
        paymentElement.update({
          // Focus on the selected payment method type
          defaultValues: {
            billingDetails: {
              // You could pre-fill from selectedAddress here
            },
          },
          // Customize which payment methods appear first
          paymentMethodOrder: [methodId],
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
    if (isLoading) {
      return <PaymentMethodShimmer />;
    }

    if (errorMessage) {
      return <div className="py-4 text-red-500">{errorMessage}</div>;
    }

    if (availableMethods.length === 0) {
      return (
        <div className="py-4 text-gray-500">
          No payment methods available for your region.
        </div>
      );
    }

    return (
      <div className="mt-4">
        {availableMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center py-3 gap-3 border-t border-[#E8E9EA] cursor-pointer ${
              selectedMethod === method.id ? "bg-blue-50" : "hover:bg-gray-100"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => handleMethodChange(method.id)}
              className="w-4 h-4 text-blue-600 accent-blue-600 cursor-pointer ml-2"
            />
            <div className="flex gap-2 items-center">
              <img src={method.icon} alt={method.name} className="w-5 h-5" />
              <span className="text-base font-medium">{method.name}</span>
            </div>
          </label>
        ))}
      </div>
    );
  };

  // Render the selected payment form
  const renderPaymentForm = () => {
    if (!selectedMethod) return null;

    if (paymentElementLoading) {
      return <PaymentElementShimmer />;
    }

    // Use Stripe's PaymentElement, but configured based on the selected method
    return (
      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {selectedMethod === "card"
              ? "Card Details"
              : selectedMethod === "upi"
              ? "UPI Details"
              : selectedMethod === "netbanking"
              ? "Net Banking Details"
              : "Wallet Details"}
          </label>
          <div className="mt-1 p-2 border border-gray-300 rounded-md">
            <PaymentElement
              options={{
                // Customize the PaymentElement based on selected method
                fields: {
                  billingDetails: "auto", // or 'never' if you collect this elsewhere
                },
                layout: {
                  type: "tabs",
                  defaultCollapsed: false,
                  radios: true,
                  spacedAccordionItems: true,
                },
                // Filter to only show the selected payment method
                paymentMethodTypes: [selectedMethod],
                terms: {
                  card: "never", // Hide terms text for cleaner UI
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
