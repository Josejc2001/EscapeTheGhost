

import * as THREE from '../../libs/three.module.js'

import { CSG } from '../../libs/CSG-v2.js'
import { MyBox } from '../Basicos/MyBox.js';
import { Engranaje } from './Engranaje.js';
import { TypeCaja1 } from './TypeCaja1.js';

class Caja1 extends THREE.Object3D{
    constructor(){
        super();
        
        this.cubo = new MyBox(0x804000);

        this.cubo.scale.set(4,4,4);
        this.cubo.position.y += 2;

        this.engranajeInterno = new Engranaje(TypeCaja1.REDONDA,2);
        this.engranajeInterno.translateY(2.5);
        this.engranajeInterno.translateZ(2.5);

        let csg = new CSG();
      
        csg.intersect([
            this.cubo,
            this.engranajeInterno.Mesh]);  
        this.engranajeIF = csg.toMesh();
        this.add(this.engranajeIF);

        /*
        this.engranaje = new Engranaje();
        this.engranaje.translateY(2.5);
        this.engranaje.translateZ(2.5);
        this.add(this.engranaje);
        */

        
        this.add(this.cubo);
        
    }
}

export { Caja1 }


