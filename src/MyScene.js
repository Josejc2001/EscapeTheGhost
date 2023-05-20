
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { Stats } from '../libs/stats.module.js'

// Se hace el import correspondiente
import { PointerLockControls } from '../libs/PointerLockControls.js'

// Clases de mi proyecto

import { Room } from './Room.js';
import { Puerta } from './Puerta/Puerta.js';
import { Mesa11 } from './Mesa11/Mesa11.js'; 
import { Interruptor } from './Interruptor/Interruptor.js'; 
import { Rejilla } from './Rejilla/Rejilla.js';

import { StrongBox } from './StrongBox.js'
import { Mesa9 } from './Mesa9.js';
import { Stool } from './Stool.js';
import { CatchStick } from './CatchStick.js';
import { Simon } from './Simon.js';
import { Combinatorio } from './Combinatorio.js';
import { Mesa7 } from './Mesa7/Mesa7.js';
import { Caja1 } from './Caja1/Caja1.js';
import { TV } from './TV.js';
import { Cama } from './Cama.js';
import { RemoteControl } from './RemoteControl.js';
import { CajoneraOBJ } from './CajoneraOBJ.js';
import { Soga } from './Soga.js';
import { Chair } from './Chair.js';
import { Carpet } from './Carpet.js';
import { EstructuraSoga } from './EstructuraSoga.js'

/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {


  constructor (myCanvas) {
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);

    this.camaraBefore = null;
    this.controlBloqueado = false;

    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.gui = this.createGUI ();
    
    this.initStats();
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();
    
    // Un suelo 
    //this.createGround ();
    
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);
    
    this.rejilla = new Rejilla();
    this.add(this.rejilla);
    this.rejilla.scale.set(20,7.5,1);
    this.rejilla.position.y = 90;
    this.rejilla.position.z = -97;


    this.cajaFuerte = new StrongBox();
    this.add(this.cajaFuerte);
    this.cajaFuerte.rotateY(-Math.PI/4);
    this.cajaFuerte.position.x = 75;
    this.cajaFuerte.position.z = -52;
    this.cajaFuerte.position.y = 33;

    this.mesa9 = new Mesa9();
    this.add(this.mesa9);
    this.mesa9.rotateY(-Math.PI/4);
    this.mesa9.position.x = 70;
    this.mesa9.position.z = -47;

    this.puerta = new Puerta();
    this.add(this.puerta);
    this.puerta.rotateY(Math.PI);
    this.puerta.scale.set(3,3,1);
    this.puerta.position.x = 70;
    this.puerta.position.y = 28.5;
    this.puerta.position.z = 97;

    this.mesa11 = new Mesa11();
    this.add(this.mesa11);
    this.mesa11.rotateY(Math.PI);
    this.mesa11.scale.set(3,3,3);
    this.mesa11.position.z = 82;
    this.mesa11.position.x = 35;

    this.interruptor = new Interruptor();
    this.add(this.interruptor);
    this.interruptor.rotateY(Math.PI);
    this.interruptor.position.z = 97.5;
    this.interruptor.position.y = 30;
    this.interruptor.position.x = 50;

    this.taburete = new Stool();
    this.add(this.taburete);
    this.taburete.position.z = -80;
    this.taburete.position.x = -60;

    this.paloRejilla = new CatchStick();
    this.add(this.paloRejilla);
    this.paloRejilla.position.x = 45;
    this.paloRejilla.position.z = -95.5;
    this.paloRejilla.position.y = 29.5;

    this.simon = new Simon();
    this.add(this.simon);
    this.simon.scale.set(0.25,0.25,0.25);
    this.simon.position.z = 90;
    this.simon.position.y = 1;
    this.simon.position.x = -60;

    this.combinatorio = new Combinatorio();
    this.add(this.combinatorio);
    this.combinatorio.translateY(27);
    this.combinatorio.translateX(90);
    this.combinatorio.translateZ(20);
    this.combinatorio.rotateY(-Math.PI/2);

    this.mesa7 = new Mesa7();
    this.add(this.mesa7);
    this.mesa7.scale.set(5,5,5);
    this.mesa7.rotateY(Math.PI/2);
    this.mesa7.position.x = -85;

    this.caja1 = new Caja1();
    this.add(this.caja1);
    this.caja1.scale.set(2,2,2);
    this.caja1.rotateY(Math.PI/2);
    this.caja1.position.x = -85;
    this.caja1.position.y = 30;

    this.tv = new TV();
    this.add(this.tv);
    this.tv.rotateY(Math.PI);
    this.tv.scale.set(20,20,20);
    this.tv.position.z = 80;
    this.tv.position.x = 5;
    this.tv.position.y = 19;

    this.remoteControl = new RemoteControl();
    this.add(this.remoteControl);
    this.remoteControl.rotateX(-Math.PI/2);
    this.remoteControl.rotateZ(Math.PI);
    this.remoteControl.position.z = 85;
    this.remoteControl.position.x = 30;
    this.remoteControl.position.y = 20;

    this.cama = new Cama();
    this.cama.translateX(-68);
    this.cama.translateZ(80);
    this.cama.rotateY(Math.PI/2);
    this.cama.rotateX(-Math.PI/2);
    this.cama.scale.set(0.3,0.3,0.3);
    this.add(this.cama);

    this.cajoneraob = new CajoneraOBJ();
    this.cajoneraob.scale.set(20,20,20);
    this.cajoneraob.translateY(13.5);
    this.cajoneraob.translateX(90);
    this.cajoneraob.translateZ(20);
    this.cajoneraob.rotateY(-Math.PI/2);
    this.add(this.cajoneraob);

    this.soga = new Soga();
    this.soga.scale.set(4,6,4);
    this.soga.translateY(50);
    this.soga.translateX(-60);
    this.soga.translateZ(-81);
    this.soga.rotateZ(Math.PI/2);
    this.add(this.soga);

    this.estructuraSoga = new EstructuraSoga();
    this.estructuraSoga.position.z = -80;
    this.estructuraSoga.position.x = -80;
    this.add(this.estructuraSoga);

    this.silla = new Chair();
    this.add(this.silla);
    this.silla.scale.set(0.05,0.05,0.05);
    this.silla.rotateY(-Math.PI/2);
    this.silla.position.x = -60;
    this.silla.position.z = 7.5;

    // this.alfombra = new Carpet();
    // this.add(this.alfombra);
    // this.alfombra.rotateX(-Math.PI/2);
    // this.alfombra.scale.set(1,1,1);

    // Por último creamos el modelo.
    // El modelo puede incluir su parte de la interfaz gráfica de usuario. Le pasamos la referencia a 
    // la gui y el texto bajo el que se agruparán los controles de la interfaz que añada el modelo.
    this.habitacion = new Room(this.gui, "");
    this.add (this.habitacion);

    
  }
  
  initStats() {
  
    var stats = new Stats();
    
    stats.setMode(0); // 0: fps, 1: ms
    
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    
    $("#Stats-output").append( stats.domElement );
    
    this.stats = stats;
  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 5, 2000);
    // También se indica dónde se coloca
    this.camera.position.set (0, 75, 0);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,75,-1);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    
    this.cameraControl = new PointerLockControls (this.camera, this.renderer.domElement);
   
    
  }

  bloquearCamaraCajaFuerte(){
    
    if(this.controlBloqueado){
      this.controlBloqueado = false;
      this.camera = this.camaraBefore.clone();
      this.cameraControl = new PointerLockControls (this.camera, this.renderer.domElement);
    }else{
      this.controlBloqueado = true;
      this.camaraBefore = this.camera.clone();

      let vectorAux = this.cajaFuerte.position;
      let x = vectorAux.x-13;
      let y = vectorAux.y+25;
      let z = vectorAux.z;
      let vectorLook = new THREE.Vector3(x,y,z);
      
    
      this.camera.lookAt(vectorLook);
      this.camera.position.set(35,40,-15)
    }
   

  }
  
  createGround () {
    
    // El suelo es un Mesh, necesita una geometría y un material.
    
    // La geometría es una caja con muy poca altura
    var geometryGround = new THREE.BoxGeometry (200,0.2,200);
    
    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var materialGround = new THREE.MeshPhongMaterial ({map: texture});
    
    // Ya se puede construir el Mesh
    var ground = new THREE.Mesh (geometryGround, materialGround);
    
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    ground.position.y = -0.1;
    
    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add (ground);
  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante un objeto de control
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = {
      // En el contexto de una función   this   alude a la función
      lightIntensity : 1,
      axisOnOff : true
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightIntensity', 0, 10, 1)
      .name('Intensidad de la Luz : ')
      .onChange ( (value) => this.setLightIntensity (value) );
    
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff')
      .name ('Mostrar ejes : ')
      .onChange ( (value) => this.setAxisVisible (value) );
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 0, 200, 0 );
    this.add (this.spotLight);
  }
  
  setLightIntensity (valor) {
    this.spotLight.intensity = valor;
  }
  
  setAxisVisible (valor) {
    this.axis.visible = valor;
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  update () {
    
    if (this.stats) this.stats.update();
    
    // Se actualizan los elementos de la escena para cada frame
    
    // Se actualiza la posición de la cámara según su controlador
    //this.cameraControl.update();
    
    // Se actualiza el resto del modelo
    this.habitacion.update();
    this.cajaFuerte.update();
    this.mesa7.update();
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }

  onKeyDown(event,cameraControl){
    let velocidad = 10;
    
    switch (event.code) {
      case 'KeyW':
        this.avanzar(cameraControl,velocidad,true,1);
        break;
      case 'KeyS':
        this.avanzar(cameraControl,velocidad,true,-1);
        break;
      case 'KeyD':
        this.avanzar(cameraControl,velocidad,false,1);
        break;
      case 'KeyA':
        this.avanzar(cameraControl,velocidad,false,-1);
        break;
      case 'ControlLeft':
        
        //console.log(this.camera.position);
        if(this.controlBloqueado) break;
        
        
        if(cameraControl.isLocked){
          cameraControl.unlock();
        }else{
          cameraControl.lock();
        }
        break;
    }
  }

  abrirCajaFuerte(){
    console.log("Abriendo caja fuerte...");
    this.cajaFuerte.animate();
  }

  onMouseDown(event){
    let selectedObject = this.isClickingObject(event,[this.cajaFuerte])
    if(selectedObject != null) {
      this.abrirCajaFuerte();
      this.bloquearCamaraCajaFuerte();
      return;
    }
    selectedObject = this.isClickingObject(event,[this.mesa7.cajonera.cajon1,this.mesa7.cajonera.cajon2]);
    if(selectedObject != null) {
      this.mesa7.animarCajonesMesa7(selectedObject.name);
      return;
    }
  }

  

  
  isClickingObject(event,object){
    if(object == undefined) return null;
    let mouse = new THREE.Vector2();
    let raycaster = new THREE.Raycaster();

    mouse.x = (event.clientX / window.innerWidth )*2-1;
    mouse.y = 1 - 2 * (event.clientY / window.innerHeight);

    raycaster.setFromCamera(mouse, this.camera);

    var pickedObjects = raycaster.intersectObjects(object, true);
    if(pickedObjects.length > 0){
      var selectedObject = pickedObjects[0].object;
      return selectedObject.parent;
    }
    return null;
  }

  
  


  avanzar(cameraControl, velocidad,foward,value) {
    let donde_estoy = new THREE.Vector3();
  
    donde_estoy.copy(this.getCamera().position);
    let direction = new THREE.Vector3();
    if (foward) {
      direction.z = -1 * value; // Hacia adelante o hacia atrás
    } else {
      direction.x = value; // Hacia la izquierda o hacia la derecha
    }

    let a_donde_miro = this.getDirection(direction);
    a_donde_miro.y = 0;
    a_donde_miro.normalize();

    if (this.colision(donde_estoy, a_donde_miro)) {
      return;
    }
      
  
    // No hay colisión en ninguna dirección, avanzar
    if(foward){
      cameraControl.moveForward(velocidad*value);
    }else{
      cameraControl.moveRight(velocidad*value);
    }
    
  }
  getDirection(direction){
    let v = new THREE.Vector3();
    return v.copy( direction ).applyQuaternion(this.camera.quaternion);
  }

  colision(donde_estoy,a_donde_miro){
    let raycaster = new THREE.Raycaster();
    raycaster.set(donde_estoy,a_donde_miro);
   
    let impactados = raycaster.intersectObjects([this.habitacion]);
    
    if(impactados.length > 0){

      /*
      impactados = impactados.sort((a, b) => a.distance - b.distance);

      console.log(impactados);*/
      let distanciaMasCercano = impactados[0].distance;
      if(distanciaMasCercano <= 20){
        return true;
      }
    }

    

    return false;
  }

}





/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");
  
  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  window.addEventListener("pointerlockchange",scene.cameraControl.onPointerlockChange);
  window.addEventListener("mousemove",scene.cameraControl.onMouseMove);
  window.addEventListener('keydown',(event)=>scene.onKeyDown(event,scene.cameraControl));
  window.addEventListener('mousedown',(event)=>scene.onMouseDown(event));
  // Que no se nos olvide, la primera visualización.
  scene.update();
});