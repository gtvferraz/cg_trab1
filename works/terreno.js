import * as THREE from  '../../build/three.module.js';
import Stats from       '../../build/jsm/libs/stats.module.js';
import KeyboardState from '../../libs/util/KeyboardState.js';
import { OBJLoader } from '../../build/jsm/loaders/OBJLoader.js';
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
cameraHolder.position.copy(new THREE.Vector3(0, 2, 10));
scene.add(cameraHolder);

scene.background = new THREE.Color('rgb(150,150,200)');

scene.add(new THREE.HemisphereLight());

// Show world axes
var axesHelper = new THREE.AxesHelper(10000);
scene.add(axesHelper);

// To use the keyboard
var keyboard = new KeyboardState();

//var plane = createPlane();

const loader = new OBJLoader();

// load a resource
loader.load(
	// resource URL
	'grid.obj',
	// called when resource is loaded
	function ( object ) {
    object.traverse( function( child ) {

      if ( child.isMesh ) child.geometry.computeVertexNormals();
    
    } );
		scene.add( object );

	},

  

	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

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



function createPlane() {
    const vertices = [];
    var triangles = [];
    var width = 10;
    var height = 10;

    const material = new THREE.MeshPhongMaterial({color: 'green'});
    var geometry;
    var triangle;
    var shape;

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-30, 2, 2));
    geometry.vertices.push(new THREE.Vector3(2, 30, 2));
    geometry.vertices.push(new THREE.Vector3(30, 2, 2));
    geometry.vertices.push(new THREE.Vector3(-30, 2, 2));
    
    var line = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color: 0x00ff00 })
    );
    scene.add(line);

    let count = 0;
    for (let y=0; y<height-1; y++) {
        for (let x=0; x<width; x++) {
            vertices[count%3] = [x, y, 0];
            count++;

            if(x > 0) {
                //console.log(vertices[(count-2)%3]);
                /*shape = new THREE.Shape();
                shape.moveTo(vertices[(count-2)%3]);
                shape.lineTo(vertices[(count-1)%3]);
                shape.lineTo(vertices[(count)%3]);

                geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                triangle = new THREE.Mesh(geometry, redMaterial);

                triangles.push(triangle);
                scene.add(triangle);*/
            }

            vertices[count%3] = [x, y+1, 0];
            count++;

            if(x > 0) {
                /*shape = new THREE.Shape();
                shape.moveTo(vertices[(count-2)%3]);
                shape.lineTo(vertices[(count-1)%3]);
                shape.lineTo(vertices[(count)%3]);

                geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                triangle = new THREE.Mesh(geometry, redMaterial);

                triangles.push(triangle);
                scene.add(triangle);*/
            }
        }
    }

    triangles.forEach(element => scene.add(element));
}

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

function render()
{
  stats.update(); // Update FPS
  keyboardUpdate();
  requestAnimationFrame(render); // Show events
  renderer.render(scene, camera) // Render scene
}
