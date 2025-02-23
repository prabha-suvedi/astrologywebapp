"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Horoscope = ({ sign }) => {
  const [horoscope, setHoroscope] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sign) {
      fetchHoroscope(sign);
    }
  }, [sign]);

  const fetchHoroscope = async (sign) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:5000/zodiac/daily/${sign}`);

      setHoroscope(response.data.horoscope); // ✅ Extracts correct field
    } catch (error) {
      console.error("❌ Error fetching horoscope:", error);
      setError("Could not fetch horoscope. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 bg-white text-black rounded-md shadow-md">
      <h2 className="text-xl font-bold">{sign.toUpperCase()} Horoscope</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>{horoscope || "No data available"}</p>
      )}
    </div>
  );
};

export default Horoscope;
