import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createMirror } from "../objects/mirror";
import { createCeiling } from "./ceiling";
import { createFloor, createFloorPhysics } from "./floor";
import { createWall, createWallPhysics } from "./wall";
import * as THREE from "three";
import { createObjectFromGLTF, loadGLTFModel } from "../objects/model";
import * as CANNON from 'cannon-es';

const setupWalls = (textureLoader: THREE.TextureLoader, scene: THREE.Scene, world: CANNON.World) => {
    // 3 Walls (left, right, back)
    const leftWall = createWall(20, 10, -10, 5, 0, 0, Math.PI / 2, 0, textureLoader);
    scene.add(leftWall);

    const leftWallPhysics = createWallPhysics(0, -10, 5, 0, 0, Math.PI / 2, 0);
    world.addBody(leftWallPhysics);

    const rightWall = createWall(20, 10, 10, 5, 0, 0, -Math.PI / 2, 0, textureLoader);
    scene.add(rightWall);

    const rightWallPhysics = createWallPhysics(0, 10, 5, 0, 0, -Math.PI / 2, 0);
    world.addBody(rightWallPhysics);

    const backWall = createWall(20, 10, 0, 5, -10, 0, 0, 0, textureLoader);
    scene.add(backWall);

    const backWallPhysics = createWallPhysics(0, 0, 5, -10, 0, 0, 0);
    world.addBody(backWallPhysics);
}

const setupCeiling = (textureLoader: THREE.TextureLoader, scene: THREE.Scene) => {
    // Create a ceiling
    const ceiling = createCeiling(0, 10, 0, -Math.PI / 2, 0, 0, textureLoader);
    scene.add(ceiling);
}

const setupFloor = (scene: THREE.Scene, world: CANNON.World) => {
    const floor = createFloor(20, 20, 0, 0, 0, -Math.PI / 2, 0, 0, 1, 1, 1);
    scene.add(floor);

    const floorPhysics = createFloorPhysics(0, 0, 0, 0, -Math.PI / 2, 0, 0);
    world.addBody(floorPhysics);
}

const setupMirrors = (scene: THREE.Scene) => {
    const reflector = createMirror(4, 6, new THREE.Vector3(9.999, 3, -7), new THREE.Euler(0, -Math.PI / 2, 0), 0xffffff);
    const reflector2 = createMirror(4, 6, new THREE.Vector3(9.999, 3, -2), new THREE.Euler(0, -Math.PI / 2, 0), 0xffffff);
    const longMirror = createMirror(6, 6, new THREE.Vector3(9.999, 3, 5), new THREE.Euler(0, -Math.PI / 2, 0), 0xffffff);
    scene.add(reflector);
    scene.add(reflector2);
    scene.add(longMirror);
}

const setupGymEquipment = async (scene: THREE.Scene, loader: GLTFLoader) => {
    // Load dumbbell rack
    const dumbellRack = await loadGLTFModel('./models/gym_assets/dumbbell_rack/scene.gltf', loader);
    const rack1 = createObjectFromGLTF(dumbellRack, -9, 0, -7, 0, 0, 0, 1, 1, 1);
    scene.add(rack1);
    const rack2 = createObjectFromGLTF(dumbellRack, -9, 0, -1.4, 0, 0, 0, 1, 1, -1);
    scene.add(rack2);

    // load flat bench
    const flatBench = await loadGLTFModel('./models/gym_assets/flat_seat/scene.gltf', loader);
    const bench = createObjectFromGLTF(flatBench, 0, 0, -5, 0, Math.PI / 2, 0, 1, 1, 1);
    scene.add(bench);

    // load incline bench
    const inclineBench = await loadGLTFModel('./models/gym_assets/incline_seat/scene.gltf', loader);
    const inclineBenchObject = createObjectFromGLTF(inclineBench, 6.5, 0, -2, 0, 0, 0, 1, 1, 1);
    scene.add(inclineBenchObject);

    // load mattress 
    const mattress = await loadGLTFModel('./models/gym_assets/mattress/scene.gltf', loader);
    const mattressObject = createObjectFromGLTF(mattress, -4, 0, -7, 0, Math.PI / 2, 0, 1, 1, 1);
    scene.add(mattressObject);

    // load barbell
    const barbell = await loadGLTFModel('./models/gym_assets/barbell/scene.gltf', loader);
    const barbellObject = createObjectFromGLTF(barbell, 7, 0, 5, 0, 0, 0, 1, 1, 1);
    scene.add(barbellObject);

    // load barbell weights
    const barbellWeights = await loadGLTFModel('./models/gym_assets/barbell_weights/scene.gltf', loader);
    const barbellWeightsObject = createObjectFromGLTF(barbellWeights, 9, 0, 8, 0, 0, 0, 1, 1, 1);
    scene.add(barbellWeightsObject);

    //import squat rack
    const squatRack = await loadGLTFModel('./models/squat_rack/result.gltf', loader);
    const squatRackObject = createObjectFromGLTF(squatRack, -9, 0, 5, 0, 0, 0, 0.05, 0.05, 0.05);
    scene.add(squatRackObject);

    const allObjects = await loadGLTFModel('./models/gym_equipment/scene.gltf', loader);
    try {
        allObjects.scene.traverse((child) => {
            if (child instanceof THREE.Object3D && child.name === 'Bench_press_0') {
                child.position.set(6.5, 0, -7);
                scene.add(child);
            }
        });
    }
    catch (e) {
        console.log(e);
    }


    console.log("added all objects");
}

const setupRoom = async (scene: THREE.Scene, world: CANNON.World, loader: GLTFLoader, textureLoader: THREE.TextureLoader) => {
    setupWalls(textureLoader, scene, world);
    setupCeiling(textureLoader, scene);
    setupFloor(scene, world);
    setupMirrors(scene);
    await setupGymEquipment(scene, loader);
}

export { setupRoom };
