import './globals.css';
import Footer from './components/Footer';
import MenuBar from './components/MenuBar';
import {Instrument_Sans} from '@next/font/google';

const font = Instrument_Sans();


export const metadata = {
  title: 'My Portfolio',
  description: 'A portfolio website built with Next.js, Tailwind CSS, and TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen bg-gray-800 ${font.className}`}>
        <MenuBar/>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
