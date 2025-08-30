import '../globals.css';
import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import Link  from 'next/link';
export const metadata: Metadata = {
  title: 'Gurukul',
  description: 'Personalized tutoring platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="flex flex-col min-h-screen"
        style={{ backgroundColor: '#f7f7f7ff', color: '#2c2c2c' }} // Light green background with dark text
      >
        <Navbar />
        <main className="flex-grow px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
