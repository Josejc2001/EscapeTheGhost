import * as THREE from '../../libs/three.module.js'
 
class MyBox extends THREE.Mesh {

  elColor;
  constructor(elColor= 0x000000, textura = null) {
    super();

    this.elColor = elColor;
    
    // Un Mesh se compone de geometría y material
    this.boxGeom = new THREE.BoxBufferGeometry (1,1,1);
    // Como material se crea uno a partir de un color
    this.boxMat = new THREE.MeshPhongMaterial({color: this.elColor});
    if(textura != null){
      this.boxMat = new THREE.MeshPhongMaterial ({map: textura});
    }
    
    // Ya podemos construir el Mesh
    this.box = new THREE.Mesh (this.boxGeom, this.boxMat);
    this.box.position.y = 0.5;
    // Y añadirlo como hijo del Object3D (el this)
    return this.box;
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    
  }


  clone( recursive ) {

		return new this.constructor(this.elColor).copy( this, recursive );

	}
  
  
}

export { MyBox };
