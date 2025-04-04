import * as THREE from 'three';
import * as CANNON from 'cannon-es';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { setupKeyControls } from './character/controls';
import { addSkills, setupRoom } from './room/room';
import { loadCharacter } from './character/utils';
import HUD from './other/hud';
import SettingsPanel from './other/settingsPanel';
import { HUDComponent } from './other/hudComponent';
import { GITHUB, GITHUB_URL, LINKEDIN, LINKEDIN_URL } from '../../static-version/globalConstants';
import CannonDebugger from 'cannon-es-debugger';

const showLoadingScreen = () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.style.position = 'fixed';
    loadingScreen.style.top = '0';
    loadingScreen.style.left = '0';
    loadingScreen.style.width = '100%';
    loadingScreen.style.height = '100%';
    loadingScreen.style.background = 'black';
    loadingScreen.style.display = 'flex';
    loadingScreen.style.justifyContent = 'center';
    loadingScreen.style.alignItems = 'center';
    loadingScreen.style.color = 'white';
    loadingScreen.style.fontSize = '5rem';
    loadingScreen.style.flexDirection = 'column';
    
    const text = document.createElement('p');
    text.style.fontFamily = 'Poppins';
    text.innerText = 'Loading...';
    
    const progressBarContainer = document.createElement('div');
    progressBarContainer.style.width = '50%';
    progressBarContainer.style.height = '2rem';
    progressBarContainer.style.background = 'gray';
    progressBarContainer.style.marginTop = '2rem';
    
    const progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    progressBar.style.width = '0%';
    progressBar.style.height = '100%';
    progressBar.style.background = 'white';
    
    progressBarContainer.appendChild(progressBar);
    loadingScreen.appendChild(text);
    loadingScreen.appendChild(progressBarContainer);
    document.body.appendChild(loadingScreen);
};

const updateProgressBar = (targetPercentage: number) => {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;

    let currentPercentage = parseFloat(progressBar.style.width) || 0;
    let animationFrameId: number;

    const animate = () => {
        if (Math.abs(targetPercentage - currentPercentage) < 0.5) { 
            progressBar.style.width = `${targetPercentage}%`; // Ensure final value
            cancelAnimationFrame(animationFrameId); // Cancel any remaining frames
            return;
        }

        currentPercentage += (targetPercentage - currentPercentage) * 0.1; // Adjust speed here
        progressBar.style.width = `${currentPercentage.toFixed(2)}%`;

        animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
};

const hideLoadingScreenWithDelay = (delay: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            hideLoadingScreen();
            resolve();
        }, delay);
    });
};

const hideLoadingScreen = () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
};

const main = async () => {
    showLoadingScreen();
    let progress = 0;
    
    const scene = new THREE.Scene();
    const world = new CANNON.World();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.layers.set(0);  
    camera.layers.enable(1);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);
    
    const textureLoader = new THREE.TextureLoader();
    const loader = new GLTFLoader();
    const fbxLoader = new FBXLoader();
    
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 9.8, 0);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.bias = -0.002;
    light.shadow.radius = 4;
    light.shadow.camera.top = 10;
    light.shadow.camera.bottom = -10;
    light.shadow.camera.left = -10;
    light.shadow.camera.right = 10;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 50;
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    scene.add(light);

    updateProgressBar(progress += 10);
    
    const hud = new HUD();
    const interactableAreas = await setupRoom(scene, world, loader, textureLoader, hud);
    updateProgressBar(progress += 30);
    
    const keysPressed = new Map<string, boolean>();
    setupKeyControls(keysPressed);
    
    let characterStateMachine = await loadCharacter(fbxLoader, scene, world, camera, controls);
    updateProgressBar(progress += 30);
    
    const skillObjs: THREE.Group[] = [];
    addSkills(skillObjs, scene, loader);
    updateProgressBar(100);
    
    await hideLoadingScreenWithDelay(500);

    //const settingsPanel: HUDComponent = SettingsPanel.getInstance();

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    function onPointerMove(event: MouseEvent) {
        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

    //const cannonDebugger = new CannonDebugger(scene, world);

    function onPointerClick(event: MouseEvent) {
        // update the picking ray with the camera and pointer position
	    raycaster.setFromCamera(pointer, camera);

        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(scene.children);

        for (let i = 0; i < intersects.length; i++ ) {
            if(intersects[i].object instanceof THREE.Mesh && intersects[i].object.userData.label !== undefined){
                const label = intersects[i].object.userData.label;
                switch(label){
                    case LINKEDIN:
                        window.open(LINKEDIN_URL, '_blank');
                    break;

                    case GITHUB:
                        window.open(GITHUB_URL, '_blank');
                    break;
                }
            }
        }
    }

    window.addEventListener('click', onPointerClick);
    window.addEventListener('pointermove', onPointerMove);
    
    const clock = new THREE.Clock();
    let lastDelta = 0;

    const animate = () => {
        const delta = clock.getDelta();
        hud.display();
        interactableAreas.forEach(obj => obj.update(delta));
        
        skillObjs.forEach(obj => {
            lastDelta += delta * 0.1;
            const scaleFactor = 1 + Math.sin(lastDelta) * 0.15;
            obj.scale.copy(obj.userData.originalScale.clone().multiplyScalar(scaleFactor));
        });
        
        if (characterStateMachine) {
            characterStateMachine.update(delta);
        }
        
        if (controls.enabled) controls.update();
        world.fixedStep(delta);
        //cannonDebugger.update();
        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    };
    
    animate();
};

main();
