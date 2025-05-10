import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../../components/admin/CheckoutForm";
import CheckoutShimmer from "../../../components/user/checkout/CheckoutShimmer";
import { useGetPaymentIntent } from "../../../api/user/hooks";
import { useCart } from "../../../contexts/user/CartContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIP_PRIVATE_KEY);

function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentData, setPaymentData] = useState(null);
  const paymentMutation = useGetPaymentIntent();
  const { cart } = useCart();

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (cart.length === 0) return;
      
      try {
        const response = await paymentMutation.mutateAsync();
        setClientSecret(response.data.clientSecret);
        setPaymentData(response.data);
      } catch (error) {
        console.error("Failed to get client secret", error);
      }
    };

    fetchClientSecret();
  }, [cart.length]);

  if (!clientSecret || !stripePromise || !paymentData) {
    return <CheckoutShimmer />;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm paymentData={paymentData} />
    </Elements>
  );
}

export default CheckoutPage;
