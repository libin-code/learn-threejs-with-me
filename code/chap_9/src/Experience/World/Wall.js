import * as THREE from "three";
import Experience from "../Experience";

export default class Wall {
  constructor({ floor, heightFactor = 0.88 } = {}) {
    this.mesh = null;

    this._floor = floor;
    this._heightFactor = heightFactor;
    this._experience = new Experience();
    this._scene = this._experience.scene;
    this._resources = this._experience.resources;
    this._geometry = null;
    this._texture = {};
    this._material = null;
    this._leftWallMesh = null;
    this._forwardWallMesh = null;

    this.__addGeometry();
    this.__addTexture();
    this.__addMaterial();
    this.__addMesh();

    this._experience.debug.adjustPosAndScale(this.mesh, "Wall");
  }
  __addGeometry = () => {
    this._geometry = new THREE.BoxGeometry(
      this._floor._width,
      this._floor._height,
      this._floor._depth,
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
    this._resources.setTextures(this._texture, "wall");
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
    this.mesh = new THREE.Group();
    this.__addLeftWall();
    this.__addForwardWall();
    this.mesh.add(this._leftWallMesh, this._forwardWallMesh);
    this._scene.add(this.mesh);
  };
  __addLeftWall = () => {
    const MESH = new THREE.Mesh(this._geometry.clone(), this._material);
    MESH.receiveShadow = true;
    MESH.scale.y = this._heightFactor;
    MESH.position.set(
      -this._floor._width / 2,
      (this._floor._height / 2 - this._floor._depth / 2) * this._heightFactor,
      0
    );
    MESH.rotateX(-Math.PI * 0.5);
    MESH.rotateY(Math.PI / 2);
    MESH.rotateZ(Math.PI / 2);
    this._leftWallMesh = MESH;
  };
  __addForwardWall = () => {
    const MESH = this._leftWallMesh.clone();
    MESH.position.set(
      0,
      (this._floor._height / 2 - this._floor._depth / 2) * this._heightFactor,
      -this._floor._width / 2
    );
    MESH.rotateY(Math.PI / 2);
    this._forwardWallMesh = MESH;
  };
}
