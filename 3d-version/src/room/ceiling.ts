import * as THREE from 'three';
import { customizeTexture } from '../utils/utils';

const createCeiling = (xPos: number, yPos: number, zPos: number,
    xRot: number, yRot: number, zRot: number,
    textureLoader: THREE.TextureLoader) => {
    // load ceiling texture
    const CEILING_STRING_PREFIX = 'OfficeCeiling002_1K-JPG_';
    const ceilingAoTexture = textureLoader.load('./textures/ceiling/' + CEILING_STRING_PREFIX + 'AmbientOcclusion.jpg');
    const ceilingAlbedoTexture = textureLoader.load('./textures/ceiling/' + CEILING_STRING_PREFIX + 'Color.jpg');
    const ceilingEmissiveTexture = textureLoader.load('./textures/ceiling/' + CEILING_STRING_PREFIX + 'Emission.jpg');
    const ceilingMetallicTexture = textureLoader.load('./textures/ceiling/' + CEILING_STRING_PREFIX + 'Metalness.jpg');
    const ceilingNormalTexture = textureLoader.load('./textures/ceiling/' + CEILING_STRING_PREFIX + 'NormalGL.jpg');
    ceilingNormalTexture.flipY = false;  // Inverts the Y-axis, making it compatible with OpenGL
    const ceilingRoughnessTexture = textureLoader.load('./textures/ceiling/' + CEILING_STRING_PREFIX + 'Roughness.jpg');

    // Customize the ceiling textures
    customizeTexture(ceilingAoTexture);
    customizeTexture(ceilingAlbedoTexture);
    customizeTexture(ceilingEmissiveTexture);
    customizeTexture(ceilingMetallicTexture);
    customizeTexture(ceilingNormalTexture);
    customizeTexture(ceilingRoughnessTexture);

    const ceilingGeometry = new THREE.PlaneGeometry(20, 20);
    const ceilingMaterial = new THREE.MeshStandardMaterial({
        map: ceilingAlbedoTexture,
        aoMap: ceilingAoTexture,
        emissiveMap: ceilingEmissiveTexture,
        emissiveIntensity: 1.0,
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

export { createCeiling };
