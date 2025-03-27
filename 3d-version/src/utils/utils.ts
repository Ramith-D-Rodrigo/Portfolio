import * as THREE from 'three';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader';

const customizeTexture = (texture: THREE.Texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    texture.offset.set(0.2, -0.2);
};

class Utils {
    private static fontLoader: FontLoader = new FontLoader();

    public static async loadFont(fontLoc: string): Promise<Font> {
        return Utils.fontLoader.loadAsync(fontLoc); 
    }
}

export { customizeTexture, Utils };
