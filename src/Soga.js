
import * as THREE from '../libs/three.module.js'
import { OBJLoader } from '../libs/OBJLoader.js'

export class Soga extends THREE.Object3D{

    constructor(){
        super();
        var objectLoader = new OBJLoader();

        const material = new THREE.MeshPhongMaterial({
            color: 0x8B4513, // Color marrón similar al de una soga
            specular: 0x000000, // Sin brillo especular
            shininess: 0, // Sin brillo especular
            wireframe: true, // Mostrar el objeto como alambres
          });
          
        this.crearObjeto(objectLoader,this,material,'../../models/soga/objeto.obj');
    }

    posicionarHabitacion(){
        this.scale.set(4,6,4);
        this.translateY(50);
        this.translateX(-60);
        this.translateZ(-81);
        this.rotateZ(Math.PI/2);
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
}