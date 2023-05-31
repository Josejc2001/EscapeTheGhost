import * as THREE from '../../libs/three.module.js'
import { OBJLoader } from '../../libs/OBJLoader.js'

export class LlavePuerta extends THREE.Object3D{
    constructor(){
        super();
        var objectLoader = new OBJLoader();
        const especularGold = new THREE.Color(0.628281, 0.555802, 0.366065);
        const difusoGold = new THREE.Color(0.75164, 0.60648, 0.22648);
        const exponenteGold = 128 * 0.4;
    
        const materialGold = new THREE.MeshPhongMaterial({
            color: difusoGold,
            specular: especularGold,
            shininess: exponenteGold
        }); 

        this.llave = new THREE.Object3D();

        this.crearObjeto(objectLoader, this.llave, materialGold, "../models/llave/llave.obj");

        this.add(this.llave);
        
    }

    crearObjeto(objectLoader,parentObj3D,material,path){
        objectLoader.load(path,
        (object) => {
            object.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                  child.material = material;
                }
              });
    
            parentObj3D.add(object);
        },null,null);
      }
    
    update(){
    }
}