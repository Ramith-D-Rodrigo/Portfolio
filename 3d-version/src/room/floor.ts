import * as THREE from 'three';

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

export { createFloor };
