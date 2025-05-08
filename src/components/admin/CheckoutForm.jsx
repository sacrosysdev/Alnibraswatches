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

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [paymentMode, setPaymentMode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleAddAddressClick = () => setShowModal(true);
  const navigate = useNavigate();
  // Payment state
  const [paymentError, setPaymentError] = useState(null);
  const { cart, clearCart } = useCart();

  const addAddressMutation = useAddAddress();
  const createOrderMutation = usePostOrder();

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
  const {
    data: address,
    isLoading: loadingAddress,
    refetch: refetchAddress,
  } = useGetSelectedAddress(location.state);

  // Function to close Address Modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to create order after payment success
  const createOrder = async (paymentIntent) => {
    try {
      if (!address) {
        console.error("No address selected");
        return false;
      }

      const orderDetails = {
        userName: address?.UserName,
        orderDate: new Date().toISOString(),
        orderAmount: subtotal,
        paymentMode: `${paymentMode}`,
        paymentReference: "string",
        addressId: 0,
        orderDetails: cart.map((item, index) => ({
          sI_No: index + 1,
          productId: item?.ProductId,
          varientID: item?.VariantId,
          productName: item?.ProductName,
          quantity: item?.Quantity,
          price: item?.Price,
          totalAmount: subtotal,
        })),
      };

      await createOrderMutation.mutateAsync({ orderDetails });
      clearCart(); // Clear the cart after successful order
      navigate("/profile/my-orders", {
        state: {
          success: true,
          orderId: createOrderMutation?.data?.id,
          paymentIntentId: paymentIntent?.id,
        },
      });
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
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    // here confirm the paymment with the payment intent that we create in the while cerate element  <Payment/>
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // Change this to handle the response here instead of automatic redirect
      confirmParams: {
        return_url: `${window.location.origin}/profile/my-orders`,
      },
    });

    if (error) {
      // Handle payment error
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Payment successful and confirmed, create order
      await createOrder(paymentIntent.id);

      setIsLoading(false);
    } else {
      // Payment requires additional actions or will redirect
      setIsLoading(false);
    }
  };

  const handlePaymentMode = (mode) => {
    setPaymentMode(mode);
    setPaymentError(null);
  };
  // Calculate the total amount of the product
  const subtotal = cart.reduce((acc, item) => {
    return acc + item.Quantity * (item?.DiscountPrice || item?.Price);
  }, 0);

  return (
    <div className="w-full py-20">
      <form id="payment-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start mx-auto px-5 md:w-[80%]">
          <div className="col-span-1 xl:col-span-2">
            <div className="mb-4">
              <Header />
              {loadingAddress || !address ? (
                <>
                  <button
                    type="button"
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
            </div>

            <LinkAuthenticationElement
              id="link-authentication-element"
              // Access the email value like so:
              // onChange={(event) => {
              //  setEmail(event.value.email);
              // }}
              //
              // Prefill the email field like so:
              // options={{defaultValues: {email: 'foo@bar.com'}}}
            />
            <PaymentSection
              amount={subtotal + subtotal * (5 / 100)}
              onPaymentMethodChange={handlePaymentMode}
            />
          </div>
          <div className="col-span-1 border w-full rounded-2xl border-[#A5B2BA]">
            <PlaceOrder
              disable={!stripe || !elements || !address || !cart?.length > 0}
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
