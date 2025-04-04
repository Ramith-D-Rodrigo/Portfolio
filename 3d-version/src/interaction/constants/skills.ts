import { DisplayTextProps } from "../interactionBuilder";
import { skills } from "../../../../static-version/src/app/ide/skills/skillsData/";

const SKILLS: DisplayTextProps[] = [];

skills.forEach(skill => {
    const newSkill : DisplayTextProps = {
        title: `${skill.category}`,
        list: skill.items.map(item => item.tech.name)
    };

    SKILLS.push(newSkill);
});


export default SKILLS;
