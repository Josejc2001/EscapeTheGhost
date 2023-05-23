import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class CatchStick extends THREE.Object3D {
  constructor() {
    super();
    
    this.palo = this.crearPalo();
    // this.add(this.palo);

    this.mango = this.crearMango();
    // this.add(this.mango);
    this.mango.position.z = 25;

    this.boca1 = this.crearBoca();
    this.boca2 = this.crearBoca();
    this.boca2.rotation.y = Math.PI;
    this.boca1.position.z = -25;
    this.boca2.position.z = -25;

    // this.add(this.boca1);
    // this.add(this.boca2);

    this.paloCompleto = new THREE.Object3D();
    this.paloCompleto.add(this.mango);
    this.paloCompleto.add(this.palo);
    this.paloCompleto.add(this.boca1);
    this.paloCompleto.add(this.boca2);

    this.add(this.paloCompleto);
    
  }

  posicionarHabitacion(){
    this.paloCompleto.rotateX(Math.PI/2);
    this.position.x = 45;
    this.position.z = -95.5;
    this.position.y = 29.5;
  }

  crearPalo(){
    var paloGeom = new THREE.CylinderGeometry(1,1,50,15,15);
    paloGeom.rotateX(Math.PI/2);
    var paloMat = new THREE.MeshPhongMaterial({color: 0x9f9f9f});

    var paloMesh = new THREE.Mesh(paloGeom, paloMat);

    var paloInterGeom = new THREE.CylinderGeometry(1.2,1.2,5,15,15);
    paloInterGeom.rotateX(Math.PI/2);
    var palo2Mat = new THREE.MeshPhongMaterial({color: 0x0a0a0a});

    var paloInterMesh = new THREE.Mesh(paloInterGeom, palo2Mat);

    var palo = new THREE.Object3D();
    palo.add(paloMesh);
    palo.add(paloInterMesh);

    return palo;
  }

  crearMango(){
    var paloMangoGeom = new THREE.CylinderGeometry(1.1,1.1,9.2,15,15);
    paloMangoGeom.rotateX(Math.PI/2);
    paloMangoGeom.rotateY(Math.PI/2);
    var paloMangoMat = new THREE.MeshPhongMaterial({color: 0x0a0a0a});

    var paloMangoMesh = new THREE.Mesh(paloMangoGeom, paloMangoMat);

    var corteMangoGeom = new THREE.BoxGeometry(10, 3, 7);
    corteMangoGeom.translate(0,0,-3.5);
    var corteMangoMesh = new THREE.Mesh(corteMangoGeom, paloMangoMat);

    //this.add(corteMangoMesh);

    var torusMangoGeom = new THREE.TorusGeometry(3.5, 1.2,15,15);
    torusMangoGeom.rotateX(Math.PI/2);
    var torusMangoMesh = new THREE.Mesh(torusMangoGeom, paloMangoMat);

    // this.add(paloMangoMesh);
    // this.add(torusMangoMesh);

    var csgMango = new CSG();
    csgMango.subtract([torusMangoMesh, corteMangoMesh])
    csgMango.union([paloMangoMesh]);
    var mango = csgMango.toMesh();
    return mango;
  }

  crearBoca(){
    var shape = new THREE.Shape();
    shape.moveTo(-1.5,-0.5);
    shape.lineTo(-1.5,0.5);
    shape.lineTo(1.5,0.5);
    shape.lineTo(1.5,-0.5);

    var contornoAsas = new THREE.Shape();
    contornoAsas.moveTo(0,0);
    contornoAsas.lineTo(5,5);
    contornoAsas.lineTo(3,10);

    var perfilAsas = contornoAsas.getPoints(50);
    perfilAsas = this.vector2toVector3(perfilAsas);
    var path = new THREE.CatmullRomCurve3(perfilAsas);
    var options = { steps : 50 , curveSegments : 4 , extrudePath : path };

    var geometry = new THREE.ExtrudeGeometry ( shape , options ) ;
    var material = new THREE.MeshPhongMaterial({color: 0x0a0a0a});
    var asa = new THREE.Mesh(geometry, material);
    asa.rotateX(-Math.PI/2);
    return asa;
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

export { CatchStick };