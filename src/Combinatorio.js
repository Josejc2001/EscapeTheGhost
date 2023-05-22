
import * as THREE from '../libs/three.module.js'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
 
class Combinatorio extends THREE.Object3D {
  constructor() {
    super();

    var materialAmarillo = new THREE.MeshPhongMaterial({color: 0xffff00});
    var materialAzul = new THREE.MeshPhongMaterial({color: 0x15f4ee});
    var materialVerde = new THREE.MeshPhongMaterial({color: 0x16f10b});
    var materialRosa = new THREE.MeshPhongMaterial({color: 0xf52ef2});
    var materialRojo = new THREE.MeshPhongMaterial({color: 0xf4111b});


    this.base = this.crearBase();
    this.boton1 = this.crearBoton();
    this.boton1.position.x = -5;
    this.boton2 = this.crearBoton();
    this.boton2.position.x = -2.5;
    this.boton3 = this.crearBoton();
    this.boton4 = this.crearBoton();
    this.boton4.position.x = 2.5;
    this.boton5 = this.crearBoton();
    this.boton5.position.x = 5;

    this.color1 = this.crearColor(materialAmarillo);
    this.color1.position.x = -5;
    this.color2 = this.crearColor(materialAzul);
    this.color2.position.x = -2.5;
    this.color3 = this.crearColor(materialVerde);
    this.color4 = this.crearColor(materialRosa);
    this.color4.position.x = 2.5;
    this.color5 = this.crearColor(materialRojo);
    this.color5.position.x = 5;

    // this.add(this.base);
    // this.add(this.boton1);
    // this.add(this.boton2);
    // this.add(this.boton3);
    // this.add(this.boton4);
    // this.add(this.boton5);
    // this.add(this.color1);
    // this.add(this.color2);
    // this.add(this.color3);
    // this.add(this.color4);
    // this.add(this.color5);

    this.combinatorio = new THREE.Object3D();
    this.combinatorio.name = "Combinatorio";
    
    this.combinatorio.add(this.base);
    this.combinatorio.add(this.boton1);
    this.combinatorio.add(this.boton2);
    this.combinatorio.add(this.boton3);
    this.combinatorio.add(this.boton4);
    this.combinatorio.add(this.boton5);
    this.combinatorio.add(this.color1);
    this.combinatorio.add(this.color2);
    this.combinatorio.add(this.color3);
    this.combinatorio.add(this.color4);
    this.combinatorio.add(this.color5);
    this.boton1.name = "Boton1";
    this.boton2.name = "Boton2";
    this.boton3.name = "Boton3";
    this.boton4.name = "Boton4";
    this.boton5.name = "Boton5";
    
    this.colores = [0xff0000, 0x00ff00, 0xF1F10F, 0x0FF1EE, 0xF10FEE];

    this.add(this.combinatorio);
  }

  crearBase(){
    var baseGeom = new THREE.BoxGeometry(15,10,5);
    baseGeom.translate(0,5,0);
    var baseMat = new THREE.MeshPhongMaterial({color: 0x9b9b9b});
    var baseMesh = new THREE.Mesh(baseGeom, baseMat);

    return baseMesh;
  }

  crearBoton(){
    var botonGeom = new THREE.BoxGeometry(1,1,1);
    botonGeom.translate(0,1,2.5);
    var botonMat = new THREE.MeshPhongMaterial({color: 0x000000});
    var botonMesh = new THREE.Mesh(botonGeom, botonMat);

    return botonMesh
  }

  crearColor(material){
    var colorGeom = new THREE.BoxGeometry(1.5,7,2);
    colorGeom.translate(0, 6, 2);
    var colorMesh = new THREE.Mesh(colorGeom, material);

    return colorMesh;
    
  }

  change(obj){
    var colorRandom = this.colores[getRandomInt(5)]
    obj.material = new THREE.MeshPhongMaterial({ color: colorRandom});
    obj.material.name = colorRandom;
  }

  cambiarColor(name){
    if (name === 'Boton1') {
      this.change(this.color1);
    } else if (name === 'Boton2') {
        this.change(this.color2);
    }else if (name === 'Boton3') {
        this.change(this.color3);
    }else if (name === 'Boton4') {
        this.change(this.color4);
    }else if (name === 'Boton5') {
        this.change(this.color5);
    }
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

export { Combinatorio };