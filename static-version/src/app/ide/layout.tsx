import '../globals.css';
import Footer from '../components/Footer';
import MenuBar from '../components/MenuBar';
import { Instrument_Sans } from 'next/font/google';
import SideBar from '../components/SideBar';
import MainContent from '../components/MainContent';
import IDEPage from './page';
import Dock from '../components/Dock';

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
        <>
            <MenuBar hasMenu={true} />
            <div className="flex flex-grow overflow-hidden bg-gray-800">
                {/* Sidebar */}
                <SideBar />

                {/* Main Content Area */}
                <MainContent renderingPage={children} />
            </div>
            <Footer />
        </>
    );
}