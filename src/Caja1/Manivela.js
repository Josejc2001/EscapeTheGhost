import * as THREE from '../../libs/three.module.js'
import { OBJLoader } from '../../libs/OBJLoader.js'

class Manivela extends THREE.Object3D{

    constructor(){
        super();
        var objectLoader = new OBJLoader();

        objectLoader.load('../../models/manivela/Manivela.obj',
        (object) => {
            this.modelo = object;
            this.add(this.modelo);
        },null,null);

    }


}

export { Manivela };