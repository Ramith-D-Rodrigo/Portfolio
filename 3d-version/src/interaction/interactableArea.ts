import * as CANNON from "cannon-es";
import * as THREE from "three";
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import Interaction from "./interaction";
import { Utils } from "../utils/utils";
import { FrameUpdate } from "../other/frameUpdate";
import InteractionManager from "./interactionManager";
import { HUDComponent } from "../other/hudComponent";

class InteractableArea implements FrameUpdate, HUDComponent {
    private collisionBody: CANNON.Body;
    private displayText: THREE.Group;

    private interactionDomElement: HTMLElement;
    private isInteractionTextVisible: boolean = false;
    private isInteracting: boolean = false;

    private interactions: Interaction[];

    private lastDelta: number = 0;

    private currInteractionIdx: number = 0;
    private interactionSwitchEvent = (event: KeyboardEvent): void => {
        if (this.interactions.length > 1) {
            if (event.key === 'ArrowLeft') {
                this.currInteractionIdx = (this.currInteractionIdx - 1 + this.interactions.length) % this.interactions.length;
            }
            if (event.key === 'ArrowRight') {
                this.currInteractionIdx = (this.currInteractionIdx + 1) % this.interactions.length;
            }
    
            this.interactionDomElement.innerHTML = `
                <span class="arrow">⬅️</span> 
                <b>Press F to <span class="interaction-text">${this.interactions[this.currInteractionIdx].getDisplayText()}</span></b> 
                <span class="arrow">➡️</span>
            `;
        } else {
            this.interactionDomElement.innerHTML = `
                <b>Press F to <span class="interaction-text">${this.interactions[this.currInteractionIdx].getDisplayText()}</span></b>
            `;
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
            if(this.isInteracting) return;
            this.isInteractionTextVisible = true;
            InteractionManager.setContactingInteractableArea(this);
            this.listenForKeyEvents();
        });

        this.interactionDomElement = document.createElement("div");
        this.interactionDomElement.className = 'interaction';

        document.body.appendChild(this.interactionDomElement);
    }
    public display(): void {
        if(this.isInteractionTextVisible){
            this.interactionDomElement.classList.add('visible');
        }
    }
    public hide(): void {
        this.interactionDomElement.classList.remove('visible');
    }
    public setIsVisible(val: boolean): void {
        this.isInteractionTextVisible = val;
    }
    public getIsVisible(): boolean {
        return this.isInteractionTextVisible;
    }

    public setInteract(val: boolean): void {
        this.isInteracting = val;
        this.isInteractionTextVisible = !this.isInteracting;
    }

    public getCurrInteraction(): Interaction {
        return this.interactions[this.currInteractionIdx];
    }

    public static async create(pos: THREE.Vector3, rot: THREE.Vector3, radius: number, 
        displayText: string, textPos: THREE.Vector3, textRot: THREE.Vector3, 
        interactions: Interaction[]): Promise<InteractableArea> {
        const newArea = new InteractableArea(pos, rot, radius, interactions);
        if (!InteractableArea.areaFont) {
            InteractableArea.areaFont = await Utils.loadFont('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json');
        }
        
        const textGeometry = new TextGeometry(displayText, {
            font: InteractableArea.areaFont,
            size: 0.6,
            depth: 0.2, // Depth makes it more 3D
            bevelEnabled: true, // Adds beveling for a premium look
            bevelThickness: 0.02,
            bevelSize: 0.02,
            bevelSegments: 4
        });
        
        const textMaterial = new THREE.MeshStandardMaterial({
            color: 0xffcc00, // Bright yellow (fitness game style)
            metalness: 0.5,  // Gives a slightly metallic finish
            roughness: 0.3,  // Adds a polished feel
            emissive: 0xff6600, // Slight glow effect (orange light)
            emissiveIntensity: 0.3,
        });
        
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);        
        const textGroup = new THREE.Group();
        textGroup.add(textMesh);
        
        newArea.displayText = textGroup;  // Assign it to your area        
        newArea.displayText.position.set(textPos.x, textPos.y, textPos.z);
        newArea.displayText.rotation.set(textRot.x, textRot.y, textRot.z);
        return newArea;
    }

    public update(delta: number): void {
        this.isInteractionTextVisible = false;
        InteractionManager.removeContactingInteractableArea();
        window.removeEventListener('keydown', this.interactionSwitchEvent);

        this.lastDelta += delta * 1.5; // Accumulate delta
        const yOffset = Math.sin(this.lastDelta) * 0.2; // Amplitude of 0.2 units
        this.displayText.position.y = 1 + yOffset; // Base height + oscillation
    }

    public addToWorld(world: CANNON.World, scene: THREE.Scene){
        world.addBody(this.collisionBody);
        scene.add(this.displayText);
    }

    public removeFromWorld(world: CANNON.World, scene: THREE.Scene){
        world.removeBody(this.collisionBody);
        scene.remove(this.displayText);
    }

    private listenForKeyEvents(): void {
        window.addEventListener('keydown', this.interactionSwitchEvent);
    }
};

export default InteractableArea;
