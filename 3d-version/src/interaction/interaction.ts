import * as THREE from "three";
import { HUDComponent } from "../other/hudComponent";
import { AttachableObjectProps, InteractionAnimProps } from "./interactionBuilder";
import BaseInteractionSequence from "./baseInteractionSequence";

class Interaction {
    private isVisible: boolean = false;
    private animations: InteractionAnimProps[];
    private isInteracting: boolean = false;
    private displayText: string;
    private interactionSequence: BaseInteractionSequence;

    private destCameraPos: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    private destCameraOri: THREE.Quaternion = new THREE.Quaternion(0, 0, 0, 1);

    private characterPos: THREE.Vector3;
    private characterRot: THREE.Quaternion;

    private attachableObjects: Map<string, AttachableObjectProps> = new Map();

    public constructor() {
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
        this.displayText = displayText;
    }

    public getDisplayText(): string {
        return this.displayText;
    }

    public setAnimations(animations: InteractionAnimProps[]): void{
        this.animations = animations;
    }

    public addAttachableObject(attachingBoneName: string, modelProps: AttachableObjectProps): void {
        this.attachableObjects.set(attachingBoneName, modelProps);
    }

    public setInteractionSequence(intSequence: BaseInteractionSequence): void {
        this.interactionSequence = intSequence;
    }

    public async interact(camera: THREE.Camera, animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer, currAction: string, character: THREE.Group): Promise<void> {
        if (this.animations.length === 0) return;
        if(!this.interactionSequence) return;

        this.isInteracting = true;

        await this.interactionSequence.playSequence(
            this.characterPos, this.characterRot,
            camera, this.destCameraPos, this.destCameraOri, 
            this.attachableObjects, 
            character, animationMap, mixer, currAction, this.animations
        );

        this.stopInteract();
    }


    public stopInteract(): void {
        this.isInteracting = false;
    }
}

export default Interaction;
