"use client"; 

import { useState, useEffect } from "react";
import { zodiacSigns } from "@/data/zodiac";
import Link from "next/link";
import Subscription from "../components/Subscription"; 
import Horoscope from "../components/Horoscope";
import Header from "../components/Header.js"; 
import { useRouter } from "next/navigation";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signInWithGoogle, logout } from "@/lib/auth";

export default function HomePage() {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [price, setPrice] = useState("");
  const [zodiacPredictions, setZodiacPredictions] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Add missing state variables
  const [selectedFeedbackIndex, setSelectedFeedbackIndex] = useState(null);
  const [comments, setComments] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/profile"); // Redirect if logged in
      } else {
        setLoading(false); // Allow page to load if not logged in
      }
    });

    return () => unsubscribe(); 
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSubscriptionClick = (plan, price) => {
    localStorage.setItem("selectedPlan", plan);
    localStorage.setItem("selectedPrice", price);
    router.push("/payment");
  };

  const fetchPrediction = async (sign) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/zodiac/${sign}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setZodiacPredictions((prev) => ({ ...prev, [sign]: response.data.prediction }));
    } catch (err) {
      setError(`Could not fetch prediction for ${sign}`);
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() === "") {
      alert("Feedback cannot be empty!");
      return;
    }
    setFeedbackList([...feedbackList, feedback]);
    setFeedback("");
  };

  const handleFeedbackClick = (index) => {
    setSelectedFeedbackIndex(selectedFeedbackIndex === index ? null : index);
  };

  const handleCommentSubmit = (e, index) => {
    e.preventDefault();
    const commentText = e.target.comment.value.trim();
    if (commentText === "") return;

    setComments({
      ...comments,
      [index]: [...(comments[index] || []), commentText],
    });

    e.target.reset();
  };

  return (
    <div className="bg-gradient-to-b from-purple-900 to-indigo-900 text-white min-h-screen">
      <Header /> 

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-purple-800 to-indigo-800">
        <h2 className="text-5xl font-extrabold text-white">Unlock Your Cosmic Destiny</h2>
        <p className="text-xl mt-4 text-gray-200">Discover daily insights and guidance based on your zodiac sign.</p>
      </section>

      {/* Zodiac Signs Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-10 py-16">
        {zodiacSigns.map((sign) => (
          <Link
            key={sign.name}
            href={`/zodiac/${sign.name.toLowerCase()}`}
            className="bg-white bg-opacity-10 text-white rounded-xl p-6 text-center shadow-lg transform transition hover:scale-105 hover:bg-opacity-20 border border-white border-opacity-20"
          >
            <img src={sign.image} alt={sign.name} className="w-20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">{sign.name}</h3>
          </Link>
        ))}
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gradient-to-r from-purple-800 to-indigo-800 text-center">
        <h2 className="text-4xl font-bold text-white">About Astrology</h2>
        <p className="mt-4 text-lg text-gray-200 px-10">
          Astrology is a science of cosmic influence, where planetary positions at the time of birth shape an individual’s 
          destiny, personality, and life path. By analyzing horoscopes and planetary movements, Acharya Divya Sri provides 
          accurate predictions, solutions for career growth, relationship harmony, financial stability, and overall well-being.
        </p>
        <p className="mt-4 text-lg text-gray-200 px-10">
          Acharya Divya Sri specializes in offering effective remedies to neutralize negative planetary influences:
        </p>
        <ul className="mt-6 text-lg text-gray-200 space-y-4">
          <li>✔ Gemstone recommendations to align planetary energies</li>
          <li>✔ Mantras and rituals for spiritual upliftment</li>
          <li>✔ Yantras and poojas for prosperity and protection</li>
          <li>✔ Vastu corrections for a balanced and peaceful life</li>
        </ul>
      </section>

      {/* Subscription Plans Section */}
      <section id="subscriptions" className="py-16 text-center bg-gradient-to-r from-purple-900 to-indigo-900">
        <h2 className="text-4xl font-bold text-yellow-400">Subscription Plans</h2>
        <p className="mt-4 text-lg text-gray-200 px-10">
          Get continuous astrological guidance through exclusive subscription plans:
        </p>
        <div className="flex justify-center gap-10 mt-6">
          <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg border border-white border-opacity-20 transform transition hover:scale-105">
            <h3 className="text-2xl font-semibold text-white">🔹 Monthly Consultation</h3>
            <p className="mt-2 text-gray-200">Regular insights, horoscope analysis, and remedies.</p>
            <button 
              onClick={() => handleSubscriptionClick("Monthly Consultation", "$200")} 
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Subscribe
            </button>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg border border-white border-opacity-20 transform transition hover:scale-105">
            <h3 className="text-2xl font-semibold text-white">🔹 Yearly Consultation</h3>
            <p className="mt-2 text-gray-200">A detailed life roadmap with personalized guidance.</p>
            <button 
              onClick={() => handleSubscriptionClick("Yearly Consultation", "$2000")} 
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Popup Window */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-1/3 text-center">
            <h2 className="text-2xl font-bold">{selectedPlan}</h2>
            <p className="mt-4 text-lg">Price: {price}</p>
            <button onClick={() => setShowPopup(false)} className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Astrologer Section */}
      <section id="astrologer" className="py-16 text-center bg-gradient-to-r from-purple-800 to-indigo-800">
        <h2 className="text-4xl font-bold text-white">Meet Acharya Divya Sri</h2>
        <img src="/astrologer.jpg" alt="Acharya Divya Sri" className="w-40 h-40 mx-auto rounded-full mt-6 border-4 border-white" />
        <p className="mt-4 text-lg text-gray-200 px-10">
          Acharya Divya Sri is a renowned astrologer and Vastu expert with 15 years of experience in the field of astrology, Vedic sciences, 
          and spiritual guidance. With deep knowledge and a keen intuition, she has helped countless individuals find clarity and 
          direction in their lives through horoscope readings, Vastu consultations, and remedial solutions.
        </p>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="py-16 bg-gradient-to-r from-purple-900 to-indigo-900 text-center">
        <h2 className="text-4xl font-bold text-white mb-8">Share Your Feedback</h2>
        <form onSubmit={handleFeedbackSubmit} className="mt-6 max-w-2xl mx-auto">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback..."
            className="w-full p-4 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-300 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Submit Feedback
          </button>
        </form>

        <div className="mt-12 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-6">Recent Feedback</h3>
          <ul className="space-y-6">
            {feedbackList.map((fb, index) => (
              <li key={index} className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg border border-white border-opacity-20">
                <div className="flex items-center justify-between">
                  <p className="text-white text-lg">{fb}</p>
                  <button
                    onClick={() => handleFeedbackClick(index)}
                    className="text-purple-400 hover:text-purple-300 transition duration-300"
                  >
                    {selectedFeedbackIndex === index ? "▲ Hide Comments" : "▼ Show Comments"}
                  </button>
                </div>

                {selectedFeedbackIndex === index && (
                  <div className="mt-4">
                    <h4 className="text-xl font-semibold text-white mb-4">Comments</h4>
                    <ul className="space-y-4">
                      {(comments[index] || []).map((comment, i) => (
                        <li key={i} className="bg-white bg-opacity-5 p-4 rounded-lg text-white">
                          <p>{comment}</p>
                        </li>
                      ))}
                    </ul>

                    <form onSubmit={(e) => handleCommentSubmit(e, index)} className="mt-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          name="comment"
                          placeholder="Add a comment..."
                          className="flex-1 p-2 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-300 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                          type="submit"
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105"
                        >
                          Comment
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-r from-purple-800 to-indigo-800 text-center">
        <h2 className="text-4xl font-bold text-white">Contact Us</h2>
        <p className="mt-4 text-lg text-gray-200">For astrology consultations, reach out to us:</p>
        <p className="mt-2 text-lg font-semibold text-gray-200">📧 Email: divyasriastro@gmail.com</p>
        <p className="mt-2 text-lg font-semibold text-gray-200">📞 Phone: +91 8791364183</p>

        {/* Social Media Links */}
        <div className="mt-6 flex justify-center space-x-6">
          <a href="https://www.youtube.com/@JyotishParamarsh" target="_blank" rel="noopener noreferrer">
            <img src="/youtube.jpg" alt="YouTube" className="w-8 h-8" />
          </a>
          <a href="https://www.instagram.com/astro_divyaa?igsh=aTVrM3VwMDhrMnZs" target="_blank" rel="noopener noreferrer">
            <img src="/instagram.jpg" alt="Instagram" className="w-8 h-8" />
          </a>
          <a href="https://www.linkedin.com/in/acharyadivyasri?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
            <img src="/linkedin.jpg" alt="LinkedIn" className="w-8 h-8" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-center py-6">
        <p className="text-sm text-gray-200">&copy; 2025 Vedic Wisdom by Divya. All rights reserved.</p>
      </footer>
    </div>
  );
}