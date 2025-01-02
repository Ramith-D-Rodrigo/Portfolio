import * as THREE from 'three';

const customizeTexture = (texture: THREE.Texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    texture.offset.set(0.2, -0.2);
};

export { customizeTexture };
