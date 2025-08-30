import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { getCurrentUser } from '@/lib/auth';
import Link  from 'next/link';
export const metadata: Metadata = {
  title: 'Gurukul',
  description: 'Personalized tutoring platform',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = await getCurrentUser()
  return (
    <html lang="en">
      <body
        className="flex flex-col min-h-screen"
        style={{ backgroundColor: '#f7f7f7ff', color: '#050505ff' }} // Light green background with dark text
      >
        <Navbar user = {user}/>
        <main className="flex-grow px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
