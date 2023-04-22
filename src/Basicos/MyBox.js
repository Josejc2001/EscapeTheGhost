import * as THREE from '../../libs/three.module.js'
 
class MyBox extends THREE.Object3D {
  constructor(elColor) {
    super();
    
    
    // Un Mesh se compone de geometría y material
    var boxGeom = new THREE.BoxBufferGeometry (1,1,1);
    // Como material se crea uno a partir de un color
    var boxMat = new THREE.MeshPhongMaterial({color: elColor});
    
    // Ya podemos construir el Mesh
    var box = new THREE.Mesh (boxGeom, boxMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (box);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    box.position.y = 0.5;
  }
  
  
}

export { MyBox };
