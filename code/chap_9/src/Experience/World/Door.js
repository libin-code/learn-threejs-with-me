import * as THREE from "three";
import TWEEN from "tween";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import Experience from "../Experience";

export default class Door {
  constructor({ position, scale, color } = {}) {
    this.mesh = null;
    this._position = position || [0, 0, 0];
    this._scale = scale || [1, 1, 1];
    this._color = color;
    this._experience = new Experience();
    this._scene = this._experience.scene;
    this._resources = this._experience.resources;
    this._geometry = null;
    this._texture = {};
    this._material = null;
    this._light = null;
    this._tween = null;

    this.__addGeometry();
    this.__addTexture();
    this.__addMaterial();
    this.__addMesh();
    this.__addLight();
    this.__changeLightColor();

    if (this._experience.debug.active) {
      this._experience.debug.adjustPosAndScale(this.mesh, "Door");
      this._experience.debug.ui
        .addColor(this._material, "color")
        .onChange((value) => {
          this._light.color = new THREE.Color(value);
        })
        .name("DoorLightColor");
    }
  }
  update = () => {
    this._tween && this._tween.update(this._experience.time.current);
  };
  __addGeometry = () => {
    this._geometry = new THREE.PlaneGeometry(1, 1, 1, 32, 32, 32);
  };
  __addTexture = () => {
    this._resources.setTextures(this._texture, "wall");
  };
  __addMaterial = () => {
    this._material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#8a521e"),
      metalness: 0.6,
      roughness: 0.8,
      map: this._texture.color,
      normalMap: this._texture.normal,
      aoMap: this._texture.ao,
      aoMapIntensity: 0.5,
      displacementMap: this._texture.height,
      displacementScale: 0.001,
      roughnessMap: this._texture.roughness,
      metalnessMap: this._texture.metalness,
    });
  };
  __addMesh = () => {
    this.mesh = new THREE.Mesh(this._geometry, this._material);
    this.mesh.position.set(...this._position);
    this.mesh.scale.set(...this._scale);
    this.mesh.rotateY(Math.PI * 0.5);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this._scene.add(this.mesh);
  };
  __addLight = () => {
    this._light = new THREE.RectAreaLight(
      new THREE.Color(this._color),
      10,
      2,
      3.2
    );
    this._light.rotateY(Math.PI * -0.5);
    this._light.position.set(-2.37, 0.24, 0);
    this._light.scale.set(0.9, 0.9, 1);
    this._scene.add(this._light);
    this._scene.add(new RectAreaLightHelper(this._light));
  };
  __changeLightColor = () => {
    const newColor = this.__getRandomColor();
    const duration = 1500;

    this._tween = new TWEEN.Tween(this._light.color)
      .to(newColor, duration)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();

    setTimeout(this.__changeLightColor, duration);
  };
  __getRandomColor = () => {
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();
    return new THREE.Color(r, g, b);
  };
}
