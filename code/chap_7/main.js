import * as THREE from "three";
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

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  CANVAS_SIZE.width / CANVAS_SIZE.height,
  0.1,
  1000
);
camera.position.z = 3;

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
