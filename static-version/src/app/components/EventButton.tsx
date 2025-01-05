"use client";
import { useRouter } from "next/navigation";

interface EventButtonProps {
    navLink: string;
    navContent: string;
    isDisabled: boolean;
}

const EventButton = ({ navLink, navContent, isDisabled }: EventButtonProps) => {
    const router = useRouter();
    const onClick = () => {
        router.push(navLink);
    }

    return (
        <button
            className={`mt-4 inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-md shadow-md transition duration-300 
            ${isDisabled ? "bg-blue-300 cursor-not-allowed opacity-50" : ""}`}
            onClick={onClick}
            disabled={isDisabled}
        >
            {navContent}
        </button>

    );
}

export default EventButton;
