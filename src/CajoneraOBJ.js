
import * as THREE from '../libs/three.module.js'
import { OBJLoader } from '../libs/OBJLoader.js'

export class CajoneraOBJ extends THREE.Object3D{

    constructor(){
        super();
        var objectLoader = new OBJLoader();

        objectLoader.load('../../models/cajonera/objeto.obj',
        (object) => {
            this.modelo = object;
            this.add(this.modelo);
        },null,null);

        
    }

    posicionarHabitacion(){
        this.scale.set(20,20,20);
        this.translateY(13.5);
        this.translateX(90);
        this.translateZ(20);
        this.rotateY(-Math.PI/2);
    }

}