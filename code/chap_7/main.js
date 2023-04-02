import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import "./style.css";

const CANVAS = document.querySelector("#webgl");
const CANVAS_SIZE = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: "#e3bd56" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lights
const ambientLight = new THREE.AmbientLight("white", 0.3);
scene.add(ambientLight);
// const directionalLight = new THREE.DirectionalLight("white", 1);
// directionalLight.position.set(0.45, 0, 1);
// scene.add(directionalLight);
// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight,
//   1,
//   new THREE.Color("red")
// );
// scene.add(directionalLightHelper);
// const hemisphereLight = new THREE.HemisphereLight("blue", "red", 0.8);
// scene.add(hemisphereLight);
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(
//   hemisphereLight,
//   0.2
// );
// scene.add(hemisphereLightHelper);
// const pointLight = new THREE.PointLight("red", 0.5, 5, 1);
// pointLight.position.set(0.3, 0.4, 1);
// scene.add(pointLight);
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
// scene.add(pointLightHelper);
const rectAreaLight = new THREE.RectAreaLight(
  new THREE.Color("blue"),
  5,
  1.75,
  2
);
rectAreaLight.position.set(-0.5, 0.5, -1.5);
rectAreaLight.lookAt(cube.position);
scene.add(rectAreaLight);
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);
const spotLight = new THREE.SpotLight("red", 5, 4, Math.PI * 0.1, 0.25, 2);
spotLight.position.set(0, 1.5, 2);
scene.add(spotLight);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  CANVAS_SIZE.width / CANVAS_SIZE.height,
  0.1,
  1000
);
camera.position.z = 3;

const control = new OrbitControls(camera, CANVAS);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: CANVAS });
renderer.setSize(CANVAS_SIZE.width, CANVAS_SIZE.height);

// Animation
const animate = function () {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
