import {
  LinkAuthenticationElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAddAddress,
  useGetSelectedAddress,
  usePostOrder,
} from "../../api/user/hooks";
import { INITIAL_ADDRESS_VALUE } from "../../constant/user";
import { useCart } from "../../contexts/user/CartContext";
import Address from "../../pages/user/CheckOut/Address";
import Header from "../../pages/user/CheckOut/Header";
import PaymentSection from "../../pages/user/CheckOut/PaymentSection";
import PlaceOrder from "../../pages/user/CheckOut/PlaceOrder";
import AddressModal from "../user/AddressModal";

export default function CheckoutForm({ paymentData }) {
  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();
  
  // Navigation and location
  const navigate = useNavigate();
  const location = useLocation();
  
  // State management
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  
  // Cart and address hooks
  const { clearCart } = useCart();
  const addAddressMutation = useAddAddress();
  const createOrderMutation = usePostOrder();
  const {
    data: address,
    isLoading: loadingAddress,
    refetch: refetchAddress,
  } = useGetSelectedAddress(location.state);

  // Address handlers
  const handleAddAddressClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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

  // Payment handlers
  const handlePaymentMode = (mode) => {
    setPaymentMode(mode);
    setPaymentError(null);
  };

  const createOrder = async (paymentIntent) => {
    try {
      if (!address) {
        console.error("No address selected");
        return false;
      }

      const orderDetails = {
        userName: address?.UserName,
        orderDate: new Date().toISOString(),
        orderAmount: paymentData.totalAmout,
        paymentMode: paymentMode,
        paymentReference: paymentIntent,
        addressId: 0,
        orderDetails: paymentData.cartItems.map((item, index) => ({
          sI_No: index + 1,
          productId: item.productId,
          varientID: item.variantId,
          productName: item.productName,
          quantity: item.quantity,
          price: item.discountPrice || item.price,
          totalAmount: item.quantity * (item.discountPrice || item.price),
        })),
      };

      await createOrderMutation.mutateAsync({ orderDetails });
      clearCart();
      navigate("/profile/my-orders", {
        state: {
          success: true,
          orderId: createOrderMutation?.data?.id,
          paymentIntentId: paymentIntent,
        },
      });
      return true;
    } catch (error) {
      console.error("Failed to create order:", error);
      setMessage("Payment was successful but we couldn't create your order. Please contact support.");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url: `${window.location.origin}/profile/my-orders`,
        },
      });

      if (error) {
        setMessage(error.type === "card_error" || error.type === "validation_error" 
          ? error.message 
          : "An unexpected error occurred.");
      } else if (paymentIntent?.status === "succeeded") {
        await createOrder(paymentIntent.id);
      }
    } catch (error) {
      setMessage("An unexpected error occurred during payment processing.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = stripe && elements && address && paymentData?.cartItems?.length > 0;

  return (
    <div className="w-full py-20">
      <form id="payment-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start mx-auto px-5 md:w-[80%]">
          <div className="col-span-1 xl:col-span-2">
            <div className="mb-4">
              <Header />
              {loadingAddress || !address ? (
                <button
                  type="button"
                  className="bg-black text-white text-sm px-3 py-1 mt-5 rounded hover:bg-gray-800 transition cursor-pointer"
                  onClick={handleAddAddressClick}
                >
                  Add Address
                </button>
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
            </div>

            <LinkAuthenticationElement id="link-authentication-element" />
            <PaymentSection
              amount={paymentData.totalAmout}
              onPaymentMethodChange={handlePaymentMode}
            />
          </div>
          
          <div className="col-span-1 border w-full rounded-2xl border-[#A5B2BA]">
            <PlaceOrder
              disable={!isFormValid}
              isLoading={isLoading}
              message={message}
              paymentError={paymentError}
            />
          </div>
        </div>
      </form>

      {showModal && (
        <AddressModal
          initialValues={INITIAL_ADDRESS_VALUE}
          onSubmit={handleAddAddress}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}
