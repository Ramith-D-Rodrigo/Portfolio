import { TechnologyWithCSSClass } from "../constants/icon-css";

export interface SkillCardProps {
    tech: TechnologyWithCSSClass;
    description: string
    color?: string;
}

const SkillCard = ( {tech, description, color} : SkillCardProps) => {
    return (
        <div
            className="bg-black rounded-lg p-4 hover:scale-105 transition-transform duration-300"
        >
            <div className="flex items-center justify-center mb-3">
                {
                    Array.isArray(tech.class) ? (
                        tech.class.map((clz: string, index: number) => (
                            <i
                                key={index}
                                className={`${clz} text-9xl`}
                                style={{ color: color }}
                            ></i>
                        ))
                    ) : (
                        <i
                            className={`${tech.class} text-9xl`}
                            style={{ color: color }}
                        ></i>
                    )
                }


                {!tech.class &&
                    <div className="text-lg font-semibold">{tech.name}</div>
                }
            </div>
            {/* Description */}
            <div className="text-gray-300 text-m">{description}</div>
        </div>
    );
};

export default SkillCard;
