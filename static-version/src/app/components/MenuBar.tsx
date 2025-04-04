"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

type MenuBarProps = {
  hasMenu: boolean
}

export default function MenuBar({ hasMenu }: MenuBarProps) {
  const router = useRouter();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement | null>(null);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2">
      {/* Left Side: Dropdown Menus */}
      <div className="flex items-center space-x-4 h-5">
        {hasMenu === true ? (
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="hover:text-gray-300"
            >
              Settings
            </button>
            <div
              className={`absolute mt-2 bg-gray-800 shadow-[0_4px_12px_rgba(0,0,0,0.5)] rounded w-48 transition-all duration-300 ease-in-out
            ${isSettingsOpen
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
                }`}
            >
              <ul>
                <li className="px-4 py-2 custom-hover cursor-pointer relative">
                  Language
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                    Coming Soon
                  </span>
                </li>
                <li className="px-4 py-2 custom-hover cursor-pointer relative">
                  Theme
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                    Coming Soon
                  </span>
                </li>
              </ul>
            </div>
          </div>) : <></>}
      </div>
      {/* Right Side: Control Buttons */}
      <div className="flex items-center space-x-2">
        {/* Resize Button */}
        <button
          title="Resize"
          className="w-4 h-4 rounded-full bg-green-400 hover:bg-green-500"
        />
        {/* Minimize Button */}
        <button
          title="Minimize"
          className="w-4 h-4 rounded-full bg-yellow-400 hover:bg-yellow-500"
        />
        {/* Close Button */}
        <button
          title="Close"
          className="w-4 h-4 rounded-full bg-red-400 hover:bg-red-500"
          onClick={()=>{
            router.push("/");
          }}
        />
      </div>
    </div >
  );
}
