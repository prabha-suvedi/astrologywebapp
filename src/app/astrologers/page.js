import Link from "next/link"; // Add this import
import Header from "@/components/Header";

const astrologers = [
  { id: 1, name: "Acharya Divya Sri", phone: "+918791364183", image: "/astrologer1.jpg" },
  { id: 2, name: "Yogendra Narayan Shastri", phone: "+919876543210", image: "/astrologer2.jpg" },
  { id: 3, name: "Arjun Suwedi", phone: "+911234567890", image: "/astrologer3.jpg" },
];

export default function AstrologersList() {
  return (
    <div className="bg-gradient-to-b from-purple-900 to-indigo-900 text-white min-h-screen">
      <Header />

      {/* Astrologers List Section */}
      <section className="py-16 px-10">
        <h2 className="text-4xl font-bold text-center mb-8">Our Astrologers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {astrologers.map((astrologer) => (
            <div key={astrologer.id} className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg border border-white border-opacity-20">
              <img src={astrologer.image} alt={astrologer.name} className="w-24 h-24 mx-auto rounded-full mb-4" />
              <h3 className="text-2xl font-semibold text-center">{astrologer.name}</h3>
              <a
                href={`tel:${astrologer.phone}`}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg block text-center transition duration-300 transform hover:scale-105"
              >
                Dial Call
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Home Button */}
      <div className="text-center mt-8">
        <Link href="/">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition duration-300 transform hover:scale-105">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}