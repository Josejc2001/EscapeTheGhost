


import * as THREE from '../../libs/three.module.js'
import { MyBox } from '../Basicos/MyBox.js';
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

        this.scale.set(1,0.7,1);

    }

    animarCajonesMesa7(name){
        this.cajonera.animarCajones(name);
    }

    update(){
        this.cajonera.update();
    }

}