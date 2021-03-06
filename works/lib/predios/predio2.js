import * as THREE from '../../../build/three.module.js';
import {
    degreesToRadians
} from "../../../libs/util/util.js";


var x = new THREE.Vector3(1, 0, 0); // Set x axis
var y = new THREE.Vector3(0, 1, 0); // Set y axis
var z = new THREE.Vector3(0, 0, 1); // Set Z axis


export function createBuilding2(textureLoader) {
    var TamanhoPredio = 10;
    //vidro
    const windowBaseColor = textureLoader.load('assets/predio_02/Window_001_basecolor.jpg');
    const windowNormalMap = textureLoader.load('assets/predio_02/Window_001_normal.jpg');
    const windowHeightMap = textureLoader.load('assets/predio_02/Window_001_height.png');
    const windowRoughnessMap = textureLoader.load('assets/predio_02/Window_001_roughness.jpg');
    const windowAmbientOcclusionMap = textureLoader.load('assets/predio_02/Window_001_ambientOcclusion.jpg');
    const windowMetallicMap = textureLoader.load('assets/predio_02/Window_001_metallic.jpg');
    const windowOpacityMap = textureLoader.load('assets/predio_02/Window_001_opacity.jpg');
    //porta
    var portaMap = textureLoader.load('assets/predio_02/porta.png')
    //predio
    var lateralMap = textureLoader.load('assets/predio_02/Wood_Panel_001_basecolor - Copia.jpg')
    lateralMap.wrapS = THREE.RepeatWrapping;
    lateralMap.wrapT = THREE.RepeatWrapping;
    lateralMap.repeat.set( 2, 3 );
    var lateralMap2 = textureLoader.load('assets/predio_02/Wood_Panel_001_basecolor.jpg')
    lateralMap2.wrapS = THREE.RepeatWrapping;
    lateralMap2.wrapT = THREE.RepeatWrapping;
    lateralMap2.repeat.set( 3, 3 );
    const frenteMap = textureLoader.load('assets/predio_02/Wall_Stone_010_basecolor.jpg')
    var cimaMap = textureLoader.load('assets/predio_02/Terracotta_Tiles_002_Base_Color.jpg')
    cimaMap.wrapS = THREE.RepeatWrapping;
    cimaMap.wrapT = THREE.RepeatWrapping;
    cimaMap.repeat.set( 8, 8 );
    //pilar
    var pilarMap = textureLoader.load('assets/predio_02/Concrete_Wall_001_Base_Color.jpg')

    //Geometry
    var predioPrincipal = new THREE.BoxGeometry(TamanhoPredio+5, TamanhoPredio, TamanhoPredio+10);
    var lateralGeometry = new THREE.BoxGeometry(TamanhoPredio-5, TamanhoPredio+5, TamanhoPredio+10);
    var divisoriaGeometry = new THREE.BoxGeometry(0.5, 0.1, 16);
    var portaGeometry = new THREE.PlaneGeometry(3,4);
    var divisoriaGeometry2 = new THREE.BoxGeometry(TamanhoPredio+5, 0.1, 0.5);
    var divisoriaGeometry3 = new THREE.BoxGeometry(5, 0.1, 0.5);
    var divisoriaGeometry4 = new THREE.BoxGeometry(35, 0.1, 0.5);
    var divisoriaGeometry5 = new THREE.BoxGeometry(0.5, 0.1, 20);
    var divisoriaGeometry6 = new THREE.BoxGeometry(0.5, 0.1, 10);
    var janelaGeometry = new THREE.PlaneGeometry(2,2);
    var janelaGeometry2 = new THREE.PlaneGeometry(4,2);
    var janelaGeometry3 = new THREE.PlaneGeometry(5,2);
    var janelaGeometry4 = new THREE.PlaneGeometry(3,2);
    var janelaGeometry5 = new THREE.PlaneGeometry(6,2);
    var parteCimaGeometry = new THREE.BoxGeometry(35, 10, 20);
    var pilarGeometry = new THREE.CylinderGeometry(1, 1, 20);

    //Material
    var predioMaterial = new THREE.MeshBasicMaterial({map: frenteMap});
    var lateralMaterial = new THREE.MeshBasicMaterial({map: lateralMap});
    var lateralMaterial2 = new THREE.MeshBasicMaterial({map: lateralMap2});
    var divisoriaMaterial = new THREE.MeshBasicMaterial({color: 'rgb(100,100,148)'});
    var portaMaterial = new THREE.MeshBasicMaterial({map: portaMap, color: 'rgb(255,255,255)'});
    var pilarMaterial = new THREE.MeshBasicMaterial({map: pilarMap});
    var parteCimaMaterial = new THREE.MeshBasicMaterial({map: cimaMap});
    var janelaMaterial = new THREE.MeshPhysicalMaterial({
        map: windowBaseColor,
        normalMap: windowNormalMap,
        displacementMap: windowHeightMap,
        displacementScale: 0.05,
        roughnessMap: windowRoughnessMap,
        roughness: 0,
        aoMap: windowAmbientOcclusionMap,
        metalnessMap: windowMetallicMap,
        metalness: 0.1,
        alphaMap: windowOpacityMap,
        side: THREE.DoubleSide
    });
    janelaMaterial.alphaTest = 0.001;
    janelaGeometry.attributes.uv2 = janelaGeometry.attributes.uv;
    janelaGeometry2.attributes.uv2 = janelaGeometry2.attributes.uv;
    janelaGeometry3.attributes.uv2 = janelaGeometry3.attributes.uv;
    janelaGeometry4.attributes.uv2 = janelaGeometry4.attributes.uv;
    janelaGeometry5.attributes.uv2 = janelaGeometry5.attributes.uv;

    var predio = new THREE.Mesh(predioPrincipal, predioMaterial);
    predio.translateOnAxis(z,10);
    predio.translateOnAxis(x,2.5);
    //scene.add(predio);

    //Predio parte de baixo
    var lateral = new THREE.Mesh(lateralGeometry,[lateralMaterial2,lateralMaterial2,lateralMaterial,lateralMaterial,lateralMaterial]);
    predio.castShadow = true;
    predio.receiveShadow = true;
    lateral.translateOnAxis(x, +10);
    lateral.translateOnAxis(y, -2.50);
    predio.add(lateral);

    var lateral = new THREE.Mesh(lateralGeometry,[lateralMaterial2,lateralMaterial2,lateralMaterial,lateralMaterial,lateralMaterial]);
    lateral.castShadow = true;
    lateral.receiveShadow = true;
    lateral.translateOnAxis(x, -10);
    lateral.translateOnAxis(y, -2.50);
    predio.add(lateral);

    var divisorioaInicial = 9.75;
    var janealInicial = 8;
    var janelaInicial2 = 7.5;

    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.castShadow = true;
    divisoria.receiveShadow = true;
    divisoria.translateOnAxis(y,-5);
    divisoria.translateOnAxis(x,0);
    divisoria.translateOnAxis(z,2);
    predio.add(divisoria);

    var porta = new THREE.Mesh(portaGeometry, portaMaterial);
    porta.castShadow = true;
    porta.receiveShadow = true;
    porta.translateOnAxis(y, -5.5);
    porta.translateOnAxis(z,-8);
    porta.rotateOnAxis(x,degreesToRadians(90));
    predio.add(porta);

    for(var i = 0; i < 5; i++){
        var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
        divisoria.castShadow = true;
        divisoria.receiveShadow = true;
        divisoria.translateOnAxis(y,-5);
        divisoria.translateOnAxis(z,divisorioaInicial - i*4);
        predio.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry3, divisoriaMaterial);
        divisoria.castShadow = true;
        divisoria.receiveShadow = true;
        divisoria.translateOnAxis(y,-7.5);
        divisoria.translateOnAxis(x,7.5);
        divisoria.translateOnAxis(z,divisorioaInicial - i*4);
        divisoria.rotateOnAxis(z,degreesToRadians(90));
        predio.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry3, divisoriaMaterial);
        divisoria.castShadow = true;
        divisoria.receiveShadow = true;
        divisoria.translateOnAxis(y,-7.5);
        divisoria.translateOnAxis(x,-7.5);
        divisoria.translateOnAxis(z,divisorioaInicial - i*4);
        divisoria.rotateOnAxis(z,degreesToRadians(90));
        predio.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry3, divisoriaMaterial);
        divisoria.castShadow = true;
        divisoria.receiveShadow = true;
        divisoria.translateOnAxis(y,-10);
        divisoria.translateOnAxis(x,-10);
        divisoria.translateOnAxis(z,divisorioaInicial - i*4);
        predio.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry3, divisoriaMaterial);
        divisoria.castShadow = true;
        divisoria.receiveShadow = true;
        divisoria.translateOnAxis(y,-10);
        divisoria.translateOnAxis(x,10);
        divisoria.translateOnAxis(z,divisorioaInicial - i*4);
        predio.add(divisoria); 
    }
    for(var i = 0; i < 4; i++){
        var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-10.5);
        janela.translateOnAxis(x,10);
        janela.translateOnAxis(z,janealInicial - i*4);
        janela.rotateOnAxis(x, degreesToRadians(-90))
        predio.add(janela);
        var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-10.5);
        janela.translateOnAxis(x,-10);
        janela.translateOnAxis(z,janealInicial - i*4);
        janela.rotateOnAxis(x, degreesToRadians(-90))
        predio.add(janela);
        var janela = new THREE.Mesh(janelaGeometry2, janelaMaterial);
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-5.5);
        janela.translateOnAxis(x,4);
        janela.translateOnAxis(z,janelaInicial2 - i*4);
        janela.rotateOnAxis(x, degreesToRadians(-90))
        predio.add(janela);
        var janela = new THREE.Mesh(janelaGeometry2, janelaMaterial);
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-5.5);
        janela.translateOnAxis(x,-4);
        janela.translateOnAxis(z,janelaInicial2 - i*4);
        janela.rotateOnAxis(x, degreesToRadians(-90))
        predio.add(janela);
    }
    var divisorioaInicial = 29.7;
    var janealInicial = 27.5;
    var janelaInicial2 = 28;
    //Predio parte de cima
    var parteCimaMaterial = new THREE.Mesh(parteCimaGeometry, parteCimaMaterial);
    parteCimaMaterial.castShadow = true;
    parteCimaMaterial.receiveShadow = true;
    parteCimaMaterial.translateOnAxis(z, 20);
    parteCimaMaterial.translateOnAxis(x, -5);
    predio.add(parteCimaMaterial);

    for(var i = 0; i < 5; i++){
        var divisoria = new THREE.Mesh(divisoriaGeometry4, divisoriaMaterial);    
        divisoria.castShadow = true;
        divisoria.receiveShadow = true;
        divisoria.translateOnAxis(y,-5);
        divisoria.translateOnAxis(x,-5);
        divisoria.translateOnAxis(z,divisorioaInicial - i*4);
        predio.add(divisoria);
        var janela = new THREE.Mesh(janelaGeometry3, janelaMaterial);    
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-5.5);
        janela.translateOnAxis(x,8);
        janela.translateOnAxis(z,janealInicial - i*4);
        janela.rotateOnAxis(x, degreesToRadians(-90))
        predio.add(janela);
        var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);    
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-5.5);
        janela.translateOnAxis(x,3);
        janela.translateOnAxis(z,janealInicial - i*4);
        janela.rotateOnAxis(x, degreesToRadians(-90))
        predio.add(janela);
        var janela = new THREE.Mesh(janelaGeometry2, janelaMaterial);    
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-5.5);
        janela.translateOnAxis(x,-4);
        janela.translateOnAxis(z,janealInicial - i*4);
        janela.rotateOnAxis(x, degreesToRadians(-90))
        predio.add(janela);
        var janela = new THREE.Mesh(janelaGeometry4, janelaMaterial);    
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-5.5);
        janela.translateOnAxis(x,-9);
        janela.translateOnAxis(z,janealInicial - i*4);
        janela.rotateOnAxis(x, degreesToRadians(-90))
        predio.add(janela);
        var janela = new THREE.Mesh(janelaGeometry5, janelaMaterial);    
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-5.5);
        janela.translateOnAxis(x,-18);
        janela.translateOnAxis(z,janealInicial - i*4);
        janela.rotateOnAxis(x, degreesToRadians(-90))
        predio.add(janela);
    }

    var divisoria = new THREE.Mesh(divisoriaGeometry5, divisoriaMaterial);    
    divisoria.castShadow = true;
    divisoria.receiveShadow = true;
    divisoria.translateOnAxis(y,-5);
    divisoria.translateOnAxis(x,0);
    divisoria.translateOnAxis(z,20);
    predio.add(divisoria);

    var divisoria = new THREE.Mesh(divisoriaGeometry5, divisoriaMaterial);   
    divisoria.castShadow = true;
    divisoria.receiveShadow = true;
    divisoria.translateOnAxis(y,-5);
    divisoria.translateOnAxis(x,-12.5);
    divisoria.translateOnAxis(z,20);
    predio.add(divisoria);

    var divisoria = new THREE.Mesh(divisoriaGeometry5, divisoriaMaterial);   
    divisoria.castShadow = true;
    divisoria.receiveShadow = true;
    divisoria.translateOnAxis(y,-5);
    divisoria.translateOnAxis(x,-22.5);
    divisoria.translateOnAxis(z,20);
    predio.add(divisoria);

    var divisoria = new THREE.Mesh(divisoriaGeometry5, divisoriaMaterial);   
    divisoria.castShadow = true;
    divisoria.receiveShadow = true;
    divisoria.translateOnAxis(y,-5);
    divisoria.translateOnAxis(x,12.5);
    divisoria.translateOnAxis(z,20);
    predio.add(divisoria);

    var divisoria = new THREE.Mesh(divisoriaGeometry6, divisoriaMaterial);   
    divisoria.castShadow = true;
    divisoria.receiveShadow = true;
    divisoria.translateOnAxis(y,-5);
    divisoria.translateOnAxis(x,-17.5);
    divisoria.translateOnAxis(z,10);
    divisoria.rotateOnAxis(y,degreesToRadians(90));
    predio.add(divisoria);


    var cylinder = new THREE.Mesh(pilarGeometry, pilarMaterial);   
    cylinder.translateOnAxis(x,-18.5);
    cylinder.rotateOnAxis(x, degreesToRadians(90));
    predio.add(cylinder);

    predio.castShadow = true;
    predio.receiveShadow = true;

    cylinder.castShadow = true;
    cylinder.receiveShadow = true;

    return predio;
}
