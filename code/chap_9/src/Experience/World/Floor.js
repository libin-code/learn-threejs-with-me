import * as THREE from "three";
import Experience from "../Experience";

export default class Floor {
  constructor({ width = 5, height = 5, depth = 0.1 } = {}) {
    this.mesh = null;

    this._width = width;
    this._height = height;
    this._depth = depth;
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

    this._experience.debug.adjustPosAndScale(this.mesh, "Floor");
  }
  __addGeometry = () => {
    this._geometry = new THREE.BoxGeometry(
      this._width,
      this._height,
      this._depth,
      32,
      32,
      32
    );
    this._geometry.setAttribute(
      "uv2",
      new THREE.BufferAttribute(this._geometry.attributes.uv.array, 2)
    );
  };
  __addTexture = () => {
    this._resources.setTextures(this._texture, "floor");
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
    });
  };
  __addMesh = () => {
    this.mesh = new THREE.Mesh(this._geometry, this._material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this._scene.add(this.mesh);
  };
}
