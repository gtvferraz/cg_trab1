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
camera.position.copy(new THREE.Vector3(0, -142, 69));

var ambientLight = new THREE.AmbientLight("rgb(255, 255, 255)");
scene.add(ambientLight);
let sunLight = initLight(scene, new THREE.Vector3(-30,0,30)); 

const textureLoader = new THREE.TextureLoader();

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12)
scene.add(axesHelper);
// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

//Geometrias
var hospitalGeometry = new THREE.BoxGeometry(30, 10, 100);
var divisoriaGeometry = new THREE.BoxGeometry(30, 0.1, 0.5);
var divisoriaGeometry2 = new THREE.BoxGeometry(100, 0.1, 0.5);
var janelaGeometry1 = new THREE.PlaneGeometry(5,2);
var janelaGeometry2 = new THREE.PlaneGeometry(2,2);
var janelaGeometry3 = new THREE.PlaneGeometry(1,2);
var janelaGeometry4 = new THREE.PlaneGeometry(6,2);
var portaGeometry = new THREE.PlaneGeometry(15,9);
var tunelGeometry = new THREE.BoxGeometry(50, 5, 5);
var ladoEsquerdoGeometry = new THREE.BoxGeometry(30,10, 70);

//Materiais
var divisoriaMaterial = new THREE.MeshBasicMaterial();
var janelaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
var portaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
var tunelMaterial = new THREE.MeshBasicMaterial();
var ladoEsquerdoMaterial = new THREE.MeshBasicMaterial({color:'rgb(255,0,0)'});


var hospitalMaterial = new THREE.MeshBasicMaterial({color: 'rgb(0,255,0)'});
var hospital = new THREE.Mesh(hospitalGeometry, hospitalMaterial);
scene.add(hospital);

var janealInicial = 47;
var divisorioaInicial = 49.8; 
for(var i = 0; i < 18; i++){
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.translateOnAxis(y,-5.01);
    divisoria.translateOnAxis(z,divisorioaInicial - i*5);
    hospital.add(divisoria);
    var janela = new THREE.Mesh(janelaGeometry1, janelaMaterial);
    janela.translateOnAxis(y,-5.1);
    janela.translateOnAxis(x,12);
    janela.translateOnAxis(z,janealInicial - i*5);
    janela.rotateOnAxis(x, degreesToRadians(-90))
    hospital.add(janela);
    var janela = new THREE.Mesh(janelaGeometry2, janelaMaterial);
    janela.translateOnAxis(y,-5.1);
    janela.translateOnAxis(x,8);
    janela.translateOnAxis(z,janealInicial - i*5);
    janela.rotateOnAxis(x, degreesToRadians(-90))
    hospital.add(janela);
    var janela = new THREE.Mesh(janelaGeometry3, janelaMaterial);
    janela.translateOnAxis(y,-5.1);
    janela.translateOnAxis(x,6);
    janela.translateOnAxis(z,janealInicial - i*5);
    janela.rotateOnAxis(x, degreesToRadians(-90))
    hospital.add(janela);
    var janela = new THREE.Mesh(janelaGeometry4, janelaMaterial);
    janela.translateOnAxis(y,-5.1);
    janela.translateOnAxis(x,2);
    janela.translateOnAxis(z,janealInicial - i*5);
    janela.rotateOnAxis(x, degreesToRadians(-90))
    hospital.add(janela);
    var janela = new THREE.Mesh(janelaGeometry2, janelaMaterial);
    janela.translateOnAxis(y,-5.1);
    janela.translateOnAxis(x,-3);
    janela.translateOnAxis(z,janealInicial - i*5);
    janela.rotateOnAxis(x, degreesToRadians(-90))
    hospital.add(janela);
    var janela = new THREE.Mesh(janelaGeometry4, janelaMaterial);
    janela.translateOnAxis(y,-5.1);
    janela.translateOnAxis(x,-8);
    janela.translateOnAxis(z,janealInicial - i*5);
    janela.rotateOnAxis(x, degreesToRadians(-90))
    hospital.add(janela);
    var janela = new THREE.Mesh(janelaGeometry2, janelaMaterial);
    janela.translateOnAxis(y,-5.1);
    janela.translateOnAxis(x,-13);
    janela.translateOnAxis(z,janealInicial - i*5);
    janela.rotateOnAxis(x, degreesToRadians(-90))
    hospital.add(janela);
}

var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
divisoria.translateOnAxis(y,-5.01);
divisoria.translateOnAxis(z,-40);
hospital.add(divisoria);

var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
divisoria.translateOnAxis(y,-5.01);
divisoria.translateOnAxis(x,-15);
divisoria.rotateOnAxis(y,degreesToRadians(90));
hospital.add(divisoria);

var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
divisoria.translateOnAxis(y,-5.01);
divisoria.translateOnAxis(x,15);
divisoria.rotateOnAxis(y,degreesToRadians(90));
hospital.add(divisoria);

var porta = new THREE.Mesh(portaGeometry, portaMaterial);
porta.translateOnAxis(y, -5.05);
porta.translateOnAxis(z, -45.5);
porta.rotateOnAxis(x, degreesToRadians(90))
hospital.add(porta);

var tunel = new THREE.Mesh(tunelGeometry, tunelMaterial);
tunel.translateOnAxis(x, -40);
hospital.add(tunel);

//parte esquerda

var ladoEsquerdo = new THREE.Mesh(ladoEsquerdoGeometry, ladoEsquerdoMaterial);
ladoEsquerdo.translateOnAxis(x, -50)
hospital.add(ladoEsquerdo);


render();

function render() {
    stats.update(); // Update FPS
    trackballControls.update(); // Enable mouse movements
    requestAnimationFrame(render);
    renderer.render(scene, camera) // Render scene
}