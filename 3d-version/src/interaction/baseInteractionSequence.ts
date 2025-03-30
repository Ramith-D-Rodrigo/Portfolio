
import * as THREE from 'three';
import { AttachableObjectProps, InteractionAnimProps } from './interactionBuilder';
import gsap from "gsap";

abstract class BaseInteractionSequence {
    private currCameraPos: THREE.Vector3;
    private currCameraOri: THREE.Quaternion;
    private currCharacterPos: THREE.Vector3;
    private currCharacterOri: THREE.Quaternion;

    protected async interpolateCamera(camera: THREE.Camera, destPos: THREE.Vector3, destQuat: THREE.Quaternion): Promise<void> {
        await new Promise((resolve) => {
            gsap.to(camera.quaternion, {
                x: destQuat.x,
                y: destQuat.y,
                z: destQuat.z,
                w: destQuat.w,
                duration: 1.5,
                ease: "power2.inOut"
            });
            gsap.to(camera.position, {
                x: destPos.x,
                y: destPos.y,
                z: destPos.z,
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: resolve,
            });
        });
    }

    protected async fadeIn(): Promise<void> {
        const el = document.querySelector('#fadeOverlay') as HTMLElement;
        await new Promise((resolve) => {
            gsap.to(el, { opacity: 1, duration: 1, onComplete: resolve });
        });
    }

    protected async fadeOut(): Promise<void> {
        const el = document.querySelector('#fadeOverlay') as HTMLElement;
        await new Promise((resolve) => {
            gsap.to(el, { opacity: 0, duration: 1, onComplete: resolve });
        });
    }

    protected async setupForCharacterAndCamera(camera: THREE.Camera, intCameraPos: THREE.Vector3, intCameraQuat: THREE.Quaternion,
        character: THREE.Group,  characterPos: THREE.Vector3, characterRot:THREE.Quaternion): Promise<void> {
        this.currCameraPos = camera.position.clone();
        this.currCameraOri = camera.quaternion.clone();

        this.currCharacterPos = character.position.clone();
        this.currCharacterOri = character.quaternion.clone();  
        
        await this.fadeIn();

        character.position.copy(characterPos);
        character.quaternion.copy(characterRot);

        camera.position.copy(intCameraPos);
        camera.quaternion.copy(intCameraQuat);
    }

    protected async resetCharacterAndCamera(camera: THREE.Camera, character: THREE.Group): Promise<void> {
        character.position.copy(this.currCharacterPos);
        character.quaternion.copy(this.currCharacterOri);
        camera.position.copy(this.currCameraPos);
        camera.quaternion.copy(this.currCameraOri);
        await this.fadeOut();
    }

    public abstract playSequence(characterPos: THREE.Vector3, characterRot: THREE.Quaternion, camera: THREE.Camera, 
        destCameraPos: THREE.Vector3, destCameraQuat: THREE.Quaternion, 
        attachableObjects: Map<string, AttachableObjectProps>, 
        character: THREE.Group, animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer, currAction: string, animations: InteractionAnimProps[]
    ): Promise<void>;

    protected abstract playAnimation(animName: string, mode: THREE.AnimationActionLoopStyles, repetitions: number, 
            animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer,): Promise<void>;
}

export default BaseInteractionSequence;
