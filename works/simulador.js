import * as THREE from '../build/three.module.js';
import Stats from '../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../libs/util/KeyboardState.js';
import {
    initRenderer,
    initCamera,
    InfoBox,
    onWindowResize,
    createGroundPlaneWired,
    degreesToRadians
} from "../libs/util/util.js";

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, -30, 15)); // Init camera in this position
//var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
/*camera.position.set(0, 0, 1);
camera.lookAt(0, 0, 0);
camera.up.set(0, 0, 1);*/

var keyboard = new KeyboardState();
var angle = degreesToRadians(5);
var angle2 = degreesToRadians(5) / 2;
var posicao = [0, 0]; //posição original dos avião em relação aos seus eixos de rotação(x,y/z)
var speed = 1;

// Enable mouse rotation, pan, zoom etc.
//var trackballControls = new TrackballControls(camera, renderer.domElement);

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12)
scene.add(axesHelper);

// create the ground plane
var planeGeometry = new THREE.PlaneGeometry(20, 20);
planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
var planeMaterial = new THREE.MeshBasicMaterial({
    color: "rgba(150, 150, 150)",
    side: THREE.DoubleSide,
});
var plane = createGroundPlaneWired(100, 100);
//var plane = new THREE.Mesh(planeGeometry, planeMaterial);
// add the plane to the scene
plane.rotateOnAxis(new THREE.Vector3(1, 0, 0), degreesToRadians(90));
scene.add(plane);

// create a cube
var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
var cubeMaterial = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0.0, 0.0, 2.0);

var virtualParent = new THREE.Object3D();
virtualParent.add(cube);
virtualParent.add(camera);
scene.add(virtualParent);

// Use this to show information onscreen
var controls = new InfoBox();
controls.add("Basic Scene");
controls.addParagraph();
controls.add("Use mouse to interact:");
controls.add("* Left button to rotate");
controls.add("* Right button to translate (pan)");
controls.add("* Scroll to zoom in/out.");
controls.show();

// Listen window size changes
window.addEventListener('resize', function() { onWindowResize(camera, renderer) }, false);

function keyboardUpdate() {
    keyboard.update();

    var x = new THREE.Vector3(1, 0, 0); // Set Z axis
    var y = new THREE.Vector3(0, 1, 0); // Set Z axis
    var z = new THREE.Vector3(0, 0, 1); // Set Z axis

    if (keyboard.pressed("space")) virtualParent.translateY(speed);

    if (keyboard.pressed("up")) {
        cube.rotateOnAxis(x, -angle);
        posicao[0] -= 1;
    } else if (keyboard.pressed("down")) {
        cube.rotateOnAxis(x, angle);
        posicao[0] += 1;
    } else if (posicao[0] > 0) {
        cube.rotateOnAxis(x, -angle / 2);
        posicao[0] -= 0.5;
    } else if (posicao[0] < 0) {
        cube.rotateOnAxis(x, angle / 2);
        posicao[0] += 0.5;
    }




    if (keyboard.pressed("right")) {
        cube.rotateOnAxis(z, -angle);
        cube.rotateOnAxis(y, angle2);

    } else if (keyboard.pressed("left")) {
        cube.rotateOnAxis(z, angle);
        cube.rotateOnAxis(y, -angle2);

    }
    console.log(posicao);
}

render();

function render() {
    stats.update(); // Update FPS
    //trackballControls.update(); // Enable mouse movements
    keyboardUpdate();

    requestAnimationFrame(render);
    renderer.render(scene, camera) // Render scene
}