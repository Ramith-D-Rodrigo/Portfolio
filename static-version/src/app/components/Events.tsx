import { faBuilding, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import EventButton from "./EventButton";

export interface EventInterface {
    title: string;
    date: string;
    description: string;
    iconBgColor: string;
    nav: string;
    navContent: string;
    icon?: React.ReactNode;
}

const EventGrid = ({ events }: { events: EventInterface[] }) => {
    const colorVariants : any = {
        green: 'bg-green-500',
        red: 'bg-red-500',
        blue: 'bg-blue-500',
    }
    
    return (
        <div className="relative flex flex-col items-center gap-6">
            {events.map((event, idx) => (
                <div key={idx} className="relative flex items-start gap-5">
                    {idx < events.length - 1 && (
                        <div className="absolute top-0 left-6 h-full w-px bg-gray-300 z-0"></div>
                    )}

                    <div className={`relative z-10 flex-shrink-0 w-12 h-12 flex items-center justify-center ${colorVariants[event.iconBgColor]} text-white rounded-full`}>
                        {event.icon || (
                            <span className="text-xl font-bold">
                                <FontAwesomeIcon icon={faBuilding} />
                            </span>
                        )}
                    </div>

                    <div className="bg-black rounded-lg p-4 hover:scale-105 transition-transform duration-300 w-96">
                        <h2 className="text-2xl font-semibold text-white">{event.title}</h2>
                        <p className="text-sm text-gray-400 mt-1">{event.date}</p>
                        <p className="mt-4 text-gray-300">{event.description}</p>

                        {/* Button (Link or Custom Button) */}
                        <EventButton
                            navContent={event.navContent}
                            navLink={event.nav}
                            isDisabled={true}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EventGrid;
