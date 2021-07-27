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

initDefaultBasicLight(scene, true, new THREE.Vector3(-500,-500,100));

var keyboard = new KeyboardState();

var maxUD = degreesToRadians(45/2); //ângulo máximo rotação cima/baixo
var maxLR = degreesToRadians(45); //ângulo máximo rotação esquerda/direita
var angle = degreesToRadians(90/100);
var maxSpeed = 20.0; //velocidade máxima de translação
var minSpeed = 0; //velocidade mínima de translação

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
//addClouds();

axesHelper = new THREE.AxesHelper(10)
var camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera2.position.copy(new THREE.Vector3(0, -50, 15));
camera2.lookAt(0, 0, 0);
camera2.up.set(0, 1.1, 0);

var virtualParent = new THREE.Object3D();
virtualParent.add(airplane);
airplane.position.z += 1;
virtualParent.add(camera);
virtualParent.add(camera2);
virtualParent.translateY(-2000);

scene.add(virtualParent);
var torusus = generateTorus();

var auxContador = true;

console.log(auxContador)
axesHelper = new THREE.AxesHelper(20)
//virtualParent.add(axesHelper);

var contador = document.getElementById("contador")
contador.innerText = "0/15"

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

//pra depois
// var tempo = new THREE.Clock();
// tempo.autoStart = false;

// Listen window size changes
window.addEventListener('resize', function() { onWindowResize(camera, renderer) }, false);
window.addEventListener('resize', function() { onWindowResize(camera2, renderer) }, false);
var contadorAneisPassados = 0;
render();

function addClouds() {
    let clouds = createClouds();
    clouds.forEach(cloud => {
        scene.add(cloud.object);
    })
}

function estaDentro(aviao, anel, raio){
    if(aviao.position.x <= anel.position.x + raio && aviao.position.x >= anel.position.x - raio)
        if(aviao.position.y <= anel.position.y + raio && aviao.position.y >= anel.position.y - raio)
            if(aviao.position.z <= anel.position.z + raio && aviao.position.z >= anel.position.z - raio)
                return true

    return false
        
}

function destroyTauros(taurus){
    for(var i = 0; i < taurus.length; i++){
        if(estaDentro(virtualParent, taurus[i], 35)){
            taurus[i].geometry.dispose();
            taurus[i].material.dispose();
            scene.remove(taurus[i]);
            taurus.splice(i,1);
            renderer.renderLists.dispose();
            if(auxContador){
                contadorAneisPassados++;
                auxContador = false;
                contador.innerText = contadorAneisPassados+"/15"; 
                setTimeout(() => {
                    auxContador = true;
                }, 500)
            } 
        }
    }
}

function generateTorus(){
    var torusus = [];
    var distance = -500;
    const TorusGeometry = new THREE.TorusGeometry( 35, 2, 16, 100 );
    const TorusMaterial = new THREE.MeshBasicMaterial( { color: 'rgb(238, 238, 0)' } );
    for(var i = 0;i < 15; i ++){
        var torus = new THREE.Mesh( TorusGeometry, TorusMaterial );
        torus.rotateOnAxis(new THREE.Vector3(1, 0, 0), degreesToRadians(90));
        torus.translateOnAxis(z, 1400+(i*20))
        torus.translateOnAxis(y, 50)
        torusus.push(torus); 
    }
    scene.add(torusus[14])
    torusus[13].translateOnAxis(y,50)
    torusus[13].translateOnAxis(z,distance)
    torusus[13].translateOnAxis(x,-65)
    scene.add(torusus[13])
    torusus[12].translateOnAxis(y,10)
    torusus[12].translateOnAxis(z,distance*2)
    torusus[12].translateOnAxis(x,-65)
    scene.add(torusus[12])
    torusus[11].translateOnAxis(y,90)
    torusus[11].translateOnAxis(z,distance*3)
    torusus[11].translateOnAxis(x,-30)
    scene.add(torusus[11])
    torusus[10].translateOnAxis(y,150)
    torusus[10].translateOnAxis(z,distance*4)
    torusus[10].translateOnAxis(x,-100)
    scene.add(torusus[10])
    torusus[9].translateOnAxis(y,10)
    torusus[9].translateOnAxis(z,distance*5)
    torusus[9].translateOnAxis(x,-70)
    scene.add(torusus[9])
    torusus[8].translateOnAxis(y,70)
    torusus[8].translateOnAxis(z,distance*6)
    torusus[8].translateOnAxis(x,100)
    scene.add(torusus[8])
    torusus[7].translateOnAxis(y,150)
    torusus[7].translateOnAxis(z,distance*7)
    torusus[7].translateOnAxis(x,400)
    torusus[7].rotateOnAxis(y,degreesToRadians(120))
    scene.add(torusus[7])
    torusus[6].translateOnAxis(y,20)
    torusus[6].translateOnAxis(z,(distance*7)-350)
    torusus[6].translateOnAxis(x,800)
    torusus[6].rotateOnAxis(y,degreesToRadians(120))
    scene.add(torusus[6])
    torusus[5].translateOnAxis(y,150)
    torusus[5].translateOnAxis(z,(distance*8)-200)
    torusus[5].translateOnAxis(x,1800)
    torusus[5].rotateOnAxis(y,degreesToRadians(90))
    scene.add(torusus[5])
    torusus[4].translateOnAxis(y,100)
    torusus[4].translateOnAxis(z,(distance*8)-100)
    torusus[4].translateOnAxis(x,2500)
    torusus[4].rotateOnAxis(y,degreesToRadians(60))
    scene.add(torusus[4])
    torusus[3].translateOnAxis(y,10)
    torusus[3].translateOnAxis(z,(distance*8))
    torusus[3].translateOnAxis(x,3000)
    torusus[3].rotateOnAxis(y,degreesToRadians(90))
    scene.add(torusus[3])
    torusus[2].translateOnAxis(y,10)
    torusus[2].translateOnAxis(z,(distance*7)-300)
    torusus[2].translateOnAxis(x,3500)
    torusus[2].rotateOnAxis(y,degreesToRadians(90))
    scene.add(torusus[2])
    torusus[1].translateOnAxis(y,100)
    torusus[1].translateOnAxis(z,(distance*7)-100)
    torusus[1].translateOnAxis(x,3800)
    torusus[1].rotateOnAxis(y,degreesToRadians(60))
    scene.add(torusus[1])
    torusus[0].translateOnAxis(y,10)
    torusus[0].translateOnAxis(z,(distance*6)-300)
    torusus[0].translateOnAxis(x,4100)
    torusus[0].rotateOnAxis(y,degreesToRadians(60))
    scene.add(torusus[0])
    return torusus
}

function moveAirPlane(){
    if(airplane.rotation.x != 0)
        virtualParent.translateZ(speed*airplane.rotation.x);
    if(airplane.rotation.y != 0)
        virtualParent.rotation.z -= speed*airplane.rotation.y/1000;
    virtualParent.translateY(speed);
}

var auxPosicao = new THREE.Vector3();
var auxRotx
var auxRoty
var auxRotz 
var cameraType = 1;

function trocaCamera0() {
    keyboard.update();
    if(keyboard.down('space')) {
        virtualParent.remove(camera2);
        virtualParent.add(camera);

        virtualParent.position.copy(auxPosicao);
        trackballControls.enabled = false;
        virtualParent.remove(axesHelper);
        virtualParent.rotation.x = auxRotx
        virtualParent.rotation.y = auxRoty
        virtualParent.rotation.z = auxRotz

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
        
        //coloca tudo de volta na cena
        scene.add(terrain);
        trees.forEach(tree => {
            scene.add(tree);
        })
        torusus.forEach(torus => {
            scene.add(torus)
        })
    }
}

function trocaCamera1() {
    //remove tudo da cena
    scene.remove(terrain);
    trees.forEach(tree => {
        scene.remove(tree);
    })
    torusus.forEach(torus => {
        scene.remove(torus)
    })

    cameraType = 0;
    if(sound.isPlaying)
        sound.stop();
    controls.infoBox.innerHTML = `Use mouse to interact:<br/>
    Left button to rotate<br/>
    Right button to translate (pan)<br/>
    Scroll to zoom in/out.`

    virtualParent.remove(camera);
    virtualParent.add(camera2);

    auxPosicao.copy(virtualParent.position);
    virtualParent.position.copy(new THREE.Vector3(0,0,0));
    auxRotx = virtualParent.rotation.x
    auxRoty = virtualParent.rotation.y
    auxRotz = virtualParent.rotation.z
    virtualParent.rotation.x = 0;
    virtualParent.rotation.y = 0;
    virtualParent.rotation.z = 0;

    trackballControls.enabled = true;
    trackballControls.reset();
    virtualParent.add(axesHelper);

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


    if(keyboard.down('space')){
        trocaCamera1();
        return;
    }
    if(keyboard.pressed("up")){
        if(airpAngleX>-maxUD){
            airplane.rotation.x -= angle;
            numTrocasX -= 1;
        }
    }
    else if(keyboard.pressed("down")){
        if(airpAngleX<maxUD){
            airplane.rotation.x += angle;
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

    moveAirPlane(); //move o avião
    rotateTurbine();
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

    destroyTauros(torusus);
    requestAnimationFrame(render);
    if(cameraType == 1){
        keyboardUpdate();
        renderer.render(scene, camera); // Render scene
    }   
    else{
        trocaCamera0();
        renderer.render(scene, camera2);
    }
}