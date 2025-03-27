import * as CANNON from "cannon-es";
import * as THREE from "three";
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import Interaction from "./interaction";
import { Utils } from "../utils/utils";
import { FrameUpdate } from "../other/frameUpdate";

class InteractableArea implements FrameUpdate {
    private collisionBody: CANNON.Body;
    private cameraPos: THREE.Vector3;
    private cameraOri: THREE.Vector3;
    private displayText: THREE.Mesh;
    private interactions: Interaction[];

    private currInteractionIdx: number = 0;
    private interactionSwitchEvent = (event: KeyboardEvent): void => {
        this.interactions[this.currInteractionIdx].setIsVisible(false);
        if (event.key === 'ArrowLeft') {
            this.currInteractionIdx = (this.currInteractionIdx - 1 + this.interactions.length) % this.interactions.length;
        }
        if (event.key === 'ArrowRight') {
            this.currInteractionIdx = (this.currInteractionIdx + 1) % this.interactions.length;
        }
        this.interactions[this.currInteractionIdx].setIsVisible(true);
        if(event.key.toLowerCase() === 'f'){
            this.interactions[this.currInteractionIdx].interact();
        }
    };

    private static textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    private static areaFont: Font | null;

    private constructor(pos: THREE.Vector3, rot: THREE.Vector3, radius: number, interactions: Interaction[]){
        this.interactions = interactions;
        this.collisionBody = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Sphere(radius),
            isTrigger: true
        });
        this.collisionBody.position.set(pos.x, pos.y, pos.z);
        this.collisionBody.quaternion.setFromEuler(rot.x, rot.y, rot.z);
        this.currInteractionIdx = 0;
        
        this.collisionBody.addEventListener('collide', (event: any) => {
            this.interactions[this.currInteractionIdx].setIsVisible(true);
            this.listenForKeyEvents();
        });
    }

    public static async create(pos: THREE.Vector3, rot: THREE.Vector3, radius: number, 
        displayText: string, textPos: THREE.Vector3, textRot: THREE.Vector3, 
        interactions: Interaction[]): Promise<InteractableArea> {
        const newArea = new InteractableArea(pos, rot, radius, interactions);
        if(!InteractableArea.areaFont){
            InteractableArea.areaFont = await Utils.loadFont('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json');
        }
        const textGeometry = new TextGeometry(displayText, {
            font: InteractableArea.areaFont,
            size: 0.6,
            depth: 0.2
        });

        const textMaterial = InteractableArea.textMaterial;
        newArea.displayText = new THREE.Mesh(textGeometry, textMaterial);

        newArea.displayText.position.set(textPos.x, textPos.y, textPos.z);
        newArea.displayText.rotation.set(textRot.x, textRot.y, textRot.z);
        return newArea;
    }

    public update(delta: number): void {
        this.interactions.forEach(int => int.setIsVisible(false));
        window.removeEventListener('keydown', this.interactionSwitchEvent);
    }

    public addToWorld(world: CANNON.World, scene: THREE.Scene){
        world.addBody(this.collisionBody);
        scene.add(this.displayText);
    }

    public removeFromWorld(world: CANNON.World, scene: THREE.Scene){
        world.removeBody(this.collisionBody);
        scene.remove(this.displayText);
    }

    public setCameraLocation(pos:THREE.Vector3, ori: THREE.Vector3){
        this.cameraPos = pos;
        this.cameraOri = ori;
    }

    private listenForKeyEvents(): void {
        window.addEventListener('keydown', this.interactionSwitchEvent);
    }
};

export default InteractableArea;
