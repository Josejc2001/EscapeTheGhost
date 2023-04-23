
import { CSG } from '../../libs/CSG-v2.js';
import * as THREE from '../../libs/three.module.js'
import { MyBox } from '../Basicos/MyBox.js';
import { MyCylinder } from '../Basicos/MyCylinder.js';

class Aspa extends THREE.Object3D{
    constructor(){
        super();

        this.palo = new MyCylinder(0xA2A2A2);
        this.palo.scale.set(0.01,2,0.02);
      
        this.palo.rotateZ(Math.PI/2);
        

        this.aspa = new MyBox(0xC1C1C1);
        this.aspa.scale.set(2,0.1,0.2);
        this.aspa.translateY(-0.5);
        

        this.add(this.aspa);
        this.add(this.palo);

    }
}

export { Aspa }