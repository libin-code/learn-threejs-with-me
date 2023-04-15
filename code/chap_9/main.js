import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
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

// plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
scene.add(plane);

// text
let text = null;
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("?", {
    font,
    size: 0.7,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelOffset: 0,
    bevelSegments: 1,
  });
  textGeometry.computeBoundingBox();
  textGeometry.translate(
    -textGeometry.boundingBox.max.x * 0.5,
    -textGeometry.boundingBox.max.y * -0.4,
    -textGeometry.boundingBox.max.z * 0.5
  );

  const textMaterial = new THREE.MeshBasicMaterial({
    color: "white",
    transparent: true,
    opacity: 0.8,
  });
  text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);
});

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  CANVAS_SIZE.width / CANVAS_SIZE.height,
  0.1,
  1000
);
camera.position.z = 5;
camera.position.y = 1.5;

// Control
const controls = new OrbitControls(camera, CANVAS);

// Light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.intensity = 0.6;
pointLight.position.set(2, 3, 2);
scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 0.3;
scene.add(ambientLight);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: CANVAS });
renderer.setSize(CANVAS_SIZE.width, CANVAS_SIZE.height);
renderer.antialias = true;

// Animation
const animate = function () {
  requestAnimationFrame(animate);
  text.rotation.y += -0.05;
  renderer.render(scene, camera);
};

animate();
