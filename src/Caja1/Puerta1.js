

import * as THREE from '../../libs/three.module.js'

import { CSG } from '../../libs/CSG-v2.js'
import { MyCylinder } from '../Basicos/MyCylinder.js';
import { MyBox } from '../Basicos/MyBox.js';
import * as TWEEN from '../../libs/tween.esm.js'

class Puerta1 extends THREE.Object3D{
    constructor(){
        super();
        
        let textura = new THREE.TextureLoader().load('../../imgs/puerta1.png');
        let puertaI = new MyBox(0xEFB810,textura);
        puertaI.translateY(-0.5);
        puertaI.scale.set(2,5,0.1);
        puertaI.translateX(1);

        let textura2 = new THREE.TextureLoader().load('../../imgs/puerta12.png');
        let puertaD = new MyBox(0x6D5B57,textura2);
        puertaD.translateY(-0.5);
        puertaD.scale.set(2,5,0.1);
        puertaD.translateX(1);
        

        let cilindro = new MyCylinder(0x804000);
        cilindro.scale.set(0.1,5,0.1);


        let csg = new CSG();
        csg.union([puertaI,cilindro]);
        this.puertaIz = csg.toMesh();

        csg = new CSG();
        csg.union([puertaD,cilindro]);
        this.puertaDer = csg.toMesh();


        this.puertaDer.translateX(4);
        this.puertaDer.rotateY(THREE.MathUtils.degToRad(180));

        // Abrir puerta
        //this.puertaDer.rotateY(THREE.MathUtils.degToRad(-90));
        //this.puertaIz.rotateY(THREE.MathUtils.degToRad(90));
        
        this.add(this.puertaIz);
        this.add(this.puertaDer);

        
        this.translateX(-2);
        

        
    }


    animar(){
        let pIZ = new TWEEN.Tween(this.puertaIz.rotation)
        .to({ y: Math.PI/2 }, 5000) 
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onComplete(() => {
        })

        let pDer = new TWEEN.Tween(this.puertaDer.rotation)
        .to({ y: Math.PI/2 }, 5000) 
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onComplete(() => {
        })

        pIZ.start();
        pDer.start();
    }

    


}

export { Puerta1 }


