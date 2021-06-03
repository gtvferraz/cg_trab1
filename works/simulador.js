import * as THREE from  '../build/three.module.js';
import Stats from '../build/jsm/libs/stats.module.js';
import {initRenderer, 
        initCamera, 
        onWindowResize, 
        } from "../libs/util/util.js";
        
var scene = new THREE.Scene();    // Create main scene
var stats = new Stats();          // To show FPS information
var renderer = initRenderer();    // View function in util/utils
var camera = initCamera(new THREE.Vector3(7, 7, 7)); // Init camera in this position

// Show world axes
var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

// Listen window size changes
window.addEventListener('resize', function(){onWindowResize(camera, renderer)}, false);

render();

function render() {
  stats.update(); // Update FPS
  requestAnimationFrame(render); // Show events
  renderer.render(scene, camera) // Render scene
}