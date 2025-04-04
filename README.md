# Portfolio Website

This is a  portfolio website built Next.js, TypeScript and Three.js. It showcases my projects, skills, experience, education and contact information. 

# Motivation

The reason for creating two versions is to provide a unique experience for the user. The informative version is designed to be easy to navigate and provide all the information that a potential employer or client would need. The interactive version is designed to be fun and engaging, while also showcasing my skills in 3D graphics.

# Versions

The website is broken down to two main versions:

- **Informative**: This version is inspired by the UIs of popular IDEs that we use in our daily programming life. It is designed to be informative and provide a lot of information about the projects and skills. The UI is clean and minimalistic, with a focus on the content. The color scheme is inspired by the dark mode of popular IDEs, with a dark background and bright text. Since it is inspired by the UIs of popular IDEs, the full experience can be achieved only in desktop mode.

- **Interactive**: This version is built using Three.js to make it interactive, with a focus on the 3D experience. The scenario in this version is quite unique (from what I believe), and I hope the user experience is as good as I imagined. While it is not as informative as the other version, I have included some information about the projects and skills. This is focused to be a fun experience and to showcase my passion for 3D graphics. There are many features that I have in mind to add in the future, so be sure to check it out.

## Interactive Version Features

- **3D Environment**
- **Character Movement**
- **Character Animation**
- **HUD**
- **GLTF an FBX Models**
- **Collision Detection**
- **Physics**
- **Lighting and Shadows**
- **Textures and Materials**
- **Raycasting**

## Informative Version Features

- **Routing**
- **Route Groups**
- **IFrames**

## Navigation Between Versions

Ultimately, the two versions depict two different perspectives, one being a software and other being a game. So to put them into a similar context, I thought of making the website like a desktop OS. This inspiration came from the fact there are many portfolio websites that are built like an operating system.

# How to Run

## Interactive Version
You can run the interactive version separately by running the following command in the terminal:

```bash
cd 3d-version
npm install
npm run dev
```

## Informative Version
Since the interactive version is bundled within the informative version, you have to build the interactive version first. You can do this by running the following command in the terminal:

```bash
cd 3d-version
npm install
npm run build
```

Then you can run the informative version by running the following command in the terminal:

```bash
cd ../static-version
npm install
npm run dev
```

