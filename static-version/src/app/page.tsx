import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  return (
    <div className="prose max-w-none">
      <div>
        <h1 className="text-8xl font-extrabold text-white mb-2">Ramith Rodrigo</h1>
        <h2 className="text-4xl text-gray-200 font-light mb-4 mt-0">
          Aspiring Software Engineer
        </h2>
      </div>

      <hr className="my-4 border-gray-300" />

      <p>
        Enthusiastic software engineer with a passion for building scalable and
        efficient applications. Skilled in modern web technologies and eager to
        contribute to impactful projects.
      </p>

      <h3 className='text-white'>Links</h3>
      <hr className="my-4 border-gray-300" />

      <ul className="list-none p-0 flex gap-4">
        <li>
          <a
            href="https://github.com/Ramith-D-Rodrigo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-700 transition-colors duration-300 ease-in-out transform hover:scale-105 transition-transform"
          >
            <FontAwesomeIcon icon={faGithub} className="mr-2" />
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/ramith-d-rodrigo/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-300 ease-in-out transform hover:scale-105 transition-transform"
          >
            <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 transition-colors duration-300 ease-in-out transform hover:scale-105 transition-transform"
          >
            <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
            Download Resume
          </a>
        </li>

      </ul>
    </div>
  );
};

export default HomePage;
