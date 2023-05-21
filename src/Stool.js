import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Stool extends THREE.Object3D {
  constructor() {
    super();
    
    this.patas = this.crearPatas();
    //this.add(this.patas);

    this.asiento = this.crearAsiento();
    this.asiento.position.y = 9.5;
    //this.add(this.asiento);

    var csgFinal = new CSG();
    csgFinal.union([this.patas, this.asiento]);
    this.taburete = csgFinal.toMesh();

    this.add(this.taburete);
  }

  posicionarHabitacion(){
    
    this.position.z = -80;
    this.position.x = -60;
  }

  crearPatas(){
    var pata1Geom = new THREE.CylinderGeometry(1,1,10,15,15);
    pata1Geom.translate(0,5,0);
    pata1Geom.rotateZ(-Math.PI/8);
    pata1Geom.rotateY(Math.PI/4);
    var pataMat = new THREE.MeshPhongMaterial({color: 0x804000});

    var pata1Mesh = new THREE.Mesh(pata1Geom, pataMat);
    pata1Mesh.position.x = -5;
    pata1Mesh.position.z = 5;

    var pata2Geom = new THREE.CylinderGeometry(1,1,10,15,15);
    pata2Geom.translate(0,5,0);
    pata2Geom.rotateZ(-Math.PI/8);
    pata2Geom.rotateY(-Math.PI/4);
    

    var pata2Mesh = new THREE.Mesh(pata2Geom, pataMat);
    pata2Mesh.position.x = -5;
    pata2Mesh.position.z = -5;

    var pata3Geom = new THREE.CylinderGeometry(1,1,10,15,15);
    pata3Geom.translate(0,5,0);
    pata3Geom.rotateZ(Math.PI/8);
    pata3Geom.rotateY(-Math.PI/4);

    var pata3Mesh = new THREE.Mesh(pata3Geom, pataMat);
    pata3Mesh.position.x = 5;
    pata3Mesh.position.z = 5;

    var pata4Geom = new THREE.CylinderGeometry(1,1,10,15,15);
    pata4Geom.translate(0,5,0);
    pata4Geom.rotateZ(Math.PI/8);
    pata4Geom.rotateY(Math.PI/4);

    var pata4Mesh = new THREE.Mesh(pata4Geom, pataMat);
    pata4Mesh.position.x = 5;
    pata4Mesh.position.z = -5;

    var palo1InterGeom = new THREE.BoxGeometry(1,7,1);
    palo1InterGeom.rotateX(Math.PI/2);
    palo1InterGeom.translate(-4,4.5,0);
    var palo1InterMesh = new THREE.Mesh(palo1InterGeom, pataMat);

    var palo2InterGeom = new THREE.BoxGeometry(1,7,1);
    palo2InterGeom.rotateX(Math.PI/2);
    palo2InterGeom.translate(4,4.5,0);
    var palo2InterMesh = new THREE.Mesh(palo2InterGeom, pataMat);

    var palo3InterGeom = new THREE.BoxGeometry(1,7,1);
    palo3InterGeom.rotateX(Math.PI/2);
    palo3InterGeom.rotateY(Math.PI/2);
    palo3InterGeom.translate(0,4.5,4);
    var palo3InterMesh = new THREE.Mesh(palo3InterGeom, pataMat);

    var palo4InterGeom = new THREE.BoxGeometry(1,7,1);
    palo4InterGeom.rotateX(Math.PI/2);
    palo4InterGeom.rotateY(Math.PI/2);
    palo4InterGeom.translate(0,4.5,-4);
    var palo4InterMesh = new THREE.Mesh(palo4InterGeom, pataMat);

    // this.add(palo1InterMesh);
    // this.add(palo2InterMesh);
    // this.add(palo3InterMesh);
    // this.add(palo4InterMesh);

    // this.add(pata1Mesh);
    // this.add(pata2Mesh);
    // this.add(pata3Mesh);
    // this.add(pata4Mesh);

    var csgPatas = new CSG();
    csgPatas.union([pata1Mesh, pata2Mesh, pata3Mesh, pata4Mesh]);
    csgPatas.union([palo1InterMesh, palo2InterMesh, palo3InterMesh, palo4InterMesh]);
    var patas = csgPatas.toMesh();

    return patas;
  }

  crearAsiento(){
    var asientoGeom = new THREE.CylinderGeometry(5,5,2,15,15);
    var asientoMat = new THREE.MeshPhongMaterial({color: 0x804000});

    var asientoMesh = new THREE.Mesh(asientoGeom, asientoMat);

    var torusGeom = new THREE.TorusGeometry(5,1,15,15);
    torusGeom.rotateX(Math.PI/2);
    var torusMesh = new THREE.Mesh(torusGeom, asientoMat);

    //this.add(asientoMesh);
    //this.add(torusMesh);

    var csgAsiento = new CSG();
    csgAsiento.union([asientoMesh, torusMesh]);
    var asientoCompleto = csgAsiento.toMesh();

    return asientoCompleto;
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

export { Stool };