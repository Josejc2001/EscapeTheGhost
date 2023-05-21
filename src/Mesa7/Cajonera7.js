
import { CSG } from '../../libs/CSG-v2.js';
import * as THREE from '../../libs/three.module.js'
import { MyBox } from '../Basicos/MyBox.js';
import { Cajon7 } from './Cajon7.js';
import * as TWEEN from '../../libs/tween.esm.js'


export class Cajonera7 extends THREE.Object3D{
    constructor(){
        super();

        this.caja = new MyBox(0xFFE988);
        this.caja.translateY(2);
        this.caja.scale.set(3,5,6);

        this.cajon1 = new Cajon7(1);

        this.cajon2 = new Cajon7(2);
        this.cajon2.translateY(2.5);

        this.removeCaja = this.caja.clone();
        this.removeCaja.scale.set(2.5,4.5,6);

        let csg = new CSG();
        csg.subtract([this.caja,this.removeCaja]);
        this.caja = csg.toMesh();

        this.cajon1.translateY(0.26);
        
        //ABRIR CAJONES
        //this.cajon1.translateZ(0.5); //CAJON DE ABAJO
        //this.cajon2.translateZ(0.5); //CAJON DE ARRIBA

        this.cajones = new THREE.Object3D();
        this.cajones.add(this.cajon1);
        this.cajones.add(this.cajon2);
        this.add(this.cajones);
        this.add(this.caja);
        
        this.animando1 = false;
        this.animando2 = false;


        this.cajon1Abierto = false;
        this.cajon2Abierto = false;
    }

    animarCajones(name) {
        if (name === '1' && !this.animando1) {
          this.animando1 = true;
          this.cajon1Abierto ? this.cerrarCajon1() : this.abrirCajon1();
        } else if (name === '2' && !this.animando2) {
          this.animando2 = true;
          this.cajon2Abierto ? this.cerrarCajon2() : this.abrirCajon2();
        }
      }
    
    abrirCajon1() {
        let origen = this.cajon1.position;
        // Crear una nueva animación Tween para abrir el cajón 1
        new TWEEN.Tween(origen)
        .to({ z: 3.5 }, 1000) // Incrementar la posición z para abrir el cajón
        .easing(TWEEN.Easing.Quadratic.InOut) // Linear
        .onComplete(() => {
            this.animando1 = false;
            this.cajon1Abierto = true;
        })
        .start();
    }
      
      // Crear una función para cerrar el cajón 1
    cerrarCajon1() {
        // Crear una nueva animación Tween para cerrar el cajón 1
        new TWEEN.Tween(this.cajon1.position)
        .to({ z: 0 }, 1000) // Decrementar la posición z para cerrar el cajón
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onComplete(() => {
            this.animando1 = false;
            this.cajon1Abierto = false;
        })
        .start();
    }


    abrirCajon2() {
        let origen = this.cajon2.position;
        // Crear una nueva animación Tween para abrir el cajón 1
        new TWEEN.Tween(origen)
        .to({ z: 3.5 }, 1000) // Incrementar la posición z para abrir el cajón
        .easing(TWEEN.Easing.Quadratic.InOut) // Linear
        .onComplete(() => {
            this.animando2 = false;
            this.cajon2Abierto = true;
        })
        .start();
    }
      
      // Crear una función para cerrar el cajón 1
    cerrarCajon2() {
        // Crear una nueva animación Tween para cerrar el cajón 1
        new TWEEN.Tween(this.cajon2.position)
        .to({ z: 0 }, 1000) // Decrementar la posición z para cerrar el cajón
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onComplete(() => {
            this.animando2 = false;
            this.cajon2Abierto = false;
        })
        .start();
    }

    update(){
        TWEEN.update();
    }

}
    
