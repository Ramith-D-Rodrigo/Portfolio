import * as THREE from "three";

// Load the textures
const STRING_PREFIX = 'vinyl-siding_';

const createWall = (width: number, height: number, 
    xPos: number, yPos: number, zPos: number,
    xRot: number, yRot: number, zRot: number,
    textureLoader: THREE.TextureLoader
    ) => {
    const albedoTexture = textureLoader.load('./textures/wall/' + STRING_PREFIX + 'albedo.png');
    const aoTexture = textureLoader.load('./textures/wall/' + STRING_PREFIX + 'ao.png');
    const heightTexture = textureLoader.load('./textures/wall/' + STRING_PREFIX + 'height.png');
    const metallicTexture = textureLoader.load('./textures/wall/' + STRING_PREFIX + 'metallic.png');
    const normalTexture = textureLoader.load('./textures/wall/' + STRING_PREFIX + 'normal-ogl.png');
    normalTexture.flipY = false;  // Inverts the Y-axis, making it compatible with OpenGL
    const roughnessTexture = textureLoader.load('./textures/wall/' + STRING_PREFIX + 'roughness.png');
    
    // Create the material
    const wallMaterial = new THREE.MeshStandardMaterial({
        map: albedoTexture,              // Albedo (Base Color)
        aoMap: aoTexture,                // Ambient Occlusion
        metalnessMap: metallicTexture,   // Metallic
        normalMap: normalTexture,        // Normal Map
        roughnessMap: roughnessTexture,  // Roughness
        side: THREE.DoubleSide,          // If the wall has two sides
        metalness: 1.0,                  // Optional: Adjust overall metallic level
        roughness: 0.5,                  // Optional: Adjust overall roughness level
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

export { createWall };
