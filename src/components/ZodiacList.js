"use client";
import { useState } from "react";
import Horoscope from "./Horoscope";

const zodiacSigns = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
];

const ZodiacList = () => {
  const [selectedSign, setSelectedSign] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Choose Your Zodiac Sign</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {zodiacSigns.map((sign) => (
          <button
            key={sign}
            className="p-2 bg-blue-500 text-white rounded-md"
            onClick={() => setSelectedSign(sign)}
          >
            {sign.toUpperCase()}
          </button>
        ))}
      </div>

      {selectedSign && <Horoscope sign={selectedSign} />}
    </div>
  );
};

export default ZodiacList;
