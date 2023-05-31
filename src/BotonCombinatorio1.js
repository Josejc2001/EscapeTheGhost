import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class BotonCombinatorio1 extends THREE.Object3D {
  constructor() {
    super();

    this.base = this.crearBase();
    //this.add(this.base);
    this.pulsador = this.crearPulsador();
    //this.add(this.pulsador);
    this.pulsador.position.y = 1;

    this.botonCombinatorio1 = new THREE.Object3D();
    this.botonCombinatorio1.add(this.base);
    this.botonCombinatorio1.add(this.pulsador);

    this.add(this.botonCombinatorio1);
  }

  crearBase(){
    var baseGeom = new THREE.CylinderGeometry(5,5,2,15,15);
    var baseMat = new THREE.MeshPhongMaterial({color: 0x000000});

    var baseMesh = new THREE.Mesh(baseGeom, baseMat);

    var torusGeom = new THREE.TorusGeometry(5,1,15,15);
    torusGeom.rotateX(Math.PI/2);
    var torusMesh = new THREE.Mesh(torusGeom, baseMat);

    //this.add(asientoMesh);
    //this.add(torusMesh);

    var csgBase = new CSG();
    csgBase.union([baseMesh, torusMesh]);
    var baseCompleta = csgBase.toMesh();

    return baseCompleta;
  }

  crearPulsador(){
    var pulsadorGeom = new THREE.SphereGeometry(4,15,4,15);
    //pulsadorGeom.translate(0,10,0);
    var pulsadorMat = new THREE.MeshPhongMaterial({color: 0xF00FF});

    var corteGeom = new THREE.BoxGeometry(10,10,10);
    corteGeom.translate(0,-5,0);
    var corteMesh = new THREE.Mesh(corteGeom, pulsadorMat);
    //this.add(corteMesh);

    var pulsadorMesh = new THREE.Mesh(pulsadorGeom, pulsadorMat);

    var csgPulsador = new CSG();
    csgPulsador.subtract([pulsadorMesh, corteMesh]);
    var pulsadorCompleto = csgPulsador.toMesh();

    return pulsadorCompleto;
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

export { BotonCombinatorio1 };