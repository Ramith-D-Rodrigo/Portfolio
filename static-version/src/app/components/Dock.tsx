"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { faCode, faGamepad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IDE_ROOT } from "../ide/constants";
import { GAME_ROOT } from "../game/constants";

const Dock = () => {
    const router = useRouter();
    const pathName = usePathname();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const items = [
        { id: 0, label: "Home", icon: <FontAwesomeIcon icon={faCode} />, path: IDE_ROOT },
        { id: 1, label: "Game", icon: <FontAwesomeIcon icon={faGamepad} />, path: GAME_ROOT },
    ];

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const isActive = (path: string) => {
        // Use startsWith to handle nested routes if needed
        return pathName.startsWith(path);
    };

    return (
        <div className="mx-auto flex h-16 items-center bg-gray-700 gap-5 rounded-2xl shadow-xl m-5">
            <div className="flex items-end px-4 py-2 bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-2xl shadow-lg border border-gray-700">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="group relative flex flex-col items-center mx-1 transition-all duration-200 ease-out"
                        onMouseEnter={() => setHoveredIndex(item.id)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => handleNavigation(item.path)}
                    >
                        
                        <div className={`w-12 h-12 flex items-center justify-center text-2xl rounded-xl transition-all duration-200 ease-out cursor-pointer ${
                            isActive(item.path) 
                                ? 'bg-blue-500 bg-opacity-70' 
                                : 'bg-gray-700 bg-opacity-50 hover:bg-gray-600'
                        } ${
                            hoveredIndex === item.id ? 'scale-125 mt-[-20px]' : ''
                        }`}>
                            {item.icon}
                        </div>
                        
                        <div className={`w-1 h-1 rounded-full mt-1 ${
                            isActive(item.path) ? 'bg-white' : 'bg-white opacity-0 group-hover:opacity-70'
                        } transition-opacity duration-200`}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dock;