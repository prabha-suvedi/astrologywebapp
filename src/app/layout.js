import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/app/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
        <main className="container mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
