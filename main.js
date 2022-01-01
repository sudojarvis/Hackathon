import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera =new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer= new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(40);
renderer.render(scene, camera);

const geometry = new THREE.OctahedronGeometry(10, 3 ,16 ,100);
const material = new THREE.MeshToonMaterial ({color: 0x73c2ff});
const octa = new THREE.Mesh(geometry, material);
scene.add(octa);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 10);


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight);

const lightHelper= new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);
const controls=new OrbitControls(camera, renderer.domElement);

function addDots(){
  const geometry = new THREE.SphereGeometry(0.25, 25, 25);
  const material = new THREE.MeshToonMaterial({color: 0xffffff});
  const sphere = new THREE.Mesh(geometry, material);

  const [x,y,z]= Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(200));

  sphere.position.set(x,y,z);
  scene.add(sphere);

}

Array(200).fill().forEach(addDots);


const spaceTexture = new THREE.TextureLoader().load('sky.jpg');
scene.background = spaceTexture;


const moonTexture = new THREE.TextureLoader().load('moon3.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');


const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,

  })
);

scene.add(moon);


function moveCamera(){
  const t= document.body.getBoundingClientRect().top;
  moon.rotation.x+=0.01;
  moon.rotation.y+=0.01;
  moon.rotation.z+=0.01;

  camera.position.z= t * -0.01;
  camera.position.y= t * -0.02;
  camera.position.x= t * -0.02;
}



function animate(){
  requestAnimationFrame(animate);
  octa.rotation.x += 0.01;
  octa.rotation.y += 0.01;
  octa.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();
