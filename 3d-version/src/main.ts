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
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    
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
    light.position.set(0, 9.8, 0);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    
    // Fix pixelation: Increase shadow resolution
    light.shadow.mapSize.width = 2048; // ⬆️ Higher resolution for smoother shadows
    light.shadow.mapSize.height = 2048;
    
    // Reduce shadow artifacts
    light.shadow.bias = -0.002; // 🔧 Helps prevent shadow acne
    light.shadow.radius = 4; // 🔥 Softens shadow edges
    
    // Adjust shadow camera size for better coverage
    light.shadow.camera.top = 10;
    light.shadow.camera.bottom = -10;
    light.shadow.camera.left = -10;
    light.shadow.camera.right = 10;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 50;

    // Ambient Light (soft general brightness)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    scene.add(light);

    const hud = new HUD();

    // Setup the room
    const interactableAreas = await setupRoom(scene, world, loader, textureLoader, hud);

    const keysPressed = new Map<string, boolean>();
    setupKeyControls(keysPressed);

    // setup the character
    let characterStateMachine = await loadCharacter(fbxLoader, scene, world, camera, controls);

    window.addEventListener('keydown', (event: KeyboardEvent) => {
        if(event.key.toLowerCase() === 'm'){
            console.log(camera.position);
            console.log(camera.quaternion);
        }
        if(event.key.toLowerCase() === 'n'){
            console.log(characterStateMachine.getModel().position);
            console.log(characterStateMachine.getModel().quaternion);
        }
    })
    
    const clock = new THREE.Clock();
    const animate = () => {
        const delta = clock.getDelta();
        interactableAreas.forEach(obj => obj.update(delta));
        if(characterStateMachine){
            characterStateMachine.update(delta);
        }
        // Step the physics world
        world.fixedStep();
        if(controls.enabled)
            controls.update(); // Required for damping to work
        hud.display();
        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    };

    
    animate();
}

main();
