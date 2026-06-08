import { DisplayTextProps } from "../interactionBuilder";

const EXPERIENCE: DisplayTextProps[] = [
  {
    title: `Immersive Xperience Engineer - Zenith Xperience (Pvt) Ltd.
        2025 May - 2026 May`,
    description: `Worked on 2 major projects while leading the team and mentoring interns. Developed an app for XREAL AR glasses to display food training processes for training chefs.
        Implemented business logic and reactive components of a full-stack reservation based healthcare management system. Introduced Redis caching strategies to improve 3rd party integration API call performance by 300%.
        Added stripe payment gateway, webhook listeners, and scheduled tasks that are compatible with horizontal scaling. Refactored the structure and improved state management in the in-house web-based XR engine.`,
    list: [
      "TypeScript",
      "Docker",
      "Nest.js",
      "PostgreSQL",
      "Git",
      "C#",
      "Unity",
      "React.js",
      "Portainer",
    ],
  },

  {
    title: `Software Engineering Intern - WSO2 LLC
        2023 Nov - 2024 May, Ballerina Team.`,
    description: `Implemented a new feature to run tests of a Ballerina project in Docker containers. Created Uber (Fat) JARs to bundle the test execution dependencies.
        Leveraged the power of dynamic class loading to support function mocking inside the containers. Added support for GraalVM execution and wrote relevant unit and integration tests using TestNG.
        Completed the project 2 months ahead of schedule. Then experimented and found possible solutions related to an issue in Ballerina resource loading in tests.`,
    list: ["Java", "Docker", "Ballerina", "Git"],
  },
  {
    title: "",
  },
];

export default EXPERIENCE;
