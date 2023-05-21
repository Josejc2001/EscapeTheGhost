
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


}