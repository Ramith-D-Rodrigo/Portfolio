import * as THREE from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader";
import { Utils } from "../utils/utils";
import { HUDComponent } from "../other/hudComponent";

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

    public constructor(interactionText: string, animations: string[]) {
        this.interactionText = interactionText;
        this.animations = animations;
        this.domElement = document.createElement("div");
        this.domElement.className = 'interaction';
        this.domElement.innerText = this.interactionText;
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

    public interact(): void {
        this.isInteracting = true;
        this.hide();
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
