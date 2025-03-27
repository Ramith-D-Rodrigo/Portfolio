import * as CANNON from "cannon-es";
import * as THREE from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import Interaction from "./interaction";

class InteractableArea {
    private collisionBody: CANNON.Body;
    private cameraPos: THREE.Vector3;
    private cameraOri: THREE.Vector3;
    private displayText: THREE.Mesh;
    private interaction: Interaction;

    private static fontLoader: FontLoader = new FontLoader();

    private constructor(pos: THREE.Vector3, rot: THREE.Vector3, radius: number, interaction: Interaction){
        this.interaction = interaction;
        this.collisionBody = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Sphere(radius),
            isTrigger: true
        });
        this.collisionBody.position.set(pos.x, pos.y, pos.z);
        this.collisionBody.quaternion.setFromEuler(rot.x, rot.y, rot.z);

        this.collisionBody.addEventListener('collide', (event: any) => {
            this.interaction.interact();
        });
    }

    public static async create(pos: THREE.Vector3, rot: THREE.Vector3, radius: number, 
        displayText: string, textPos: THREE.Vector3, textRot: THREE.Vector3, 
        interaction: Interaction): Promise<InteractableArea> {
        const newArea = new InteractableArea(pos, rot, radius, interaction);
        const font = await InteractableArea.fontLoader.loadAsync('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json'); 
        const textGeometry = new TextGeometry(displayText, {
            font: font,
            size: 0.6,
            height: 0.2
        });

        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        newArea.displayText = new THREE.Mesh(textGeometry, textMaterial);

        newArea.displayText.position.set(textPos.x, textPos.y, textPos.z);
        newArea.displayText.rotation.set(textRot.x, textRot.y, textRot.z);
        return newArea;
    }

    public addToWorld(world: CANNON.World, scene: THREE.Scene){
        world.addBody(this.collisionBody);
        scene.add(this.displayText);
    }

    public removeFromWorld(world: CANNON.World, scene: THREE.Scene){
        world.removeBody(this.collisionBody);
        scene.remove(this.displayText);
    }

    public setCameraLocation(pos:THREE.Vector3, ori: THREE.Vector3){
        this.cameraPos = pos;
        this.cameraOri = ori;
    }

};

export default InteractableArea;
