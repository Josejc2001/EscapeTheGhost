import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Chair extends THREE.Object3D{
    constructor(){
        super();
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materialLoader.load('../models/chair/Office_chair.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/chair/Office chair.obj',
                    (object) => {
                        this.modelo = object;
                        this.add(this.modelo);
                    },null,null);
        });
        
    }
    posicionarHabitacion(){
        this.scale.set(0.05,0.05,0.05);
        this.rotateY(-Math.PI/2);
        this.position.x = -60;
        this.position.z = 7.5;
    }
    update(){
    }
}

export { Chair };