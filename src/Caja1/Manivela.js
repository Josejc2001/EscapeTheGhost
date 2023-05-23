import * as THREE from '../../libs/three.module.js'
import { OBJLoader } from '../../libs/OBJLoader.js'

class Manivela extends THREE.Object3D{

    constructor(){
        super();
        var objectLoader = new OBJLoader();

        objectLoader.load('../../models/manivela/manivela.obj',
        (object) => {
            this.modelo = object;
            this.add(this.modelo);
        },null,null);

    }

    posicionarHabitacion(){
        this.rotateZ(Math.PI/2);
        this.scale.set(0.5,0.5,0.5);
    }

}

export { Manivela };