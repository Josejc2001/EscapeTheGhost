
import { CSG } from '../../libs/CSG-v2.js';
import * as THREE from '../../libs/three.module.js'
import { MyBox } from '../Basicos/MyBox.js';
import { Cajon7 } from './Cajon7.js';

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
        
        this.incremento1 = 0;
        this.incremento2 = 0;

        this.animando1 = false;
        this.animando2 = false;

        this.finalizo1 = false;
        this.finalizo2 = false;
        this.reloj1 = new THREE.Clock();
        this.reloj2 = new THREE.Clock();

        this.cajon1Abierto = false;
        this.cajon2Abierto = false;
    }

    animarCajones(name){
        if(name != '2' && name != '1') return;


        if(name == '2' && !this.animando2){
            this.animando2 = true;
            this.finalizo2 = false;
        }else if(!this.animando1){
            this.animando1 = true;
            this.finalizo1 = false;
        }
        
    }

    abrirCajon1(){
       
        if(this.animando1 && !this.finalizo1){
            var segundosTranscurridos = this.reloj1.getDelta();
            
            this.incremento1 += 0.1 * segundosTranscurridos;
            
            if(this.incremento1 > 0.1 ){
                this.finalizo1 = true;
                this.animando1= false;
                this.incremento1 = 0;
                this.reloj1 = new THREE.Clock();
                this.cajon1Abierto = true;
                return;
            }

            this.cajon1.translateZ(this.incremento1);
            
        }
    }

    cerrarCajon1(){
        if(this.animando1 && !this.finalizo1){
            var segundosTranscurridos = this.reloj1.getDelta();
            
            this.incremento1 -= 0.1 * segundosTranscurridos;
            
            if(this.incremento1 <= -0.1){
                this.finalizo1 = true;
                this.animando1 = false;
                this.incremento1 = 0;
                this.reloj1 = new THREE.Clock();
                this.cajon1Abierto = false;
                return;
            }

            this.cajon1.translateZ(this.incremento1);
        }

        
    }

    cerrarCajon2(){
        if(this.animando2 && !this.finalizo2){
            var segundosTranscurridos = this.reloj2.getDelta();
            
            this.incremento2 -= 0.1 * segundosTranscurridos;
            
            if(this.incremento2 <= -0.1){
                this.finalizo2 = true;
                this.animando2 = false;
                this.incremento2 = 0;
                this.reloj2 = new THREE.Clock();
                this.cajon2Abierto = false;
                return;
            }

            this.cajon2.translateZ(this.incremento2);
        }

        
    }

    abrirCajon2(){
        
        if(this.animando2 && !this.finalizo2){
            var segundosTranscurridos = this.reloj2.getDelta();
            this.incremento2 += 0.1 * segundosTranscurridos;
            
            if(this.incremento2 > 0.1 ){
                this.finalizo2 = true;
                this.animando2= false;
                this.incremento2 = 0;
                this.reloj2 = new THREE.Clock();
                this.cajon2Abierto = true;
                return;
            }

            this.cajon2.translateZ(this.incremento2);
            
        }
    }

    update(){
        if(!this.animando1 && !this.animando2) return;
        if(this.finalizo1 && this.finalizo2) return;
        
        if(!this.cajon1Abierto){
            this.abrirCajon1();
        }else{
            this.cerrarCajon1();
        }
    
        if(!this.cajon2Abierto){
            this.abrirCajon2();
        }else{
            this.cerrarCajon2();
        }


    }
}