
import { CSG } from '../../libs/CSG-v2.js';
import * as THREE from '../../libs/three.module.js'
import { MyBox } from '../Basicos/MyBox.js';
import { Aspa } from './Aspa.js';
import { Tornillo } from './Tornillo.js';

class Rejilla extends THREE.Object3D{
    constructor(){
        super();

        this.marco = new MyBox(0xffffff);
        this.marco.scale.set(2,1,0.1);


        this.hueco = new MyBox(0x000000);
        this.hueco.scale.set(1.8,0.8,0.1);

        this.linea = new MyBox(0x000000);
        this.linea.scale.set(1.9,0.8,0.03);

        this.csg = new CSG();
        this.csg.subtract([this.marco,this.hueco,this.linea]);
        this.marcoHueco = this.csg.toMesh();

        this.aspas = new THREE.Object3D();
       
        let j = 0;
        for(let i = 0 ; i <= 8 ; i++){
            this.aspa1 = new Aspa();
            this.aspa1.scale.set(0.9,0.5,0.5);
            this.aspa1.translateY(j+0.9);
            this.aspa1.rotateX(THREE.MathUtils.degToRad(30));
            j -= 0.1;
            this.aspas.add(this.aspa1)
        }

        
        this.tornillo1 = new Tornillo();
        this.tornillo1.translateZ(0.04);
        this.tornillo1.translateY(1);
        this.tornillo1.translateY(-0.05);
        this.tornillo1.translateX(-0.93);

        this.tornillo2 = this.tornillo1.clone();
        this.tornillo2.translateX(1.87);

        this.tornillo3 = this.tornillo1.clone();
        this.tornillo3.translateY(-0.9);

        this.tornillo4 = this.tornillo2.clone();
        this.tornillo4.translateY(-0.9);

        this.tornillos = new THREE.Object3D();
        this.tornillos.add(this.tornillo1);
        this.tornillos.add(this.tornillo2);
        this.tornillos.add(this.tornillo3);
        this.tornillos.add(this.tornillo4);

        

        this.add(this.tornillos);
        this.add(this.aspas);
        this.add(this.marcoHueco);

    }
}

export { Rejilla }