
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { Stats } from '../libs/stats.module.js'

import * as TWEEN from '../libs/tween.esm.js'
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
    
    this.popUpTimeout = null;
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
    this.rejilla.posicionarHabitacion();
    this.add(this.rejilla);


    this.cajaFuerte = new StrongBox();
    this.cajaFuerte.posicionarHabitacion();
    this.add(this.cajaFuerte);
    

    this.mesa9 = new Mesa9();
    this.mesa9.posicionarHabitacion();
    this.add(this.mesa9);
    

    this.puerta = new Puerta();
    this.puerta.posicionarHabitacion();
    this.add(this.puerta);
    

    this.mesa11 = new Mesa11();
    this.mesa11.posicionarHabitacion();
    this.add(this.mesa11);
    

    this.interruptor = new Interruptor();
    this.interruptor.posicionarHabitacion();
    this.add(this.interruptor);
    

    this.taburete = new Stool();
    this.taburete.posicionarHabitacion();
    this.add(this.taburete);
    

    this.paloRejilla = new CatchStick();
    this.paloRejilla.posicionarHabitacion();
    this.add(this.paloRejilla);
    

    this.simon = new Simon();
    this.simon.posicionarHabitacion();
    this.add(this.simon);
    

    this.combinatorio = new Combinatorio();
    this.combinatorio.posicionarHabitacion();
    this.add(this.combinatorio);
    

    this.mesa7 = new Mesa7();
    this.mesa7.posicionarHabitacion();
    this.add(this.mesa7);
    
    this.caja1 = new Caja1();
    this.caja1.posicionarHabitacion();
    this.add(this.caja1);
    

    this.tv = new TV();
    this.tv.posicionarHabitacion();
    this.add(this.tv);
    

    this.remoteControl = new RemoteControl();
    this.remoteControl.posicionarHabitacion();
    this.add(this.remoteControl);
    

    this.cama = new Cama();
    this.cama.posicionarHabitacion();
    this.add(this.cama);

    this.cajoneraob = new CajoneraOBJ();
    this.cajoneraob.posicionarHabitacion();
    this.add(this.cajoneraob);

    this.soga = new Soga();
    this.soga.posicionarHabitacion();
    this.add(this.soga);

    this.estructuraSoga = new EstructuraSoga();
    this.estructuraSoga.posicionarHabitacion();
    this.add(this.estructuraSoga);

    this.silla = new Chair();
    this.silla.posicionarHabitacion();
    this.add(this.silla);
    

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
    var look = new THREE.Vector3 (0,75,1);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    
    this.cameraControl = new PointerLockControls (this.camera, this.renderer.domElement);
   
    
  }

  bloquearCamaraObjeto(objeto,x,y=null,rotacionX=null){
    
    if (this.controlBloqueado) {
      this.controlBloqueado = false;
      this.camera = this.camaraBefore.clone();
      this.cameraControl = new PointerLockControls(this.camera, this.renderer.domElement);
    } else {
      this.controlBloqueado = true;
      this.camaraBefore = this.camera.clone();
  
      // Obtener la posición mundial del objeto objetivo
      let vectorAux = new THREE.Vector3();
      objeto.getWorldPosition(vectorAux);
  
      let direccionCamara = new THREE.Vector3();
      objeto.getWorldDirection(direccionCamara);
  
      // Calcular la posición deseada de la cámara
      let posicionCamara = vectorAux.clone().addScaledVector(direccionCamara, x);
  
      // Establecer la posición y la dirección de vista de la cámara
      this.camera.position.copy(posicionCamara);
      this.cameraControl.getObject().position.copy(posicionCamara);
      this.cameraControl.getDirection(new THREE.Vector3(0, 0, -1));

        
        
  
      this.camera.lookAt(vectorAux);
      this.cameraControl.getObject().lookAt(vectorAux);
      // Girar la cámara en el eje X
      if(rotacionX !=null){
        this.camera.rotation.x = rotacionX;
        this.cameraControl.getObject().rotation.x = rotacionX;
      }
      if(y != null){
        this.camera.position.y += y;
        this.cameraControl.getObject().position.y += y;
      }

      
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
    this.canvas = renderer.domElement;
    $(myCanvas).append(this.canvas);
    
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

  sh_popUp(show,mensaje){
    let text =`visible`
    if(!show)text = `hidden`;
    let popupDIV = document.getElementById('popup');
    popupDIV.style.visibility = text;

    let popuptext = document.getElementById('popup-text');
    popuptext.innerHTML = mensaje;
  }

  popUp(mensaje,seconds=5){
    if(this.popUpTimeout  != null){
      clearTimeout(this.popUpTimeout);
    }

    this.sh_popUp(true,mensaje);
    this.popUpTimeout = setTimeout(this.sh_popUp, seconds*1000,false,"");
  }

  update () {
    
    if (this.stats) this.stats.update();
    
    // Se actualizan los elementos de la escena para cada frame
    
    // Se actualiza la posición de la cámara según su controlador
    //this.cameraControl.update();
    
    // Se actualiza el resto del modelo
    this.habitacion.update();
    this.cajaFuerte.update();
    TWEEN.update();
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }

  onKeyDown(event,cameraControl){
    let velocidad = 10;
    if(this.controlBloqueado) return;
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
      this.bloquearCamaraObjeto(this.cajaFuerte,50);
      return;
    }

    
    

    selectedObject = this.isClickingObject(event,[this.mesa7.cajonera.cajon1,this.mesa7.cajonera.cajon2,this.mesa7.completoTE]);
    if(selectedObject != null) {
      if(selectedObject.name == '1' || selectedObject.name == '2'){
        this.mesa7.animarCajones(selectedObject.name);
      }else if(!this.mesa7.isCapturado()){
        selectedObject= this.isClickingObject(event,[this.mesa7.completoTE]);
        if(selectedObject != null){
          this.mesa7.completoTE.children.pop();
          this.mesa7.completoTE.children.pop();
          this.mesa7.capturado();
          this.popUp("Engranaje conseguido");
        }
      }

      return;
    }

    selectedObject = this.isClickingObject(event,[this.caja1]);
    if(selectedObject != null){
      if(this.mesa7.isCapturado()){
        if(!this.caja1.activarEngranaje()){
          this.popUp("Encuentra la palanca para poder activarlo");
        }
      }else{
        this.popUp("Parece que le falta una pieza...");
      }
      return;
    }
    selectedObject = this.isClickingObject(event,
      [
      this.mesa11.cajon1,
      this.mesa11.cajon2,
      this.mesa11.cajon3,
      this.mesa11.cajon4,
      this.mesa11.cajon5,
      this.mesa11.cajon6
    ]);
    if(selectedObject != null) {
      this.mesa11.animarCajones(selectedObject.name);
      return;
    }

    selectedObject = this.isClickingObject(event,[this.cajoneraob]);
    if(selectedObject != null){
      this.popUp("Ahora no es tiempo de cambiarse de ropa");
      return;
    }

    selectedObject= this.isClickingObject(event,[this.rejilla]);
    if(selectedObject != null){
      this.rejilla.animarRejilla();
      return;
    }
    
    
    selectedObject= this.isClickingObject(event,[this.cama,this.simon]);
    let gano = this.simon.gano();
        
    if(selectedObject != null && !gano){
      if(selectedObject.parent.name == "simon"){
        if(this.simon.puedoJugar()){
          let empieza = this.simon.FirstTime();
          if(empieza)this.popUp("Pulsa en los colores que se iran alumbrando");
          if(empieza && !this.simon.perdioUsuario()){
            this.bloquearCamaraObjeto(this.simon,0,20,-Math.PI/2);
          }else{
            if(this.simon.jugando()){
              selectedObject= this.isClickingObject(event,[this.simon.rojo]);
              if(selectedObject != null){
                if(!this.simon.addClicked('rojo')){
                  this.popUp("Ups color incorrecto, empieza otra vez");
                  return;
                }
                
              }
              selectedObject= this.isClickingObject(event,[this.simon.amarillo]);
              if(selectedObject != null){
                if(!this.simon.addClicked('amarillo')){
                  this.popUp("Ups color incorrecto, empieza otra vez");
                  return;
                }
                
              }
              selectedObject= this.isClickingObject(event,[this.simon.verde]);
              if(selectedObject != null){
                
                if(!this.simon.addClicked('verde')){
                  this.popUp("Ups color incorrecto, empieza otra vez");
                  return;
                }
                
              }
              selectedObject= this.isClickingObject(event,[this.simon.azul]);
              if(selectedObject != null){
                if(!this.simon.addClicked('azul')){
                  this.popUp("Ups color incorrecto, empieza otra vez");
                  return;
                }
              }
              if(this.simon.gano()){this.popUp("Has ganado"); this.bloquearCamaraObjeto(this.simon,0,20,-Math.PI/2);return;}
              if(this.simon.mostrarSecuenciaHastaNivelActual(this))this.popUp("Siguiente Nivel",2);
            }else{
              if( this.simon.mostrarSecuenciaHastaNivelActual(this))this.popUp("¡EMPIEZA!",2);
            }
          }
        }else{
          this.popUp("Has cogido el simon, ponlo en algun sitio para jugar.");
          this.simon.userData.hidden = true;
          this.simon.visible = false;
        }
        
      }else if(!this.simon.visible){
        this.simon.translateY(23);
        this.simon.translateZ(-15);
        this.simon.userData.hidden = false;
        this.simon.visible = true;

        this.simon.activar();
      }
     
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

