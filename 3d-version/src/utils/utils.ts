import * as THREE from 'three';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader';

const customizeTexture = (texture: THREE.Texture, wrapS: THREE.Wrapping, wrapT: THREE.Wrapping, repeatU: number, repeatV: number, offsetX: number, offsetY: number) => {
    texture.wrapS = wrapS;
    texture.wrapT = wrapT;
    texture.repeat.set(repeatU, repeatV);
    texture.offset.set(offsetX, offsetY);
};

class Utils {
    private static fontLoader: FontLoader = new FontLoader();

    public static async loadFont(fontLoc: string): Promise<Font> {
        return Utils.fontLoader.loadAsync(fontLoc); 
    }
}

export { customizeTexture, Utils };
