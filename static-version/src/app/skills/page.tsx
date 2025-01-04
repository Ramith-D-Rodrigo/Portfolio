import { Noto_Sans_Sinhala } from 'next/font/google';

const sinhalaFont = Noto_Sans_Sinhala();

// Sample skills data with categories
const skills = [
    {
        category: "Programming Languages",
        items: [
            {
                name: "C++",
                class: "devicon-cplusplus-plain colored",
                description: "Utilizing for graphics and game programming, gaining in-depth knowledge of object-oriented programming and performance optimization techniques."
            },
            {
                name: "Java",
                class: "devicon-java-plain-wordmark colored",
                description: "Applied in various projects and assignments, including an internship where I utilized dynamic classloading feature."
            },
            {
                name: "TypeScript",
                class: "devicon-typescript-plain colored",
                description: "Chose for its strong typing and static analysis capabilities, which enhance code quality and maintainability in large-scale applications."
            },
            {
                name: "PHP", class: "devicon-php-plain colored",
                description: "Developed foundational web development skills through PHP, including server-side scripting and working with databases."
            },
            {
                name: "Scala", class: "devicon-scala-plain colored",
                description: "Leveraged functional programming principles using Scala to develop scalable and maintainable applications."
            },
            {
                name: "C#", class: "devicon-csharp-plain-wordmark colored",
                description: "Used to build my first game, gaining experience in both game development and object-oriented programming."
            },
            {
                name: "C", class: "devicon-c-plain-wordmark colored",
                description: "Mastered the basics of computer programming, focusing on low-level memory management and system-level development."
            },
            {
                name: "Ballerina", class: "devicon-ballerina-original-wordmark colored",
                description: "Gained hands-on experience on how to integrate services during my internship, using Ballerina for seamless connectivity."
            },
            {
                name: "Python", class: "icon-[logos--python]",
                description: "Applied Python for data analysis and machine learning, working with libraries like NumPy, Pandas, and TensorFlow for predictive modeling and algorithm development."
            },
            {
                name: "JavaScript", class: "devicon-javascript-plain colored",
                description: "Developed dynamic, client-side web applications, focusing on DOM manipulation, event handling, and asynchronous programming."
            },
        ],
    },
    {
        category: "Libraries/APIs",
        items: [
            {
                name: "WebGPU", class: "icon-[devicon--webgpu-wordmark]",
                description: "Leveraging WebGPU for cutting-edge graphics rendering in web applications, utilizing modern graphics APIs to achieve high-performance rendering."
            },
            {
                name: "WebGL", class: "icon-[simple-icons--webgl]", color: "#990000",
                description: "Built on foundational knowledge of graphics rendering on the web, working with WebGL to render 3D graphics within browsers."
            },
            {
                name: "OpenGL", class: "devicon-opengl-plain colored",
                description: "Acquired a strong understanding of computer graphics fundamentals and rendering techniques using OpenGL for hardware-accelerated rendering."
            },
            {
                name: "Three.js", class: "devicon-threejs-original-wordmark",
                description: "Using Three.js for creating 3D graphics and interactive visualizations in web-based applications, focusing on performance and ease of use."
            },
            {
                name: "WebXR Device API",
                description: "Developing immersive web applications using WebXR to create extended reality experiences, including virtual and augmented reality applications."
            },
            {
                name: "React.js", class: "devicon-react-original-wordmark colored",
                description: "Built dynamic and responsive user interfaces with React.js, utilizing its component-based architecture to manage state, effects, and routing."
            },
            {
                name: "Google Drive API", class: "icon-[logos--google-drive]",
                description: "Integrated Google Drive API to manage files and documents in web applications, enabling seamless storage and retrieval of user data."
            },
            {
                name: "Gmail API", class: "icon-[skill-icons--gmail-light]",
                description: "Implemented the Gmail API for sending, reading, and managing emails within web applications, allowing for rich communication features."
            },
        ],
    },
    {
        category: "Engines",
        items: [
            { name: "Unity", class: "devicon-unity-plain colored", description: "Developed interactive and immersive 3D applications using Unity, with a focus on video game development, procedural content generation, and XR applications." },
            { name: "Unreal Engine", class: "devicon-unrealengine-original-wordmark", description: "Utilizing Unreal Engine to build high-performance video games, employing C++ for scripting and optimization of real-time rendering." },
        ],
    },
    {
        category: "Frameworks",
        items: [
            { name: "Laravel", class: "devicon-laravel-original colored", description: "Built robust and scalable backend APIs using Laravel, leveraging its powerful routing, authentication, and database management capabilities." },
            { name: "Spring Boot", class: "devicon-spring-original colored", description: "Focusing on leveraging the features of Spring Boot for backend API development and integration with databases and third-party services." },
            { name: "Next.js", class: "devicon-nextjs-plain", description: "Designed and developed server-rendered web applications using Next.js, including this portfolio website, with a focus on performance" },
            { name: "Express.js", class: "devicon-express-original", description: "Built and deployed RESTful APIs using Express.js, ensuring efficient and scalable server-side architectures for web applications." },
        ],
    },
    {
        category: "Databases",
        items: [
            { name: "MySQL", class: "devicon-mysql-plain-wordmark colored", description: "Developed a solid understanding of relational databases with MySQL, focusing on SQL queries, schema design, and performance optimization." },
            { name: "MongoDB", class: "devicon-mongodb-plain-wordmark colored", description: "Worked with MongoDB to design and implement NoSQL databases, applying document-based storage for scalable and flexible data management." },
        ],
    },
    {
        category: "Other Technical Skills",
        items: [
            { name: "WebAssembly and Emscripten", class: "devicon-wasm-original colored", description: "Using WebAssembly and Emscripten to compile and run native code in the browser, improving performance for computation-heavy applications." },
            { name: "Git/GitHub", class: "devicon-git-plain-wordmark colored", description: "Implementing version control practices with Git and GitHub, enabling collaborative development and efficient code management across teams." },
            { name: "Docker", class: "devicon-docker-plain-wordmark colored", description: "Used it during the internship to implement a feature for Ballerina programming language." },
            {
                name: "Ubuntu and Windows", class: ["devicon-ubuntu-plain colored", "devicon-windows11-original colored"],
                description: "Experienced in working with both Ubuntu and Windows operating systems, ensuring compatibility and efficiency in a cross-platform development environment."
            },
            { name: "HTML", class: "devicon-html5-plain-wordmark colored", description: "Acquired foundational knowledge in structuring and styling web pages, using HTML to create semantic and accessible web content." },
        ],
    },
    {
        category: "Languages Spoken",
        items: [
            { name: "English", class: "icon-[ri--english-input]", description: "Professional working proficiency, capable of effective communication in both written and spoken contexts in technical and non-technical settings." },
            { name: "Sinhala", class: "sinhala-letter", description: "Native proficiency in Sinhala, with fluency in both formal and colloquial speech." },
            { name: "Japanese", class: "icon-[uil--letter-japanese-a]", description: "Have been learning Japanese for more than 4 years. Currently JLPT N4 Certified, JLPT N3 Reading." },
            { name: "A Small Easter Egg!", description: "Did you try changing the IDE language settings? :)" }
        ],
    },
];

const SkillsPage = () => {
    return (
        <div className="text-white font-mono">
            {/* Title */}
            <div className="mb-6 text-4xl font-semibold">Skills</div>

            {/* Skill Categories */}
            <div className="space-y-8">
                {skills.map((category, index) => (
                    <div key={index}>
                        <div className="text-2xl font-semibold mb-4">{category.category}</div>

                        {/* Cards for each skill */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {category.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="bg-black rounded-lg p-4 hover:scale-105 transition-transform duration-300"
                                >
                                    <div className="flex items-center justify-center mb-3">
                                        {
                                            Array.isArray(item.class) ? (
                                                item.class.map((clz, index) => (
                                                    <i
                                                        key={index}
                                                        className={`${sinhalaFont.className} ${clz} text-9xl`}
                                                        style={{ color: item?.color }}
                                                    ></i>
                                                ))
                                            ) : (
                                                <i
                                                    className={`${sinhalaFont.className} ${item?.class} text-9xl`}
                                                    style={{ color: item?.color }}
                                                ></i>
                                            )
                                        }


                                        {!item.class &&
                                            <div className="text-lg font-semibold">{item.name}</div>
                                        }
                                    </div>
                                    {/* Description */}
                                    <div className="text-gray-400 text-sm">{item.description}</div>
                                </div>

                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsPage;
