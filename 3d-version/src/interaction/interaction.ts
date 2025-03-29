import * as THREE from "three";
import { HUDComponent } from "../other/hudComponent";
import { AttachableObjectProps, InteractionAnimProps } from "./interactionBuilder";
import BaseInteractionSequence from "./baseInteractionSequence";

class Interaction implements HUDComponent {
    private isVisible: boolean = false;
    private domElement: HTMLElement;
    private animations: InteractionAnimProps[];
    private isInteracting: boolean = false;
    private interactionSequence: BaseInteractionSequence;

    private intermediateCameraPos: THREE.Vector3 = new THREE.Vector3(0, 0, 0);;
    private intermediateCameraRot: THREE.Quaternion = new THREE.Quaternion(0, 0, 0, 1);

    private destCameraPos: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    private destCameraOri: THREE.Quaternion = new THREE.Quaternion(0, 0, 0, 1);

    private characterPos: THREE.Vector3;
    private characterRot: THREE.Quaternion;

    private attachableObjects: Map<string, AttachableObjectProps> = new Map();

    public constructor() {
        this.domElement = document.createElement("div");
        this.domElement.className = 'interaction';

        document.body.appendChild(this.domElement);
    }

    public setIntermediateCameraTransform(intCameraPos: THREE.Vector3, intCameraRot: THREE.Quaternion): void {
        this.intermediateCameraPos = intCameraPos;
        this.intermediateCameraRot = intCameraRot;
    }

    public setDestCameraTransform(destCameraPos: THREE.Vector3, destCameraRot: THREE.Quaternion): void {
        this.destCameraPos = destCameraPos;
        this.destCameraOri = destCameraRot;
    }

    public setCharacterTransfrom(characterPos: THREE.Vector3, characterRot: THREE.Quaternion): void {
        this.characterPos = characterPos;
        this.characterRot = characterRot;
    }

    public setDisplayText(displayText: string): void{
        this.domElement.innerText = "Press F to " + displayText;
    }

    public setAnimations(animations: InteractionAnimProps[]): void{
        this.animations = animations;
    }

    public setIsVisible(val: boolean): void{
        this.isVisible = val;
    }

    public getIsVisible(): boolean {
        return this.isVisible;
    }

    public addAttachableObject(attachingBoneName: string, modelProps: AttachableObjectProps): void {
        this.attachableObjects.set(attachingBoneName, modelProps);
    }

    public setInteractionSequence(intSequence: BaseInteractionSequence): void {
        this.interactionSequence = intSequence;
    }

    public display(): void {
        if(this.isInteracting){
            return;
        }
        this.domElement.classList.add('visible');
    }

    public hide(): void {
        this.domElement.classList.remove('visible');
    }

    public async interact(camera: THREE.Camera, animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer, currAction: string, character: THREE.Group): Promise<void> {
        if (this.animations.length === 0) return;
        if(!this.interactionSequence) return;

        this.isInteracting = true;
        this.hide();

        await this.interactionSequence.playSequence(
            this.characterPos, this.characterRot,
            camera, 
            this.intermediateCameraPos, this.intermediateCameraRot, 
            this.destCameraPos, this.destCameraOri, 
            this.attachableObjects, 
            character, animationMap, mixer, currAction, this.animations
        );

        this.stopInteract();
    }


    public stopInteract(): void {
        this.isInteracting = false;
        this.display();
    }
}

export default Interaction;
