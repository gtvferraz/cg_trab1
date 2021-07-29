import * as THREE from '../build/three.module.js';
import Stats from '../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../libs/util/KeyboardState.js';
import {
    initRenderer,
    InfoBox,
    onWindowResize,
    degreesToRadians,
    initDefaultBasicLight,
    createLightSphere
} from "../libs/util/util.js";

import { 
    addSound,
    createTerrain,
    createAirplane,
    createClouds,
    createTrees,
    initLight,
    buildSunInterface,
    initAirplaneLight,
    buildAirpLightInterface
} from './lib/utils.js';

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
scene.background = new THREE.Color('rgb(150,150,200)');
var renderer = initRenderer(); // View function in util/utils
var keyboard = new KeyboardState();
var controls = new InfoBox();
controls.infoBox.innerHTML =
    `Controles:<br/>
    WASD => Move o Avião<br/>
    QA => Velocidade do Avião<br/>
    P => Iniciar o Percurso<br/>
    ESPAÇO => Modo de Inspeção<br/>
    C => Modo Cockpit`
controls.show();

//câmeras
//câmera padrão
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.copy(new THREE.Vector3(0, -50, 15));
camera.lookAt(0, 0, 0);
camera.up.set(0, 1, 0);
const { listener, sound } = addSound();
camera.add(listener);
//câmera 2
var camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera2.position.copy(new THREE.Vector3(0, -50, 15));
camera2.lookAt(0, 0, 0);
camera2.up.set(0, 1.1, 0);
var axesHelper = new THREE.AxesHelper(20)
//câmera 3
var camera3 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera3.position.copy(new THREE.Vector3(0, -50, 15));
camera3.lookAt(0, 1000, 0);
camera3.up.set(0, 1, 0);
var cameras = [camera,camera2,camera3];

//variáveis para o controle do avião
var x = new THREE.Vector3(1, 0, 0); // Set x axis
var y = new THREE.Vector3(0, 1, 0); // Set y axis
var z = new THREE.Vector3(0, 0, 1); // Set Z axis
var maxUD = degreesToRadians(45/2); //ângulo máximo rotação cima/baixo
var maxLR = degreesToRadians(45); //ângulo máximo rotação esquerda/direita
var angle = degreesToRadians(90/100);
var maxSpeed = 20.0; //velocidade máxima de translação
var minSpeed = 2; //velocidade mínima de translação
var speed = 0; //velocidade de translação
var turbineSpeed = 1; //velocidade de rotação da turbina
var aceleracao = 0.1;//0.05; //aceleração de translação em z
var numTrocasX = 0; //número de trocas de direção em x realizadas no retorno ao equilíbrio
var numTrocasY = 0; //número de trocas de direção em y realizadas no retorno ao equilíbrio

//variáveis para troca de câmera
var auxPosicao = new THREE.Vector3(); //guarda a posição antes da troca de câmera
var auxRotz; //guarda a rotação antes da troca de câmera
var cameraType = 1; //tipo de câmera

//váriaveis do circuito de voo
var circuito = false; //circuito desligado ou ligado
var torusus = []; //arraylist para guardar os torus
var contador = document.getElementById("contador");
var posInicialCircuito = new THREE.Vector3(0,-2000,0); //marca a posição inicial do circuito
var caminho; //caminho do percurso
var caminhoOn = true; //se o caminho está ativou ou não
var timer = new THREE.Clock();
timer.autoStart = false;
var timerDiv = document.getElementById("timer")
var contadorAneisPassados = 0; 

//cria cenário
const terrain = createTerrain();
scene.add(terrain);
const trees = createTrees();
trees.forEach(tree => {
    scene.add(tree);
})
//addClouds();


//cria avião
var {airplane, turbine, cabin} = createAirplane();
var virtualParent = new THREE.Object3D();
virtualParent.add(airplane);
airplane.position.z += 1;
virtualParent.translateY(-2000);
scene.add(virtualParent);

//adiciona as câmeras
virtualParent.add(camera);
virtualParent.add(camera2);
airplane.add(camera3);
camera3.position.copy(cabin.position)
camera3.position.z += 1
camera3.position.y -= 1

//adiciona luz
let airplaneLight = initAirplaneLight(scene, new THREE.Vector3(0,20,20), airplane);
virtualParent.add(airplaneLight);
let sunLight = initLight(scene, new THREE.Vector3(-200,5000,1900));      

//trackballControls
var trackballControls = new TrackballControls(camera2, renderer.domElement);

// Listen window size changes
window.addEventListener('resize', function() { onWindowResize(camera, renderer) }, false);
window.addEventListener('resize', function() { onWindowResize(camera2, renderer) }, false);
window.addEventListener('resize', function() { onWindowResize(camera3, renderer) }, false);   

//god mod
var god = new THREE.Object3D();
var cameraGod = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
cameraGod.position.copy(new THREE.Vector3(0, -50, 15));
cameraGod.lookAt(0, 0, 0);
cameraGod.up.set(0, 1, 0);
god.add(cameraGod);
scene.add(god);
var godOn = false;

render();

//buildSunInterface(sunLight, scene);
//buildAirpLightInterface(airplaneLight, scene);

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

function generateTorus(){
    var distance = -500;
    const TorusGeometry = new THREE.TorusGeometry( 35, 2, 16, 100 );
    const TorusMaterial = new THREE.MeshBasicMaterial( { color: 'rgb(238, 238, 0)' } );
    TorusMaterial.transparent = true;
    TorusMaterial.opacity = 0.5;
    for(var i = 0;i < 15; i ++){
        var torus = new THREE.Mesh( TorusGeometry, TorusMaterial );
        torus.rotateOnAxis(new THREE.Vector3(1, 0, 0), degreesToRadians(90));
        torus.translateOnAxis(z, 1400+(i*20))
        torus.translateOnAxis(y, 50)
        torusus.push(torus);
    }

    torusus[13].translateOnAxis(y,50)
    torusus[13].translateOnAxis(z,distance)
    torusus[13].translateOnAxis(x,-65)

    torusus[12].translateOnAxis(y,10)
    torusus[12].translateOnAxis(z,distance*2)
    torusus[12].translateOnAxis(x,-65)

    torusus[11].translateOnAxis(y,90)
    torusus[11].translateOnAxis(z,distance*3)
    torusus[11].translateOnAxis(x,-30)

    torusus[10].translateOnAxis(y,150)
    torusus[10].translateOnAxis(z,distance*4)
    torusus[10].translateOnAxis(x,-100)

    torusus[9].translateOnAxis(y,10)
    torusus[9].translateOnAxis(z,distance*5)
    torusus[9].translateOnAxis(x,-70)

    torusus[8].translateOnAxis(y,70)
    torusus[8].translateOnAxis(z,distance*6)
    torusus[8].translateOnAxis(x,100)

    torusus[7].translateOnAxis(y,150)
    torusus[7].translateOnAxis(z,distance*7)
    torusus[7].translateOnAxis(x,400)
    torusus[7].rotateOnAxis(y,degreesToRadians(120))

    torusus[6].translateOnAxis(y,20)
    torusus[6].translateOnAxis(z,(distance*7)-350)
    torusus[6].translateOnAxis(x,800)
    torusus[6].rotateOnAxis(y,degreesToRadians(120))

    torusus[5].translateOnAxis(y,200)
    torusus[5].translateOnAxis(z,(distance*9))
    torusus[5].translateOnAxis(x,1200)
    torusus[5].rotateOnAxis(y,degreesToRadians(120))

    torusus[4].translateOnAxis(y,400)
    torusus[4].translateOnAxis(z,(distance*10))
    torusus[4].translateOnAxis(x,1400)
    torusus[4].rotateOnAxis(y,degreesToRadians(0))

    torusus[3].translateOnAxis(y,100)
    torusus[3].translateOnAxis(z,(distance*12))
    torusus[3].translateOnAxis(x,1300)
    torusus[3].rotateOnAxis(y,degreesToRadians(0))

    torusus[2].translateOnAxis(y,10)
    torusus[2].translateOnAxis(z,(distance*14)+400)
    torusus[2].translateOnAxis(x,800)
    torusus[2].rotateOnAxis(y,degreesToRadians(90))

    torusus[1].translateOnAxis(y,200)
    torusus[1].translateOnAxis(z,(distance*14)+200)
    torusus[1].translateOnAxis(x,0)
    torusus[1].rotateOnAxis(y,degreesToRadians(90))

    torusus[0].translateOnAxis(y,10)
    torusus[0].translateOnAxis(z,(distance*14)+200)
    torusus[0].translateOnAxis(x,-500)
    torusus[0].rotateOnAxis(y,degreesToRadians(60))
}

function destroyTorus(){
    for(var i = 0; i < torusus.length; i++){
        if(estaDentro(virtualParent, torusus[i], 35)){
            if(!timer.running && estaDentro(virtualParent, torusus[14], 35))
                timer.start();

            //destroi torus passado
            torusus[i].geometry.dispose();
            torusus[i].material.dispose();
            scene.remove(torusus[i]);
            torusus.splice(i,1);
            renderer.renderLists.dispose();

            //atualiza o contador
            contadorAneisPassados++;
            contador.innerText = contadorAneisPassados+"/15"; 
        }
        if(torusus.length == 0) {
            destroiPercurso(true);
            timer.stop();
            setTimeout(() => {
                contador.style.visibility = "hidden";
                timerDiv.style.visibility = "hidden";
            }, 1000)
        }
    }

}

function moveAirPlane(){
    if(airplane.rotation.x != 0)
        virtualParent.translateZ(speed*airplane.rotation.x);
    if(airplane.rotation.y != 0)
        virtualParent.rotation.z -= speed*airplane.rotation.y/1000;

    virtualParent.translateY(speed);
}

function trocaCamera1() {
    keyboard.update();
    if(keyboard.down('space')) {
        //trocando posição
        virtualParent.position.copy(auxPosicao);
        trackballControls.enabled = false;
        virtualParent.remove(axesHelper);
        virtualParent.rotation.z = auxRotz

        if(!sound.isPlaying && speed > 0)
            sound.play();
        cameraType = 1;
        
        //coloca tudo de volta na cena
        scene.add(terrain);
        trees.forEach(tree => {
            scene.add(tree);
        })
        torusus.forEach(torus => {
            scene.add(torus)
        })
        infoBox();
    }
}

function trocaCamera2() {
    //remove tudo da cena
    scene.remove(terrain);
    trees.forEach(tree => {
        scene.remove(tree);
    })

    cameraType = 2;
    if(sound.isPlaying)
        sound.stop();

    //trocando posição
    auxPosicao.copy(virtualParent.position);
    virtualParent.position.copy(new THREE.Vector3(0,0,0));
    auxRotz = virtualParent.rotation.z
    virtualParent.rotation.x = 0;
    virtualParent.rotation.y = 0;
    virtualParent.rotation.z = 0;

    trackballControls.enabled = true;
    trackballControls.reset();
    virtualParent.add(axesHelper);
    infoBox();
}

function criaCaminho() {
    var linhas = [new THREE.Vector3(0,0,0).add(virtualParent.position)];
    for(var i=torusus.length-1; i>=0; i--)
        linhas.push(new THREE.Vector3(0,0,0).add(torusus[i].position));

    //cria o caminho
    const curve = new THREE.CatmullRomCurve3(linhas); 
    const points = curve.getPoints( 8000 ); 
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial( { color : 'rgb(255,0,0)' } );
    const curveObject = new THREE.Line( geometry, material );
    scene.add(curveObject);

    return curveObject;
}

function destroiCaminho() {
    caminho.geometry.dispose();
    caminho.material.dispose();
    scene.remove(caminho);
    renderer.renderLists.dispose();
}

function criaPercurso() {
    generateTorus();
    torusus.forEach(torus => {
        scene.add(torus)
    })

    //posiciona o avião no começo do circuito
    virtualParent.position.copy(posInicialCircuito);
    virtualParent.rotation.z = 0;
    airplane.rotation.x = 0;
    airplane.rotation.y = 0;
    numTrocasX = 0;
    numTrocasY = 0;
    speed = 0;
    if(sound.isPlaying)
        sound.stop();

    circuito = true;
    contador.innerText = "0/15"
    caminho = criaCaminho();
    
    contador.style.visibility = "visible";
    timerDiv.style.visibility = "visible";
    infoBox();
}

function destroiPercurso(terminou) {
    terminou = arguments.length > 0 ? arguments[0]:false;
    if(!terminou) {
        contador.style.visibility = "hidden";
        timerDiv.style.visibility = "hidden";

        torusus.forEach(torus => {
            torus.geometry.dispose();
            torus.material.dispose();
            scene.remove(torus);
        })
        torusus.length = 0;
        //renderer.renderLists.dispose();
    }

    contadorAneisPassados = 0;
    circuito = false;
    destroiCaminho();
    infoBox();
}

function infoBox() {
    if(godOn)
        controls.infoBox.innerHTML = "";
    else {
        if(!circuito) {
            if(cameraType == 1) {
                controls.infoBox.innerHTML =
                `Controles:<br/>
                WASD => Move o Avião<br/>
                QA => Velocidade do Avião<br/>
                P => Iniciar o Percurso<br/>
                ESPAÇO => Modo de Inspeção<br/>
                C => Modo Cockpit`;
            }
            else if(cameraType == 2) {
                controls.infoBox.innerHTML =
                `Controles:<br/>
                Mouse Direito => Move o Avião<br/>
                Mouse Esquerdo => Gira o Avião<br/>
                Scroll => Zoom<br/>
                ESPAÇO => Terceira Pessoa<br/>`;
            }
            else {
                controls.infoBox.innerHTML =
                `Controles:<br/>
                WASD => Move o Avião<br/>
                QA => Velocidade do Avião<br/>
                P => Iniciar o Percurso<br/>
                ENTER => Desliga/Liga Caminho<br/>
                C => Terceira Pessoa`;
            }
        }
        else {
            if(cameraType == 1) {
                controls.infoBox.innerHTML =
                `Controles:<br/>
                WASD => Move o Avião<br/>
                QA => Velocidade do Avião<br/>
                P => Sair do Percurso<br/>
                C => Modo Cockpit`;
            }
            else {
                controls.infoBox.innerHTML =
                `Controles:<br/>
                WASD => Move o Avião<br/>
                QA => Velocidade do Avião<br/>
                P => Sair do Percurso<br/>
                ENTER => Desliga/Liga Caminho<br/>
                C => Terceira Pessoa`;
            }
        }
    }    
    //câmera inicial

    //cockpit

}

function keyboardUpdate() {
    keyboard.update();
    const airpAngleX = airplane.rotation.x;
    const airpAngleY = airplane.rotation.y;

    //god mod on
    if(keyboard.down('G')) {
        speed = 0;
        if(sound.isPlaying)
            sound.stop();
        godOn = true;
        infoBox();
    }

    //muda o modo de câmera
    if(cameraType == 1) {
        if(keyboard.down('space') && !circuito) {
            trocaCamera2();
            return;
        }
        if(keyboard.down('C')) {
            cameraType = 3;
            infoBox();
            cabin.material.transparent = true;
            cabin.material.opacity = 0;
        }
    }
    else if(keyboard.down('C')) {
        cameraType = 1;
        infoBox();
        cabin.material.transparent = false;
        cabin.material.opacity = 1;
    }

    //entra no modo do percurso
    if(keyboard.down('P')) {
        if(circuito) {
            destroiPercurso();
            timer.elapsedTime = 0;
            timer.stop();
        }
        else {
            criaPercurso();
            timer.elapsedTime = 0;
            timer.stop();
        }
    }

    //remove e recoloca o caminho
    if(circuito) {
        if(keyboard.down('enter')) {
            if(caminhoOn) {
                scene.remove(caminho);
                caminhoOn = false;
            }
            else {
                scene.add(caminho);
                caminhoOn = true
            }
        }

    }

    //aceleração
    if(keyboard.pressed("Q")) {
        if(!sound.isPlaying)
            sound.play();
        
        if(speed <= maxSpeed)
            speed += aceleracao;
    } else if(keyboard.pressed("A")) {
        if(speed - aceleracao >= minSpeed)
            speed -= aceleracao;
    }

    //movimentos cima/baixo
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
        else {
            airplane.rotation.x = 0;
        }
    }

    //movimentos esquerda/direita
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
        else {
            airplane.rotation.y = 0;
        }
    }

    moveAirPlane(); //move o avião
    rotateTurbine();
    if(circuito)
        destroyTorus();
}

function rotateTurbine() {
    if(speed >= 1)
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

function godView() {
    keyboard.update();
    if(keyboard.down('G')) {
        godOn = false;
        infoBox();
        return;
    }
    
    if(keyboard.pressed('W'))
        god.translateY(maxSpeed);
    else if(keyboard.pressed('S'))
        god.translateY(-maxSpeed);
    
    if(keyboard.pressed('A'))
        god.translateX(-maxSpeed);
    else if(keyboard.pressed('D'))
        god.translateX(maxSpeed);

    if(keyboard.pressed('up'))
        god.translateZ(maxSpeed);
    else if(keyboard.pressed('down'))
        god.translateZ(-maxSpeed);
    
    if(keyboard.pressed('left'))
        god.rotateOnAxis(new THREE.Vector3(0,0,1),angle);
    else if(keyboard.pressed('right'))
        god.rotateOnAxis(new THREE.Vector3(0,0,1),-angle);
}

function render() {
    stats.update(); // Update FPS
    trackballControls.update(); // Enable mouse movements
    requestAnimationFrame(render);
    
    if(circuito)
        timerDiv.innerText = timer.getElapsedTime().toFixed(2) + "s";
    if(godOn) {
        godView();
        renderer.render(scene, cameraGod);
    }
    else {
        if(cameraType == 2)
            trocaCamera1();
        else
            keyboardUpdate();

        renderer.render(scene, cameras[cameraType-1]);
    }
}