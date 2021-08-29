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
var x = new THREE.Vector3(1, 0, 0); // Set x axis
var y = new THREE.Vector3(0, 1, 0); // Set y axis
var z = new THREE.Vector3(0, 0, 1); // Set Z axis 
var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.copy(new THREE.Vector3(0, -140, 44));

var ambientLight = new THREE.AmbientLight("rgb(255, 255, 255)");
scene.add(ambientLight);
let sunLight = initLight(scene, new THREE.Vector3(-30,0,30)); 

const textureLoader = new THREE.TextureLoader();

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12)
scene.add(axesHelper);
// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

//predios
const predioMap1 = textureLoader.load('/works/assets/predio_05/tijolo.png')
const predioMap1 = textureLoader.load('/works/assets/predio_05/tijolo2.png')

//Geometrias
var colunaHorizontalGeometry = new THREE.BoxGeometry(60,15,60);
var colunaVerticalGeometry = new THREE.BoxGeometry(60,15,60);
var divisoriaGeometry = new THREE.BoxGeometry(15, 0.1, 0.5);
var divisoriaGeometry2 = new THREE.BoxGeometry(22.5, 0.1, 0.5);
var varandaGeometry = new THREE.PlaneGeometry(60,45);
var paredeVarandaGeometry = new THREE.PlaneGeometry(3, 15);
var paredeVarandaGeometry2 = new THREE.PlaneGeometry(22.5, 3);
var janelaGeometry = new THREE.PlaneGeometry(2, 3);
var portaVarandaGeometry = new THREE.PlaneGeometry(5,5);
var portaPredioGeometry = new THREE.PlaneGeometry(6,6);

//Materiais
var colunaHorizontalMaterial = new THREE.MeshBasicMaterial({color:'rgb(255,255,0)'});
var colunaVericalMaterial = new THREE.MeshBasicMaterial({color:'rgb(0,255,255)'});
var divisoriaMaterial = new THREE.MeshBasicMaterial();
var varandaMaterial = new THREE.MeshBasicMaterial({color: 'rgb(255,192,203)', side: THREE.DoubleSide});
var paredeVarandaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
var janelaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
var portaVarandaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
var portaPredioMaterial = new THREE.MeshBasicMaterial({side:THREE.DoubleSide});


var colunaHorizontal = new THREE.Mesh(colunaHorizontalGeometry, colunaHorizontalMaterial);
var colunaVertical = new THREE.Mesh(colunaVerticalGeometry, colunaVericalMaterial);
colunaVertical.rotateOnAxis(z, degreesToRadians(90));
scene.add(colunaHorizontal);
colunaHorizontal.add(colunaVertical);

for(var i = 0; i < 8; i++){
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.translateOnAxis(y, -30.05);
    divisoria.translateOnAxis(z, 29.7 - i*6);
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.translateOnAxis(y, 30.05);
    divisoria.translateOnAxis(z, 29.7 - i*6);
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.translateOnAxis(y, -7.50);
    divisoria.translateOnAxis(x, 18.5);
    divisoria.translateOnAxis(z, 29.7 - i*6);
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.translateOnAxis(y, -7.50);
    divisoria.translateOnAxis(x, -18.5);
    divisoria.translateOnAxis(z, 29.7 - i*6);
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.translateOnAxis(y, 7.50);
    divisoria.translateOnAxis(x, -18.5);
    divisoria.translateOnAxis(z, 29.7 - i*6);
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.translateOnAxis(y, 7.50);
    divisoria.translateOnAxis(x, 18.5);
    divisoria.translateOnAxis(z, 29.7 - i*6);
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.translateOnAxis(y, -18.5);
    divisoria.translateOnAxis(x, 7.50);
    divisoria.translateOnAxis(z, 29.7 - i*6);
    divisoria.rotateOnAxis(z, degreesToRadians(90));
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.translateOnAxis(y, 18.5);
    divisoria.translateOnAxis(x, 7.50);
    divisoria.translateOnAxis(z, 29.7 - i*6);
    divisoria.rotateOnAxis(z, degreesToRadians(90));
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.translateOnAxis(y, 18.5);
    divisoria.translateOnAxis(x, -7.50);
    divisoria.translateOnAxis(z, 29.7 - i*6);
    divisoria.rotateOnAxis(z, degreesToRadians(90));
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.translateOnAxis(y, -18.5);
    divisoria.translateOnAxis(x, -7.50);
    divisoria.translateOnAxis(z, 29.7 - i*6);
    divisoria.rotateOnAxis(z, degreesToRadians(90));
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.translateOnAxis(x, -30.05);
    divisoria.translateOnAxis(z, 29.7 - i*6);
    divisoria.rotateOnAxis(z, degreesToRadians(90));
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.translateOnAxis(x, +30.05);
    divisoria.translateOnAxis(z, 29.7 - i*6);
    divisoria.rotateOnAxis(z, degreesToRadians(90));
    colunaHorizontal.add(divisoria);
    var varanda = new THREE.Mesh(varandaGeometry, varandaMaterial);
    varanda.translateOnAxis(z, 23.7 - i*6);
    colunaHorizontal.add(varanda);
    var paredeVaranda = new THREE.Mesh(paredeVarandaGeometry, paredeVarandaMaterial);
    paredeVaranda.translateOnAxis(x, 30.02);
    paredeVaranda.translateOnAxis(y, -15);
    paredeVaranda.translateOnAxis(z, 25.2 - i*6);
    paredeVaranda.rotateOnAxis(y, degreesToRadians(90));
    colunaHorizontal.add(paredeVaranda);
    var paredeVaranda = new THREE.Mesh(paredeVarandaGeometry, paredeVarandaMaterial);
    paredeVaranda.translateOnAxis(x, 30.02);
    paredeVaranda.translateOnAxis(y, 15);
    paredeVaranda.translateOnAxis(z, 25.2 - i*6);
    paredeVaranda.rotateOnAxis(y, degreesToRadians(90));
    colunaHorizontal.add(paredeVaranda);
    var paredeVaranda = new THREE.Mesh(paredeVarandaGeometry, paredeVarandaMaterial);
    paredeVaranda.translateOnAxis(x, -30.02);
    paredeVaranda.translateOnAxis(y, 15);
    paredeVaranda.translateOnAxis(z, 25.2 - i*6);
    paredeVaranda.rotateOnAxis(y, degreesToRadians(90));
    colunaHorizontal.add(paredeVaranda);
    var paredeVaranda = new THREE.Mesh(paredeVarandaGeometry, paredeVarandaMaterial);
    paredeVaranda.translateOnAxis(x, -30.02);
    paredeVaranda.translateOnAxis(y, -15);
    paredeVaranda.translateOnAxis(z, 25.2 - i*6);
    paredeVaranda.rotateOnAxis(y, degreesToRadians(90));
    colunaHorizontal.add(paredeVaranda);
    var paredeVaranda2 = new THREE.Mesh(paredeVarandaGeometry2, paredeVarandaMaterial);
    paredeVaranda2.translateOnAxis(y, -22.55);
    paredeVaranda2.translateOnAxis(z, 25.2 - i*6);
    paredeVaranda2.translateOnAxis(x, 18.5);
    paredeVaranda2.rotateOnAxis(x, degreesToRadians(90));
    colunaHorizontal.add(paredeVaranda2);
    var paredeVaranda2 = new THREE.Mesh(paredeVarandaGeometry2, paredeVarandaMaterial);
    paredeVaranda2.translateOnAxis(y, 22.55);
    paredeVaranda2.translateOnAxis(z, 25.2 - i*6);
    paredeVaranda2.translateOnAxis(x, 18.5);
    paredeVaranda2.rotateOnAxis(x, degreesToRadians(90));
    colunaHorizontal.add(paredeVaranda2);
    var paredeVaranda2 = new THREE.Mesh(paredeVarandaGeometry2, paredeVarandaMaterial);
    paredeVaranda2.translateOnAxis(y, 22.55);
    paredeVaranda2.translateOnAxis(z, 25.2 - i*6);
    paredeVaranda2.translateOnAxis(x, -18.5);
    paredeVaranda2.rotateOnAxis(x, degreesToRadians(90));
    colunaHorizontal.add(paredeVaranda2);
    var paredeVaranda2 = new THREE.Mesh(paredeVarandaGeometry2, paredeVarandaMaterial);
    paredeVaranda2.translateOnAxis(y, -22.55);
    paredeVaranda2.translateOnAxis(z, 25.2 - i*6);
    paredeVaranda2.translateOnAxis(x, -18.5);
    paredeVaranda2.rotateOnAxis(x, degreesToRadians(90));
    colunaHorizontal.add(paredeVaranda2);
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(y, -30.05);
    janela.translateOnAxis(z, 26.5 - i*6);
    janela.rotateOnAxis(x, degreesToRadians(90));
    colunaHorizontal.add(janela);
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(y, +30.05);
    janela.translateOnAxis(z, 26.5 - i*6);
    janela.rotateOnAxis(x, degreesToRadians(90));
    colunaHorizontal.add(janela);
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(x, 30.05);
    janela.translateOnAxis(z, 26.5 - i*6);
    janela.rotateOnAxis(y, degreesToRadians(90));
    colunaHorizontal.add(janela);
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(x, -30.05);
    janela.translateOnAxis(z, 26.5 - i*6);
    janela.rotateOnAxis(y, degreesToRadians(90));
    colunaHorizontal.add(janela);
    var portaVaranda = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
    portaVaranda.translateOnAxis(x, 7.6);
    portaVaranda.translateOnAxis(y, -15);
    portaVaranda.translateOnAxis(z, 26.5 - i*6);
    portaVaranda.rotateOnAxis(y, degreesToRadians(90));
    colunaHorizontal.add(portaVaranda);
    var portaVaranda = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
    portaVaranda.translateOnAxis(x, 7.6);
    portaVaranda.translateOnAxis(y, 15);
    portaVaranda.translateOnAxis(z, 26.5 - i*6);
    portaVaranda.rotateOnAxis(y, degreesToRadians(90));
    colunaHorizontal.add(portaVaranda);
    var portaVaranda = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
    portaVaranda.translateOnAxis(x, -7.6);
    portaVaranda.translateOnAxis(y, 15);
    portaVaranda.translateOnAxis(z, 26.5 - i*6);
    portaVaranda.rotateOnAxis(y, degreesToRadians(90));
    colunaHorizontal.add(portaVaranda);
    var portaVaranda = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
    portaVaranda.translateOnAxis(x, -7.6);
    portaVaranda.translateOnAxis(y, -15);
    portaVaranda.translateOnAxis(z, 26.5 - i*6);
    portaVaranda.rotateOnAxis(y, degreesToRadians(90));
    colunaHorizontal.add(portaVaranda);
    var portaVaranda = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
    portaVaranda.translateOnAxis(x, 18.6);
    portaVaranda.translateOnAxis(y, -7.6);
    portaVaranda.translateOnAxis(z, 26.5 - i*6);
    portaVaranda.rotateOnAxis(x, degreesToRadians(90));
    colunaHorizontal.add(portaVaranda);
    var portaVaranda = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
    portaVaranda.translateOnAxis(x, 18.6);
    portaVaranda.translateOnAxis(y, 7.6);
    portaVaranda.translateOnAxis(z, 26.5 - i*6);
    portaVaranda.rotateOnAxis(x, degreesToRadians(90));
    colunaHorizontal.add(portaVaranda);
    var portaVaranda = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
    portaVaranda.translateOnAxis(x, -18.6);
    portaVaranda.translateOnAxis(y, 7.6);
    portaVaranda.translateOnAxis(z, 26.5 - i*6);
    portaVaranda.rotateOnAxis(x, degreesToRadians(90));
    colunaHorizontal.add(portaVaranda);
    var portaVaranda = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
    portaVaranda.translateOnAxis(x, -18.6);
    portaVaranda.translateOnAxis(y, -7.6);
    portaVaranda.translateOnAxis(z, 26.5 - i*6);
    portaVaranda.rotateOnAxis(x, degreesToRadians(90));
    colunaHorizontal.add(portaVaranda);
}

var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
divisoria.translateOnAxis(x, +7.5);
divisoria.translateOnAxis(y, -18.5);
divisoria.translateOnAxis(z, -18.1);
divisoria.rotateOnAxis(z, degreesToRadians(90));
colunaHorizontal.add(divisoria);
var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
divisoria.translateOnAxis(x, +7.5);
divisoria.translateOnAxis(y, +18.5);
divisoria.translateOnAxis(z, -18.1);
divisoria.rotateOnAxis(z, degreesToRadians(90));
colunaHorizontal.add(divisoria);
var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
divisoria.translateOnAxis(x, -7.5);
divisoria.translateOnAxis(y, +18.5);
divisoria.translateOnAxis(z, -18.1);
divisoria.rotateOnAxis(z, degreesToRadians(90));
colunaHorizontal.add(divisoria);
var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
divisoria.translateOnAxis(x, -7.5);
divisoria.translateOnAxis(y, -18.5);
divisoria.translateOnAxis(z, -18.1);
divisoria.rotateOnAxis(z, degreesToRadians(90));
colunaHorizontal.add(divisoria);
var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
divisoria.translateOnAxis(x, 18.5);
divisoria.translateOnAxis(y, -7.5);
divisoria.translateOnAxis(z, -18.1);
colunaHorizontal.add(divisoria);
var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
divisoria.translateOnAxis(x, -18.5);
divisoria.translateOnAxis(y, -7.5);
divisoria.translateOnAxis(z, -18.1);
colunaHorizontal.add(divisoria);
var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
divisoria.translateOnAxis(x, 18.5);
divisoria.translateOnAxis(y, 7.5);
divisoria.translateOnAxis(z, -18.1);
colunaHorizontal.add(divisoria);
var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
divisoria.translateOnAxis(x, -18.5);
divisoria.translateOnAxis(y, 7.5);
divisoria.translateOnAxis(z, -18.1);
colunaHorizontal.add(divisoria);
var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
divisoria.translateOnAxis(y, -30.05);
divisoria.translateOnAxis(z, -18.1);
colunaHorizontal.add(divisoria);
var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
divisoria.translateOnAxis(y, 30.05);
divisoria.translateOnAxis(z, -18.1);
colunaHorizontal.add(divisoria);
var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
divisoria.translateOnAxis(x, -30.05);
divisoria.translateOnAxis(z, -18.1);
divisoria.rotateOnAxis(z, degreesToRadians(90));
colunaHorizontal.add(divisoria);
var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
divisoria.translateOnAxis(x, 30.05);
divisoria.translateOnAxis(z, -18.1);
divisoria.rotateOnAxis(z, degreesToRadians(90));
colunaHorizontal.add(divisoria);
var portaPredio = new THREE.Mesh(portaPredioGeometry, portaPredioMaterial);
portaPredio.translateOnAxis(y, -30.05);
portaPredio.translateOnAxis(z, -27);
portaPredio.rotateOnAxis(x, degreesToRadians(90));
colunaHorizontal.add(portaPredio);


render();

function render() {
    stats.update(); // Update FPS
    trackballControls.update(); // Enable mouse movements
    requestAnimationFrame(render);
    renderer.render(scene, camera) // Render scene
}