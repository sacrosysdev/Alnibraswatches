import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useGetPaymentIntent } from "../../api/user/hooks";
import CheckoutShimmer from "../user/checkout/CheckoutShimmer";

const stripePromise = loadStripe(import.meta.env.VITE_STRIP_PRIVATE_KEY);

function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const paymentMutation = useGetPaymentIntent();

  useEffect(() => {
    const fetchClientSecret = async () => {
      setIsLoading(true);
      try {
        const response = await paymentMutation.mutateAsync(200);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Failed to get client secret", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientSecret();
  }, []);

  if (isLoading || !clientSecret || !stripePromise) {
    return <CheckoutShimmer />;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}

export default Payment;
