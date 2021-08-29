import * as THREE from  '../../../build/three.module.js';
import {GUI} from       '../../build/jsm/libs/dat.gui.module.js';
import { degreesToRadians, createGroundPlane, radiansToDegrees} from "../../../libs/util/util.js";
import { ConvexGeometry } from '../../../build/jsm/geometries/ConvexGeometry.js';

import { createBuilding1 } from '/works/lib/predios/predio1.js'
import { createBuilding2 } from '/works/lib/predios/predio2.js'
import { createBuilding3 } from '/works/lib/predios/predio3.js'
import { createBuilding6 } from '/works/lib/predios/predio6.js'

export function addSound(som, loop) {
  // create an AudioListener and add it to the camera
  const listener = new THREE.AudioListener();

  // create a global audio source
  const sound = new THREE.Audio( listener );

  // load a sound and set it as the Audio object's buffer
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load( som, function( buffer ) {
      sound.setBuffer( buffer );
      sound.setLoop( loop );
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

  var textureLoader = new THREE.TextureLoader();
  const aviaoPrincipal = textureLoader.load('/works/assets/Metal_Panels_009_basecolor.jpg');

  var geometry = new THREE.CylinderGeometry(1, 1, 9, 50);
  var mainBody = new THREE.Mesh(geometry);
  airplane.add(mainBody);

  geometry = new THREE.CylinderGeometry(0.5, 1, 3, 50);
  var backBody = new THREE.Mesh(geometry);
  backBody.translateY(-6);
  backBody.rotateOnAxis(z, degreesToRadians(180));
  mainBody.add(backBody);

  geometry = new THREE.CylinderGeometry(0.5, 1, 2, 50);
  var frontBody = new THREE.Mesh(geometry);
  frontBody.translateY(5.5);
  mainBody.add(frontBody);

  geometry = new THREE.CylinderGeometry(0.1, 0.5, 1, 50);
  var turbineBaseMaterial = new THREE.MeshBasicMaterial();
  var turbineBase = new THREE.Mesh(geometry, turbineBaseMaterial);
  turbineBase.material.map = aviaoPrincipal;
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
  var cabin = new THREE.Mesh(geometry);
  cabin.translateZ(0.5);
  cabin.scale.set(0.5, 1, 0.5);
  mainBody.add(cabin);

  mainBody.material.map = aviaoPrincipal;
  backBody.material.map = aviaoPrincipal;
  frontBody.material.map = aviaoPrincipal;

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
  directionalLight.shadow.autoUpdate = false;
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

export function initAirplaneLight(scene, position = new THREE.Vector3(1, 1, 1), target) 
{
  const directionalLight = new THREE.DirectionalLight('rgb(255, 255, 255)');
  directionalLight.position.copy(position);
  directionalLight.castShadow = true;  

  directionalLight.shadow.mapSize.width = 3000;
  directionalLight.shadow.mapSize.height = 3000;
  directionalLight.shadow.autoUpdate = true;
  directionalLight.shadow.needsUpdate = true;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 5000;
  directionalLight.shadow.camera.left = -100.0;
  directionalLight.shadow.camera.right = 100;
  directionalLight.shadow.camera.top = 100.0;
  directionalLight.shadow.camera.bottom = -100.0;
  directionalLight.visible = true;
  directionalLight.intensity = 0.0;
  directionalLight.decay = 1;
  directionalLight.penumbra = 0.1;

  directionalLight.target = target;

  scene.add(directionalLight);

  return directionalLight;
}

function createWing() {
  var textureLoader = new THREE.TextureLoader();
  const asa = textureLoader.load('/works/assets/Wood_Floor_010_basecolor.jpg');
  var geometry = new THREE.BoxGeometry(4, 2, 0.2);
  var material = new THREE.MeshBasicMaterial();
  var baseWing = new THREE.Mesh(geometry);
  baseWing.material.map = asa;

  const edgeWing = createStabilizer();
  edgeWing.translateX(-6);
  edgeWing.translateY(1);
  edgeWing.translateZ(0.1);
  edgeWing.rotateOnAxis(x, degreesToRadians(180));
  baseWing.add(edgeWing);

  edgeWing.castShadow = true;
  

  return baseWing;
}

function createStabilizer() {
  var geometry = new THREE.BoxGeometry(4, 2, 0.2);

  var textureLoader = new THREE.TextureLoader();
  const asa = textureLoader.load('/works/assets/Wood_Floor_010_basecolor.jpg');
  
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
  var material = new THREE.MeshBasicMaterial();
  const stabilizer = new THREE.Mesh(geometry, material);
  stabilizer.material.map = asa;
  return stabilizer;
}

export function createTerrain(textureLoader, scene) {
  //plane.add(createMountain());

  const planSize = 4000;
  const stepHeight = 3;

  var sandTexture = textureLoader.load('assets/sand.jpg', function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0,0);
    texture.repeat.set(100*0.115,100);
  });
  var grassTexture1 = textureLoader.load('assets/grass1.jpg', function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0,0);
    texture.repeat.set(100*0.158,100);
  });
  var grassTexture2 = textureLoader.load('assets/grass2.jpg', function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set(0,0);
      texture.repeat.set(100*0.21,100);
  });
  var grassTexture3 = textureLoader.load('assets/grass3.jpg', function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set(0,0);
      texture.repeat.set(100*0.218,100);
  });
  var grassTexture4 = textureLoader.load('assets/grass4.jpg', function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set(0,0);
      texture.repeat.set(400,400);
  });

  const plansInfo = [
    {
      widthScale: 1,
      heightScale: 1,
      texture: grassTexture4
    },
    {
      widthScale: 0.25,
      heightScale: 1,
      texture: grassTexture3
    },
    {
      widthScale: 0.2,
      heightScale: 0.9,
      texture: grassTexture2
    },
    {
      widthScale: 0.17,
      heightScale: 0.88,
      texture: grassTexture1
    },
    {
      widthScale: 0.1,
      heightScale: 0.81,
      texture: sandTexture
    }
  ];

  var mainPlane;
  plansInfo.forEach((plane, index) => {
    const newPlane = createGroundPlane(plane.widthScale*planSize, plane.heightScale*planSize, 10, 10);
    newPlane.translateZ(index*stepHeight);
    newPlane.material.map = plane.texture;

    if(index == 0) mainPlane = newPlane
    else {
      newPlane.translateX(planSize/2 - plane.widthScale*planSize/2);
      mainPlane.add(newPlane);
    }
  })

  var plane = createGroundPlane(9*planSize, 9*planSize, 10, 10, 'rgb(45,117,43)');
  plane.translateZ(-5*stepHeight);
  
  mainPlane.add(plane);

  const skyboxMaterials = [];
  const skyboxTextureFt = new textureLoader.load('assets/meadow_ft.jpg');
  const skyboxTextureBk = new textureLoader.load('assets/meadow_bk.jpg');
  const skyboxTextureUp = new textureLoader.load('assets/meadow_up.jpg');
  const skyboxTextureDn = new textureLoader.load('assets/meadow_dn.jpg');
  const skyboxTextureRt = new textureLoader.load('assets/meadow_rt.jpg');
  const skyboxTextureLf = new textureLoader.load('assets/meadow_lf.jpg');

  skyboxMaterials.push(new THREE.MeshBasicMaterial({map: skyboxTextureFt, side: THREE.BackSide}));
  skyboxMaterials.push(new THREE.MeshBasicMaterial({map: skyboxTextureBk, side: THREE.BackSide}));
  skyboxMaterials.push(new THREE.MeshBasicMaterial({map: skyboxTextureUp, side: THREE.BackSide}));
  skyboxMaterials.push(new THREE.MeshBasicMaterial({map: skyboxTextureDn, side: THREE.BackSide}));
  skyboxMaterials.push(new THREE.MeshBasicMaterial({map: skyboxTextureRt, side: THREE.BackSide}));
  skyboxMaterials.push(new THREE.MeshBasicMaterial({map: skyboxTextureLf, side: THREE.BackSide}));

  const skyboxGeo = new THREE.BoxGeometry(9*planSize, 40000, 9*planSize);
  const skybox = new THREE.Mesh(skyboxGeo, skyboxMaterials);
  skybox.rotateOnAxis(x, degreesToRadians(90));
  skybox.translateY(-0);
  mainPlane.add(skybox);

  mainPlane.add(createCity(textureLoader));

  const trees = createTrees(planSize, plansInfo, scene);
  trees.forEach(tree => {
    mainPlane.add(tree);
  })

  return mainPlane;
}

function createCity(textureLoader) {
  const streetWidth = 20;
  const sidewalkWidth = 2;
  const buildingGap = 10;

  const firstBlockWidth = 138;
  const firstBlockHeight = 194.4;

  const city = new THREE.Object3D();

  const block1 = createFirstBlock(streetWidth, sidewalkWidth, buildingGap, textureLoader);

  const block2 = createFirstBlock(streetWidth, sidewalkWidth, buildingGap, textureLoader, {rightStreet: false});
  block2.translateX(-firstBlockWidth + streetWidth + 2*sidewalkWidth);

  city.add(block1);
  city.add(block2);

  return city;
}

function createStreet(width, distance, sidewalkWidth, textureLoader) {
  var street = createGroundPlane(width, distance, 10, 10);

  var streetTexture = textureLoader.load('assets/street.jpg', function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0,0);
    texture.repeat.set(width/2,distance/20);
  });

  street.material.map = streetTexture;

  var centerLine = createGroundPlane(width/100, distance, 10, 10, 'rgb(255,255,255)');
  centerLine.translateZ(0.1);

  const sideWalkMaterials = [];
  const sideWalkTexture = new textureLoader.load('assets/sidewalk.jpg', function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0,0);
    texture.repeat.set(distance/1000,distance/10);
  });

  sideWalkMaterials.push(new THREE.MeshBasicMaterial({map: sideWalkTexture}));
  sideWalkMaterials.push(new THREE.MeshBasicMaterial({map: sideWalkTexture}));
  sideWalkMaterials.push(new THREE.MeshBasicMaterial({map: sideWalkTexture}));
  sideWalkMaterials.push(new THREE.MeshBasicMaterial({map: sideWalkTexture}));
  sideWalkMaterials.push(new THREE.MeshBasicMaterial({map: sideWalkTexture}));
  sideWalkMaterials.push(new THREE.MeshBasicMaterial({map: sideWalkTexture}));

  const sidewalkGeo = new THREE.BoxGeometry(sidewalkWidth, distance, 1);
  const leftSidewalk = new THREE.Mesh(sidewalkGeo, sideWalkMaterials);
  leftSidewalk.translateZ(0.5);
  leftSidewalk.translateX(-width/2 - sidewalkWidth/2);

  const rightSidewalk = new THREE.Mesh(sidewalkGeo, sideWalkMaterials);
  rightSidewalk.translateZ(0.5);
  rightSidewalk.translateX(width/2 + sidewalkWidth/2);

  street.add(centerLine);
  street.add(leftSidewalk);
  street.add(rightSidewalk);

  return street;
}

function createIntersection(width, sidewalkWidth, textureLoader) {
  var intersection = createGroundPlane(width+2*sidewalkWidth, width+2*sidewalkWidth, 10, 10);

  var streetTexture = textureLoader.load('assets/street.jpg', function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0,0);
    texture.repeat.set(width/2,width/2);
  });

  intersection.material.map = streetTexture;

  const sideWalkMaterials = [];
  const sideWalkTexture = new textureLoader.load('assets/sidewalk.jpg', function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0,0);
  });

  sideWalkMaterials.push(new THREE.MeshBasicMaterial({map: sideWalkTexture}));
  sideWalkMaterials.push(new THREE.MeshBasicMaterial({map: sideWalkTexture}));
  sideWalkMaterials.push(new THREE.MeshBasicMaterial({map: sideWalkTexture}));
  sideWalkMaterials.push(new THREE.MeshBasicMaterial({map: sideWalkTexture}));
  sideWalkMaterials.push(new THREE.MeshBasicMaterial({map: sideWalkTexture}));
  sideWalkMaterials.push(new THREE.MeshBasicMaterial({map: sideWalkTexture}));

  const cornerSidewalkGeo = new THREE.BoxGeometry(sidewalkWidth, sidewalkWidth, 1);
  const cornerSidewalk = new THREE.Mesh(cornerSidewalkGeo, sideWalkMaterials);
  cornerSidewalk.translateX((width+2*sidewalkWidth)/2 - sidewalkWidth/2);
  cornerSidewalk.translateY(-(width+2*sidewalkWidth)/2 + sidewalkWidth/2);
  cornerSidewalk.translateZ(1/2);

  //cornerSidewalk.translateZ(0.5);
  //cornerSidewalk.translateX(-width/2 - sidewalkWidth/2);

  /*const sidewalkGeo = new THREE.BoxGeometry(sidewalkWidth, sidewalkWidth, 1);
  const sidewalk = new THREE.Mesh(sidewalkGeo, sideWalkMaterials);
  sidewalk.translateZ(0.5);
  sidewalk.translateX(width/2 + sidewalkWidth/2);*/

  intersection.add(cornerSidewalk);
  //intersection.add(sidewalk);

  return intersection;
}

function createFirstBlock(
    streetWidth,
    sidewalkWidth,
    buildingGap,
    textureLoader,
    streetOptions = {
      leftStreet: true,
      rightStreet: true,
      frontStreet: true,
      backStreet: true
    }
  ) {
  if(streetOptions.leftStreet === undefined) streetOptions.leftStreet = true; 
  if(streetOptions.rightStreet === undefined) streetOptions.rightStreet = true; 
  if(streetOptions.frontStreet === undefined) streetOptions.frontStreet = true; 
  if(streetOptions.backStreet === undefined) streetOptions.backStreet = true; 

  var block = new THREE.Object3D();
  block.translateZ(1);

  const buildingsInfo = [
    { 
      offsetWidth: 5,
      offsetDeph: 0,
      width: 80,
      deph: 40,
      height: 100,
      scale: 0.8,
      create: createBuilding6
    },
    {
      offsetWidth: 5,
      offsetDeph: 5,
      width: 35,
      deph: 10,
      height: 20,
      scale: 2,
      create: createBuilding2
    },
    { 
      offsetWidth: 0,
      offsetDeph: 0,
      width: 20,
      deph: 8,
      height: 20,
      scale: 2,
      create: createBuilding1
    },
    { 
      offsetWidth: 0,
      offsetDeph: 0,
      width: 50,
      deph: 40,
      height: 100,
      scale: 1,
      create: createBuilding3
    }
  ];

  const buildings = [];

  var scaledOffsetWidth = buildingsInfo[0].offsetWidth*buildingsInfo[0].scale;
  var scaledOffsetDeph = buildingsInfo[0].offsetDeph*buildingsInfo[0].scale;
  var scaledWidth = buildingsInfo[0].width*buildingsInfo[0].scale;
  var scaledDeph = buildingsInfo[0].deph*buildingsInfo[0].scale;
  var scaledHeight = buildingsInfo[0].height*buildingsInfo[0].scale;

  /*buildings.push(buildingsInfo[0].create(new THREE.Vector3(0,0,0), textureLoader));
  buildings[0].scale.set(buildingsInfo[0].scale,buildingsInfo[0].scale,buildingsInfo[0].scale);
  buildings[0].translateZ(scaledHeight/2);
  buildings[0].translateX(
    streetWidth/2 + sidewalkWidth + 
    scaledOffsetWidth + scaledWidth/2
  );
  buildings[0].translateY(-0.85*(
    buildingsInfo[1].width*buildingsInfo[1].scale + 
    buildingsInfo[2].width*buildingsInfo[2].scale)
  );

  for(let i=1; i<3; i++) {
    scaledOffsetWidth = buildingsInfo[i].offsetWidth*buildingsInfo[i].scale;
    scaledOffsetDeph = buildingsInfo[i].offsetDeph*buildingsInfo[i].scale;
    scaledWidth = buildingsInfo[i].width*buildingsInfo[i].scale;
    scaledDeph = buildingsInfo[i].deph*buildingsInfo[i].scale;
    scaledHeight = buildingsInfo[i].height*buildingsInfo[i].scale;

    buildings.push(buildingsInfo[i].create(new THREE.Vector3(0,0,0), textureLoader));
    buildings[i].scale.set(buildingsInfo[i].scale,buildingsInfo[i].scale,buildingsInfo[i].scale);
    buildings[i].translateZ(scaledHeight/2);
    buildings[i].translateX(streetWidth/2 + sidewalkWidth + scaledOffsetDeph + scaledDeph/2);

    if(i > 1)
      buildings[i].translateY(-1*(
        scaledOffsetWidth + 
        scaledWidth/2 - 
        buildingsInfo[i-1].offsetWidth*buildingsInfo[i-1].scale +
        buildingsInfo[i-1].width*buildingsInfo[i-1].scale/2 + 
        buildingGap)
      );
    
    buildings[i].rotateOnAxis(z, degreesToRadians(-90));
  }

  scaledOffsetWidth = buildingsInfo[3].offsetWidth*buildingsInfo[3].scale;
  scaledOffsetDeph = buildingsInfo[3].offsetDeph*buildingsInfo[3].scale;
  scaledWidth = buildingsInfo[3].width*buildingsInfo[3].scale;
  scaledDeph = buildingsInfo[3].deph*buildingsInfo[3].scale;
  scaledHeight = buildingsInfo[3].height*buildingsInfo[3].scale;

  buildings.push(buildingsInfo[3].create(new THREE.Vector3(0,0,0), textureLoader));
  buildings[3].scale.set(buildingsInfo[3].scale,buildingsInfo[3].scale,buildingsInfo[3].scale);
  buildings[3].translateZ(scaledHeight/2);
  buildings[3].translateX(
    streetWidth/2 +
    sidewalkWidth +
    buildingsInfo[0].deph*buildingsInfo[0].scale +
    buildingGap + scaledOffsetDeph +
    scaledDeph/2
  );

  buildings[3].rotateOnAxis(z, degreesToRadians(90));

  scaledOffsetWidth = buildingsInfo[2].offsetWidth*buildingsInfo[2].scale;
  scaledOffsetDeph = buildingsInfo[2].offsetDeph*buildingsInfo[2].scale;
  scaledWidth = buildingsInfo[2].width*buildingsInfo[2].scale;
  scaledDeph = buildingsInfo[2].deph*buildingsInfo[2].scale;
  scaledHeight = buildingsInfo[2].height*buildingsInfo[2].scale;

  buildings.push(buildingsInfo[2].create(new THREE.Vector3(0,0,0), textureLoader));
  buildings[4].scale.set(buildingsInfo[2].scale,buildingsInfo[2].scale,buildingsInfo[2].scale);
  buildings[4].translateZ(scaledHeight/2);
  buildings[4].translateX(
    streetWidth/2 +
    sidewalkWidth +
    buildingsInfo[0].deph*buildingsInfo[0].scale +
    buildingGap + buildingsInfo[3].offsetDeph*buildingsInfo[3].scale +
    buildingsInfo[3].deph*buildingsInfo[3].scale/2
  );

  buildings[4].translateY(-1*(
    scaledOffsetWidth + 
    scaledWidth/2 - 
    buildingsInfo[3].offsetWidth*buildingsInfo[3].scale +
    buildingsInfo[3].width*buildingsInfo[3].scale/2 + 
    buildingGap)
  );

  buildings[4].rotateOnAxis(z, degreesToRadians(90));*/

  const planeWidth = 
    buildingsInfo[1].offsetDeph*buildingsInfo[1].scale + buildingsInfo[1].deph*buildingsInfo[1].scale +
    buildingsInfo[3].offsetDeph*buildingsInfo[3].scale + buildingsInfo[3].deph*buildingsInfo[3].scale +
    buildingGap*2;
  const planeHeight = 
    buildingsInfo[1].width*buildingsInfo[1].scale + buildingsInfo[1].offsetWidth*buildingsInfo[1].scale +
    buildingsInfo[2].width*buildingsInfo[2].scale + buildingsInfo[2].offsetWidth*buildingsInfo[2].scale + 
    buildingsInfo[2].deph*buildingsInfo[0].scale + buildingsInfo[2].offsetDeph*buildingsInfo[0].scale +
    buildingGap*2;
  const plane = createGroundPlane(
    planeWidth, 
    planeHeight, 
    10, 10);

  plane.translateX(planeWidth/2 + streetWidth/2 + sidewalkWidth);
  plane.translateY(-planeHeight/4 + 5);

  if(streetOptions.leftStreet) {
    const leftStreet = createStreet(streetWidth, planeHeight, sidewalkWidth, textureLoader);
    leftStreet.translateY(-planeHeight/4 + 5);
    block.add(leftStreet);
  }

  if(streetOptions.rightStreet) {
    const rightStreet = createStreet(streetWidth, planeHeight, sidewalkWidth, textureLoader);
    rightStreet.translateY(-planeHeight/4 + 5);
    rightStreet.translateX(planeWidth + 2*(streetWidth/2 + sidewalkWidth));
    block.add(rightStreet);
  }

  if(streetOptions.frontStreet) {
    const frontStreet = createStreet(streetWidth, planeWidth, sidewalkWidth, textureLoader);
    frontStreet.translateY(-planeHeight/4 - planeHeight/2 - streetWidth/2 - sidewalkWidth + 5);
    frontStreet.translateX(streetWidth/2 + sidewalkWidth + planeWidth/2);
    frontStreet.rotateOnAxis(z, degreesToRadians(90));
    block.add(frontStreet);
  }

  if(streetOptions.backStreet) {
    const backStreet = createStreet(streetWidth, planeWidth, sidewalkWidth, textureLoader);
    backStreet.translateY(
      buildingsInfo[0].offsetWidth*buildingsInfo[0].scale + buildingsInfo[0].width*buildingsInfo[0].scale/2 +
      sidewalkWidth + streetWidth/2 + 5.5
    );
    backStreet.translateX(streetWidth/2 + sidewalkWidth + planeWidth/2);
    backStreet.rotateOnAxis(z, degreesToRadians(90));
    block.add(backStreet);
  }

  const backLeftInter = createIntersection(streetWidth, sidewalkWidth, textureLoader);
  backLeftInter.translateY(
    buildingsInfo[0].offsetWidth*buildingsInfo[0].scale + buildingsInfo[0].width*buildingsInfo[0].scale/2 +
    streetWidth/2 + 5.5 + sidewalkWidth/2
  );
  backLeftInter.translateY(sidewalkWidth/2);

  block.add(backLeftInter);

  console.log((planeWidth + 2*streetWidth + 4*sidewalkWidth));
  console.log((planeHeight + 2*streetWidth + 4*sidewalkWidth));

  block.add(plane);
  buildings.forEach(building => block.add(building));
  return block;
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

export function createTrees(planSize, plansInfo, scene) {
  const trees = [];

  //offsetX = 225*escala(montanha)
  //mountainRadius = 400*escala(montanha)

  const numTrees = 200;
  const trunkHeight = 25;
  const subTrunkHeight = 13;

  const treesPos = [];
  const treeRadius = 100;

  const trackRegion = {
    x: 0,
    y: -(planSize/2 - 1000/2),
    width: 100,
    height: 1000,
    color: 'rgb(255,0,255)'
  }

  const soilRegion = {
    x: planSize/2 - plansInfo[2].widthScale*planSize/2,
    y: 0,
    width: plansInfo[2].widthScale*planSize,
    height: plansInfo[2].heightScale*planSize,
    color: 'rgb(50,0,0)'
  }

  const avoidRegions = [trackRegion, soilRegion];

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
      randomX = Math.random() * planSize - planSize/2;
      randomY = Math.random() * planSize - planSize/2;

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

      avoidRegions.forEach(region => {
        if(!redo) {
          if(randomX >= region.x - region.width/2 && randomX <= region.x + region.width/2 && randomY >= region.y - region.height/2 && randomY <= region.y + region.height/2) {
            redo = true;
          }
        }
      });
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
    
    let randomScale = Math.random() * (0.5 - 0.1) + 0.1;
    let randomDegree = Math.random() * 360.0;
    
    tree.scale.set(randomScale,randomScale,randomScale);
    tree.rotateOnAxis(y, degreesToRadians(randomDegree));
    
    tree.position.copy(new THREE.Vector3(randomX, randomY, (randomScale*trunkHeight)/2));

    tree.castShadow = true;
    trunk.castShadow = true;
    subTrunk1.castShadow = true;
    subTrunk2.castShadow = true;
    leaf1.castShadow = true;
    leaf2.castShadow = true;

    trees.push(tree);
  }
  
  /*var geometry = new THREE.BoxGeometry(planSize, 2, planSize, 1, 10);
  var mark = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 'rgb(139,69,19)'}));
  mark.rotateOnAxis(x, degreesToRadians(90));
  scene.add(mark)

  avoidRegions.forEach((region, index) => {
    var geometry = new THREE.BoxGeometry(region.width, 10*(index+1), region.height, 2, 10);
    var mark = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: region.color}));
    mark.position.copy(new THREE.Vector3(region.x, region.y, 0));
    mark.rotateOnAxis(x, degreesToRadians(90));
    scene.add(mark)
  });*/

  return trees;
}

function updateLight(directionalLight, spotHelper, shadowHelper) {
  directionalLight.target.updateMatrixWorld();
  directionalLight.shadow.camera.updateProjectionMatrix();     
  spotHelper.update();
  shadowHelper.update();    
}

function makeXYZGUISun(gui, vector3, name, onChangeFn) {
  const folder = gui.addFolder(name);
  folder.add(vector3, 'x', -10000, 10000).onChange(onChangeFn);
  folder.add(vector3, 'y', -10000, 10000).onChange(onChangeFn);
  folder.add(vector3, 'z', -10000, 10000).onChange(onChangeFn);
  folder.open();
}  

function makeXYZGUIAirpLight(gui, vector3, name, onChangeFn) {
  const folder = gui.addFolder(name);
  folder.add(vector3, 'x', -1000, 1000).onChange(onChangeFn);
  folder.add(vector3, 'y', -100, 100).onChange(onChangeFn);
  folder.add(vector3, 'z', -100, 100).onChange(onChangeFn);
  folder.open();
}    

export function buildSunInterface(directionalLight, scene)
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

var spotFolder = gui.addFolder("Sun Light Parameters");
spotFolder.open();    
spotFolder.add(directionalLight, 'intensity', 0, 5);
spotFolder.add(directionalLight, 'penumbra', 0, 1); 
makeXYZGUISun(spotFolder, directionalLight.position, 'position', () => updateLight(directionalLight, spotHelper, shadowHelper));
makeXYZGUISun(spotFolder, directionalLight.target.position, 'target', () => updateLight(directionalLight, spotHelper, shadowHelper));

var shadowFolder = gui.addFolder("Shadow");
shadowFolder.open();    
shadowFolder.add(directionalLight.shadow, 'autoUpdate', true);
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

export function buildAirpLightInterface(directionalLight, scene)
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

var spotFolder = gui.addFolder("Airplane Light Parameters");
spotFolder.open();    
spotFolder.add(directionalLight, 'intensity', 0, 5);
spotFolder.add(directionalLight, 'penumbra', 0, 1); 
makeXYZGUIAirpLight(spotFolder, directionalLight.position, 'position', () => updateLight(directionalLight, spotHelper, shadowHelper));
makeXYZGUIAirpLight(spotFolder, directionalLight.target.position, 'target', () => updateLight(directionalLight, spotHelper, shadowHelper));

var shadowFolder = gui.addFolder("Shadow");
shadowFolder.open();    
shadowFolder.add(shadowHelper, 'visible', true);
shadowFolder.add(directionalLight.shadow.camera, 'left', -100, 0)
  .onChange(function() { updateLight(directionalLight, spotHelper, shadowHelper) });
shadowFolder.add(directionalLight.shadow.camera, 'right', 0, 100)
  .onChange(function() { updateLight(directionalLight, spotHelper, shadowHelper) });
shadowFolder.add(directionalLight.shadow.camera, 'top', 0, 100)
  .onChange(function() { updateLight(directionalLight, spotHelper, shadowHelper) });
shadowFolder.add(directionalLight.shadow.camera, 'bottom', -100, 0)
  .onChange(function() { updateLight(directionalLight, spotHelper, shadowHelper) });  
shadowFolder.add(controls, 'shadowMapSize', 100, 5000, 10)
  .onChange(function() { controls.onUpdateShadowMap() });
shadowFolder.add(directionalLight.shadow.camera, 'near', .1, 30, 0.1)
  .onChange(function() { controls.onUpdateShadowNear() })
  .listen(); // Change GUI when the value changes outside
shadowFolder.add(directionalLight.shadow.camera, 'far', .1, 5000, 0.1)
  .onChange(function() { controls.onUpdateShadowFar()  })
  .listen();
}