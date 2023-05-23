import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class EstructuraSoga extends THREE.Object3D {
  constructor() {
    super();
    
    // Un Mesh se compone de geometría y material

    this.estructura = this.crearEstructuraSoga();
    this.add(this.estructura);
    
  }

  posicionarHabitacion(){
    this.position.z = -80;
    this.position.x = -80;
  }

  crearEstructuraSoga(){
    var paloCentralGeom = new THREE.BoxGeometry(5,80,5);
    paloCentralGeom.translate(0,40,0);
    var paloMat = new THREE.MeshPhongMaterial({color: 0x804000});
    var paloCentralMesh = new THREE.Mesh(paloCentralGeom, paloMat);

    var paloSuperior1Geom = new THREE.BoxGeometry(4,40,4);
    paloSuperior1Geom.rotateZ(Math.PI/2);
    paloSuperior1Geom.translate(20,70,0);
    var paloSuperior1Mesh = new THREE.Mesh(paloSuperior1Geom, paloMat);

    var paloSuperior2Geom = new THREE.BoxGeometry(4,10,4);
    paloSuperior2Geom.rotateZ(Math.PI/2);
    paloSuperior2Geom.translate(-5,70,0);
    var paloSuperior2Mesh = new THREE.Mesh(paloSuperior2Geom, paloMat);

    // this.add(paloCentralMesh);
    // this.add(paloSuperior1Mesh);
    // this.add(paloSuperior2Mesh);

    var csgFinal = new CSG();
    csgFinal.union([paloCentralMesh, paloSuperior1Mesh, paloSuperior2Mesh]);
    var estructura = csgFinal.toMesh();

    return estructura;
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

export { EstructuraSoga };