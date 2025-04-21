"use client";
import { useState } from "react";
import PageTitle from "../../components/PageTitle";
import ImagePopupModal from "../../components/ImagePopupModal";
import ModalStyle from "../../components/ImagePopupModalStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedium } from "@fortawesome/free-brands-svg-icons";

const Articles = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isClosing, setIsClosing] = useState(false);

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedImage(null);
            setIsClosing(false);
        }, 300); // Match this duration to the animation duration
    }

    const articles = [
        {
            title: "WebXR Device API Depth Sensing — An Introduction",
            description: "In thie article, I explain the basics of Depth Sensing feature provided by WebXR Device API. I explain what is depth sensing and how it can be used. As an example use-case, I create a simple depth map using the data provided by this feature.",
            link: "https://medium.com/@ramithrodrigo/webxr-device-api-depth-sensing-an-introduction-72accf544e3d",
        },
        {
            title: "WebXR Device API Hit Test — Adding virtual objects to the AR session manually",
            description: "In thie article, I explain the basics of Hit test feature provided by WebXR Device API to place virtual 3D objects on our AR session manually.",
            link: "https://medium.com/@ramithrodrigo/webxr-device-api-hit-test-adding-virtual-objects-to-the-ar-session-manually-91c1201cc555",
        },
        {
            title: "On to the realm of Web-based Augmented Reality using WebXR Device API — Creating a basic WebAR session",
            description: "In thie article, I dive into the fundamentals of WebXR Device API to create a simple WebAR Session. Here, I focus on using WebGL directly instead of popular 3D libraries such as Three.js",
            link: "https://medium.com/@ramithrodrigo/on-to-the-realm-of-web-based-augmented-reality-using-webxr-device-api-creating-a-basic-webar-70727865f8fb",
        }
    ];

    return (
        <div>
            <PageTitle title="Articles" />

            {/* Grid Layout */}
            <div className="grid grid-cols-1 gap-4">
                {articles.map((article, id) => (
                    <div
                        key={id}
                        className="bg-black rounded-lg p-4 transition-transform duration-300 flex items-center h-full"
                    >
                        {/* Text Section */}
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold mb-3">{article.title}</h2>
                            <p className="text-gray-300 text-m">{article.description}</p>
                            <a
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center px-3 py-2 my-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300 ease-in-out transform hover:scale-105 transition-transform`}
                            >
                                <FontAwesomeIcon icon={faMedium} className="mr-2" />
                                Check it out!
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Image Popup Modal */}
            {selectedImage && (
                <ImagePopupModal isClosing={isClosing} selectedImage={selectedImage} closeModal={closeModal}/>
            )}

            <ModalStyle/>
        </div>
    );
};

export default Articles;
