"use client";
import Link from "next/link";
import { useState } from "react"; // Add this line
import { VastuConsultation } from "@/components/Navbar";



export default function VastuPage() {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", date: "" });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          alert("Appointment booked successfully!");
          setShowModal(false);
          setFormData({ name: "", email: "", date: "" });
        } else {
          alert("Failed to book appointment");
        }
      } catch (error) {
        console.error("Error booking appointment:", error);
      }
    };
  
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Vastu Consultation</h1>
        <p className="text-center mb-6">Book your appointment with our Vastu expert for personalized consultation.</p>
        <div className="text-center">
          <button 
            onClick={() => setShowModal(true)} 
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Book Your Appointment
          </button>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Book Your Appointment</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full mb-2 p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full mb-2 p-2 border rounded"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="block w-full mb-2 p-2 border rounded"
                  required
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Confirm Booking
                </button>
              </form>
              <button 
                onClick={() => setShowModal(false)} 
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  