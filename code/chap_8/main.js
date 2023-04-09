import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "./style.css";

const CANVAS = document.querySelector("#webgl");
const CANVAS_SIZE = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const material = new THREE.MeshStandardMaterial({ color: "white" });

// - plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(6, 3), material);
plane.rotation.x = -Math.PI * 0.5;
plane.receiveShadow = true;
scene.add(plane);

// - wall
const wall = new THREE.Mesh(new THREE.PlaneGeometry(6, 2), material);
wall.position.y = 1;
wall.position.z = -1.5;
wall.receiveShadow = true;
scene.add(wall);

// - cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.9, 0.9, 0.9),
  material.clone()
);
cube.position.x = -1.5;
cube.material.color.set("#4da2cc");
cube.castShadow = true;
scene.add(cube);

// - sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.6, 64, 64),
  material.clone()
);
sphere.position.x = 1.5;
sphere.material.color.set("#a1b99d");
sphere.castShadow = true;
scene.add(sphere);

// - torusKnot
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.4, 0.15, 100, 16),
  material.clone()
);
torusKnot.material.color.set("#e3bd56");
torusKnot.castShadow = true;
scene.add(torusKnot);

const objectGroup = new THREE.Group();
objectGroup.add(sphere);
objectGroup.add(cube);
objectGroup.add(torusKnot);
objectGroup.position.y = 1;
objectGroup.position.z = -0.5;
scene.add(objectGroup);

const sceneGroup = new THREE.Group();
sceneGroup.add(objectGroup);
sceneGroup.add(plane);
sceneGroup.add(wall);
scene.position.y = -0.7;
scene.add(sceneGroup);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  CANVAS_SIZE.width / CANVAS_SIZE.height,
  0.1,
  1000
);
camera.position.z = 3;
camera.position.y = 1.5;

// Control
const controls = new OrbitControls(camera, CANVAS);

// Light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.intensity = 0.6;
pointLight.position.set(2, 3, 2);
pointLight.castShadow = true;
pointLight.shadow.mapSize.set(1024, 1024);
pointLight.shadow.radius = 5;
pointLight.shadow.camera.near = 1;
pointLight.shadow.camera.far = 7;
pointLight.shadow.camera.top = 2;
pointLight.shadow.camera.bottom = -2;
pointLight.shadow.camera.left = -2;
pointLight.shadow.camera.right = 2;
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);
const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 0.3;
scene.add(ambientLight);

// const cameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
// scene.add(cameraHelper);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: CANVAS });
renderer.setSize(CANVAS_SIZE.width, CANVAS_SIZE.height);
renderer.shadowMap.enabled = true;
renderer.antialias = true;

// Animation
const animate = function () {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
