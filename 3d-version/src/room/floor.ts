import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { customizeTexture } from '../utils/utils';

const STRING_PREFIX = 'assets/textures/floor/carpet1-';

const createFloor = (width: number, height: number, 
    xPos: number, yPos: number, zPos: number,
    xRot: number, yRot: number, zRot: number,
    xScale: number, yScale: number, zScale: number,
    textureLoader: THREE.TextureLoader) => {
    const albedoTexture = textureLoader.load(STRING_PREFIX + 'albedo.png');
    const aoTexture = textureLoader.load(STRING_PREFIX + 'ao.png');
    const heightTexture = textureLoader.load(STRING_PREFIX + 'Height.png');
    const normalTexture = textureLoader.load(STRING_PREFIX + 'Normal-ogl.png');
    normalTexture.flipY = false;  // Inverts the Y-axis, making it compatible with OpenGL

    customizeFloorTexture(albedoTexture);
    customizeFloorTexture(aoTexture);
    customizeFloorTexture(heightTexture);
    customizeFloorTexture(normalTexture);

    const floorGeometry = new THREE.PlaneGeometry(width, height);
    const floorMaterial = new THREE.MeshPhongMaterial({ 
        map: albedoTexture,              // Albedo (Base Color)
        aoMap: aoTexture,                // Ambient Occlusion
        normalMap: normalTexture,        // Normal Map
        side: THREE.DoubleSide,          // If the wall has two sides
        bumpMap: heightTexture
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.castShadow = true;
    floor.receiveShadow = true;
    floor.position.x = xPos;
    floor.position.y = yPos;
    floor.position.z = zPos;
    floor.rotation.x = xRot;
    floor.rotation.y = yRot;
    floor.rotation.z = zRot;
    floor.scale.set(xScale, yScale, zScale);

    return floor;
}

const customizeFloorTexture = (texture: THREE.Texture) => {
    customizeTexture(texture, THREE.RepeatWrapping, THREE.RepeatWrapping, 15, 15, 0, 0);
}

const createFloorPhysics = (mass: number,
    xPosition: number, yPosition: number, zPosition: number,
    xRotation: number, yRotation: number, zRotation: number,
    xScale: number, yScale: number, zScale: number
) => {
    const size = new CANNON.Vec3(xScale, yScale, zScale);
    const floorBody = new CANNON.Body({
        mass: mass,
        shape: new CANNON.Box(size),
    });
    floorBody.position.set(xPosition, yPosition, zPosition);
    floorBody.quaternion.setFromEuler(xRotation, yRotation, zRotation);

    return floorBody;
}

export { createFloor, createFloorPhysics };
