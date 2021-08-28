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
camera.position.copy(new THREE.Vector3(0, -102, 33));

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
var parteFrontalGeometry = new THREE.BoxGeometry(70, 10, 100);
var parteTraseiraGeometry = new THREE.BoxGeometry(80, 10, 100);
var divisoriaGeometry = new THREE.BoxGeometry(70, 0.1, 0.5);
var divisoriaGeometry2 = new THREE.BoxGeometry(10, 0.1, 0.5);
var janelaGeometry = new THREE.PlaneGeometry(3, 3);
var janelaGeometry2 = new THREE.PlaneGeometry(6, 3);
var janelaGeometry3 = new THREE.PlaneGeometry(2, 4);
var sacadaGeometry = new THREE.PlaneGeometry(5,10);
var sacadaLateralGeometry = new THREE.PlaneGeometry(5,3);
var sacadaFrontalGeometry = new THREE.PlaneGeometry(3,10);
var portaSacadaGeometry = new THREE.PlaneGeometry(4,3);
var portaPredioGeometry = new THREE.PlaneGeometry(8,8);

//Materiais
var parteFrontalMaterial = new THREE.MeshBasicMaterial({color: 'rgb(155, 0, 155)'});
var parteTraseiraMaterial = new THREE.MeshBasicMaterial({color: 'rgb(155, 0, 0)'});
var divisoriaMaterial = new THREE.MeshBasicMaterial();
var janelaMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
var sacadaMaterial = new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
var sacadaLateralMaterial = new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
var sacadaFrontalMaterial = new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
var portaSacadaMaterial = new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
var portaPredioMaterial = new THREE.MeshBasicMaterial({side:THREE.DoubleSide});

var parteFrontal = new THREE.Mesh(parteFrontalGeometry, parteFrontalMaterial);
scene.add(parteFrontal);
var parteTraseira = new THREE.Mesh(parteTraseiraGeometry, parteTraseiraMaterial);
parteTraseira.translateOnAxis(y, 10);
parteTraseira.translateOnAxis(x, -5);
parteFrontal.add(parteTraseira);


var divisoriaInicial = 50;
var janelaInicial = 47;
for(var i = 0; i < 14; i++){
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);    
    divisoria.translateOnAxis(y,-5.01);
    divisoria.translateOnAxis(z,divisoriaInicial - i*6);
    parteFrontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);  
    divisoria.translateOnAxis(x,-35);
    divisoria.rotateOnAxis(z,degreesToRadians(90));
    divisoria.translateOnAxis(z,divisoriaInicial - i*6);
    parteFrontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);  
    divisoria.translateOnAxis(x,-40);
    divisoria.translateOnAxis(y,4.95)
    divisoria.translateOnAxis(z,divisoriaInicial - i*6);
    parteFrontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);  
    divisoria.translateOnAxis(x,-45);
    divisoria.translateOnAxis(y,9.95)
    divisoria.rotateOnAxis(z,degreesToRadians(90));
    divisoria.translateOnAxis(z,divisoriaInicial - i*6);
    parteFrontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);  
    divisoria.translateOnAxis(x,35);
    divisoria.rotateOnAxis(z,degreesToRadians(90));
    divisoria.translateOnAxis(z,divisoriaInicial - i*6);
    parteFrontal.add(divisoria);
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(y,-5.05);
    janela.translateOnAxis(z, janelaInicial - i*6);
    janela.translateOnAxis(x, 30);
    janela.rotateOnAxis(x, degreesToRadians(90));
    parteFrontal.add(janela);
    var janela = new THREE.Mesh(janelaGeometry2, janelaMaterial);
    janela.translateOnAxis(y,-5.05);
    janela.translateOnAxis(z, janelaInicial - i*6);
    janela.translateOnAxis(x, 23);
    janela.rotateOnAxis(x, degreesToRadians(90));
    parteFrontal.add(janela);
    var janela = new THREE.Mesh(janelaGeometry3, janelaMaterial);
    janela.translateOnAxis(y,-5.05);
    janela.translateOnAxis(z, janelaInicial - i*6);
    janela.translateOnAxis(x, 18);
    janela.rotateOnAxis(x, degreesToRadians(90));
    parteFrontal.add(janela);
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(y,-5.05);
    janela.translateOnAxis(z, janelaInicial - i*6);
    janela.translateOnAxis(x, 10);
    janela.rotateOnAxis(x, degreesToRadians(90));
    parteFrontal.add(janela);
    var janela = new THREE.Mesh(janelaGeometry2, janelaMaterial);
    janela.translateOnAxis(y,-5.05);
    janela.translateOnAxis(z, janelaInicial - i*6);
    janela.translateOnAxis(x, 0);
    janela.rotateOnAxis(x, degreesToRadians(90));
    parteFrontal.add(janela);
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(y,-5.05);
    janela.translateOnAxis(z, janelaInicial - i*6);
    janela.translateOnAxis(x, -7);
    janela.rotateOnAxis(x, degreesToRadians(90));
    parteFrontal.add(janela);
    var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
    janela.translateOnAxis(y,-5.05);
    janela.translateOnAxis(z, janelaInicial - i*6);
    janela.translateOnAxis(x, -12);
    janela.rotateOnAxis(x, degreesToRadians(90));
    parteFrontal.add(janela);
    var janela = new THREE.Mesh(janelaGeometry2, janelaMaterial);
    janela.translateOnAxis(y,-5.05);
    janela.translateOnAxis(z, janelaInicial - i*6);
    janela.translateOnAxis(x, -20);
    janela.rotateOnAxis(x, degreesToRadians(90));
    parteFrontal.add(janela);
    var janela = new THREE.Mesh(janelaGeometry3, janelaMaterial);
    janela.translateOnAxis(y,-5.05);
    janela.translateOnAxis(z, janelaInicial - i*6);
    janela.translateOnAxis(x, -27);
    janela.rotateOnAxis(x, degreesToRadians(90));
    parteFrontal.add(janela);
    var janela = new THREE.Mesh(janelaGeometry3, janelaMaterial);
    janela.translateOnAxis(y,+4.95);
    janela.translateOnAxis(z, janelaInicial - i*6);
    janela.translateOnAxis(x, -39);
    janela.rotateOnAxis(x, degreesToRadians(90));
    parteFrontal.add(janela);
    var janela = new THREE.Mesh(janelaGeometry3, janelaMaterial);
    janela.translateOnAxis(y,-2.05);
    janela.translateOnAxis(z, janelaInicial - i*6);
    janela.translateOnAxis(x, -35.05);
    janela.translateOnAxis(y, degreesToRadians(90));
    janela.rotateOnAxis(y, degreesToRadians(90));
    parteFrontal.add(janela);
    var sacada = new THREE.Mesh(sacadaGeometry, sacadaMaterial);
    sacada.translateOnAxis(y, 10);
    sacada.translateOnAxis(z, 44- i*6);
    sacada.translateOnAxis(x, -47.5);
    parteFrontal.add(sacada);
    var sacadaLateral = new THREE.Mesh(sacadaLateralGeometry, sacadaLateralMaterial);
    sacadaLateral.translateOnAxis(y, 5);
    sacadaLateral.translateOnAxis(z, 45.5- i*6);
    sacadaLateral.translateOnAxis(x, -47.5);
    sacadaLateral.rotateOnAxis(x,degreesToRadians(90));
    parteFrontal.add(sacadaLateral);
    var sacadaLateral = new THREE.Mesh(sacadaLateralGeometry, sacadaLateralMaterial);
    sacadaLateral.translateOnAxis(y, 15);
    sacadaLateral.translateOnAxis(z, 45.5- i*6);
    sacadaLateral.translateOnAxis(x, -47.5);
    sacadaLateral.rotateOnAxis(x,degreesToRadians(90));
    parteFrontal.add(sacadaLateral);
    var sacadaFrontal = new THREE.Mesh(sacadaFrontalGeometry, sacadaFrontalMaterial);
    sacadaFrontal.translateOnAxis(y, 10);
    sacadaFrontal.translateOnAxis(z, 45.5 - i*6);
    sacadaFrontal.translateOnAxis(x, -50);
    sacadaFrontal.rotateOnAxis(y,degreesToRadians(90));
    parteFrontal.add(sacadaFrontal);
    var portaSacada = new THREE.Mesh(portaSacadaGeometry, portaSacadaMaterial);
    portaSacada.translateOnAxis(y, 10);
    portaSacada.translateOnAxis(x, -45.05);
    portaSacada.translateOnAxis(z, 46 - i*6);
    portaSacada.rotateOnAxis(y,degreesToRadians(90));
    parteFrontal.add(portaSacada);
}
var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
divisoria.translateOnAxis(y, -5.05);
divisoria.translateOnAxis(z, -35);
parteFrontal.add(divisoria);
var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);  
divisoria.translateOnAxis(x,35);
divisoria.rotateOnAxis(z,degreesToRadians(90));
divisoria.translateOnAxis(z,-35);
parteFrontal.add(divisoria);
var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);  
divisoria.translateOnAxis(x,-35);
divisoria.rotateOnAxis(z,degreesToRadians(90));
divisoria.translateOnAxis(z,-35);
parteFrontal.add(divisoria);
var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);  
divisoria.translateOnAxis(x,-45);
divisoria.translateOnAxis(y,10);
divisoria.rotateOnAxis(z,degreesToRadians(90));
divisoria.translateOnAxis(z,-35);
parteFrontal.add(divisoria);
var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
divisoria.translateOnAxis(x, -40);
divisoria.translateOnAxis(y, 4.95);
divisoria.translateOnAxis(z, -35);
parteFrontal.add(divisoria);
var portaPredio = new THREE.Mesh(portaPredioGeometry, portaPredioMaterial);
portaPredio.translateOnAxis(y, -5.05);
portaPredio.translateOnAxis(z, -46);
portaPredio.rotateOnAxis(x,degreesToRadians(90));
parteFrontal.add(portaPredio);
render();
function render() {
    stats.update(); // Update FPS
    trackballControls.update(); // Enable mouse movements
    requestAnimationFrame(render);
    renderer.render(scene, camera) // Render scene
}