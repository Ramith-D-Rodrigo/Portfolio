import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TechnologyWithCSSClass } from "../constants/icon-css";
import EventButton from "./EventButton";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

interface ProjectCardProps {
    title: string;
    description: string;
    techStack: TechnologyWithCSSClass[];
    timePeriod: string;
    isExternalLink: boolean;
    link: string;
    linkContent: string;
    linkDisabled: boolean;
}

export default function ProjectCard({ title, description, techStack, timePeriod, isExternalLink, link, linkContent, linkDisabled }: ProjectCardProps) {
    return (
        <div className="bg-black rounded-lg p-4 hover:scale-105 transition-transform duration-300 flex flex-col h-full">
            {/* Main content area with title, description, and tech icons */}
            <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">{title}</h2>
                {timePeriod && <p className="text-sm text-gray-300 mb-3">{timePeriod}</p>}

                <p className="text-gray-300 text-m mb-3">{description}</p>

                {/* Flex container for the icons */}
                <div className="flex items-center flex-wrap space-x-3 pt-2 pb-2">
                    {techStack.map((tech, index) => (
                        <i key={index} className={`${tech.class} text-gray-300 text-5xl m-2`} />
                    ))}
                </div>
            </div>

            {/* EventButton at the bottom */}
            <div className="mt-auto">
                {!isExternalLink && (
                    <EventButton navContent={linkContent} navLink={link} isDisabled={linkDisabled} />
                )}

                {isExternalLink && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center px-3 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300 ease-in-out transform hover:scale-105 transition-transform ${linkDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        style={{ pointerEvents: linkDisabled ? "none" : "auto" }}
                    >
                        <FontAwesomeIcon icon={faGithub} className="mr-2" />
                        {linkContent}
                    </a>
                )}
            </div>
        </div>    
    );
}
