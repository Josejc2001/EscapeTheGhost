
import * as THREE from '../../libs/three.module.js'

import { CSG } from '../../libs/CSG-v2.js'

class Interruptor extends THREE.Object3D{
    constructor(){
        super();
        
        var shape = new THREE.Shape();
        
        shape.moveTo(0,0);
        shape.quadraticCurveTo(2,1,4,0);

        

        var options = {depth: 5 , bevelEnable: true, bevelThickness: 0.2, bevelSize: 0.2, bevelSegments: 10, curveSegments: 10};

        
        var marcoGeom = new THREE.ExtrudeBufferGeometry(shape,options);
        var marcoMat =  new THREE.MeshPhongMaterial({color: 0xA2A2A2});

        this.marco = new THREE.Mesh(marcoGeom,marcoMat);
        this.marco.scale.set(1,1.5,1);
        this.marco.rotateZ(Math.PI/2);
        this.marco.rotateX(Math.PI/2);

        var huecoGeom = new THREE.ExtrudeBufferGeometry(shape.clone(),options);
        var huecoMat =  new THREE.MeshPhongMaterial({color: 0xFFFFFF});
        this.hueco = new THREE.Mesh(huecoGeom,huecoMat);
        this.hueco.scale.set(1,1.5,1);
        this.hueco.rotateZ(Math.PI/2);
        this.hueco.rotateX(Math.PI/2);
        this.hueco.scale.set(0.8,0.8,0.8);
        this.hueco.translateZ(0.5);
        this.hueco.translateX(0.45);
        this.hueco.translateY(0.55);

        
        
        var csg1 = new CSG();
        csg1.subtract([this.marco,this.hueco]);
        this.marcoHueco = csg1.toMesh();
        

        this.boton = this.hueco.clone();
        this.add(this.boton);
        this.add(this.marcoHueco);
    }
}

export { Interruptor }