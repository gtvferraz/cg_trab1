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
    initDefaultBasicLight
} from "../libs/util/util.js";

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
scene.background = new THREE.Color('rgb(150,150,200)');
var renderer = initRenderer(); // View function in util/utils

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.copy(new THREE.Vector3(0, -50, 15));
camera.lookAt(0, 0, 0);
camera.up.set(0, 1, 0);

initDefaultBasicLight(scene, true);

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

var maxUD = degreesToRadians(45/2);
var maxLR = degreesToRadians(45);
var angle = degreesToRadians(45/100);
var maxSpeed = 20.0;//10; //velocidade máxima de translação
var minSpeed = 3; //velocidade mínima de translação
//var reset = false; //reseta o avião

var speed = 0; //velocidade de translação
var turbineSpeed = 1; //velocidade de rotação da turbina
var aceleracao = 0.1;//0.05; //aceleração de translação em z

var numTrocasX = 0; //número de trocas de direção em x realizadas no retorno ao equilíbrio
var numTrocasY = 0; //número de trocas de direção em y realizadas no retorno ao equilíbrio

var x = new THREE.Vector3(1, 0, 0); // Set x axis
var y = new THREE.Vector3(0, 1, 0); // Set y axis
var z = new THREE.Vector3(0, 0, 1); // Set Z axis

//Materiais
var geometry;
const blackMaterial = new THREE.MeshPhongMaterial({color: 'rgb(0,0,0)'});
const redMaterial = new THREE.MeshPhongMaterial({color: 'rgb(110,0,0)'});
const grayMaterial = new THREE.MeshPhongMaterial({color: 'rgb(40,40,50)'});

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(100)
//scene.add(axesHelper);

var plane = createGroundPlaneWired(10500, 10500);
plane.rotateOnAxis(new THREE.Vector3(1, 0, 0), degreesToRadians(90));
scene.add(plane);

var {airplane, turbine} = createAirplane();
//let clouds = createClouds();

axesHelper = new THREE.AxesHelper(10)
//airplane.add(axesHelper);
var camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera2.position.copy(new THREE.Vector3(0, -50, 15));
camera2.lookAt(0, 0, 0);
camera2.up.set(0, 1.1, 0);


var virtualParent = new THREE.Object3D();
virtualParent.add(airplane);
virtualParent.add(camera);
virtualParent.add(camera2);
virtualParent.translateZ(50);
scene.add(virtualParent);

axesHelper = new THREE.AxesHelper(20)
//virtualParent.add(axesHelper);

var trackballControls = new TrackballControls(camera2, renderer.domElement);

camera2.add(listener);

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
window.addEventListener('resize', function() { onWindowResize(camera2, renderer) }, false);

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

function resetAirPlane(){
    var aux = airplane.rotation.x;
    airplane.rotation.x = 0;
    airplane.rotation.y = 0;

    if(airplane.rotation.x == 0)
        reset = false;
    /*else if(aux < 0){
        airplane.rotateOnAxis(x,angle);
        angleA += angle;
    }
    else{
        airplane.rotateOnAxis(x,-angle);
        angleA -= angle;
    }*/
}

function moveAirPlane(){
    if(airplane.rotation.x != 0)
        virtualParent.translateZ(speed*airplane.rotation.x);
    if(airplane.rotation.y != 0)
        virtualParent.rotation.z -= speed*airplane.rotation.y/1000;
    virtualParent.translateY(speed);
}

var auxPosicaoX;
var auxPosicaoY;
var auxPosicaoZ;
var auxRotationX;
var auxRotationY;
var auxRotationZ;   
var auxSpeed;
var cameraType = 1;

function trocaCamera0() {
    keyboard.update();
    if(keyboard.down('space')) {
        virtualParent.remove(camera2);
        virtualParent.add(camera);
        scene.add(plane);
        virtualParent.position.copy(new THREE.Vector3(auxPosicaoX,auxPosicaoY,auxPosicaoZ));
        virtualParent.rotation.x = auxRotationX;
        virtualParent.rotation.y = auxRotationY;
        virtualParent.rotation.z = auxRotationZ;
        trackballControls.enabled = false;
        virtualParent.remove(axesHelper);
        
        speed = auxSpeed;
        if(!sound.isPlaying && speed > 0)
            sound.play();
        cameraType = 1;

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
        Altitude: ${virtualParent.position.z.toFixed(2)}`;
    }

}

function trocaCamera1() {
    //virtualParent.remove(camera2);
    //camera2.lookAt(virtualParent.position);
    camera2.position.copy(new THREE.Vector3(0, -50, 15));
    camera2.lookAt(0, 0, 0);
    camera2.up.set(0, 1.0  , 0);
    virtualParent.remove(camera);
    virtualParent.add(camera2);
    auxSpeed = speed;
    auxPosicaoX = virtualParent.position.x;
    auxPosicaoY = virtualParent.position.y;
    auxPosicaoZ = virtualParent.position.z;
    auxRotationX = virtualParent.rotation.x;
    auxRotationY = virtualParent.rotation.y;
    auxRotationZ = virtualParent.rotation.z;
    virtualParent.position.x = 0;
    virtualParent.position.y = 0;
    virtualParent.position.z = 0;
    virtualParent.rotation.x = 0;
    virtualParent.rotation.y = 0;
    virtualParent.rotation.z = 0;
    trackballControls.enabled = true;
    trackballControls.reset();
    virtualParent.add(axesHelper);
    speed = 0;
    scene.remove(plane);
    cameraType = 0;
    if(sound.isPlaying)
        sound.stop();
    controls.infoBox.innerHTML = `Use mouse to interact:<br/>
    Left button to rotate<br/>
    Right button to translate (pan)<br/>
    Scroll to zoom in/out.`
}

function keyboardUpdate() {
    keyboard.update();
    const airpAngleX = airplane.rotation.x;
    const airpAngleY = airplane.rotation.y;

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
    Altitude: ${virtualParent.position.z.toFixed(2)}`;
    
    if(keyboard.pressed("Q")) {
        if(!sound.isPlaying)
            sound.play();
        
        if(speed <= maxSpeed)
            speed += aceleracao;
    } else if(keyboard.pressed("A")) {
        if(speed - aceleracao >= minSpeed)
            speed -= aceleracao;
    }

    /*
    if(keyboard.pressed('R')){
        reset = true;
        resetAirPlane();
    }*/

    if(keyboard.down('space'))
        trocaCamera1();

    if(keyboard.pressed("up")){
        if(airpAngleX>-maxUD){
            airplane.rotation.x -= angle;
            //airplane.rotateOnAxis(x,-angle);
            //airplane.rotation.z = 0;
            numTrocasX -= 1;
        }
    }
    else if(keyboard.pressed("down")){
        if(airpAngleX<maxUD){
            airplane.rotation.x += angle;
            //airplane.rotateOnAxis(x,angle);
            //airplane.rotation.z = 0;
            numTrocasX += 1;
        }
    }
    else{
        if(numTrocasX < 0){
            airplane.rotation.x += angle;
            numTrocasX += 1;
        }
        else if(numTrocasX > 0){
            airplane.rotation.x -= angle;
            numTrocasX -= 1;
        }
        else
            airplane.rotation.x = 0;
    }

    if(keyboard.pressed("left")){
        if(airpAngleY>-maxLR){
            airplane.rotation.y -= angle;
            numTrocasY -= 1;
        }
    }
    else if(keyboard.pressed("right")){
        if(airpAngleY<maxLR){
            airplane.rotation.y += angle;
            numTrocasY += 1;
        }
    }
    else{ 
        if(numTrocasY > 0){
            airplane.rotation.y -= angle;
            numTrocasY -= 1;
        }
        else if(numTrocasY < 0){
            airplane.rotation.y += angle;
            numTrocasY += 1;
        }
        else
            airplane.rotation.y = 0;
    }
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
    //console.log(sectorSize);
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
    trackballControls.update(); // Enable mouse movements
    
    /*
    if(!reset)
        keyboardUpdate(); //muda a direção do avião (rotação)
    else
        resetAirPlane(); //reseta a rotação do avião (inacabado)
    */
    
    //updateClouds();
    requestAnimationFrame(render);
    if(cameraType == 1){
        keyboardUpdate();
        moveAirPlane(); //move o avião
        rotateTurbine();
        renderer.render(scene, camera); // Render scene
    }   
    else{
        trocaCamera0();
        renderer.render(scene, camera2);
    }
}