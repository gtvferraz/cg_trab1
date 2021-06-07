import * as THREE from '../build/three.module.js';
import Stats from '../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../libs/util/KeyboardState.js';
import {
    initRenderer,
    InfoBox,
    onWindowResize,
    createGroundPlaneWired,
    degreesToRadians,
} from "../libs/util/util.js";

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
scene.background = new THREE.Color('rgb(150,150,200)');
var renderer = initRenderer(); // View function in util/utils

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.copy(new THREE.Vector3(0, -50, 15));
camera.lookAt(0, 0, 0);
camera.up.set(0, 1, 0);

var trackballControls = new TrackballControls(camera, renderer.domElement);

scene.add(new THREE.HemisphereLight());

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'turbine_sound.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.3 );
});

var keyboard = new KeyboardState();

var max = degreesToRadians(45);
var maxAngle = [max, max, max/2]; //inclinação máxima do avião
var maxSpeed = 10; //velocidade máxima de translação
var minSpeed = 3; //velocidade mínima de translação

var speed = 0; //velocidade de translação
var turbineSpeed = 1; //velocidade de rotação da turbina
var aceleracao = 0.05; //aceleração de translação em z
var speedAngle = degreesToRadians(1);

var speedRetX = 0; //velocidade de translação
var acelRetX = 0.0001; //aceleração de rotação em x
var numTrocasDir = 1; //número de trocas de direção em x realizadas no retorno ao equilíbrio

var x = new THREE.Vector3(1, 0, 0); // Set Z axis
var y = new THREE.Vector3(0, 1, 0); // Set Z axis
var z = new THREE.Vector3(0, 0, 1); // Set Z axis

//Materiais
var geometry;
const blackMaterial = new THREE.MeshPhongMaterial({color: 'rgb(0,0,0)'});
const redMaterial = new THREE.MeshPhongMaterial({color: 'rgb(110,0,0)'});
const grayMaterial = new THREE.MeshPhongMaterial({color: 'rgb(40,40,50)'});

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper);

var plane = createGroundPlaneWired(10500, 10500);
plane.rotateOnAxis(new THREE.Vector3(1, 0, 0), degreesToRadians(90));
scene.add(plane);

var {airplane, turbine} = createAirplane();
let clouds = createClouds();

axesHelper = new THREE.AxesHelper(10)
//airplane.add(axesHelper);

var virtualParent = new THREE.Object3D();
virtualParent.add(airplane);
virtualParent.add(camera);
virtualParent.translateZ(50);
scene.add(virtualParent);

axesHelper = new THREE.AxesHelper(20)
virtualParent.add(axesHelper);

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

function equilibraAviao() {
    const eixos = ['x', 'y', 'z'];
    eixos.forEach(eixo => {
        if(airplane.rotation[eixo] !== 0) {
            let positivo = airplane.rotation[eixo] > 0 ? true : false; 
            airplane.rotation[eixo] += speedAngle*(-airplane.rotation[eixo]/Math.abs(airplane.rotation[eixo]));

            if(positivo && airplane.rotation[eixo] < 0)
                airplane.rotation[eixo] = 0;
            else if(!positivo && airplane.rotation[eixo] > 0)
                airplane.rotation[eixo] = 0;
        }
    })
}

function equilibraCamera(eixos) {
    eixos.forEach(eixo => {
        if(virtualParent.rotation[eixo] !== 0) {
            let positivo = virtualParent.rotation[eixo] > 0 ? true : false; 
            virtualParent.rotation[eixo] += (speedAngle/4)*(-virtualParent.rotation[eixo]/Math.abs(virtualParent.rotation[eixo]));

            if(positivo && virtualParent.rotation[eixo] < 0)
                virtualParent.rotation[eixo] = 0;
            else if(!positivo && virtualParent.rotation[eixo] > 0)
                virtualParent.rotation[eixo] = 0;
        }
    })
}

function keyboardUpdate() {
    keyboard.update();

    const airpAngleX = airplane.rotation.x;
    const airpAngleY = airplane.rotation.y;
    const airpAngleZ = airplane.rotation.z

    //console.log("Virtual: ", virtualParent.rotation.x,virtualParent.rotation.y,virtualParent.rotation.z);
    //console.log("Avião: ", virtualParent.rotation.x,virtualParent.rotation.y,virtualParent.rotation.z);

    controls.infoBox.innerHTML = `Rotação  x ---- y ---- z
    <br/>
    Avião: ${airplane.rotation.x.toFixed(2)}, 
    ${airplane.rotation.y.toFixed(2)}, 
    ${airplane.rotation.z.toFixed(2)}
    <br/>
    Virtual: ${virtualParent.rotation.x.toFixed(2)}, 
    ${virtualParent.rotation.y.toFixed(2)}, 
    ${virtualParent.rotation.z.toFixed(2)}
    <br/>
    Velocidade: ${speed.toFixed(2)}
    <br/>
    Altitude: ${airplane.position.z.toFixed(2)}`;

    //INÍCIO DA ACELERAÇÃO
    if(keyboard.pressed("Q")) {
        //if(!sound.isPlaying)
        //    sound.play();
        
        if(speed + aceleracao <= maxSpeed)
            speed += aceleracao;
    } else if(keyboard.pressed("E")) {
        if(speed - aceleracao >= minSpeed)
            speed -= aceleracao;
    }
    //FIM DA ACELERAÇÃO
    
    //INÍCIO MOVIMENTO PRA FRENTE
    airplane.translateY(speed);
    camera.position.setX(airplane.position.x);
    camera.position.setY(airplane.position.y-50);
    camera.position.setZ(airplane.position.z+10);
    //FIM MOVIMENTO PRA FRENTE

    //INÍCIO DA ROTAÇÃO VERTICAL
    if(keyboard.pressed("S")) {
        if(airpAngleX < 0) {
            equilibraAviao();
            return;
        } else if(airpAngleX < maxAngle[0]) {
            if(keyboard.pressed("D") && airpAngleY < 0) {
                equilibraAviao();
                return;
            } else if(keyboard.pressed("A") && airpAngleY > 0) {
                equilibraAviao();
                return;
            }
            airplane.rotateOnAxis(x, speedAngle);
        }
        if(!keyboard.pressed("D") && !keyboard.pressed("A"))
            virtualParent.rotateOnAxis(x, speedAngle/4);
    } else if(keyboard.pressed("W")) {
        if(airpAngleX > 0) {
            equilibraAviao();
            return;
        } else if(airpAngleX > -maxAngle[0]) {
            if(keyboard.pressed("D") && airpAngleY < 0) {
                equilibraAviao();
                return;
            } else if(keyboard.pressed("A") && airpAngleY > 0) {
                equilibraAviao();
                return;
            }
            airplane.rotateOnAxis(x, -speedAngle);
        }
        if(!keyboard.pressed("D") && !keyboard.pressed("A"))
            virtualParent.rotateOnAxis(x, -speedAngle/4);
    }
    //FIM DA ROTAÇÃO VERTICAL 

    //INÍCIO DA ROTAÇÃO HORIZONTAL
    if(keyboard.pressed("D")) {
        if(airpAngleY < 0) {
            equilibraAviao();
            return;
        } else if(airpAngleY < maxAngle[1]) {
            airplane.rotateOnAxis(y, speedAngle);
        }
        equilibraCamera(['x', 'y']);
        virtualParent.rotateOnAxis(z, -speedAngle/4);
    } else if(keyboard.pressed("A")) {
        if(airpAngleY > 0) {
            equilibraAviao();
            return;
        } else if(airpAngleY > -maxAngle[1]) {
            airplane.rotateOnAxis(y, -speedAngle);
        }
        equilibraCamera(['x', 'y']);
        virtualParent.rotateOnAxis(z, speedAngle/4);
    }
    //FIM DA ROTAÇÃO HORIZONTAL 
}

function rotateTurbine() {
    if(speed > 0.5)
        turbine.rotateOnAxis(z, turbineSpeed);
    else
        turbine.rotateOnAxis(z, speed);
}

function createClouds() {
    let clouds = [];
    let numClouds = 100;
    let numSectors = 5;
    let altitudeMin = 3000;
    let altitudeMax = 7000;
    let raio = 700;

    let finalDistance = 10000;
    let startPosition = [-10000, -10000];

    var sphereGeometry = new THREE.SphereGeometry(500, 32, 32);
    var sphereMaterial = new THREE.MeshPhongMaterial({
        color:'rgb(230,230,230)',
        opacity: 0.7,
        transparent: true
    });
    
    var sphere;
    let sectorSize = (finalDistance - startPosition[0])/numSectors;
    let position = [startPosition[0], startPosition[1]];
    console.log(sectorSize);
    for(let i=0; i<numSectors; i++) {
        position[0] = startPosition[0];
        for(let i=0; i<numSectors; i++) {
            sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.position.x = position[0] + Math.pow(-1,i)*(Math.random()*raio);
            sphere.position.y = position[1] + Math.pow(-1,i)*(Math.random()*raio);
            sphere.position.z = altitudeMin + (Math.random()*(altitudeMax-altitudeMin));
        
            clouds.push({object: sphere, scale: 1, alpha: -0.003});
            scene.add(sphere);

            let rootCloud = sphere;
            for(let i=0; i<numClouds; i++) {
                sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                sphere.position.x = rootCloud.position.x + Math.pow(-1,i)*(Math.random()*raio);
                sphere.position.y = rootCloud.position.y + Math.pow(-1,i)*(Math.random()*raio);
                sphere.position.z = rootCloud.position.z + (Math.random()*raio);
            
                clouds.push({object: sphere, scale: 1, alpha: -0.003});
                scene.add(sphere);
            }
            position[0] += sectorSize;
        }
        position[1] += sectorSize;
    }

    return clouds;
}

function updateClouds() {
    clouds.forEach(element => {
        element.scale += element.alpha;
        if(element.scale <= 0.9) {
            element.alpha *= -1;
            element.scale += element.alpha;
        } else if(element.scale >= 1) {
            element.alpha *= -1;
            element.scale += element.alpha;
        }
        element.object.scale.set(element.scale,element.scale,element.scale);
    })
}

function render() {
    stats.update(); // Update FPS
    //trackballControls.update(); // Enable mouse movements
    keyboardUpdate();
    rotateTurbine();
    updateClouds();
    requestAnimationFrame(render);
    renderer.render(scene, camera) // Render scene
}