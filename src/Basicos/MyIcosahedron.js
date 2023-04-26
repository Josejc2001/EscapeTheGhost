
import * as THREE from '../../libs/three.module.js'
 
class MyIcosahedron extends THREE.Mesh {
  constructor(elColor) {
    super();
    if(elColor == undefined){
      elColor = 0x000000;
    }
    this.elColor = elColor;
    // Un Mesh se compone de geometría y material
    var icosahedronGeom = new THREE.IcosahedronGeometry(4,0);
    // Como material se crea uno a partir de un color
    var icosahedronMat = new THREE.MeshPhongMaterial({color: 0xCF0000});
    
    // Ya podemos construir el Mesh
    this.icosahedron = new THREE.Mesh (icosahedronGeom, icosahedronMat);
    // Y añadirlo como hijo del Object3D (el this)
  
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    this.icosahedron.position.y = 6.0;

    return this.icosahedron;
  }
  clone( recursive ) {

		return new this.constructor(this.elColor).copy( this, recursive );

	}
}

export { MyIcosahedron };
