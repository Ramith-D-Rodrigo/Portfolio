import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MenuBar from './components/MenuBar';
import Sidebar from './components/SideBar';

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
      <body className="flex flex-col min-h-screen">
        <MenuBar/>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
