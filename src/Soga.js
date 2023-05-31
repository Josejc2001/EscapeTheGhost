
import * as THREE from '../libs/three.module.js'
import { OBJLoader } from '../libs/OBJLoader.js'
import { Manivela } from './Caja1/Manivela.js';

export class Soga extends THREE.Object3D{
  
    constructor(){
        super();
        var objectLoader = new OBJLoader();

        this.palabrasDiccionario = [
          "casa",
          "perro",
          "gato",
          "arbol",
          "coche",
          "sol",
          "mesa",
          "libro",
          "ciudad",
          "playa",
          "flor",
          "montaña",
          "avion",
          "computadora",
          "pelicula"
        ];

        this.numerOfVidas = 5;
        

        this.letrasEscritas = [];

        const material = new THREE.MeshPhongMaterial({
            color: 0x8B4513, // Color marrón similar al de una soga
            specular: 0x000000, // Sin brillo especular
            shininess: 0, // Sin brillo especular
            wireframe: true, // Mostrar el objeto como alambres
          });
          
        this.crearObjeto(objectLoader,this,material,'../../models/soga/objeto.obj');

        this.start =false;

        this.palabra = '';
        this.gano = false;
        this.vidas =  this.numerOfVidas;

        this.manivela = new Manivela();
        this.manivela.scale.set(0.05,0.05,0.05);
        this.manivela.translateY(-0.5);
        this.manivela.translateX(-9.5);
        this.manivela.rotateZ(Math.PI/2);
        
        this.add(this.manivela);
        this.cogioManivela = false;

        this.manivela.visible = false;
        this.manivela.userData.hidden = true;

    }

    obtenerPalabraAleatoria() {
      const indice = Math.floor(Math.random() * this.palabrasDiccionario.length);
      return this.palabrasDiccionario[indice];
    }

    cogerManivela(){
      this.cogioManivela = true;
      this.manivela.visible = false;
      this.manivela.userData.hidden = true;
      
    }

    posicionarHabitacion(){
        this.scale.set(4,6,4);
        this.translateY(50);
        this.translateX(-60);
        this.translateZ(-81);
        this.rotateZ(Math.PI/2);
    }

    letraEscrita(letra){
      if(letra.length == 0) return;
      if(letra.length != this.palabra.length && letra.length != 1) {
        this.vidas--;
        return;
      }

      let letraU = letra.toUpperCase();
      let palabraU = this.palabra.toUpperCase();
      for(let i = 0 ; i < this.letrasEscritas.length; ++i){
        let pal = this.letrasEscritas[i];
        if(pal.toUpperCase() == letraU){
          this.vidas--;
          return;
        }
      }

      
      let salida = document.getElementById('sogaAdivinar').textContent;
      if(letraU == palabraU){
        this.gano = true;
        document.getElementById('sogaAdivinar').textContent = palabraU.split('').join(' ');
        return;
      }else if(palabraU.includes(letraU)){
        let nuevaSalida = "";
        let j = 0;
        for (let i = 0; i < palabraU.length; i++) {
          if (salida[j] !== "_" && salida[j] !== " ") {
            nuevaSalida += salida[j] + " ";
          } else if (palabraU[i] === letraU) {
            nuevaSalida += letraU + " ";
          } else {
            nuevaSalida += "_ ";
          }
          j += 2;
        }

        let checker = nuevaSalida.trim().replace(/\s/g, "").replace(' ',"").toUpperCase();
        if (checker == palabraU) {
          this.gano = true;
        }else{
          this.letrasEscritas.push(letraU);
        }
        document.getElementById('sogaAdivinar').textContent = nuevaSalida;
      }else{
        this.letrasEscritas.push(letraU);
        this.vidas--;
      }
    }


    startGame(){
      this.letrasEscritas = [];
      document.getElementById('sogaAdivinar').textContent = '';
      this.vidas =  this.numerOfVidas;
      this.start = true;
      this.palabra = this.obtenerPalabraAleatoria();

      let salida = '';
      for(let i = 0 ; i< this.palabra.length ; ++i){
        salida += '_ ';
      }
      document.getElementById('sogaAdivinar').textContent = salida;
    }

    activarManivel(){

      this.manivela.visible = true;
      this.manivela.userData.hidden = false;

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