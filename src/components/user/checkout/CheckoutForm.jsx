import {
  LinkAuthenticationElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { checkOutValidation } from "../../../constant/schema";
import {
  useAddAddress,
  useGetSelectedAddress,
  usePostOrder,
} from "../../../api/user/hooks";
import { INITIAL_ADDRESS_VALUE } from "../../../constant/user";
import { useCart } from "../../../contexts/user/CartContext";
import Address from "../../../pages/user/CheckOut/Address";
import Header from "../../../pages/user/CheckOut/Header";
import PaymentSection from "../../../pages/user/CheckOut/PaymentSection";
import PlaceOrder from "../../../pages/user/CheckOut/PlaceOrder";
import AddressForm from "../../../pages/user/CheckOut/CheckOutForm";
import PaymentSuccessModal from "./PaymentSuccessModal";

export default function CheckoutForm({
  paymentData,
  handlePaymentMethod,
  paymentMethod,
  clientSecret,
}) {
  // Stripe hooks - only initialize if payment method exists and is not cod
  const stripe =
    paymentMethod && clientSecret && paymentMethod !== "cod"
      ? useStripe()
      : null;
  const elements =
    paymentMethod && clientSecret && paymentMethod !== "cod"
      ? useElements()
      : null;

  // Navigation and location
  const navigate = useNavigate();
  const location = useLocation();

  const buyNowData = location.state?.buyNowData;

  // State management
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    orderId: null,
    paymentIntentId: null,
  });
  // Cart and address hooks
  const { clearCart } = useCart();
  const addAddressMutation = useAddAddress();
  const createOrderMutation = usePostOrder();
  const {
    data: address,
    isLoading: loadingAddress,
    refetch: refetchAddress,
  } = useGetSelectedAddress(location.state || null);

  console.log(address);

  const defaultAddress =
    address?.find((item) => item.IsDefault === true) || address[0];

  console.log(defaultAddress);

  // Address handlers
  const handleAddAddress = async (values, { setSubmitting, resetForm }) => {
    try {
      await addAddressMutation.mutateAsync(values);
      await refetchAddress();
      resetForm();
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Payment handlers
  const handlePaymentMode = (mode) => {
    handlePaymentMethod(mode);
    setPaymentError(null);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/profile/my-orders", {
      replace: true,
      state: {
        success: true,
        orderId: orderDetails.orderId,
        paymentIntentId: orderDetails.paymentIntentId,
      },
    });
  };

  const createOrder = async (paymentIntent) => {
    try {
      if (!defaultAddress) {
        console.error("No address selected");
        return false;
      }

      const orderDetails = {
        userName: defaultAddress?.UserName,
        orderDate: new Date().toISOString(),
        orderAmount: paymentData.totalAmount,
        paymentMode: paymentMethod,
        paymentReference: paymentIntent,
        addressId: defaultAddress?.addressId || 0,
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

      const response = await createOrderMutation.mutateAsync({ orderDetails });
      clearCart();

      // Show success modal instead of navigating immediately
      setOrderDetails({
        orderId: response?.id || "Processing",
        paymentIntentId: paymentIntent,
      });
      setShowSuccessModal(true);

      return true;
    } catch (error) {
      console.error("Failed to create order:", error);
      setMessage(
        "Payment was successful but we couldn't create your order. Please contact support."
      );
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (paymentMethod === "card") {
      if (!stripe || !elements) return;
    }
    setIsLoading(true);
    try {
      if (paymentMethod === "card") {
        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          redirect: "if_required",
          confirmParams: {
            return_url: `${window.location.origin}/profile/my-orders`,
          },
        });
        if (error) {
          setMessage(
            error.type === "card_error" || error.type === "validation_error"
              ? error.message
              : "An unexpected error occurred."
          );
        } else if (paymentIntent?.status === "succeeded") {
          await createOrder(paymentIntent.id);
        }
      } else {
        await createOrder(null);
      }
    } catch (error) {
      setMessage("An unexpected error occurred during payment processing.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    paymentMethod === "card"
      ? stripe &&
        elements &&
        defaultAddress &&
        paymentData?.cartItems?.length > 0
      : defaultAddress && paymentData?.cartItems?.length > 0 && paymentMethod;

  return (
    <div className="w-full py-20">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start mx-auto px-5 md:w-[80%]">
        <div className="col-span-1 xl:col-span-2">
          <div className="mb-4">
            <Header />
            {loadingAddress ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                <span className="ml-3">Loading address...</span>
              </div>
            ) : !address || address.length === 0 || !defaultAddress ? (
              <div className="mt-4">
                <Formik
                  initialValues={INITIAL_ADDRESS_VALUE}
                  validationSchema={checkOutValidation}
                  onSubmit={handleAddAddress}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <AddressForm />
                      <div className="mt-6 flex justify-end">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 disabled:bg-gray-400 transition"
                        >
                          {isSubmitting ? "Saving..." : "Save Address"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mt-4 mb-4">
                  <h2 className="text-lg font-semibold">Delivery Address</h2>
                </div>
                <Address
                  label={defaultAddress.AddressLabel}
                  phone={defaultAddress.PhoneNumber}
                  address={defaultAddress.Address}
                  district={defaultAddress.District}
                  userName={defaultAddress.UserName}
                  city={defaultAddress.City}
                  landmark={defaultAddress.LandMark}
                />
              </>
            )}
          </div>

          <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentSection
              clientSecret={clientSecret}
              paymentMethod={paymentMethod}
              amount={paymentData?.totalAmount}
              onPaymentMethodChange={handlePaymentMode}
            />
            <button
              disabled={isLoading || !isFormValid}
              id="submit"
              className={`px-6 py-3 relative font-bold text-base
                  mt-5 text-white w-full rounded-lg ${
                    isLoading || !isFormValid
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
                  <span className="ml-3">
                    {paymentMethod === "cod"
                      ? "Placing order..."
                      : "Processing payment..."}
                  </span>
                </div>
              ) : paymentMethod === "cod" ? (
                "Place Order"
              ) : (
                "Pay Now"
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
              <div className="text-red-500 text-sm px-2 pb-4">
                {paymentError}
              </div>
            )}
          </form>
        </div>

        <div className="col-span-1 border w-full rounded-2xl border-[#A5B2BA]">
          <PlaceOrder
            totalAmount={
              buyNowData ? buyNowData.price : paymentData?.totalAmount
            }
            buyNowQuantity={buyNowData ? buyNowData.quantity : undefined}
          />
        </div>
      </div>

      <PaymentSuccessModal
        isOpen={showSuccessModal}
        orderId={orderDetails.orderId}
        paymentIntentId={orderDetails.paymentIntentId}
        onClose={handleCloseSuccessModal}
      />
    </div>
  );
}
