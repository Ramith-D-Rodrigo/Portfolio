import * as THREE from 'three';
import BaseInteractionSequence from "./baseInteractionSequence";
import { AttachableObjectProps, InteractionAnimProps } from "./interactionBuilder";
import InteractionDescHUD from "./interactionDesHUD";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { createObjectFromGLTF, loadGLTFModel } from '../objects/model';

type SkillTransform = {
    name: string;
    position: THREE.Vector3,
    rotation: THREE.Euler,
    scale: THREE.Vector3
}

class SkillViewInteractionSequence extends BaseInteractionSequence {
    public override async playSequence(characterPos: THREE.Vector3, characterRot: THREE.Quaternion,
        camera: THREE.Camera, destCameraPos: THREE.Vector3, destCameraQuat: THREE.Quaternion, attachableObjects: Map<string, AttachableObjectProps>, 
        character: THREE.Group, animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer, currAction: string, animations: InteractionAnimProps[]
    ): Promise<void> {
        await this.setupForCharacterAndCamera(camera, destCameraPos, destCameraQuat, character, characterPos, characterRot);
        const characterParent = character.parent;
        character.parent?.remove(character);
        await this.fadeOut();

        const currentAction = animationMap.get(currAction);
        currentAction?.fadeOut(0.2);

        await new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 5000);
        });

        currentAction?.reset().fadeIn(0.2).play();
        await this.fadeIn();
        characterParent?.add(character);
        await this.resetCharacterAndCamera(camera, character);
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

export type {SkillTransform};
export default SkillViewInteractionSequence;
