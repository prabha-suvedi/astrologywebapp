"use client";
import { useState } from "react";
import Image from "next/image";

export default function KundaliMatching() {
  const [userDetails, setUserDetails] = useState({ name: "", phone: "", date: "" });
  const [appointmentTime, setAppointmentTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    });

    const data = await res.json();
    setAppointmentTime(data.time); // Show the appointment time
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-0">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-800">Kundali Matching</h1>
        <p className="text-gray-600 mt-2">Match your Kundali with expert astrologers for the perfect compatibility check.</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="md:w-1/2">
        <Image src="/kundali.jpg" alt="Kundali Matching" width={500} height={400} />

        </div>

        <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          {!appointmentTime ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="border p-2 w-full rounded"
                  value={userDetails.name}
                  onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="border p-2 w-full rounded"
                  value={userDetails.phone}
                  onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Date of Birth</label>
                <input
                  type="date"
                  className="border p-2 w-full rounded"
                  value={userDetails.date}
                  onChange={(e) => setUserDetails({ ...userDetails, date: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-lg w-full hover:bg-green-600 transition-all"
              >
                {loading ? "Booking..." : "Book Appointment"}
              </button>
            </form>
          ) : (
            <div className="text-center text-lg font-semibold text-green-600">
              Your appointment is confirmed for <span className="font-bold">{appointmentTime}</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
