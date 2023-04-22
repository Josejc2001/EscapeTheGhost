
import * as THREE from '../../libs/three.module.js'
import { MyBox } from '../Basicos/MyBox.js';
import { MyCylinder } from '../Basicos/MyCylinder.js';

class Cajon7 extends THREE.Object3D{
    constructor(){
        super();
        this.add (this.clone());       
    }

    clone(){
        this.cajon = new MyBox(0x4C4040);
        this.boton = new MyCylinder(0x605C5C);
        this.cajon.scale.set(7,1.5,1);

        this.boton.translateZ(-0.4);
        this.boton.translateY(0.75);
        this.boton.rotateX(Math.PI/2);
        this.boton.scale.set(0.4,1,0.4)

        this.obj3 = new THREE.Object3D();
        this.obj3.add(this.cajon);
        this.obj3.add(this.boton);

        return this.obj3;
    }
}

export { Cajon7 }