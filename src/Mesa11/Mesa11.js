
import { CSG } from '../../libs/CSG-v2.js';
import * as THREE from '../../libs/three.module.js'
import { Cajon11 } from './Cajon11.js';
import { MesaSinCajones11 } from './MesaSinCajones11.js';

class Mesa11 extends THREE.Object3D{
    constructor(){
        super();

        this.mesa = new MesaSinCajones11();

        this._crearCajones(true);
        

        this.add(this.finalCajones);
        this.add(this.mesa);        
    }

    _crearCajones(){
        this.cajon1 = new Cajon11(1);
        this.cajon2 = new Cajon11(2);
        this.cajon3 = new Cajon11(3);
        
        this.cajon1.translateY(4);
        this.cajon2.translateY(2);


        this.objCajones = new THREE.Object3D();
        this.objCajones.add(this.cajon1);
        this.objCajones.add(this.cajon2);
        this.objCajones.add(this.cajon3);


        this.cajon4 = new Cajon11(4);
        this.cajon5 = new Cajon11(5);
        this.cajon6 = new Cajon11(6);

        this.cajon4.translateY(4);
        this.cajon5.translateY(2);
       

        this.obCajones2 = new THREE.Object3D();
        this.obCajones2.add(this.cajon4);
        this.obCajones2.add(this.cajon5);
        this.obCajones2.add(this.cajon6);

        this.obCajones2.translateX(8);

        this.finalCajones = new THREE.Object3D();
        this.finalCajones.add(this.objCajones);
        this.finalCajones.add(this.obCajones2);
        this.finalCajones.translateY(0.5);
        this.finalCajones.translateZ(0.9);
        this.finalCajones.translateX(5);
    }



    animarCajones(name) {
        if (name === 'Cajon11-1') {
            this.cajon1.animar();
        } else if (name === 'Cajon11-2') {
            this.cajon2.animar();
        }else if (name === 'Cajon11-3') {
            this.cajon3.animar();
        }else if (name === 'Cajon11-4') {
            this.cajon4.animar();
        }else if (name === 'Cajon11-5') {
            this.cajon5.animar();
        }else if (name === 'Cajon11-6') {
            this.cajon6.animar();
        }
    }


    

}

export { Mesa11 }