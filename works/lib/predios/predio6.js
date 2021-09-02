import * as THREE from '../../../build/three.module.js';
import {
    degreesToRadians
} from "../../../libs/util/util.js";

var x = new THREE.Vector3(1, 0, 0); // Set x axis
var y = new THREE.Vector3(0, 1, 0); // Set y axis
var z = new THREE.Vector3(0, 0, 1); // Set Z axis 

export function createBuilding6(textureLoader) {
    //wall_tiles_stone_001
    const stylizedBlocksBaseColor = textureLoader.load('assets/predio_06/Stylized_blocks_001_basecolor.jpg');
    const stylizedBlocksBaseColor2 = textureLoader.load('assets/predio_06/Stylized_blocks_001_basecolor.jpg');
    //porta
    const portaFrenteMap = textureLoader.load('assets/predio_06/portaFrente.png');
    const portaMap = textureLoader.load('assets/predio_06/porta.png');
    //parte traseira
    const brickWallMap1 = textureLoader.load('assets/predio_06/Brick_Wall_017_basecolor - Copia.jpg');
    const brickWallMap2 = textureLoader.load('assets/predio_06/Brick_Wall_017_basecolor.jpg');
    //sacada
    var sacadaMap = textureLoader.load('assets/predio_06/Metal_Pattern_005_basecolor.jpg')
    sacadaMap.wrapS = THREE.RepeatWrapping;
    sacadaMap.wrapT = THREE.RepeatWrapping;
    sacadaMap.repeat.set( 2, 3 );
    //vidro
    const windowBaseColor = textureLoader.load('assets/predio_06/Glass_Window_002_basecolor.jpg');
    const windowNormalMap = textureLoader.load('assets/predio_06/Glass_Window_002_normal.jpg');
    const windowHeightMap = textureLoader.load('assets/predio_06/Glass_Window_002_height.png');
    const windowRoughnessMap = textureLoader.load('assets/predio_06/Glass_Window_002_roughness.jpg');
    const windowAmbientOcclusionMap = textureLoader.load('assets/predio_06/Glass_Window_002_ambientOcclusion.jpg');
    const windowMetallicMap = textureLoader.load('assets/predio_06/Glass_Window_002_metallic.jpg');
    const windowOpacityMap = textureLoader.load('assets/predio_06/Glass_Window_002_opacity.jpg');

    //Geometrias
    var parteFrontalGeometry = new THREE.BoxGeometry(70, 10, 100, 255, 255);
    var parteTraseiraGeometry = new THREE.BoxGeometry(80, 10, 100);
    var divisoriaGeometry = new THREE.BoxGeometry(70, 0.1, 0.5);
    var divisoriaGeometry2 = new THREE.BoxGeometry(10, 0.1, 0.5);
    var janelaGeometry = new THREE.PlaneGeometry(3, 3);
    var janelaGeometry2 = new THREE.PlaneGeometry(6, 3);
    var janelaGeometry3 = new THREE.PlaneGeometry(2, 4);
    var sacadaGeometry = new THREE.PlaneGeometry(5,10);
    var sacadaLateralGeometry = new THREE.PlaneGeometry(5,3);
    var sacadaFrontalGeometry = new THREE.PlaneGeometry(3,10);
    var portaSacadaGeometry = new THREE.PlaneGeometry(3,4);
    var portaPredioGeometry = new THREE.PlaneGeometry(8,8);

    //Materiais
    var parteFrontalMaterial1 = new THREE.MeshStandardMaterial({map: stylizedBlocksBaseColor});
    var parteFrontalMaterial2 = new THREE.MeshStandardMaterial({map: stylizedBlocksBaseColor2});
    parteFrontalMaterial1.map.wrapS = THREE.RepeatWrapping;
    parteFrontalMaterial1.map.wrapT = THREE.RepeatWrapping;
    parteFrontalMaterial1.map.repeat.set( 8, 1 );
    parteFrontalMaterial2.map.wrapS = THREE.RepeatWrapping;
    parteFrontalMaterial2.map.wrapT = THREE.RepeatWrapping;
    parteFrontalMaterial2.map.repeat.set( 8, 8 );

    var parteTraseiraMaterial1 = new THREE.MeshBasicMaterial({map: brickWallMap1});
    var parteTraseiraMaterial2 = new THREE.MeshBasicMaterial({map: brickWallMap2});
    parteTraseiraMaterial1.map.wrapS = THREE.RepeatWrapping;
    parteTraseiraMaterial1.map.wrapT = THREE.RepeatWrapping;
    parteTraseiraMaterial1.map.repeat.set( 8, 1 );
    parteTraseiraMaterial2.map.wrapS = THREE.RepeatWrapping;
    parteTraseiraMaterial2.map.wrapT = THREE.RepeatWrapping;
    parteTraseiraMaterial2.map.repeat.set( 8, 8 );

    var janelaMaterial = new THREE.MeshPhysicalMaterial({
        map: windowBaseColor,
        normalMap: windowNormalMap,
        displacementMap: windowHeightMap,
        displacementScale: 0.05,
        roughnessMap: windowRoughnessMap,
        roughness: 0,
        aoMap: windowAmbientOcclusionMap,
        metalnessMap: windowMetallicMap,
        metalness: 1,
        alphaMap: windowOpacityMap,
        side: THREE.DoubleSide
    });
    janelaMaterial.alphaTest = 0.001;
    janelaGeometry.attributes.uv2 = janelaGeometry.attributes.uv;
    janelaGeometry2.attributes.uv2 = janelaGeometry2.attributes.uv;
    janelaGeometry3.attributes.uv2 = janelaGeometry3.attributes.uv;

    var divisoriaMaterial = new THREE.MeshBasicMaterial({color: 'rgb(0, 0, 0)'});
    //var janelaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
    var sacadaMaterial = new THREE.MeshBasicMaterial({side:THREE.DoubleSide,map: sacadaMap});
    var sacadaLateralMaterial = new THREE.MeshBasicMaterial({side:THREE.DoubleSide,map: sacadaMap});
    var sacadaFrontalMaterial = new THREE.MeshBasicMaterial({side:THREE.DoubleSide,map: sacadaMap});
    var portaSacadaMaterial = new THREE.MeshBasicMaterial({side:THREE.DoubleSide, map: portaMap});
    var portaPredioMaterial = new THREE.MeshBasicMaterial({map: portaFrenteMap});

    var parteFrontal = new THREE.Mesh(parteFrontalGeometry, [parteFrontalMaterial1,parteFrontalMaterial1,parteFrontalMaterial2,parteFrontalMaterial2,parteFrontalMaterial1]);
    //scene.add(parteFrontal);
    var parteTraseira = new THREE.Mesh(parteTraseiraGeometry, [parteTraseiraMaterial1,parteTraseiraMaterial1,parteTraseiraMaterial2,parteTraseiraMaterial2,parteTraseiraMaterial1]);
    parteTraseira.castShadow = true;
    parteTraseira.receiveShadow = true;
    parteTraseira.translateOnAxis(y, 10);
    parteTraseira.translateOnAxis(x, -5);
    parteFrontal.add(parteTraseira);

    var divisoriaInicial = 50;
    var janelaInicial = 47;
    for(var i = 0; i < 14; i++){
        var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);    
        divisoria.castShadow = true;
        divisoria.receiveShadow = true;
        divisoria.translateOnAxis(y,-5.01);
        divisoria.translateOnAxis(z,divisoriaInicial - i*6);
        parteFrontal.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
        divisoria.castShadow = true;
        divisoria.receiveShadow = true;  
        divisoria.translateOnAxis(x,-35);
        divisoria.rotateOnAxis(z,degreesToRadians(90));
        divisoria.translateOnAxis(z,divisoriaInicial - i*6);
        parteFrontal.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial); 
        divisoria.castShadow = true;
        divisoria.receiveShadow = true; 
        divisoria.translateOnAxis(x,-40);
        divisoria.translateOnAxis(y,4.95)
        divisoria.translateOnAxis(z,divisoriaInicial - i*6);
        parteFrontal.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
        divisoria.castShadow = true;
        divisoria.receiveShadow = true;  
        divisoria.translateOnAxis(x,-45);
        divisoria.translateOnAxis(y,9.95)
        divisoria.rotateOnAxis(z,degreesToRadians(90));
        divisoria.translateOnAxis(z,divisoriaInicial - i*6);
        parteFrontal.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
        divisoria.castShadow = true;
        divisoria.receiveShadow = true;  
        divisoria.translateOnAxis(x,35);
        divisoria.rotateOnAxis(z,degreesToRadians(90));
        divisoria.translateOnAxis(z,divisoriaInicial - i*6);
        parteFrontal.add(divisoria);
        var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-5.05);
        janela.translateOnAxis(z, janelaInicial - i*6);
        janela.translateOnAxis(x, 30);
        janela.rotateOnAxis(x, degreesToRadians(90));
        parteFrontal.add(janela);
        var janela = new THREE.Mesh(janelaGeometry2, janelaMaterial);
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-5.05);
        janela.translateOnAxis(z, janelaInicial - i*6);
        janela.translateOnAxis(x, 23);
        janela.rotateOnAxis(x, degreesToRadians(90));
        parteFrontal.add(janela);
        var janela = new THREE.Mesh(janelaGeometry3, janelaMaterial);
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-5.05);
        janela.translateOnAxis(z, janelaInicial - i*6);
        janela.translateOnAxis(x, 18);
        janela.rotateOnAxis(x, degreesToRadians(90));
        parteFrontal.add(janela);
        var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-5.05);
        janela.translateOnAxis(z, janelaInicial - i*6);
        janela.translateOnAxis(x, 10);
        janela.rotateOnAxis(x, degreesToRadians(90));
        parteFrontal.add(janela);
        var janela = new THREE.Mesh(janelaGeometry2, janelaMaterial);
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-5.05);
        janela.translateOnAxis(z, janelaInicial - i*6);
        janela.translateOnAxis(x, 0);
        janela.rotateOnAxis(x, degreesToRadians(90));
        parteFrontal.add(janela);
        var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-5.05);
        janela.translateOnAxis(z, janelaInicial - i*6);
        janela.translateOnAxis(x, -7);
        janela.rotateOnAxis(x, degreesToRadians(90));
        parteFrontal.add(janela);
        var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-5.05);
        janela.translateOnAxis(z, janelaInicial - i*6);
        janela.translateOnAxis(x, -12);
        janela.rotateOnAxis(x, degreesToRadians(90));
        parteFrontal.add(janela);
        var janela = new THREE.Mesh(janelaGeometry2, janelaMaterial);
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-5.05);
        janela.translateOnAxis(z, janelaInicial - i*6);
        janela.translateOnAxis(x, -20);
        janela.rotateOnAxis(x, degreesToRadians(90));
        parteFrontal.add(janela);
        var janela = new THREE.Mesh(janelaGeometry3, janelaMaterial);
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-5.05);
        janela.translateOnAxis(z, janelaInicial - i*6);
        janela.translateOnAxis(x, -27);
        janela.rotateOnAxis(x, degreesToRadians(90));
        parteFrontal.add(janela);
        var janela = new THREE.Mesh(janelaGeometry3, janelaMaterial);
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,+4.95);
        janela.translateOnAxis(z, janelaInicial - i*6);
        janela.translateOnAxis(x, -39);
        janela.rotateOnAxis(x, degreesToRadians(90));
        parteFrontal.add(janela);
        var janela = new THREE.Mesh(janelaGeometry3, janelaMaterial);
        janela.castShadow = true;
        janela.receiveShadow = true;
        janela.translateOnAxis(y,-2.05);
        janela.translateOnAxis(z, janelaInicial - i*6);
        janela.translateOnAxis(x, -35.05);
        janela.translateOnAxis(y, degreesToRadians(90));
        janela.rotateOnAxis(y, degreesToRadians(90));
        parteFrontal.add(janela);
        var sacada = new THREE.Mesh(sacadaGeometry, sacadaMaterial);
        sacada.castShadow = true;
        sacada.receiveShadow = true;
        sacada.translateOnAxis(y, 10);
        sacada.translateOnAxis(z, 44- i*6);
        sacada.translateOnAxis(x, -47.5);
        parteFrontal.add(sacada);
        var sacadaLateral = new THREE.Mesh(sacadaLateralGeometry, sacadaLateralMaterial);
        sacadaLateral.castShadow = true;
        sacadaLateral.receiveShadow = true;
        sacadaLateral.translateOnAxis(y, 5);
        sacadaLateral.translateOnAxis(z, 45.5- i*6);
        sacadaLateral.translateOnAxis(x, -47.5);
        sacadaLateral.rotateOnAxis(x,degreesToRadians(90));
        parteFrontal.add(sacadaLateral);
        var sacadaLateral = new THREE.Mesh(sacadaLateralGeometry, sacadaLateralMaterial);
        sacadaLateral.castShadow = true;
        sacadaLateral.receiveShadow = true;
        sacadaLateral.translateOnAxis(y, 15);
        sacadaLateral.translateOnAxis(z, 45.5- i*6);
        sacadaLateral.translateOnAxis(x, -47.5);
        sacadaLateral.rotateOnAxis(x,degreesToRadians(90));
        parteFrontal.add(sacadaLateral);
        var sacadaFrontal = new THREE.Mesh(sacadaFrontalGeometry, sacadaFrontalMaterial);
        sacadaFrontal.castShadow = true;
        sacadaFrontal.receiveShadow = true;
        sacadaFrontal.translateOnAxis(y, 10);
        sacadaFrontal.translateOnAxis(z, 45.5 - i*6);
        sacadaFrontal.translateOnAxis(x, -50);
        sacadaFrontal.rotateOnAxis(y,degreesToRadians(90));
        parteFrontal.add(sacadaFrontal);
        var portaSacada = new THREE.Mesh(portaSacadaGeometry, portaSacadaMaterial);
        portaSacada.castShadow = true;
        portaSacada.receiveShadow = true;
        portaSacada.translateOnAxis(y, 10);
        portaSacada.translateOnAxis(x, -45.05);
        portaSacada.translateOnAxis(z, 46 - i*6);
        portaSacada.rotateOnAxis(x,degreesToRadians(90));
        portaSacada.rotateOnAxis(y,degreesToRadians(90));
        parteFrontal.add(portaSacada);
    }
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.castShadow = true;
    divisoria.receiveShadow = true;
    divisoria.translateOnAxis(y, -5.05);
    divisoria.translateOnAxis(z, -35);
    parteFrontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.castShadow = true;
    divisoria.receiveShadow = true;  
    divisoria.translateOnAxis(x,35);
    divisoria.rotateOnAxis(z,degreesToRadians(90));
    divisoria.translateOnAxis(z,-35);
    parteFrontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial); 
    divisoria.castShadow = true;
    divisoria.receiveShadow = true; 
    divisoria.translateOnAxis(x,-35);
    divisoria.rotateOnAxis(z,degreesToRadians(90));
    divisoria.translateOnAxis(z,-35);
    parteFrontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.castShadow = true;
    divisoria.receiveShadow = true;  
    divisoria.translateOnAxis(x,-45);
    divisoria.translateOnAxis(y,10);
    divisoria.rotateOnAxis(z,degreesToRadians(90));
    divisoria.translateOnAxis(z,-35);
    parteFrontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.castShadow = true;
    divisoria.receiveShadow = true;
    divisoria.translateOnAxis(x, -40);
    divisoria.translateOnAxis(y, 4.95);
    divisoria.translateOnAxis(z, -35);
    parteFrontal.add(divisoria);
    var portaPredio = new THREE.Mesh(portaPredioGeometry, portaPredioMaterial);
    portaPredio.castShadow = true;
    portaPredio.receiveShadow = true;
    portaPredio.translateOnAxis(y, -5.1);
    portaPredio.translateOnAxis(z, -46);
    portaPredio.rotateOnAxis(x,degreesToRadians(90));
    parteFrontal.add(portaPredio);

    parteFrontal.castShadow = true;
    parteFrontal.receiveShadow = true;

    return parteFrontal;
}