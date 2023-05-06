

import * as THREE from '../../libs/three.module.js'

import { CSG } from '../../libs/CSG-v2.js'
import { MySphere } from '../Basicos/MySphere.js';
import { MyCylinder } from '../Basicos/MyCylinder.js';

class Tornillo extends THREE.Object3D{
    constructor(){
        super();
        
        let cili = new MySphere();
        cili.scale.set(0.2,0.2,0.2);
        cili.translateY(-3);

        let palo = new MyCylinder();
        palo.scale.set(0.2,2,0.2);

        let csg = new CSG();
        csg.union([cili,palo]);
        this.objFinal = csg.toMesh();
        this.add(this.objFinal);
        

    }
}

export { Tornillo }


