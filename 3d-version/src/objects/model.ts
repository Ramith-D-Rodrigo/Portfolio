import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as CANNON from "cannon-es";

const loadGLTFModel = async (path: string, gltfLoader: GLTFLoader) => {
    const gltf = await gltfLoader.loadAsync(path,
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); // Loading progress
        }
    );

    gltf.scene.traverse((obj)=> {
        if ( obj.isObject3D ){
            obj.castShadow = true;
            obj.receiveShadow = true;
        }
    })
    return gltf;
}

const createObjectFromGLTF = (gltf: GLTF, xPos: number, yPos: number, zPos: number,
    xRot: number, yRot: number, zRot: number,
    xScale: number, yScale: number, zScale: number) => {
    const model = gltf.scene.clone();
    model.scale.set(xScale, yScale, zScale); // Optional: Scale your model
    model.position.set(xPos, yPos, zPos);
    model.rotation.set(xRot, yRot, zRot);

    return model;
}

const createObjectPhysics = ( mass: number,
    xPosition: number, yPosition: number, zPosition: number,
    xRotation: number, yRotation: number, zRotation: number,
    xScale: number, yScale: number, zScale: number
) => {
    const size = new CANNON.Vec3(xScale, yScale, zScale);
    const objBody = new CANNON.Body({
        mass: mass,
        shape: new CANNON.Box(size),
    });
    objBody.position.set(xPosition, yPosition, zPosition);
    objBody.quaternion.setFromEuler(xRotation, yRotation, zRotation);

    return objBody;
}

export { loadGLTFModel, createObjectFromGLTF, createObjectPhysics };
