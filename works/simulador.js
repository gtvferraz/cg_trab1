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
    degreesToRadians,
    initDefaultBasicLight
} from "../libs/util/util.js";

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, -30, 15)); // Init camera in this position
var trackballControls = new TrackballControls(camera, renderer.domElement);

initDefaultBasicLight(scene);

var keyboard = new KeyboardState();
var angle = degreesToRadians(2.5);
var posicao = [0, 0]; //posição de rotação do avião (x,y)
var posGlobal = [0, 0];
var speed = 5;
var max = degreesToRadians(45 / 2);
var maxVet = [max, max]; //inclinação máxima
var turbineSpeed = 1; //velocidade de rotação da turbina

var x = new THREE.Vector3(1, 0, 0); // Set Z axis
var y = new THREE.Vector3(0, 1, 0); // Set Z axis
var z = new THREE.Vector3(0, 0, 1); // Set Z axis

//Materiais
var geometry;
const blackMaterial = new THREE.MeshPhongMaterial({color: 'rgb(0,0,0)'});
const redMaterial = new THREE.MeshPhongMaterial({color: 'rgb(110,0,0)'});
const grayMaterial = new THREE.MeshPhongMaterial({color: 'rgb(40,40,50)'});

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12)
scene.add(axesHelper);

var plane = createGroundPlaneWired(500, 500);
plane.rotateOnAxis(new THREE.Vector3(1, 0, 0), degreesToRadians(90));
scene.add(plane);

var {airplane, turbine} = createAirplane();

var virtualParent = new THREE.Object3D();
virtualParent.add(airplane);
virtualParent.add(camera);
virtualParent.translateZ(50);
scene.add(virtualParent);
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

render();

function createAirplane() {
  var airplane = new THREE.Object3D();

  geometry = new THREE.CylinderGeometry(1, 1, 9, 50);
  var mainBody = new THREE.Mesh(geometry, blackMaterial);
  airplane.add(mainBody);

  geometry = new THREE.CylinderGeometry(0.5, 1, 3, 50);
  var backBody = new THREE.Mesh(geometry, blackMaterial);
  backBody.translateY(-6);
  backBody.rotateOnAxis(z, degreesToRadians(180));
  mainBody.add(backBody);

  geometry = new THREE.CylinderGeometry(0.5, 1, 2, 50);
  var frontBody = new THREE.Mesh(geometry, blackMaterial);
  frontBody.translateY(5.5);
  mainBody.add(frontBody);

  geometry = new THREE.CylinderGeometry(0.1, 0.5, 1, 50);
  var turbineBase = new THREE.Mesh(geometry, redMaterial);
  turbineBase.translateY(1.5);
  frontBody.add(turbineBase);

  var path = new THREE.Shape();
  path.absellipse(
    0,  0,            // ax, aY
    0.2, 3,           // xRadius, yRadius
    0,  2 * Math.PI,  // aStartAngle, aEndAngle
    false,            // aClockwise
    0                 // aRotation
  );
  geometry = new THREE.ShapeBufferGeometry( path );
  const ellipseMaterial = new THREE.MeshBasicMaterial({color:'rgb(56,56,56)'});
  const turbine = new THREE.Mesh( geometry, ellipseMaterial );
  turbine.rotateOnAxis(x, degreesToRadians(90));
  turbineBase.add(turbine);

  var leftBaseWing = createWing();
  leftBaseWing.translateX(-3);
  mainBody.add(leftBaseWing);

  var leftBaseWing = createWing();
  leftBaseWing.translateX(3);
  leftBaseWing.rotateOnAxis(y, degreesToRadians(180));
  mainBody.add(leftBaseWing);

  var topStabilizer = createStabilizer();
  topStabilizer.translateX(0.1);
  topStabilizer.translateY(1.4);
  topStabilizer.translateZ(4);
  topStabilizer.rotateOnAxis(z, degreesToRadians(180));
  topStabilizer.rotateOnAxis(y, degreesToRadians(90));
  backBody.add(topStabilizer);

  var leftStabilizer = createStabilizer();
  leftStabilizer.translateZ(-0.2);
  leftStabilizer.translateX(4);
  leftStabilizer.translateY(1.4);
  leftStabilizer.rotateOnAxis(y, degreesToRadians(180));
  leftStabilizer.rotateOnAxis(x, degreesToRadians(180));
  backBody.add(leftStabilizer);

  var rightStabilizer = createStabilizer();
  rightStabilizer.translateX(-4);
  rightStabilizer.translateY(1.4);
  rightStabilizer.rotateOnAxis(x, degreesToRadians(180));
  backBody.add(rightStabilizer);

  geometry = new THREE.SphereGeometry(2, 32, 32);
  var cabin = new THREE.Mesh(geometry, grayMaterial);
  cabin.translateZ(0.5);
  cabin.scale.set(0.5, 1, 0.5);
  mainBody.add(cabin);

  return {airplane, turbine};
}

function createWing() {
  geometry = new THREE.BoxGeometry(4, 2, 0.2);
  var baseWing = new THREE.Mesh(geometry, redMaterial);

  const edgeWing = createStabilizer();
  edgeWing.translateX(-6);
  edgeWing.translateY(1);
  edgeWing.translateZ(0.1);
  edgeWing.rotateOnAxis(x, degreesToRadians(180));
  baseWing.add(edgeWing);

  return baseWing;
}

function createStabilizer() {
  geometry = new THREE.BoxGeometry(4, 2, 0.2);

  const shape = new THREE.Shape();
  shape.moveTo( 0, 0 );
  shape.lineTo( 0, 1 );
  shape.lineTo( 4, 2 );
  shape.lineTo( 4, 0 );
  shape.lineTo( 0, 0 );

  const extrudeSettings = {
    steps: 2,
    depth: 0.2,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelOffset: 0,
    bevelSegments: 10
  };

  geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const stabilizer = new THREE.Mesh(geometry, redMaterial);

  return stabilizer;
}

function keyboardUpdate() {
    keyboard.update();

    var aux = [angle * posicao[0], angle * posicao[1]];

    if (keyboard.pressed("space")) virtualParent.translateY(speed);

    if (keyboard.pressed("up")) {
        virtualParent.rotateOnAxis(x, -angle);
        if (aux[0] > -maxVet[0]) {
          airplane.rotateOnAxis(x, -angle);
            posicao[0] -= 1;
        }
        posGlobal[0] -= 1;
    } else if (keyboard.pressed("down")) {
        virtualParent.rotateOnAxis(x, angle);
        if (aux[0] < maxVet[0]) {
            airplane.rotateOnAxis(x, angle);
            posicao[0] += 1;
        }
        posGlobal[0] += 1;
    } else if (posGlobal[0] > 0) {
        virtualParent.rotateOnAxis(x, -angle / 2);
        posGlobal[0] -= 0.5;
        if (posicao[0] > 0) {
            airplane.rotateOnAxis(x, -angle / 2);
            posicao[0] -= 0.5;
        }
    } else if (posGlobal[0] < 0) {
        virtualParent.rotateOnAxis(x, angle / 2);
        posGlobal[0] += 0.5;
        if (posicao[0] < 0) {
            airplane.rotateOnAxis(x, angle / 2);
            posicao[0] += 0.5;
        }
    }

    if (keyboard.pressed("right")) {
        virtualParent.rotateOnAxis(z, -angle);
        if (aux[1] > -maxVet[1]) {
            airplane.rotateOnAxis(y, angle);
            posicao[1] -= 1;
        }
    } else if (keyboard.pressed("left")) {
        virtualParent.rotateOnAxis(z, angle);
        if (aux[1] < maxVet[1]) {
            airplane.rotateOnAxis(y, -angle);
            posicao[1] += 1;
        }
    } else if (posicao[1] > 0) {
        virtualParent.rotateOnAxis(z, angle / 2);
        airplane.rotateOnAxis(y, angle / 2);
        posicao[1] -= 0.5;
    } else if (posicao[1] < 0) {
        virtualParent.rotateOnAxis(z, -angle / 2);
        airplane.rotateOnAxis(y, -angle / 2);
        posicao[1] += 0.5;
    }
}

function rotateTurbine() {
  turbine.rotateOnAxis(z, turbineSpeed);
}

function render() {
    stats.update(); // Update FPS
    //trackballControls.update(); // Enable mouse movements
    keyboardUpdate();
    rotateTurbine();
    requestAnimationFrame(render);
    renderer.render(scene, camera) // Render scene
}