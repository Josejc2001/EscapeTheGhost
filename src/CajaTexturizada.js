import * as THREE from '../libs/three.module.js'
 
class CajaTexturizada extends THREE.Object3D {
  constructor() {
    super();
    
    this.cajaTexturizada = this.crearCaja();

    this.add(this.cajaTexturizada);
  }

  crearCaja(){
    // Texture Loading
	var textureLoader = new THREE.TextureLoader();
	var crateTexture = textureLoader.load("../../imgs/crate0_diffuse.png");
	var crateBumpMap = textureLoader.load("../../imgs/crate0_bump.png");
	var crateNormalMap = textureLoader.load("../../imgs/crate0_normal.png");

    var crateGeometry = new THREE.BoxGeometry(30,30,30);
    crateGeometry.translate(0,7.5,0);
    var crateMaterial = new THREE.MeshPhongMaterial({color:0xffffff, 
        map:crateTexture,
        bumpMap:crateBumpMap,
        normalMap:crateNormalMap
    });

    // Create mesh with these textures
	  var crate = new THREE.Mesh(crateGeometry, crateMaterial);

    return crate;
  }

  posicionarHabitacion(){
    this.rotateY(-Math.PI/2);
    this.position.y = 5;
    this.position.z = -75;
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

export { CajaTexturizada };