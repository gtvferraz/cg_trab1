import * as THREE from '../../../build/three.module.js';
import {
    degreesToRadians
} from "../../../libs/util/util.js";

var x = new THREE.Vector3(1, 0, 0); // Set x axis
var y = new THREE.Vector3(0, 1, 0); // Set y axis
var z = new THREE.Vector3(0, 0, 1); // Set Z axis 

export function createBuilding4(textureLoader) {
    //predio maps
    var hospitalMap = textureLoader.load('assets/predio_04/Stylized_Stone_Wall_001_basecolor.jpg')
    var hospitalMap2 = textureLoader.load('assets/predio_04/Stylized_Stone_Wall_001_basecolor - Copia.jpg')
    hospitalMap.wrapS = THREE.RepeatWrapping;
    hospitalMap.wrapT = THREE.RepeatWrapping;
    hospitalMap.repeat.set( 1, 6 );
    hospitalMap2.wrapS = THREE.RepeatWrapping;
    hospitalMap2.wrapT = THREE.RepeatWrapping;
    hospitalMap2.repeat.set( 6, 1 );
    //iron bars
    const ironBaseColor = textureLoader.load('assets/predio_04/Iron_Bars_001_basecolor.jpg');
    ironBaseColor.wrapS = THREE.RepeatWrapping;
    ironBaseColor.wrapT = THREE.RepeatWrapping;
    ironBaseColor.repeat.set( 6, 4);
    const ironNormalMap = textureLoader.load('assets/predio_04/Iron_Bars_001_normal.jpg');
    ironNormalMap.wrapS = THREE.RepeatWrapping;
    ironNormalMap.wrapT = THREE.RepeatWrapping;
    ironNormalMap.repeat.set( 6, 4);
    const ironHeightMap = textureLoader.load('assets/predio_04/Iron_Bars_001_height.png');
    ironHeightMap.wrapS = THREE.RepeatWrapping;
    ironHeightMap.wrapT = THREE.RepeatWrapping;
    ironHeightMap.repeat.set( 6, 4);
    const ironRoughnessMap = textureLoader.load('assets/predio_04/Iron_Bars_001_roughness.jpg');
    ironRoughnessMap.wrapS = THREE.RepeatWrapping;
    ironRoughnessMap.wrapT = THREE.RepeatWrapping;
    ironRoughnessMap.repeat.set( 6, 4);
    const ironAmbientOcclusionMap = textureLoader.load('assets/predio_04/Iron_Bars_001_ambientOcclusion.jpg');
    ironAmbientOcclusionMap.wrapS = THREE.RepeatWrapping;
    ironAmbientOcclusionMap.wrapT = THREE.RepeatWrapping;
    ironAmbientOcclusionMap.repeat.set( 6, 4);
    const ironOpacityMap = textureLoader.load('assets/predio_04/Iron_Bars_001_Opacity.jpg');
    ironOpacityMap.wrapS = THREE.RepeatWrapping;
    ironOpacityMap.wrapT = THREE.RepeatWrapping;
    ironOpacityMap.repeat.set( 6, 4);
    //window
    const windowBaseColor = textureLoader.load('assets/predio_04/Glass_Window_002_basecolor.jpg');
    const windowNormalMap = textureLoader.load('assets/predio_04/Glass_Window_002_normal.jpg');
    const windowHeightMap = textureLoader.load('assets/predio_04/Glass_Window_002_height.png');
    const windowRoughnessMap = textureLoader.load('assets/predio_04/Glass_Window_002_roughness.jpg');
    const windowAmbientOcclusionMap = textureLoader.load('assets/predio_04/Glass_Window_002_ambientOcclusion.jpg');
    const windowOpacityMap = textureLoader.load('assets/predio_04/Glass_Window_002_Opacity.jpg');
    //porta
    const portaMap = textureLoader.load('assets/predio_04/doubleDoor.png')

    //Geometrias
    var hospitalGeometry = new THREE.BoxGeometry(30, 10, 100);
    var divisoriaGeometry = new THREE.BoxGeometry(30, 0.1, 0.5);
    var divisoriaGeometry2 = new THREE.BoxGeometry(100, 0.1, 0.5);
    var divisoriaGeometry3 = new THREE.BoxBufferGeometry(70,0.1,0.5)
    var janelaGeometry1 = new THREE.PlaneGeometry(5,2);
    var janelaGeometry2 = new THREE.PlaneGeometry(2,2);
    var janelaGeometry3 = new THREE.PlaneGeometry(1,2);
    var portaGeometry = new THREE.PlaneGeometry(10,7);
    var tunelGeometry = new THREE.BoxGeometry(50, 5, 5);
    var ladoEsquerdoGeometry = new THREE.BoxGeometry(30,10, 70);

    //Materiais
    var divisoriaMaterial = new THREE.MeshBasicMaterial({color: 'rgb(0,0,0)'});
    var janelaMaterial = new THREE.MeshPhysicalMaterial({
        map: windowBaseColor,
        normalMap: windowNormalMap,
        displacementMap: windowHeightMap,
        displacementScale: 0.05,
        roughnessMap: windowRoughnessMap,
        roughness: 0,
        aoMap: windowAmbientOcclusionMap,
        alphaMap: windowOpacityMap,
        side: THREE.DoubleSide
    });
    janelaMaterial.alphaTest = 0.01;
    janelaGeometry1.attributes.uv2 = janelaGeometry1.attributes.uv;
    janelaGeometry2.attributes.uv2 = janelaGeometry2.attributes.uv;
    janelaGeometry3.attributes.uv2 = janelaGeometry3.attributes.uv;

    var portaMaterial = new THREE.MeshBasicMaterial({map: portaMap, side: THREE.DoubleSide});
    var tunelMaterial = new THREE.MeshPhysicalMaterial({
        map: ironBaseColor,
        normalMap: ironNormalMap,
        displacementMap: ironHeightMap,
        displacementScale: 0.05,
        roughnessMap: ironRoughnessMap,
        roughness: 0.1,
        aoMap: ironAmbientOcclusionMap,
        alphaMap: ironOpacityMap,
        side: THREE.DoubleSide
    });
    tunelMaterial.alphaTest = 0.5;
    tunelGeometry.attributes.uv2 = tunelGeometry.attributes.uv;
    var hospitalMaterial = new THREE.MeshBasicMaterial({map: hospitalMap});
    var hospitalMaterial2 = new THREE.MeshBasicMaterial({map: hospitalMap2, side: THREE.DoubleSide});

    var hospital = new THREE.Mesh(hospitalGeometry, [hospitalMaterial2,hospitalMaterial2,hospitalMaterial,hospitalMaterial,hospitalMaterial2]);
    hospital.castShadow = true;

    var janealInicial = 47;
    var divisorioaInicial = 49.8; 
    for(var i = 0; i < 18; i++){
        var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
        divisoria.castShadow = true;
        divisoria.translateOnAxis(y,-5.01);
        divisoria.translateOnAxis(z,divisorioaInicial - i*5);
        hospital.add(divisoria);
        var janela = new THREE.Mesh(janelaGeometry1, janelaMaterial);
        janela.castShadow = true;
        janela.translateOnAxis(y,-5.1);
        janela.translateOnAxis(x,12);
        janela.translateOnAxis(z,janealInicial - i*5);
        janela.rotateOnAxis(x, degreesToRadians(-90))
        hospital.add(janela);

        var janela = new THREE.Mesh(janelaGeometry2, janelaMaterial);
        janela.castShadow = true;
        janela.translateOnAxis(y,-5.1);
        janela.translateOnAxis(x,-3);
        janela.translateOnAxis(z,janealInicial - i*5);
        janela.rotateOnAxis(x, degreesToRadians(-90))
        hospital.add(janela);

        var janela = new THREE.Mesh(janelaGeometry2, janelaMaterial);
        janela.castShadow = true;
        janela.translateOnAxis(y,-5.1);
        janela.translateOnAxis(x,-13);
        janela.translateOnAxis(z,janealInicial - i*5);
        janela.rotateOnAxis(x, degreesToRadians(-90))
        hospital.add(janela);
    }

    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.castShadow = true;
    divisoria.translateOnAxis(y,-5.01);
    divisoria.translateOnAxis(z,-40);
    hospital.add(divisoria);

    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.castShadow = true;
    divisoria.translateOnAxis(y,-5.01);
    divisoria.translateOnAxis(x,-15);
    divisoria.rotateOnAxis(y,degreesToRadians(90));
    hospital.add(divisoria);

    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.castShadow = true;
    divisoria.translateOnAxis(y,-5.01);
    divisoria.translateOnAxis(x,15);
    divisoria.rotateOnAxis(y,degreesToRadians(90));
    hospital.add(divisoria);

    var porta = new THREE.Mesh(portaGeometry, portaMaterial);
    porta.castShadow = true;
    porta.translateOnAxis(y, -5.05);
    porta.translateOnAxis(z, -46.5);
    porta.rotateOnAxis(x, degreesToRadians(90))
    hospital.add(porta);

    var tunel = new THREE.Mesh(tunelGeometry, [null,null,tunelMaterial,tunelMaterial,hospitalMaterial2,hospitalMaterial2]);
    tunel.castShadow = true;
    tunel.translateOnAxis(x, -40);
    hospital.add(tunel);

    //parte esquerda

    var ladoEsquerdo = new THREE.Mesh(ladoEsquerdoGeometry, [hospitalMaterial2,hospitalMaterial2,hospitalMaterial,hospitalMaterial,hospitalMaterial2]);
    ladoEsquerdo.castShadow = true;
    ladoEsquerdo.translateOnAxis(x, -80);
    ladoEsquerdo.translateOnAxis(z,-15);
    hospital.add(ladoEsquerdo);

    var janealInicial = 17;
    var divisorioaInicial = 19.8; 
    for(var i = 0; i < 12; i++){
        var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
        divisoria.castShadow = true;
        divisoria.translateOnAxis(y,-5.01);
        divisoria.translateOnAxis(x, -80);
        divisoria.translateOnAxis(z,divisorioaInicial - i*5);
        hospital.add(divisoria);

        var janela = new THREE.Mesh(janelaGeometry3, janelaMaterial);
        janela.castShadow = true;
        janela.translateOnAxis(y,-5.1);    
        janela.translateOnAxis(x, -80);
        janela.translateOnAxis(x,6);
        janela.translateOnAxis(z,janealInicial - i*5);
        janela.rotateOnAxis(x, degreesToRadians(-90))
        hospital.add(janela);

        var janela = new THREE.Mesh(janelaGeometry2, janelaMaterial);
        janela.castShadow = true;
        janela.translateOnAxis(y,-5.1);   
        janela.translateOnAxis(x, -80);
        janela.translateOnAxis(x,-3);
        janela.translateOnAxis(z,janealInicial - i*5);
        janela.rotateOnAxis(x, degreesToRadians(-90))
        hospital.add(janela);

        var janela = new THREE.Mesh(janelaGeometry2, janelaMaterial);
        janela.castShadow = true;
        janela.translateOnAxis(y,-5.1);
        janela.translateOnAxis(x, -80);
        janela.translateOnAxis(x,-13);
        janela.translateOnAxis(z,janealInicial - i*5);
        janela.rotateOnAxis(x, degreesToRadians(-90))
        hospital.add(janela);
    }
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.castShadow = true;
    divisoria.translateOnAxis(y,-5.01);
    divisoria.translateOnAxis(x, -80);
    divisoria.translateOnAxis(z,-40);
    hospital.add(divisoria);

    var divisoria = new THREE.Mesh(divisoriaGeometry3, divisoriaMaterial);
    divisoria.castShadow = true;
    divisoria.translateOnAxis(y,-5.01);
    divisoria.translateOnAxis(x, -80);
    divisoria.translateOnAxis(x,-15);
    divisoria.translateOnAxis(z,-15);
    divisoria.rotateOnAxis(y,degreesToRadians(90));
    hospital.add(divisoria);

    var divisoria = new THREE.Mesh(divisoriaGeometry3, divisoriaMaterial);
    divisoria.castShadow = true;
    divisoria.translateOnAxis(y,-5.01);
    divisoria.translateOnAxis(x, -80);
    divisoria.translateOnAxis(x,15);
    divisoria.translateOnAxis(z,-15);
    divisoria.rotateOnAxis(y,degreesToRadians(90));
    hospital.add(divisoria);

    var porta = new THREE.Mesh(portaGeometry, portaMaterial);
    porta.castShadow = true;
    porta.translateOnAxis(y, -5.05);
    porta.translateOnAxis(x, -80);
    porta.translateOnAxis(z, -46.5);
    porta.rotateOnAxis(x, degreesToRadians(90))
    hospital.add(porta);

    hospital.castShadow = true;
    hospital.traverse(function (child){
        child.receiveShadow = true;
    });
    return hospital;
}