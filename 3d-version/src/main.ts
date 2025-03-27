import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { setupKeyControls } from './character/controls';
import { setupRoom } from './room/room';
import { loadCharacter } from './character/utils';
import HUD from './other/hud';

const main = async () => {
    const scene = new THREE.Scene();
    const world = new CANNON.World();
    const cannonDebugger = CannonDebugger(scene, world);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0xffffff, 1); // White color, fully opaque
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth movement
    controls.dampingFactor = 0.05; // Damping factor
    controls.target.set(0, 0, 0);  // Focus point
    
    // Create a texture loader
    const textureLoader = new THREE.TextureLoader();
    // Create a GLTF loader
    const loader = new GLTFLoader();
    // Create a FBX loader
    const fbxLoader = new FBXLoader();
    
    // Create the light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);
    // // Create the light
    // const rectLight = new THREE.RectAreaLight(0xffffff, 50, 2, 2); // Color, Intensity, Width, Height
    // rectLight.position.set(2.2, 8, 2.2); // Position on the ceiling
    // rectLight.rotateX(-Math.PI / 2); // Rotate the light to point down
    // scene.add(rectLight);
    const hud = new HUD();

    // Setup the room
    const frameUpdates = await setupRoom(scene, world, loader, textureLoader, hud);

    const keysPressed = new Map<string, boolean>();
    setupKeyControls(keysPressed);

    // setup the character
    let characterStateMachine = await loadCharacter(fbxLoader, scene, world, camera, controls);
    
    const clock = new THREE.Clock();
    const animate = () => {
        frameUpdates.forEach(obj => obj.update());

        const delta = clock.getDelta();
        if(characterStateMachine) {
            characterStateMachine.update(delta, keysPressed);
        }

        // Step the physics world
        world.fixedStep();
        cannonDebugger.update();
        controls.update(); // Required for damping to work
        renderer.render(scene, camera);

        hud.display();

        requestAnimationFrame(animate);
    };

    
    animate();
}

main();
