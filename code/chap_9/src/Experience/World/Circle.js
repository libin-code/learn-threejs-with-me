import * as THREE from "three";
import Experience from "../Experience";

export default class Circle {
  constructor({ position = [0, 0, 0], scale = [1, 1, 1] } = {}) {
    this.mesh = null;

    this._position = position;
    this._scale = scale;
    this.experience = new Experience();
    this._scene = this.experience.scene;
    this._resources = this.experience.resources;
    this._geometry = null;
    this._texture = {};
    this._material = null;

    this.__addGeometry();
    this.__addTexture();
    this.__addMaterial();
    this.__addMesh();
  }
  __addGeometry = () => {
    this._geometry = new THREE.CircleGeometry(1, 32);
  };
  __addTexture = () => {
    this._resources.setTextures(this._texture, "circle", [1, 1]);
  };
  __addMaterial = () => {
    this._material = new THREE.MeshStandardMaterial({
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
      transparent: true,
    });
  };
  __addMesh = () => {
    this.mesh = new THREE.Mesh(this._geometry, this._material);
    this.mesh.position.set(...this._position);
    this.mesh.scale.set(...this._scale);
    this._scene.add(this.mesh);
  };
}
