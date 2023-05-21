


import * as THREE from '../../libs/three.module.js'
import { MyBox } from '../Basicos/MyBox.js';
import { Engranaje } from '../Caja1/Engranaje.js';
import { TypeCaja1 } from '../Caja1/TypeCaja1.js';
import { CajonAnimacion } from '../CajonAnimacion.js';
import { Tornillo } from '../Rejilla/Tornillo.js';
import { Cajonera7 } from './Cajonera7.js';
export class Mesa7 extends THREE.Object3D{

    constructor(){
        super();

        var texture = new THREE.TextureLoader().load('../../imgs/mesa7.jpg');
        this.mesa = new MyBox(null,texture);
        this.mesa.scale.set(10,0.2,5);
        this.mesa.translateX(-0.25);
        this.mesa.translateY(5.5);

        this.estructura1 = new MyBox(0xFFE988);
        this.estructura1.scale.set(4.05,0.2,4);
        this.estructura1.translateX(-4.3);
        this.estructura1.translateY(3.4);
        this.estructura1.rotateX(Math.PI/2);
        this.estructura1.rotateZ(Math.PI/2);

        this.estructura2 = new MyBox(0xFFE988);
        this.estructura2.scale.set(5.8,0.2,4);
        this.estructura2.translateZ(-2);
        this.estructura2.translateX(-1.3);
        this.estructura2.translateY(3.5);
        this.estructura2.rotateX(Math.PI/2);
        

        this.estructuras = new THREE.Object3D();
        this.estructuras.add(this.estructura1);
        this.estructuras.add(this.estructura2);

        this.pata1 = new MyBox(0x8A9597);
    
        this.pata1.scale.set(0.2,6,0.2);
        this.pata1.translateX(-4.5);
        this.pata1.translateZ(2);
        this.pata1.translateY(2.5);

        this.pata2 = this.pata1.clone();
        this.pata2.translateZ(-4);

        this.pata3 = this.pata1.clone();
        this.pata3.translateX(8.5);

        this.pata4 = this.pata2.clone();
        this.pata4.translateX(8.5);
        
        this.patas = new THREE.Object3D();
        this.patas.add(this.pata1);
        this.patas.add(this.pata2);
        this.patas.add(this.pata3);
        this.patas.add(this.pata4);

        this.cajonera = new Cajonera7();
        this.cajonera.scale.set(0.8,1,0.7);
        this.cajonera.translateX(2.7);
        this.cajonera.translateY(0.9);

        this.add(this.mesa);
        this.add(this.patas);
        this.add(this.estructuras);

        this.add(this.cajonera);


        this.engranaje = new Engranaje(TypeCaja1.REDONDA);
        this.engranaje.scale.set(1,1,0.5);
        this.engranaje.translateY(2.5);
        this.engranaje.translateX(2);
        this.engranaje.rotateX(Math.PI/2);

        this.tornillo = new Tornillo();
        this.tornillo.scale.set(20,20,1);
        this.tornillo.translateY(2.5);
        this.tornillo.translateX(2);
        this.tornillo.rotateX(-(Math.PI/2));

        this.completoTE = new THREE.Object3D();
        this.completoTE.add(this.tornillo);
        this.completoTE.add(this.engranaje);

        this.completoTE.scale.set(0.5,0.5,0.5);
        this.completoTE.translateX(1.7);
        this.completoTE = this.completoTE.clone();
        this.completoTE.name ="engranaje-cajon";
        this.add(this.completoTE);
        this.engranajeCapturado = false;
        this.animarEngranaje = new CajonAnimacion(this.completoTE,2);
    }

    posicionarHabitacion(){
        this.scale.set(1,0.7,1);
        this.scale.set(5,5,5);
        this.rotateY(Math.PI/2);
        this.position.x = -85;
    }

    animarCajones(name){
        this.cajonera.animarCajones(name,this.animarEngranaje);
        
    }

    isCapturado(){
        return this.engranajeCapturado;
    }
    capturado(){
        this.engranajeCapturado = true;
    }
}