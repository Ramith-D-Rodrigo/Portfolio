import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EventGrid, { EventInterface } from "../../components/Events";
import PageTitle from "../../components/PageTitle";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { educationData } from "./educationData";

const events: EventInterface[] = educationData.map((data) => {
    return {
        ...data,
        icon: <FontAwesomeIcon icon={faSchool} />
    }
});

const EducationPage = () => {
    return (
        <div>
            <PageTitle title="Education"/>

            <EventGrid events={events} />
        </div>
    );
}

export default EducationPage;