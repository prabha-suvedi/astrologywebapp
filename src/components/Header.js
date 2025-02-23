"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logout } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full bg-indigo-500 text-white py-2">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-3 bg-purple-800 shadow-lg">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="Astrology Logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-2xl font-bold">Vedic Wisdom by Divya</h1>
        </div>
        <p className="text-gray-300 text-xs">Customer Care: 6398515529</p>
        <nav className="flex items-center gap-3 text-sm">
          <Link className="px-3 py-1 hover:text-yellow-400" href="/">
            Home
          </Link>
          <Link className="px-3 py-1 hover:text-yellow-400" href="/#about">
            About
          </Link>
          <Link className="px-3 py-1 hover:text-yellow-400" href="/#astrologer">
            Astrologer
          </Link>
          <Link className="px-3 py-1 hover:text-yellow-400" href="/#contact">
            Contact
          </Link>
          <button
            onClick={() => router.push("/astrologers")}
            className="ml-2 px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition-colors duration-200"
          >
            Consult Now
          </button>
          {/* Conditionally render Sign In/Logout */}
          {!user ? (
            <Link
              href="/signin"
              className="ml-2 px-2 py-1 border border-yellow-400 rounded hover:bg-yellow-400 hover:text-black transition-colors duration-200"
            >
              Sign In
            </Link>
          ) : (
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="ml-2 px-3 py-1 hover:text-yellow-400"
            >
              Logout
            </button>
          )}
        </nav>
      </header>
    </div>
  );
}