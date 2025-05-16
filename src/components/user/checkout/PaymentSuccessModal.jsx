import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessModal({
  isOpen,
  orderId,
  paymentIntentId,
  onClose,
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Start the progress timer for auto-redirection
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            onClose();
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-4">
        <div className="flex flex-col items-center text-center">
          <div className="text-green-500 mb-4">
            <CheckCircle size={64} strokeWidth={1.5} />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully.
          </p>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex flex-col gap-2 w-full text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Order ID:</span>
              <span className="font-medium">{orderId || "Processing..."}</span>
            </div>
            {paymentIntentId && (
              <div className="flex justify-between">
                <span>Payment Reference:</span>
                <span className="font-medium">{paymentIntentId}</span>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-[#00211E] text-white font-medium rounded-lg hover:bg-[#003d38] transition-colors w-full"
          >
            View Order Details
          </button>
        </div>
      </div>
    </div>
  );
}
