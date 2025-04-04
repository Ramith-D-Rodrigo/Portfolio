import { DisplayTextProps } from "../interactionBuilder";
import {educationData} from "../../../../static-version/src/app/ide/education/educationData";

const EDUCATION :DisplayTextProps[] = [];

educationData.forEach(edu => {
    const newEdu: DisplayTextProps = {
        title: `${edu.title}
        ${edu.date}`,
        description: edu.description,
    };

    EDUCATION.push(newEdu);
    EDUCATION.push({title: ""});
    EDUCATION.push({title: ""});
});

export default EDUCATION;
