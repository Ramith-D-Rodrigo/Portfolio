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

type DisplayTextProps = {
    title: string,
    description?: string,
    list?: string[]
}

type InteractionAnimProps = {
    animName: string,
    displayTextList: DisplayTextProps[], //we infer the loop and repeat count from this list's length
    displayTextDur: number
}

class InteractionBuilder{
    private interaction: Interaction;
    
    public constructor(){
        this.interaction = new Interaction();
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

export type {AttachableObjectProps, InteractionAnimProps, DisplayTextProps};
export default InteractionBuilder;
