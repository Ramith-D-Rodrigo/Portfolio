import * as THREE from 'three';
import { customizeTexture } from '../utils/utils';

const createCeiling = (xPos: number, yPos: number, zPos: number,
    xRot: number, yRot: number, zRot: number,
    textureLoader: THREE.TextureLoader) => {
    // load ceiling texture
    const CEILING_STRING_PREFIX = 'OfficeCeiling002_1K-JPG_';
    const ceilingAoTexture = textureLoader.load('assets/textures/ceiling/' + CEILING_STRING_PREFIX + 'AmbientOcclusion.jpg');
    const ceilingAlbedoTexture = textureLoader.load('assets/textures/ceiling/' + CEILING_STRING_PREFIX + 'Color.jpg');
    const ceilingEmissiveTexture = textureLoader.load('assets/textures/ceiling/' + CEILING_STRING_PREFIX + 'Emission.jpg');
    const ceilingMetallicTexture = textureLoader.load('assets/textures/ceiling/' + CEILING_STRING_PREFIX + 'Metalness.jpg');
    const ceilingNormalTexture = textureLoader.load('assets/textures/ceiling/' + CEILING_STRING_PREFIX + 'NormalGL.jpg');
    ceilingNormalTexture.flipY = false;  // Inverts the Y-axis, making it compatible with OpenGL
    const ceilingRoughnessTexture = textureLoader.load('assets/textures/ceiling/' + CEILING_STRING_PREFIX + 'Roughness.jpg');

    // Customize the ceiling textures
    customizeCeilingTexture(ceilingAoTexture);
    customizeCeilingTexture(ceilingAlbedoTexture);
    customizeCeilingTexture(ceilingEmissiveTexture);
    customizeCeilingTexture(ceilingMetallicTexture);
    customizeCeilingTexture(ceilingNormalTexture);
    customizeCeilingTexture(ceilingRoughnessTexture);

    const ceilingGeometry = new THREE.PlaneGeometry(20, 20);
    const ceilingMaterial = new THREE.MeshStandardMaterial({
        map: ceilingAlbedoTexture,
        aoMap: ceilingAoTexture,
        emissiveMap: ceilingEmissiveTexture,
        emissiveIntensity: 5.0,
        emissive: 0xffffff,
        metalnessMap: ceilingMetallicTexture,
        normalMap: ceilingNormalTexture,
        roughnessMap: ceilingRoughnessTexture,
        side: THREE.DoubleSide,
        metalness: 1.0,
        roughness: 0.5,
    });

    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

    ceiling.position.x = xPos;
    ceiling.position.y = yPos;
    ceiling.position.z = zPos;
    ceiling.rotation.x = xRot;
    ceiling.rotation.y = yRot;
    ceiling.rotation.z = zRot;

    return ceiling;
}

const customizeCeilingTexture = (texture: THREE.Texture) => {
    customizeTexture(texture, THREE.RepeatWrapping, THREE.RepeatWrapping, 2, 2, 0.18, -0.19);
}

const addCeilingLights = (scene: THREE.Scene) => {
    const rows = 4;
    const cols = 4;
    const width = 20;
    const height = 20;
    const spacingX = width / (cols + 0.08);
    const spacingZ = height / (rows + 0.08);
    const xOffset = -2.4;
    const zOffset = -2.4;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const x = -width / 2 + (j + 1) * spacingX + xOffset;
            const z = -height / 2 + (i + 1) * spacingZ + zOffset;
            
            const pointLight = new THREE.PointLight(0xffffff, 4, 10); // White light, medium intensity
            //pointLight.castShadow = true;
            pointLight.position.set(x, 9.8, z); // Slightly below the ceiling
            scene.add(pointLight);
        }
    }
}

export { createCeiling, addCeilingLights };
