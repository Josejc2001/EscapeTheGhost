
import * as THREE from '../../libs/three.module.js'
import { MyBox } from '../Basicos/MyBox.js';
import { MyCylinder } from '../Basicos/MyCylinder.js';

class Cajon7 extends THREE.Object3D{
    constructor(){
        super();
        this.cajon = new MyBox(0x4C4040);
        this.boton = new MyCylinder(0x605C5C);
        this.cajon.scale.set(7,1.5,1);

        this.boton.translateZ(-0.4);
        this.boton.translateY(0.5);
        this.boton.rotateX(Math.PI/2);
        this.boton.scale.set(0.4,1,0.4)

        this.add(this.cajon);
        this.add(this.boton);
   
    }

    
}

export { Cajon7 }