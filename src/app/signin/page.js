"use client";

import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setMessage(data.message);
        // Redirect or do something else upon successful sign in
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      {/* Semi-transparent overlay box for the form */}
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center gap-2">
          {/* Example Inline SVG Icon */}
          <svg
            className="w-7 h-7 text-purple-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5c0 1.37-1.12 2.5-2.5 2.5S11.5 11.87 11.5 10.5 12.62 8 14 8s2.5 1.12 2.5 2.5zM3 20.5c0-2.21 3.58-4 8-4s8 1.79 8 4"
            />
          </svg>
          Sign In
        </h1>

        {/* Error / Success Messages */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mb-4">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-2 mb-4">
            {message}
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none 
                         focus:ring-2 focus:ring-purple-500 transition duration-200"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none 
                         focus:ring-2 focus:ring-purple-500 transition duration-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="mt-1 text-right">
              <a
                href="#"
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded 
                       hover:bg-purple-700 transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-4">
          <span className="text-gray-400 mx-2">OR</span>
        </div>

        {/* Example: Sign in with Google */}
        <button
          type="button"
          className="w-full py-2 px-4 border border-gray-300 rounded flex items-center justify-center 
                     gap-2 hover:bg-gray-100 transition duration-200"
        >
          <img src="g.jpg" alt="Google Logo"className="w-5 h-5 rounded-full"/>
          Sign In with Google
        </button>

        {/* Sign Up Prompt */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-purple-600 hover:text-purple-700">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
