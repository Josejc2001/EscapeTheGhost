import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class Simon extends THREE.Object3D {
  constructor() {
    super();
   
    //emissive: 0xffffff, emissiveIntensity: 0.4
    var materialAmarillo = new THREE.MeshPhongMaterial({color: 0xffff00});
    var materialVerde = new THREE.MeshPhongMaterial({color: 0x008f39});
    var materialRojo = new THREE.MeshPhongMaterial({color: 0xff0000});
    var materialAzul = new THREE.MeshPhongMaterial({color: 0x0000ff});

    this.name = "simon";

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
    this.amarillo.name ="simon-amarillo";
    this.verde.name ="simon-verde";
    this.azul.name = "simon-azul";
    this.rojo.name = "simon-rojo";
    this.simon.add(this.amarillo);
    this.simon.add(this.rojo);
    this.simon.add(this.verde);
    this.simon.add(this.azul);
    this.simon.add(this.base);

    this.lightAmarilla = new THREE.PointLight(0xFFFD91, 0, 4);
    this.lightAmarilla.position.set(10,12,12);
    this.lightAmarilla.name = "L-Amarilla";

    this.lightAzul= new THREE.PointLight(0x478AFF, 0, 4);
    this.lightAzul.position.set(-10,12,12);
    this.lightAzul.name = "L-Azul";

    this.lightRojo = new THREE.PointLight(0xFF4F4F, 0, 4);
    this.lightRojo.position.set(-10,12,-12);
    this.lightRojo.name = "L-Rojo";

    this.lightVerde= new THREE.PointLight(0x94FF4F, 0, 4);
    this.lightVerde.position.set(10,12,-12);
    this.lightVerde.name = "L-Verde";

    this.luces = new THREE.Object3D();
    this.luces.add(this.lightAmarilla);
    this.luces.add(this.lightAzul);
    this.luces.add(this.lightVerde);
    this.luces.add(this.lightRojo);



    this.add(this.luces);
    this.add(this.simon);

    this.firstTime = true;
    this.jugar = false;
    this.ganoUser = false;

    this.jugandoUser = false;

    this.nivel = 0;
    this.perdio = false;
    this.mostrarNiveles = false;

    this.cantidadNivel = 3;

    this.coloresNiveles = this.generarArrayPorNiveles(this.cantidadNivel);
    this.coloresClicked = [];
  
  }

  addClicked(color){
    this.coloresClicked.push(color);

    for(let i = 0 ; i < this.coloresClicked.length ; ++i){
      let col = this.coloresClicked[i];
      if(this.coloresNiveles[this.nivel][i] != col){
        this._perdioUsuario();
        return false;
      }
    }

   
    if(this.coloresClicked.length == this.coloresNiveles[this.nivel].length){
      if( this.ganoNivel()) return true;
      this.jugandoUser = false;
      this.nivel++;
    }

    
    return true;
  }

  activarDesactivarLuz(color){
    switch(color){
      case 'rojo':
        if(this.lightRojo.intensity == 0)
          this.lightRojo.intensity = 14;
        else this.lightRojo.intensity = 0;
      break;
      case 'amarillo':
        if(this.lightAmarilla.intensity == 0)
          this.lightAmarilla.intensity = 14;
        else this.lightAmarilla.intensity = 0;
      break;
      case 'verde':
        if(this.lightVerde.intensity == 0)
          this.lightVerde.intensity = 14;
        else this.lightVerde.intensity = 0;
      break;
      case 'azul':
        if(this.lightAzul.intensity == 0)
          this.lightAzul.intensity = 14;
        else this.lightAzul.intensity = 0;
      break;
    }
  }

  _perdioUsuario(){
    this.perdio = true;
    this.mostrarNiveles = false;
    this.coloresNiveles = this.generarArrayPorNiveles(this.cantidadNivel);
    this.coloresClicked = [];
    this.nivel = 0;

    this.firstTime = true;
    this.ganoUser = false;

    this.jugandoUser = false;

  }

  perdioUsuario(){
    return this.perdio;
  }

  posicionarHabitacion(){
    this.scale.set(0.25,0.25,0.25);
    this.position.z = 90;
    this.position.y = 1;
    this.position.x = -60;
  }

  puedoJugar(){
    return this.jugar;
  }

  activar(){
    this.jugar = true;
  }

  gano(){
    if(this.ganoUser)this.perdio = false;
    return this.ganoUser;
  }

  FirstTime(){
    if(this.firstTime){
      this.firstTime = false;
      return true;
    }
    return false;
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

  ganoNivel(){
    if(this.nivel == this.coloresNiveles.length-1) {this.ganoUser = true; return true;}
    return false;
  }


  generarArrayPorNiveles(niveles) {
    var arrayPorNiveles = [];
    var colores = ['verde', 'rojo', 'amarillo', 'azul'];
  
    for (var nivel = 0; nivel < niveles; nivel++) {
      var nivelAnterior = nivel > 0 ? arrayPorNiveles[nivel - 1] : [];
      var nivelActual = nivelAnterior.slice();
  
      while (nivelActual.length < nivel + 1) {
        var colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        nivelActual.push(colorAleatorio);
      }
  
      arrayPorNiveles.push(nivelActual);
    }
  
    return arrayPorNiveles;
  }

  jugando(){
    if(this.mostrarNiveles) return false;
    return this.jugandoUser;
  } 
  
  mostrarSecuenciaHastaNivelActual(parent) {
    if (this.mostrarNiveles) return false;
    if(this.jugandoUser) return false;

    this.coloresClicked = [];
    this.mostrarNiveles = true;
    this.recorrerColores(this.nivel, 0,parent);
    return true;
  }
  
  recorrerColores(indiceNivel,indiceSecuencia,parent) {
    const duracionAnimacion = 2000;
    var secuenciaNivel = this.coloresNiveles[indiceNivel];
    if(indiceSecuencia >= secuenciaNivel.length){
      this.mostrarNiveles = false;
      this.jugandoUser = true;
      parent.popUp("Tu turno",2);
      return;
    }
    

    if (indiceSecuencia < secuenciaNivel.length) {
      var color = secuenciaNivel[indiceSecuencia];

      let tweenChain = new TWEEN.Tween()
      .to({}, duracionAnimacion)
      .onUpdate(() => {
       
      })
      .onComplete(() => {
        this.activarDesactivarLuz(color);
        this.recorrerColores(indiceNivel, indiceSecuencia + 1,parent);
      });

      let tweenStart = new TWEEN.Tween()
      .to({}, 1000)
      .onUpdate(() => {
       
      })
      .onComplete(() => {
        this.activarDesactivarLuz(color);
        tweenStart.chain(tweenChain);
      }).start();

     
      
    }
  }

}

export { Simon };