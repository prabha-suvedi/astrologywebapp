"use client";
import { zodiacSigns } from "@/data/zodiac";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8">Select Your Zodiac Sign</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {zodiacSigns.map((sign) => (
          <Link key={sign.name} href={`/zodiac/${sign.name.toLowerCase()}`} className="border p-4 text-center bg-white shadow-lg rounded-lg">
            <img src={sign.image} alt={sign.name} className="w-16 h-16 mx-auto" />
            <h2 className="text-xl font-semibold">{sign.name}</h2>
            <p>{sign.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
