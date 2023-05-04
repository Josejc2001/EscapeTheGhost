

import * as THREE from '../../libs/three.module.js'

import { CSG } from '../../libs/CSG-v2.js'
import { MyCylinder } from '../Basicos/MyCylinder.js';
import { MyBox } from '../Basicos/MyBox.js';

class Puerta1 extends THREE.Object3D{
    constructor(){
        super();
        
        let puertaI = new MyBox(0xEFB810);
        puertaI.translateY(-0.5);
        puertaI.scale.set(2,5,0.1);
        puertaI.translateX(1);

        let puertaD = new MyBox(0x6D5B57);
        puertaD.translateY(-0.5);
        puertaD.scale.set(2,5,0.1);
        puertaD.translateX(3);
        

        let cilindro = new MyCylinder(0x804000);
        cilindro.scale.set(0.1,5,0.1);


        let csg = new CSG();
        csg.union([puertaI,cilindro]);
        this.puertaIz = csg.toMesh();

        this.puertaDer = this.puertaIz.clone();
        this.puertaDer.translateX(4);
        this.puertaDer.rotateY(THREE.MathUtils.degToRad(180));

        // Abrir puerta
        //this.puertaDer.rotateY(THREE.MathUtils.degToRad(-90));
        //this.puertaIz.rotateY(THREE.MathUtils.degToRad(90));
        
        this.add(this.puertaIz);
        this.add(this.puertaDer);

        this.translateX(-2);
    }
}

export { Puerta1 }


