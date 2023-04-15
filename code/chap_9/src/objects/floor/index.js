import * as THREE from "three";
import { textureLoader } from "../../utils";

export default class Floor {
  constructor({ width, height, depth } = {}) {
    this.width = width || 5;
    this.height = height || 5;
    this.depth = depth || 0.1;
    this.geometry = null;
    this.mesh = null;
  }

  init() {
    this.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    this.geometry.setAttribute(
      "uv2",
      new THREE.BufferAttribute(this.geometry.attributes.uv.array, 2)
    );
    this.material = new THREE.MeshStandardMaterial();
    this.material.metalness = 0;
    this.material.roughness = 1;
    this.__addTexture(this.material);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    return this.mesh;
  }

  __addTexture(material) {
    const colorTexture = textureLoader().load("/textures/floor/basecolor.jpg");
    const normalTexture = textureLoader().load("/textures/floor/normal.jpg");
    const heightTexture = textureLoader().load("/textures/floor/height.png");
    const ambientOcclusionTexture = textureLoader().load(
      "/textures/floor/ambientOcclusion.jpg"
    );
    const roughnessTexture = textureLoader().load(
      "/textures/floor/roughness.jpg"
    );
    material.map = colorTexture;
    material.normalMap = normalTexture;
    material.aoMap = ambientOcclusionTexture;
    material.aoMapIntensity = 2;
    material.displacementMap = heightTexture;
    material.displacementScale = 0.001;
    material.roughnessMap = roughnessTexture;
  }
}
