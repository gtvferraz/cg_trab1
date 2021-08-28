import * as THREE from '../../../build/three.module.js';
import Stats from '../../../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../../../build/jsm/controls/TrackballControls.js';
import {
    initRenderer,
    degreesToRadians,
    createLightSphere
} from "../../../libs/util/util.js";
import {
    initLight
} from '../../lib/utils.js';
var x = new THREE.Vector3(1, 0, 0); // Set x axis
var y = new THREE.Vector3(0, 1, 0); // Set y axis
var z = new THREE.Vector3(0, 0, 1); // Set Z axis
var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.copy(new THREE.Vector3(0, -50, 25));

var ambientLight = new THREE.AmbientLight("rgb(255, 255, 255)");
scene.add(ambientLight);
let sunLight = initLight(scene, new THREE.Vector3(-30,0,30)); 

var TamanhoPredio = 10;
//Predio
var predioPrincipal = new THREE.BoxGeometry(TamanhoPredio+5, TamanhoPredio, TamanhoPredio+10);
var predioMaterial = new THREE.MeshBasicMaterial({color: 'rgb(110,0,0)'});
var predio = new THREE.Mesh(predioPrincipal, predioMaterial);
predio.translateOnAxis(z,10);
predio.translateOnAxis(x,2.5);
scene.add(predio);

var lateralGeometry = new THREE.BoxGeometry(TamanhoPredio-5, TamanhoPredio+5, TamanhoPredio+10);
var lateralMaterial = new THREE.MeshBasicMaterial({color: 'rgb(255,255,0)'});
var lateral = new THREE.Mesh(lateralGeometry,lateralMaterial);
lateral.translateOnAxis(x, +10);
lateral.translateOnAxis(y, -2.50);
predio.add(lateral);

var lateralGeometry = new THREE.BoxGeometry(TamanhoPredio-5, TamanhoPredio+5, TamanhoPredio+10);
var lateralMaterial = new THREE.MeshBasicMaterial({color: 'rgb(255,255,0)'});
var lateral = new THREE.Mesh(lateralGeometry,lateralMaterial);
lateral.translateOnAxis(x, -10);
lateral.translateOnAxis(y, -2.50);
predio.add(lateral);

var divisorioaInicial = 9.75;
for(var i = 0; i < 5; i++){
    var divisoriaGeometry = new THREE.BoxGeometry(TamanhoPredio+5, 0.1, 0.5);
    var divisoriaMaterial = new THREE.MeshBasicMaterial();
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.translateOnAxis(y,-5);
    divisoria.translateOnAxis(z,divisorioaInicial - i*4);
    predio.add(divisoria);
    var divisoriaGeometry = new THREE.BoxGeometry(5, 0.1, 0.5);
    var divisoriaMaterial = new THREE.MeshBasicMaterial();
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.translateOnAxis(y,-7.5);
    divisoria.translateOnAxis(x,7.5);
    divisoria.translateOnAxis(z,divisorioaInicial - i*4);
    divisoria.rotateOnAxis(z,degreesToRadians(90));
    predio.add(divisoria);
    var divisoriaGeometry = new THREE.BoxGeometry(5, 0.1, 0.5);
    var divisoriaMaterial = new THREE.MeshBasicMaterial();
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.translateOnAxis(y,-7.5);
    divisoria.translateOnAxis(x,-7.5);
    divisoria.translateOnAxis(z,divisorioaInicial - i*4);
    divisoria.rotateOnAxis(z,degreesToRadians(90));
    predio.add(divisoria);
    var divisoriaGeometry = new THREE.BoxGeometry(5, 0.1, 0.5);
    var divisoriaMaterial = new THREE.MeshBasicMaterial();
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.translateOnAxis(y,-10);
    divisoria.translateOnAxis(x,-10);
    divisoria.translateOnAxis(z,divisorioaInicial - i*4);
    predio.add(divisoria);
    var divisoriaGeometry = new THREE.BoxGeometry(5, 0.1, 0.5);
    var divisoriaMaterial = new THREE.MeshBasicMaterial();
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.translateOnAxis(y,-10);
    divisoria.translateOnAxis(x,10);
    divisoria.translateOnAxis(z,divisorioaInicial - i*4);
    predio.add(divisoria);
    var janelaGeometry = new THREE.PlaneGeometry(2,2);
    var janelaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(y,-15);
    janela.translateOnAxis(x,10);
    janela.translateOnAxis(z,8);
    janela.rotateOnAxis(x, degreesToRadians(-90))
    predio.add(janela);
}



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