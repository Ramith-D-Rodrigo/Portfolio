import React from "react";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GITHUB_URL, LINKEDIN_URL } from "../../../globalConstants";

const IDEPage = () => {
    return (
        <div className="">
            {/* Header Section */}
            <div className="text-center">
                <h1 className="text-8xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
                    Ramith Rodrigo
                </h1>
                <h2 className="text-4xl text-gray-300 font-medium mb-6">
                    Aspiring Software Engineer
                </h2>
            </div>

            <hr className="my-6 border-gray-600" />

            {/* Introduction */}
            <p className="text-lg leading-relaxed text-gray-300 mb-6">
                Final-year undergraduate at the University of Colombo School of Computing
                with hands-on experience as a software engineering intern at a reputed company.
                A proactive and results-driven problem solver dedicated to productivity and
                quality with a strong foundation in software engineering, full-stack
                development, and computer graphics. Presently focused on developing expertise
                in the aforementioned fields and obtaining industry experience.
            </p>

            <blockquote className="text-xl italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-6">
                &quot;I have been passionate about computers since I played my first video game,
                Need For Speed 2, at the age of four. Exploring both hardware and software during
                my childhood fueled my passion for Computer Science. Now, I aim to apply the learned theoretical
                and practical concepts to real-world problems and create innovative, passionate projects.&quot;
            </blockquote>

            {/* Links Section */}
            <h3 className="text-2xl font-semibold text-gray-100 mb-4">Links</h3>
            <hr className="my-4 border-gray-600" />

            <ul className="list-none p-0 flex justify-center gap-6">
                {/* GitHub Link */}
                <li>
                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-3 rounded-lg bg-gray-900 text-gray-100 hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        <FontAwesomeIcon icon={faGithub} className="mr-3" />
                        GitHub
                    </a>
                </li>

                {/* LinkedIn Link */}
                <li>
                    <a
                        href={LINKEDIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-3 rounded-lg bg-blue-700 text-gray-100 hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        <FontAwesomeIcon icon={faLinkedin} className="mr-3" />
                        LinkedIn
                    </a>
                </li>

                {/* Resume Link */}
                <li>
                    <a
                        href="/resume.pdf"
                        download
                        className="inline-flex items-center px-5 py-3 rounded-lg bg-green-600 text-gray-100 hover:bg-green-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        <FontAwesomeIcon icon={faFilePdf} className="mr-3" />
                        Download Resume
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default IDEPage;
