"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface OpenTabProps {
    tabName: string;
    closeTab: () => void;
    showTab: () => void;
}

const OpenedTab = ({ tabName, closeTab, showTab }: OpenTabProps) => {
    return (
        <div className="bg-gray-700 text-gray-300 flex items-center">
            {/* Clickable Tab Name */}
            <div
                className="text-sm font-medium px-4 py-1 cursor-pointer hover:underline transition-all duration-200"
                onClick={showTab} // Trigger the showTab function when the tab name is clicked
            >
                {tabName}
            </div>

            {/* Close Icon */}
            <div
                className="p-0.5 rounded-md m-0.5 hover:bg-gray-500 transition-all duration-200 cursor-pointer"
                aria-label="Close"
                onClick={closeTab} // Trigger the closeTab function when the close icon is clicked
            >
                <FontAwesomeIcon icon={faXmark} className="pr-1 pl-1" />
            </div>
        </div>
    );
};


export default OpenedTab;