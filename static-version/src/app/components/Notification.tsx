import { useEffect, useState } from "react";

export interface ColorVariant {
    [x: string]: string;
}

const Notification = ({ message, onClose, color }: { message: string; onClose: () => void, color: string }) => {
    const [show, setShow] = useState(true);

    const colorVariants : ColorVariant = {
        green: 'bg-green-500',
        red: 'bg-red-500',
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            setTimeout(onClose, 500); // Wait for fade-out animation to finish before calling onClose
        }, 3000); // Auto-close after 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed top-5 right-5 ${colorVariants[color]} text-white px-4 py-2 rounded-md shadow-lg transition-all duration-500 
                ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        >
            {message}
        </div>
    );
};

export default Notification;
