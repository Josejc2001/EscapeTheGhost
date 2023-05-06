
import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

export class Cama extends THREE.Object3D{

    constructor(){
        super();
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();

        materialLoader.load('../../assets/cama/material.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../../assets/cama/objeto.obj',
                    (object) => {
                        this.modelo = object;
                        this.add(this.modelo);
                    },null,null);
        });
    }


}