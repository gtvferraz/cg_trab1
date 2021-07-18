import * as THREE from  '../../build/three.module.js';
import Stats from       '../../build/jsm/libs/stats.module.js';
import KeyboardState from '../../libs/util/KeyboardState.js';
import {initRenderer, 
        initCamera, 
        onWindowResize, 
        degreesToRadians, 
        createGroundPlaneWired,
        InfoBox} from "../../libs/util/util.js";
import { Vector3 } from '../build/three.module.js';
        
var scene = new THREE.Scene();    // Create main scene
var stats = new Stats();          // To show FPS information
var renderer = initRenderer();    // View function in util/utils

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.lookAt(0, 0, 0);
camera.up.set(0, 1, 0);

var cameraHolder = new THREE.Object3D();
cameraHolder.add(camera);
cameraHolder.position.copy(new THREE.Vector3(-5000, 2, -5000));
cameraHolder.rotateOnAxis(new THREE.Vector3(0,1,0), degreesToRadians(-130));
scene.add(cameraHolder);

scene.background = new THREE.Color('rgb(150,150,200)');

scene.add(new THREE.HemisphereLight());

// Show world axes
var axesHelper = new THREE.AxesHelper(10000);
scene.add( axesHelper );

// To use the keyboard
var keyboard = new KeyboardState();

let clouds = createClouds();

// Use this to show information onscreen
var controls = new InfoBox();
controls.add("Aviãozinho");
controls.addParagraph();
controls.add("Press space to move");
controls.add("Left / Right arrows to rotate Y");
controls.add("Up / Down arrows to rotate X");
controls.add(", / . arrows to rotate Z.");
controls.show();

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

render();

function keyboardUpdate() {
  keyboard.update();

  var angle = degreesToRadians(1);
  var rotAxisZ = new THREE.Vector3(0,0,1); // Set Z axis
  var rotAxisX = new THREE.Vector3(1,0,0); // Set Z axis
  var rotAxisY = new THREE.Vector3(0,1,0); // Set Z axis

  if ( keyboard.pressed("space") )  cameraHolder.translateZ(-10);

  if ( keyboard.pressed(",") )  cameraHolder.rotateOnAxis(rotAxisZ,  angle );
  if ( keyboard.pressed(".") )  cameraHolder.rotateOnAxis(rotAxisZ, -angle );

  if ( keyboard.pressed("up") )  cameraHolder.rotateOnAxis(rotAxisX, -angle );
  if ( keyboard.pressed("down") )  cameraHolder.rotateOnAxis(rotAxisX, angle );

  if ( keyboard.pressed("left") )  cameraHolder.rotateOnAxis(rotAxisY,  angle );
  if ( keyboard.pressed("right") )  cameraHolder.rotateOnAxis(rotAxisY, -angle );
}

function createClouds() {
    let clouds = [];
    let numClouds = 100;
    let numSectors = 5;
    let altitudeMin = 3000;
    let altitudeMax = 7000;
    let raio = 200;

    let finalDistance = 10000;
    let startPosition = [-10000, -10000];

    var sphereGeometry = new THREE.SphereGeometry(100, 32, 32);
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
            sphere.position.y = altitudeMin + (Math.random()*(altitudeMax-altitudeMin));
            sphere.position.z = position[1] + Math.pow(-1,i)*(Math.random()*raio);
        
            clouds.push({object: sphere, scale: 1, alpha: -0.003});
            scene.add(sphere);

            let rootCloud = sphere;
            for(let i=0; i<numClouds; i++) {
                sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                sphere.position.x = rootCloud.position.x + Math.pow(-1,i)*(Math.random()*raio);
                sphere.position.y = rootCloud.position.y + (Math.random()*raio);
                sphere.position.z = rootCloud.position.z + Math.pow(-1,i)*(Math.random()*raio);
            
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

function render()
{
  stats.update(); // Update FPS
  keyboardUpdate();
  updateClouds();
  requestAnimationFrame(render); // Show events
  renderer.render(scene, camera) // Render scene
}
