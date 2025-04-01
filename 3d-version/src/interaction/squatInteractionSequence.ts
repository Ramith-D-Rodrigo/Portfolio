import BaseInteractionSequence from "./baseInteractionSequence";
import * as THREE from 'three';
import { AttachableObjectProps, InteractionAnimProps } from "./interactionBuilder";
import InteractionDescHUD from "./interactionDesHUD";

class SquatInteractionSequence extends BaseInteractionSequence {
    private attachableObjs:  Map<string, AttachableObjectProps>;
    private character: THREE.Group;

    public override async playSequence(characterPos: THREE.Vector3, characterRot: THREE.Quaternion, 
        camera: THREE.Camera, destCameraPos: THREE.Vector3, destCameraQuat: THREE.Quaternion, attachableObjects: Map<string, AttachableObjectProps>, 
        character: THREE.Group, animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer, currAction: string, animations: InteractionAnimProps[]
    ): Promise<void> {
        this.attachableObjs = attachableObjects;
        this.character = character;

        await this.setupForCharacterAndCamera(camera, destCameraPos, destCameraQuat, character, characterPos, characterRot);

        this.attachableObjs.forEach((value, key) => {
            character.parent?.add(value.object);
            value.object.position.set(-4.9, 0, 5.1);
            value.object.rotation.set(0, 0, 0);
            value.object.scale.set(1,1,1);
        });

        await this.fadeOut();

        const currentAction = animationMap.get(currAction);
        currentAction?.fadeOut(0.2);

        await this.playAttachingAnimation(
            animations[0],
            animationMap, mixer
        );

        await this.playAnimation(
            animations[1], 
            animationMap, mixer
        );

        await this.playDetachingAnimation(
            animations[2], 
            animationMap, mixer
        );

        currentAction?.reset().fadeIn(0.2).play();

        await this.fadeIn();

        this.attachableObjs.forEach((value, key) => {
            character.parent?.remove(value.object);
        });

        await this.resetCharacterAndCamera(camera, character);
    }

    private playAttachingAnimation(animProps: InteractionAnimProps, animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer): Promise<void> {
        return new Promise((resolve) => {
            const action = animationMap.get(animProps.animName);
            if (!action) {
                console.warn(`Animation '${animProps.animName}' not found`);
                resolve();
                return;
            }
            let repetitions = animProps.displayTextList.length;
            if(repetitions > 1){
                action.setLoop(THREE.LoopRepeat, repetitions);
            }
            else{
                action.setLoop(THREE.LoopOnce, 0);
            }
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

    private playDetachingAnimation(animProps: InteractionAnimProps, animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer): Promise<void> {
        return new Promise((resolve) => {
            const action = animationMap.get(animProps.animName);
            if (!action) {
                console.warn(`Animation '${animProps.animName}' not found`);
                resolve();
                return;
            }
            let repetitions = animProps.displayTextList.length;
            if(repetitions > 1){
                action.setLoop(THREE.LoopRepeat, repetitions);
            }
            else{
                action.setLoop(THREE.LoopOnce, 0);
            }
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
                            this.character.parent?.add(value.object);
                            value.object.position.set(-4.9, 0, 5.1);
                            value.object.rotation.set(0, 0, 0);
                            value.object.scale.set(1,1,1);
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

    protected override playAnimation(animProps: InteractionAnimProps, animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer): Promise<void> {
        return new Promise((resolve) => {
            const action = animationMap.get(animProps.animName);
            if (!action) {
                console.warn(`Animation '${animProps.animName}' not found`);
                resolve();
                return;
            }

            let displayIdx = 0;
            const loopFunc = () => {
                InteractionDescHUD.getInstance().setDisplayText(animProps.displayTextList[displayIdx++], animProps.displayTextDur);
            }

            loopFunc();

            let repetitions = animProps.displayTextList.length;
            if(repetitions > 1){
                action.setLoop(THREE.LoopRepeat, repetitions);
                mixer.addEventListener('loop',loopFunc);
            }
            else{
                action.setLoop(THREE.LoopOnce, 0);
            }
            action.reset().fadeIn(0.2).play();

            
            if(repetitions > 1){
                mixer.addEventListener('loop',loopFunc);
            }
    
            // Listen for animation completion
            mixer.addEventListener('finished', (event) => {
                if (event.action === action) {
                    if(repetitions > 1){
                        mixer.removeEventListener('loop', loopFunc);
                    }

                    action.fadeOut(0.2);
                    resolve();
                }
            });

            action.clampWhenFinished = true;
        });
    }
}

export default SquatInteractionSequence;
