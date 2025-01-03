"use client"

import SideBar from './components/SideBar';
import MainContent from './components/MainContent';
import { useState } from 'react';

const HomePage = () => {
  const [selectedItem, setSelectedItem] = useState<string>(''); // State to track selected item

  const handleSelectItem = (item: string) => {
    setSelectedItem(item); // Update the selected item
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar onSelectItem={handleSelectItem} />

      {/* Main Content Area */}
      <MainContent selectedItem={selectedItem} />
    </div>
  );
};

export default HomePage;
