import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faArrowTrendUp, faBuildingColumns, faCalendarDays, faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "@/app/components/PageTitle";
import { degreeInfo } from "./pageData";
import BachelorAchievements from "../../components/BachelorAchievements";

const BachelorsDegreePage = () => {
    return (
        <div>
            <PageTitle title={degreeInfo.general.degree} />

            {/* General Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black rounded-lg p-6 mb-8">
                <div className="flex items-start gap-4">
                    <div className="text-blue-500 text-3xl">
                        <FontAwesomeIcon icon={faBuildingColumns} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-300">University</h3>
                        <p className="text-gray-400">{degreeInfo.general.university}</p>
                        <a
                            href={degreeInfo.general.link}
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
                        <h3 className="font-semibold text-lg text-gray-300">Graduation Year</h3>
                        <p className="text-gray-400">{degreeInfo.general.graduationYear}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="text-yellow-500 text-3xl">
                        <FontAwesomeIcon icon={faArrowTrendUp} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-300">Current GPA</h3>
                        <p className="text-gray-400">{degreeInfo.general.gpa}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="text-purple-500 text-3xl">
                        <FontAwesomeIcon icon={faHourglassEnd} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-300">Period</h3>
                        <p className="text-gray-400">{degreeInfo.general.period}</p>
                    </div>
                </div>

                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-start gap-4">
                        <div className="text-red-500 text-3xl">
                            <FontAwesomeIcon icon={faClipboardList} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-gray-300">Summary</h3>
                            <p className="text-gray-400 leading-relaxed">{degreeInfo.general.summary}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Courses Section */}
            <h2 className="text-2xl font-semibold mb-4">Related Courses</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {degreeInfo.coreCourses.map((course, index) => (
                    <div
                        key={index}
                        className="bg-black rounded-lg p-4 hover:scale-105 transition-transform duration-300"
                    >
                        {course}
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
            <BachelorAchievements achievements={degreeInfo.achievements}/>
        </div>
    );
};

export default BachelorsDegreePage;
