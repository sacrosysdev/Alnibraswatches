import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, useLocation } from "react-router-dom";
import CheckoutForm from "../../../components/user/checkout/CheckoutForm";
import { useGetPaymentIntent, useBuyNow } from "../../../api/user/hooks";
import { useCart } from "../../../contexts/user/CartContext";
import { useAuth } from "../../../contexts/user/AuthContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIP_PRIVATE_KEY);

function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const paymentMutation = useGetPaymentIntent();
  const buyNowMutation = useBuyNow();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const buyNowData = location.state?.buyNowData;
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    navigate("/login");
    return;
  }

  useEffect(() => {
    if (!buyNowData && cart.length === 0) {
      navigate("/");
      return;
    }
  }, [navigate, buyNowData, cart.length]);

  const fetchClientSecret = async (method) => {
    try {
      let response;
      if (buyNowData) {
        // Handle buy now flow
        if (method === "card") {
          response = await buyNowMutation.mutateAsync(buyNowData);
        } else {
          response = await buyNowMutation.mutateAsync({
            ...buyNowData,
            header: "COD",
          });
        }
      } else {
        if (method === "card") {
          // Handle regular cart checkout
          response = await paymentMutation.mutateAsync();
        } else {
          response = await paymentMutation.mutateAsync({
            header: "COD",
          });
        }
      }
      setClientSecret(response.data.clientSecret);
      setPaymentData(response.data);
    } catch (error) {
      console.error("Failed to get client secret", error);
    }
  };

  // handle payment method
  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    fetchClientSecret(method);
  };

  if (!clientSecret) {
    return (
      <CheckoutForm
        clientSecret={clientSecret}
        paymentData={paymentData}
        paymentMethod={paymentMethod}
        handlePaymentMethod={handlePaymentMethod}
      />
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm
        clientSecret={clientSecret}
        paymentData={paymentData}
        paymentMethod={paymentMethod}
        handlePaymentMethod={handlePaymentMethod}
      />
    </Elements>
  );
}

export default CheckoutPage;
