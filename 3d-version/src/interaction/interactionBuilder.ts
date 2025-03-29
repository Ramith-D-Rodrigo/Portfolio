// builder class for building the interactions
import * as THREE from 'three';

import Interaction from "./interaction";
import BaseInteractionSequence from './baseInteractionSequence';

type AttachableObjectProps = {
    object: THREE.Group,
    position: THREE.Vector3,
    rotation: THREE.Euler,
    scale: THREE.Vector3
}

type InteractionAnimProps = {
    animName: string,
    loop: THREE.AnimationActionLoopStyles,
    repeatCount: number
}

class InteractionBuilder{
    private interaction: Interaction;
    
    public constructor(){
        this.interaction = new Interaction();
    }

    public setIntermediateCameraTransform(intCameraPos: THREE.Vector3, intCameraRot: THREE.Quaternion): InteractionBuilder {
        this.interaction.setIntermediateCameraTransform(intCameraPos, intCameraRot);
        return this;
    }

    public setDestCameraTransform(destCameraPos: THREE.Vector3, destCameraRot: THREE.Quaternion): InteractionBuilder {
        this.interaction.setDestCameraTransform(destCameraPos, destCameraRot);
        return this;
    }

    public setCharacterTransform(characterPos: THREE.Vector3, characterRot: THREE.Quaternion): InteractionBuilder{
        this.interaction.setCharacterTransfrom(characterPos, characterRot);
        return this;
    }

    public setDisplayText(displayText: string): InteractionBuilder{
        this.interaction.setDisplayText(displayText);
        return this;
    }

    public setAnimations(animations: InteractionAnimProps[]): InteractionBuilder {
        this.interaction.setAnimations(animations);
        return this;
    }

    public setInteractionSequence(intSequence: BaseInteractionSequence): InteractionBuilder {
        this.interaction.setInteractionSequence(intSequence);
        return this;
    }

    public addAttachableObject(attachingBoneName: string, modelProps: AttachableObjectProps): InteractionBuilder {
        this.interaction.addAttachableObject(attachingBoneName, modelProps);
        return this;
    }

    public build(): Interaction {
        return this.interaction;
    }
}

export type {AttachableObjectProps, InteractionAnimProps};
export default InteractionBuilder;
