

import * as THREE from '../../libs/three.module.js'

import { CSG } from '../../libs/CSG-v2.js'
import { MyBox } from '../Basicos/MyBox.js';
import { Engranaje } from './Engranaje.js';
import { TypeCaja1 } from './TypeCaja1.js';
import { Puerta1 } from './puerta1.js';
import { Tornillo } from './Tornillo.js';

class Caja1 extends THREE.Object3D{
    constructor(){
        super();
        
        let textura = new THREE.TextureLoader().load();
        this.cubo = new MyBox(0x804000);

        let restarCubo = new MyBox(0x804000);
        restarCubo.scale.set(3,4,3);
        restarCubo.translateY(2.5);

        this.cubo.scale.set(4,4,4);
        this.cubo.position.y += 2;

        let csg = new CSG();
        csg.subtract([this.cubo,restarCubo]);
        this.cuboFinal = csg.toMesh();

      

        
        this.engranaje = new Engranaje();
        this.engranaje.scale.set(1,1,0.5);
        this.engranaje.translateY(2.5);
        this.engranaje.translateX(2);
        this.engranaje.rotateY(Math.PI/2);
       
        this.puerta = new Puerta1();
        this.puerta.scale.set(0.8,0.7,0.8);
        this.puerta.translateX(0.4)
        this.puerta.translateY(4.5);
        this.puerta.rotateX(Math.PI/2);

       

        this.tornillo = new Tornillo();
        this.tornillo.scale.set(1.5,0.3,1.5);
        this.tornillo.translateY(2.5);
        this.tornillo.translateX(2);
        this.tornillo.rotateZ(-(Math.PI/2));

        this.completoTE = new THREE.Object3D();
        this.completoTE.add(this.tornillo);
        this.completoTE.add(this.engranaje);

        //Pieza Izquierda (La que se necesitara)
        //this.completoTEIz = this.completoTE.clone();
        //this.completoTEIz.rotateY(Math.PI);
      



        // Efecto de rotacion Izquierda
        //this.completoTEIz.children[1].rotateZ(Math.PI/2);

        // Efecto de rotacion Derecha
        //this.engranaje.rotateZ(Math.PI/2);

        this.add(this.puerta);
        this.add(this.cuboFinal);
        this.add(this.completoTE);

        this.translateY(-0.5);
        
    }

    engranajeInterno(){
    }
}

export { Caja1 }


