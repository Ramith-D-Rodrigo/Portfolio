import BaseInteractionSequence from "./baseInteractionSequence";
import * as THREE from 'three';
import { AttachableObjectProps, InteractionAnimProps } from "./interactionBuilder";

class FrontRaiseInteractionSequence extends BaseInteractionSequence {
    public override async playSequence(characterPos: THREE.Vector3, characterRot: THREE.Quaternion, 
        camera: THREE.Camera, intCameraPos: THREE.Vector3, intCameraQuat: THREE.Quaternion, 
        destCameraPos: THREE.Vector3, destCameraQuat: THREE.Quaternion, attachableObjects: Map<string, AttachableObjectProps>, 
        character: THREE.Group, animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer, currAction: string, animations: InteractionAnimProps[]
    ): Promise<void> {
        await this.setupForCharacterAndCamera(camera, intCameraPos, intCameraQuat, character, characterPos, characterRot);

        attachableObjects.forEach((value, key) => {
            const bone = character.getObjectByName(key);
            if(bone){
                bone.add(value.object);
                value.object.position.copy(value.position);
                value.object.rotation.copy(value.rotation);
                value.object.scale.copy(value.scale);
            }
        });

        await this.interpolateCamera(camera, destCameraPos, destCameraQuat);

        const currentAction = animationMap.get(currAction);
        currentAction?.fadeOut(0.2);

        for (let i = 0; i < animations.length; i++) {
            await this.playAnimation(
                animations[i].animName, 
                animations[i].loop, 
                animations[i].repeatCount, 
                animationMap, mixer
            );
        }

        currentAction?.reset().fadeIn(0.2).play();

        await this.interpolateCamera(camera, intCameraPos, intCameraQuat);

        attachableObjects.forEach((value, key) => {
            const bone = character.getObjectByName(key);
            if(bone){
                bone.remove(value.object);
            }
        });

        await this.resetCharacterAndCamera(camera, character);
    }

    protected override playAnimation(animName: string, mode: THREE.AnimationActionLoopStyles, repetitions: number, 
        animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer,): Promise<void> {
        return new Promise((resolve) => {
            const action = animationMap.get(animName);
            if (!action) {
                console.warn(`Animation '${animName}' not found`);
                resolve();
                return;
            }
            action.setLoop(mode, repetitions);
            action.reset().fadeIn(0.2).play();
    
            // Listen for animation completion
            mixer.addEventListener('finished', (event) => {
                if (event.action === action) {
                    action.fadeOut(0.2);
                    resolve();
                }
            });
    
            action.clampWhenFinished = true;
        });
    }
}

export default FrontRaiseInteractionSequence;
