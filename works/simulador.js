import * as THREE from '../build/three.module.js';
import Stats from '../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../libs/util/KeyboardState.js';
import {
    initRenderer,
    InfoBox,
    onWindowResize,
    degreesToRadians,
    initDefaultBasicLight
} from "../libs/util/util.js";

import { 
    addSound,
    createTerrain,
    createAirplane,
    createClouds,
    createTrees
} from './lib/utils.js';

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
scene.background = new THREE.Color('rgb(150,150,200)');
var renderer = initRenderer(); // View function in util/utils

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.copy(new THREE.Vector3(0, -50, 15));
camera.lookAt(0, 0, 0);
camera.up.set(0, 1, 0);

initDefaultBasicLight(scene, true);

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

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(100)
//scene.add(axesHelper);

const { listener, sound } = addSound();
camera.add(listener);

const terrain = createTerrain();
scene.add(terrain);

const trees = createTrees();
trees.forEach(tree => {
    scene.add(tree);
})

var {airplane, turbine} = createAirplane();
addClouds();

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
virtualParent.translateY(-2000);

scene.add(virtualParent);

for(var cont = 1; cont <= 15; cont++)
{
    generateTorus(cont*50);
    console.log(cont);
}

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

var controls2 = new InfoBox();
controls2.add("Salve");
controls2.show();

// Listen window size changes
window.addEventListener('resize', function() { onWindowResize(camera, renderer) }, false);
window.addEventListener('resize', function() { onWindowResize(camera2, renderer) }, false);

render();

function addClouds() {
    let clouds = createClouds();
    clouds.forEach(cloud => {
        scene.add(cloud.object);
    })
}

function generateTorus(position){
    const TorusGeometry = new THREE.TorusGeometry( 15, 1, 16, 100 );
    const TorusMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    const torus = new THREE.Mesh( TorusGeometry, TorusMaterial );
    torus.rotateOnAxis(new THREE.Vector3(1, 0, 0), degreesToRadians(90));
    torus.translateOnAxis(y, 50);
    torus.translateOnAxis(z, -position);
    scene.add( torus ); 
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