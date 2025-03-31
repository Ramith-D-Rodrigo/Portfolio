import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";
import { BICEP_CURL, FLEX, FRONT_RAISE, IDLE, PUSH_UP, SITUP, SQUAT, START_PUSH_UP, START_SITUP, START_SQUAT, START_WALK, STOP_PUSH_UP, STOP_SITUP, STOP_SQUAT, STOP_WALK, TURN_LEFT, TURN_RIGHT, WALK } from "./constants";
import CharacterStateMachine from "./stateMachine";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as CANNON from 'cannon-es';


const animations: string[] = [IDLE, START_WALK, STOP_WALK, TURN_LEFT, TURN_RIGHT, WALK, 
    START_PUSH_UP, PUSH_UP, STOP_PUSH_UP, 
    FLEX, 
    START_SITUP, SITUP, STOP_SITUP,
    START_SQUAT, SQUAT, STOP_SQUAT,
    FRONT_RAISE, BICEP_CURL
];

const loadCharacter = async (fbxLoader: FBXLoader, scene: THREE.Scene, world: CANNON.World, camera: THREE.PerspectiveCamera, controls: OrbitControls) => {
    const object = await fbxLoader.loadAsync(
        './models/character/character.fbx',
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        }
    );

    const position = {
        x: 0,
        y: 0,
        z: 7
    };

    object.rotation.set(0, Math.PI, 0);
    object.position.set(position.x, position.y, position.z);
    object.scale.set(0.025, 0.025, 0.025);
    const animationMixer = new THREE.AnimationMixer(object);

    object.traverse(obj => {
        if(obj.isObject3D){
            obj.castShadow = true;
            obj.receiveShadow = true;
        }
    })

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

    const characterPhysicsBody = createCharacterPhysicsBody(1, position.x, position.y + 2, position.z, 0, Math.PI, 0, 0.7, 2, 0.5);
    world.addBody(characterPhysicsBody);

    return new CharacterStateMachine(object, characterPhysicsBody, animationMixer, camera, controls, animationsMap, 'Idle', world);
}

const createCharacterPhysicsBody = (mass: number,
    xPosition: number, yPosition: number, zPosition: number,
    xRotation: number, yRotation: number, zRotation: number,
    xScale: number, yScale: number, zScale: number
) => {
    const size = new CANNON.Vec3(xScale, yScale, zScale);
        const characterBody = new CANNON.Body({
            mass: mass,
            shape: new CANNON.Box(size),
        });
        characterBody.position.set(xPosition, yPosition, zPosition);
        characterBody.quaternion.setFromEuler(xRotation, yRotation, zRotation);
    
        return characterBody;
}

export { loadCharacter };
