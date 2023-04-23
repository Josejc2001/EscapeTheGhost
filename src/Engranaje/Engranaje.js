

import * as THREE from '../../libs/three.module.js'

import { CSG } from '../../libs/CSG-v2.js'

class Engranaje extends THREE.Object3D{
    constructor(){
        super();
        let radius = 1.5;
        let toothHeight = 1;
        let numTeeth= 12; 
        let color = 0x00ff00;

        const toothGeometry = new THREE.BoxGeometry(toothHeight, radius * 0.3, toothHeight);
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


