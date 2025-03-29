
import * as THREE from 'three';
import { AttachableObjectProps, InteractionAnimProps } from './interactionBuilder';
import gsap from "gsap";

abstract class BaseInteractionSequence {
    protected async interpolateCamera(camera: THREE.Camera, destPos: THREE.Vector3, destQuat: THREE.Quaternion): Promise<void> {
        await new Promise((resolve) => {
            gsap.to(camera.position, {
                x: destPos.x,
                y: destPos.y,
                z: destPos.z,
                duration: 0.5,
                ease: "power2.inOut",
            });
            gsap.to(camera.quaternion, {
                x: destQuat.x,
                y: destQuat.y,
                z: destQuat.z,
                w: destQuat.w,
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: resolve,
            });
        });
    }

    public abstract playSequence(characterPos: THREE.Vector3, characterRot: THREE.Quaternion, camera: THREE.Camera, 
        intCameraPos: THREE.Vector3, intCameraQuat: THREE.Quaternion, 
        destCameraPos: THREE.Vector3, destCameraQuat: THREE.Quaternion, 
        attachableObjects: Map<string, AttachableObjectProps>, 
        character: THREE.Group, animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer, currAction: string, animations: InteractionAnimProps[]
    ): Promise<void>;

    protected abstract playAnimation(animName: string, mode: THREE.AnimationActionLoopStyles, repetitions: number, 
            animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer,): Promise<void>;
}

export default BaseInteractionSequence;
