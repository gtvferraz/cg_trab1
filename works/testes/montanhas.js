import * as THREE from  '../../../build/three.module.js';
import Stats from       '../../../build/jsm/libs/stats.module.js';
import KeyboardState from '../../../libs/util/KeyboardState.js';
import {initRenderer, 
        initCamera, 
        onWindowResize, 
        degreesToRadians, 
        createGroundPlaneWired,
        InfoBox} from "../../../libs/util/util.js";
import { Vector3 } from '../../../build/three.module.js';
import {TrackballControls} from '../../build/jsm/controls/TrackballControls.js';
import { ConvexGeometry } from '../../../build/jsm/geometries/ConvexGeometry.js';
        
var scene = new THREE.Scene();    // Create main scene
var stats = new Stats();          // To show FPS information
var renderer = initRenderer();    // View function in util/utils

const blackMaterial = new THREE.MeshPhongMaterial({color: 'rgb(0,0,0)'});
const redMaterial = new THREE.MeshPhongMaterial({color: 'rgb(110,0,0)'});
const grayMaterial = new THREE.MeshPhongMaterial({color: 'rgb(40,40,50)'});
var x = new THREE.Vector3(1, 0, 0); // Set x axis
var y = new THREE.Vector3(0, 1, 0); // Set y axis
var z = new THREE.Vector3(0, 0, 1); // Set Z axis

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.copy(new THREE.Vector3(0, -50, 15));
camera.lookAt(0, 0, 0);
camera.up.set(0, 1.1, 0);
scene.background = new THREE.Color('rgb(150,150,200)');

var trackballControls = new TrackballControls( camera, renderer.domElement );

// Show world axes
var axesHelper = new THREE.AxesHelper(10000);
scene.add(axesHelper);

// To use the keyboard
var keyboard = new KeyboardState();

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

var plane = createGroundPlaneWired(10500, 10500);
plane.rotateOnAxis(new THREE.Vector3(1, 0, 0), degreesToRadians(90));
scene.add(plane);

var {airplane, turbine} = createAirplane();
scene.add(airplane);

const mountain = createMountain();
mountain.castShadow = true;
scene.add(mountain);

//scene.add(new THREE.HemisphereLight());
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set(-1000,-1000,2000)
directionalLight.target = airplane;
directionalLight.castShadow = true;
scene.add(directionalLight);

render();

function createMountain() {
  //vermelho,verde,azul
  //direita,frente,cima
  var vertBase1 = [];
  const vertBase2 = [];
  const vertBase3 = [];

  const h1 = 0;
  const h2 = 150;
  const h3 = 270;
  const h4 = 320;
  const h5 = 340;

  var convexGeometry;
  const mountBaseMat1 = new THREE.MeshPhongMaterial({color: 'rgb(60,163,60)'});
  const mountMiddleMat = new THREE.MeshPhongMaterial({color: 'rgb(140,118,86)'});
  const mountTopMat = new THREE.MeshPhongMaterial({color: 'rgb(214,197,171)'});
  const mountEdgeMat = new THREE.MeshPhongMaterial({color: 'rgb(237,231,223)'});

  //INÍCIO DA MONTANHA PRINCIPAL
  //INÍCIO DA BASE
  vertBase1.push(new THREE.Vector3(0,0,h1));
  vertBase1.push(new THREE.Vector3(10,15,h1));
  vertBase1.push(new THREE.Vector3(30,50,h1));
  vertBase1.push(new THREE.Vector3(40,80,h1));
  vertBase1.push(new THREE.Vector3(70,100,h1));
  vertBase1.push(new THREE.Vector3(100,150,h1));
  vertBase1.push(new THREE.Vector3(170,170,h1));
  vertBase1.push(new THREE.Vector3(220,210,h1));
  vertBase1.push(new THREE.Vector3(250,240,h1));
  vertBase1.push(new THREE.Vector3(280,270,h1));
  vertBase1.push(new THREE.Vector3(300,280,h1));
  vertBase1.push(new THREE.Vector3(320,280,h1));
  vertBase1.push(new THREE.Vector3(350,270,h1));
  vertBase1.push(new THREE.Vector3(360,250,h1));
  vertBase1.push(new THREE.Vector3(380,210,h1));
  vertBase1.push(new THREE.Vector3(400,150,h1));
  vertBase1.push(new THREE.Vector3(440,110,h1));
  vertBase1.push(new THREE.Vector3(480,90,h1));
  vertBase1.push(new THREE.Vector3(520,50,h1));
  vertBase1.push(new THREE.Vector3(580,0,h1));
  vertBase1.push(new THREE.Vector3(590,-30,h1));
  vertBase1.push(new THREE.Vector3(595,-50,h1));
  vertBase1.push(new THREE.Vector3(580,-70,h1));
  vertBase1.push(new THREE.Vector3(550,-80,h1));
  vertBase1.push(new THREE.Vector3(500,-100,h1));
  vertBase1.push(new THREE.Vector3(430,-160,h1));
  vertBase1.push(new THREE.Vector3(390,-200,h1));
  vertBase1.push(new THREE.Vector3(370,-230,h1));
  vertBase1.push(new THREE.Vector3(350,-250,h1));
  vertBase1.push(new THREE.Vector3(320,-260,h1));
  vertBase1.push(new THREE.Vector3(300,-250,h1));
  vertBase1.push(new THREE.Vector3(250,-240,h1));
  vertBase1.push(new THREE.Vector3(210,-230,h1));
  vertBase1.push(new THREE.Vector3(170,-220,h1));
  vertBase1.push(new THREE.Vector3(130,-210,h1));
  vertBase1.push(new THREE.Vector3(100,-190,h1));
  vertBase1.push(new THREE.Vector3(90,-160,h1));
  vertBase1.push(new THREE.Vector3(70,-100,h1));
  vertBase1.push(new THREE.Vector3(40,-60,h1));
  vertBase1.push(new THREE.Vector3(20,-40,h1));
  vertBase1.push(new THREE.Vector3(10,-20,h1));
  //FIM DA BASE

  //INÍCIO DO MEIO
  vertBase1.push(new THREE.Vector3(100,0,h2));
  vertBase1.push(new THREE.Vector3(150,50,h2));
  vertBase1.push(new THREE.Vector3(220,70,h2));
  vertBase1.push(new THREE.Vector3(240,110,h2));
  vertBase1.push(new THREE.Vector3(300,140,h2));
  vertBase1.push(new THREE.Vector3(330,110,h2));
  vertBase1.push(new THREE.Vector3(390,50,h2));
  vertBase1.push(new THREE.Vector3(400,0,h2));
  vertBase1.push(new THREE.Vector3(380,-50,h2));
  vertBase1.push(new THREE.Vector3(320,-100,h2));
  vertBase1.push(new THREE.Vector3(270,-150,h2));
  vertBase1.push(new THREE.Vector3(210,-140,h2));
  vertBase1.push(new THREE.Vector3(170,-100,h2));
  vertBase1.push(new THREE.Vector3(100,-50,h2));
  //FIM DO MEIO

  convexGeometry = new ConvexGeometry(vertBase1);
  const mountBase1 = new THREE.Mesh(convexGeometry, mountBaseMat1);
  vertBase1 = []

  //INÍCIO DO MEIO
  vertBase1.push(new THREE.Vector3(100,0,h2));
  vertBase1.push(new THREE.Vector3(150,50,h2));
  vertBase1.push(new THREE.Vector3(220,70,h2));
  vertBase1.push(new THREE.Vector3(240,110,h2));
  vertBase1.push(new THREE.Vector3(300,140,h2));
  vertBase1.push(new THREE.Vector3(330,110,h2));
  vertBase1.push(new THREE.Vector3(390,50,h2));
  vertBase1.push(new THREE.Vector3(400,0,h2));
  vertBase1.push(new THREE.Vector3(380,-50,h2));
  vertBase1.push(new THREE.Vector3(320,-100,h2));
  vertBase1.push(new THREE.Vector3(270,-150,h2));
  vertBase1.push(new THREE.Vector3(210,-140,h2));
  vertBase1.push(new THREE.Vector3(170,-100,h2));
  vertBase1.push(new THREE.Vector3(100,-50,h2));
  //FIM DO MEIO

  //INÍCIO DO TOPO
  vertBase1.push(new THREE.Vector3(200,0,h3));
  vertBase1.push(new THREE.Vector3(230,20,h3));
  vertBase1.push(new THREE.Vector3(270,40,h3));
  vertBase1.push(new THREE.Vector3(320,20,h3));
  vertBase1.push(new THREE.Vector3(330,-20,h3));
  vertBase1.push(new THREE.Vector3(300,-50,h3));
  vertBase1.push(new THREE.Vector3(260,-70,h3));
  vertBase1.push(new THREE.Vector3(240,-30,h3));
  //FIM DO TOPO

  convexGeometry = new ConvexGeometry(vertBase1);
  const mountMiddle1 = new THREE.Mesh(convexGeometry, mountMiddleMat);
  mountBase1.add(mountMiddle1)
  vertBase1 = []

  //INÍCIO DO TOPO
  vertBase1.push(new THREE.Vector3(200,0,h3));
  vertBase1.push(new THREE.Vector3(230,20,h3));
  vertBase1.push(new THREE.Vector3(270,40,h3));
  vertBase1.push(new THREE.Vector3(320,20,h3));
  vertBase1.push(new THREE.Vector3(330,-20,h3));
  vertBase1.push(new THREE.Vector3(300,-50,h3));
  vertBase1.push(new THREE.Vector3(260,-70,h3));
  vertBase1.push(new THREE.Vector3(240,-30,h3));
  //FIM DO TOPO

  //INÍCIO DA PONTA
  vertBase1.push(new THREE.Vector3(260,0,h4));
  vertBase1.push(new THREE.Vector3(290,-10,h4));
  vertBase1.push(new THREE.Vector3(280,-30,h4));
  vertBase1.push(new THREE.Vector3(260,-20,h4));
  //FIM DA PONTA

  convexGeometry = new ConvexGeometry(vertBase1);
  const mountTop1 = new THREE.Mesh(convexGeometry, mountTopMat);
  mountMiddle1.add(mountTop1)
  vertBase1 = []

  //INÍCIO DA PONTA
  vertBase1.push(new THREE.Vector3(260,0,h4));
  vertBase1.push(new THREE.Vector3(290,-10,h4));
  vertBase1.push(new THREE.Vector3(280,-30,h4));
  vertBase1.push(new THREE.Vector3(260,-20,h4));
  //FIM DA PONTA

  //INÍCIO DO CUME
  vertBase1.push(new THREE.Vector3(270,-15,h5));
  //FIM DO CUME

  convexGeometry = new ConvexGeometry(vertBase1);
  const mountEdge1 = new THREE.Mesh(convexGeometry, mountEdgeMat);
  mountTop1.add(mountEdge1)
  //FIM DA MONTANHA PRINCIPAL

  //INÍCIO DA BASE DA SEGUNDA MONTANHA
  vertBase2.push(new THREE.Vector3(100,300,0));
  vertBase2.push(new THREE.Vector3(160,270,0));
  vertBase2.push(new THREE.Vector3(200,210,0));
  vertBase2.push(new THREE.Vector3(250,170,0));
  vertBase2.push(new THREE.Vector3(260,130,0));
  vertBase2.push(new THREE.Vector3(250,90,0));
  vertBase2.push(new THREE.Vector3(200,50,0));
  vertBase2.push(new THREE.Vector3(150,50,0));
  vertBase2.push(new THREE.Vector3(90,70,0));
  vertBase2.push(new THREE.Vector3(20,150,0));
  vertBase2.push(new THREE.Vector3(0,230,0));
  vertBase2.push(new THREE.Vector3(40,300,0));

  vertBase2.push(new THREE.Vector3(100,200,100));
  //FIM DA BASE DA SEGUNDA MONTANHA

  const mountainBaseMat2 = new THREE.MeshPhongMaterial({color: 'rgb(0,200,0)'});
  convexGeometry = new ConvexGeometry(vertBase2);
  const mountainBase2 = new THREE.Mesh(convexGeometry, mountainBaseMat2);

  return mountBase1;
}

function createAirplane() {
  var airplane = new THREE.Object3D();

  var geometry = new THREE.CylinderGeometry(1, 1, 9, 50);
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
  var geometry = new THREE.BoxGeometry(4, 2, 0.2);
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
  var geometry = new THREE.BoxGeometry(4, 2, 0.2);

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

function render()
{
  stats.update(); // Update FPS
  trackballControls.update();
  requestAnimationFrame(render); // Show events
  renderer.render(scene, camera) // Render scene
}
