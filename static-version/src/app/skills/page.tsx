import PageTitle from '../components/PageTitle';
import SkillCard from '../components/SkillCard';
import {skills} from './skillsData';


const SkillsPage = () => {
    return (
        <div>
            {/* Title */}
            <PageTitle title="Skills"/>

            {/* Skill Categories */}
            <div className="space-y-8">
                {skills.map((category, index) => (
                    <div key={index}>
                        <div className="text-2xl font-semibold mb-4">{category.category}</div>

                        {/* Cards for each skill */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {category.items.map((item, idx) => (
                                <SkillCard description={item.description} tech={item.tech} color={item.color} key={idx}/>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsPage;
