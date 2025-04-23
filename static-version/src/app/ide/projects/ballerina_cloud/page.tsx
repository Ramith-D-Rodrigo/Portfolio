import PageTitle from "@/app/components/PageTitle";
import SubHeader from "@/app/components/SubHeader";
import { BALLERINA, DOCKER, GIT, JAVA } from "@/app/constants/icon-css";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const BalCloudPage = () => {
    return (
        <div>
            <PageTitle title="Implementation of Running Ballerina tests in Docker containers" />
            <SubHeader content={"Demo"} />
            <Image src={"/projects/bal_test_cloud_demo.webp"} alt={"bal test --cloud=docker demo"} width={500} height={300} className="mb-8"></Image>

            <SubHeader content={"What I did"} />
            <div className="bg-black rounded-lg p-6 mt-2 mb-8">
                <p className="text-gray-400 leading-relaxed">
                    Implemented this feature as part of my internship project at WSO2 LLC. Ballerina has a inbuilt feature to build a project it&apos;s cloud artifacts directly.
                    So that it can be deployed easily. However, at that time it was impossible to verify the built version that runs on the cloud working as expected. This is because the project&apos;s tests are run on the local machine which the developer is using. Hence, there was a requirment to add a feature to run the tests of a Ballerina project in cloud to verify it is working as expected without any issues such as missing dependencies.
                </p>

                <p className="text-gray-400 leading-relaxed">
                    So, &quot;cloud&quot; flag was needed to be introduced to "bal test" CLI command. It was my responsibility to introduce this flag and implement the feature to support running tests on Docker containers.
                </p>

                <p className="text-gray-400 leading-relaxed">
                    First I had to debug the source code and understand the execution flow of &quot;bal test&quot; command. For this project, two repositories were involved. First was &quot;ballerina-lang&quot; and the second was &quot;module-ballerina-c2c&quot;. After debugging the source code, I started implmenting the feature. To create docker containers, first I created a single FAT/UBER JAR that contains all the test execution dependencies so that can be trivially used to build the containers. Ultimately, we later decided to keep consistent with the current execution flow where only THIN JARs are used. However, the invocation of cloud repository required the FAT JAR. So the execution flow created the FAT JAR but used the THIN JARs to create the Docker containers.
                </p>

                <p className="text-gray-400 leading-relaxed">
                    There were several challenges that I have faced during the implementation. One case is class loading. In Ballerina, there is a feature to mock a function and object such that we can easily rewrite the logic to match with the test. Under the hood, this was handled by modifying the classbytes of Java classes during the runtime. In my case when I implemented the functionality use the FAT JAR, all the classes were loaded into the system classloader at the start so that the classes cannot be modified later. To mitigate this, I had to implement a <a href="https://github.com/ballerina-platform/ballerina-lang/blob/master/misc/testerina/modules/testerina-runtime/src/main/java/org/ballerinalang/test/runtime/CustomSystemClassLoader.java" className="underline" target="_blank" rel="noopener noreferrer">custom classloader</a> which follows a child first loading.
                </p>

                <p className="text-gray-400 leading-relaxed">
                    Another issue I faced was related to native image. Ballerina uses GraalVM to build the native image, which have Ahead-Of-Time compilation. Meaning, it cannot modify the classbytes during the runtime. To support this, when native image option was given, the tests are executed module wise. I did a similar approach for running the tests in Docker containers. I created FAT JARs per modules and used them individually to create separate Docker containers.
                </p>

                <p className="text-gray-400 leading-relaxed">
                    Once I implemented the feature, I created unit tests, and integration tests using TestNG. I worked with Ballerina&apos;s &quot;Full-Build Pipeline&quot; to check if there are any breaking changes when the whole platform is concerned and fixed them appropriately.
                </p>
            </div>

            <SubHeader content={"Technologies"} />
            <div className="bg-black rounded-lg p-6 mt-2 mb-8">
                {[JAVA, BALLERINA, DOCKER, GIT].map((tech, index) => (
                    <i key={index} className={`${tech.class} text-gray-300 text-8xl m-10`} />
                ))}
            </div>

            <SubHeader content={"Links"} />
            <div className="bg-black rounded-lg p-6 mt-2 mb-8">
                <div className="flex flex-wrap gap-4">
                <a
                        href={'https://github.com/ballerina-platform/ballerina-lang/issues/41036'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300 ease-in-out transform hover:scale-105 transition-transform`}
                        
                    >
                        <FontAwesomeIcon icon={faGithub} className="text-xl" />
                        <span>ballerina-lang GitHub Issue</span>
                    </a>

                    <a
                        href={'https://github.com/ballerina-platform/ballerina-lang/pull/42183'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300 ease-in-out transform hover:scale-105 transition-transform`}
                        
                    >
                        <FontAwesomeIcon icon={faGithub} className="text-xl" />
                        <span>My Pull Request to ballerina-lang</span>
                    </a>

                    <a
                        href={'https://github.com/ballerina-platform/module-ballerina-c2c/pull/765'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300 ease-in-out transform hover:scale-105 transition-transform`}
                        
                    >
                        <FontAwesomeIcon icon={faGithub} className="text-xl" />
                        <span>My Pull Request to module-ballerina-c2c</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default BalCloudPage;


