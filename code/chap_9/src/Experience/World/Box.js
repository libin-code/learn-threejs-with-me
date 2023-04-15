import * as THREE from "three";
import Experience from "../Experience";

export default class Box {
  constructor({
    position = [0, 0, 0],
    scale = [1, 1, 1],
    name = "BOX",
    texturePath = "",
  } = {}) {
    this.mesh = null;

    this._position = position;
    this._scale = scale;
    this._texturePath = texturePath;
    this._experience = new Experience();
    this._scene = this._experience.scene;
    this._resources = this._experience.resources;
    this._geometry = null;
    this._texture = {};
    this._material = null;

    this.__addGeometry();
    this.__addTexture();
    this.__addMaterial();
    this.__addMesh();

    this._experience.debug.adjustPosAndScale(this.mesh, name);
  }
  __addGeometry = () => {
    this._geometry = new THREE.BoxGeometry(1, 1, 1, 32, 32, 32);
  };
  __addTexture = () => {
    this._resources.setTextures(this._texture, this._texturePath, [0.75, 0.75]);
  };
  __addMaterial = () => {
    this._material = new THREE.MeshStandardMaterial({
      metalness: 0.7,
      roughness: 0.5,
      map: this._texture.color,
      normalMap: this._texture.normal,
      aoMap: this._texture.ao,
      aoMapIntensity: 0.8,
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
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this._scene.add(this.mesh);
  };
}
