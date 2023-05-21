
import * as THREE from '../../libs/three.module.js'
import { CSG } from '../../libs/CSG-v2.js'
import { MyBox } from '../Basicos/MyBox.js';

class MesaSinCajones11 extends THREE.Object3D{
    constructor(){
        super();

        var shape = new THREE.Shape();
        
        shape.moveTo(0,4);
        shape.quadraticCurveTo(0,5,1,5);
        shape.lineTo(5,5);
        shape.quadraticCurveTo(6,5,6,4)
        shape.lineTo(6,0);
        shape.quadraticCurveTo(6,-1,5,-1);
        shape.lineTo(1,-1);
        shape.quadraticCurveTo(0,-1,0,0);

        var options = {depth: 5 , bevelEnable: true, bevelThickness: 0.2, bevelSize: 0.2, bevelSegments: 10, curveSegments: 10};
        var options2 = {depth: 0.1 , bevelEnable: true, bevelThickness: 0.2, bevelSize: 0.2, bevelSegments: 10, curveSegments: 10};

        
        var eliminarGeom = new THREE.ExtrudeBufferGeometry(shape.clone(),options2);
        var eliminarMat =  new THREE.MeshPhongMaterial({color: 0x3B2D2D});

        this.eliminar = new THREE.Mesh(eliminarGeom,eliminarMat);
        this.eliminar.translateY(5.2);
        this.eliminar.translateZ(-0.15);
        this.eliminar.translateX(0.15);
        this.eliminar.scale.set(2.95,0.9,1);

        this.eliminar.rotateX(-(Math.PI/2));
        
       
        var asientoGeom = new THREE.ExtrudeBufferGeometry(shape,options);
        var asientoMat = new THREE.MeshPhongMaterial({color: 0x3B2D2D});

        this.asiento = new THREE.Mesh(asientoGeom,asientoMat);
        this.asiento.translateY(0.15);
        this.asiento.scale.set(3,1,1);
        this.asiento.rotateX(-(Math.PI/2));


        var csg1 = new CSG();
        csg1.union([this.asiento,this.eliminar]);
       

        this.mesaSinCajon = csg1.toMesh();
        this.mesaSinCajon.scale.set(1,1.2,1);
        
        
        
        let cajon1 = new MyBox(0x4C4040);
        cajon1.scale.set(7,1.5,6);
        cajon1.translateZ(-1.5);   
        cajon1.translateX(5); 
        cajon1.translateY(0.5);

        let cajon3 = cajon1.clone();
        cajon1.translateY(4);
        let cajon2 = cajon1.clone();
        cajon2.translateY(-2);

        let cajon4 = cajon1.clone();
        cajon4.translateX(8);

        let cajon5 = cajon2.clone();
        cajon5.translateX(8);

        let cajon6 = cajon3.clone();
        cajon6.translateX(8);


        csg1 = new CSG();
        csg1.subtract([this.mesaSinCajon,cajon1,cajon2,cajon3,cajon4,cajon5,cajon6]);
        this.mesaSinCajon = csg1.toMesh();

        this.add(this.mesaSinCajon);

 
        
        
    }
    
}

export { MesaSinCajones11 }