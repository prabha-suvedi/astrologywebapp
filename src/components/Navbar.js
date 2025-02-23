import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-purple-800 text-white py-3 shadow-md">
      <div className="container mx-auto flex justify-center gap-6">
        <Link href="/" className="hover:text-yellow-400 transition-colors">
          Home
        </Link>
        <Link href="/kundali-matching" className="hover:text-yellow-400 transition-colors">
          Kundali Matching
        </Link>
        <Link href="/gemstones" className="hover:text-yellow-400 transition-colors">
          Gemstone Consultation
        </Link>
        <Link href="/vastu-consultation" className="hover:text-yellow-400 transition-colors">
          Vastu Consultation
        </Link>
      </div>
    </nav>
  );
}

// Create a Vastu Consultation page with appointment booking
export function VastuConsultation() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Vastu Consultation</h1>
      <p className="text-center mb-6">Book your appointment with our Vastu expert for personalized consultation.</p>
      <div className="text-center">
        <Link href="/book-appointment" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Book Your Appointment
        </Link>
      </div>
    </div>
  );
}
