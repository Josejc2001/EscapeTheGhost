
import * as THREE from '../../libs/three.module.js'
 
class MyCone extends THREE.Object3D {
  constructor(elColor) {
    super();
    

    if(elColor == undefined){
      elColor = 0x000000;
    }
    // Un Mesh se compone de geometría y material
    var coneGeom = new THREE.ConeGeometry(4,8,8);
    // Como material se crea uno a partir de un color
    var coneMat = new THREE.MeshPhongMaterial({color: elColor});
    
    coneMat.flatShading = true;
    coneMat.needsUpdate = true;

    // Ya podemos construir el Mesh
    this.cone = new THREE.Mesh (coneGeom, coneMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.cone);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    this.cone.position.y = 4;
    this.cone.position.x = -10;
  }
  clone( recursive ) {

		return new this.constructor(this.elColor).copy( this, recursive );

	}
  
}

export { MyCone };
