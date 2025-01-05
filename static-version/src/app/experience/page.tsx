import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EventGrid, { EventInterface } from "../components/Events";
import PageTitle from "../components/PageTitle";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const events: EventInterface[] = [
    {
        date: "In the future",
        description: "Looking for new opportunities to bring my skills to your team.",
        title: "Excited to Join Your Team!",
        iconBgColor: "red",
        nav: "/",
        navContent: "Contact",
        icon: <FontAwesomeIcon icon={faPlus} />,
    },
    { title: "Software Engineering Intern", 
        date: "2023 November - 2024 May", 
        description: "Gained the first industrial experience by working for the Ballerina Team of WSO2 LLC. Implemented a new feature for the Ballerina programming Language.",
        iconBgColor: "blue",
        nav: "/",
        navContent: "Learn More"
    }
];

const ExperiencePage = () => {
    return (
        <div>
            <PageTitle title="Experience"/>

            <EventGrid events={events} />
        </div>
    );
}

export default ExperiencePage;