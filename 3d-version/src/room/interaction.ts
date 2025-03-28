import * as THREE from "three";
import { HUDComponent } from "../other/hudComponent";
import gsap from "gsap";
import { AttachableObjectProps } from "../other/interactionBuilder";

class Interaction implements HUDComponent {
    private isVisible: boolean = false;
    private domElement: HTMLElement;
    private animations: string[];
    private isInteracting: boolean = false;

    private intermediateCameraPos: THREE.Vector3 = new THREE.Vector3(0, 0, 0);;
    private intermediateCameraRot: THREE.Quaternion = new THREE.Quaternion(0, 0, 0, 1);

    private destCameraPos: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    private destCameraOri: THREE.Quaternion = new THREE.Quaternion(0, 0, 0, 1);

    private attachableObjects: Map<string, AttachableObjectProps> = new Map();

    public constructor() {
        this.domElement = document.createElement("div");
        this.domElement.className = 'interaction';

        document.body.appendChild(this.domElement);
    }

    public setIntermediateCameraTransform(intCameraPos: THREE.Vector3, intCameraRot: THREE.Quaternion): void {
        this.intermediateCameraPos = intCameraPos;
        this.intermediateCameraRot = intCameraRot;
    }

    public setDestCameraTransform(destCameraPos: THREE.Vector3, destCameraRot: THREE.Quaternion): void {
        this.destCameraPos = destCameraPos;
        this.destCameraOri = destCameraRot;
    }

    public setDisplayText(displayText: string): void{
        this.domElement.innerText = "Press F to " + displayText;
    }

    public setAnimations(animations: string[]): void{
        this.animations = animations;
    }

    public setIsVisible(val: boolean): void{
        this.isVisible = val;
    }

    public getIsVisible(): boolean {
        return this.isVisible;
    }

    public addAttachableObject(attachingBoneName: string, modelProps: AttachableObjectProps): void {
        this.attachableObjects.set(attachingBoneName, modelProps);
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

    public async interact(camera: THREE.Camera, animationMap: Map<string, THREE.AnimationAction>, mixer: THREE.AnimationMixer, currAction: string, character: THREE.Group): Promise<void> {
        if (this.animations.length === 0) return;

        const currCameraPos = camera.position.clone();
        const currCameraOri = camera.quaternion.clone();
        this.isInteracting = true;
        this.hide();

        // Attach the objects to the character model bone
        this.attachableObjects.forEach((value, key) => {
            const bone = character.getObjectByName(key);
            if(bone){
                bone.add(value.object);
                value.object.position.set(value.position.x, value.position.y, value.position.z);
                value.object.rotation.set(value.rotation.x, value.rotation.y, value.rotation.z);
                value.object.scale.set(value.scale.x, value.scale.y, value.scale.z)
            }
        });

        await new Promise((resolve) => {
            gsap.to(camera.position, {
                x: this.intermediateCameraPos.x,
                y: this.intermediateCameraPos.y,
                z: this.intermediateCameraPos.z,
                duration: 0.5,
                ease: "power2.inOut",
            });
            gsap.to(camera.quaternion, {
                x: this.intermediateCameraRot.x,
                y: this.intermediateCameraRot.y,
                z: this.intermediateCameraRot.z,
                w: this.intermediateCameraRot.w,
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: resolve,
            });
        });

        await new Promise((resolve) => {
            gsap.to(camera.position, {
                x: this.destCameraPos.x,
                y: this.destCameraPos.y,
                z: this.destCameraPos.z,
                duration: 1.0,
                ease: "power2.inOut",
            });
            gsap.to(camera.quaternion, {
                x: this.destCameraOri.x,
                y: this.destCameraOri.y,
                z: this.destCameraOri.z,
                w: this.destCameraOri.w,
                duration: 1.0,
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
                x: this.intermediateCameraPos.x,
                y: this.intermediateCameraPos.y,
                z: this.intermediateCameraPos.z,
                duration: 1.0,
                ease: "power2.inOut",
            });
            gsap.to(camera.quaternion, {
                x: this.intermediateCameraRot.x,
                y: this.intermediateCameraRot.y,
                z: this.intermediateCameraRot.z,
                w: this.intermediateCameraRot.w,
                duration: 1.0,
                ease: "power2.inOut",
                onComplete: resolve,
            });
        });

        await new Promise((resolve) => {
            gsap.to(camera.position, {
                x: currCameraPos.x,
                y: currCameraPos.y,
                z: currCameraPos.z,
                duration: 0.5,
                ease: "power2.inOut",
            });
            gsap.to(camera.quaternion, {
                x: currCameraOri.x,
                y: currCameraOri.y,
                z: currCameraOri.z,
                w: currCameraOri.w,
                duration: 0.5,
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
