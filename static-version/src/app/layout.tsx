// app/layout.tsx (Global layout for all pages except /game)
import "./globals.css";
import { Instrument_Sans } from "next/font/google";
import Dock from "./components/Dock";
import IDEPage from "./ide/page"; // Wrap pages inside IDEPage layout

const font = Instrument_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "My Portfolio",
  description: "A portfolio website built with Next.js, Tailwind CSS, and TypeScript",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`flex flex-col h-screen ${font.className} bg-gradient-to-r from-gray-800 via-gray-900 to-black`}>
        {children}
        <div className="flex flex-col justify-end">
          <Dock />
        </div>
      </body>
    </html>
  );
}
