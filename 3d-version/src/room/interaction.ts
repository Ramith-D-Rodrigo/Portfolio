import * as THREE from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader";
import { Utils } from "../utils/utils";

class Interaction {
    private static font: Font;
    private static scene: THREE.Scene;
    private static camera: THREE.Camera;
    private textSprite: THREE.Sprite | null = null;
    private interactionText: string;

    public constructor(interactionText: string) {
        this.interactionText = interactionText;
    }

    public displayInteractionText(): void {
        const el = document.querySelector("#interaction") as HTMLElement;
        el.innerText = this.interactionText;
        el.style.display = 'block';
    }

    public hideInteractionText(): void {
        const el = document.querySelector("#interaction") as HTMLElement;
        el.style.display = 'none';
    }

    public interact(): void {
        console.log(`Interacted with: ${this.interactionText}`);
    }
}

export default Interaction;
