import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DIRECTIONS, setupKeyControls } from './controls';
import { IDLE, WALK } from './constants';
import { FrameUpdate } from '../other/frameUpdate';
import InteractionManager from '../interaction/interactionManager';
import Interaction from '../interaction/interaction';

class CharacterStateMachine implements FrameUpdate {
    
    private model: THREE.Group;
    private physicsBody: CANNON.Body;

    private mixer: THREE.AnimationMixer;
    private animationMap: Map<string, THREE.AnimationAction> = new Map();
    private currAction: string;

    private orbitControls: OrbitControls;
    private camera: THREE.PerspectiveCamera;

    private keysPressed = new Map<string, boolean>();

    private rotateQuaternion = new THREE.Quaternion();
    private rotateAxis = new THREE.Vector3(0, 1, 0);
    private cannonRotateAxis = new CANNON.Vec3(0, 1, 0);
    private walkDirection = new THREE.Vector3();
    private walkSpeed = 5;

    private cameraTarget = new THREE.Vector3();
    private cameraOffset = new THREE.Vector3(0, 3.5, 4);

    private isInteracting: boolean = false;

    private interactionEvent = (event: KeyboardEvent): void => {
        if(event.key.toLowerCase() === 'f' && !this.isInteracting){
            const area =  InteractionManager.getCurrContactingInteractableArea();
            if(!area) return;
            area.setInteract(true);
            const world = area.getAttachedWorld();
            const scene = area.getAttachedScene();

            area.removeFromWorld(world as CANNON.World, scene as THREE.Scene);
            this.isInteracting = true;
            this.orbitControls.enabled = false;
            area.getCurrInteraction().interact(this.camera, this.animationMap, this.mixer, this.currAction, this.model).then(() => {
                this.isInteracting = false;
                this.orbitControls.enabled = true;
                area.addToWorld(world as CANNON.World, scene as THREE.Scene);
                area.setInteract(false);
            });
        }
    };

    public constructor(model: THREE.Group, physicsBody: CANNON.Body, mixer: THREE.AnimationMixer, camera: THREE.PerspectiveCamera, 
        orbitControls: OrbitControls, animationsMap: Map<string, THREE.AnimationAction>, currAction: string, world: CANNON.World) {
        this.model = model;
        this.physicsBody = physicsBody;
        this.mixer = mixer;
        this.orbitControls = orbitControls;
        this.camera = camera;
        this.currAction = currAction;
        this.animationMap = animationsMap;
        this.animationMap.get(this.currAction)?.play();  
        this.orbitControls.enablePan = false;
        this.orbitControls.enableZoom = false;

        //set the camera position behind the character
        const modelPosition = this.model.position;
        this.camera.position.set(modelPosition.x, modelPosition.y, modelPosition.z).add(this.cameraOffset);
        this.camera.lookAt(modelPosition);

        this.updateCameraTarget(0, 0);

        setupKeyControls(this.keysPressed);
        
        this.physicsBody.addEventListener('collide', (event: any) => {
            world.removeBody(this.physicsBody);
            if(event.body.isTrigger){
                document.addEventListener('keydown', this.interactionEvent);
            }
            else{
                const pos = this.physicsBody.position;
                const threeQuat = new THREE.Quaternion(
                    this.physicsBody.quaternion.x, 
                    this.physicsBody.quaternion.y, 
                    this.physicsBody.quaternion.z, 
                    this.physicsBody.quaternion.w
                );
                this.model.position.set(pos.x , this.model.position.y, pos.z);
                this.model.rotation.setFromQuaternion(threeQuat);
            }    
            world.addBody(this.physicsBody);
        });
    }


    public update(delta: number): void {
        this.mixer.update(delta);
        document.removeEventListener('keydown', this.interactionEvent);

        let play = '';
        if(this.isInteracting){
            return;
        }

        this.orbitControls.enabled = true;
        const directionPressed = DIRECTIONS.some(direction => this.keysPressed.get(direction) === true);
        play = directionPressed ? WALK : IDLE;

        if(this.currAction !== play) {
            const prevAction = this.animationMap.get(this.currAction);
            const nextAction = this.animationMap.get(play);

            prevAction?.fadeOut(0.2);
            nextAction?.reset().fadeIn(0.2).play();

            this.currAction = play;
        }

        const epsilon = 0.0001; // Small tolerance for floating-point comparison
        const cameraToModelDistance = this.camera.position.distanceTo(this.model.position);
        const cameraOffsetLength = this.cameraOffset.length();
        
        if (Math.abs(cameraToModelDistance - cameraOffsetLength) > epsilon) {
            const direction = new THREE.Vector3().subVectors(this.camera.position, this.model.position).normalize();
            // Set camera position to maintain the correct offset
            this.camera.position.copy(this.model.position).addScaledVector(direction, cameraOffsetLength);
        }

        //turning the character
        if (this.currAction === WALK) {
            let cameraYAngle = Math.atan2(
                this.model.position.x - this.camera.position.x,
                this.model.position.z - this.camera.position.z
            );
            let directionOffset = this.directionOffset(this.keysPressed);
            // Rotate the physics body
            const targetQuaternion = new CANNON.Quaternion();
            targetQuaternion.setFromAxisAngle(this.cannonRotateAxis, cameraYAngle + directionOffset);
            // Interpolate towards the target quaternion
            this.physicsBody.quaternion.slerp(targetQuaternion, 0.1, this.physicsBody.quaternion);

            // Rotate the mesh
            this.rotateQuaternion.setFromAxisAngle(this.rotateAxis, cameraYAngle + directionOffset);
            this.model.quaternion.rotateTowards(this.rotateQuaternion, 0.1);
        
            // Update movement
            this.camera.getWorldDirection(this.walkDirection);
            this.walkDirection.y = 0;
            this.walkDirection.normalize();
            this.walkDirection.applyAxisAngle(this.rotateAxis, directionOffset);
        
            const x = this.walkDirection.x * this.walkSpeed * delta;
            const z = this.walkDirection.z * this.walkSpeed * delta;

            this.physicsBody.position.x += x;
            this.physicsBody.position.z += z;
        
            this.model.position.x = this.physicsBody.position.x;
            this.model.position.z = this.physicsBody.position.z;
        
            this.updateCameraTarget(x, z);
        }
        else if (this.currAction === IDLE) {
            this.physicsBody.velocity.set(0, 0, 0);
            this.physicsBody.angularVelocity.set(0, 0, 0);
        }
        
        const newX = this.camera.position.x;
        const newZ = this.camera.position.z;
        const newY = this.camera.position.y;
        if(newX > 10 || newX < -10 || newZ > 10 || newZ < -10 || newY < 0 || newY > 10){
            const offset = this.walkDirection.clone().multiplyScalar(-3); // Move back 3 units
            this.camera.position.copy(this.model.position).add(offset).add(new THREE.Vector3(0, 2, 0));
        }
    }

    private updateCameraTarget(x: number, z: number) {
        this.camera.position.x += x;
        this.camera.position.z += z;

        this.cameraTarget.copy(this.model.position).add(new THREE.Vector3(0, 3.5, 0));

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

    public getModel(): THREE.Group {
        return this.model;
    }
}

export default CharacterStateMachine;
