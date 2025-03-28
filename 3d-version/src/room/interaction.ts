import * as THREE from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader";
import { Utils } from "../utils/utils";
import { HUDComponent } from "../other/hudComponent";
import gsap from "gsap";

class Interaction implements HUDComponent {
    private static font: Font;
    private static scene: THREE.Scene;
    private static camera: THREE.Camera;
    private textSprite: THREE.Sprite | null = null;
    private interactionText: string;
    private isVisible: boolean = false;
    private domElement: HTMLElement;
    private animations: string[];
    private isInteracting: boolean = false;
    private cameraPos: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    private cameraOri: THREE.Quaternion = new THREE.Quaternion(0, 0, 0, 1);

    public constructor(interactionText: string, animations: string[]) {
        this.interactionText = interactionText;
        this.animations = animations;
        this.domElement = document.createElement("div");
        this.domElement.className = 'interaction';
        this.domElement.innerText = "Press F to " + this.interactionText;
        document.body.appendChild(this.domElement);
    }

    public display(): void {
        if(this.isInteracting){
            return;
        }
        this.domElement.classList.add('visible');
    }

    public hide(): void {
        this.domElement.classList.remove('visible');
    }

    public setIsVisible(val: boolean): void{
        this.isVisible = val;
    }

    public getIsVisible(): boolean {
        return this.isVisible;
    }

    public async interact(camera: THREE.Camera, animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer, currAction: string): Promise<void> {
        if (this.animations.length === 0) return;

        const currCameraPos = camera.position.clone();
        const currCameraOri = camera.quaternion.clone();
        this.isInteracting = true;
        this.hide();

        await new Promise((resolve) => {
            gsap.to(camera.position, {
                x: this.cameraPos.x,
                y: this.cameraPos.y,
                z: this.cameraPos.z,
                duration: 1.5,
                ease: "power2.inOut",
            });
            gsap.to(camera.quaternion, {
                x: this.cameraOri.x,
                y: this.cameraOri.y,
                z: this.cameraOri.z,
                w: this.cameraOri.w,
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: resolve,
            });
        });
    
        const currentAction = animationMap.get(currAction);
        currentAction?.fadeOut(0.2);
    
        for (let i = 0; i < this.animations.length; i++) {
            if(i === 0 || i === this.animations.length - 1){
                await this.playAnimation(this.animations[i], THREE.LoopOnce, 1, animationMap, mixer);
            }
            else{
                await this.playAnimation(this.animations[i], THREE.LoopRepeat, 10, animationMap, mixer);
            }
        }
    
        currentAction?.reset().fadeIn(0.2).play();

        await new Promise((resolve) => {
            gsap.to(camera.position, {
                x: currCameraPos.x,
                y: currCameraPos.y,
                z: currCameraPos.z,
                duration: 1.5,
                ease: "power2.inOut",
            });
            gsap.to(camera.quaternion, {
                x: currCameraOri.x,
                y: currCameraOri.y,
                z: currCameraOri.z,
                w: currCameraOri.w,
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: resolve,
            });
        });

        this.stopInteract();
    }

    private playAnimation(animName: string, mode: THREE.AnimationActionLoopStyles, repetitions: number, 
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

    public stopInteract(): void {
        this.isInteracting = false;
        this.display();
    }

    public getAnimations(): string[]{
        return this.animations;
    }
}

export default Interaction;
