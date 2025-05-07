import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useAddAddress,
  useGetPaymentIntent,
  useGetSelectedAddress,
} from "../../../api/user/hooks";
import AddressModal from "../../../components/user/AddressModal";
import { useCart } from "../../../contexts/user/CartContext";
import Address from "./Address";
import Header from "./Header";
import PaymentSection from "./PaymentSection";
import PlaceOrder from "./PlaceOrder";
import { INITIAL_ADDRESS_VALUE } from "../../../constant/user";

const stripePromise = loadStripe(process.env.VITE_STRIP_PRIVATE_KEY);
const CheckoutPage = () => {
  const [showModal, setShowModal] = useState(false);
  const addAddressMutation = useAddAddress();
  const handleAddAddressClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const location = useLocation();

  const stripe = useStripe();
  const elements = useElements();
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const paymentMutation = useGetPaymentIntent();

  const {
    data: address,
    isLoading: loadingAddress,
    refetch: refetchAddress,
  } = useGetSelectedAddress(location.state);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setPaymentError(null);
  };

  const handleAddAddress = async (values, { setSubmitting, resetForm }) => {
    try {
      await addAddressMutation.mutateAsync(values);
      await refetchAddress();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      setPaymentError("Please select a payment method");
      return;
    }
    try {
      setIsPaymentProcessing(true);
      setPaymentError(null);

      const response = await paymentMutation.mutateAsync();
      const { clientSecret } = response.data;
      const result = await stripe.confirmCardPayment({
        elements,
        confirmParams: {
          return_url: "https://your-site.com/payment-success",
        },
      });
      if (result.error) {
        setMessage(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setMessage("Payment succeeded!");
          // Here you would call your actual order API
          // const orderResponse = await createOrder({
          //   items: cart,
          //   address,
          //   paymentMethod,
          //   total: calculateTotal()
          // });

          // Clear cart and redirect to success page
          // clearCart();
          // navigate("/order-success", { state: { orderId } });
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError("Payment failed. Please try again.");
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  if (loadingAddress) {
    return null;
  }
  // Main checkout view with selected address
  return (
    <div className="w-full py-20">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start mx-auto px-5 md:w-[80%]">
        <div className="col-span-1 xl:col-span-2">
          <Header />
          {loadingAddress || !address ? (
            <>
              <button
                className="bg-black text-white text-sm px-3 py-1 mt-5
                         rounded hover:bg-gray-800 transition cursor-pointer"
                onClick={handleAddAddressClick}
              >
                Add Address
              </button>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mt-4 mb-4">
                <h2 className="text-lg font-semibold">Delivery Address</h2>
              </div>
              <Address
                label={address.AddressLabel}
                phone={address.PhoneNumber}
                address={address.Address}
                district={address.District}
                userName={address.UserName}
                city={address.City}
                landmark={address.LandMark}
              />
            </>
          )}

          <PaymentSection
            CardElement={CardElement}
            onPaymentMethodChange={handlePaymentMethodChange}
            selectedAddress={address}
          />
        </div>
        <div className="col-span-1 border w-full rounded-2xl border-[#A5B2BA]">
          <PlaceOrder
            paymentMethod={paymentMethod}
            onPlaceOrder={handlePlaceOrder}
            isProcessing={isPaymentProcessing}
            address={address}
          />
          {paymentError && (
            <div className="text-red-500 text-sm px-5 pb-4">{paymentError}</div>
          )}
        </div>
      </div>

      {/* Address Modal */}
      {showModal && (
        <AddressModal
          initialValues={INITIAL_ADDRESS_VALUE}
          onSubmit={handleAddAddress}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const paymentMutation = useGetPaymentIntent();

  useEffect(() => {
    const fetchClientSecret = async () => {
      console.log("adgasd");
      try {
        const response = await paymentMutation.mutateAsync(200);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Failed to get client secret", error);
      }
    };

    fetchClientSecret();
  }, []);
  return (
    <Elements stripe={stripePromise} options={clientSecret}>
      <CheckoutPage />;
    </Elements>
  );
};

export default Checkout;
