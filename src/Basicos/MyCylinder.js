
import * as THREE from '../../libs/three.module.js'
 
class MyCylinder extends THREE.Object3D {
  constructor(elColor) {
    super();
    
    
    // Un Mesh se compone de geometría y material
    var cylinderGeom = new THREE.CylinderGeometry(1,1,1,50,50);
    // Como material se crea uno a partir de un color
    var cylinderMat = new THREE.MeshPhongMaterial({color: elColor});

    cylinderMat.flatShading = true;
    cylinderMat.needsUpdate = true;
    
    // Ya podemos construir el Mesh
    this.cylinder = new THREE.Mesh (cylinderGeom, cylinderMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.cylinder);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    this.cylinder.position.y = 0.5;
  }

}

export { MyCylinder };
