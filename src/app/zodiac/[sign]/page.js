"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { zodiacSigns } from "@/data/zodiac";
import Subscription from "@/components/Subscription";

export default function ZodiacPage() {
  const { sign } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [horoscope, setHoroscope] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [backgroundBlur, setBackgroundBlur] = useState(false);

  const zodiac = zodiacSigns.find((z) => z.name.toLowerCase() === sign);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // ✅ Set user if logged in
    }

    if (!zodiac) return;

    fetchHoroscope(zodiac.name.toLowerCase());

    if (!storedUser) {
      // ✅ Show subscription modal only if user is NOT logged in
      setTimeout(() => {
        setShowSubscriptionModal(true);
        setBackgroundBlur(true);
      }, 5000);
    }
  }, [zodiac]);

  const fetchHoroscope = async (sign) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/zodiac/daily/${sign}`);
      setHoroscope(response.data.horoscope);
    } catch (error) {
      console.error("❌ Error fetching horoscope:", error);
      setError("Could not fetch horoscope. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscriptionClick = (plan, price) => {
    console.log(`Proceeding with ${plan} for ${price}`);
  };

  const closeSubscriptionModal = () => {
    setShowSubscriptionModal(false);
    setBackgroundBlur(false);
  };

  if (!zodiac) {
    return <p className="text-center text-xl text-red-500">Sign not found</p>;
  }

  return (
    <div
      className={`min-h-screen p-10 bg-gradient-to-r from-purple-400 to-pink-500 text-white ${
        backgroundBlur && !user ? "blur-sm" : ""
      }`}
    >
      {/* ✅ Zodiac Title */}
      <h1 className="text-5xl font-extrabold text-center drop-shadow-lg">{zodiac.name} Predictions</h1>

      {/* ✅ Zodiac Image */}
      <img
        src={zodiac.image}
        alt={zodiac.name}
        className="w-40 mx-auto mt-6 rounded-full border-4 border-white shadow-lg"
      />

      {/* ✅ Horoscope Text */}
      <p className="text-center mt-4 text-lg font-semibold">
        {loading ? "Loading your daily horoscope..." : error ? error : horoscope || "No horoscope available."}
      </p>

      {/* ✅ Subscription Modal (Only for non-logged-in users) */}
      {showSubscriptionModal && !user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-1/3 text-center">
            <h2 className="text-2xl font-bold">Choose Your Plan</h2>
            <p className="mt-4 text-lg">Get personalized predictions for {zodiac.name}</p>
            <div className="mt-6">
              <button
                onClick={() => handleSubscriptionClick("Monthly Horoscope", "$10")}
                className="bg-yellow-400 text-black px-6 py-2 rounded-lg mb-4 w-full shadow-md hover:bg-yellow-500"
              >
                Monthly Horoscope - $10
              </button>
              <button
                onClick={() => handleSubscriptionClick("Yearly Horoscope", "$100")}
                className="bg-yellow-400 text-black px-6 py-2 rounded-lg mb-4 w-full shadow-md hover:bg-yellow-500"
              >
                Yearly Horoscope - $100
              </button>
              <button
                onClick={closeSubscriptionModal}
                className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Footer */}
      <footer className="mt-10 text-center text-lg font-semibold text-white bg-black py-4 rounded-lg shadow-lg">
        Prediction by Divya Sri
      </footer>
    </div>
  );
}
