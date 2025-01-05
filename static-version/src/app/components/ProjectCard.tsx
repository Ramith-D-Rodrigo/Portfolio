import { TechnologyWithCSSClass } from "../constants/icon-css";
import EventButton from "./EventButton";

interface ProjectCardProps {
    title: string;
    description: string;
    techStack: TechnologyWithCSSClass[];
    timePeriod: string;
}

export default function ProjectCard({ title, description, techStack, timePeriod }: ProjectCardProps) {
    return (
        <div className="bg-black rounded-lg p-4 hover:scale-105 transition-transform duration-300 flex flex-col h-full">
            {/* Main content area with title, description, and tech icons */}
            <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">{title}</h2>
                {timePeriod && <p className="text-sm text-gray-300 mb-3">{timePeriod}</p>}

                <p className="text-gray-300 text-m mb-3">{description}</p>

                {/* Flex container for the icons */}
                <div className="flex items-center space-x-3">
                    {techStack.map((tech, index) => (
                        <div key={index} className="flex items-center">
                            <i className={`${tech.class} text-gray-300 text-5xl`} /> {/* Icon using Tailwind class */}
                        </div>
                    ))}
                </div>
            </div>

            {/* EventButton at the bottom */}
            <div className="mt-auto">
                <EventButton navContent="Learn More" navLink="/" />
            </div>
        </div>
    );
}
