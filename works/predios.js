import * as THREE from '../build/three.module.js';
import Stats from '../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import {
    initRenderer,
    degreesToRadians,
    initDefaultBasicLight
} from "../libs/util/util.js";
 
var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.copy(new THREE.Vector3(0, -50, 25));

var sunLight = initDefaultBasicLight(scene, new THREE.Vector3(-200,5000,1900));  

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12)
scene.add(axesHelper);

//geometry
var gradeFrenteGeometry = new THREE.BoxGeometry(9,0.1,0.1);
var gradeLateralGeometry = new THREE.BoxGeometry(0.1,3,0.1);
var pisoGeometry = new THREE.PlaneGeometry(9, 3);
var portaVarandaGeometry = new THREE.PlaneGeometry(1,2.5);
var predioGeometry = new THREE.BoxGeometry(20, 8, 20);
var pilarGeometry = new THREE.BoxGeometry(2,3,16);
var janelaGeometry = new THREE.PlaneGeometry(1,1);

//material
var pisoMaterial = new THREE.MeshBasicMaterial({
    color: "rgba(150, 150, 150)",
    side: THREE.DoubleSide,
});
var portaVarandaMaterial = new THREE.MeshBasicMaterial();
var gradeMaterial = new THREE.MeshBasicMaterial();
var cubeMaterial = new THREE.MeshNormalMaterial();
var janelaMaterial = new THREE.MeshBasicMaterial();

var predio = new THREE.Mesh(predioGeometry, cubeMaterial);
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

render();

function render() {
    stats.update(); // Update FPS
    trackballControls.update(); // Enable mouse movements
    requestAnimationFrame(render);
    renderer.render(scene, camera) // Render scene
}