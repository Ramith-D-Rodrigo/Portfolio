import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const loadGLTFModel = async (path: string, gltfLoader: GLTFLoader) => {
    const gltf = await gltfLoader.loadAsync(path,
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); // Loading progress
        }
    );
    return gltf;
}

const createObjectFromGLTF = (gltf: GLTF, xPos: number, yPos: number, zPos: number,
    xRot: number, yRot: number, zRot: number,
    xScale: number, yScale: number, zScale: number) => {
    const model = gltf.scene;
    model.scale.set(xScale, yScale, zScale); // Optional: Scale your model
    model.position.set(xPos, yPos, zPos);
    model.rotation.set(xRot, yRot, zRot);

    return model;
}

export { loadGLTFModel, createObjectFromGLTF };
