
import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class TV extends THREE.Object3D{
    constructor(){
        super();

        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();

        materialLoader.load('../models/tv/MI SMART TV.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/tv/MI SMART TV.obj',
                    (object) => {
                        this.modelo = object;
                        this.add(this.modelo);
                    },null,null);
        });

        
       
    }


    posicionarHabitacion(){
        this.rotateY(Math.PI);
        this.scale.set(20,20,20);
        this.position.z = 80;
        this.position.x = 5;
        this.position.y = 19;
    }
    update(){
    }
}

export { TV };