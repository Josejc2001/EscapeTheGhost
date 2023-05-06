
import { CSG } from '../../libs/CSG-v2.js';
import * as THREE from '../../libs/three.module.js'
import { MyBox } from '../Basicos/MyBox.js';

export class Cajon7 extends THREE.Object3D{


    constructor(){
        super();

        this.cajon = new MyBox(0xFDE372);
        this.cajon.translateY(2);
        this.cajon.scale.set(2.5,2.5,6);


        this.aza1 = new MyBox(0x8A9597);
        this.aza1.scale.set(0.8,0.1,0.1);

        this.aza2 = new MyBox(0x8A9597);
        this.aza2.scale.set(0.1,0.1,0.3);
        this.aza2.translateX(-0.35);
        this.aza2.translateZ(-0.2);

        this.aza3 = this.aza2.clone();
        this.aza3.translateX(0.7);

        this.azas = new THREE.Object3D();
        this.azas.add(this.aza1);
        this.azas.add(this.aza2);
        this.azas.add(this.aza3);

        this.cajonRemove = this.cajon.clone();
        this.cajonRemove.translateY(0.1);
        this.cajonRemove.scale.set(2.4,2.5,5.9);

        let csg = new CSG();
        csg.subtract([this.cajon,this.cajonRemove]);
        this.cajon = csg.toMesh();

        this.azas.scale.set(1.1,1,1);
        this.azas.translateZ(3.2);
        this.azas.translateY(2);

        this.add(this.azas);
        this.add(this.cajon);

        this.scale.set(1,0.95,0.95);
        this.translateY(-1.2);
    }   
}