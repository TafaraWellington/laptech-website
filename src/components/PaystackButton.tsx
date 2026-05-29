"use client";

import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";

interface PaystackButtonProps {
  amount: number; // in ZAR
  email?: string;
  productName: string;
}

export default function PaystackButton({ amount, email = "customer@example.com", productName }: PaystackButtonProps) {
  const [loading, setLoading] = useState(false);

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  // Paystack expects amount in kobo/cents, so we multiply by 100 for ZAR cents
  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount * 100,
    publicKey: publicKey,
  };

  // Safe call hook - will be configured with either active key or empty string
  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference: any) => {
    setLoading(false);
    alert(`Payment successful! Reference: ${reference.reference}`);
  };

  const onClose = () => {
    setLoading(false);
    console.log("Payment closed.");
  };

  const handlePayment = () => {
    if (!publicKey) {
      alert("Paystack Public Key is missing. Please configure NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in your environment variables (.env).");
      return;
    }
    setLoading(true);
    initializePayment({ onSuccess, onClose });
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed group"
    >
      <span className="relative z-10 flex items-center justify-center gap-1.5">
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </>
        ) : (
          "Buy Now"
        )}
      </span>
    </button>
  );
}
