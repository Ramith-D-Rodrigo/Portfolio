// builder class for building the interactions
import * as THREE from 'three';

import Interaction from "../room/interaction";

type AttachableObjectProps = {
    object: THREE.Group,
    position: THREE.Vector3,
    rotation: THREE.Euler,
    scale: THREE.Vector3
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

    public setDisplayText(displayText: string): InteractionBuilder{
        this.interaction.setDisplayText(displayText);
        return this;
    }

    public setAnimations(animations: string[]): InteractionBuilder {
        this.interaction.setAnimations(animations);
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

export type {AttachableObjectProps};
export default InteractionBuilder;
