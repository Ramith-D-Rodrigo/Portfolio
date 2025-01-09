import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EventGrid, { EventInterface } from "../components/Events";
import PageTitle from "../components/PageTitle";
import { faSchool } from "@fortawesome/free-solid-svg-icons";

const events: EventInterface[] = [
    { title: "Bachelor of Science (Hons) in Computer Science", 
        date: "2021 April - Present", 
        description: "I started my undergraduate academics at University of Colombo School of Computing, Sri Lanka. Currently I'm a fourth/final year undergraduate with a CGPA of 3.89/4.00.",
        iconBgColor: "blue",
        nav: "/education/bachelors",
        navContent: "Learn More",
        icon: <FontAwesomeIcon icon={faSchool} />,
        isDisabled: false
    },
    { title: "High School", 
        date: "2011 January - 2019 August", 
        description: "From grade 6 to grade 13, I attended Thurstan College, Colombo 7 where I studied and faced both G.C.E. Ordinary Level Examination and G.C.E. Advanced Level Examination.",
        iconBgColor: "blue",
        nav: "/",
        navContent: "Learn More",
        icon: <FontAwesomeIcon icon={faSchool} />,
        isDisabled: true
    },
    { title: "Primary School", 
        date: "2006 January - 2010 November", 
        description: "From grade 1 to grade 5, I attended Sobhitha Vidyalaya, Makola where I obtained my primary education. I faced the Scholarship Examination in August 2010.",
        iconBgColor: "blue",
        nav: "/",
        navContent: "Learn More",
        icon: <FontAwesomeIcon icon={faSchool} />,
        isDisabled: true
    }
];

const EducationPage = () => {
    return (
        <div>
            <PageTitle title="Education"/>

            <EventGrid events={events} />
        </div>
    );
}

export default EducationPage;