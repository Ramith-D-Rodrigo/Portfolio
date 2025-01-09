
interface SkillCardProps {
    item: {
        tech: {
            class: string;
            name: string;
        };
        color: string;
        description: string
    }
}

const SkillCard = ({ item }: SkillCardProps) => {
    return (
        <div
            className="bg-black rounded-lg p-4 hover:scale-105 transition-transform duration-300"
        >
            <div className="flex items-center justify-center mb-3">
                {
                    Array.isArray(item.tech.class) ? (
                        item.tech.class.map((clz: string, index: number) => (
                            <i
                                key={index}
                                className={`${clz} text-9xl`}
                                style={{ color: item.color }}
                            ></i>
                        ))
                    ) : (
                        <i
                            className={`${item.tech.class} text-9xl`}
                            style={{ color: item.color }}
                        ></i>
                    )
                }


                {!item.tech.class &&
                    <div className="text-lg font-semibold">{item.tech.name}</div>
                }
            </div>
            {/* Description */}
            <div className="text-gray-300 text-m">{item.description}</div>
        </div>
    );
};

export default SkillCard;
