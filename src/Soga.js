
import * as THREE from '../libs/three.module.js'
import { OBJLoader } from '../libs/OBJLoader.js'

export class Soga extends THREE.Object3D{

    constructor(){
        super();
        var objectLoader = new OBJLoader();

        objectLoader.load('../../models/soga/objeto.obj',
        (object) => {
            this.modelo = object;
            this.add(this.modelo);
        },null,null);

      
    }

    posicionarHabitacion(){
        this.scale.set(4,6,4);
        this.translateY(50);
        this.translateX(-60);
        this.translateZ(-81);
        this.rotateZ(Math.PI/2);
    }
}