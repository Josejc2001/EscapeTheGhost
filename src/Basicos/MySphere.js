
import * as THREE from '../../libs/three.module.js'
 
class MySphere extends THREE.Mesh {
  constructor(elColor) {
    super();
    if(elColor == undefined){
      elColor = 0x000000;
    }
    this.elColor = elColor;
    
    // Un Mesh se compone de geometría y material
    var sphereGeom = new THREE.SphereGeometry(2,10,10);
    // Como material se crea uno a partir de un color
    var sphereMat = new THREE.MeshPhongMaterial({color: 0xCF0000});
    
    // Ya podemos construir el Mesh
    this.sphere = new THREE.Mesh (sphereGeom, sphereMat);
    // Y añadirlo como hijo del Object3D (el this)
    
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    this.sphere.position.y = 4.0;
    
    return this.sphere;
  }
  clone( recursive ) {

		return new this.constructor(this.elColor).copy( this, recursive );

	}
}

export { MySphere };
