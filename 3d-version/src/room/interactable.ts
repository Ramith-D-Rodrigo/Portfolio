import * as CANNON from "cannon-es";
import * as THREE from "three";

class InteractableArea {
    private collisionBody: CANNON.Body;
    private cameraPos: THREE.Vector3;
    private cameraOri: THREE.Vector3;


    public constructor(xPos: number, yPos: number, zPos: number, xRot: number, yRot: number, zRot: number, radius: number){
        this.collisionBody = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Sphere(radius),
            isTrigger: true
        });
        this.collisionBody.position.set(xPos, yPos, zPos);
        this.collisionBody.quaternion.setFromEuler(xRot, yRot, zRot);
    }

    public addToWorld(world: CANNON.World){
        world.addBody(this.collisionBody);
    }

    public setCameraLocation(pos:THREE.Vector3, ori: THREE.Vector3){
        this.cameraPos = pos;
        this.cameraOri = ori;
    }

};

export default InteractableArea;
