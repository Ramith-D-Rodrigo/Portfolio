import BaseInteractionSequence from "./baseInteractionSequence";
import * as THREE from 'three';
import { AttachableObjectProps, InteractionAnimProps } from './interactionBuilder';
import InteractionDescHUD from "./interactionDesHUD";

class WarmupInteractionSequence extends BaseInteractionSequence {
    public override async playSequence(characterPos: THREE.Vector3, characterRot: THREE.Quaternion,
        camera: THREE.Camera, destCameraPos: THREE.Vector3, destCameraQuat: THREE.Quaternion, attachableObjects: Map<string, AttachableObjectProps>, 
        character: THREE.Group, animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer, currAction: string, animations: InteractionAnimProps[]
    ): Promise<void> {
        await this.setupForCharacterAndCamera(camera, destCameraPos, destCameraQuat, character, characterPos, characterRot);
        await this.fadeOut();

        const currentAction = animationMap.get(currAction);
        currentAction?.fadeOut(0.2);

        for (let i = 0; i < animations.length; i++) {
            await this.playAnimation(
                animations[i],
                animationMap, mixer
            );
        }

        currentAction?.reset().fadeIn(0.2).play();

        await this.fadeIn();
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
                const { title, description, list } = animProps.displayTextList[displayIdx++];
                const formattedText = `
                <div class="interaction-title">${title}</div>
                `;
                InteractionDescHUD.getInstance().setDisplayText(formattedText, animProps.displayTextDur);
            }

            let repetitions = animProps.displayTextList.length;
            if(repetitions > 1){
                loopFunc();
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
};

export default WarmupInteractionSequence;
