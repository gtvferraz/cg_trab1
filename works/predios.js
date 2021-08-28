import * as THREE from '../build/three.module.js';
import Stats from '../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import {
    initRenderer,
    degreesToRadians,
    createLightSphere
} from "../libs/util/util.js";
import {
    initLight
}from './lib/utils.js';
 
var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.copy(new THREE.Vector3(0, -50, 25));

var ambientLight = new THREE.AmbientLight("rgb(255, 255, 255)");
scene.add(ambientLight);
let sunLight = initLight(scene, new THREE.Vector3(-30,0,30)); 

const textureLoader = new THREE.TextureLoader();
//tiles_stone_001
const tilesBaseColor = textureLoader.load('./assets/Tiles_Stone_001_basecolor.jpg');
const tilesNormalMap = textureLoader.load('./assets/Tiles_Stone_001_normal.jpg');
const tilesHeightMap = textureLoader.load('./assets/Tiles_Stone_001_height.png');
const tilesRoughnessMap = textureLoader.load('./assets/Tiles_Stone_001_roughness.jpg');
const tilesAmbientOcclusionMap = textureLoader.load('./assets/Tiles_Stone_001_ambientOcclusion.jpg');
//wood_window_001
/*
const woodWindowBaseColor = textureLoader.load('./assets/Wood_Window_001_basecolor.jpg');
const woodWindowNormalMap = textureLoader.load('./assets/Wood_Window_001_normal.jpg');
const woodWindowHeightMap = textureLoader.load('./assets/Wood_Window_001_height.png');
const woodWindowRoughnessMap = textureLoader.load('./assets/Wood_Window_001_roughness.jpg');
const woodWindowAmbientOcclusionMap = textureLoader.load('./assets/Wood_Window_001_ambientOcclusion.jpg');
const woodWindowMetallicMap = textureLoader.load('./assets/Wood_Window_001_metallic.jpg');
const woodWindowOpacityMap = textureLoader.load('./assets/Wood_Window_001_opacity.jpg');*/
//glass_window_003
const glassBaseColor = textureLoader.load('./assets/Glass_Window_003_basecolor.jpg');
const glassNormalMap = textureLoader.load('./assets/Glass_Window_003_normal.jpg');
const glassHeightMap = textureLoader.load('./assets/Glass_Window_003_height.png');
const glassRoughnessMap = textureLoader.load('./assets/Glass_Window_003_roughness.jpg');
const glassAmbientOcclusionMap = textureLoader.load('./assets/Glass_Window_003_ambientOcclusion.jpg');
const glassMetallicMap = textureLoader.load('./assets/Glass_Window_003_metallic.jpg');
const glassOpacityMap = textureLoader.load('./assets/Glass_Window_003_opacity.jpg');
//door_wood_001
const doorWoodBaseColor = textureLoader.load('./assets/Door_Wood_001_basecolor.jpg');
const doorWoodNormalMap = textureLoader.load('./assets/Door_Wood_001_normal.jpg');
const doorWoodHeightMap = textureLoader.load('./assets/Door_Wood_001_height.png');
const doorWoodRoughnessMap = textureLoader.load('./assets/Door_Wood_001_roughness.jpg');
const doorWoodAmbientOcclusionMap = textureLoader.load('./assets/Door_Wood_001_ambientOcclusion.jpg');
const doorWoodMetallicMap = textureLoader.load('./assets/Door_Wood_001_metallic.jpg');
const doorWoodOpacityMap = textureLoader.load('./assets/Door_Wood_001_opacity.jpg');
//door
const portaMap = textureLoader.load('./assets/porta.png')
//geometry
var gradeFrenteGeometry = new THREE.BoxGeometry(9,0.1,0.1);
var gradeLateralGeometry = new THREE.BoxGeometry(0.1,3,0.1);
var pisoGeometry = new THREE.PlaneGeometry(9, 3);
var portaVarandaGeometry = new THREE.PlaneGeometry(1,2.5);
var predioGeometry = new THREE.BoxGeometry(20, 8, 20, 512, 512);
var pilarGeometry = new THREE.BoxGeometry(2,3,16);
var janelaGeometry = new THREE.PlaneGeometry(1,1, 512, 512);

//material
var pisoMaterial = new THREE.MeshBasicMaterial({
    color: "rgba(150, 150, 150)",
    side: THREE.DoubleSide,
});
var portaVarandaMaterial = new THREE.MeshLambertMaterial({color:"rgb(255,255,255)",side:THREE.DoubleSide});
portaVarandaMaterial.map = portaMap
/*var portaVarandaMaterial = new THREE.MeshPhysicalMaterial({
    map: doorWoodBaseColor,
    normalMap: doorWoodNormalMap,
    displacementMap: doorWoodHeightMap,
    displacementScale: 0.05,
    roughnessMap: doorWoodRoughnessMap,
    roughness: 0,
    aoMap: doorWoodAmbientOcclusionMap,
    metalnessMap: doorWoodMetallicMap,
    metalness: 1,
    alphaMap: doorWoodOpacityMap,
});
portaVarandaMaterial.alphaTest = 0.11;
portaVarandaGeometry.attributes.uv2 = portaVarandaGeometry.attributes.uv;*/
var gradeMaterial = new THREE.MeshBasicMaterial();
var cubeMaterial = new THREE.MeshNormalMaterial();
var janelaMaterial = new THREE.MeshPhysicalMaterial({
    map: glassBaseColor,
    normalMap: glassNormalMap,
    displacementMap: glassHeightMap,
    displacementScale: 0.05,
    roughnessMap: glassRoughnessMap,
    roughness: 0,
    aoMap: glassAmbientOcclusionMap,
    metalnessMap: glassMetallicMap,
    metalness: 1,
    alphaMap: glassOpacityMap,
});
janelaMaterial.alphaTest = 0.11;
janelaGeometry.attributes.uv2 = janelaGeometry.attributes.uv;
var predioMaterial = new THREE.MeshStandardMaterial({
    map: tilesBaseColor,
    normalMap: tilesNormalMap,
    displacementMap: tilesHeightMap,
    displacementScale: 0.001,
    roughnessMap: tilesRoughnessMap,
    roughness: 0.1,
    aoMap: tilesAmbientOcclusionMap
});
predioGeometry.attributes.uv2 = predioGeometry.attributes.uv;

var predio = new THREE.Mesh(predioGeometry, predioMaterial);
predio.position.set(0,0,10);
scene.add(predio);

var pilar = new THREE.Mesh(pilarGeometry, cubeMaterial);
predio.add(pilar);
pilar.position.set(0,-4 -1.5,2)

for(var i = 0; i<5; i++) {
    var gradeFrenteEsq = new THREE.Mesh(gradeFrenteGeometry, gradeMaterial);
    var gradeFrenteDir = new THREE.Mesh(gradeFrenteGeometry, gradeMaterial);
    predio.add(gradeFrenteEsq);
    predio.add(gradeFrenteDir);
    gradeFrenteEsq.position.set(-5.5, -4 -3, -5 + i*3.2);
    gradeFrenteDir.position.set(5.5, -4 -3, -5 + i*3.2);

    var gradeLateral1 = new THREE.Mesh(gradeLateralGeometry, gradeMaterial);
    var gradeLateral2 = new THREE.Mesh(gradeLateralGeometry, gradeMaterial);
    predio.add(gradeLateral1);
    predio.add(gradeLateral2);
    gradeLateral1.position.set(-10 + 0.05, -4 - 1.5, -5 + i*3.2);
    gradeLateral2.position.set(10 - 0.05, -4 - 1.5, -5 + i*3.2)

    var pisoEsq = new THREE.Mesh(pisoGeometry, pisoMaterial);
    var pisoDir = new THREE.Mesh(pisoGeometry,pisoMaterial);
    predio.add(pisoEsq);
    predio.add(pisoDir);
    pisoEsq.position.set(-5.5, -4 - 1.5, -6 + i*3.2)
    pisoDir.position.set(5.5, -4 - 1.5, -6 + i*3.2)

    var portaVarandaEsq = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
    var portaVarandaDir = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
    predio.add(portaVarandaEsq);
    predio.add(portaVarandaDir);
    portaVarandaEsq.rotateOnAxis(new THREE.Vector3(1,0,0), degreesToRadians(90));
    portaVarandaDir.rotateOnAxis(new THREE.Vector3(1,0,0), degreesToRadians(90));
    portaVarandaEsq.position.set(-1.5, -4.01, -6 + 2.5/2 + i*3.2)
    portaVarandaDir.position.set(1.5, -4.01, -6 + 2.5/2 + i*3.2)

    var janelaEsq = new THREE.Mesh(janelaGeometry, janelaMaterial);
    var janelaDir = new THREE.Mesh(janelaGeometry, janelaMaterial);
    predio.add(janelaEsq);
    predio.add(janelaDir);
    janelaEsq.rotateOnAxis(new THREE.Vector3(0,1,0), degreesToRadians(-90));
    janelaDir.rotateOnAxis(new THREE.Vector3(0,1,0), degreesToRadians(90));
    janelaEsq.position.set(-10.01, 0, -4.5 + i*3.2)
    janelaDir.position.set(10.01, 0, -4 + i*3.2)
}

var portaEntradaGeometry = new THREE.PlaneGeometry(5,4);
var portaMaterial = new THREE.MeshBasicMaterial();
var porta = new THREE.Mesh(portaEntradaGeometry,portaMaterial);
predio.add(porta);
porta.rotateOnAxis(new THREE.Vector3(1,0,0), degreesToRadians(90));
porta.position.set(0,-4.01,-8)


// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12)
scene.add(axesHelper);
// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);
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
}

function render() {
    stats.update(); // Update FPS
    trackballControls.update(); // Enable mouse movements
    requestAnimationFrame(render);
    renderer.render(scene, camera) // Render scene
}