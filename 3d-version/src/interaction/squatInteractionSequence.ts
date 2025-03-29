import BaseInteractionSequence from "./baseInteractionSequence";
import * as THREE from 'three';
import { AttachableObjectProps, InteractionAnimProps } from "./interactionBuilder";

class SquatInteractionSequence extends BaseInteractionSequence {
    private attachableObjs:  Map<string, AttachableObjectProps>;
    private character: THREE.Group;

    public override async playSequence(characterPos: THREE.Vector3, characterRot: THREE.Quaternion, 
        camera: THREE.Camera, intCameraPos: THREE.Vector3, intCameraQuat: THREE.Quaternion, 
        destCameraPos: THREE.Vector3, destCameraQuat: THREE.Quaternion, attachableObjects: Map<string, AttachableObjectProps>, 
        character: THREE.Group, animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer, currAction: string, animations: InteractionAnimProps[]
    ): Promise<void> {
        this.attachableObjs = attachableObjects;
        this.character = character;

        const currCameraPos = camera.position.clone();
        const currCameraOri = camera.quaternion.clone();

        const currCharacterPos = character.position.clone();
        const currCharacterOri = character.quaternion.clone();  
        
        character.position.copy(characterPos);
        character.quaternion.copy(characterRot);

        await this.interpolateCamera(camera, intCameraPos, intCameraQuat);

        await this.interpolateCamera(camera, destCameraPos, destCameraQuat);

        const currentAction = animationMap.get(currAction);
        currentAction?.fadeOut(0.2);

        await this.playAttachingAnimation(
            animations[0].animName, 
            animations[0].loop, 
            animations[0].repeatCount, 
            animationMap, mixer
        );

        await this.playAnimation(
            animations[1].animName, 
            animations[1].loop, 
            animations[1].repeatCount, 
            animationMap, mixer
        );

        await this.playDetachingAnimation(
            animations[2].animName, 
            animations[2].loop, 
            animations[2].repeatCount, 
            animationMap, mixer
        );

        currentAction?.reset().fadeIn(0.2).play();

        await this.interpolateCamera(camera, intCameraPos, intCameraQuat);

        character.position.copy(currCharacterPos);
        character.quaternion.copy(currCharacterOri);

        await this.interpolateCamera(camera, currCameraPos, currCameraOri);
    }

    private playAttachingAnimation(animName: string, mode: THREE.AnimationActionLoopStyles, repetitions: number, 
        animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer): Promise<void> {
        return new Promise((resolve) => {
            const action = animationMap.get(animName);
            if (!action) {
                console.warn(`Animation '${animName}' not found`);
                resolve();
                return;
            }
            action.setLoop(mode, repetitions);
            action.reset().fadeIn(0.2).play();

            const getFrameIndex = (action: THREE.AnimationAction, frameCount: number) => {
                let animationTime = action.time
            
                return Math.round(animationTime / action.getClip().duration * frameCount)
            }

            const interval = setInterval(() => {
                const currentFrame = getFrameIndex(action, 300);
                
                if (currentFrame >= 80) {
                    this.attachableObjs.forEach((value, key) => {
                        const bone = this.character.getObjectByName(key);
                        if (bone) {
                            value.object.scale.copy(value.scale);
                            value.object.position.copy(value.position);
                            value.object.rotation.copy(value.rotation);
                            bone.add(value.object);
                        }
                    });
                    clearInterval(interval); // Stop checking after attachment
                }
            }, 50); // Adjust interval for better precision
    
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

    private playDetachingAnimation(animName: string, mode: THREE.AnimationActionLoopStyles, repetitions: number, 
        animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer): Promise<void> {
        return new Promise((resolve) => {
            const action = animationMap.get(animName);
            if (!action) {
                console.warn(`Animation '${animName}' not found`);
                resolve();
                return;
            }
            action.setLoop(mode, repetitions);
            action.reset().fadeIn(0.2).play();

            const getFrameIndex = (action: THREE.AnimationAction, frameCount: number) => {
                let animationTime = action.time
            
                return Math.round(animationTime / action.getClip().duration * frameCount)
            }

            const interval = setInterval(() => {
                const currentFrame = getFrameIndex(action, 300);
                
                if (currentFrame >= 300 - 80) {
                    this.attachableObjs.forEach((value, key) => {
                        const bone = this.character.getObjectByName(key);
                        if (bone) {
                            bone.remove(value.object);
                        }
                    });
                    clearInterval(interval); // Stop checking after attachment
                }
            }, 50); // Adjust interval for better precision
    
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

    protected override playAnimation(animName: string, mode: THREE.AnimationActionLoopStyles, repetitions: number, 
        animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer): Promise<void> {
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

export default SquatInteractionSequence;
