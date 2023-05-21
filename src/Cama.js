
import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'
import { MyBox } from './Basicos/MyBox.js';

export class Cama extends THREE.Object3D{

    constructor(){
        super();
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();

        materialLoader.load('../../models/cama/material.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../../models/cama/objeto.obj',
                    (object) => {
                        this.modelo = object;
                        this.add(this.modelo);
                    },null,null);
        });
        
        let pata1 = new MyBox(0xeed09d);
        pata1.scale.set(5,40,5);
        pata1.translateX(-45);
        pata1.translateZ(-60);
        pata1.translateY(-90);
        pata1.rotateX(Math.PI/2);

        let pata2 = pata1.clone();
        pata2.translateX(90);
        
        let pata3 = pata1.clone();
        pata3.translateZ(-180);

        let pata4 = pata2.clone();
        pata4.translateZ(-180);

        this.patas = new THREE.Object3D();
        this.patas.add(pata1);
        this.patas.add(pata2);
        this.patas.add(pata3);
        this.patas.add(pata4);

        this.add(this.patas);
        this.translateY(25);
    }


}