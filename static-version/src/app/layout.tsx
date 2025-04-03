import './globals.css';
import Footer from './components/Footer';
import MenuBar from './components/MenuBar';
import { Instrument_Sans } from 'next/font/google';
import SideBar from './components/SideBar';
import MainContent from './components/MainContent';
import Game from './interactive/page';

const font = Instrument_Sans({ subsets: ['latin'] });

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
      <body className={`flex flex-col h-screen bg-gray-800 ${font.className}`}>
        <Game/>
      </body>
    </html>
  );
}
