import EventButton from "@/app/components/EventButton";
import PageTitle from "@/app/components/PageTitle";
import { switchPage } from "@/app/utils/utilFunctions";
import { faBriefcase, faBuilding, faBuildingColumns, faCalendarDays, faClipboardList, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const InternshipPage = () => {
    return (
        <div>
            <PageTitle title="Internship" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black rounded-lg p-6 mb-8">
                <div className="flex items-start gap-4">
                    <div className="text-blue-500 text-3xl">
                        <FontAwesomeIcon icon={faBuilding} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-300">Company</h3>
                        <p className="text-gray-400">WSO2 LLC</p>
                        <a
                            href={"https://wso2.com"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline hover:text-blue-300"
                        >
                            (Visit Website)
                        </a>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="text-green-500 text-3xl">
                        <FontAwesomeIcon icon={faCalendarDays} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-300">Time Period</h3>
                        <p className="text-gray-400">2023 November - 2024 May</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="text-yellow-500 text-3xl">
                        <FontAwesomeIcon icon={faPeopleGroup} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-300">Team</h3>
                        <p className="text-gray-400">Research and Development - Ballerina</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="text-purple-500 text-3xl">
                        <FontAwesomeIcon icon={faBriefcase} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-300">Job Role</h3>
                        <p className="text-gray-400">Software Engineering Intern</p>
                    </div>
                </div>

                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-start gap-4">
                        <div className="text-red-500 text-3xl">
                            <FontAwesomeIcon icon={faClipboardList} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-gray-300">Summary</h3>
                            <p className="text-gray-400 leading-relaxed">I started my internship at WSO2 on November 15th where my first task was to develop a simple web application as a group of fellow interns using the technologies provided by WSO2. While we used React.js for the frontend, the backend services were powered by Ballerina. The identity management was handled by Asgardeo, whereas the application and the relevant services were deployed using Choreo. This 2-week project helped me learn various aspects of the Software Development and the specific problems solved by these unique products.
                            </p>

                            <p className="text-gray-400 leading-relaxed">
                                Once I completed this group work, I was assigned to Ballerina team to conduct my internship project. I specifically chose WSO2 for my internship because they have their own programming language which is open-source. As someone who is into programming language concepts and open-source development, I was motivated to join WSO2. And luckily, I was able to join Ballerina team aswell. For my internship project, I had to implement a new feature to Ballerina programming language. The feature is about running tests of a Ballerina project in Docker containers. I was able to complete my project 2 months ahead of schedule.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                During the remaining time, I mostly worked with the CI/CD pipeline that build and run all Ballerina repositories. This is because, I made changed to Ballerina&apos;s main repository that affects other libraries, packages, etc. I examined build failures and worked with my team members to fix them so that before the internship ended, the pipeline build was successful without any errors. Also parallely, I was tasked with finding suitable solutions for an error that was in team backlog for quite some time. It was about loading Ballerina project&apos;s resources in tests. My internship ended when I was presenting some plausible solutions to that error. Finally, I implemented a simple service to keep track of GitHub repositories that use Ballerina programming language using GitHub&apos;s GraphQL API.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div
                    className="bg-black rounded-lg p-4 transition-transform duration-300 flex items-center h-full"
                >

                    {/* Text Section */}
                    <img
                        src="/certifications/ballerina_developer.jpg"
                        alt="bal_developer"
                        className="max-w-60 max-h-full rounded-lg object-contain"
                    />
                    <div className="ml-4">
                        <h2 className="text-xl font-semibold mb-3">Certified Ballerina Developer</h2>
                    </div>
                </div>

                <div
                    className="bg-black rounded-lg p-4 transition-transform duration-300 flex items-center h-full"
                >

                    {/* Text Section */}
                    <div className="flex flex-col">
                        <EventButton isDisabled={false} navContent={"Internship Project"} navLink={"/"}/>
                        <a
                            href="https://github.com/pasindufernando1/WSO2-Grama-Check-Your-Local-Digital-Certificate-"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-4 inline-block px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold rounded-md transition duration-300`}
                        >
                            Web App
                        </a>

                        <a
                            href="https://github.com/Ramith-D-Rodrigo/github-repos-by-language/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-4 inline-block px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold rounded-md transition duration-300`}
                        >
                            Ballerina Repos
                        </a>
                    </div>
                    <div className="ml-4">
                        <h2 className="text-xl font-semibold mb-3">Useful Links</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InternshipPage;
