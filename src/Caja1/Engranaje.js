

import * as THREE from '../../libs/three.module.js'

import { TypeCaja1 } from './TypeCaja1.js'
import { CSG } from '../../libs/CSG-v2.js'

class Engranaje extends THREE.Object3D{
    constructor(typeCaja = null,radius = 1.5,numTeeth=12){
        super();
        
        let toothHeight = 1;
        let color = 0x4E5452;
        let toothGeometry = null;
        if(typeCaja == TypeCaja1.CILINDRICA){
          toothGeometry = THREE.CylinderGeometry(toothHeight / 2, toothHeight / 2, radius * 0.3, 32);
        }else if(typeCaja == TypeCaja1.REDONDA){
          toothGeometry =  new THREE.SphereGeometry(toothHeight / 2, 16, 16);
        }else{
          toothGeometry = new THREE.BoxGeometry(toothHeight, radius * 0.3, toothHeight);
        }

        
        const toothMaterial = new THREE.MeshBasicMaterial({ color });
        
        for (let i = 0; i < numTeeth; i++) {
          const tooth = new THREE.Mesh(toothGeometry, toothMaterial);
          tooth.position.x = (radius - toothHeight / 2) * Math.cos((2 * Math.PI * i) / numTeeth);
          tooth.position.y = (radius - toothHeight / 2) * Math.sin((2 * Math.PI * i) / numTeeth);
          tooth.rotation.z = (2 * Math.PI * i) / numTeeth;
          this.add(tooth);
        }
        
        
    }
}

export { Engranaje }


