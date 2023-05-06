import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class RemoteControl extends THREE.Object3D{
    constructor(){
        super();

        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materialLoader.load('../models/remote_control/10816_ Remote Control_v2_LOD3.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/remote_control/10816_ Remote Control_v2_LOD3.obj',
                    (object) => {
                        this.modelo = object;
                        this.add(this.modelo);
                    },null,null);
        });
    }

    update(){
    }
}

export { RemoteControl };