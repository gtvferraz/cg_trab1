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
camera.position.copy(new THREE.Vector3(0, -90, 60));

var ambientLight = new THREE.AmbientLight("rgb(255, 255, 255)");
scene.add(ambientLight);
let sunLight = initLight(scene, new THREE.Vector3(-30,0,30)); 

var TamanhoPredio = 10;
var predioPrincipal = new THREE.BoxGeometry(TamanhoPredio+5, TamanhoPredio, TamanhoPredio+10);
var predioMaterial = new THREE.MeshBasicMaterial({color: 'rgb(110,0,0)'});
var predio = new THREE.Mesh(predioPrincipal, predioMaterial);
predio.translateOnAxis(z,10);
predio.translateOnAxis(x,2.5);
scene.add(predio);

//Predio parte de baixo
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
var janealInicial = 8;
var janelaInicial2 = 7.5;

var divisoriaGeometry = new THREE.BoxGeometry(0.5, 0.1, 16);
var divisoriaMaterial = new THREE.MeshBasicMaterial();
var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
divisoria.translateOnAxis(y,-5);
divisoria.translateOnAxis(x,0);
divisoria.translateOnAxis(z,2);
predio.add(divisoria);

var portaGeometry = new THREE.PlaneGeometry(3,4);
var portaMaterial = new THREE.MeshBasicMaterial();
var porta = new THREE.Mesh(portaGeometry, portaMaterial);
porta.translateOnAxis(y, -5.01);
porta.translateOnAxis(z,-8);
porta.rotateOnAxis(x,degreesToRadians(90));
predio.add(porta);

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
}
for(var i = 0; i < 4; i++){
    var janelaGeometry = new THREE.PlaneGeometry(2,2);
    var janelaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(y,-10.01);
    janela.translateOnAxis(x,10);
    janela.translateOnAxis(z,janealInicial - i*4);
    janela.rotateOnAxis(x, degreesToRadians(-90))
    predio.add(janela);
    var janelaGeometry = new THREE.PlaneGeometry(2,2);
    var janelaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(y,-10.01);
    janela.translateOnAxis(x,-10);
    janela.translateOnAxis(z,janealInicial - i*4);
    janela.rotateOnAxis(x, degreesToRadians(-90))
    predio.add(janela);
    var janelaGeometry = new THREE.PlaneGeometry(4,2);
    var janelaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(y,-5.01);
    janela.translateOnAxis(x,4);
    janela.translateOnAxis(z,janelaInicial2 - i*4);
    janela.rotateOnAxis(x, degreesToRadians(-90))
    predio.add(janela);
    var janelaGeometry = new THREE.PlaneGeometry(4,2);
    var janelaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(y,-5.01);
    janela.translateOnAxis(x,-4);
    janela.translateOnAxis(z,janelaInicial2 - i*4);
    janela.rotateOnAxis(x, degreesToRadians(-90))
    predio.add(janela);
}
var divisorioaInicial = 29.7;
var janealInicial = 27.5;
var janelaInicial2 = 28;
//Predio parte de cima
var parteCimaGeometry = new THREE.BoxGeometry(35, 10, 20);
var parteCimaMaterial = new THREE.MeshBasicMaterial({color :'rgb(0,0,255)'});
var parteCimaMaterial = new THREE.Mesh(parteCimaGeometry, parteCimaMaterial);
parteCimaMaterial.translateOnAxis(z, 20);
parteCimaMaterial.translateOnAxis(x, -5);
predio.add(parteCimaMaterial);

for(var i = 0; i < 5; i++){
    var divisoriaGeometry = new THREE.BoxGeometry(35, 0.1, 0.5);
    var divisoriaMaterial = new THREE.MeshBasicMaterial();
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.translateOnAxis(y,-5);
    divisoria.translateOnAxis(x,-5);
    divisoria.translateOnAxis(z,divisorioaInicial - i*4);
    predio.add(divisoria);
    var janelaGeometry = new THREE.PlaneGeometry(5,2);
    var janelaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(y,-5.01);
    janela.translateOnAxis(x,8);
    janela.translateOnAxis(z,janealInicial - i*4);
    janela.rotateOnAxis(x, degreesToRadians(-90))
    predio.add(janela);
    var janelaGeometry = new THREE.PlaneGeometry(2,2);
    var janelaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(y,-5.01);
    janela.translateOnAxis(x,3);
    janela.translateOnAxis(z,janealInicial - i*4);
    janela.rotateOnAxis(x, degreesToRadians(-90))
    predio.add(janela);
    var janelaGeometry = new THREE.PlaneGeometry(4,2);
    var janelaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(y,-5.01);
    janela.translateOnAxis(x,-4);
    janela.translateOnAxis(z,janealInicial - i*4);
    janela.rotateOnAxis(x, degreesToRadians(-90))
    predio.add(janela);
    var janelaGeometry = new THREE.PlaneGeometry(3,2);
    var janelaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(y,-5.01);
    janela.translateOnAxis(x,-9);
    janela.translateOnAxis(z,janealInicial - i*4);
    janela.rotateOnAxis(x, degreesToRadians(-90))
    predio.add(janela);
    var janelaGeometry = new THREE.PlaneGeometry(6,2);
    var janelaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(y,-5.01);
    janela.translateOnAxis(x,-18);
    janela.translateOnAxis(z,janealInicial - i*4);
    janela.rotateOnAxis(x, degreesToRadians(-90))
    predio.add(janela);
}

var divisoriaGeometry = new THREE.BoxGeometry(0.5, 0.1, 20);
var divisoriaMaterial = new THREE.MeshBasicMaterial();
var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
divisoria.translateOnAxis(y,-5);
divisoria.translateOnAxis(x,0);
divisoria.translateOnAxis(z,20);
predio.add(divisoria);

var divisoriaGeometry = new THREE.BoxGeometry(0.5, 0.1, 20);
var divisoriaMaterial = new THREE.MeshBasicMaterial();
var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
divisoria.translateOnAxis(y,-5);
divisoria.translateOnAxis(x,-12.5);
divisoria.translateOnAxis(z,20);
predio.add(divisoria);

var divisoriaGeometry = new THREE.BoxGeometry(0.5, 0.1, 20);
var divisoriaMaterial = new THREE.MeshBasicMaterial();
var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
divisoria.translateOnAxis(y,-5);
divisoria.translateOnAxis(x,-22.5);
divisoria.translateOnAxis(z,20);
predio.add(divisoria);

var divisoriaGeometry = new THREE.BoxGeometry(0.5, 0.1, 20);
var divisoriaMaterial = new THREE.MeshBasicMaterial();
var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
divisoria.translateOnAxis(y,-5);
divisoria.translateOnAxis(x,12.5);
divisoria.translateOnAxis(z,20);
predio.add(divisoria);

var divisoriaGeometry = new THREE.BoxGeometry(0.5, 0.1, 10);
var divisoriaMaterial = new THREE.MeshBasicMaterial();
var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
divisoria.translateOnAxis(y,-5);
divisoria.translateOnAxis(x,-17.5);
divisoria.translateOnAxis(z,10);
divisoria.rotateOnAxis(y,degreesToRadians(90));
predio.add(divisoria);

var pilarGeometry = new THREE.CylinderGeometry(1, 1, 20, 32);
var pilarMaterial = new THREE.MeshBasicMaterial();
var cylinder = new THREE.Mesh(pilarGeometry, pilarMaterial);
cylinder.translateOnAxis(x,-18.5);
cylinder.rotateOnAxis(x, degreesToRadians(90));
predio.add(cylinder);

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