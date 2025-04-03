import { DisplayTextProps } from "../interactionBuilder";
import { projects } from "../../../../static-version/src/app/projects/pageData";

const PROJECT_EXPERIENCE: DisplayTextProps[] = [];

projects.forEach(proj => {
    const exp : DisplayTextProps = {
        title: `${proj.title}
        ${proj.timePeriod}`,
        description: `${proj.description}`,
        list: proj.techStack.map(tech => tech.name)
    }

    PROJECT_EXPERIENCE.push(exp);
    PROJECT_EXPERIENCE.push({title: ""});
});


export default PROJECT_EXPERIENCE;
