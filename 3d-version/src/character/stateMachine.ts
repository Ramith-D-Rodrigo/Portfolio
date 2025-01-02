import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DIRECTIONS } from './controls';
import { IDLE, WALK } from './constants';

class CharacterStateMachine {
    
    private model: THREE.Group;
    private mixer: THREE.AnimationMixer;
    private animationMap: Map<string, THREE.AnimationAction> = new Map();
    private orbitControls: OrbitControls;
    private camera: THREE.PerspectiveCamera;
    private currAction: string;

    private rotateQuaternion = new THREE.Quaternion();
    private rotateAxis = new THREE.Vector3(0, 1, 0);
    private walkDirection = new THREE.Vector3();
    private walkSpeed = 5;
    private cameraTarget = new THREE.Vector3();

    public constructor(model: THREE.Group, mixer: THREE.AnimationMixer, camera: THREE.PerspectiveCamera, 
        orbitControls: OrbitControls, animationsMap: Map<string, THREE.AnimationAction>, currAction: string) {
        this.model = model;
        this.mixer = mixer;
        this.orbitControls = orbitControls;
        this.camera = camera;
        this.currAction = currAction;
        this.animationMap = animationsMap;
        this.animationMap.forEach((action, key) => {
            if(key == this.currAction) {
                action.play();
            }
        });  
        this.orbitControls.enablePan = false;
        this.orbitControls.enableZoom = false;

        //set the camera position behind the character
        const modelPosition = this.model.position;
        this.camera.position.set(modelPosition.x, modelPosition.y + 5, modelPosition.z + 5);
        this.camera.lookAt(modelPosition);

        this.updateCameraTarget(0, 0);
    }


    public update(delta: number, keysPressed: Map<string, boolean>): void {
        const directionPressed = DIRECTIONS.some(direction => keysPressed.get(direction) == true);
        let play = '';
        if(directionPressed) {
            play = WALK;
        }
        else{
            play = IDLE;
        }

        if(this.currAction !== play) {
            const prevAction = this.animationMap.get(this.currAction);
            const nextAction = this.animationMap.get(play);

            prevAction?.fadeOut(0.2);
            nextAction?.reset().fadeIn(0.2).play();

            this.currAction = play;
        }

        this.mixer.update(delta);

        //turning the character
        if(this.currAction === WALK) {
            let cameraYAngle = Math.atan2(
                this.model.position.x - this.camera.position.x,
                this.model.position.z - this.camera.position.z
            );
            let directionOffset = this.directionOffset(keysPressed);
            this.rotateQuaternion.setFromAxisAngle(this.rotateAxis, cameraYAngle + directionOffset);
            this.model.quaternion.rotateTowards(this.rotateQuaternion, 0.1);

            this.camera.getWorldDirection(this.walkDirection);
            this.walkDirection.y = 0;
            this.walkDirection.normalize();
            this.walkDirection.applyAxisAngle(this.rotateAxis, directionOffset);

            const x = this.walkDirection.x * this.walkSpeed * delta;
            const z = this.walkDirection.z * this.walkSpeed * delta;

            this.model.position.x += x;
            this.model.position.z += z;

            this.updateCameraTarget(x, z);
        }
    }

    private updateCameraTarget(x: number, z: number) {
        this.camera.position.x += x;
        this.camera.position.z += z;

        this.cameraTarget.x = this.model.position.x;
        this.cameraTarget.z = this.model.position.z;
        this.cameraTarget.y = this.model.position.y + 1;

        this.orbitControls.target = this.cameraTarget;
    }

    private directionOffset(keysPressed: any) {
        var directionOffset = 0 // assume facing forward (north)

        if (keysPressed.get('w')) {
            if (keysPressed.get('a')) {
                directionOffset = Math.PI / 4; //going north-west
            } else if (keysPressed.get('d')) {
                directionOffset = - Math.PI / 4; // going north-east
            }
        } else if (keysPressed.get('s')) {
            if (keysPressed.get('a')) {
                directionOffset = Math.PI / 4 + Math.PI / 2; // going south-west
            } else if (keysPressed.get('d')) {
                directionOffset = -Math.PI / 4 - Math.PI / 2; // going south-east
            } else {
                directionOffset = Math.PI; // going south
            }
        } else if (keysPressed.get('a')) {
            directionOffset = Math.PI / 2; // going west
        } else if (keysPressed.get('d')) {
            directionOffset = - Math.PI / 2; // going east
        }

        return directionOffset;
    }
}

export default CharacterStateMachine;
