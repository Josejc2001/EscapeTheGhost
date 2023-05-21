
import { CSG } from '../../libs/CSG-v2.js';
import * as THREE from '../../libs/three.module.js'
import { MyBox } from '../Basicos/MyBox.js';
import { Cajon7 } from './Cajon7.js';


export class Cajonera7 extends THREE.Object3D{
    constructor(){
        super();

        this.caja = new MyBox(0xFFE988);
        this.caja.translateY(2);
        this.caja.scale.set(3,5,6);

        this.cajon1 = new Cajon7(1);

        this.cajon2 = new Cajon7(2);
        this.cajon2.translateY(2.5);

        this.removeCaja = this.caja.clone();
        this.removeCaja.scale.set(2.5,4.5,6);

        let csg = new CSG();
        csg.subtract([this.caja,this.removeCaja]);
        this.caja = csg.toMesh();

        this.cajon1.translateY(0.26);
        
        //ABRIR CAJONES
        //this.cajon1.translateZ(0.5); //CAJON DE ABAJO
        //this.cajon2.translateZ(0.5); //CAJON DE ARRIBA

        this.cajones = new THREE.Object3D();
        this.cajones.add(this.cajon1);
        this.cajones.add(this.cajon2);
        this.add(this.cajones);
        this.add(this.caja);
        
    }

    animarCajones(name) {
        if (name === '1') {
            this.cajon1.animar();
        } else if (name === '2') {
            this.cajon2.animar();
        }
    }



}
    
