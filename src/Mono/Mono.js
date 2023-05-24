import { OBJLoader } from '../../libs/OBJLoader.js';
import * as THREE from '../../libs/three.module.js'
 
export class Mono extends THREE.Object3D {
  constructor() {
    super();

    this.giroTuerca = 0.0;
    this.giroBrazo = 0.0;
    this.transladarBrazo = 0.0;
    this.reboteCabeza = 0.0;
    this.giroBoca = 0.0;

    this.disminuirGiroBrazo = false;
    this.disminuirRebote = false;
    this.disminuirBoca = false;

    this.velocidad = 1;

    this.velocidad_boca = 1;
    this.velocidad_cabeza = 15;
    this.velocidad_tuerca = 2;

    var objectLoader = new OBJLoader();
    this.cuerpo = new THREE.Object3D();
    this.cabeza = new THREE.Object3D();
    this.pie = new THREE.Object3D();
    this.pieDerecho = new THREE.Object3D();
    this.platillo = new THREE.Object3D();
    this.platilloDerecho = new THREE.Object3D();
    this.brazo = new THREE.Object3D();
    this.brazoDerecho = new THREE.Object3D();
    this.boca = new THREE.Object3D();
    this.tuerca = new THREE.Object3D();

    const especularBronze = new THREE.Color(0.714, 0.4284, 0.18144);
    const difusoBronze = new THREE.Color(0.393548, 0.271906, 0.166721);
    const exponenteBronze = 25.6;

    const materialBronze = new THREE.MeshPhongMaterial({
    color: difusoBronze,
    specular: especularBronze,
    shininess: exponenteBronze
    });

    const especularGold = new THREE.Color(0.628281, 0.555802, 0.366065);
    const difusoGold = new THREE.Color(0.75164, 0.60648, 0.22648);
    const exponenteGold = 128 * 0.4;

    const materialGold = new THREE.MeshPhongMaterial({
        color: difusoGold,
        specular: especularGold,
        shininess: exponenteGold
    }); 

    this.crearObjeto(objectLoader,this.cuerpo,materialBronze,'../models/mono/cuerpo_obj.obj');
    this.crearObjeto(objectLoader,this.cabeza,materialBronze,'../models/mono/cabeza_obj.obj');
    this.crearObjeto(objectLoader,this.boca,materialBronze,'../models/mono/boca_obj.obj');
    this.crearObjeto(objectLoader,this.brazo,materialBronze,'../models/mono/brazo_obj.obj');
    this.crearObjeto(objectLoader,this.brazoDerecho,materialBronze,'../models/mono/brazoDerecho_obj.obj');
    this.crearObjeto(objectLoader,this.pie,materialBronze,'../models/mono/pie_obj.obj');
    this.crearObjeto(objectLoader,this.pieDerecho,materialBronze,'../models/mono/pieDerecho_obj.obj');
    this.crearObjeto(objectLoader,this.platillo,materialGold,'../models/mono/platillo_obj.obj');
    this.crearObjeto(objectLoader,this.platilloDerecho,materialGold,'../models/mono/platilloDerecha_obj.obj');
    this.crearObjeto(objectLoader,this.tuerca,materialGold,'../models/mono/tuerca_obj.obj');

    //la z es la y
    //la x es la x => + (izquierda) || - (derecha)
    //la y es la z

    this.cabeza.translateZ(56);
    this.boca.translateZ(-4);
    this.boca.translateX(-2);
    this.boca.translateY(-2);

    this.tuerca.translateZ(14);
    this.tuerca.translateY(60);

    this.platilloDerecho.translateX(1);
    this.platilloDerecho.translateY(-77);
    this.platilloDerecho.translateZ(-8);
    this.brazoDerecho.translateX(41);
    this.brazoDerecho.translateY(11);
    this.brazoDerecho.translateZ(34);

    this.brazo.translateX(-41);
    this.brazo.translateY(11);
    this.brazo.translateZ(34);

    this.platillo.translateY(-78);
    this.platillo.translateZ(-6);

    this.pieDerecho.translateX(40);
    this.pieDerecho.translateY(10);
    this.pieDerecho.translateZ(-7);
    this.pie.translateX(-40);
    this.pie.translateY(10);
    this.pie.translateZ(-7);

   
    this.cabeza.add(this.boca);
    this.cuerpo.add(this.cabeza);

    this.cuerpo.add(this.tuerca);
    
    this.brazo.add(this.platillo);
    this.cuerpo.add(this.brazo);

    this.brazoDerecho.add(this.platilloDerecho);
    this.cuerpo.add(this.brazoDerecho);

    this.cuerpo.add(this.pie);
    this.cuerpo.add(this.pieDerecho);

    this.cuerpo.translateY(13);
    this.cuerpo.scale.set(0.25,0.25,0.25);
    this.cuerpo.rotateX(-Math.PI/2);

    this.add(this.cuerpo);
    this.reloj = new THREE.Clock();
    this.positionInicialCabeza = this.cabeza.position.z;
   
  }

  posicionarHabitacion(){
    this.translateZ(-76);
    this.translateY(28);
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
    var segundosTranscurridos = this.reloj.getDelta();
    if(segundosTranscurridos >= 1){
        segundosTranscurridos = 0.01;
    }
    this.modificaGiroTuerca(segundosTranscurridos);
    this.modificarGiroBoca(segundosTranscurridos);
    this.modificarReboteCabeza(segundosTranscurridos);
    

}

modificaGiroTuerca(segundosTranscurridos) {
    this.giroTuerca = this.velocidad* (this.velocidad_tuerca * segundosTranscurridos);
    this.tuerca.rotation.y += this.giroTuerca;
}

modificarGiroBoca(segundosTranscurridos){
    
    if(!this.disminuirBoca){
        this.giroBoca = -1 * this.velocidad*segundosTranscurridos*this.velocidad_boca;
        this.boca.rotation.x += -this.giroBoca;
    }else{
        this.giroBoca = this.velocidad*segundosTranscurridos *this.velocidad_boca;
        this.boca.rotation.x += -this.giroBoca;
    }
   
    if(this.boca.rotation.x >= 0){ //mandibula para abajo
        this.disminuirBoca = true;
    }
    if(this.boca.rotation.x <= -0.15){ //mandibula para arriba
        this.disminuirBoca = false;
    }
}


modificarReboteCabeza(segundosTranscurridos) {
   
    if(!this.disminuirRebote){
        this.reboteCabeza = -1*this.velocidad*segundosTranscurridos*this.velocidad_cabeza;
        this.cabeza.position.z += -this.reboteCabeza;
    }else{
        this.reboteCabeza = this.velocidad*segundosTranscurridos*this.velocidad_cabeza;
        this.cabeza.position.z += -this.reboteCabeza;
        
    }
    if(this.cabeza.position.z >= this.positionInicialCabeza+5){
        this.disminuirRebote = true;
    }
    if(this.cabeza.position.z <= this.positionInicialCabeza){
        this.disminuirRebote = false;
    }
}


modificarGiroBrazo(valor) {

    if(this.disminuirGiroBrazo){
        this.giroBrazo -= valor *this.velocidad*this.reloj.getDelta();
        this.transladarBrazo -= valor *this.velocidad*this.reloj.getDelta();

    }else{
        this.giroBrazo += valor *this.velocidad*this.reloj.getDelta();
        this.transladarBrazo += valor * this.velocidad*this.reloj.getDelta();
    }

    if(this.giroBrazo >= 11.7){
        this.disminuirGiroBrazo = true;
    }
    if(this.giroBrazo <= 0){
        this.disminuirGiroBrazo = false;
    }
}
  


}
