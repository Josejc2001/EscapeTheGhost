import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Carpet extends THREE.Object3D{
    constructor(){
        super();
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materialLoader.load('../models/carpet/uploads_files_67386_carpet.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/carpet/uploads_files_67386_carpet.obj',
                    (object) => {
                        this.modelo = object;
                        this.add(this.modelo);
                    },null,null);
        });
    }

    update(){
    }
}

export { Carpet };