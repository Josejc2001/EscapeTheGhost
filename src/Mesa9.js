import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Mesa9 extends THREE.Object3D {
  constructor() {
    super();
    
    // Un Mesh se compone de geometría y material

    var patas = this.crearPatas();
    //this.add(patas);

    var tablero1 = this.crearTableros();
    //this.add(tablero1);
    tablero1.scale.set(1,1,1.5);
    tablero1.position.z = -28;
    tablero1.position.y = 20;

    var tablero2 = this.crearTableros();
    //this.add(tablero2);
    tablero2.scale.set(1.25,1,2);
    tablero2.position.z = -35;
    tablero2.position.y = 22;

    this.mesa9 = new THREE.Object3D();
    this.mesa9.add(patas);
    this.mesa9.add(tablero1);
    this.mesa9.add(tablero2);
    this.add(this.mesa9);
  }

  crearPatas(){
    var pata1Geom = new THREE.BoxGeometry(2,20,2);
    pata1Geom.translate(15,10,0);
    var pataMat = new THREE.MeshPhongMaterial({color: 0x804000});
    var pata1Mesh = new THREE.Mesh(pata1Geom, pataMat);

    var pata2Geom = new THREE.BoxGeometry(2,20,2);
    pata2Geom.translate(-15,10,0);
    var pata2Mesh = new THREE.Mesh(pata2Geom, pataMat);

    var pata3Geom = new THREE.BoxGeometry(2,20,2);
    pata3Geom.translate(0,10,-25);
    var pata3Mesh = new THREE.Mesh(pata3Geom, pataMat);

    // this.add(pata1Mesh);
    // this.add(pata2Mesh);
    // this.add(pata3Mesh);

    var patas = new THREE.Object3D();
    patas.add(pata1Mesh);
    patas.add(pata2Mesh);
    patas.add(pata3Mesh);

    return patas;
  }

  crearTableros(){
    var tablero1Geom = new THREE.BoxGeometry(40,2,40);
    var tableroMat = new THREE.MeshPhongMaterial({color: 0x804000});;
    var tablero1Mesh = new THREE.Mesh(tablero1Geom, tableroMat);

    var tableroCortar1 = new THREE.BoxGeometry(40,20,80);
    tableroCortar1.rotateY(Math.PI/4);
    tableroCortar1.translate(28,0,0);
    var tableroCortarUno = new THREE.Mesh(tableroCortar1, tableroMat);

    var tableroCortar2 = new THREE.BoxGeometry(40,20,80);
    tableroCortar2.rotateY(-Math.PI/4);
    tableroCortar2.translate(-28,0,0);
    var tableroCortarDos = new THREE.Mesh(tableroCortar2, tableroMat);

    // this.add(tablero1Mesh);
    // this.add(tableroCortarUno);
    // this.add(tableroCortarDos);

    var csgTablero = new CSG();
    csgTablero.subtract([tablero1Mesh, tableroCortarUno]);
    csgTablero.subtract([tableroCortarDos]);
    var tableroCortado = csgTablero.toMesh();

    return tableroCortado;
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
  }
}

export { Mesa9 };