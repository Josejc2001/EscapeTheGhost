import * as THREE from '../libs/three.module.js'
 
class Simon extends THREE.Object3D {
  constructor() {
    super();

    var materialAmarillo = new THREE.MeshPhongMaterial({color: 0xffff00});
    var materialVerde = new THREE.MeshPhongMaterial({color: 0x008f39});
    var materialRojo = new THREE.MeshPhongMaterial({color: 0xff0000});
    var materialAzul = new THREE.MeshPhongMaterial({color: 0x0000ff});

    this.amarillo = this.crearColor(materialAmarillo);
    this.amarillo.position.y = -1;
    this.amarillo.position.z = 22;
    this.amarillo.position.x = 2;

    this.verde = this.crearColor(materialVerde);
    this.verde.rotateX(Math.PI);
    this.verde.position.y = 2;
    this.verde.position.x = 2;
    this.verde.position.z = -22;

    this.rojo = this.crearColor(materialRojo);
    this.rojo.rotateZ(Math.PI);
    this.rojo.position.y = -1;
    this.rojo.position.x = -2;
    this.rojo.position.z = -22;


    this.azul = this.crearColor(materialAzul);
    this.azul.rotateZ(Math.PI);
    this.azul.rotateX(Math.PI);
    this.azul.position.y = 2;
    this.azul.position.z = 22;
    this.azul.position.x = -2;

    // this.add(this.amarillo);
    // this.add(this.verde);
    // this.add(this.rojo);
    // this.add(this.azul);

    this.base = this.crearBase();

    this.simon = new THREE.Object3D();
    this.simon.add(this.amarillo);
    this.simon.add(this.rojo);
    this.simon.add(this.verde);
    this.simon.add(this.azul);
    this.simon.add(this.base);

    this.add(this.simon);
  }


  crearColor(material){
    var contornoColor = new THREE.Shape();
    contornoColor.moveTo(0,0);
    contornoColor.lineTo(0,10);
    contornoColor.quadraticCurveTo(5,15,5,20);
    contornoColor.lineTo(15,20);
    contornoColor.quadraticCurveTo(15,0,0,0);

    var options = { depth: 3,
        bevelEnabled: false };

    var geometry = new THREE. ExtrudeGeometry ( contornoColor , options ) ;
    var asa = new THREE.Mesh(geometry, material);
    asa.rotateX(-Math.PI/2);
    return asa;
  }

  crearBase(){
    var baseGeom = new THREE.CylinderGeometry(20,20,3,15,15);
    baseGeom.scale(1.1,1,1.25);
    baseGeom.translate(0,-1,0);
    var baseMat = new THREE.MeshPhongMaterial({color: 0x0a0a0a});

    var baseMesh = new THREE.Mesh(baseGeom, baseMat);
    return baseMesh;
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
  }

  vector2toVector3 (v2) {
    var v3 = [];
    
    v2.forEach ((v) => {
      v3.push (new THREE.Vector3 (v.x, v.y, 0));
    });
    
    return v3;
  }
}

export { Simon };