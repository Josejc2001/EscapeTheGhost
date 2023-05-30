
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
import { EstructuraSoga } from './EstructuraSoga.js'
import { BotonCombinatorio1 } from './BotonCombinatorio1.js'
import { BotonCombinatorio2 } from './BotonCombinatorio2.js'
import { CajaTexturizada } from './CajaTexturizada.js'
import { Mono } from './Mono/Mono.js'

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
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();
    
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
    this.tienePalo = false;
    

    this.simon = new Simon();
    this.simon.posicionarHabitacion();
    this.add(this.simon);
    

    this.combinatorio = new Combinatorio();
    this.combinatorio.posicionarHabitacion();
    this.add(this.combinatorio);
    

    this.botonCombinatorio1 = new BotonCombinatorio1();
    this.add(this.botonCombinatorio1);
    this.botonCombinatorio1.scale.set(0.5,0.5,0.5);
    this.botonCombinatorio1.translateY(28);
    this.botonCombinatorio1.translateX(90);
    this.botonCombinatorio1.translateZ(35);

    this.botonCombinatorio2 = new BotonCombinatorio2();
    this.add(this.botonCombinatorio2);
    this.botonCombinatorio2.scale.set(0.5,0.5,0.5);
    this.botonCombinatorio2.translateY(28);
    this.botonCombinatorio2.translateX(90);
    this.botonCombinatorio2.translateZ(5);

    this.indiceColor = 0;
    this.coloresLuz = [16711680, 65280, 15855887, 1044974, 15798254]; //rojo, verde, amarillo, azul, rosa
    this.secuenciaAdivinada = false;

    this.mesa7 = new Mesa7();
    this.mesa7.posicionarHabitacion();
    this.add(this.mesa7);
    
    this.caja1 = new Caja1();
    this.caja1.posicionarHabitacion();
    this.add(this.caja1);
    

    this.tv = new TV();
    this.tv.posicionarHabitacion();
    this.tieneRemoto = false;
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

    this.cajaTexturizada = new CajaTexturizada();
    this.cajaTexturizada.posicionarHabitacion();
    this.add(this.cajaTexturizada);

   
    
    this.habitacion = new Room();
    this.add (this.habitacion);

    
    this.inicio = false;


    this.showHelp = false;

    this.mono = new Mono();
    this.mono.posicionarHabitacion();
    this.add(this.mono);

    document.getElementById('new-game-dialog').style.visibility = "visible";
  }

  ocultarBotonAceptar(){
    document.getElementById('new-game-dialog').style.display = "none";
    document.getElementById('help').style.visibility = "visible";
    this.inicio = true;
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
    this.spotLight = new THREE.SpotLight( 0xffffff, 0.75 );
    this.spotLight.position.set( 0, 200, 0 );
    this.add (this.spotLight);


    this.spotLightJuego = new THREE.SpotLight(0xff0000, 1);
    this.spotLightJuego.position.set(-90, 50, 20);

    var target = new THREE.Object3D();
    target.position.set = (90,0,20);

    this.spotLightJuego.target = target;
    this.add(this.spotLightJuego);
    this.spotLightJuego.visible = false;
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
    
    // Se actualizan los elementos de la escena para cada frame
    
    // Se actualiza la posición de la cámara según su controlador
    //this.cameraControl.update();
    
    // Se actualiza el resto del modelo
    this.habitacion.update();
    this.cajaFuerte.update();
    this.mono.update();
    TWEEN.update();
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    if (this.showHelp) {
      document.getElementById('controles').style.visibility = "visible";
    } else {
      document.getElementById('controles').style.visibility = "hidden";
    }

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }

  onKeyDown(event,cameraControl){
    let velocidad = 10;
    if(this.controlBloqueado) return;
    if(!this.inicio) return;
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

      case 'KeyH':
        if(this.showHelp){
          this.showHelp = false;
          if(this.secuenciaAdivinada){
            document.getElementById('digito1').style.visibility = "hidden";
          }
          if(this.simon.gano()){
            document.getElementById('digito2').style.visibility = "hidden";
          }
          if(this.caja1.tengoCodigo()){
            document.getElementById('digito3').style.visibility = "hidden";
          }
          if(this.tienePalo){
            document.getElementById('objeto1').style.visibility = "hidden";
          }
          if(this.mesa7.isCapturado()){
            document.getElementById('objeto2').style.visibility = "hidden";
          }
          if(this.tieneRemoto){
            document.getElementById('objeto3').style.visibility = "hidden";
          }
        } else{
          this.showHelp = true;
          if(this.secuenciaAdivinada){
            document.getElementById('digito1').style.visibility = "visible";
          }
          if(this.caja1.tengoCodigo()){
            document.getElementById('digito3').style.visibility = "visible";
          }
          if(this.simon.gano()){
            document.getElementById('digito2').style.visibility = "visible";
          }
          if(this.tienePalo){
            document.getElementById('objeto1').style.visibility = "visible";
          }
          if(this.mesa7.isCapturado()){
            document.getElementById('objeto2').style.visibility = "visible";
          }
          if(this.tieneRemoto){
            document.getElementById('objeto3').style.visibility = "visible";
          }
        }
        break;
    }
  }

  abrirCajaFuerte(){
    if(this.cajaFuerte.adivinadaPassword){
      console.log("Abriendo caja fuerte...");
      this.cajaFuerte.animate();
      return true;
    }
    return false;
  }

  closeTecladoCajaFuerte(cajaFuerte){
    let numericKeypad = document.getElementById("numeric-keypad");
    numericKeypad.style.display = "none"; 
   
    cajaFuerte.enteredNumbers = [];
    console.log(cajaFuerte.enteredNumbers);
  }

  introducirCodigoCaja(){
    if(this.cajaFuerte.adivinadaPassword) return;
    
    if(!this.simon.gano() || !this.caja1.tengoCodigo() || !this.secuenciaAdivinada){
      this.popUp("Aun no he conseguido todos los codigos...");
      return;
    }

    let numericKeypad = document.getElementById("numeric-keypad");
    numericKeypad.style.display = "block";
    
  }

  checkerButtonsListenerCajaFuerte(event,cajaFuerte){
    if(cajaFuerte.adivinadaPassword) return;

    var number = event.target.innerText;
    console.log(number);
    cajaFuerte.enteredNumbers.push(number);
    if (cajaFuerte.enteredNumbers.length === cajaFuerte.correctPassword.length) {
      var enteredPassword = this.cajaFuerte.enteredNumbers.join("");
      if (enteredPassword === cajaFuerte.correctPassword) {
        cajaFuerte.adivinadaPassword = true;
        cajaFuerte.enteredNumbers = [];
        this.popUp("Ya puedes abrir la caja fuerte");
        let numericKeypad = document.getElementById("numeric-keypad");
        numericKeypad.style.display = "none"; 
      } else {
        this.popUp("Codigo incorrecto!");
        cajaFuerte.enteredNumbers = [];
      }
      
    }
  }

  iniciarJuegoLuces(){
    console.log("Juego de las luces");
    this.spotLightJuego.visible = true;
    this.animarLuces();
  }

  animarLuces(){
    this.spotLightJuego.color.setHex(this.coloresLuz[this.indiceColor]);
    this.indiceColor = (this.indiceColor + 1) % this.coloresLuz.length;
  }

  comprobarSecuenciaColores(){
    console.log("Comprobando secuencia luces");

    var coloresCambiados = [];
    coloresCambiados.push(this.combinatorio.color1.material.name);
    coloresCambiados.push(this.combinatorio.color2.material.name);
    coloresCambiados.push(this.combinatorio.color3.material.name);
    coloresCambiados.push(this.combinatorio.color4.material.name);
    coloresCambiados.push(this.combinatorio.color5.material.name);

    var encontrado = coloresCambiados.toString() === this.coloresLuz.toString();

    return encontrado;
  }

  pulsarInterruptor(){
    if(this.spotLight.visible == true){
      this.spotLight.visible = false;
    } else {
      this.spotLight.visible = true;
    }
  }

  cogerPaloRejilla(){
    this.tienePalo = true;
    this.paloRejilla.userData.hidden = true;
    this.paloRejilla.visible = false;
  }

  cogerRemoto(){
    this.tieneRemoto = true;
    this.remoteControl.userData.hidden = true;
    this.remoteControl.visible = false;
  }


  onMouseDown(event){
    
    let selectedObject = this.isClickingObject(event,[this.cajaFuerte.teclado]);
    if(selectedObject != null && !this.cajaFuerte.adivinadaPassword && this.cajaFuerte.clickada) {
        this.introducirCodigoCaja();
        return;
    }

    selectedObject = this.isClickingObject(event,[this.puerta.pomo]);
    if(selectedObject != null) {

      if(!this.puerta.hasKey()){
        this.popUp("Oh no... Parece que esta cerrada con llave");
        return;
      }

        this.puerta.animar();
        return;
    }

    selectedObject = this.isClickingObject(event,[this.cajaFuerte]);
    var numericKeypad = document.getElementById("numeric-keypad");
    let disCaja = numericKeypad.style.display;
    
    if(selectedObject != null && (disCaja == 'none' || disCaja == '')) {
      
      if(!this.cajaFuerte.puertaAbierta){
        selectedObject = this.isClickingObject(event,[this.cajaFuerte.puerta]);
        if(selectedObject != null && this.abrirCajaFuerte()){
          return;
        }
      }
      

      if(!this.puerta.hasKey()){
        selectedObject = this.isClickingObject(event,[this.cajaFuerte.llave]);
        if(selectedObject != null){
          this.puerta.tengoLlaves = true;
          this.cajaFuerte.hideKeys();
          this.popUp("Has cogido las llave de la puerta");
          return;
        }
      }

      this.cajaFuerte.clickada = !this.cajaFuerte.clickada;
      this.bloquearCamaraObjeto(this.cajaFuerte,50);
      return;
    }

    selectedObject = this.isClickingObject(event,[this.botonCombinatorio1.pulsador]);
    if(selectedObject != null) {
      if(this.secuenciaAdivinada){
        this.popUp("Ya has conseguido este minijuego");
      } else{
        this.iniciarJuegoLuces();
      }
      return;
    }

    selectedObject = this.isClickingObject(event,[this.botonCombinatorio2.pulsador]);
    if(selectedObject != null && !this.secuenciaAdivinada) {
      this.secuenciaAdivinada = this.comprobarSecuenciaColores();
      if(this.secuenciaAdivinada){
        this.popUp("Has adivinado la secuencia de colores. Has desvelado un nuevo dígito del código de la caja fuerte");
        this.spotLightJuego.visible = false;
      } else{
        this.popUp("Este secuencia de colores no es correcta. Pista: el primer color es el rojo");
      }
      return;
    }

    selectedObject = this.isClickingObject2(event,
      [
      this.combinatorio.boton1,
      this.combinatorio.boton2,
      this.combinatorio.boton3,
      this.combinatorio.boton4,
      this.combinatorio.boton5
    ]);
    if(selectedObject != null) {
      this.combinatorio.cambiarColor(selectedObject.name);
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

    if(!this.caja1.tengoCodigo()){
      selectedObject = this.isClickingObject(event,[this.caja1]);
      if(selectedObject != null){
        if(this.mesa7.isCapturado()){
         
          if(!this.caja1.animando){
            if(!this.caja1.activarEngranaje() || !this.caja1.hasManivela()){
              this.popUp("Encuentra la palanca para poder activarlo");
            }else if(!this.caja1.ponerManivela()){
              this.caja1.animar();
            }
          }else{
            selectedObject = this.isClickingObject(event,[this.caja1.codigoCaja]);
            if(selectedObject != null){
              this.caja1.hasCode = true;
              this.popUp("Nuevo codigo de la caja conseguido");
              return;
            }
          }
          
        }else{
          this.popUp("Parece que le falta una pieza...");
        }
        return;
      }
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
      if(this.tienePalo){
        this.rejilla.animarRejilla();
        this.popUp("Parece que esto no ventila nada...");
      }else
        this.popUp("Vaya... No llego tan arriba. Debe haber algo que me permita llegar");
      return;
    }
    
    
    selectedObject= this.isClickingObject(event,[this.cama,this.simon]);
    let gano = this.simon.gano();
        
    if(selectedObject != null && !gano){
      if(selectedObject.parent.name == "simon"){
        if(!this.tienePalo){
          this.popUp("No lo alcanzo... necesito algo para cogerlo.");
          return;
        }
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
              if(this.simon.gano()){this.popUp("Has ganado. Has desvelado un nuevo dígito del código de la caja fuerte"); this.bloquearCamaraObjeto(this.simon,0,20,-Math.PI/2);return;}
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

    selectedObject= this.isClickingObject(event,[this.interruptor]);
    if(selectedObject != null){
      this.pulsarInterruptor();
      return;
    }

    selectedObject= this.isClickingObject(event,[this.paloRejilla]);
    if(selectedObject != null){
      this.popUp("Has conseguido: Palo alargado. Pista: Con esto llegarás a sitios inalcanzables");
      this.cogerPaloRejilla();
      return;
    }

    selectedObject= this.isClickingObject(event,[this.cajaTexturizada]);
    if(selectedObject != null){
      this.popUp("¿Como podra soportar el peso del mono esta caja?...");
      return;
    }

    selectedObject= this.isClickingObject(event,[this.remoteControl]);
    if(selectedObject != null){
      this.popUp("Has conseguido: Remoto. Sabrás para que sirve?");
      this.cogerRemoto();
      return;
    }

    selectedObject= this.isClickingObject(event,[this.tv]);
    if(selectedObject != null){
      if(this.tieneRemoto){
        this.popUp("Parece que el mando no funciona");
      } else {
        this.popUp("No se cómo encender esto. Donde está el mando?");
      }
      return;
    }

    selectedObject= this.isClickingObject(event,[this.mono]);
    if(selectedObject != null){
        this.popUp("Mono: 'Se te acaba el tiempo JAJAJA'");
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

  isClickingObject2(event,object){
    if(object == undefined) return null;
    let mouse = new THREE.Vector2();
    let raycaster = new THREE.Raycaster();

    mouse.x = (event.clientX / window.innerWidth )*2-1;
    mouse.y = 1 - 2 * (event.clientY / window.innerHeight);

    raycaster.setFromCamera(mouse, this.camera);

    var pickedObjects = raycaster.intersectObjects(object, true);
    if(pickedObjects.length > 0){
      var selectedObject = pickedObjects[0].object;
      return selectedObject;
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

  cajaListener(){
    var botonAceptar = document.getElementById('accept-button');
    botonAceptar.addEventListener("click",(event)=>this.ocultarBotonAceptar());

    let numericKeypad = document.getElementById("numeric-keypad");

    var cancelButton = numericKeypad.querySelector(".cancel-button");
    cancelButton.addEventListener("click", ()=>this.closeTecladoCajaFuerte(this.cajaFuerte));

    var numericButtons = numericKeypad.querySelectorAll("button:not(.cancel-button)");
    for (var i = 0; i < numericButtons.length; i++) {
        numericButtons[i].addEventListener("click",(event)=> this.checkerButtonsListenerCajaFuerte(event,this.cajaFuerte));
    }
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
  scene.cajaListener();
  // Que no se nos olvide, la primera visualización.
  scene.update();
});

