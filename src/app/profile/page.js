"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodiacSigns } from "@/data/zodiac";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          throw new Error("No user found in localStorage");
        }

        let userData;
        try {
          userData = JSON.parse(storedUser);
        } catch (e) {
          throw new Error("Stored user data is not valid JSON");
        }

        setUser(userData);

        // ✅ Fetch Zodiac Data if Available
        if (userData?.zodiacSign) {
          const response = await fetch(`http://localhost:5000/api/zodiac/${userData.zodiacSign}`);

          if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
          }

          const text = await response.text();

          if (!text || text.trim() === "" || text === "undefined") {
            throw new Error("API response is empty or undefined");
          }

          let apiData;
          try {
            apiData = JSON.parse(text);
          } catch (e) {
            throw new Error("API response is not valid JSON");
          }

          setUser((prevUser) => ({ ...prevUser, ...apiData }));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(error.message);
      }
    }

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.replace("/"); // ✅ Redirects to home page
  };

  // ✅ Error State Handling
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
        <p className="text-center text-xl text-red-500">Error: {error}</p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-blue-500 px-4 py-2 rounded-md"
        >
          Go to Home
        </button>
      </div>
    );
  }

  // ✅ Loading State
  if (!user) {
    return <p className="text-center text-xl text-red-500">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      {/* ✅ User Info Card */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-96">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-lg text-gray-300 mt-2">{user.email}</p>
        <p className="mt-4 text-yellow-400 font-semibold">
          Zodiac Sign: {user.zodiacSign || "Unknown"}
        </p>
      </div>

      {/* ✅ Zodiac Signs Grid */}
      <h2 className="text-2xl font-bold mt-10">Choose Your Zodiac Sign</h2>
      <div className="grid grid-cols-3 gap-6 mt-6">
        {zodiacSigns.map((zodiac) => (
          <Link key={zodiac.name} href={`/zodiac/${zodiac.name.toLowerCase()}`}>
            <div className="cursor-pointer text-center bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
              <img src={zodiac.image} alt={zodiac.name} className="w-20 h-20 mx-auto rounded-full" />
              <p className="mt-2 font-semibold">{zodiac.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ✅ Logout Button */}
      <button
        onClick={() => {
          localStorage.removeItem("user");
          router.push("/"); // Redirect to Home Page
        }}
        className="mt-6 bg-red-500 px-4 py-2 rounded-md"
      >
      Logout
      </button>

    </div>
  );
}
