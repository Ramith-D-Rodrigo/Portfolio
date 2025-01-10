"use client";

import { useState } from "react";
import ImagePopupModal from "./ImagePopupModal";
import ModalStyle from "./ImagePopupModalStyle";

interface AchievementProps {
    image: string;
    title: string;
}


const BachelorAchievements: React.FC<{ achievements: AchievementProps[] }> = ({ achievements }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isClosing, setIsClosing] = useState(false);

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedImage(null);
            setIsClosing(false);
        }, 300); // Match this duration to the animation duration
    }

    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                    <div
                        key={index}
                        className="bg-black rounded-lg p-4 transition-transform duration-300 flex items-center h-full"
                    >
                        {/* Image Section */}
                        <img
                            src={achievement.image}
                            alt={achievement.title}
                            className="max-w-60 max-h-full rounded-lg cursor-pointer object-contain"
                            onClick={() => setSelectedImage(achievement.image)}
                        />
                        {/* Text Section */}
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold mb-3">{achievement.title}</h2>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <ImagePopupModal isClosing={isClosing} selectedImage={selectedImage} closeModal={closeModal}/>
            )}
        <ModalStyle/>
        </>
    )
};

export default BachelorAchievements;
