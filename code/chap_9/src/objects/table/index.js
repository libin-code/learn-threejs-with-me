import * as THREE from "three";
import { textureLoader, addDebuggerTool } from "../../utils";

export default class Table {
  constructor({ position, scale } = { position: [0, 0, 0], scale: [1, 1, 1] }) {
    this.position = position || [0, 0, 0];
    this.scale = scale || [1, 1, 1];
    this._material = null;
    this._desktop = null;
    this._tableLegs = null;
  }

  init() {
    this._material = new THREE.MeshStandardMaterial();
    this.__addTexture(this._material);
    this._material.metalness = 0;
    this._material.roughness = 1;
    const DESK = new THREE.Group();
    DESK.add(this.__desktop(), this.__tableLegs());

    addDebuggerTool(DESK, "DESK");

    return DESK;
  }

  __desktop() {
    const geometry = new THREE.BoxGeometry(1, 1, 1, 32, 32, 32);
    const mesh = new THREE.Mesh(geometry, this._material);
    mesh.position.set(...this.position);
    mesh.scale.set(...this.scale);
    this._desktop = mesh;

    addDebuggerTool(mesh, "DESKTOP");

    return mesh;
  }

  __tableLegs() {
    const geometry = new THREE.BoxGeometry(1, 1, 1, 32, 32, 32);
    const LEG_LEFT = new THREE.Mesh(geometry, this._material);
    const LEG_RIGHT = new THREE.Mesh(geometry, this._material);
    const THICKNESS = this._desktop.scale.y;
    const LENGTH = this._desktop.position.y;
    const HEIGHT = this._desktop.scale.z;

    LEG_LEFT.position.set(
      -(this._desktop.scale.x / 2 - THICKNESS / 2),
      LENGTH / 2,
      this._desktop.position.z
    );
    LEG_LEFT.scale.set(THICKNESS, LENGTH, HEIGHT);
    LEG_RIGHT.position.set(
      this._desktop.scale.x / 2 - THICKNESS / 2,
      LENGTH / 2,
      this._desktop.position.z
    );
    LEG_RIGHT.scale.set(THICKNESS, LENGTH, HEIGHT);
    const TABLE_LEGS = new THREE.Group();
    TABLE_LEGS.add(LEG_LEFT, LEG_RIGHT);
    this._tableLegs = TABLE_LEGS;

    addDebuggerTool(LEG_LEFT, "TABLE_LEG");

    return TABLE_LEGS;
  }

  __addTexture(material) {
    const colorTexture = textureLoader().load("/textures/table/basecolor.jpg");
    const normalTexture = textureLoader().load("/textures/table/normal.jpg");
    const heightTexture = textureLoader().load("/textures/table/height.png");
    const ambientOcclusionTexture = textureLoader().load(
      "/textures/table/ambientOcclusion.jpg"
    );
    const roughnessTexture = textureLoader().load(
      "/textures/table/roughness.jpg"
    );
    colorTexture.repeat.set(0.4, 0.4);
    colorTexture.wrapS = THREE.RepeatWrapping;
    colorTexture.wrapT = THREE.RepeatWrapping;
    normalTexture.repeat.set(0.4, 0.4);
    normalTexture.wrapS = THREE.RepeatWrapping;
    normalTexture.wrapT = THREE.RepeatWrapping;
    heightTexture.repeat.set(0.4, 0.4);
    heightTexture.wrapS = THREE.RepeatWrapping;
    heightTexture.wrapT = THREE.RepeatWrapping;
    ambientOcclusionTexture.repeat.set(0.4, 0.4);
    ambientOcclusionTexture.wrapS = THREE.RepeatWrapping;
    ambientOcclusionTexture.wrapT = THREE.RepeatWrapping;
    roughnessTexture.repeat.set(0.4, 0.4);
    roughnessTexture.wrapS = THREE.RepeatWrapping;
    roughnessTexture.wrapT = THREE.RepeatWrapping;
    material.map = colorTexture;
    material.normalMap = normalTexture;
    material.aoMap = ambientOcclusionTexture;
    material.aoMapIntensity = 2;
    material.displacementMap = heightTexture;
    material.displacementScale = 0.001;
    material.roughnessMap = roughnessTexture;
  }
}
