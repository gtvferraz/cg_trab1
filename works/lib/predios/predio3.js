import * as THREE from '../../../build/three.module.js';
import Stats from '../../../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../../../build/jsm/controls/TrackballControls.js';
import {
    initRenderer,
    degreesToRadians
} from "../../../libs/util/util.js";
import {
    initLight
}from '../utils.js';
 
/*var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.copy(new THREE.Vector3(0, -50, 25));

var ambientLight = new THREE.AmbientLight("rgb(255, 255, 255)");
scene.add(ambientLight);
let sunLight = initLight(scene, new THREE.Vector3(-30,0,30)); 

const textureLoader = new THREE.TextureLoader();

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12)
scene.add(axesHelper);
// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);
predio03(new THREE.Vector3(0,0,0), textureLoader, scene);
render();

function setSpotLight(position,spotLight)
{
  spotLight.position.copy(position);
  spotLight.shadow.mapSize.width = 512;
  spotLight.shadow.mapSize.height = 512;
  spotLight.angle = degreesToRadians(40);    
  spotLight.castShadow = true;
  spotLight.decay = 2;
  spotLight.penumbra = 0.5;
  spotLight.name = "Spot Light"
  scene.add(spotLight);
}*/

export function createBuilding3(position, textureLoader) {
    const x = new THREE.Vector3(1,0,0);
    const y = new THREE.Vector3(0,1,0);
    const z = new THREE.Vector3(0,0,1);
    const rot90 = degreesToRadians(90);

    //wall_tiles_stone_001
    const wallTilesBaseColor = textureLoader.load('/works/assets/predio_03/Wall_Tiles_Stone_001_basecolor.jpg');
    const wallTilesNormalMap = textureLoader.load('/works/assets/predio_03/Wall_Tiles_Stone_001_normal.jpg');
    const wallTilesHeightMap = textureLoader.load('/works/assets/predio_03/Wall_Tiles_Stone_001_height.png');
    const wallTilesRoughnessMap = textureLoader.load('/works/assets/predio_03/Wall_Tiles_Stone_001_roughness.jpg');
    const wallTilesAmbientOcclusionMap = textureLoader.load('/works/assets/predio_03/Wall_Tiles_Stone_001_ambientOcclusion.jpg');
    //stylized_tiles_001
    const stTilesBaseColor = textureLoader.load('/works/assets/predio_03/Stylized_Tiles_001_basecolor.jpg');
    const stTilesNormalMap = textureLoader.load('/works/assets/predio_03/Stylized_Tiles_001_normal.jpg');
    const stTilesHeightMap = textureLoader.load('/works/assets/predio_03/Stylized_Tiles_001_height.png');
    const stTilesRoughnessMap = textureLoader.load('/works/assets/predio_03/Stylized_Tiles_001_roughness.jpg');
    const stTilesAmbientOcclusionMap = textureLoader.load('/works/assets/predio_03/Stylized_Tiles_001_ambientOcclusion.jpg');
    //roof
    const roofBaseColor = textureLoader.load('/works/assets/predio_03/Roof_Tiles_Terracotta_006_basecolor.jpg');
    //papel de parede
    var topoMap = textureLoader.load('/works/assets/predio_03/Stylized_Wall_001_basecolor.jpg');
    //pilar
    var pilarMap = textureLoader.load('/works/assets/predio_03/Wall_Stone_020_basecolor.jpg')
    //varanda
    var varandaMap = textureLoader.load('/works/assets/predio_03/Wood_Herringbone_Tiles_002_basecolor.jpg')
    //vidro
    const woodWindowBaseColor = textureLoader.load('/works/assets/predio_03/Wood_Window_001_basecolor.jpg');
    const woodWindowNormalMap = textureLoader.load('/works/assets/predio_03/Wood_Window_001_normal.jpg');
    const woodWindowHeightMap = textureLoader.load('/works/assets/predio_03/Wood_Window_001_height.png');
    const woodWindowRoughnessMap = textureLoader.load('/works/assets/predio_03/Wood_Window_001_roughness.jpg');
    const woodWindowAmbientOcclusionMap = textureLoader.load('/works/assets/predio_03/Wood_Window_001_ambientOcclusion.jpg');
    const woodWindowMetallicMap = textureLoader.load('/works/assets/predio_03/Wood_Window_001_metallic.jpg');
    const woodWindowOpacityMap = textureLoader.load('/works/assets/predio_03/Wood_Window_001_opacity.jpg');
    //vidro lateral
    const windowBaseColor = textureLoader.load('/works/assets/predio_03/Glass_Window_001_basecolor.jpg');
    const windowNormalMap = textureLoader.load('/works/assets/predio_03/Glass_Window_001_normal.jpg');
    const windowHeightMap = textureLoader.load('/works/assets/predio_03/Glass_Window_001_height.png');
    const windowRoughnessMap = textureLoader.load('/works/assets/predio_03/Glass_Window_001_roughness.jpg');
    const windowAmbientOcclusionMap = textureLoader.load('/works/assets/predio_03/Glass_Window_001_ambientOcclusion.jpg');
    const windowOpacityMap = textureLoader.load('/works/assets/predio_03/Glass_Window_001_glass.jpg');
    //porta andar
    const portaMap = textureLoader.load('/works/assets/predio_03/portaAP.jpg');
    //porta frente
    const portaFrenteMap = textureLoader.load('/works/assets/predio_03/portaFrente.png');

    //geometry
    var predioBaseGeometry = new THREE.BoxGeometry(50,40,100,512,512);
    var topoGeometry = new THREE.PlaneGeometry(30,5);
    var tetoPredioGeometry = new THREE.PlaneGeometry(50,40,512,512);
    var pilarGeometry = new THREE.CylinderGeometry(1,1,5,32);
    var varandaGeometry = new THREE.BoxGeometry(20,4,5)
    var janelaGeometry = new THREE.PlaneGeometry(5,5,512,512);
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
    
    var varandaMaterial = new THREE.MeshBasicMaterial({color:'rgb(250,250,250',map: varandaMap, side: THREE.DoubleSide})

    //construção
    var predio = new THREE.Mesh(predioBaseGeometry,[predioMaterial,predioMaterial,predioMaterial,predioMaterial,predioMaterialTopo,predioMaterial]);
    //scene.add(predio);
    predio.position.copy(position);

    var topo1 = new THREE.Mesh(topoGeometry,topoMaterial);
    var topo2 = new THREE.Mesh(topoGeometry,topoMaterial);
    var topo3 = new THREE.Mesh(topoGeometry,topoMaterial);
    var topo4 = new THREE.Mesh(topoGeometry,topoMaterial);
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
    predio.add(teto);
    teto.position.set(0,0,55.01);

    var pilar1 = new THREE.Mesh(pilarGeometry, pilarMaterial);
    var pilar2 = new THREE.Mesh(pilarGeometry, pilarMaterial);
    var pilar3 = new THREE.Mesh(pilarGeometry, pilarMaterial);
    var pilar4 = new THREE.Mesh(pilarGeometry, pilarMaterial);
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
    predio.add(portaFrente);
    portaFrente.rotateOnAxis(x, rot90);
    portaFrente.position.set(0,-20.5,-47.5)

    for(var i=0; i<9; i++) {
        var varanda = new THREE.Mesh(varandaGeometry,[janelaVarandaMaterial,janelaVarandaMaterial,janelaVarandaMaterial,janelaVarandaMaterial,varandaMaterial,varandaMaterial]);
        predio.add(varanda)
        varanda.position.set(25/2*Math.pow(-1,i), -20-2, -35+0.1/2 + i*10)

        var porta = new THREE.Mesh(portaGeometry, portaMaterial);
        predio.add(porta);
        porta.rotateOnAxis(x, rot90);
        porta.position.set(20*Math.pow(-1,i), -20.5, -35.5 + i*10)

        var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
        predio.add(janela);
        janela.rotateOnAxis(y, rot90);
        janela.position.set(25.5, 0,-35.5 + i*10)
        var janela2 = new THREE.Mesh(janelaGeometry, janelaMaterial);
        predio.add(janela2);
        janela2.rotateOnAxis(y, rot90);
        janela2.position.set(-25.5, 0,-35.5 + i*10)
    }

    predio.castShadow = true;

    predio.position.copy(position);
    return predio;
}

/*function render() {
    stats.update(); // Update FPS
    trackballControls.update(); // Enable mouse movements
    requestAnimationFrame(render);
    renderer.render(scene, camera) // Render scene
}*/