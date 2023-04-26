import * as THREE from '../../libs/three.module.js'
 
class MyTorus extends THREE.Mesh {
  constructor(elColor) {
    super();
    if(elColor == undefined){
      elColor = 0x000000;
    }
    this.elColor = elColor;
    // Un Mesh se compone de geometría y material
    var torusGeom = new THREE.TorusGeometry(5,1,10,10);
    // Como material se crea uno a partir de un color
    var torusMat = new THREE.MeshPhongMaterial({color: 0xCF0000});
    
    // Ya podemos construir el Mesh
    this.torus = new THREE.Mesh (torusGeom, torusMat);
    // Y añadirlo como hijo
    this.torus.position.y = 10.0;

    return this.torus;
  }
  clone( recursive ) {

		return new this.constructor(this.elColor).copy( this, recursive );

	}
}

export { MyTorus };
