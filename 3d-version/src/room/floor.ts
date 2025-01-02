import * as THREE from 'three';
import * as CANNON from 'cannon-es';

const createFloor = (width: number, height: number, 
    xPos: number, yPos: number, zPos: number,
    xRot: number, yRot: number, zRot: number,
    xScale: number, yScale: number, zScale: number) => {
    const floorGeometry = new THREE.PlaneGeometry(width, height);
    const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x808080, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.x = xPos;
    floor.position.y = yPos;
    floor.position.z = zPos;
    floor.rotation.x = xRot;
    floor.rotation.y = yRot;
    floor.rotation.z = zRot;
    floor.scale.set(xScale, yScale, zScale);

    return floor;
}

const createFloorPhysics = (mass: number,
    xPosition: number, yPosition: number, zPosition: number,
    xRotation: number, yRotation: number, zRotation: number
) => {
    const floorBody = new CANNON.Body({
        mass: mass,
        shape: new CANNON.Plane(),
    });
    floorBody.position.set(xPosition, yPosition, zPosition);
    floorBody.quaternion.setFromEuler(xRotation, yRotation, zRotation);

    return floorBody;
}

export { createFloor, createFloorPhysics };
