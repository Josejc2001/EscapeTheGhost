import * as THREE from '../../libs/three.module.js'
 
class MyTorus extends THREE.Object3D {
  constructor() {
    super();
    
    // Un Mesh se compone de geometría y material
    var torusGeom = new THREE.TorusGeometry(5,1,10,10);
    // Como material se crea uno a partir de un color
    var torusMat = new THREE.MeshPhongMaterial({color: 0xCF0000});
    
    // Ya podemos construir el Mesh
    this.torus = new THREE.Mesh (torusGeom, torusMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.torus);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    this.torus.rotateX(Math.PI/2);
    this.torus.position.y = 10.0;
  }

}

export { MyTorus };
