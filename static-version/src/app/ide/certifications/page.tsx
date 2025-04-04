"use client";
import { useState } from "react";
import PageTitle from "../../components/PageTitle";
import ImagePopupModal from "../../components/ImagePopupModal";
import ModalStyle from "../../components/ImagePopupModalStyle";

const Certifications = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isClosing, setIsClosing] = useState(false);

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedImage(null);
            setIsClosing(false);
        }, 300); // Match this duration to the animation duration
    }

    const certifications = [
        {
            title: "WSO2 Certified Ballerina Developer - Swan Lake",
            description: "During my internship where I worked for the Ballerina Team, I learned the fundamentals of Ballerina programming language. "
            +"I was able to test my knowledge by facing the online test provided by WSO2.",
            image: "/certifications/ballerina_developer.jpg",
        },
        {
            title: "Computer Graphics with Modern OpenGL and C++",
            description: "To learn the fundamentals of Computer Graphics, I took this course provided by Ben Cook in Udemy. By following this course I "
            + "learned about GPU rendering pipeline stages, shader programs, texture mapping, shadow mapping, model rendering, etc.",
            image: "/certifications/opengl.jpg",
        },
        {
            title: "Unreal Engine 5 C++ The Ultimate Game Developer Course",
            description: "I followed this course provided by Stephen Ulibarri in Udemy to learn about Unreal Engine 5 and C++ programming in the context of game development.",
            image: "/certifications/unreal_engine.jpg",
        },
        {
            title: "Complete C# Unity Game Developer 3D",
            description: "The course provided by GameDev.tv in Udemy helped me to learn about fundamentals of game development and the use of C# and Unity to develop my first video game.",
            image: "/certifications/unity.jpg",
        },
        {
            title: "Online Japanese N3 Course",
            description: "After passing JLPT N4 examination, I wanted to improve my Japanese knowledge even further. " +
            "Thus, I took the online course provided by Attain Online Japanese School in Udemy where I learned N3 level grammar, vocabulary and reading comprehension.",
            image: "/certifications/jlpt_n3.jpg",
        },
        {
            title: "Online Japanese N3 Kanji Character Course",
            description: "One of the challenging parts of learning Japanese is to remember Kanji characters. In order to master the Kanji characters in N3 level, "
            + "I took the course provided by Attain Online Japanese School in Udemy.",
            image: "/certifications/jlpt_n3_kanji.jpg",
        },
        {
            title: "JLPT N4 Certificate",
            description: "I faced the JLPT N4 Examination in December 2022 without sitting for JLPT N5. I was able to pass the exam in my first attempt.",
            image: "/certifications/jlpt_n4.jpg",
        },
        {
            title: "Data Science: R Basics",
            description: "I took a course provied by Harvard University in Edx to learn how R programming language is used in Data Science.",
            image: "/certifications/r_basics_data_science.png",
        },
        {
            title: "Problem Solving (Basic)",
            description: "I passed an online test that is provided by HackerRank which is used to evaluate one's problem solving capabilities.",
            image: "/certifications/problem_solving_basic.png",
        },
        {
            title: "REST API (Intermediate)",
            description: "I passed an online test in REST API knowledge that is provided by HackerRank.",
            image: "/certifications/rest_api_intermediate.png",
        },
        {
            title: "SQL (Intermediate)",
            description: "I passed an online test in intermediate SQL knowledge that is provided by HackerRank.",
            image: "/certifications/sql_intermediate.png",
        },
        {
            title: "SQL (Basic)",
            description: "I passed an online test in basic SQL knowledge that is provided by HackerRank.",
            image: "/certifications/sql_basic.png",
        },
        {
            title: "CSS and JavaScript Complete Course For Beginners",
            description: "A small course in Udemy I took to learn about CSS and JavaScript.",
            image: "/certifications/css_javascript.jpg",
        },
        {
            title: "HTML, CSS & Bootstrap - Certification Course for Beginners",
            description: "A small course in Udemy I took to learn about fundamentals of HTML and CSS.",
            image: "/certifications/html_css_bootstrap.jpg",
        }
    ];

    return (
        <div>
            <PageTitle title="Certifications" />

            {/* Grid Layout */}
            <div className="grid grid-cols-1 gap-4">
                {certifications.map((cert, id) => (
                    <div
                        key={id}
                        className="bg-black rounded-lg p-4 transition-transform duration-300 flex items-center h-full"
                    >
                        {/* Image Section */}
                        <img
                            src={cert.image}
                            alt={cert.title}
                            className="max-w-80 max-h-full rounded-lg cursor-pointer object-contain"
                            onClick={() => setSelectedImage(cert.image)}
                        />
                        {/* Text Section */}
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold mb-3">{cert.title}</h2>
                            <p className="text-gray-300 text-m">{cert.description}</p>
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

export default Certifications;
