import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createMirror } from './objects/mirror';
import { customizeTexture } from './utils/utils';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20); // Move the camera up and back

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xffffff, 1); // White color, fully opaque

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth movement
controls.dampingFactor = 0.05; // Damping factor
controls.target.set(0, 0, 0);  // Focus point

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x808080, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);


// Create a texture loader
const textureLoader = new THREE.TextureLoader();

// Load the textures
const STRING_PREFIX = 'vinyl-siding_';

const albedoTexture = textureLoader.load('./textures/wall/' + STRING_PREFIX + 'albedo.png');
const aoTexture = textureLoader.load('./textures/wall/' + STRING_PREFIX + 'ao.png');
const heightTexture = textureLoader.load('./textures/wall/' + STRING_PREFIX + 'height.png');
const metallicTexture = textureLoader.load('./textures/wall/' + STRING_PREFIX + 'metallic.png');
const normalTexture = textureLoader.load('./textures/wall/' + STRING_PREFIX + 'normal-ogl.png');
normalTexture.flipY = false;  // Inverts the Y-axis, making it compatible with OpenGL
const roughnessTexture = textureLoader.load('./textures/wall/' + STRING_PREFIX + 'roughness.png');

// Create the material
const wallMaterial = new THREE.MeshStandardMaterial({
    map: albedoTexture,              // Albedo (Base Color)
    aoMap: aoTexture,                // Ambient Occlusion
    metalnessMap: metallicTexture,   // Metallic
    normalMap: normalTexture,        // Normal Map
    roughnessMap: roughnessTexture,  // Roughness
    side: THREE.DoubleSide,          // If the wall has two sides
    metalness: 1.0,                  // Optional: Adjust overall metallic level
    roughness: 0.5,                  // Optional: Adjust overall roughness level
});


// 3 Walls (left, right, back)
const wallGeometry = new THREE.PlaneGeometry(20, 10);
const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
leftWall.position.x = -10;
leftWall.position.y = 5;
leftWall.rotation.y = Math.PI / 2;
scene.add(leftWall);

const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
rightWall.position.x = 10;
rightWall.position.y = 5;
rightWall.rotation.y = Math.PI / 2;
scene.add(rightWall);

const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
backWall.position.z = -10;
backWall.position.y = 5;
scene.add(backWall);

// Create a ceiling

// load ceiling texture
const CEILING_STRING_PREFIX = 'OfficeCeiling002_1K-JPG_';
const ceilingAoTexture = textureLoader.load('./textures/ceiling/' + CEILING_STRING_PREFIX + 'AmbientOcclusion.jpg');
const ceilingAlbedoTexture = textureLoader.load('./textures/ceiling/' + CEILING_STRING_PREFIX + 'Color.jpg');
const ceilingEmissiveTexture = textureLoader.load('./textures/ceiling/' + CEILING_STRING_PREFIX + 'Emission.jpg');
const ceilingMetallicTexture = textureLoader.load('./textures/ceiling/' + CEILING_STRING_PREFIX + 'Metalness.jpg');
const ceilingNormalTexture = textureLoader.load('./textures/ceiling/' + CEILING_STRING_PREFIX + 'NormalGL.jpg');
ceilingNormalTexture.flipY = false;  // Inverts the Y-axis, making it compatible with OpenGL
const ceilingRoughnessTexture = textureLoader.load('./textures/ceiling/' + CEILING_STRING_PREFIX + 'Roughness.jpg');

// Customize the ceiling textures
customizeTexture(ceilingAoTexture);
customizeTexture(ceilingAlbedoTexture);
customizeTexture(ceilingEmissiveTexture);
customizeTexture(ceilingMetallicTexture);
customizeTexture(ceilingNormalTexture);
customizeTexture(ceilingRoughnessTexture);

const ceilingGeometry = new THREE.PlaneGeometry(20, 20);
const ceilingMaterial = new THREE.MeshStandardMaterial({
    map: ceilingAlbedoTexture,
    aoMap: ceilingAoTexture,
    emissiveMap: ceilingEmissiveTexture,
    emissiveIntensity: 1.0,
    emissive: 0xffffff,
    metalnessMap: ceilingMetallicTexture,
    normalMap: ceilingNormalTexture,
    roughnessMap: ceilingRoughnessTexture,
    side: THREE.DoubleSide,
    metalness: 1.0,
    roughness: 0.5,
});

const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
// Set the ceiling's position and rotation
ceiling.position.y = 10;  // Keep the ceiling's position at y = 10
ceiling.rotation.x = -Math.PI / 2;  // Rotate the ceiling 90 degrees
scene.add(ceiling);

// // Create the light
// const rectLight = new THREE.RectAreaLight(0xffffff, 50, 2, 2); // Color, Intensity, Width, Height
// rectLight.position.set(2.2, 8, 2.2); // Position on the ceiling
// rectLight.rotateX(-Math.PI / 2); // Rotate the light to point down
// scene.add(rectLight);


// Create mirror objects
const reflector = createMirror(4, 6, new THREE.Vector3(9.999, 3, -7), new THREE.Euler(0, -Math.PI / 2, 0), 0xffffff);
const reflector2 = createMirror(4, 6, new THREE.Vector3(9.999, 3, -2), new THREE.Euler(0, -Math.PI / 2, 0), 0xffffff);
const longMirror = createMirror(6, 6, new THREE.Vector3(9.999, 3, 5), new THREE.Euler(0, -Math.PI / 2, 0), 0xffffff);
scene.add(reflector);
scene.add(reflector2);
scene.add(longMirror);


const loader = new GLTFLoader();

// Load the GLTF models

// Load dumbbell rack
loader.load(
    './models/gym_assets/dumbbell_rack/scene.gltf', // Path to your model
    (gltf) => {
        const model = gltf.scene;
        console.log(model);
        model.position.set(-9, 0, -7); // Optional: Position the model
        scene.add(model);

        // Add a second dumbbell rack
        const model2 = model.clone();
        //mirror the second rack
        model2.scale.set(1, 1, -1);
        model2.position.set(-9, 0, -1.4);
        scene.add(model2);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); // Loading progress
    },
    (error) => {
        console.error('An error occurred loading the GLTF model:', error);
    }
);

// load flat bench
loader.load(
    './models/gym_assets/flat_seat/scene.gltf', // Path to your model
    (gltf) => {
        const model = gltf.scene;
        console.log(model);
        model.rotation.y = Math.PI / 2;
        model.position.set(0, 0, -5); // Optional: Position the model
        scene.add(model);
        
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); // Loading progress
    },
    (error) => {
        console.error('An error occurred loading the GLTF model:', error);
    }
);

// load incline bench
loader.load(
    './models/gym_assets/incline_seat/scene.gltf', // Path to your model
    (gltf) => {
        const model = gltf.scene;
        console.log(model);
        model.scale.set(1, 1, 1); // Optional: Scale your model
        model.position.set(6.5, 0, -2);
        scene.add(model);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); // Loading progress
    },
    (error) => {
        console.error('An error occurred loading the GLTF model:', error);
    }
);

// load mattress 
loader.load(
    './models/gym_assets/mattress/scene.gltf', // Path to your model
    (gltf) => {
        const model = gltf.scene;
        console.log(model);
        model.position.set(-4, 0, -7); // Optional: Position the model
        model.rotation.y = Math.PI / 2;
        scene.add(model);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); // Loading progress
    },
    (error) => {
        console.error('An error occurred loading the GLTF model:', error);
    }
);

// load barbell
loader.load(
    './models/gym_assets/barbell/scene.gltf', // Path to your model
    (gltf) => {
        const model = gltf.scene;
        console.log(model);
        model.position.set(7, 0, 5); // Optional: Position the model
        scene.add(model);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); // Loading progress
    },
    (error) => {
        console.error('An error occurred loading the GLTF model:', error);
    }
);

// load barbell weights
loader.load(
    './models/gym_assets/barbell_weights/scene.gltf', // Path to your model
    (gltf) => {
        const model = gltf.scene;
        console.log(model);
        model.position.set(9, 0, 8); // Optional: Position the model
        scene.add(model);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); // Loading progress
    },
    (error) => {
        console.error('An error occurred loading the GLTF model:', error);
    }
);


let benchPressMachine;

loader.load(
    './models/gym_equipment/scene.gltf', // Path to your model
    (gltf) => {
        const model = gltf.scene;
        console.log(model);
        //find the Bench_press_0 object
        model.traverse((child) => {
            if (child instanceof THREE.Object3D && child.name === 'Bench_press_0') {
                benchPressMachine = child;
                benchPressMachine.position.set(6.5, 0, -7);
                scene.add(benchPressMachine);
            }
        });
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); // Loading progress
    },
    (error) => {
        console.error('An error occurred loading the GLTF model:', error);
    }
);

//import squat rack
loader.load(
    './models/squat_rack/result.gltf', // Path to your model
    (gltf) => {
        const model = gltf.scene;
        console.log(model);
        model.scale.set(0.05, 0.05, 0.05); // Optional: Scale your model
        model.position.set(-9, 0, 5);
        scene.add(model);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); // Loading progress
    },
    (error) => {
        console.error('An error occurred loading the GLTF model:', error);
    }
);

const animate = () => {
    requestAnimationFrame(animate);

    controls.update(); // Required for damping to work
    renderer.render(scene, camera);
};

animate();
