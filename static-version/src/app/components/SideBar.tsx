"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { useRouter } from "next/navigation";

interface DirectoryItem {
    name: string;
    type: "folder" | "file";
    route?: string;
    children?: DirectoryItem[];
}

const directoryStructure: DirectoryItem[] = [
    {
        name: "SKILLS",
        type: "folder",
        children: [{ name: "Summary", type: "file", route: "/skills" }],
    },
    {
        name: "EDUCATION",
        type: "folder",
        children: [
            { name: "Summary", type: "file", route: "/education" },
            { name: "Bachelor's Degree", type: "file", route: "/education/bachelor" },
            { name: "High School", type: "file", route: "/education/high-school" },
        ],
    },
    {
        name: "EXPERIENCE",
        type: "folder",
        children: [
            { name: "Summary", type: "file", route: "/experience" },
            { name: "Internship", type: "file", route: "/experience/internship" },
        ],
    },
    {
        name: "PROJECTS",
        type: "folder",
        children: [
            { name: "Summary", type: "file", route: "/projects" },
            { name: "WebApp", type: "file", route: "/projects/webapp" },
            { name: "Portfolio", type: "file", route: "/projects/portfolio" },
        ],
    },
    {
        name: "CERTIFICATIONS",
        type: "folder",
        children: [{ name: "Summary", type: "file", route: "/certifications" }],
    },
    {
        name: "Contact",
        type: "file",
        route: "/contact",
    },
    {
        name: "About",
        type: "file",
        route: "/"
    },
];

export default function Sidebar() {
    const [openFolders, setOpenFolders] = useState<{ [key: string]: boolean }>(
        {}
    );

    const router = useRouter();
    const pageDisplayingDiv = document.querySelector("#pageDisplayer");

    const toggleFolder = (folderName: string) => {
        setOpenFolders((prev) => ({
            ...prev,
            [folderName]: !prev[folderName],
        }));
    };

    const routeToLink = (route: string | undefined) => {
        if(!route){
            return;
        }
        if (pageDisplayingDiv) {
            // Start periodic checks for the scroll position
            const checkScroll = setInterval(() => {
                if (pageDisplayingDiv.scrollTop === 0) {
                    clearInterval(checkScroll); // Stop checking
                    router.push(route);
                }
            }, 50); // Check every 50ms
    
            // Trigger the smooth scroll
            pageDisplayingDiv.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            router.push(route);
        }
    }

    const renderDirectory = (items: DirectoryItem[], parentPath = "") => {
        return items.map((item) => {
            const currentPath = `${parentPath}/${item.name}`;
            if (item.type === "folder") {
                return (
                    <div key={currentPath}>
                        <button
                            className="text-left w-full px-4 py-2 custom-hover flex items-center space-x-2"
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
                <div className="px-6 py-1 custom-hover cursor-pointer text-gray-400" key={currentPath} onClick={() => routeToLink(item.route)}>
                    {item.name}
                </div>
            );
        });
    };

    return (
        <div className="w-64">
            <h2 className="text-lg font-bold px-4 py-2 text-white">
                EXPLORER
            </h2>
            <div className="font-bold px-4 py-2 text-white">
                PORTFOLIO
            </div>
            <div className="overflow-y-auto h-full">
                {renderDirectory(directoryStructure)}
            </div>
        </div>
    );
}
