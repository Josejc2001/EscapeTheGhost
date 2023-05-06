import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class StrongBox extends THREE.Object3D {
  constructor() {
    super();
    
    // Un Mesh se compone de geometría y material

    var estructuraCajaFuerte = this.crearCajaFuerte();

    var puerta = this.crearPuerta();

    // this.add(estructuraCajaFuerte);

    // this.add(puerta);

    this.cajaFuerte = new THREE.Object3D();
    this.cajaFuerte.add(estructuraCajaFuerte);
    this.cajaFuerte.add(puerta);

    this.add(this.cajaFuerte);
    
  }

  crearCajaFuerte(){
    var cajaFueraGeom = new THREE.BoxGeometry(20,20,20);

    var cajaFueraMat = new THREE.MeshPhongMaterial({color: 0x434b4d});

    var cajaFueraMesh = new THREE.Mesh(cajaFueraGeom, cajaFueraMat);

    var cajaDentroGeom = new THREE.BoxGeometry(18,18,18);
    cajaDentroGeom.translate(0,0,2);

    var cajaDentroMesh = new THREE.Mesh(cajaDentroGeom, cajaFueraMat);

    //this.add(cajaDentroMesh);

    //this.add(cajaFueraMesh);

    var csg = new CSG();
    csg.subtract([cajaFueraMesh, cajaDentroMesh]);
    var estructuraCajaFuerte = csg.toMesh()


    return estructuraCajaFuerte;
  }

  crearPuerta(){
    var puertaGeom = new THREE.BoxGeometry(18, 18, 1);

    var puertaMat = new THREE.MeshPhongMaterial({color: 0x434b4d});

    var puertaMesh = new THREE.Mesh(puertaGeom, puertaMat);

    var bisagra1 = this.crearBisagra();
    var bisagra2 = this.crearBisagra();

    bisagra1.position.y = 5;
    bisagra1.position.x = -9;
    bisagra1.position.z = 0.5;

    //this.add(bisagra1);

    bisagra2.position.y = -5;
    bisagra2.position.x = -9;
    bisagra2.position.z = 0.5;

    //this.add(bisagra2);

    var volante = this.crearVolante();
    volante.position.y = -2;
    volante.position.x = -2;
    volante.position.z = 1.5;

    var teclado = this.crearTeclado();
    teclado.position.z = 0.75;
    teclado.position.x = 4;
    teclado.position.y = 4;

    //this.add(teclado);

    //this.add(volante);

    var csgPuerta = new CSG();
    csgPuerta.union([puertaMesh, bisagra1, bisagra2, volante,teclado]);
    var puertaCompleta = csgPuerta.toMesh();

    puertaCompleta.position.z = 9.8;

    return puertaCompleta;
  }

  crearBisagra(){
    var bisagraArribaGeom = new THREE.CylinderGeometry(0.5,0.5,2,15,15);
    bisagraArribaGeom.translate(0,1.2,0);
    var bisagraMat = new THREE.MeshPhongMaterial({color: 0x434b4d});

    var bisagraAbajoGeom = new THREE.CylinderGeometry(0.5,0.5,2,15,15);
    bisagraAbajoGeom.translate(0,-1.2,0);

    var bisagraMedioGeom = new THREE.CylinderGeometry(0.4,0.4,2,15,15);
    bisagraMedioGeom.translate(0,0,0);

    var bisagraArriba = new THREE.Mesh(bisagraArribaGeom, bisagraMat);

    var bisagraAbajo = new THREE.Mesh(bisagraAbajoGeom, bisagraMat);

    var bisagraMedio = new THREE.Mesh(bisagraMedioGeom, bisagraMat);

    //this.add(bisagraArriba);

    //this.add(bisagraAbajo);

    //this.add(bisagraMedio);

    var csgBisagra = new CSG();
    csgBisagra.union([bisagraArriba, bisagraAbajo, bisagraMedio]);
    var bisagraCompleta = csgBisagra.toMesh();

    return bisagraCompleta;

  }

  crearVolante(){
    var volanteGeom = new THREE.TorusGeometry(3,0.5,15,15);
    var puertaMat = new THREE.MeshPhongMaterial({color: 0x434b4d});
    //volanteGeom.translate(-2,-2,1.5);
    var volanteMesh = new THREE.Mesh(volanteGeom, puertaMat);

    var cylinderGeometry = new THREE.CylinderGeometry(1,1,2,15,15);
    cylinderGeometry.rotateX(Math.PI/2);
    cylinderGeometry.translate(0,0,-0.5);

    var cylinderPalo1Geometry = new THREE.CylinderGeometry(0.3,0.3,2.5,15,15);
    cylinderPalo1Geometry.translate(0,2,0);

    var cylinderPalo2Geometry = new THREE.CylinderGeometry(0.3,0.3,2.5,15,15);
    cylinderPalo2Geometry.rotateZ(3*Math.PI/4.5);
    cylinderPalo2Geometry.translate(-1.5,-0.5,0);

    var cylinderPalo3Geometry = new THREE.CylinderGeometry(0.3,0.3,2.5,15,15);
    cylinderPalo3Geometry.rotateZ(-3*Math.PI/4.5);
    cylinderPalo3Geometry.translate(1.5,-0.5,0);

    var cylinderMesh = new THREE.Mesh(cylinderGeometry, puertaMat);

    var cylinder1Mesh = new THREE.Mesh(cylinderPalo1Geometry, puertaMat);

    var cylinder2Mesh = new THREE.Mesh(cylinderPalo2Geometry, puertaMat);

    var cylinder3Mesh = new THREE.Mesh(cylinderPalo3Geometry, puertaMat);

    //this.add(cylinderMesh);

    //this.add(cylinder1Mesh);

    //this.add(cylinder2Mesh);

    //this.add(cylinder3Mesh);
    
    //this.add(volanteMesh);

    var csgVolante = new CSG();
    csgVolante.union([cylinderMesh, cylinder1Mesh, cylinder2Mesh, cylinder3Mesh, volanteMesh]);
    var volanteCompleto = csgVolante.toMesh();

    return volanteCompleto;
  }

  crearTeclado(){
    var cajaGrandeGeom = new THREE.BoxGeometry(6,6,0.5);
    //cajaGrandeGeom.translate(0,0,3);
    var puertaMat = new THREE.MeshPhongMaterial({color: 0x434b4d });

    var cajaMesh = new THREE.Mesh(cajaGrandeGeom, puertaMat);

    //this.add(cajaMesh);

    var numero1 = new THREE.BoxGeometry(1,1,0.5);
    numero1.translate(-2,2,0.4);
    var numeroMesh1 = new THREE.Mesh(numero1, puertaMat);

    var numero2 = new THREE.BoxGeometry(1,1,0.5);
    numero2.translate(0,2,0.4);
    var numeroMesh2 = new THREE.Mesh(numero2, puertaMat);

    var numero3 = new THREE.BoxGeometry(1,1,0.5);
    numero3.translate(2,2,0.4);
    var numeroMesh3 = new THREE.Mesh(numero3, puertaMat);

    var numero4 = new THREE.BoxGeometry(1,1,0.5);
    numero4.translate(-2,0,0.4);
    var numeroMesh4 = new THREE.Mesh(numero4, puertaMat);

    var numero5 = new THREE.BoxGeometry(1,1,0.5);
    numero5.translate(0,0,0.4);
    var numeroMesh5 = new THREE.Mesh(numero5, puertaMat);

    var numero6 = new THREE.BoxGeometry(1,1,0.5);
    numero6.translate(2,0,0.4);
    var numeroMesh6 = new THREE.Mesh(numero6, puertaMat);

    var numero7 = new THREE.BoxGeometry(1,1,0.5);
    numero7.translate(-2,-2,0.4);
    var numeroMesh7 = new THREE.Mesh(numero7, puertaMat);

    var numero8 = new THREE.BoxGeometry(1,1,0.5);
    numero8.translate(0,-2,0.4);
    var numeroMesh8 = new THREE.Mesh(numero8, puertaMat);

    var numero9 = new THREE.BoxGeometry(1,1,0.5);
    numero9.translate(2,-2,0.4);
    var numeroMesh9 = new THREE.Mesh(numero9, puertaMat);

    // this.add(numeroMesh1);
    // this.add(numeroMesh2);
    // this.add(numeroMesh3);
    // this.add(numeroMesh4);
    // this.add(numeroMesh5);
    // this.add(numeroMesh6);
    // this.add(numeroMesh7);
    // this.add(numeroMesh8);
    // this.add(numeroMesh9);

    var csgTeclado = new CSG();
    csgTeclado.union([cajaMesh, numeroMesh1, numeroMesh2, numeroMesh3, numeroMesh4, numeroMesh5, numeroMesh6, numeroMesh7,
    numeroMesh8, numeroMesh9]);
    var tecladoCompleto = csgTeclado.toMesh()

    return tecladoCompleto;
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

export { StrongBox };