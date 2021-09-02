import * as THREE from '../../../build/three.module.js';
import {
    degreesToRadians
} from "../../../libs/util/util.js";


export function createBuilding3(textureLoader) {
    const x = new THREE.Vector3(1,0,0);
    const y = new THREE.Vector3(0,1,0);
    const z = new THREE.Vector3(0,0,1);
    const rot90 = degreesToRadians(90);

    //wall_tiles_stone_001
    const wallTilesBaseColor = textureLoader.load('assets/predio_03/Wall_Tiles_Stone_001_basecolor.jpg');
    const wallTilesNormalMap = textureLoader.load('assets/predio_03/Wall_Tiles_Stone_001_normal.jpg');
    const wallTilesHeightMap = textureLoader.load('assets/predio_03/Wall_Tiles_Stone_001_height.png');
    const wallTilesRoughnessMap = textureLoader.load('assets/predio_03/Wall_Tiles_Stone_001_roughness.jpg');
    const wallTilesAmbientOcclusionMap = textureLoader.load('assets/predio_03/Wall_Tiles_Stone_001_ambientOcclusion.jpg');
    //stylized_tiles_001
    const stTilesBaseColor = textureLoader.load('assets/predio_03/Stylized_Tiles_001_basecolor.jpg');
    const stTilesNormalMap = textureLoader.load('assets/predio_03/Stylized_Tiles_001_normal.jpg');
    const stTilesHeightMap = textureLoader.load('assets/predio_03/Stylized_Tiles_001_height.png');
    const stTilesRoughnessMap = textureLoader.load('assets/predio_03/Stylized_Tiles_001_roughness.jpg');
    const stTilesAmbientOcclusionMap = textureLoader.load('assets/predio_03/Stylized_Tiles_001_ambientOcclusion.jpg');
    //roof
    const roofBaseColor = textureLoader.load('assets/predio_03/Roof_Tiles_Terracotta_006_basecolor.jpg');
    //papel de parede
    var topoMap = textureLoader.load('assets/predio_03/Stylized_Wall_001_basecolor.jpg');
    //pilar
    var pilarMap = textureLoader.load('assets/predio_03/Wall_Stone_020_basecolor.jpg')
    //varanda
    var varandaMap = textureLoader.load('assets/predio_03/Wood_Herringbone_Tiles_002_basecolor.jpg')
    //vidro
    const woodWindowBaseColor = textureLoader.load('assets/predio_03/Wood_Window_001_basecolor.jpg');
    const woodWindowNormalMap = textureLoader.load('assets/predio_03/Wood_Window_001_normal.jpg');
    const woodWindowHeightMap = textureLoader.load('assets/predio_03/Wood_Window_001_height.png');
    const woodWindowRoughnessMap = textureLoader.load('assets/predio_03/Wood_Window_001_roughness.jpg');
    const woodWindowAmbientOcclusionMap = textureLoader.load('assets/predio_03/Wood_Window_001_ambientOcclusion.jpg');
    const woodWindowMetallicMap = textureLoader.load('assets/predio_03/Wood_Window_001_metallic.jpg');
    const woodWindowOpacityMap = textureLoader.load('assets/predio_03/Wood_Window_001_opacity.jpg');
    //vidro lateral
    const windowBaseColor = textureLoader.load('assets/predio_03/Glass_Window_001_basecolor.jpg');
    const windowNormalMap = textureLoader.load('assets/predio_03/Glass_Window_001_normal.jpg');
    const windowHeightMap = textureLoader.load('assets/predio_03/Glass_Window_001_height.png');
    const windowRoughnessMap = textureLoader.load('assets/predio_03/Glass_Window_001_roughness.jpg');
    const windowAmbientOcclusionMap = textureLoader.load('assets/predio_03/Glass_Window_001_ambientOcclusion.jpg');
    const windowOpacityMap = textureLoader.load('assets/predio_03/Glass_Window_001_glass.jpg');
    //porta andar
    const portaMap = textureLoader.load('assets/predio_03/portaAP.jpg');
    //porta frente
    const portaFrenteMap = textureLoader.load('assets/predio_03/portaFrente.png');

    //geometry
    var predioBaseGeometry = new THREE.BoxGeometry(50,40,100);
    var topoGeometry = new THREE.PlaneGeometry(30,5);
    var tetoPredioGeometry = new THREE.PlaneGeometry(50,40);
    var pilarGeometry = new THREE.CylinderGeometry(1,1,5,32);
    var varandaGeometry = new THREE.BoxGeometry(20,4,5)
    var janelaGeometry = new THREE.PlaneGeometry(5,5);
    var portaFrenteGeometry = new THREE.PlaneGeometry(4,5)

    //material
    var predioMaterial = new THREE.MeshStandardMaterial({
        map: wallTilesBaseColor
    });
    predioBaseGeometry.attributes.uv2 = predioBaseGeometry.attributes.uv;

    var predioMaterialTopo = new THREE.MeshStandardMaterial({
        map: stTilesBaseColor
    });
    predioMaterialTopo.map.wrapS = THREE.RepeatWrapping;
    predioMaterialTopo.map.wrapT = THREE.RepeatWrapping;
    predioMaterialTopo.map.repeat.set( 8, 8 );

    var topoMaterial = new THREE.MeshLambertMaterial({color:"rgb(255,255,255)",side: THREE.DoubleSide});
    topoMaterial.map = topoMap;
    topoMaterial.map.wrapS = THREE.RepeatWrapping;
    topoMaterial.map.wrapT = THREE.RepeatWrapping;
    topoMaterial.map.repeat.set( 8, 1 );

    var tetoPredioMaterial = new THREE.MeshStandardMaterial({
        map: roofBaseColor,
        side: THREE.DoubleSide
    });
    tetoPredioGeometry.attributes.uv2 = tetoPredioGeometry.attributes.uv;
    tetoPredioMaterial.map.wrapS = THREE.RepeatWrapping;
    tetoPredioMaterial.map.wrapT = THREE.RepeatWrapping;
    tetoPredioMaterial.map.repeat.set( 4, 4 );

    var pilarMaterial = new THREE.MeshStandardMaterial({map: pilarMap});

    var janelaVarandaMaterial = new THREE.MeshPhysicalMaterial({
        map: woodWindowBaseColor,
        normalMap: woodWindowNormalMap,
        displacementMap: woodWindowHeightMap,
        displacementScale: 0.05,
        roughnessMap: woodWindowRoughnessMap,
        roughness: 0,
        aoMap: woodWindowAmbientOcclusionMap,
        metalnessMap: woodWindowMetallicMap,
        metalness: 1,
        alphaMap: woodWindowOpacityMap,
        side: THREE.DoubleSide
    });
    janelaVarandaMaterial.alphaTest = 0.1;
    varandaGeometry.attributes.uv2 = varandaGeometry.attributes.uv;

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
    janelaMaterial.alphaTest = 0.001;
    janelaGeometry.attributes.uv2 = janelaGeometry.attributes.uv;
    
    var varandaMaterial = new THREE.MeshBasicMaterial({map: varandaMap, side: THREE.DoubleSide})

    //construção
    var predio = new THREE.Mesh(predioBaseGeometry,[predioMaterial,predioMaterial,predioMaterial,predioMaterial,predioMaterialTopo,predioMaterial]);
    predio.castShadow = true;
    predio.receiveShadow = true;

    var topo1 = new THREE.Mesh(topoGeometry,topoMaterial);
    var topo2 = new THREE.Mesh(topoGeometry,topoMaterial);
    var topo3 = new THREE.Mesh(topoGeometry,topoMaterial);
    var topo4 = new THREE.Mesh(topoGeometry,topoMaterial);
    topo1.castShadow = true;
    topo1.receiveShadow = true;
    topo2.castShadow = true;
    topo2.receiveShadow = true;
    topo3.castShadow = true;
    topo3.receiveShadow = true;
    topo4.castShadow = true;
    topo4.receiveShadow = true;
    predio.add(topo1)
    predio.add(topo2)
    predio.add(topo3)
    predio.add(topo4)
    topo1.rotateOnAxis(x, rot90);
    topo2.rotateOnAxis(x, rot90);
    topo2.rotateOnAxis(y, rot90);
    topo3.rotateOnAxis(x, rot90);
    topo3.rotateOnAxis(y, rot90);
    topo4.rotateOnAxis(x, rot90);
    topo1.position.set(0,-15,50 + 2.5)
    topo2.position.set(-15,0,50 + 2.5)
    topo3.position.set(15,0,50 + 2.5)
    topo4.position.set(0,15,50 + 2.5)

    var teto = new THREE.Mesh(tetoPredioGeometry, tetoPredioMaterial);
    teto.castShadow = true;
    teto.receiveShadow = true;
    predio.add(teto);
    teto.position.set(0,0,55.01);

    var pilar1 = new THREE.Mesh(pilarGeometry, pilarMaterial);
    var pilar2 = new THREE.Mesh(pilarGeometry, pilarMaterial);
    var pilar3 = new THREE.Mesh(pilarGeometry, pilarMaterial);
    var pilar4 = new THREE.Mesh(pilarGeometry, pilarMaterial);
    pilar1.castShadow = true;
    pilar1.receiveShadow = true;
    pilar2.castShadow = true;
    pilar2.receiveShadow = true;
    pilar3.castShadow = true;
    pilar3.receiveShadow = true;
    pilar4.castShadow = true;
    pilar4.receiveShadow = true;
    predio.add(pilar1);
    predio.add(pilar2);
    predio.add(pilar3);
    predio.add(pilar4);
    pilar1.rotateOnAxis(x, rot90);
    pilar1.position.set(24,19,50+2.5);
    pilar2.rotateOnAxis(x, rot90);
    pilar2.position.set(-24,19,50+2.5);
    pilar3.rotateOnAxis(x, rot90);
    pilar3.position.set(24,-19,50+2.5);
    pilar4.rotateOnAxis(x, rot90);
    pilar4.position.set(-24,-19,50+2.5);

    var portaGeometry = new THREE.PlaneGeometry(2,4)
    
    var portaMaterial = new THREE.MeshStandardMaterial({map: portaMap});
    var portaFrenteMaterial =  new THREE.MeshStandardMaterial({map: portaFrenteMap});

    var portaFrente = new THREE.Mesh(portaFrenteGeometry, portaFrenteMaterial);
    portaFrente.castShadow = true;
    portaFrente.receiveShadow = true;
    predio.add(portaFrente);
    portaFrente.rotateOnAxis(x, rot90);
    portaFrente.position.set(0,-20.5,-47.5)

    for(var i=0; i<9; i++) {
        var varanda = new THREE.Mesh(varandaGeometry,[janelaVarandaMaterial,janelaVarandaMaterial,janelaVarandaMaterial,janelaVarandaMaterial,varandaMaterial,varandaMaterial]);
        varanda.castShadow = true;
        varanda.receiveShadow = true;
        predio.add(varanda)
        varanda.position.set(25/2*Math.pow(-1,i), -20-2, -35+0.1/2 + i*10)

        var porta = new THREE.Mesh(portaGeometry, portaMaterial);
        porta.castShadow = true;
        porta.receiveShadow = true;
        predio.add(porta);
        porta.rotateOnAxis(x, rot90);
        porta.position.set(20*Math.pow(-1,i), -20.5, -35.5 + i*10)

        var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
        janela.castShadow = true;
        janela.receiveShadow = true;
        predio.add(janela);
        janela.rotateOnAxis(y, rot90);
        janela.position.set(25.5, 0,-35.5 + i*10)
        var janela2 = new THREE.Mesh(janelaGeometry, janelaMaterial);
        janela.castShadow = true;
        janela.receiveShadow = true;
        predio.add(janela2);
        janela2.rotateOnAxis(y, rot90);
        janela2.position.set(-25.5, 0,-35.5 + i*10)
    }

    return predio;
}
