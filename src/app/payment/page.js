"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCreditCard, FaPaypal, FaApplePay, FaCheckCircle } from "react-icons/fa";

export default function PaymentPage() {
    const router = useRouter();
    const [plan, setPlan] = useState("");
    const [price, setPrice] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("credit-card");
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        // Get subscription details from localStorage
        const selectedPlan = localStorage.getItem("selectedPlan") || "Basic Plan";
        const selectedPrice = localStorage.getItem("selectedPrice") || "$0";
        setPlan(selectedPlan);
        setPrice(selectedPrice);
      }, []);


  const handlePayment = () => {
    setSuccess(true);
    setTimeout(() => {
      router.push("/"); // Redirect to home after successful payment
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-indigo-900 text-white p-6">
      <div className="bg-white text-black shadow-2xl rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-600 mb-6">Complete your subscription payment below.</p>

        {/* Subscription Plan Details */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md text-gray-800 mb-6">
          <h2 className="text-xl font-semibold">{plan}</h2>
          <p className="text-lg font-bold text-purple-600">{price}</p>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <button
            className={`flex items-center justify-center w-full p-3 rounded-lg shadow-md transition ${
              paymentMethod === "credit-card" ? "bg-indigo-700 text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => setPaymentMethod("credit-card")}
          >
            <FaCreditCard className="mr-2" /> Credit/Debit Card
          </button>
          <button
            className={`flex items-center justify-center w-full p-3 rounded-lg shadow-md transition ${
              paymentMethod === "paypal" ? "bg-indigo-700 text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => setPaymentMethod("paypal")}
          >
            <FaPaypal className="mr-2" /> PayPal
          </button>

          <button
            className={`flex items-center justify-center w-full p-3 rounded-lg shadow-md transition ${
              paymentMethod === "apple-pay" ? "bg-indigo-700 text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => setPaymentMethod("apple-pay")}
          >
            <FaApplePay className="mr-2" /> Apple Pay
          </button>
        </div>

        {/* Pay Now Button */}
        <button
          onClick={handlePayment}
          className="mt-6 w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold text-lg transition hover:bg-yellow-500"
        >
          Pay Now
        </button>

        {/* Success Message */}
        {success && (
          <div className="mt-6 bg-green-500 text-white p-3 rounded-lg flex items-center justify-center">
            <FaCheckCircle className="mr-2" /> Payment Successful! Redirecting...
          </div>
        )}
      </div>
    </div>
  );
}


