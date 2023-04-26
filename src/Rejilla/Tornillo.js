
import { CSG } from '../../libs/CSG-v2.js';
import * as THREE from '../../libs/three.module.js'
import { MyBox } from '../Basicos/MyBox.js';
import { MyCylinder } from '../Basicos/MyCylinder.js';

class Tornillo extends THREE.Object3D{
    constructor(){
        super();

        this.tornillo = new MyCylinder();
        this.cuadrado = new MyBox();

        this.cuadrado.scale.set(1,1,0.1);

        this.cuadrado2 = this.cuadrado.clone();
        this.cuadrado2.rotateY(Math.PI/2);


        
        this.csg = new CSG();
        this.csg.subtract([this.tornillo,this.cuadrado,this.cuadrado2]);

        this.tornilloFinal = this.csg.toMesh();
        
    
        this.tornilloFinal.scale.set(0.04,0.06,0.04);
        
        this.tornilloFinal.rotateX((Math.PI/2));
        this.add(this.tornilloFinal);
        
        
    }
}

export { Tornillo }