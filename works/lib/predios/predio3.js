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
 
var stats = new Stats(); // To show FPS information
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
}

function predio03(position, textureLoader, scene) {
    //wall_tiles_stone_001
    const wallTilesBaseColor = textureLoader.load('../../assets/predio_03/Wall_Tiles_Stone_001_basecolor.jpg');
    const wallTilesNormalMap = textureLoader.load('../../assets/predio_03/Wall_Tiles_Stone_001_normal.jpg');
    const wallTilesHeightMap = textureLoader.load('../../assets/predio_03/Wall_Tiles_Stone_001_height.png');
    const wallTilesRoughnessMap = textureLoader.load('../../assets/predio_03/Wall_Tiles_Stone_001_roughness.jpg');
    const wallTilesAmbientOcclusionMap = textureLoader.load('../../assets/predio_03/Wall_Tiles_Stone_001_ambientOcclusion.jpg');


    //geometry
    var predioBaseGeometry = new THREE.BoxGeometry(50,40,40,512,512);
    var predioMeioGeometry = new THREE.CylinderGeometry(30,30,70,8)

    //material
    var predioMeioMaterial = new THREE.MeshStandardMaterial({color:'rgb(250,0,0)'});

    var predioMaterial = new THREE.MeshStandardMaterial({
        map: wallTilesBaseColor,
        normalMap: wallTilesNormalMap,
        displacementMap: wallTilesHeightMap,
        displacementScale: 0.001,
        roughnessMap: wallTilesRoughnessMap,
        roughness: 0.1,
        aoMap: wallTilesAmbientOcclusionMap
    });
    predioBaseGeometry.attributes.uv2 = predioBaseGeometry.attributes.uv;
    predioMeioGeometry.attributes.uv2 = predioMeioGeometry.attributes.uv
    //construção
    var predio = new THREE.Mesh(predioBaseGeometry,predioMaterial);
    scene.add(predio);
    predio.position.copy(position);

    var predioMeio = new THREE.Mesh(predioMeioGeometry,predioMeioMaterial)
    predio.add(predioMeio)
    predioMeio.rotateOnAxis(new THREE.Vector3(1,0,0), degreesToRadians(90));
    predioMeio.position.set(0,0,20 + 70/2);

    return predio;
}

function render() {
    stats.update(); // Update FPS
    trackballControls.update(); // Enable mouse movements
    requestAnimationFrame(render);
    renderer.render(scene, camera) // Render scene
}