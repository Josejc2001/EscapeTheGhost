
import * as THREE from '../../libs/three.module.js'

import {MyBox} from '../Basicos/MyBox.js';
import { CSG } from '../../libs/CSG-v2.js'
import { Pomo } from './Pomo.js';
import * as TWEEN from '../../libs/tween.esm.js'
class Puerta extends THREE.Object3D{
    constructor(){
        super();
        this.marco = new MyBox(0x463502);
        this.marco.scale.set(10,20,1);

        this.puerta = new MyBox(0x9D5202);
        this.puerta.scale.set(9,19,1);


        this.agujero1 = new MyBox();
        this.agujero1.scale.set(2,2,0.1);
        this.agujero1.translateY(7);
        this.agujero1.translateX(-2);

        this.agujero2 = this.agujero1.clone();
        this.agujero2.translateX(4);

        this.agujero3 = this.agujero1.clone();
        this.agujero3.translateY(-6);
        this.agujero3.scale.set(2,7,0.1);

        this.agujero4 = this.agujero3.clone();
        this.agujero4.translateX(4);

        this.agujero5 = this.agujero3.clone();
        this.agujero5.translateY(-7);
        this.agujero5.scale.set(2,4,0.1);

        this.agujero6 = this.agujero5.clone();
        this.agujero6.translateX(4);

        var csg1 = new CSG();
        csg1.subtract([this.marco,this.puerta]);
        
        this.marcoFinal = csg1.toMesh();



        this.puertaFinal = new THREE.Object3D();
        this.puertaFinal.add(this.marcoFinal);
        this.puerta.scale.set(9,19,0.5);
        this.puerta.translateZ(-0.2);

        csg1 = new CSG();
        csg1.subtract([this.puerta,this.agujero1,this.agujero2,this.agujero3,this.agujero4,this.agujero5,this.agujero6]);
        this.puertaAgujero = csg1.toMesh();

        this.puertaPadre = new THREE.Object3D();
        this.puertaAgujero.translateX(-4.5);
        this.puertaPadre.add(this.puertaAgujero);
        this.puertaPadre.translateX(4.5)
        this.puertaFinal.add(this.puertaPadre);

        
        
        this.pomo = new Pomo();
        this.pomo.translateX(-8.75);
        this.pomo.translateZ(0.15);
        
        
        this.puertaPadre.add(this.pomo);
        this.add(this.puertaFinal);

        this.scale.set(4,5,4);
        this.position.y = 46;


        this.tengoLlaves = false;
        // Abrir Puerta
        //this.puertaPadre.rotateY(Math.PI/2); 
    }

    posicionarHabitacion(){
        this.rotateY(Math.PI);
        
        this.position.x = 70;
        this.position.z = 97;
    }

    animar(){

        let tweeAnimation = new TWEEN.Tween(this.puertaPadre.rotation)
        .to({ y: Math.PI/2 }, 2000) // Decrementar la posición z para cerrar el cajón
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onComplete(() => {
        })
       
        this.pomo.animar().chain(tweeAnimation);

    }


    hasKey(){
        return this.tengoLlaves;
    }

}

export { Puerta }