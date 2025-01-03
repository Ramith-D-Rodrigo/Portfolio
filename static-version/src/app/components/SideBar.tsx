"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";

interface DirectoryItem {
    name: string;
    type: "folder" | "file";
    children?: DirectoryItem[];
}

const directoryStructure: DirectoryItem[] = [
    {
        name: "SKILLS",
        type: "folder",
        children: [{ name: "Summary", type: "file" }],
    },
    {
        name: "EDUCATION",
        type: "folder",
        children: [
            { name: "Summary", type: "file" },
            { name: "Bachelor's Degree", type: "file" },
            { name: "High School", type: "file" },
        ],
    },
    {
        name: "EXPERIENCE",
        type: "folder",
        children: [
            { name: "Summary", type: "file" },
            { name: "Internship", type: "file" },
        ],
    },
    {
        name: "PROJECTS",
        type: "folder",
        children: [
            { name: "WebApp", type: "file" },
            { name: "Portfolio", type: "file" },
        ],
    },
    {
        name: "CERTIFICATIONS",
        type: "folder",
        children: [{ name: "Summary", type: "file" }],
    },
    {
        name: "Contact",
        type: "file",
    },
    {
        name: "About",
        type: "file",
    },
];

interface SidebarProps {
    onSelectItem: (item: string) => void; // Callback to update the selected item
}

export default function Sidebar({ onSelectItem }: SidebarProps) {
    const [openFolders, setOpenFolders] = useState<{ [key: string]: boolean }>(
        {}
    );

    const toggleFolder = (folderName: string) => {
        setOpenFolders((prev) => ({
            ...prev,
            [folderName]: !prev[folderName],
        }));
    };

    const renderDirectory = (items: DirectoryItem[], parentPath = "") => {
        return items.map((item) => {
            const currentPath = `${parentPath}/${item.name}`;
            if (item.type === "folder") {
                return (
                    <div key={currentPath}>
                        <button
                            className="text-left w-full px-4 py-2 bg-gray-800 hover:bg-gray-300 flex items-center space-x-2"
                            onClick={() => toggleFolder(currentPath)}
                        >
                            {/* Icon */}
                            <span className="w-4 h-4 text-gray-600 flex items-center">
                                {openFolders[currentPath] ? (
                                    <FontAwesomeIcon icon={faChevronDown} />
                                ) : (
                                    <FontAwesomeIcon icon={faChevronRight} />
                                )}
                            </span>
                            {/* Folder Name */}
                            <span>{item.name}</span>
                        </button>
                        {openFolders[currentPath] && (
                            <div className="pl-4">
                                {renderDirectory(item.children || [], currentPath)}
                            </div>
                        )}
                    </div>
                );
            }
            return (
                <div key={currentPath} className="px-6 py-1 bg-gray-800 hover:bg-gray-100 cursor-pointer text-gray-400">
                    {item.name}
                </div>
            );
        });
    };

    return (
        <div className="w-64 h-screen bg-gray-800">
            <h2 className="text-lg font-bold px-4 py-2 bg-gray-800 text-white">
                EXPLORER
            </h2>
            <div className="overflow-y-auto h-full">
                {renderDirectory(directoryStructure)}
            </div>
        </div>
    );
}
