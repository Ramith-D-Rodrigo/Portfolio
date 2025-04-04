import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faGamepad, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub  } from "@fortawesome/free-brands-svg-icons";
import {LINKEDIN_URL, GITHUB_URL} from '../../globalConstants';

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen w-full">

      <div className="flex flex-grow items-center justify-center text-center text-white">
        <div className="p-8 rounded-lg max-w-4xl w-full">

          <h1 className="text-8xl font-bold mb-6">Welcome to My Portfolio</h1>


          <div className="flex justify-center space-x-6 m-10">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} size="2x" className="text-white" />
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} size="2x" className="text-white" />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFilePdf} size="2x" className="text-white" />
            </a>
          </div>

          <p className="text-xl mt-20 mb-8">Explore my work through two versions:</p>
          <div className="flex justify-center space-x-8">
            <div className="text-4xl">
              <FontAwesomeIcon icon={faCode} />
              <p className="mt-2">Informative</p>
            </div>
            <div className="text-4xl">
              <FontAwesomeIcon icon={faGamepad} />
              <p className="mt-2">Interactive</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
