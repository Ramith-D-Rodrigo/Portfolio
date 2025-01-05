import PageTitle from '../components/PageTitle';
import ProjectCard from '../components/ProjectCard';
import { BALLERINA, CPP, CSHARP, DOCKER, GIT, GMAIL_API, GOOGLE_DRIVE_API, HTML, JAVA, JS, LARAVEL, MYSQL, NEXTJS, PHP, REACTJS, THREEJS, TS, UNITY, UNREAL, WASM, WEBGL, WEBGPU } from '../constants/icon-css';

const projects = [
  {
    title: 'Enhancing the performance of web-based Augmented Reality applications',
    description: "The final year research project of my Bachelor's degree. Currently I am conducting this research to improve the runtime"
    + "performance of the web-based augmented reality applications with the use of new web technologies and evaluate it's performance with"
    + "suitable quantitative and qualitative metrics.",
    techStack: [CPP, WEBGL, WEBGPU, WASM, GIT, TS],
    timePeriod: "2024 June - Present"
  },
  {
    title: 'Portfolio',
    description: "To showcase my skills, education, experience and projects, I have developed a simple website"
    + " in which it's design and the user interface (UI) is inspired by the popular IDEs. "
    + "The reason for choosing this UI is to introduce the viewers into my professional yet passionate field.",
    techStack: [NEXTJS, TS, GIT],
    timePeriod: "2024 December - Present"
  },
  {
    title: 'Procedural Open World',
    description: "I developed a procedural open world as part of my Bachelor's degree, applying concepts learned in my Computer Graphics II course."
    + " I utilized Perlin noise to generate terrains and world objects procedurally. Additionally, I implemented a playable character, NPCs, and interactions between them."
    + " To enhance the experience, I integrated VR functionality, enabling seamless mapping between the VR world and the procedural world.",
    techStack: [UNITY, CSHARP, GIT],
    timePeriod: "2024 June - 2024 September"
  },
  {
    title: 'BattlePen - Video Game',
    description: "To learn Unreal Engine and C++ in game development, I am building a 3D simple video game."
    + " It is based on a small yet fun game that Sri Lankan primary school students play in their classrooms with the help of pens.",
    techStack: [UNREAL, CPP, GIT],
    timePeriod: "2024 April - Present"
  },
  {
    title: 'Implement CLI command \'bal test --cloud=docker\' to run Ballerina tests in Docker containers',
    description: "During my internship with WSO2 LLC's Ballerina Team, I was tasked with implementing a feature to run all tests of a Ballerina project in Docker containers. "
    + "I successfully completed the feature ahead of schedule, thanks to the collaboration and support of my exceptional team members.",
    techStack: [JAVA, DOCKER, GIT, BALLERINA],
    timePeriod: "2023 December - 2024 May"
  },
  {
    title: '?D - Video Game',
    description: "As a part of the Game Development course of my Bachelor's degree, I developed a 3D video game using Unity Engine. It is a game based on 3 axes of the 3D world."
    + " It is developed to challenge the player's thinking with the use of minimal number of hints.",
    techStack: [UNITY, CSHARP, GIT],
    timePeriod: "2023 June - 2023 December"
  },
  {
    title: 'Solar System',
    description: "I developed a 3D scene of the solar system using Three.js for the Game Development course of my Bachelor's degree."
    + " The project enabled me to understand the concepts of 3D scene rendering and transformations.",
    techStack: [THREEJS, GIT],
    timePeriod: "2023 August - 2023 August"
  },
  {
    title: 'Postgraduate Program Review System',
    description: "During the first semester of my third academic year, I led a group to build a web-based application to streamline the review process of "
    + "postgraduate degree programs in Sri Lankan universities. This application was developed as a proof-of-concept prototype to evaluate the feasibility of streamlining a such task.",
    techStack: [LARAVEL, MYSQL, REACTJS, JS, GIT, GMAIL_API, GOOGLE_DRIVE_API],
    timePeriod: "2023 June - 2023 October"
  },
  {
    title: 'Context Free Grammar (CFG) Simplication',
    description: "I developed a simple web application to understand the algorithms and steps behind the CFG simplication. "
    + " I used TypeScript due to it's strong typing features, which required me to implement the necessary algorithms efficiently.",
    techStack: [HTML, TS, GIT],
    timePeriod: "2023 October - 2023 October"
  },
  {
    title: 'Sportude - Sports Complex Reservation System',
    description: "I led a group of 4 members to develop a web-based application for my second year group project. "
    + " This application enabled the sports complexes to showcase their sports courts and their schedules so that they can be reserved by customers via online. "
    + "In this project, the use of frameworks and libraries were restricted and everyone equally contributed to both frontend and backend.",
    techStack: [HTML, PHP, MYSQL, JS, GIT, GMAIL_API],
    timePeriod: "2022 June - 2023 April"
  },
  {
    title: 'Java Web Server',
    description: "I developed a simple web server in Java to understand how client-server request-response communication works.",
    techStack: [HTML, JAVA, GIT],
    timePeriod: "2022 September - 2022 September"
  },
];

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
