import * as THREE from "three";
import * as CANNON from "cannon-es";
import { customizeTexture } from "../utils/utils";

// Load the textures
const STRING_PREFIX = 'assets/textures/wall_new/fiber-textured-wall1_';

const createWall = (width: number, height: number, 
    xPos: number, yPos: number, zPos: number,
    xRot: number, yRot: number, zRot: number,
    textureLoader: THREE.TextureLoader
    ) => {
    const albedoTexture = textureLoader.load(STRING_PREFIX + 'albedo.png');
    const aoTexture = textureLoader.load(STRING_PREFIX + 'ao.png');
    const heightTexture = textureLoader.load(STRING_PREFIX + 'height.png');
    const normalTexture = textureLoader.load(STRING_PREFIX + 'normal-ogl.png');
    normalTexture.flipY = false;  // Inverts the Y-axis, making it compatible with OpenGL

    customizeWallTexture(albedoTexture);
    customizeWallTexture(aoTexture);
    customizeWallTexture(heightTexture);
    customizeWallTexture(normalTexture);
    
    // Create the material
    const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0xf7f1e1,
        map: albedoTexture,              // Albedo (Base Color)
        aoMap: aoTexture,                // Ambient Occlusion
        normalMap: normalTexture,        // Normal Map
        side: THREE.DoubleSide,          // If the wall has two sides
        bumpMap: heightTexture
    });

    const wallGeometry = new THREE.PlaneGeometry(width, height);
    const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWall.position.x = xPos;
    leftWall.position.y = yPos;
    leftWall.position.z = zPos;
    leftWall.rotation.x = xRot;
    leftWall.rotation.y = yRot;
    leftWall.rotation.z = zRot;

    return leftWall;
}

const customizeWallTexture = (texture: THREE.Texture) => {
    customizeTexture(texture, THREE.RepeatWrapping, THREE.RepeatWrapping, 15, 15, 0, 0);
}

const createWallPhysics = ( mass: number,
    xPosition: number, yPosition: number, zPosition: number,
    xRotation: number, yRotation: number, zRotation: number,
    xScale: number, yScale: number, zScale: number
) => {
    const size = new CANNON.Vec3(xScale, yScale, zScale);
    const wallBody = new CANNON.Body({
        mass: mass,
        shape: new CANNON.Box(size),
    });
    wallBody.position.set(xPosition, yPosition, zPosition);
    wallBody.quaternion.setFromEuler(xRotation, yRotation, zRotation);

    return wallBody;
}

export { createWall, createWallPhysics };
