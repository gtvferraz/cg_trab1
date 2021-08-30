import * as THREE from '../../../build/three.module.js';
import {
    degreesToRadians
} from "../../../libs/util/util.js";


var x = new THREE.Vector3(1, 0, 0); // Set x axis
var y = new THREE.Vector3(0, 1, 0); // Set y axis
var z = new THREE.Vector3(0, 0, 1); // Set Z axis 


export function createBuilding5(textureLoader) {
    //predios
    const predioMap1 = textureLoader.load('/works/assets/predio_05/tijolo.png')
    predioMap1.wrapS = THREE.RepeatWrapping;
    predioMap1.wrapT = THREE.RepeatWrapping;
    predioMap1.repeat.set( 6, 1 );
    const predioMap11 = textureLoader.load('/works/assets/predio_05/tijolo1.png')
    predioMap11.wrapS = THREE.RepeatWrapping;
    predioMap11.wrapT = THREE.RepeatWrapping;
    predioMap11.repeat.set( 6, 6 );
    const predioMap2 = textureLoader.load('/works/assets/predio_05/tijolo2.png')
    predioMap2.wrapS = THREE.RepeatWrapping;
    predioMap2.wrapT = THREE.RepeatWrapping;
    predioMap2.repeat.set( 6, 1 );
    const predioMap22 = textureLoader.load('/works/assets/predio_05/tijolo22.png')
    predioMap22.wrapS = THREE.RepeatWrapping;
    predioMap22.wrapT = THREE.RepeatWrapping;
    predioMap22.repeat.set( 1, 6 );
    //varanda
    const varandaMap = textureLoader.load('/works/assets/predio_05/Marble_Red_004_basecolor.jpg')
    varandaMap.wrapS = THREE.RepeatWrapping;
    varandaMap.wrapT = THREE.RepeatWrapping;
    varandaMap.repeat.set( 4, 4 );
    //divisor
    const divisorMap = textureLoader.load('/works/assets/predio_05/Wood_Wall_003_basecolor.jpg')
    divisorMap.wrapS = THREE.RepeatWrapping;
    divisorMap.wrapT = THREE.RepeatWrapping;
    divisorMap.repeat.set( 8, 1 );
    //portas
    const doorMap = textureLoader.load('/works/assets/predio_05/door.png')
    const doubleDoorMap = textureLoader.load('/works/assets/predio_05/doubleDoor.png')
    //janela
    const janelaMap = textureLoader.load('/works/assets/predio_05/window.png')

    //Geometrias
    var colunaHorizontalGeometry = new THREE.BoxGeometry(60,15,60);
    var colunaVerticalGeometry = new THREE.BoxGeometry(60,15,60);
    var divisoriaGeometry = new THREE.BoxGeometry(15, 0.1, 0.5);
    var divisoriaGeometry2 = new THREE.BoxGeometry(22.5, 0.1, 0.5);
    var varandaGeometry = new THREE.PlaneGeometry(60,45);
    var paredeVarandaGeometry = new THREE.PlaneGeometry(3, 15);
    var paredeVarandaGeometry2 = new THREE.PlaneGeometry(22.5, 3);
    var janelaGeometry = new THREE.PlaneGeometry(2, 3);
    var portaVarandaGeometry = new THREE.PlaneGeometry(2,5);
    var portaPredioGeometry = new THREE.PlaneGeometry(6,6);

    //Materiais
    var colunaHorizontalMaterial = new THREE.MeshBasicMaterial({map: predioMap1});
    var colunaVericalMaterial = new THREE.MeshBasicMaterial({map: predioMap11});
    var divisoriaMaterial = new THREE.MeshBasicMaterial({map: divisorMap});
    var varandaMaterial = new THREE.MeshBasicMaterial({map: varandaMap, side: THREE.DoubleSide});
    var paredeVarandaMaterial = new THREE.MeshBasicMaterial({map: predioMap2, side: THREE.DoubleSide});
    var paredeVarandaMaterial2 = new THREE.MeshBasicMaterial({map: predioMap22, side: THREE.DoubleSide});
    var janelaMaterial = new THREE.MeshBasicMaterial({map: janelaMap, side: THREE.DoubleSide});
    var portaVarandaMaterial = new THREE.MeshBasicMaterial({map: doorMap, side: THREE.DoubleSide});
    var portaPredioMaterial = new THREE.MeshBasicMaterial({map: doubleDoorMap, side:THREE.DoubleSide});


    var colunaHorizontal = new THREE.Mesh(colunaHorizontalGeometry, [colunaHorizontalMaterial,colunaHorizontalMaterial,colunaVericalMaterial,colunaVericalMaterial,colunaHorizontalMaterial]);
    var colunaVertical = new THREE.Mesh(colunaVerticalGeometry, [colunaHorizontalMaterial,colunaHorizontalMaterial,colunaVericalMaterial,colunaVericalMaterial,colunaHorizontalMaterial]);
    colunaVertical.rotateOnAxis(z, degreesToRadians(90));
    //scene.add(colunaHorizontal);
    colunaHorizontal.add(colunaVertical);

    for(var i = 0; i < 8; i++){
        var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
        divisoria.translateOnAxis(y, -30.05);
        divisoria.translateOnAxis(z, 29.7 - i*6);
        colunaHorizontal.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
        divisoria.translateOnAxis(y, 30.05);
        divisoria.translateOnAxis(z, 29.7 - i*6);
        colunaHorizontal.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
        divisoria.translateOnAxis(y, -7.50);
        divisoria.translateOnAxis(x, 18.5);
        divisoria.translateOnAxis(z, 29.7 - i*6);
        colunaHorizontal.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
        divisoria.translateOnAxis(y, -7.50);
        divisoria.translateOnAxis(x, -18.5);
        divisoria.translateOnAxis(z, 29.7 - i*6);
        colunaHorizontal.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
        divisoria.translateOnAxis(y, 7.50);
        divisoria.translateOnAxis(x, -18.5);
        divisoria.translateOnAxis(z, 29.7 - i*6);
        colunaHorizontal.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
        divisoria.translateOnAxis(y, 7.50);
        divisoria.translateOnAxis(x, 18.5);
        divisoria.translateOnAxis(z, 29.7 - i*6);
        colunaHorizontal.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
        divisoria.translateOnAxis(y, -18.5);
        divisoria.translateOnAxis(x, 7.50);
        divisoria.translateOnAxis(z, 29.7 - i*6);
        divisoria.rotateOnAxis(z, degreesToRadians(90));
        colunaHorizontal.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
        divisoria.translateOnAxis(y, 18.5);
        divisoria.translateOnAxis(x, 7.50);
        divisoria.translateOnAxis(z, 29.7 - i*6);
        divisoria.rotateOnAxis(z, degreesToRadians(90));
        colunaHorizontal.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
        divisoria.translateOnAxis(y, 18.5);
        divisoria.translateOnAxis(x, -7.50);
        divisoria.translateOnAxis(z, 29.7 - i*6);
        divisoria.rotateOnAxis(z, degreesToRadians(90));
        colunaHorizontal.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
        divisoria.translateOnAxis(y, -18.5);
        divisoria.translateOnAxis(x, -7.50);
        divisoria.translateOnAxis(z, 29.7 - i*6);
        divisoria.rotateOnAxis(z, degreesToRadians(90));
        colunaHorizontal.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
        divisoria.translateOnAxis(x, -30.05);
        divisoria.translateOnAxis(z, 29.7 - i*6);
        divisoria.rotateOnAxis(z, degreesToRadians(90));
        colunaHorizontal.add(divisoria);
        var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
        divisoria.translateOnAxis(x, +30.05);
        divisoria.translateOnAxis(z, 29.7 - i*6);
        divisoria.rotateOnAxis(z, degreesToRadians(90));
        colunaHorizontal.add(divisoria);
        var varanda = new THREE.Mesh(varandaGeometry, varandaMaterial);
        varanda.translateOnAxis(z, 23.7 - i*6);
        colunaHorizontal.add(varanda);
        var paredeVaranda = new THREE.Mesh(paredeVarandaGeometry, paredeVarandaMaterial2);
        paredeVaranda.translateOnAxis(x, 30.02);
        paredeVaranda.translateOnAxis(y, -15);
        paredeVaranda.translateOnAxis(z, 25.2 - i*6);
        paredeVaranda.rotateOnAxis(y, degreesToRadians(90));
        colunaHorizontal.add(paredeVaranda);
        var paredeVaranda = new THREE.Mesh(paredeVarandaGeometry, paredeVarandaMaterial2);
        paredeVaranda.translateOnAxis(x, 30.02);
        paredeVaranda.translateOnAxis(y, 15);
        paredeVaranda.translateOnAxis(z, 25.2 - i*6);
        paredeVaranda.rotateOnAxis(y, degreesToRadians(90));
        colunaHorizontal.add(paredeVaranda);
        var paredeVaranda = new THREE.Mesh(paredeVarandaGeometry, paredeVarandaMaterial2);
        paredeVaranda.translateOnAxis(x, -30.02);
        paredeVaranda.translateOnAxis(y, 15);
        paredeVaranda.translateOnAxis(z, 25.2 - i*6);
        paredeVaranda.rotateOnAxis(y, degreesToRadians(90));
        colunaHorizontal.add(paredeVaranda);
        var paredeVaranda = new THREE.Mesh(paredeVarandaGeometry, paredeVarandaMaterial2);
        paredeVaranda.translateOnAxis(x, -30.02);
        paredeVaranda.translateOnAxis(y, -15);
        paredeVaranda.translateOnAxis(z, 25.2 - i*6);
        paredeVaranda.rotateOnAxis(y, degreesToRadians(90));
        colunaHorizontal.add(paredeVaranda);
        var paredeVaranda2 = new THREE.Mesh(paredeVarandaGeometry2, paredeVarandaMaterial);
        paredeVaranda2.translateOnAxis(y, -22.55);
        paredeVaranda2.translateOnAxis(z, 25.2 - i*6);
        paredeVaranda2.translateOnAxis(x, 18.5);
        paredeVaranda2.rotateOnAxis(x, degreesToRadians(90));
        colunaHorizontal.add(paredeVaranda2);
        var paredeVaranda2 = new THREE.Mesh(paredeVarandaGeometry2, paredeVarandaMaterial);
        paredeVaranda2.translateOnAxis(y, 22.55);
        paredeVaranda2.translateOnAxis(z, 25.2 - i*6);
        paredeVaranda2.translateOnAxis(x, 18.5);
        paredeVaranda2.rotateOnAxis(x, degreesToRadians(90));
        colunaHorizontal.add(paredeVaranda2);
        var paredeVaranda2 = new THREE.Mesh(paredeVarandaGeometry2, paredeVarandaMaterial);
        paredeVaranda2.translateOnAxis(y, 22.55);
        paredeVaranda2.translateOnAxis(z, 25.2 - i*6);
        paredeVaranda2.translateOnAxis(x, -18.5);
        paredeVaranda2.rotateOnAxis(x, degreesToRadians(90));
        colunaHorizontal.add(paredeVaranda2);
        var paredeVaranda2 = new THREE.Mesh(paredeVarandaGeometry2, paredeVarandaMaterial);
        paredeVaranda2.translateOnAxis(y, -22.55);
        paredeVaranda2.translateOnAxis(z, 25.2 - i*6);
        paredeVaranda2.translateOnAxis(x, -18.5);
        paredeVaranda2.rotateOnAxis(x, degreesToRadians(90));
        colunaHorizontal.add(paredeVaranda2);
        var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
        janela.translateOnAxis(y, -30.05);
        janela.translateOnAxis(z, 26.5 - i*6);
        janela.rotateOnAxis(x, degreesToRadians(90));
        colunaHorizontal.add(janela);
        var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
        janela.translateOnAxis(y, +30.05);
        janela.translateOnAxis(z, 26.5 - i*6);
        janela.rotateOnAxis(x, degreesToRadians(90));
        colunaHorizontal.add(janela);
        var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
        janela.translateOnAxis(x, 30.05);
        janela.translateOnAxis(z, 26.5 - i*6);
        janela.rotateOnAxis(y, degreesToRadians(90));
        colunaHorizontal.add(janela);
        var janela = new THREE.Mesh(janelaGeometry, janelaMaterial);
        janela.translateOnAxis(x, -30.05);
        janela.translateOnAxis(z, 26.5 - i*6);
        janela.rotateOnAxis(y, degreesToRadians(90));
        colunaHorizontal.add(janela);
        var portaVaranda = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
        portaVaranda.translateOnAxis(x, 7.6);
        portaVaranda.translateOnAxis(y, -15);
        portaVaranda.translateOnAxis(z, 26.5 - i*6);
        portaVaranda.rotateOnAxis(x, degreesToRadians(90));
        portaVaranda.rotateOnAxis(y, degreesToRadians(90));
        colunaHorizontal.add(portaVaranda);
        var portaVaranda = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
        portaVaranda.translateOnAxis(x, 7.6);
        portaVaranda.translateOnAxis(y, 15);
        portaVaranda.translateOnAxis(z, 26.5 - i*6);
        portaVaranda.rotateOnAxis(x, degreesToRadians(90));
        portaVaranda.rotateOnAxis(y, degreesToRadians(90));
        colunaHorizontal.add(portaVaranda);
        var portaVaranda = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
        portaVaranda.translateOnAxis(x, -7.6);
        portaVaranda.translateOnAxis(y, 15);
        portaVaranda.translateOnAxis(z, 26.5 - i*6);
        portaVaranda.rotateOnAxis(x, degreesToRadians(90));
        portaVaranda.rotateOnAxis(y, degreesToRadians(90));
        colunaHorizontal.add(portaVaranda);
        var portaVaranda = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
        portaVaranda.translateOnAxis(x, -7.6);
        portaVaranda.translateOnAxis(y, -15);
        portaVaranda.translateOnAxis(z, 26.5 - i*6);
        portaVaranda.rotateOnAxis(x, degreesToRadians(90));
        portaVaranda.rotateOnAxis(y, degreesToRadians(90));
        colunaHorizontal.add(portaVaranda);
        var portaVaranda = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
        portaVaranda.translateOnAxis(x, 18.6);
        portaVaranda.translateOnAxis(y, -7.6);
        portaVaranda.translateOnAxis(z, 26.5 - i*6);
        portaVaranda.rotateOnAxis(x, degreesToRadians(90));
        colunaHorizontal.add(portaVaranda);
        var portaVaranda = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
        portaVaranda.translateOnAxis(x, 18.6);
        portaVaranda.translateOnAxis(y, 7.6);
        portaVaranda.translateOnAxis(z, 26.5 - i*6);
        portaVaranda.rotateOnAxis(x, degreesToRadians(90));
        colunaHorizontal.add(portaVaranda);
        var portaVaranda = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
        portaVaranda.translateOnAxis(x, -18.6);
        portaVaranda.translateOnAxis(y, 7.6);
        portaVaranda.translateOnAxis(z, 26.5 - i*6);
        portaVaranda.rotateOnAxis(x, degreesToRadians(90));
        colunaHorizontal.add(portaVaranda);
        var portaVaranda = new THREE.Mesh(portaVarandaGeometry, portaVarandaMaterial);
        portaVaranda.translateOnAxis(x, -18.6);
        portaVaranda.translateOnAxis(y, -7.6);
        portaVaranda.translateOnAxis(z, 26.5 - i*6);
        portaVaranda.rotateOnAxis(x, degreesToRadians(90));
        colunaHorizontal.add(portaVaranda);
    }

    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.translateOnAxis(x, +7.5);
    divisoria.translateOnAxis(y, -18.5);
    divisoria.translateOnAxis(z, -18.1);
    divisoria.rotateOnAxis(z, degreesToRadians(90));
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.translateOnAxis(x, +7.5);
    divisoria.translateOnAxis(y, +18.5);
    divisoria.translateOnAxis(z, -18.1);
    divisoria.rotateOnAxis(z, degreesToRadians(90));
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.translateOnAxis(x, -7.5);
    divisoria.translateOnAxis(y, +18.5);
    divisoria.translateOnAxis(z, -18.1);
    divisoria.rotateOnAxis(z, degreesToRadians(90));
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.translateOnAxis(x, -7.5);
    divisoria.translateOnAxis(y, -18.5);
    divisoria.translateOnAxis(z, -18.1);
    divisoria.rotateOnAxis(z, degreesToRadians(90));
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.translateOnAxis(x, 18.5);
    divisoria.translateOnAxis(y, -7.5);
    divisoria.translateOnAxis(z, -18.1);
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.translateOnAxis(x, -18.5);
    divisoria.translateOnAxis(y, -7.5);
    divisoria.translateOnAxis(z, -18.1);
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.translateOnAxis(x, 18.5);
    divisoria.translateOnAxis(y, 7.5);
    divisoria.translateOnAxis(z, -18.1);
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry2, divisoriaMaterial);
    divisoria.translateOnAxis(x, -18.5);
    divisoria.translateOnAxis(y, 7.5);
    divisoria.translateOnAxis(z, -18.1);
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.translateOnAxis(y, -30.05);
    divisoria.translateOnAxis(z, -18.1);
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.translateOnAxis(y, 30.05);
    divisoria.translateOnAxis(z, -18.1);
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.translateOnAxis(x, -30.05);
    divisoria.translateOnAxis(z, -18.1);
    divisoria.rotateOnAxis(z, degreesToRadians(90));
    colunaHorizontal.add(divisoria);
    var divisoria = new THREE.Mesh(divisoriaGeometry, divisoriaMaterial);
    divisoria.translateOnAxis(x, 30.05);
    divisoria.translateOnAxis(z, -18.1);
    divisoria.rotateOnAxis(z, degreesToRadians(90));
    colunaHorizontal.add(divisoria);
    var portaPredio = new THREE.Mesh(portaPredioGeometry, portaPredioMaterial);
    portaPredio.translateOnAxis(y, -30.05);
    portaPredio.translateOnAxis(z, -27);
    portaPredio.rotateOnAxis(x, degreesToRadians(90));
    colunaHorizontal.add(portaPredio);

    colunaHorizontal.children.forEach(element => {
        element.castShadow = true;
    });
    colunaHorizontal.castShadow = true;

    colunaHorizontal.traverse(function (child){
        child.receiveShadow = true;
    });

    return colunaHorizontal;
}