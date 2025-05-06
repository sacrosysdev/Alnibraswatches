import gpay from "../../assets/svg/checkout/gpay.svg";
import phonepe from "../../assets/svg/checkout/phonepe.svg";
import paytm from "../../assets/svg/checkout/paytm.svg";
import mastercard from "../../assets/svg/checkout/mastercard.svg";

export const PAYMENT_METHODS = [
  { id: "card", name: "Debit / Credit Card", icon: mastercard },
  { id: "upi", name: "UPI", icon: phonepe },
  { id: "netbanking", name: "Net Banking", icon: paytm },
  { id: "wallet", name: "Wallet", icon: gpay },
];
