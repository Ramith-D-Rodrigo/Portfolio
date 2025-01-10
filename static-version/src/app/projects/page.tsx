import PageTitle from '../components/PageTitle';
import ProjectCard from '../components/ProjectCard';
import { projects } from './pageData';

const ProjectsPage = () => {
  return (
    <div>
      <PageTitle title='Projects' />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
