
import * as THREE from '../../libs/three.module.js'
import { Cajon11 } from './Cajon11.js';
import { MesaSinCajones11 } from './MesaSinCajones11.js';

class Mesa11 extends THREE.Object3D{
    constructor(){
        super();

        this.mesa = new MesaSinCajones11();
        this.mesa.scale.set(1,1.2,1);

        this.cajon1 = new Cajon11();
        this.cajon2 = new Cajon11();
        this.cajon3 = new Cajon11();
        
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

export { Mesa11 }