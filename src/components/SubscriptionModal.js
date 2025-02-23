import React from "react";

const SubscriptionModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const plans = {
    monthly: { title: "Monthly Consultation", price: "$19.99/month", benefits: "Regular insights, horoscope analysis, and remedies." },
    yearly: { title: "Yearly Consultation", price: "$199.99/year", benefits: "A detailed life roadmap with personalized guidance." },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center text-black">
        <h2 className="text-xl font-semibold text-purple-700">{plans[type]?.title}</h2>
        <p className="text-lg font-bold mt-4">{plans[type]?.price}</p>
        <p className="text-gray-600 mt-2">{plans[type]?.benefits}</p>
        <button
          className="bg-purple-600 text-white px-6 py-2 mt-4 rounded-lg hover:bg-purple-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubscriptionModal;
