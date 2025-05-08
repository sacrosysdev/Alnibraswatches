import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/admin/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useGetPaymentIntent } from "../../../api/user/hooks";
import CheckoutShimmer from "../../../components/user/checkout/CheckoutShimmer";
import { useCart } from "../../../contexts/user/CartContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIP_PRIVATE_KEY);

function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const paymentMutation = useGetPaymentIntent();
  const { cart } = useCart();

  const subtotal = cart.reduce((acc, item) => {
    return acc + item.Quantity * (item?.DiscountPrice || item?.Price);
  }, 0);

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (cart.length === 0 || subtotal <= 0) {
        return; // Exit early if cart is empty or subtotal is invalid
      }
      setIsLoading(true);
      try {
        // pass the grand total amount
        const response = await paymentMutation.mutateAsync(
          subtotal + subtotal * (5 / 100)
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Failed to get client secret", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientSecret();
  }, [subtotal]);

  if (isLoading || !clientSecret || !stripePromise) {
    return <CheckoutShimmer />;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}

export default CheckoutPage;
