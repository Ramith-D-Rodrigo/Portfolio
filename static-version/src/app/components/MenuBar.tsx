"use client";

import { useState } from 'react';

export default function MenuBar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2">
      {/* Left Side: Dropdown Menus */}
      <div className="flex items-center space-x-4">
        {/* Settings Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="hover:text-gray-300"
          >
            Settings
          </button>
          <div
            className={`absolute mt-2 bg-white text-gray-800 shadow rounded w-48 transition-all duration-300 ease-in-out
            ${isSettingsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
          >
            <ul>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Preferences</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</li>
            </ul>
          </div>
        </div>

        {/* Help Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsHelpOpen(!isHelpOpen)}
            className="hover:text-gray-300"
          >
            Help
          </button>
          <div
            className={`absolute mt-2 bg-white text-gray-800 shadow rounded w-48 transition-all duration-300 ease-in-out
            ${isHelpOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
          >
            <ul>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Documentation</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">FAQ</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Contact Support</li>
            </ul>
          </div>
        </div>
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
        />
      </div>
    </div>
  );
}
