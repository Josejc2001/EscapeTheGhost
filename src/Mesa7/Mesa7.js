
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
        
        this.cajon1.translateY(4);
        this.cajon2.translateY(2);


        this.objCajones = new THREE.Object3D();
        this.objCajones.add(this.cajon1);
        this.objCajones.add(this.cajon2);
        this.objCajones.add(this.cajon3);

       

        this.obCajones2 = this.objCajones.clone();
        this.obCajones2.translateX(8);

        this.finalCajones = new THREE.Object3D();
        this.finalCajones.add(this.objCajones);
        this.finalCajones.add(this.obCajones2);
        this.finalCajones.translateY(0.5);
        this.finalCajones.translateZ(1);
        this.finalCajones.translateX(5);
        

        this.add(this.finalCajones);
        this.add(this.mesa);        
    }
}

export { Mesa7 }