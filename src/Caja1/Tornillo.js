

import * as THREE from '../../libs/three.module.js'

import { CSG } from '../../libs/CSG-v2.js'

class Tornillo extends THREE.Object3D{
    constructor(){
        super();
        
        let shape = new THREE.Shape();

        shape.moveTo(0,8);
        shape.quadraticCurveTo()

    }
}

export { Tornillo }


