

import * as TWEEN from '../libs/tween.esm.js'

export class CajonAnimacion{

    constructor(cajon,incremento=null){

        this.cajon = cajon;
        this.animando = false;
        this.cajonAbierto = false;
        incremento == null ?  this.incremento = 3.5 : this.incremento = incremento;
    }


    animar(){
        if(this.animando) return;
        
        this.animando = true;
        this.cajonAbierto ? this._cerrarCajon() : this._abrirCajon();
        
    }


    _abrirCajon(){
       
        let origen = this.cajon.position;
        // Crear una nueva animación Tween para abrir el cajón 1
        new TWEEN.Tween(origen)
        .to({ z: this.incremento }, 1000) // Incrementar la posición z para abrir el cajón
        .easing(TWEEN.Easing.Quadratic.InOut) // Linear
        .onComplete(() => {
            this.animando = false;
            this.cajonAbierto = true;
        })
        .start();
    }

    _cerrarCajon(){
       
        // Crear una nueva animación Tween para cerrar el cajón 1
        new TWEEN.Tween(this.cajon.position)
        .to({ z: 0 }, 1000) // Decrementar la posición z para cerrar el cajón
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onComplete(() => {
            this.animando = false;
            this.cajonAbierto = false;
        })
        .start();
    }

}