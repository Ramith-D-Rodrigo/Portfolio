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

    public constructor(interactionText: string) {
        this.interactionText = interactionText;
        this.domElement = document.createElement("div");
        this.domElement.className = 'interaction';
        this.domElement.innerText = this.interactionText;
        document.body.appendChild(this.domElement);
    }

    public display(): void {
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
        console.log(`Interacted with: ${this.interactionText}`);
    }
}

export default Interaction;
