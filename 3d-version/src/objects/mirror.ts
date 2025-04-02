import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector';

const createMirror = (width: number, height: number, position: THREE.Vector3, rotation: THREE.Euler, color: THREE.ColorRepresentation) : Reflector => {
    const mirrorGeometry = new THREE.PlaneGeometry(width, height);
    // Create the reflective surface
    const resolutionFactor = 0.8;
    const reflector = new Reflector(mirrorGeometry, {
        color: color,
        textureWidth: window.innerWidth * window.devicePixelRatio * resolutionFactor,
        textureHeight: window.innerHeight * window.devicePixelRatio * resolutionFactor,
    });
    
    reflector.position.set(position.x, position.y, position.z);  // Position the mirror
    reflector.rotation.set(rotation.x, rotation.y, rotation.z);  // Rotate the mirror

    return reflector;
}

export { createMirror };
