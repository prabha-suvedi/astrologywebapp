"use client";
import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";

const gemstones = [
  { id: 1, name: "Ruby", price: 10000, image: "/gems/ruby.jpg" },
  { id: 2, name: "Emerald", price: 15000, image: "/gems/emerald.jpg" },
  { id: 3, name: "Blue Sapphire", price: 20000, image: "/gems/blue-sapphire.jpg" },
  { id: 4, name: "Yellow Sapphire", price: 18000, image: "/gems/yellow-sapphire.jpg" },
  { id: 5, name: "Pearl", price: 5000, image: "/gems/pearl.jpg" },
  { id: 6, name: "Coral", price: 7000, image: "/gems/coral.jpg" },
];

export default function Gemstones() {
    const [selectedGem, setSelectedGem] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [userDetails, setUserDetails] = useState({ name: "", address: "", paymentMethod: "UPI" });
  
    const handlePayment = async () => {
        if (!selectedGem) {
          alert("Please select a gemstone before proceeding with payment.");
          return;
        }
      
        try {
          console.log("Initiating payment process...");
      
          const res = await fetch("/api/createOrder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: userDetails.name,
              address: userDetails.address,
              phone: "1234567890", // Replace with actual phone input
              amount: selectedGem.price,
              paymentMethod: "UPI", // Change based on user selection
              item: selectedGem.name,
            }),
          });
      
          const data = await res.json();
          console.log("Payment API Response:", data);
      
          if (res.ok && data.paymentUrl) {
            console.log("Redirecting to Paytm:", data.paymentUrl);
            window.location.href = data.paymentUrl;
          } else {
            throw new Error(data.error || "Payment failed.");
          }
        } catch (error) {
          console.error("Payment Error:", error);
          alert("Payment failed! Please try again.");
        }
      };
      
      
      
  
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">Gemstone Consultation</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gemstones.map((gem) => (
            <div key={gem.id} className="border p-4 rounded-lg shadow-lg bg-white">
              <Image src={gem.image} alt={gem.name} width={200} height={200} className="rounded-lg mx-auto" />
              <h2 className="text-xl font-semibold text-center mt-4">{gem.name}</h2>
              <p className="text-center text-lg text-green-600 font-bold">₹{gem.price}</p>
              <button
                className="block mx-auto mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
                onClick={() => {
                  setSelectedGem(gem);
                  setShowPopup(true);
                }}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
  
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Enter Your Details</h2>
              <input
                type="text"
                placeholder="Full Name"
                className="border p-2 w-full mb-2"
                value={userDetails.name}
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Address"
                className="border p-2 w-full mb-2"
                value={userDetails.address}
                onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
              />
              <select
                className="border p-2 w-full mb-4"
                value={userDetails.paymentMethod}
                onChange={(e) => setUserDetails({ ...userDetails, paymentMethod: e.target.value })}
              >
                <option value="UPI">UPI (Google Pay, Paytm, PhonePe)</option>
                <option value="CreditCard">Credit Card</option>
                <option value="NetBanking">Net Banking</option>
              </select>
              <button onClick={handlePayment} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                Proceed to Pay ₹{selectedGem.price}
              </button>
              <button onClick={() => setShowPopup(false)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }