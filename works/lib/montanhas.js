import * as THREE from  '../../../build/three.module.js';
import { degreesToRadians } from "../../../libs/util/util.js";
import { ConvexGeometry } from '../../../build/jsm/geometries/ConvexGeometry.js';
      
export function createMountain() {
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

  return mountain;
}

export function createMountain1() {
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

export function createMountain2() {
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

export function createMountain3() {
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