
import * as THREE from '../../libs/three.module.js'

import {MyCylinder} from '../Basicos/MyCylinder.js';
import { CSG } from '../../libs/CSG-v2.js'

class Pomo extends THREE.Object3D{
    constructor(){
        super();
        var shape2 = new THREE.Shape();
        
        shape2.moveTo(0,4);
        shape2.quadraticCurveTo(1,5,2,4);
        shape2.lineTo(2,1);
        shape2.quadraticCurveTo(1,0,0,1);

        var options = {depth: 0.1 , bevelEnable: true, bevelThickness: 0.2, bevelSize: 0.2, bevelSegments: 10, curveSegments: 10};

        
        var marcoGeom = new THREE.ExtrudeBufferGeometry(shape2,options);
        var marcoMat =  new THREE.MeshPhongMaterial({color: 0xCBA016});

        this.marco = new THREE.Mesh(marcoGeom,marcoMat);
        this.marco.scale.set(0.5,0.5,0.5);
        
        this.pomo = new MyCylinder(0xE1B424);
        this.pomo.scale.set(0.1,0.35,0.1);
        this.pomo.translateY(1.8);
        this.pomo.translateZ(0.2);
        this.pomo.translateX(0.5);
        this.pomo.rotateX(THREE.MathUtils.degToRad(90));


        var shape = new THREE.Shape();
        
        shape.moveTo(1,4);
        shape.lineTo(2,4);
        
        shape.quadraticCurveTo(2.5,5,3,5);
        shape.lineTo(5,3.5);
        shape.lineTo(5,3);
        shape.quadraticCurveTo(4.75,2.5,4.5,3);
        shape.quadraticCurveTo(4,3.5,3.5,3.5);
        shape.lineTo(1,3.5);

        

        var options = {depth: 0.1 , bevelEnable: true, bevelThickness: 0.2, bevelSize: 0.2, bevelSegments: 10, curveSegments: 10};

        
        var abridorGeom = new THREE.ExtrudeBufferGeometry(shape,options);
        var abridorMat =  new THREE.MeshPhongMaterial({color: 0xDFAF15});

        this.abridor = new THREE.Mesh(abridorGeom,abridorMat);
        this.abridor.scale.set(0.5,0.3,0.4);
        this.abridor.translateX(-0.1);
        this.abridor.translateZ(0.2);
        this.abridor.translateY(0.68);

        this.pomoFinal = new THREE.Object3D();
        this.pomoFinal.add(this.abridor);
        this.pomoFinal.add(this.pomo);

        this.objFinal = new THREE.Object3D();

       
        var cerraduraGeom = new THREE.ExtrudeBufferGeometry(shape2.clone(),options);
        var cerraduraMat =  new THREE.MeshPhongMaterial({color: 0xD5AB23});
        this.cerradura = new THREE.Mesh(cerraduraGeom,cerraduraMat);
        this.cerradura.scale.set(0.1,0.1,0.1);
        this.cerradura.translateX(0.75);
        this.cerradura.translateY(0.5);
        this.cerradura.translateZ(0.2);
        this.cerradura.rotateZ(Math.PI/2);


        this.llave = this.cerradura.clone();
        this.llave.scale.set(0.05,0.05,0.05);
        this.llave.translateZ(0.1);
        this.llave.translateX(0.09);
        this.llave.translateY(0.12);
        this.llave.rotateY(Math.PI/2);
        

        var csg1 = new CSG();
        csg1.subtract([this.cerradura,this.llave]);
        this.cerraduraFinal = csg1.toMesh();
        
        

        this.objFinal.add(this.marco);
        this.objFinal.add(this.cerraduraFinal);
        this.objFinal.add(this.pomoFinal);

        

        this.add(this.objFinal);
    }
}

export { Pomo }