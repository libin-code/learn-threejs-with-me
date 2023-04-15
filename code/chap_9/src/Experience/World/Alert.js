import * as THREE from "three";
import Experience from "../Experience";

export default class Alert {
  constructor({
    position = [0, 0, 0],
    scale = [1, 1, 1],
    color = "#ff2424",
  } = {}) {
    this.mesh = null;

    this._position = position;
    this._scale = scale;
    this._color = color;
    this._experience = new Experience();
    this._scene = this._experience.scene;
    this._resources = this._experience.resources;
    this._geometry = null;
    this._material = null;
    this._texture = {};
    this._light = null;

    this.__addGeometry();
    this.__addTexture();
    this.__addMaterial();
    this.__addMesh();
    this.__addLight();

    if (this._experience.debug.active) {
      this._experience.debug.adjustPosAndScale(this.mesh, "Door");
      this._experience.debug.ui
        .addColor(this._material, "color")
        .onChange((value) => {
          this._material.color = new THREE.Color(value);
        })
        .name("AlertColor");
      this._scene.add(new THREE.PointLightHelper(this._light, 0.5));
    }
  }
  __addGeometry = () => {
    this._geometry = new THREE.SphereGeometry(1, 16, 16, 0, 3.2);
  };
  __addTexture = () => {
    this._resources.setTextures(this._texture, "alert");
  };
  __addMaterial = () => {
    this._material = new THREE.MeshStandardMaterial({
      color: this._color,
      metalness: 0,
      roughness: 0.7,
      map: this._texture.color,
      normalMap: this._texture.normal,
      aoMap: this._texture.ao,
      aoMapIntensity: 0.7,
      displacementMap: this._texture.height,
      displacementScale: 0.1,
      roughnessMap: this._texture.roughness,
      transparent: true,
      opacity: 0.95,
    });
  };
  __addMesh = () => {
    this.mesh = new THREE.Mesh(this._geometry, this._material);
    this.mesh.position.set(...this._position);
    this.mesh.scale.set(...this._scale);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this._scene.add(this.mesh);
  };
  __addLight = () => {
    this._light = new THREE.PointLight(this._color);
    this._light.intensity = 1;
    this._light.distance = 5;
    this._light.position.set(...this._position);
    this._light.position.z += 0.6;
    this._light.castShadow = true;
    this._scene.add(this._light);
  };
}
