import * as THREE from '../../../build/three.module.js';
import Stats from '../../../build/jsm/libs/stats.module.js';
import { TrackballControls } from '../../../build/jsm/controls/TrackballControls.js';
import {
    initRenderer,
    degreesToRadians
} from "../../../libs/util/util.js";
import {
    initLight
}from '../utils.js';
 
/*var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
camera.position.copy(new THREE.Vector3(0, -50, 25));

var ambientLight = new THREE.AmbientLight("rgb(255, 255, 255)");
scene.add(ambientLight);
let sunLight = initLight(scene, new THREE.Vector3(-30,0,30)); 

const textureLoader = new THREE.TextureLoader();

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12)
scene.add(axesHelper);
// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);
createBuilding1(new THREE.Vector3(0,0,0), textureLoader);
render();

function setSpotLight(position,spotLight)
{
  spotLight.position.copy(position);
  spotLight.shadow.mapSize.width = 512;
  spotLight.shadow.mapSize.height = 512;
  spotLight.angle = degreesToRadians(40);    
  spotLight.castShadow = true;
  spotLight.decay = 2;
  spotLight.penumbra = 0.5;
  spotLight.name = "Spot Light"
  scene.add(spotLight);
}*/

export function createBuilding1(position, textureLoader) {
    //tiles_stone_001
    const tilesBaseColor = textureLoader.load('/works/assets/predio_01/Tiles_Stone_001_basecolor.jpg');
    //brick_wall_015
    const brickWallBaseColor = textureLoader.load('/works/assets/predio_01/Brick_Wall_015_COLOR.jpg')
    //window_001
    const WindowBaseColor = textureLoader.load('/works/assets/predio_01/Window_001_basecolor.jpg');
    const WindowNormalMap = textureLoader.load('/works/assets/predio_01/Window_001_normal.jpg');
    const WindowHeightMap = textureLoader.load('/works/assets/predio_01/Window_001_height.png');
    const WindowRoughnessMap = textureLoader.load('/works/assets/predio_01/Window_001_roughness.jpg');
    const WindowAmbientOcclusionMap = textureLoader.load('/works/assets/predio_01/Window_001_ambientOcclusion.jpg');
    const WindowMetallicMap = textureLoader.load('/works/assets/predio_01/Window_001_metallic.jpg');
    const WindowOpacityMap = textureLoader.load('/works/assets/predio_01/Window_001_opacity.jpg');
    //porta varanda
    const portaMap = textureLoader.load('/works/assets/predio_01/porta.png');
    const portaMap2 = textureLoader.load('/works/assets/predio_01/porta.png');
    //chão varanda
    const varandaMap = textureLoader.load('/works/assets/predio_01/Marble_Carrara_003_COLOR.jpg');
    //grade
    const gradeMap = textureLoader.load('/works/assets/predio_01/Wood_Herringbone_Tiles_002_basecolor.jpg');
    //porta entrada
    const portaEntradaMap = textureLoader.load('/works/assets/predio_01/porta2.jpg');

    //geometry
    var gradeFrenteGeometry = new THREE.BoxGeometry(9, 0.1, 0.1);
    var gradeLateralGeometry = new THREE.BoxGeometry(0.1, 3, 0.1);
    var pisoGeometry = new THREE.BoxGeometry(9, 3, 0.2);
    var portaVarandaGeometry = new THREE.PlaneGeometry(1, 2.5);
    var predioGeometry = new THREE.BoxGeometry(20, 8, 20, 512, 512);
    var pilarGeometry = new THREE.BoxGeometry(2, 3, 16, 512, 512);
    var janelaGeometry = new THREE.PlaneGeometry(1, 1, 512, 512);
    var janelaFrenteGeometry = new THREE.PlaneGeometry(4, 1.5, 512, 512)
    var portaFrenteGeometry = new THREE.PlaneGeometry(5,4);

    //material
    var pisoMaterial = new THREE.MeshBasicMaterial({
        color: "rgba(150, 150, 150)",
        side: THREE.DoubleSide,
    });
    pisoMaterial.map = varandaMap;
    var portaVarandaMaterial = new THREE.MeshLambertMaterial({color:"rgb(255,255,255)"});
    portaVarandaMaterial.map = portaMap;
    var portaVarandaMaterial2 = new THREE.MeshLambertMaterial({color:"rgb(255,255,255)"});
    portaVarandaMaterial2.map = portaMap2;
    var portaFrenteMaterial = new THREE.MeshLambertMaterial({color:"rgb(255,255,255)"});
    portaFrenteMaterial.map = portaEntradaMap;

    var gradeMaterial = new THREE.MeshLambertMaterial({color:"rgb(255,255,255)"});
    gradeMaterial.map = gradeMap;
    var janelaMaterial = new THREE.MeshPhysicalMaterial({
        map: WindowBaseColor,
        normalMap: WindowNormalMap,
        displacementMap: WindowHeightMap,
        displacementScale: 0.05,
        roughnessMap: WindowRoughnessMap,
        roughness: 0,
        aoMap: WindowAmbientOcclusionMap,
        metalnessMap: WindowMetallicMap,
        metalness: 1,
        alphaMap: WindowOpacityMap
    });
    janelaMaterial.alphaTest = 0.01;
    janelaGeometry.attributes.uv2 = janelaGeometry.attributes.uv;
    var predioMaterial = new THREE.MeshStandardMaterial({
        map: tilesBaseColor
    });
    var pilarMaterial = new THREE.MeshStandardMaterial({
        map: brickWallBaseColor
    });

    var predio = new THREE.Mesh(predioGeometry, predioMaterial);
    predio.position.copy(position);
    //scene.add(predio);

    var pilar = new THREE.Mesh(pilarGeometry, pilarMaterial);
    predio.add(pilar);
    pilar.position.set(0,-4 -1.5,2);

    for(var i = 0; i<5; i++) {
        var gradeFrenteEsq = new THREE.Mesh(gradeFrenteGeometry, gradeMaterial);
        var gradeFrenteDir = new THREE.Mesh(gradeFrenteGeometry, gradeMaterial);
        predio.add(gradeFrenteEsq);
        predio.add(gradeFrenteDir);
        gradeFrenteEsq.position.set(-5.5, -4 -3, -5 + i*3.2);
        gradeFrenteDir.position.set(5.5, -4 -3, -5 + i*3.2);

        var gradeLateral1 = new THREE.Mesh(gradeLateralGeometry, gradeMaterial);
        var gradeLateral2 = new THREE.Mesh(gradeLateralGeometry, gradeMaterial);
        predio.add(gradeLateral1);
        predio.add(gradeLateral2);
        gradeLateral1.position.set(-10 + 0.05, -4 - 1.5, -5 + i*3.2);
        gradeLateral2.position.set(10 - 0.05, -4 - 1.5, -5 + i*3.2)

        var pisoEsq = new THREE.Mesh(pisoGeometry, pisoMaterial);
        var pisoDir = new THREE.Mesh(pisoGeometry, pisoMaterial);
        predio.add(pisoEsq);
        predio.add(pisoDir);
        pisoEsq.position.set(-5.5, -4 - 1.5, -6 + 0.1 + i*3.2)
        pisoDir.position.set(5.5, -4 - 1.5, -6 + 0.1 + i*3.2)

        var portaVarandaEsq = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
        var portaVarandaDir = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial2);
        predio.add(portaVarandaEsq);
        predio.add(portaVarandaDir);
        portaVarandaEsq.rotateOnAxis(new THREE.Vector3(1,0,0), degreesToRadians(90));
        portaVarandaDir.rotateOnAxis(new THREE.Vector3(1,0,0), degreesToRadians(90));
        portaVarandaEsq.position.set(-1.5, -4.5, -6 + 2.5/2 + i*3.2)
        portaVarandaDir.position.set(1.5, -4.5, -6 + 2.5/2 + i*3.2)
        portaVarandaEsq.material.map.wrapS = THREE.RepeatWrapping;
        portaVarandaEsq.material.map.repeat.x = -1;

        var janelaEsq = new THREE.Mesh(janelaGeometry, janelaMaterial);
        var janelaDir = new THREE.Mesh(janelaGeometry, janelaMaterial);
        predio.add(janelaEsq);
        predio.add(janelaDir);
        janelaEsq.rotateOnAxis(new THREE.Vector3(0,1,0), degreesToRadians(-90));
        janelaDir.rotateOnAxis(new THREE.Vector3(0,1,0), degreesToRadians(90));
        janelaEsq.position.set(-10.01, 0, -4.5 + i*3.2)
        janelaDir.position.set(10.01, 0, -4.5 + i*3.2)

        var janelaFrenteEsq = new THREE.Mesh(janelaFrenteGeometry, janelaMaterial);
        var janelaFrenteDir = new THREE.Mesh(janelaFrenteGeometry, janelaMaterial);
        predio.add(janelaFrenteEsq);
        predio.add(janelaFrenteDir);
        janelaFrenteEsq.rotateOnAxis(new THREE.Vector3(1,0,0), degreesToRadians(90));
        janelaFrenteDir.rotateOnAxis(new THREE.Vector3(1,0,0), degreesToRadians(90));
        janelaFrenteEsq.position.set(-6, -4.5, -4 + i*3.2)
        janelaFrenteDir.position.set(6, -4.5, -4 + i*3.2)
    }

    var porta = new THREE.Mesh(portaFrenteGeometry,portaFrenteMaterial);
    predio.add(porta);
    porta.rotateOnAxis(new THREE.Vector3(1,0,0), degreesToRadians(90));
    porta.position.set(0,-4.01,-8);

    predio.castShadow = true;

    return predio;
}

/*function render() {
    stats.update(); // Update FPS
    trackballControls.update(); // Enable mouse movements
    requestAnimationFrame(render);
    renderer.render(scene, camera) // Render scene
}*/