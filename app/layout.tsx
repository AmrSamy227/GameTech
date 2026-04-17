import './globals.css';
import type { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const interClass = "font-sans";

export const metadata: Metadata = {
  title: 'GameTech - Premium PC Games Collection',
  description: 'Your ultimate destination for discovering, tracking, and exploring the world of gaming.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${interClass} bg-[#1c1c1c] text-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}