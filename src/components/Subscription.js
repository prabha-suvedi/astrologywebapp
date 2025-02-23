"use client";

import { useState } from "react";
import { zodiacSigns } from "@/data/zodiac";
import Link from "next/link";
import Subscription from "@/components/Subscription";

// Adjust the path accordingly
  // Use absolute path with @ symbol


export default function HomePage() {
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [price, setPrice] = useState("");

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() !== "") {
      setFeedbackList([...feedbackList, feedback]);
      setFeedback("");
    }
  };

  const openPopup = (plan, price) => {
    setSelectedPlan(plan);
    setPrice(price);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-gradient-to-b from-purple-600 to-indigo-900 text-white min-h-screen">
      {/* Subscription Plans */}
      <section id="subscriptions" className="py-16 text-center bg-purple-900 bg-opacity-50">
        <h2 className="text-4xl font-bold text-yellow-400">Subscription Plans</h2>
        <p className="mt-4 text-lg px-10">
          Get continuous astrological guidance through exclusive subscription plans:
        </p>
        <div className="flex justify-center gap-10 mt-6">
          <div className="bg-white bg-opacity-20 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold">🔹 Monthly Consultation</h3>
            <p className="mt-2">Regular insights, horoscope analysis, and remedies.</p>
            <button onClick={() => openPopup("Monthly Consultation", "$200")} className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-lg">
              Subscribe
            </button>
          </div>
          <div className="bg-white bg-opacity-20 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold">🔹 Yearly Consultation</h3>
            <p className="mt-2">A detailed life roadmap with personalized guidance.</p>
            <button onClick={() => openPopup("Yearly Consultation", "$2000")} className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Popup Window */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-1/3 text-center">
            <h2 className="text-2xl font-bold">{selectedPlan}</h2>
            <p className="mt-4 text-lg">Price: {price}</p>
            <button onClick={closePopup} className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
