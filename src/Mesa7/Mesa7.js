
import * as THREE from '../../libs/three.module.js'
import { Cajon7 } from './Cajon7.js';
import { MesaSinCajones7 } from './MesaSinCajones7.js';

class Mesa7 extends THREE.Object3D{
    constructor(){
        super();

        this.mesa = new MesaSinCajones7();
        this.mesa.scale.set(1,1.2,1);

        this.cajon1 = new Cajon7();
        this.cajon2 = new Cajon7();
        this.cajon3 = new Cajon7();
        this.cajon4 = new Cajon7();
        this.cajon5 = new Cajon7();
        this.cajon6 = new Cajon7();


        this.cajon1.position.y = 4;
        this.cajon2.position.y = 2;

        this.cajon4.position.y = 4;
        this.cajon5.position.y = 2;


        this.objCajones = new THREE.Object3D();
        this.objCajones.add(this.cajon1);
        this.objCajones.add(this.cajon2);
        this.objCajones.add(this.cajon3);

        
        this.objCajones2 = new THREE.Object3D();
        this.objCajones2.add(this.cajon4);
        this.objCajones2.add(this.cajon5);
        this.objCajones2.add(this.cajon6);
        this.objCajones2.translateX(8);

        this.finalCajones = new THREE.Object3D();
        this.finalCajones.translateY(0.5);
        this.finalCajones.translateZ(1);
        this.finalCajones.translateX(5);
        this.finalCajones.add(this.objCajones);
        this.finalCajones.add(this.objCajones2);

        this.finalMesa = new THREE.Object3D();


        this.finalMesa.add(this.finalCajones);
        this.finalMesa.add(this.mesa);        

        this.add(this.finalMesa);
    }
}

export { Mesa7 }