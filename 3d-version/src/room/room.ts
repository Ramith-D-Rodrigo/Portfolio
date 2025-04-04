import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createMirror } from "../objects/mirror";
import { addCeilingLights, createCeiling } from "./ceiling";
import { createFloor, createFloorPhysics } from "./floor";
import { createWall, createWallPhysics } from "./wall";
import * as THREE from "three";
import { createObjectFromGLTF, createObjectPhysics, loadGLTFModel } from "../objects/model";
import * as CANNON from 'cannon-es';
import InteractableArea from "../interaction/interactableArea";
import { AttachableObjectProps } from "../interaction/interactionBuilder";
import HUD from "../other/hud";
import { FrameUpdate } from "../other/frameUpdate";
import { BICEP_CURL, FLEX, FRONT_RAISE, IDLE, PUSH_UP, SITUP, SQUAT, START_PUSH_UP, START_SITUP, START_SQUAT, STOP_PUSH_UP, STOP_SITUP, STOP_SQUAT } from "../character/constants";
import InteractionBuilder from "../interaction/interactionBuilder";
import CurlInteractionSequence from "../interaction/curlInteractionSequence";
import FlexInteractionSequence from "../interaction/flexInteractionSequence";
import WarmupInteractionSequence from "../interaction/warmupInteractionSequence";
import SquatInteractionSequence from "../interaction/squatInteractionSequence";
import FrontRaiseInteractionSequence from "../interaction/frontRaiseInteractionSequence";
import FUNDAMENTALS from "../interaction/constants/fundamentals";
import InteractionDescHUD from "../interaction/interactionDesHUD";
import EXPERIENCE from "../interaction/constants/experience";
import EDUCATION from "../interaction/constants/education";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { Utils } from "../utils/utils";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import SKILLS from "../interaction/constants/skills";
import SkillViewInteractionSequence, { SkillTransform } from "../interaction/skillViewInteractionSequence";
import PROJECT_EXPERIENCE from "../interaction/constants/project_experience";
import { GITHUB, LINKEDIN } from "../../../static-version/globalConstants";


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

    const frontWall = createWall(width, height, 0, 5, 10, 0, -Math.PI, 0, textureLoader);
    scene.add(frontWall);

    const frontWallPhysics = createWallPhysics(0, 0, 5, 10, 0, -Math.PI, 0,  width/2, height/2, 0.01);
    world.addBody(frontWallPhysics);
}

const setupCeiling = (textureLoader: THREE.TextureLoader, scene: THREE.Scene) => {
    // Create a ceiling
    const ceiling = createCeiling(0, 10, 0, -Math.PI / 2, 0, 0, textureLoader);
    scene.add(ceiling);

    addCeilingLights(scene);
}

const setupFloor = (scene: THREE.Scene, world: CANNON.World, textureLoader: THREE.TextureLoader) => {
    const width = 20;
    const height = 20;
    const floor = createFloor(width, height, 0, 0, 0, -Math.PI / 2, 0, 0, 1, 1, 1, textureLoader);
    scene.add(floor);

    const floorPhysics = createFloorPhysics(0, 0, 0, 0, -Math.PI / 2, 0, 0, width/2, height/2, 0);
    world.addBody(floorPhysics);
}

const setupMirrors = (scene: THREE.Scene) => {
    const longMirror = createMirror(18, 6, new THREE.Vector3(9.999, 3, 0), new THREE.Euler(0, -Math.PI / 2, 0), 0xffffff);
    scene.add(longMirror);
}

const setupGymEquipment = async (scene: THREE.Scene, world: CANNON.World, loader: GLTFLoader) => {
    // Load dumbbell rack
    const dumbellRack = await loadGLTFModel('assets/models/gym_assets/dumbbell_rack/scene.gltf', loader);
    const rack1 = createObjectFromGLTF(dumbellRack, -9, 0, -7, 0, 0, 0, 1, 1, 1);
    scene.add(rack1);
    const rack2 = createObjectFromGLTF(dumbellRack, -9, 0, -1.4, 0, 0, 0, 1, 1, -1);
    scene.add(rack2);

    const rack1Phy = createObjectPhysics(0, -9, 2, -7, 0, 0, 0, 1, 2, 2);
    world.addBody(rack1Phy);
    const rack2Phy = createObjectPhysics(0, -9, 2, -1.4, 0, 0, 0, 1, 2, 2);
    world.addBody(rack2Phy);

    // load flat bench
    const flatBench = await loadGLTFModel('assets/models/gym_assets/flat_seat/scene.gltf', loader);
    const bench = createObjectFromGLTF(flatBench, 0, 0, -5, 0, Math.PI / 2, 0, 1, 1, 1);
    scene.add(bench);
    const benchPhy = createObjectPhysics(0, 0, 0, -6.5, 0, 0, 0, 1, 2, 2);
    world.addBody(benchPhy);

    // load incline bench
    const inclineBench = await loadGLTFModel('assets/models/gym_assets/incline_seat/scene.gltf', loader);
    const inclineBenchObject = createObjectFromGLTF(inclineBench, 6.5, 0, -2, 0, 0, 0, 1, 1, 1);
    scene.add(inclineBenchObject);
    const inclineBenchPhy = createObjectPhysics(0, 6, 1, -2, 0, 0, 0, 1.25, 2, 1);
    world.addBody(inclineBenchPhy);

    // load mattress 
    const mattress = await loadGLTFModel('assets/models/gym_assets/mattress/scene.gltf', loader);
    const mattressObject = createObjectFromGLTF(mattress, 0, 0, 0, 0, Math.PI / 2, 0, 1, 1, 1);
    scene.add(mattressObject);

    // load barbell
    const barbell = await loadGLTFModel('assets/models/gym_assets/barbell/scene.gltf', loader);
    const barbellObject = createObjectFromGLTF(barbell, 7, 0, 5, 0, 0, 0, 1, 1, 1);
    scene.add(barbellObject);
    const barbellPhy = createObjectPhysics(0, 7, 1, 5, 0, 0, 0, 0.8, 1, 1.6);
    world.addBody(barbellPhy);

    // load barbell weights
    const barbellWeights = await loadGLTFModel('assets/models/gym_assets/barbell_weights/scene.gltf', loader);
    const barbellWeightsObject = createObjectFromGLTF(barbellWeights, 9, 0, 8, 0, 0, 0, 1, 1, 1);
    scene.add(barbellWeightsObject);

    //import squat rack
    const squatRack = await loadGLTFModel('assets/models/squat_rack/result.gltf', loader);
    const squatRackObject = createObjectFromGLTF(squatRack, -9, 0, 5, 0, 0, 0, 0.05, 0.05, 0.05);
    scene.add(squatRackObject);
    const squatRackPhy = createObjectPhysics(0, -9, 1.5, 5, 0, 0, 0, 1, 3, 2.5);
    world.addBody(squatRackPhy);

    const allObjects = await loadGLTFModel('assets/models/gym_equipment/scene.gltf', loader);
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
    const dumbbell = await loadGLTFModel('assets/models/gym_assets/dumbbell/scene.gltf', loader);
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
            {animName: BICEP_CURL, displayTextList: SKILLS, displayTextDur: 5}, 
        ])
        .setCharacterTransform(new THREE.Vector3(-5.40, 0, -3.89), new THREE.Quaternion(-0, -0.71, -0, 0.71))
        .setDestCameraTransform(new THREE.Vector3(-5.12, 3.01, 0.56), new THREE.Quaternion(0.05, -0.023, 0.01, 0.99))
        .addAttachableObject("mixamorigLeftHand", attachableObj1)
        .addAttachableObject("mixamorigRightHand", attachableObj2)
        .setInteractionSequence(new CurlInteractionSequence())
        .build();

    const rackInteraction2Builder = new InteractionBuilder();
    const rackInteraction2 = rackInteraction2Builder
    .setDisplayText("Do Front Raises")
    .setAnimations([
        {animName: FRONT_RAISE, displayTextList: SKILLS, displayTextDur: 5}, 
    ])
    .setCharacterTransform(new THREE.Vector3(-5.40, 0, -3.89), new THREE.Quaternion(-0, -0.71, -0, 0.71))
    .setDestCameraTransform(new THREE.Vector3(-5.12, 3.01, 0.56), new THREE.Quaternion(0.05, -0.023, 0.01, 0.99))
    .addAttachableObject("mixamorigLeftHand", attachableObj1)
    .addAttachableObject("mixamorigRightHand", attachableObj2)
    .setInteractionSequence(new FrontRaiseInteractionSequence())
    .build();

    const rackInteraction3Builder = new InteractionBuilder();
    const rackInteraction3 = rackInteraction3Builder
    .setDisplayText("To Take a Closer Look")
    .setAnimations([])
    .setCharacterTransform(new THREE.Vector3(-5.40, 0, -3.89), new THREE.Quaternion(-0, -0.71, -0, 0.71))
    .setDestCameraTransform(new THREE.Vector3(-3.36, 3, -4.02), new THREE.Quaternion(0.04, 0.7,-0.04, 0.71))
    .setInteractionSequence(new SkillViewInteractionSequence())
    .build();

    const rackInteractionPos = new THREE.Vector3(-9, 0, -4);
    const rackInteractionRot = new THREE.Vector3(0, 0, 0);
    const rackTextPos = new THREE.Vector3(-7, 1, -3);
    const rackTextRot = new THREE.Vector3(0, Math.PI/2, 0);
    const interactable = await InteractableArea.create(
        rackInteractionPos, rackInteractionRot, 5, 
        "Skills", rackTextPos, rackTextRot, 
        [rackInteraction, rackInteraction2, rackInteraction3]
    );
    interactable.addToWorld(world, scene);
    hud.addComponent(interactable);

    // add the interactable collision area
    const barbellInteractionBuilder = new InteractionBuilder();
    const barbellInteraction = barbellInteractionBuilder
        .setDisplayText("Flex (Professional Experience)")
        .setAnimations([
            {animName: FLEX, displayTextList: EXPERIENCE, displayTextDur: 8}, 
        ])
        .setCharacterTransform(new THREE.Vector3(4.97, 0, 4.90), new THREE.Quaternion(0, 0.7, 0, 0.72))
        .setDestCameraTransform(new THREE.Vector3(-0.57, 3.84, 2.09), new THREE.Quaternion(0.11, 0.84, 0.19, -0.49))
        .setInteractionSequence(new FlexInteractionSequence())
        .build();

    const barbellInteractionBuilder2 = new InteractionBuilder();
    const barbellInteraction2 = barbellInteractionBuilder2
        .setDisplayText("Flex (Projects)")
        .setAnimations([
            {animName: FLEX, displayTextList: PROJECT_EXPERIENCE, displayTextDur: 8}, 
        ])
        .setCharacterTransform(new THREE.Vector3(4.97, 0, 4.90), new THREE.Quaternion(0, 0.7, 0, 0.72))
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
        [barbellInteraction, barbellInteraction2]
    );
    interactable2.addToWorld(world, scene);
    hud.addComponent(interactable2);

    // add the interactable collision area
    const barbell = await loadGLTFModel('assets/models/gym_assets/barbell/scene.gltf', loader);
    const barbellObject = createObjectFromGLTF(barbell, 0, 0, 0, 0, 0, 0, 1, 1, 1);

    const barbellObj: AttachableObjectProps = {
        object: barbellObject,
        position: new THREE.Vector3(35, -17.5, 0),
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(90), 0),
        scale: new THREE.Vector3(40, 40, 40)
    }

    const squatRackInteractionBuilder = new InteractionBuilder();
    const squatRackInteraction = squatRackInteractionBuilder
        .setDisplayText("Squat")
        .setAnimations([
            {animName: START_SQUAT, displayTextList: [], displayTextDur: 0}, 
            {animName: SQUAT, displayTextList: EDUCATION, displayTextDur: 6}, 
            {animName: STOP_SQUAT, displayTextList: [], displayTextDur: 0}
        ])
        .setCharacterTransform(new THREE.Vector3(-4.73, 0, 5.1), new THREE.Quaternion(0, -0.70, 0, 0.71))
        .setDestCameraTransform(new THREE.Vector3(-1.63, 4.12, -0.55), new THREE.Quaternion(-0.06, 0.94, 0.24, 0.25))
        .addAttachableObject("mixamorigRightHand",barbellObj)
        .setInteractionSequence(new SquatInteractionSequence())
        .build();

    const squatRackInteractionPos = new THREE.Vector3(-7, 1.5, 5);
    const squatRackInteractionRot = new THREE.Vector3(0, 0, 0);
    const squatRackTextPos = new THREE.Vector3(-7, 1, 7);
    const squatRackTextRot = new THREE.Vector3(0, Math.PI/2, 0);
    const interactable3 = await InteractableArea.create(
        squatRackInteractionPos, squatRackInteractionRot, 3.5, 
        "Education", squatRackTextPos, squatRackTextRot, 
        [squatRackInteraction]
    );
    interactable3.addToWorld(world, scene);
    hud.addComponent(interactable3);

    // add the interactable collision area
    const warmupInteractionBuilder = new InteractionBuilder();
    const warmupInteraction = warmupInteractionBuilder
        .setDisplayText("Do Push Ups")
        .setAnimations([
            {animName: START_PUSH_UP, displayTextList: [], displayTextDur: 0}, 
            {animName: PUSH_UP, displayTextList: FUNDAMENTALS, displayTextDur: 1.5}, 
            {animName: STOP_PUSH_UP, displayTextList: [], displayTextDur: 0}
        ])
        .setCharacterTransform(new THREE.Vector3(0, 0, 0), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, THREE.MathUtils.degToRad(180), 0)))
        .setDestCameraTransform(new THREE.Vector3(-2.16, 4.017, -5.31), new THREE.Quaternion(0.036, 0.96, 0.23, -0.15))
        .setInteractionSequence(new WarmupInteractionSequence())
        .build();


    const warmupInteraction2Builder = new InteractionBuilder();
    const warmupInteraction2 = warmupInteraction2Builder
        .setDisplayText("Do Sit Ups")
        .setAnimations([            
            {animName: START_SITUP, displayTextList: [], displayTextDur: 0}, 
            {animName: SITUP, displayTextList: FUNDAMENTALS, displayTextDur: 2}, 
            {animName: STOP_SITUP, displayTextList: [], displayTextDur: 0}
        ])
        .setCharacterTransform(new THREE.Vector3(0, 0, 0), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, THREE.MathUtils.degToRad(180), 0)))
        .setDestCameraTransform(new THREE.Vector3(-2.16, 4.017, -5.31), new THREE.Quaternion(0.036, 0.96, 0.23, -0.15))
        .setInteractionSequence(new WarmupInteractionSequence())
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
    hud.addComponent(warmupInteractable);
    hud.addComponent(InteractionDescHUD.getInstance());

    return [
        interactable,
        interactable2,
        interactable3,
        warmupInteractable,
    ]
}

const addMainText = async (textureLoader: THREE.TextureLoader, scene: THREE.Scene) => {
    textureLoader.load('assets/logos/linkedin_logo.png', (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;   
        texture.wrapS = THREE.RepeatWrapping;     
        // Create extruded geometry
        const geometry = new THREE.PlaneGeometry(1,1);
    
        // Materials
        const frontMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    
        // Create mesh with different materials for front and sides
        const mesh = new THREE.Mesh(geometry, frontMaterial);
        mesh.userData = {
            "label": LINKEDIN
        };
        mesh.position.set(-7, 8, -9.9);
        mesh.scale.set(2,2,2);
        scene.add(mesh);
    });

    textureLoader.load('assets/logos/github_logo.png', (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;   
        texture.wrapS = THREE.RepeatWrapping;     
        // Create extruded geometry
        const geometry = new THREE.PlaneGeometry(1,1);
    
        // Materials
        const frontMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    
        // Create mesh with different materials for front and sides
        const mesh = new THREE.Mesh(geometry, frontMaterial);
        mesh.userData = {
            "label": GITHUB
        };

        mesh.position.set(7, 8, -9.9);
        mesh.scale.set(2,2,2);
        scene.add(mesh);
    });

    const font = await Utils.loadFont('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json');

    const name = "Ramith Rodrigo";
    const textGeometry = new TextGeometry(name, {
        font: font,
        size: 1,
        depth: 0.2, // Depth makes it more 3D
        curveSegments: 12,
        bevelEnabled: false
    });
    
    const textMaterial = new THREE.MeshStandardMaterial({
        color: 0x5a74cc,
        metalness: 0.5,  // Gives a slightly metallic finish
        roughness: 0.8,  // Adds a polished feel
        emissive: 0x5a74cc, // Slight glow effect
        emissiveIntensity: 1.5,
    });

    const outerGeometry = new TextGeometry(name, {
        font: font,
        size: 1,
        depth: 0.15,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0,
        bevelSize: 0.05, // size of border
        bevelOffset: 0,
        bevelSegments: 1
    });

    const borderTextMesh = new THREE.Mesh(outerGeometry, new THREE.MeshBasicMaterial({color:0x253363}));
    
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);        
    const textGroup = new THREE.Group();

    textGroup.add(borderTextMesh);
    textGroup.add(textMesh);
    textGroup.scale.set(1.08, 1.08, 1.08);
    textGroup.position.set(-5, 7.5, -10);
    scene.add(textGroup);

    const title = "Software Engineer";
    const titleTextGeometry = new TextGeometry(title, {
        font: font,
        size: 0.8,
        depth: 0.2, // Depth makes it more 3D
        curveSegments: 12,
        bevelEnabled: false
    });
    
    const titleTextMaterial = new THREE.MeshStandardMaterial({
        color: 0x68c3ed,
        metalness: 0.5,  // Gives a slightly metallic finish
        roughness: 0.8,  // Adds a polished feel
        emissive: 0x68c3ed, // Slight glow effect
        emissiveIntensity: 1.5,
    });

    const titleOuterGeometry = new TextGeometry(title, {
        font: font,
        size: 0.8,
        depth: 0.15,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0,
        bevelSize: 0.05, // size of border
        bevelOffset: 0,
        bevelSegments: 1
    });

    const titleBorderTextMesh = new THREE.Mesh(titleOuterGeometry, new THREE.MeshBasicMaterial({color:0x253363}));
    
    const titleTextMesh = new THREE.Mesh(titleTextGeometry, titleTextMaterial);        
    const titleTextGroup = new THREE.Group();

    titleTextGroup.add(titleBorderTextMesh);
    titleTextGroup.add(titleTextMesh);
    titleTextGroup.scale.set(1, 1, 1);
    titleTextGroup.position.set(-4.5, 6, -10);
    scene.add(titleTextGroup);
}

const addDoor = async (loader:GLTFLoader, scene: THREE.Scene): Promise<void> => {
    const barbell = await loadGLTFModel('assets/models/door/scene.gltf', loader);
    const barbellObject = createObjectFromGLTF(barbell, 0, 0, 10.25, 0, Math.PI, 0, 0.028, 0.028, 0.028);
    scene.add(barbellObject);
    return;
}

const setupRoom = async (scene: THREE.Scene, world: CANNON.World, loader: GLTFLoader, textureLoader: THREE.TextureLoader, hud: HUD): Promise<FrameUpdate[]> => {
    setupWalls(textureLoader, scene, world);
    await addMainText(textureLoader, scene);
    setupCeiling(textureLoader, scene);
    setupFloor(scene, world, textureLoader);
    setupMirrors(scene);
    await addDoor(loader, scene);
    await setupGymEquipment(scene, world, loader);
    return await setupInteractableAreas(scene, world, hud, loader);
}

const addSkills = (skillObjs: THREE.Group[], scene: THREE.Scene, loader: GLTFLoader) => {
    const skills: SkillTransform[] = [
        {
            name: 'c',
            position: new THREE.Vector3(-8.8, 2.7, 0.72),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.08, 0.08, 0.08),
        },
        {
            name: 'php',
            position: new THREE.Vector3(-8.8, 2.75, 0.36),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.08, 0.08, 0.08),
        },
        {
            name: 'csharp',
            position: new THREE.Vector3(-8.8, 2.8, 0),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'javascript',
            position: new THREE.Vector3(-8.8, 2.8, -0.4),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'scala',
            position: new THREE.Vector3(-8.8, 2.8, -0.8),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'python',
            position: new THREE.Vector3(-8.8, 2.85, -1.25),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'java',
            position: new THREE.Vector3(-8.8, 2.85, -1.72),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'typescript',
            position: new THREE.Vector3(-8.8, 2.9, -2.2),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'cpp',
            position: new THREE.Vector3(-8.8, 3, -2.75),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'opengl',
            position: new THREE.Vector3(-8.8, 2.9, -3.35),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.15, 0.15, 0.15),
        },
        {
            name: 'webgl',
            position: new THREE.Vector3(-8.8, 2.9, -3.9),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.15, 0.15, 0.15),
        },
        {
            name: 'webgpu',
            position: new THREE.Vector3(-8.8, 2.9, -4.5),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'react',
            position: new THREE.Vector3(-8.8, 2.9, -5.1),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'threejs',
            position: new THREE.Vector3(-8.8, 2.9, -5.7),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'webxr',
            position: new THREE.Vector3(-8.8, 2.8, -6.2),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'mysql',
            position: new THREE.Vector3(-8.8, 2.8, -6.7),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.11, 0.11, 0.11),
        },
        {
            name: 'mongodb',
            position: new THREE.Vector3(-8.8, 2.8, -7.15),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'postgresql',
            position: new THREE.Vector3(-8.8, 2.8, -7.57),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'webassembly',
            position: new THREE.Vector3(-8.8, 2.8, -8),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.09, 0.09, 0.09),
        },
        {
            name: 'docker',
            position: new THREE.Vector3(-8.8, 2.8, -8.4),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'git',
            position: new THREE.Vector3(-8.8, 2.8, -8.8),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'unity',
            position: new THREE.Vector3(-8.2, 1.9, 0.72),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'unreal',
            position: new THREE.Vector3(-8.2, 1.9, 0.12),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'laravel',
            position: new THREE.Vector3(-8.2, 1.9, -0.50),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'nextjs',
            position: new THREE.Vector3(-8.2, 1.9, -1.1),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
        {
            name: 'spring_boot',
            position: new THREE.Vector3(-8.2, 1.9, -1.6),
            rotation:new THREE.Euler(Math.PI/2, 0, -Math.PI/2),
            scale: new THREE.Vector3(0.1, 0.1, 0.1),
        },
    ];

    skills.forEach(async (skill) => {
        const model = await loadGLTFModel(`assets/logos/skills/${skill.name}.glb`, loader);
        const obj = createObjectFromGLTF(model, 0, 0, 0, 0, 0, 0, 1, 1, 1);
        obj.traverse(o =>{
            o.castShadow = false;
            o.receiveShadow = false;
            o.layers.set(1);
            if (o instanceof THREE.Mesh) {  // Ensure we modify only meshes
                const material = o.material;
                if (material && material.color) {
                    // Increase emissive color to make colors more vibrant
                    material.emissive = material.color.clone().multiplyScalar(0.3);
                    material.emissiveIntensity = 1.5;
        
                    // Optional: Increase saturation by modifying HSL
                    const hsl = material.color.getHSL({ h: 0, s: 0, l: 0 });
                    material.color.setHSL(hsl.h, Math.min(3 * hsl.s, 1), hsl.l);
        
                    material.needsUpdate = true;
                }
            }

        })
        obj.position.copy(skill.position);
        obj.rotation.copy(skill.rotation);
        obj.scale.copy(skill.scale);
        scene.add(obj);
        obj.userData.originalScale = obj.scale.clone(); // Store original scale

        skillObjs.push(obj);
    });
}

export { setupRoom, addSkills };
