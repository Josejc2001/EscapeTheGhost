import * as THREE from '../libs/three.module.js'
 
class Room extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var pared1 = this.crearPared();
    pared1.position.z = 100;

    var pared2 = this.crearPared();
    pared2.position.z = -100;

    var pared3 = this.crearPared();
    pared3.rotateY(Math.PI/2);
    pared3.position.x = 100;

    var pared4 = this.crearPared();
    pared4.rotateY(Math.PI/2);
    pared4.position.x = -100;

    var suelo = this.crearSuelo();
    var techo = this.crearTecho();

    this.add(pared1);
    this.add(pared2);
    this.add(pared3);
    this.add(pared4);
    this.add(suelo);
    this.add(techo);
  }

  crearPared(){
    let textura = new THREE.TextureLoader().load('../imgs/pared.jpg');
    var paredGeom = new THREE.BoxGeometry (200,100,5);
    paredGeom.translate(0,50,0);
    // Como material se crea uno a partir de un color
    var paredMat = new THREE.MeshPhongMaterial({map: textura});

    var paredMesh = new THREE.Mesh(paredGeom, paredMat);

    return paredMesh;
  }

  crearTecho(){
    // La geometría es una caja con muy poca altura
    var geometryTecho = new THREE.BoxGeometry (200,0.2,200);
    
    var materialTecho = new THREE.MeshPhongMaterial({color: 0xCF0000});
    
    // Ya se puede construir el Mesh
    var techo = new THREE.Mesh (geometryTecho, materialTecho);
    
    techo.position.y = 100.1;

    return techo;
  }

  crearSuelo(){
    // La geometría es una caja con muy poca altura
    var geometrySuelo = new THREE.BoxGeometry (200,0.2,200);
    
    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var materialSuelo = new THREE.MeshPhongMaterial ({map: texture});
    
    // Ya se puede construir el Mesh
    var suelo = new THREE.Mesh (geometrySuelo, materialSuelo);
    
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    suelo.position.y = -0.1;
    
    return suelo;
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    
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

export { Room };