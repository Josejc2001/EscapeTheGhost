
import { CSG } from '../../libs/CSG-v2.js';
import * as THREE from '../../libs/three.module.js'
import { MyBox } from '../Basicos/MyBox.js';
import { MyCylinder } from '../Basicos/MyCylinder.js';
import { CajonAnimacion } from '../CajonAnimacion.js';

class Cajon11 extends THREE.Object3D{
    constructor(tipo_cajon){
        super();
        this.name += "Cajon11-"+tipo_cajon;
        this.cajon = new MyBox(0x4C4040);
        this.boton = new MyCylinder(0x605C5C);
        this.cajon.scale.set(7,1.5,6);
        this.cajon.translateZ(-2.5);    

        this.restarCajon = this.cajon.clone();
        this.restarCajon.scale.set(6.5,1.5,5.5);
        this.restarCajon.translateY(0.5);
        let csg = new CSG();
        csg.subtract([this.cajon,this.restarCajon]);
        this.cajon = csg.toMesh();

        this.boton.translateZ(0.1);
        this.boton.translateY(0.5);
        this.boton.rotateX(Math.PI/2);
        this.boton.scale.set(0.4,0.3,0.4)
        this.boton.translateY(0.4);

        this.add(this.cajon);
        this.add(this.boton);

        this.cajonAnimacion = new CajonAnimacion(this);
   
    }

    animar(){
        this.cajonAnimacion.animar();
    }
    

    
}

export { Cajon11 }