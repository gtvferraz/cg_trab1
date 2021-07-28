import * as THREE from  '../../../build/three.module.js';
import {GUI} from       '../../build/jsm/libs/dat.gui.module.js';
import { degreesToRadians, createGroundPlane, radiansToDegrees} from "../../../libs/util/util.js";
import { ConvexGeometry } from '../../../build/jsm/geometries/ConvexGeometry.js';

export function addSound() {
  // create an AudioListener and add it to the camera
  const listener = new THREE.AudioListener();

  // create a global audio source
  const sound = new THREE.Audio( listener );

  // load a sound and set it as the Audio object's buffer
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'turbine_sound.mp3', function( buffer ) {
      sound.setBuffer( buffer );
      sound.setLoop( true );
      sound.setVolume( 0.1 );
  });

  return { listener, sound };
}

var x = new THREE.Vector3(1, 0, 0); // Set x axis
var y = new THREE.Vector3(0, 1, 0); // Set y axis
var z = new THREE.Vector3(0, 0, 1); // Set Z axis

//Materiais
const blackMaterial = new THREE.MeshPhongMaterial({color: 'rgb(0,0,0)'});
const redMaterial = new THREE.MeshPhongMaterial({color: 'rgb(110,0,0)'});
const grayMaterial = new THREE.MeshPhongMaterial({color: 'rgb(40,40,50)'});

export function createAirplane() {
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

  var rightBaseWing = createWing();
  rightBaseWing.translateX(3);
  rightBaseWing.rotateOnAxis(y, degreesToRadians(180));
  mainBody.add(rightBaseWing);

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

  mainBody.castShadow = true;
  backBody.castShadow = true;
  frontBody.castShadow = true;
  turbineBase.castShadow = true;
  leftBaseWing.castShadow = true;
  rightBaseWing.castShadow = true;
  topStabilizer.castShadow = true;
  leftStabilizer.castShadow = true;
  rightStabilizer.castShadow = true;

  return {airplane, turbine, cabin};
}

export function initLight(scene, position = new THREE.Vector3(1, 1, 1)) 
{
  //let position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(1, 1, 1);

  const ambientLight = new THREE.HemisphereLight(
    'white', // bright sky color
    'darkslategrey', // dim ground color
    0.3, // intensity
  );

  const directionalLight = new THREE.DirectionalLight('rgb(255, 255, 255)');
  directionalLight.position.copy(position);
  directionalLight.castShadow = true;  

  directionalLight.shadow.mapSize.width = 5000;
  directionalLight.shadow.mapSize.height = 5000;
  directionalLight.shadow.autoUpdate = true;
  directionalLight.shadow.needsUpdate = true;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 40000;
  directionalLight.shadow.camera.left = -10000.0;
  directionalLight.shadow.camera.right = 10000;
  directionalLight.shadow.camera.top = 10000.0;
  directionalLight.shadow.camera.bottom = -10000.0;
  directionalLight.visible = true;
  directionalLight.intensity = 1.0;
  directionalLight.decay = 1;
  directionalLight.penumbra = 0.1;

  scene.add(ambientLight);
  scene.add(directionalLight);

  return directionalLight;
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

export function createTerrain() {
  var plane = createGroundPlane(11000, 11000,10,10,"rgb(60,163,60)");
  plane.add(createMountain());

  return plane;
}

function createMountain() {
  const mountain = createMountain1();
  mountain.castShadow = true;

  const mountain2 = createMountain2();
  mountain2.castShadow = true;
  mountain2.scale.set(1.4,1.4,1);
  mountain2.translateX(350);
  mountain2.translateY(-50);
  mountain2.rotateZ(degreesToRadians(90));
  mountain.add(mountain2);

  const mountain3 = createMountain3();
  mountain3.castShadow = true;
  mountain3.rotateZ(degreesToRadians(180));
  mountain3.translateX(-400);
  mountain3.translateY(200);
  mountain2.add(mountain3);

  mountain.scale.set(2,2,2);

  mountain.castShadow = true;
  mountain2.castShadow = true;
  mountain3.castShadow = true;

  return mountain;
}

function createMountain1() {
  var vertBase1 = [];

  const h1 = 0;
  const h2 = 150;
  const h3 = 270;
  const h4 = 320;
  const h5 = 340;

  var convexGeometry;
  const mountBaseMat1 = new THREE.MeshPhongMaterial({color: 'rgb(60,163,60)'});
  const mountMiddleMat = new THREE.MeshPhongMaterial({color: 'rgb(140,118,86)'});
  const mountTopMat = new THREE.MeshPhongMaterial({color: 'rgb(237,231,223)'});
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

  return mountBase1;
}

function createMountain2() {
  let vertBase2 = [];

  const h2 = 120;
  const h3 = 240;

  var convexGeometry;
  const mountBaseMat2 = new THREE.MeshPhongMaterial({color: 'rgb(60,163,60)'});
  const mountMiddleMat2 = new THREE.MeshPhongMaterial({color: 'rgb(140,118,86)'});

  //INÍCIO DA BASE
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
  //FIM DA BASE

  //INÍCIO DO MEIO
  vertBase2.push(new THREE.Vector3(50,250,h2));
  vertBase2.push(new THREE.Vector3(120,230,h2));
  vertBase2.push(new THREE.Vector3(160,180,h2));
  vertBase2.push(new THREE.Vector3(180,120,h2));
  vertBase2.push(new THREE.Vector3(150,100,h2));
  vertBase2.push(new THREE.Vector3(100,150,h2));
  vertBase2.push(new THREE.Vector3(40,200,h2));
  //FIM DO MEIO

  convexGeometry = new ConvexGeometry(vertBase2);
  const mountBase2 = new THREE.Mesh(convexGeometry, mountBaseMat2);
  vertBase2 = []

  //INÍCIO DO MEIO
  vertBase2.push(new THREE.Vector3(50,250,h2));
  vertBase2.push(new THREE.Vector3(120,230,h2));
  vertBase2.push(new THREE.Vector3(160,180,h2));
  vertBase2.push(new THREE.Vector3(180,120,h2));
  vertBase2.push(new THREE.Vector3(150,100,h2));
  vertBase2.push(new THREE.Vector3(100,150,h2));
  vertBase2.push(new THREE.Vector3(40,200,h2));
  //FIM DO MEIO

  //INÍCIO DO TOPO
  vertBase2.push(new THREE.Vector3(100,200,h3));
  vertBase2.push(new THREE.Vector3(120,170,h3));
  //FIM DO TOPO

  convexGeometry = new ConvexGeometry(vertBase2);
  const mountMiddle2 = new THREE.Mesh(convexGeometry, mountMiddleMat2);
  mountBase2.add(mountMiddle2)
  vertBase2 = []

  return mountBase2;
}

function createMountain3() {
  let vertBase3 = [];

  const h2 = 120;
  const h3 = 240;

  var convexGeometry;
  const mountBaseMat3 = new THREE.MeshPhongMaterial({color: 'rgb(60,163,60)'});
  const mountMiddleMat3 = new THREE.MeshPhongMaterial({color: 'rgb(140,118,86)'});

  //INÍCIO DA BASE
  vertBase3.push(new THREE.Vector3(500,-150,0));
  vertBase3.push(new THREE.Vector3(500,-190,0));
  vertBase3.push(new THREE.Vector3(450,-210,0));
  vertBase3.push(new THREE.Vector3(350,-230,0));
  vertBase3.push(new THREE.Vector3(300,-150,0));
  vertBase3.push(new THREE.Vector3(270,-50,0));
  vertBase3.push(new THREE.Vector3(350,0,0));
  vertBase3.push(new THREE.Vector3(450,-50,0));
  vertBase3.push(new THREE.Vector3(510,-60,0));
  //FIM DA BASE

  //INÍCIO DO MEIO
  vertBase3.push(new THREE.Vector3(450,-150,h2));
  vertBase3.push(new THREE.Vector3(350,-130,h2));
  vertBase3.push(new THREE.Vector3(370,-80,h2));
  vertBase3.push(new THREE.Vector3(400,-40,h2));
  vertBase3.push(new THREE.Vector3(460,-80,h2));
  //FIM DO MEIO

  convexGeometry = new ConvexGeometry(vertBase3);
  const mountBase3 = new THREE.Mesh(convexGeometry, mountBaseMat3);
  vertBase3 = []

  //INÍCIO DO MEIO
  vertBase3.push(new THREE.Vector3(450,-150,h2));
  vertBase3.push(new THREE.Vector3(350,-130,h2));
  vertBase3.push(new THREE.Vector3(370,-80,h2));
  vertBase3.push(new THREE.Vector3(400,-40,h2));
  vertBase3.push(new THREE.Vector3(460,-80,h2));
  //FIM DO MEIO

  //INÍCIO DO TOPO
  vertBase3.push(new THREE.Vector3(410,-120,h3));
  vertBase3.push(new THREE.Vector3(390,-100,h3));
  //FIM DO TOPO

  convexGeometry = new ConvexGeometry(vertBase3);
  const mountMiddle3 = new THREE.Mesh(convexGeometry, mountMiddleMat3);
  mountBase3.add(mountMiddle3)
  vertBase3 = []

  return mountBase3;
}

export function createClouds() {
  let clouds = [];
  let numClouds = 100;
  let numSectors = 5;
  let altitudeMin = 1000;
  let altitudeMax = 1500;
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

          let rootCloud = sphere;
          for(let i=0; i<numClouds; i++) {
              sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
              sphere.position.x = rootCloud.position.x + Math.pow(-1,i)*(Math.random()*raio);
              sphere.position.y = rootCloud.position.y + Math.pow(-1,i)*(Math.random()*raio);
              sphere.position.z = rootCloud.position.z + (Math.random()*raio);
          
              clouds.push({object: sphere, scale: 1, alpha: -0.003});
          }
          position[0] += sectorSize;
      }
      position[1] += sectorSize;
  }

  return clouds;
}

export function createTrees() {
  const trees = [];

  //offsetX = 225*escala(montanha)
  //mountainRadius = 400*escala(montanha)

  const offsetX = 550;
  const mountainRadius = 1000;
  const totalRadius = 8000;

  const numTrees = 100;
  const trunkHeight = 25;
  const subTrunkHeight = 13;

  const treesPos = [];
  const treeRadius = 10;

  let randomX;
  let randomY;

  const woodMaterial = new THREE.MeshPhongMaterial({color: 'rgb(139,69,19)'});
  const leafMaterial = new THREE.MeshPhongMaterial({color: 'rgb(60,163,60)'});
  woodMaterial.side = THREE.DoubleSide;
  leafMaterial.side = THREE.DoubleSide;

  for(let i=0; i<numTrees; i++) {
    var geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 10);
    var tree = new THREE.Mesh(geometry, woodMaterial);
    tree.rotateOnAxis(x, degreesToRadians(90));

    var geometry = new THREE.CylinderGeometry(2.5, 3, trunkHeight, 50);
    var trunk = new THREE.Mesh(geometry, woodMaterial);
    trunk.scale.set(1,1,0.8);

    var geometry = new THREE.CylinderGeometry(1, 2, subTrunkHeight, 50);
    var subTrunk1 = new THREE.Mesh(geometry, woodMaterial);
    subTrunk1.translateY(trunkHeight/2 + subTrunkHeight/4);
    subTrunk1.translateX(-4);
    subTrunk1.rotateOnAxis(z, degreesToRadians(45));

    var subTrunk2 = new THREE.Mesh(geometry, woodMaterial);
    subTrunk2.translateY(trunkHeight/2 + subTrunkHeight/4);
    subTrunk2.translateX(4); 
    subTrunk2.rotateOnAxis(z, degreesToRadians(-45));

    var geometry = new THREE.SphereGeometry(7, 10, 10);
    var leaf1 = new THREE.Mesh(geometry, leafMaterial);
    leaf1.translateY(trunkHeight/2 + subTrunkHeight/2);
    leaf1.translateX(10);

    var geometry = new THREE.SphereGeometry(9, 10, 10);
    var leaf2 = new THREE.Mesh(geometry, leafMaterial);
    leaf2.translateY(trunkHeight/2 + subTrunkHeight*0.8);
    leaf2.translateX(-10);

    let redo = true;
    while(redo) {
      randomX = Math.random() * totalRadius - totalRadius/2 + offsetX;
      randomY = Math.random() * totalRadius - totalRadius/2;

      if(randomX >= -mountainRadius+offsetX && randomX <= mountainRadius+offsetX) {
        if(randomY >= -mountainRadius && randomY <= mountainRadius) {
          if(randomX < offsetX) {
            randomX -= (mountainRadius+offsetX)+randomX;
          } else {
            randomX += (mountainRadius+offsetX)-randomX;
          }

          if(randomY < 0) {
            randomY -= mountainRadius+randomY;
          } else {
            randomY += mountainRadius-randomY;
          }
        }
      }

      redo = false;
      for(let j=0; j<treesPos.length; j++) {
        const dist = Math.sqrt(
          Math.pow(treesPos[j].x - randomX,2) 
          + Math.pow(treesPos[j].y - randomY,2)
        );

        if(dist <= treeRadius) {
          redo = true;
          break;
        }
      }
    }

    treesPos.push({
      x: randomX,
      y: randomY
    });

    tree.add(trunk);
    tree.add(subTrunk1);
    tree.add(subTrunk2);
    tree.add(leaf1);
    tree.add(leaf2);
    
    let randomScale = Math.random() * (2.0 - 1.0) + 1.0;
    let randomDegree = Math.random() * 360.0;
    
    tree.scale.set(randomScale,randomScale,randomScale);
    tree.rotateOnAxis(y, degreesToRadians(randomDegree));
    
    tree.translateX(randomX);
    tree.translateZ(randomY);
    tree.translateY((randomScale*trunkHeight)/2);

    tree.castShadow = true;
    trunk.castShadow = true;
    subTrunk1.castShadow = true;
    subTrunk2.castShadow = true;
    leaf1.castShadow = true;
    leaf2.castShadow = true;

    trees.push(tree);
  }

  /*
  var geometry = new THREE.CylinderGeometry(3000, 3000, 1, 10);
  var mark = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 'rgb(139,69,19)'}));
  mark.rotateOnAxis(x, degreesToRadians(90));
  scene.add(mark)

  var geometry = new THREE.CylinderGeometry(400, 400, 2, 10);
  var mark = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 'rgb(255,255,255)'}));
  mark.translateX(230);
  mark.rotateOnAxis(x, degreesToRadians(90));
  scene.add(mark)
  */

  return trees;
}

function updateLight(directionalLight, spotHelper, shadowHelper) {
  directionalLight.target.updateMatrixWorld();
  directionalLight.shadow.camera.updateProjectionMatrix();     
  spotHelper.update();
  shadowHelper.update();    
}

function makeXYZGUI(gui, vector3, name, onChangeFn) {
  const folder = gui.addFolder(name);
  folder.add(vector3, 'x', -10000, 10000).onChange(onChangeFn);
  folder.add(vector3, 'y', -10000, 10000).onChange(onChangeFn);
  folder.add(vector3, 'z', -10000, 10000).onChange(onChangeFn);
  folder.open();
}    

export function buildInterface(directionalLight, scene)
{
//------------------------------------------------------------
// Interface

// Create helper for the spotlight
const spotHelper = new THREE.DirectionalLightHelper(directionalLight, 0xFF8C00);
scene.add(spotHelper);

// Create helper for the spotlight shadow
const shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(shadowHelper);

var controls = new function ()
{
  this.angle = radiansToDegrees(directionalLight.angle);
  this.shadowMapSize = directionalLight.shadow.mapSize.width;

  this.onUpdateLightAngle = function(){
    directionalLight.angle = degreesToRadians(this.angle);
    updateLight(directionalLight, spotHelper, shadowHelper);      
  };   
  this.onUpdateShadowFar = function(){
    if(directionalLight.shadow.camera.far <= directionalLight.shadow.camera.near-0.1) // set far always greater than near
      directionalLight.shadow.camera.near = 0.1;
    updateLight(directionalLight, spotHelper, shadowHelper); 
  };   
  this.onUpdateShadowNear = function(){
    if(directionalLight.shadow.camera.near >= directionalLight.shadow.camera.far) // set near always smaller than far
      directionalLight.shadow.camera.far = directionalLight.shadow.camera.near+10;
    updateLight(directionalLight, spotHelper, shadowHelper);                
  };
  this.onUpdateShadowMap = function(){
    directionalLight.shadow.mapSize.width = this.shadowMapSize;
    directionalLight.shadow.mapSize.height = this.shadowMapSize;   
    directionalLight.shadow.map = null;
  };     
};

var gui = new GUI();

var spotFolder = gui.addFolder("SpotLight Parameters");
spotFolder.open();    
spotFolder.add(directionalLight, 'intensity', 0, 5);
spotFolder.add(directionalLight, 'penumbra', 0, 1); 
makeXYZGUI(spotFolder, directionalLight.position, 'position', () => updateLight(directionalLight, spotHelper, shadowHelper));
makeXYZGUI(spotFolder, directionalLight.target.position, 'target', () => updateLight(directionalLight, spotHelper, shadowHelper));

var shadowFolder = gui.addFolder("Shadow");
shadowFolder.open();    
shadowFolder.add(shadowHelper, 'visible', true);
shadowFolder.add(directionalLight.shadow.camera, 'left', -10000, 0)
  .onChange(function() { updateLight(directionalLight, spotHelper, shadowHelper) });
shadowFolder.add(directionalLight.shadow.camera, 'right', 0, 10000)
  .onChange(function() { updateLight(directionalLight, spotHelper, shadowHelper) });
shadowFolder.add(directionalLight.shadow.camera, 'top', 0, 10000)
  .onChange(function() { updateLight(directionalLight, spotHelper, shadowHelper) });
shadowFolder.add(directionalLight.shadow.camera, 'bottom', -10000, 0)
  .onChange(function() { updateLight(directionalLight, spotHelper, shadowHelper) });  
shadowFolder.add(controls, 'shadowMapSize', 100, 50000, 10)
  .onChange(function() { controls.onUpdateShadowMap() });
shadowFolder.add(directionalLight.shadow.camera, 'near', .1, 30, 0.1)
  .onChange(function() { controls.onUpdateShadowNear() })
  .listen(); // Change GUI when the value changes outside
shadowFolder.add(directionalLight.shadow.camera, 'far', .1, 50000, 0.1)
  .onChange(function() { controls.onUpdateShadowFar()  })
  .listen();
}