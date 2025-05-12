import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, useLocation } from "react-router-dom";
import CheckoutForm from "../../../components/user/checkout/CheckoutForm";
import CheckoutShimmer from "../../../components/user/checkout/CheckoutShimmer";
import { useGetPaymentIntent, useBuyNow } from "../../../api/user/hooks";
import { useCart } from "../../../contexts/user/CartContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIP_PRIVATE_KEY);

function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentData, setPaymentData] = useState(null);
  const paymentMutation = useGetPaymentIntent();
  const buyNowMutation = useBuyNow();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const buyNowData = location.state?.buyNowData;

  useEffect(() => {
    if (!buyNowData && cart.length === 0) {
      navigate("/");
      return;
    }

    const fetchClientSecret = async () => {
      try {
        let response;
        if (buyNowData) {
          // Handle buy now flow
          response = await buyNowMutation.mutateAsync(buyNowData);
        } else {
          // Handle regular cart checkout
          response = await paymentMutation.mutateAsync();
        }
        console.log(response);
        setClientSecret(response.data.clientSecret);
        setPaymentData(response.data);
      } catch (error) {
        console.error("Failed to get client secret", error);
      }
    };

    fetchClientSecret();
  }, [cart.length, navigate, buyNowData]);

  if (!clientSecret || !stripePromise || !paymentData) {
    return <CheckoutShimmer />;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm paymentData={paymentData} isBuyNow={!!buyNowData} />
    </Elements>
  );
}

export default CheckoutPage;
