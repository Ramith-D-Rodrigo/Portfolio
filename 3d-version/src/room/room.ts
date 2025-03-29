import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createMirror } from "../objects/mirror";
import { createCeiling } from "./ceiling";
import { createFloor, createFloorPhysics } from "./floor";
import { createWall, createWallPhysics } from "./wall";
import * as THREE from "three";
import { createObjectFromGLTF, createObjectPhysics, loadGLTFModel } from "../objects/model";
import * as CANNON from 'cannon-es';
import InteractableArea from "../interaction/interactableArea";
import { AttachableObjectProps } from "../interaction/interactionBuilder";
import HUD from "../other/hud";
import { FrameUpdate } from "../other/frameUpdate";
import { BICEP_CURL, FLEX, IDLE, PUSH_UP, SITUP, SQUAT, START_PUSH_UP, START_SITUP, START_SQUAT, STOP_PUSH_UP, STOP_SITUP, STOP_SQUAT } from "../character/constants";
import InteractionBuilder from "../interaction/interactionBuilder";
import CurlInteractionSequence from "../interaction/curlInteractionSequence";
import FlexInteractionSequence from "../interaction/flexInteractionSequence";

const setupWalls = (textureLoader: THREE.TextureLoader, scene: THREE.Scene, world: CANNON.World) => {
    // 3 Walls (left, right, back)
    const width = 20;
    const height = 10;
    const leftWall = createWall(width, height, -10, 5, 0, 0, Math.PI / 2, 0, textureLoader);
    scene.add(leftWall);

    const leftWallPhysics = createWallPhysics(0, -10, 5, 0, 0, Math.PI / 2, 0, width/2, height/2, 0.01);
    world.addBody(leftWallPhysics);

    const rightWall = createWall(width, height, 10, 5, 0, 0, -Math.PI / 2, 0, textureLoader);
    scene.add(rightWall);

    const rightWallPhysics = createWallPhysics(0, 10, 5, 0, 0, -Math.PI / 2, 0,  width/2, height/2, 0.01);
    world.addBody(rightWallPhysics);

    const backWall = createWall(width, height, 0, 5, -10, 0, 0, 0, textureLoader);
    scene.add(backWall);

    const backWallPhysics = createWallPhysics(0, 0, 5, -10, 0, 0, 0,  width/2, height/2, 0.01);
    world.addBody(backWallPhysics);
}

const setupCeiling = (textureLoader: THREE.TextureLoader, scene: THREE.Scene) => {
    // Create a ceiling
    const ceiling = createCeiling(0, 10, 0, -Math.PI / 2, 0, 0, textureLoader);
    scene.add(ceiling);
}

const setupFloor = (scene: THREE.Scene, world: CANNON.World) => {
    const width = 20;
    const height = 20;
    const floor = createFloor(width, height, 0, 0, 0, -Math.PI / 2, 0, 0, 1, 1, 1);
    scene.add(floor);

    const floorPhysics = createFloorPhysics(0, 0, 0, 0, -Math.PI / 2, 0, 0, width/2, height/2, 0);
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

const setupGymEquipment = async (scene: THREE.Scene, world: CANNON.World, loader: GLTFLoader) => {
    // Load dumbbell rack
    const dumbellRack = await loadGLTFModel('./models/gym_assets/dumbbell_rack/scene.gltf', loader);
    const rack1 = createObjectFromGLTF(dumbellRack, -9, 0, -7, 0, 0, 0, 1, 1, 1);
    scene.add(rack1);
    const rack2 = createObjectFromGLTF(dumbellRack, -9, 0, -1.4, 0, 0, 0, 1, 1, -1);
    scene.add(rack2);

    const rack1Phy = createObjectPhysics(0, -9, 2, -7, 0, 0, 0, 1, 2, 2);
    world.addBody(rack1Phy);
    const rack2Phy = createObjectPhysics(0, -9, 2, -1.4, 0, 0, 0, 1, 2, 2);
    world.addBody(rack2Phy);

    // load flat bench
    const flatBench = await loadGLTFModel('./models/gym_assets/flat_seat/scene.gltf', loader);
    const bench = createObjectFromGLTF(flatBench, 0, 0, -5, 0, Math.PI / 2, 0, 1, 1, 1);
    scene.add(bench);
    const benchPhy = createObjectPhysics(0, 0, 0, -6.5, 0, 0, 0, 1, 2, 2);
    world.addBody(benchPhy);

    // load incline bench
    const inclineBench = await loadGLTFModel('./models/gym_assets/incline_seat/scene.gltf', loader);
    const inclineBenchObject = createObjectFromGLTF(inclineBench, 6.5, 0, -2, 0, 0, 0, 1, 1, 1);
    scene.add(inclineBenchObject);
    const inclineBenchPhy = createObjectPhysics(0, 6, 1, -2, 0, 0, 0, 1.25, 2, 1);
    world.addBody(inclineBenchPhy);

    // load mattress 
    const mattress = await loadGLTFModel('./models/gym_assets/mattress/scene.gltf', loader);
    const mattressObject = createObjectFromGLTF(mattress, 0, 0, 0, 0, Math.PI / 2, 0, 1, 1, 1);
    scene.add(mattressObject);

    // load barbell
    const barbell = await loadGLTFModel('./models/gym_assets/barbell/scene.gltf', loader);
    const barbellObject = createObjectFromGLTF(barbell, 7, 0, 5, 0, 0, 0, 1, 1, 1);
    scene.add(barbellObject);
    const barbellPhy = createObjectPhysics(0, 7, 1, 5, 0, 0, 0, 0.8, 1, 1.6);
    world.addBody(barbellPhy);

    // load barbell weights
    const barbellWeights = await loadGLTFModel('./models/gym_assets/barbell_weights/scene.gltf', loader);
    const barbellWeightsObject = createObjectFromGLTF(barbellWeights, 9, 0, 8, 0, 0, 0, 1, 1, 1);
    scene.add(barbellWeightsObject);

    //import squat rack
    const squatRack = await loadGLTFModel('./models/squat_rack/result.gltf', loader);
    const squatRackObject = createObjectFromGLTF(squatRack, -9, 0, 5, 0, 0, 0, 0.05, 0.05, 0.05);
    scene.add(squatRackObject);
    const squatRackPhy = createObjectPhysics(0, -9, 1.5, 5, 0, 0, 0, 1, 3, 2.5);
    world.addBody(squatRackPhy);

    const allObjects = await loadGLTFModel('./models/gym_equipment/scene.gltf', loader);
    try {
        allObjects.scene.traverse((child) => {
            if (child instanceof THREE.Object3D && child.name === 'Bench_press_0') {
                child.position.set(6.5, 0, -7);
                scene.add(child);
                const barbellPressPhy = createObjectPhysics(0, 6.5, 1, -7, 0, 0, 0, 1.8, 2.5, 2);
                world.addBody(barbellPressPhy);
            }
        });
    }
    catch (e) {
        console.log(e);
    }

    console.log("added all objects");
}

const setupInteractableAreas = async (scene: THREE.Scene, world: CANNON.World, hud: HUD, loader: GLTFLoader): Promise<FrameUpdate[]> => {
    // add the interactable collision area
    const dumbbell = await loadGLTFModel('./models/gym_assets/dumbbell/scene.gltf', loader);
    const dumbbellObj = createObjectFromGLTF(dumbbell, 0, 0, 0, 0, 0, 0, 1, 1, 1);

    const rackInteractionBuilder = new InteractionBuilder();
    const attachableObj1: AttachableObjectProps = {
        object: dumbbellObj,
        position: new THREE.Vector3(0, 8, 1),
        rotation: new THREE.Euler(0, Math.PI/2, 0),
        scale: new THREE.Vector3(50, 50, 50)
    }
    const attachableObj2: AttachableObjectProps = {
        object: dumbbellObj.clone(),
        position: new THREE.Vector3(0, 8, -1),
        rotation: new THREE.Euler(0, Math.PI/2, 0),
        scale: new THREE.Vector3(50, 50, 50)
    }
    const rackInteraction = rackInteractionBuilder
        .setDisplayText("Do Bicep Curls")
        .setAnimations([
            {animName: BICEP_CURL, loop: THREE.LoopRepeat, repeatCount: 8}, 
        ])
        .setIntermediateCameraTransform(new THREE.Vector3(1, 1, 1), new THREE.Quaternion(0, 0, 0, 1))
        .setDestCameraTransform(new THREE.Vector3(-5.77, 4.19, 2.22), new THREE.Quaternion(-0.25, -0.026, -0.01, 0.97))
        .addAttachableObject("mixamorigLeftHand", attachableObj1)
        .addAttachableObject("mixamorigRightHand", attachableObj2)
        .setInteractionSequence(new CurlInteractionSequence())
        .build();

    const rackInteractionPos = new THREE.Vector3(-9, 0, -4);
    const rackInteractionRot = new THREE.Vector3(0, 0, 0);
    const rackTextPos = new THREE.Vector3(-7, 1, -3);
    const rackTextRot = new THREE.Vector3(0, Math.PI/2, 0);
    const interactable = await InteractableArea.create(
        rackInteractionPos, rackInteractionRot, 5, 
        "Skills", rackTextPos, rackTextRot, 
        [rackInteraction]
    );
    interactable.addToWorld(world, scene);
    hud.addComponent(rackInteraction);

    // add the interactable collision area
    const barbellInteractionBuilder = new InteractionBuilder();
    const barbellInteraction = barbellInteractionBuilder
        .setDisplayText("Flex")
        .setAnimations([
            {animName: FLEX, loop: THREE.LoopRepeat, repeatCount: 5}, 
        ])
        .setIntermediateCameraTransform(new THREE.Vector3(1, 1, 1), new THREE.Quaternion(0, 0, 0, 1))
        .setDestCameraTransform(new THREE.Vector3(-0.57, 3.84, 2.09), new THREE.Quaternion(0.11, 0.84, 0.19, -0.49))
        .setInteractionSequence(new FlexInteractionSequence())
        .build();

    const barbellInteractionPos = new THREE.Vector3(7, 1, 5);
    const barbellInteractionRot = new THREE.Vector3(0, 0, 0);
    const barbellTextPos = new THREE.Vector3(5, 1, 3);
    const barbellTextRot = new THREE.Vector3(0, -Math.PI/2, 0);
    const interactable2 = await InteractableArea.create(
        barbellInteractionPos, barbellInteractionRot, 3,
        "Experience", barbellTextPos, barbellTextRot, 
        [barbellInteraction]
    );
    interactable2.addToWorld(world, scene);
    hud.addComponent(barbellInteraction);

    // add the interactable collision area
    const barbell = await loadGLTFModel('./models/gym_assets/barbell/scene.gltf', loader);
    const barbellObject = createObjectFromGLTF(barbell, 7, 0, 5, 0, 0, 0, 1, 1, 1);
    const barbellObj: AttachableObjectProps = {
        object: barbellObject,
        position: new THREE.Vector3(0, 0, 0),
        rotation: new THREE.Euler(0, Math.PI/2, 0),
        scale: new THREE.Vector3(35, 35, 35)
    }

    const squatRackInteractionBuilder = new InteractionBuilder();
    const squatRackInteraction = squatRackInteractionBuilder
        .setDisplayText("Squat")
        .setAnimations([
            {animName: START_SQUAT, loop: THREE.LoopOnce, repeatCount: 0}, 
            {animName: SQUAT, loop: THREE.LoopRepeat, repeatCount: 8}, 
            {animName: STOP_SQUAT, loop: THREE.LoopOnce, repeatCount: 0}
        ])
        .setIntermediateCameraTransform(new THREE.Vector3(1, 1, 1), new THREE.Quaternion(0, 0, 0, 1))
        .setDestCameraTransform(new THREE.Vector3(-2.14, 2.22, 11.30), new THREE.Quaternion(-0.09, 0.28, 0.03, 1.0))
        .addAttachableObject("mixamorigLeftHand",barbellObj)
        .build();

    const squatRackInteractionPos = new THREE.Vector3(-9, 1.5, 5);
    const squatRackInteractionRot = new THREE.Vector3(0, 0, 0);
    const squatRackTextPos = new THREE.Vector3(-7, 1, 7);
    const squatRackTextRot = new THREE.Vector3(0, Math.PI/2, 0);
    const interactable3 = await InteractableArea.create(
        squatRackInteractionPos, squatRackInteractionRot, 3.5, 
        "Education", squatRackTextPos, squatRackTextRot, 
        [squatRackInteraction]
    );
    interactable3.addToWorld(world, scene);
    hud.addComponent(squatRackInteraction);

    // add the interactable collision area
    const warmupInteractionBuilder = new InteractionBuilder();
    const warmupInteraction = warmupInteractionBuilder
        .setDisplayText("Do Push Ups")
        .setAnimations([
            {animName: START_PUSH_UP, loop: THREE.LoopOnce, repeatCount: 0}, 
            {animName: PUSH_UP, loop: THREE.LoopRepeat, repeatCount: 8}, 
            {animName: STOP_PUSH_UP, loop: THREE.LoopOnce, repeatCount: 0}
        ])
        .setIntermediateCameraTransform(new THREE.Vector3(1, 1, 1), new THREE.Quaternion(0, 0, 0, 1))
        .setDestCameraTransform(new THREE.Vector3(-2.16, 4.017, -5.31), new THREE.Quaternion(0.036, 0.96, 0.23, -0.15))
        .build();


    const warmupInteraction2Builder = new InteractionBuilder();
    const warmupInteraction2 = warmupInteraction2Builder
        .setDisplayText("Do Sit Ups")
        .setAnimations([            
            {animName: START_SITUP, loop: THREE.LoopOnce, repeatCount: 0}, 
            {animName: SITUP, loop: THREE.LoopRepeat, repeatCount: 8}, 
            {animName: STOP_SITUP, loop: THREE.LoopOnce, repeatCount: 0}
        ])
        .setIntermediateCameraTransform(new THREE.Vector3(1, 1, 1), new THREE.Quaternion(0, 0, 0, 1))
        .setDestCameraTransform(new THREE.Vector3(-2.16, 4.017, -5.31), new THREE.Quaternion(0.036, 0.96, 0.23, -0.15))
        .build();

    const warmupInteractionPos = new THREE.Vector3(0, 0, 0);
    const warmupInteractionRot = new THREE.Vector3(0, 0, 0);
    const warmupTextPos = new THREE.Vector3(-1.5, 1, 0);
    const warmupTextRot = new THREE.Vector3(0, 0, 0);
    const warmupInteractable = await InteractableArea.create(
        warmupInteractionPos, warmupInteractionRot, 2,
        "Warm Up", warmupTextPos, warmupTextRot, 
        [warmupInteraction, warmupInteraction2]
    );
    warmupInteractable.addToWorld(world, scene);
    hud.addComponent(warmupInteraction);
    hud.addComponent(warmupInteraction2);

    return [
        interactable,
        interactable2,
        interactable3,
        warmupInteractable,
    ]
}

const setupRoom = async (scene: THREE.Scene, world: CANNON.World, loader: GLTFLoader, textureLoader: THREE.TextureLoader, hud: HUD): Promise<FrameUpdate[]> => {
    setupWalls(textureLoader, scene, world);
    setupCeiling(textureLoader, scene);
    setupFloor(scene, world);
    setupMirrors(scene);
    await setupGymEquipment(scene, world, loader);
    return await setupInteractableAreas(scene, world, hud, loader);
}

export { setupRoom };
