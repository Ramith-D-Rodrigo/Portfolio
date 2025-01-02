import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";
import { IDLE, START_WALK, STOP_WALK, TURN_LEFT, TURN_RIGHT, WALK } from "./constants";
import CharacterStateMachine from "./stateMachine";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


const animations: string[] = [IDLE, START_WALK, STOP_WALK, TURN_LEFT, TURN_RIGHT, WALK];

const loadCharacter = async (fbxLoader: FBXLoader, scene: THREE.Scene, camera: THREE.PerspectiveCamera, controls: OrbitControls) => {
    const object = await fbxLoader.loadAsync(
        './models/character/character.fbx',
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        }
    );

    object.position.set(0, 0, 0);
    object.scale.set(0.025, 0.025, 0.025);
    const animationMixer = new THREE.AnimationMixer(object);
    scene.add(object);

    const animationsMap: Map<string, THREE.AnimationAction> = new Map();
    for(let i = 0; i < animations.length; i++) {
        const animationFbx = await fbxLoader.loadAsync(
            `./models/character/animations/${animations[i]}.fbx`,
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
            }
        );

        const allAnimations = animationFbx.animations;
        allAnimations.forEach((clip) => {
            const action = animationMixer?.clipAction(clip);
            if (action) {
                animationsMap.set(animations[i], action);
            }
        });
    }

    return new CharacterStateMachine(object, animationMixer, camera, controls, animationsMap, 'Idle');
}

export { loadCharacter };
