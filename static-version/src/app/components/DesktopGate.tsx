"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faMobileAlt } from "@fortawesome/free-solid-svg-icons";

const DesktopGate = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // Check for mobile user agents or screen width
      const userAgent = typeof window.navigator !== "undefined" ? window.navigator.userAgent : "";
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      
      // We consider anything less than 1024px as "mobile/tablet" for this desktop-centric experience
      const isLowRes = window.innerWidth < 1024;
      const isMobileAgent = mobileRegex.test(userAgent);

      setIsMobile(isLowRes || isMobileAgent);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white p-8 text-center overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]"></div>

      <div className="relative z-10 max-w-md w-full animate-in fade-in zoom-in duration-700">
        <div className="mb-8 flex justify-center items-center gap-6">
          <div className="relative">
            <FontAwesomeIcon icon={faMobileAlt} className="text-6xl text-gray-500 opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-12 h-0.5 bg-red-500 rotate-45"></div>
            </div>
          </div>
          <div className="text-4xl text-gray-400">→</div>
          <FontAwesomeIcon icon={faDesktop} className="text-7xl text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
        </div>

        <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Desktop Recommended
        </h1>
        
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          To experience the full potential of this portfolio, including immersive 3D elements and interactive features, please switch to a <span className="text-white font-semibold">desktop or laptop</span>.
        </p>

        <div className="inline-block px-6 py-3 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm text-sm text-gray-500 uppercase tracking-widest font-medium">
          Optimized for Large Screens
        </div>
        
        <div className="mt-12 text-xs text-gray-600 uppercase tracking-tighter">
          Ramith Rodrigo • Portfolio
        </div>
      </div>
      
      {/* Animated subtle lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>
    </div>
  );
};

export default DesktopGate;
