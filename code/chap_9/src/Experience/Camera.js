import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.instance = null;

    this.setInstance();
    this.setControls();

    if (this.experience.debug.active) {
      this.experience.debug
        .adjustPosAndScale(this.instance, "Camera", 20)
        .add(this.instance, "fov", 0, 180, 0.1)
        .onChange((fov) => {
          this.instance.fov = fov;
          this.instance.updateProjectionMatrix();
        })
        .name("Camera FOV");
    }
  }
  setInstance = () => {
    this.instance = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );

    this.instance.position.set(6, 5, 10.84);
    this.scene.add(this.instance);
  };
  setControls = () => {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  };
  update = () => {
    this.controls.update();
  };
}
