interface ProjectCardProps {
    title: string;
    description: string;
}

export default function ProjectCard({ title, description }: ProjectCardProps) {
    return (
        <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{description}</p>
        </div>
    );
}
