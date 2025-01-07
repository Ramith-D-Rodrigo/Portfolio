import { Noto_Sans_Sinhala } from 'next/font/google';
import PageTitle from '../components/PageTitle';
import { BALLERINA, C, CPP, CSHARP, DOCKER, EXPRESSJS, GIT, GMAIL_API, GOOGLE_DRIVE_API, HTML, JAVA, JS, LARAVEL, MONGODB, MYSQL, NEXTJS, OPENGL, PHP, PYTHON, REACTJS, SCALA, SPRINGBOOT, THREEJS, TS, UBUNTU, UNITY, UNREAL, WASM, WEBGL, WEBGPU } from '../constants/icon-css';
import SkillCard from '../components/SkillCard';

const sinhalaFont = Noto_Sans_Sinhala();

// Sample skills data with categories
const skills = [
    {
        category: "Programming Languages",
        items: [
            {
                tech: CPP,
                description: "Utilizing for graphics and game programming, gaining in-depth knowledge of object-oriented programming and performance optimization techniques."
            },
            {
                tech: JAVA,
                description: "Applied in various projects and assignments, including an internship where I utilized dynamic classloading feature."
            },
            {
                tech: TS,
                description: "Chose for its strong typing and static analysis capabilities, which enhance code quality and maintainability in large-scale applications."
            },
            {
                tech: PHP,
                description: "Developed foundational web development skills through PHP, including server-side scripting and working with databases."
            },
            {
                tech: SCALA,
                description: "Leveraged functional programming principles using Scala to develop scalable and maintainable applications."
            },
            {
                tech: CSHARP,
                description: "Used to build my first game, gaining experience in both game development and object-oriented programming."
            },
            {
                tech: C,
                description: "Mastered the basics of computer programming, focusing on low-level memory management and system-level development."
            },
            {
                tech: BALLERINA,
                description: "Gained hands-on experience on how to integrate services during my internship, using Ballerina for seamless connectivity."
            },
            {
                tech: PYTHON,
                description: "Applied Python for data analysis and machine learning, working with libraries like NumPy, Pandas, and TensorFlow for predictive modeling and algorithm development."
            },
            {
                tech: JS,
                description: "Developed dynamic, client-side web applications, focusing on DOM manipulation, event handling, and asynchronous programming."
            },
        ],
    },
    {
        category: "Libraries/APIs",
        items: [
            {
                tech: WEBGPU,
                description: "Leveraging WebGPU for cutting-edge graphics rendering in web applications, utilizing modern graphics APIs to achieve high-performance rendering."
            },
            {
                tech: WEBGL,
                color: "#990000",
                description: "Built on foundational knowledge of graphics rendering on the web, working with WebGL to render 3D graphics within browsers."
            },
            {
                tech: OPENGL,
                description: "Acquired a strong understanding of computer graphics fundamentals and rendering techniques using OpenGL for hardware-accelerated rendering."
            },
            {
                tech: THREEJS,
                description: "Using Three.js for creating 3D graphics and interactive visualizations in web-based applications, focusing on performance and ease of use."
            },
            {
                tech: {name:"WebXR Device API"},
                description: "Developing immersive web applications using WebXR to create extended reality experiences, including virtual and augmented reality applications."
            },
            {
                tech: REACTJS,
                description: "Built dynamic and responsive user interfaces with React.js, utilizing its component-based architecture to manage state, effects, and routing."
            },
            {
                tech: GOOGLE_DRIVE_API,
                description: "Integrated Google Drive API to manage files and documents in web applications, enabling seamless storage and retrieval of user data."
            },
            {
                tech: GMAIL_API,
                description: "Implemented the Gmail API for sending, reading, and managing emails within web applications, allowing for rich communication features."
            },
        ],
    },
    {
        category: "Engines",
        items: [
            { 
                tech: UNITY,
                description: "Developed interactive and immersive 3D applications using Unity, with a focus on video game development, procedural content generation, and XR applications."
            },
            { 
                tech: UNREAL,
                description: "Utilizing Unreal Engine to build high-performance video games, employing C++ for scripting and optimization of real-time rendering."
            },
        ],
    },
    {
        category: "Frameworks",
        items: [
            { 
                tech: LARAVEL, 
                description: "Built robust and scalable backend APIs using Laravel, leveraging its powerful routing, authentication, and database management capabilities."
            },
            {                 
                tech: SPRINGBOOT,
                description: "Focusing on leveraging the features of Spring Boot for backend API development and integration with databases and third-party services." 
            },
            {                 
                tech: NEXTJS,
                description: "Designed and developed server-rendered web applications using Next.js, including this portfolio website, with a focus on performance" 
            },
            {                 
                tech: EXPRESSJS,
                description: "Built and deployed RESTful APIs using Express.js, ensuring efficient and scalable server-side architectures for web applications." 
            },
        ],
    },
    {
        category: "Databases",
        items: [
            {                 
                tech: MYSQL,
                description: "Developed a solid understanding of relational databases with MySQL, focusing on SQL queries, schema design, and performance optimization." 
            },
            {                 
                tech: MONGODB,
                description: "Worked with MongoDB to design and implement NoSQL databases, applying document-based storage for scalable and flexible data management." 
            },
        ],
    },
    {
        category: "Other Technical Skills",
        items: [
            {                 
                tech: WASM,
                description: "Using WebAssembly and Emscripten to compile and run native code in the browser, improving performance for computation-heavy applications." 
            },
            {                 
                tech: GIT,
                description: "Implementing version control practices with Git and GitHub, enabling collaborative development and efficient code management across teams." 
            },
            {                 
                tech: DOCKER, 
                description: "Used it during the internship to implement a feature for Ballerina programming language." 
            },
            {
                tech: UBUNTU,
                description: "Experienced in working with both Ubuntu and Windows operating systems, ensuring compatibility and efficiency in a cross-platform development environment."
            },
            {                 
                tech: HTML,
                description: "Acquired foundational knowledge in structuring and styling web pages, using HTML to create semantic and accessible web content." 
            },
        ],
    },
    {
        category: "Languages Spoken",
        items: [
            { 
                tech:
                    {
                        name: "English", 
                        class: "icon-[ri--english-input]"
                    }, 
                description: "Professional working proficiency, capable of effective communication in both written and spoken contexts in technical and non-technical settings." 
            },
            { 
                tech: {
                name: "Sinhala", 
                class: "sinhala-letter"
            },
                description: "Native proficiency in Sinhala, with fluency in both formal and colloquial speech." 
            },
            { 
                tech:
                {   name: "Japanese", 
                    class: "icon-[uil--letter-japanese-a]"
                }, 
                description: "Have been learning Japanese for more than 4 years. Currently JLPT N4 Certified, JLPT N3 Reading." 
            },
            { 
                tech:{
                    name: "A Small Easter Egg!", 
                },
                description: "Did you try changing the IDE language settings? :)" 
            }
        ],
    },
];

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
                                <SkillCard item={item} key={idx}/>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsPage;
